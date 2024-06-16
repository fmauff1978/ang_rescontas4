import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import * as moment from 'moment';
import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatSort, Sort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Conta } from 'src/app/models/conta';
import { Timestamp } from '@angular/fire/firestore';

@Component({
  selector: 'app-dsh-contas',
  templateUrl: './dsh-contas.component.html',
  styleUrls: ['./dsh-contas.component.scss']
})

export class DshContasComponent implements AfterViewInit {




  displayedColumns = ['cod', 'conta', 'mod_despesa','objetivo', 'saldo', 'atg', 'log'];
  dataSource: MatTableDataSource<Conta>;
  diasdec: number;
  despesas$: Observable<Conta[]> ;
  desp: any = {};


  @ViewChild(MatSort) sort: MatSort;


  constructor(private fs: AngularFirestore, private _liveAnnouncer: LiveAnnouncer){

  this.fs.collection('contas', (ref)=> ref.where('gd', '!=', 0).orderBy('atg','desc')).valueChanges({idField: 'id'}).subscribe(value =>  {
  this.desp = value;


   this.dataSource = new MatTableDataSource(this.desp)


   this.dataSource.sort = this.sort;


   let start=moment(Date.now());
   let end1 = new Date (2024, 11,31)
   let duration = moment.duration(start.diff(end1)).asDays() * (-1);
   let dias_faltantes = Math.trunc(duration) + 1
   let dias_decorridos = 366-dias_faltantes;
   this.diasdec = dias_decorridos;
   console.log(this.diasdec)




  })


   }

ngAfterViewInit() {
 // this.dataSource.sort = this.sort;

 }




  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  getContas (){

    this.fs.collection('contas', (ref)=> ref.where('gd', '!=', 0)).valueChanges({idField: 'id'}).subscribe(value =>  {
      this.desp = value})

      return this.desp;

  }


  async atualizar () {

    const data  = await this.getContas()
    for (const x of data){
      let id = x.id;
      let gd = x.gd;
      let dd = this.diasdec;
      let sd = x.saldo;
      let at = sd/(dd*gd)
      const debito = await this.fs.collection('contas').doc(id);
      await debito.update({atg:(at)});
      await debito.update({log: Timestamp.now()})
      console.log(id)
    }


  }




}


