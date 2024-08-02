import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Timestamp } from '@angular/fire/firestore';

@Component({
  selector: 'app-gerarsaldos',
  templateUrl: './gerarsaldos.component.html',
  styleUrls: ['./gerarsaldos.component.scss']
})
export class GerarsaldosComponent {

zero : any={}
  saldo: number;
  lctos: any = [];


  constructor(private fs: AngularFirestore){

   // this.gerarSaldos();

 //   this.fs
   //   .collection('lancamentos_2024').valueChanges({ idField: 'id' })
     // .subscribe(async (value) => {
       // this.zero = value
        //console.log(this.zero)})
  }

  gravardb(dadosgravar){

    const res = this.fs.collection('saldos_2024').add(dadosgravar).then(docRef =>{
      console.log("saldo gravado com id: ", docRef.id);})

  }




  gerarSaldos(){

    console.log(this.lctos)
    console.log(typeof this.lctos);
    for (let i = 1; i < 3; i++) {

      this.fs
    .collection('lancamentos_2024', (ref) =>
      ref.where('cod', '==', i))
    .valueChanges({ idField: 'id' })
    .subscribe((value) => {
      this.lctos = value;




      this.saldo = this.lctos.reduce(function (a, b) {return a + b.valor}, 0);


        const saldoagravar = {

          cod : i,
          conta: this.lctos[0].conta,
          saldo: this.saldo,
          atualizado_em: Timestamp.now()

        }


       console.log(saldoagravar) })


      }

    }


      }







