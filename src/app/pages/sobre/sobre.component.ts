import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Timestamp } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as moment from 'moment';
import { AtualizacaoService } from 'src/app/services/atualizacao.service';

@Component({
  selector: 'app-sobre',
  templateUrl: './sobre.component.html',
  styleUrls: ['./sobre.component.scss']
})
export class SobreComponent {


  despesas : any = {};
  sum: number;
  qtdeparcelasfaltantes: number;
  saldorestante: number;

 constructor(private fs: AngularFirestore, private as: AtualizacaoService, private sb: MatSnackBar){

    this.fs.collection('contas', (ref)=> ref.where('ativa', '==', true).where('natureza','==','despesa').orderBy('saldo', 'desc')).valueChanges({idField: 'id'}).subscribe(value =>  {
      this.despesas = value;
      console.log(this.despesas)

      let result = this.despesas.map(x=> [x.id, x.conta, x.cod, x.natureza, x.saldo, x.enquadramento, x.mod_despesa])
      console.log(result)




      this.sum = this.despesas.reduce( function( a, b ) {
        return a + b.saldo;
    }, 0 );

     // for (let i=0;i<this.despesas.length;i++){

       // let id = this.despesas[i].id;
      //  let debito15 = this.fs.collection('contas').doc(id);
         ///     debito15.update({log: Timestamp.now()});
   //   }
//console.log("terminado")

       })

       this.fs.collection('parcelamentos', (ref)=> ref.where('ativa', '==', true)).valueChanges({idField: 'id'}).subscribe(value =>  {
        this.despesas = value;
        //console.log(this.despesas)


        for (let i=0;i<this.despesas.length;i++){

           let id = this.despesas[i].id;
          let datacompra = this.despesas[i].datadacompra;
          let ultparcela = this.despesas[i].dataparcela;
          let splitted_dc = this.despesas[i].datadacompra.split('-');
          let splitted_up = this.despesas[i].dataparcela.split('-');;
          let data_t = new Date (splitted_up[0], splitted_up[1]-1, splitted_up[2])

          let debito = this.fs.collection('parcelamentos').doc(id);
         // debito.update({datadacompra:(data_t)});






            ///     debito15.update({log: Timestamp.now()});
      //   }



        }

      })

      this.fs.collection('parcelamentos',(ref)=> ref.where('ativa','==',true).where('parcelasrestantes', '==', 1)).valueChanges({idField: 'id'}).subscribe(value =>  {
        this.despesas = value;
      //  console.log(this.despesas)

         for(let i=0;i<this.despesas.length;i++){
            let id = this.despesas[i].id;
            let hoje = Timestamp.now().toDate();
            let one = this.despesas[i].ultimaparcela.toDate();
            let valor = this.despesas[i].valorparcela;

           // console.log(id, hoje,one,valor)

            const now = moment(hoje); // Data de hoje
            const future = moment(one); // Outra data no passado
            const duration = moment.duration(future.diff(now));
             const months = duration.asMonths();
           //  console.log(months)

             if (months <0){
              let debito = this.fs.collection('parcelamentos').doc(id);
             // debito.update({ativa: false});
             // debito.update({parcelasrestantes: 0})
            //  debito.update({log: Timestamp.now()})
             }else{

            this.qtdeparcelasfaltantes = Math.trunc(months) + 1
          //  console.log(this.qtdeparcelasfaltantes)
             this.saldorestante = this.qtdeparcelasfaltantes * valor
           // this.as.atualizarparcelamentos(id, this.qtdeparcelasfaltantes, this.saldorestante)
           // console.log(id + "  atualizado com sucesso")

            }
            //this.openSnackBar("Parcelamentos atualizados com sucesso!", "OK")
          }
        })




//}

}
}
