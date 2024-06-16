import { Parcelamento } from './../../../models/parcelamento';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import * as moment from 'moment';
import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Conta } from 'src/app/models/conta';
import { Timestamp } from '@angular/fire/firestore';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { AtualizacaoService } from 'src/app/services/atualizacao.service';

@Component({
  selector: 'app-parcelamento-teste',
  templateUrl: './parcelamento-teste.component.html',
  styleUrls: ['./parcelamento-teste.component.scss'],
})
export class ParcelamentoTesteComponent {


  displayedColumns = [
    'dp',
    'cod',
    'datadacompra',
    'descricao',
    'cartaovinculado',
    'qtdedeparcelas',
    'valorparcela',
    'parcelasrestantes',
    'ultimaparcela',
    'saldorestante',
  ];

  dataSource: MatTableDataSource<Parcelamento>;
  parcelamentos: any = {};
  zero: any = {};
  totalparcelas: number;
  totalsdorestante: number;
  update: any;
  pos: any;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  durationInSeconds: number;
  qtdeparcelasfaltantes: number;
  saldorestante: number;
  fonte: any = {};


  @ViewChild(MatSort) sort: MatSort;


  constructor(
    private fs: AngularFirestore,
    private _liveAnnouncer: LiveAnnouncer,
    private sb: MatSnackBar,
    private as: AtualizacaoService
  ) {
    this.fs
      .collection('parcelamentos', (ref) =>
        ref.where('ativa', '==', true).orderBy('saldorestante', 'desc')
      )
      .valueChanges({ idField: 'id' })
      .subscribe((value) => {
        this.parcelamentos = value;

        this.dataSource = new MatTableDataSource(this.parcelamentos);

        this.dataSource.sort = this.sort;

        this.totalparcelas = this.parcelamentos.reduce(function (a, b) {
          return a + b.valorparcela;
        }, 0);

        this.totalsdorestante = this.parcelamentos.reduce(function (a, b) {
          return a + b.saldorestante;
        }, 0);

        const debito = fs.collection('seriehistorica');
        debito.add({
          posicao: Timestamp.now(),
          tipo: 'parcelamentos',
          total_parcelas_mensais: this.totalparcelas,
          totalsaldorestante: this.totalsdorestante,
        });
      });

      this.fs
      .collection('update')
      .valueChanges()
      .subscribe((value) => {
        this.update = value;

        this.pos = this.update[0].posicao;
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openSnackBar(message: string, action: string) {
    this.sb.open(message, action, {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds * 1000,
    });
  }

  async atualizar() {
    //exclui do grid parcelamentos liquidados

    this.fs
      .collection('parcelamentos', (ref) =>
        ref.where('ativa', '==', true).where('parcelasrestantes', '==', 1)
      )
      .valueChanges({ idField: 'id' })
      .subscribe(async (value) => {
        this.zero = value;

        if (this.zero.length == 0) {
          this.openSnackBar('Não parcelamentos liquidados!', 'OK');
        } else {
          for (let i = 0; i < this.zero.length; i++) {
            let id = this.zero[i].id;
            let hoje = Timestamp.now().toDate();
            let one = this.zero[i].ultimaparcela.toDate();
            let valor = this.zero[i].valorparcela;

            const now = moment(hoje); // Data de hoje
            const future = moment(one); // Outra data no passado
            const duration = moment.duration(future.diff(now));
            const months = duration.asMonths();

            if (months < 0) {
              let debito = await this.fs.collection('parcelamentos').doc(id);
              await debito.update({ ativa: false });
              await debito.update({ parcelasrestantes: 0 });
              await debito.update({ saldorestante: 0 });
              await debito.update({ log: Timestamp.now() });
            } else {
              this.qtdeparcelasfaltantes = Math.trunc(months) + 1;
              this.saldorestante = this.qtdeparcelasfaltantes * valor;
              this.as.atualizarparcelamentos(id, this.qtdeparcelasfaltantes,this.saldorestante)

            }
            let debito10 = this.fs.collection('update').doc('cjMX9mVVDtulRmNpbMzZ');
            debito10.update({posicao: Timestamp.now()})
          }
        }
      });

    this.fs
      .collection('parcelamentos', (ref) => ref.where('ativa', '==', true))
      .valueChanges({ idField: 'id' })
      .subscribe((value) => {
        this.fonte = value;
        console.log(this.fonte);

        for (let i = 0; i < this.fonte.length; i++) {
          let id = this.fonte[i].id;
          let hoje = Timestamp.now().toDate();
          let one = this.fonte[i].ultimaparcela.toDate();
          let valor = this.fonte[i].valorparcela;

          const now = moment(hoje); // Data de hoje
          const future = moment(one); // Outra data no passado
          const duration = moment.duration(future.diff(now));
          const months = duration.asMonths();
          this.qtdeparcelasfaltantes = Math.trunc(months) + 1;
          this.saldorestante = this.qtdeparcelasfaltantes * valor;
          this.as.atualizarparcelamentos(
            id,
            this.qtdeparcelasfaltantes,
            this.saldorestante

          );



          console.log(id + '  atualizado com sucesso');
        }

      });

  }
  
}
