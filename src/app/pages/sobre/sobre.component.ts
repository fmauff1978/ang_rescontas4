import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Timestamp } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AtualizacaoService } from 'src/app/services/atualizacao.service';

@Component({
  selector: 'app-sobre',
  templateUrl: './sobre.component.html',
  styleUrls: ['./sobre.component.scss']
})
export class SobreComponent {


  despesas : any = {};
  sum: number;

 constructor(private fs: AngularFirestore, private as: AtualizacaoService, private sb: MatSnackBar){

    this.fs.collection('contas', (ref)=> ref.where('ativa', '==', true).where('natureza','==','despesa').orderBy('saldo', 'desc')).valueChanges({idField: 'id'}).subscribe(value =>  {
      this.despesas = value;
      console.log(this.despesas)


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
//}

}
}
