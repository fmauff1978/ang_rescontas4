import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Timestamp } from 'firebase/firestore';
import * as moment from 'moment';
import { EMPTY_SUBSCRIPTION } from 'rxjs/internal/Subscription';
import { AtualizacaoService } from 'src/app/services/atualizacao.service';


@Component({
  selector: 'app-parcelamentos',
  templateUrl: './parcelamentos.component.html',
  styleUrls: ['./parcelamentos.component.scss']
})
export class ParcelamentosComponent {


  displayedColumns = ['demo-position','cod', 'datacompra', 'descricao', 'cartao', 'qtdeparcelas', 'valorparcelas', 'parcelasrestantes', 'ultimaparcela', 'saldorestante']
 parcelamentos: any = {};
 horizontalPosition: MatSnackBarHorizontalPosition = 'center';
 verticalPosition: MatSnackBarVerticalPosition = 'top';
    update: any;
  pos :any;
  totalparcelas: number;
  totalsdorestante: number;
  zero: any ={}
  durationInSeconds = 2;
  fonte:any ={};
  qtdeparcelasfaltantes: number;
  saldorestante: number;
  id: string;
  hoje: Date;
  one: Date;
  valor: number;
  itemDoc: AngularFirestoreDocument;
  item: any={}



 constructor(private fs: AngularFirestore, private as: AtualizacaoService, private sb: MatSnackBar){

  this.fs.collection('parcelamentos', (ref)=> ref.where('ativa', '==', true).orderBy('saldorestante', 'desc')).valueChanges({idField: 'id'}).subscribe(value =>  {
    this.parcelamentos = value;

    this.totalparcelas = this.parcelamentos.reduce( function( a, b ) {
      return a + b.valorparcela;
  }, 0 );

  this.totalsdorestante = this.parcelamentos.reduce( function( a, b ) {
    return a + b.saldorestante;
}, 0 );

const shirtsCollection = fs.collection('seriehistorica');
shirtsCollection.add({posicao: Timestamp.now(), tipo: "parcelamentos", total_parcelas_mensais: this.totalparcelas,totalsaldorestante: this.totalsdorestante });




       })

       this.fs.collection('update').valueChanges().subscribe(value =>  {
        this.update = value;

        this.pos = this.update[0].posicao

           })



}

openSnackBar(message: string, action: string) {
  this.sb.open(message, action,  {
    horizontalPosition: this.horizontalPosition,
    verticalPosition: this.verticalPosition,
    duration: this.durationInSeconds*1000,

  });
}

atualizar() {

     //exclui do grid parcelamentos liquidados

           this.fs.collection('parcelamentos',(ref)=> ref.where('ativa','==',true).where('parcelasrestantes', '==', 1)).valueChanges({idField: 'id'}).subscribe(value =>  {
            this.zero = value;

            if (this.zero.length ==0){
              this.openSnackBar("Não parcelamentos liquidados!", "OK");
            }else {

             for(let i=0;i<this.zero.length;i++){
                let id = this.zero[i].id;
                let hoje = Timestamp.now().toDate();
                let one = this.zero[i].ultimaparcela.toDate();
                let valor = this.zero[i].valorparcela;

                const now = moment(hoje); // Data de hoje
                const future = moment(one); // Outra data no passado
                const duration = moment.duration(future.diff(now));
                const months = duration.asMonths();

                 if (months <0){
                  let debito = this.fs.collection('parcelamentos').doc(id);
                  debito.update({ativa: false});
                  debito.update({parcelasrestantes: 0})
                  debito.update ({saldorestante:0})
                  debito.update({log: Timestamp.now()})
                 }else{
                this.qtdeparcelasfaltantes = Math.trunc(months) + 1
                this.saldorestante = this.qtdeparcelasfaltantes * valor
                //this.as.atualizarparcelamentos(id, this.qtdeparcelasfaltantes, this.saldorestante)
                }
              }
            }
          })

           this.fs.collection('parcelamentos',(ref)=> ref.where('ativa','==',true)).valueChanges({idField: 'id'}).subscribe(value =>  {
          this.fonte = value;
          console.log(this.fonte)

           for(let i=0;i<this.fonte.length;i++){
              let id = this.fonte[i].id;
              let hoje = Timestamp.now().toDate();
              let one = this.fonte[i].ultimaparcela.toDate();
              let valor = this.fonte[i].valorparcela;

              const now = moment(hoje); // Data de hoje
              const future = moment(one); // Outra data no passado
              const duration = moment.duration(future.diff(now));
               const months = duration.asMonths();
              this.qtdeparcelasfaltantes = Math.trunc(months) + 1
               this.saldorestante = this.qtdeparcelasfaltantes * valor
             // this.as.atualizarparcelamentos(id, this.qtdeparcelasfaltantes, this.saldorestante)
              console.log(id + "  atualizado com sucesso")

              }
              //this.openSnackBar("Parcelamentos atualizados com sucesso!", "OK")
            })






          }
  }



