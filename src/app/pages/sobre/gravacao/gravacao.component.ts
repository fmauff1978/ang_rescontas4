import { Timestamp } from '@angular/fire/firestore';
import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { fonte2 } from './fonte2';


@Component({
  selector: 'app-gravacao',
  templateUrl: './gravacao.component.html',
  styleUrls: ['./gravacao.component.scss']
})


export class GravacaoComponent {



  valores: any={};
  fonte: any = {};

  constructor(private fs: AngularFirestore){

   // this.adjust()

   this.gravarConta()

   // this.ajustarData();

   // const valores = fonte2;
   // console.log(valores);
   // console.log(valores.length)

 // for (let i = 0; i < valores.length; i++) {

   // const gravar = valores[i]
   // this.gravardb(gravar)


    // }


    // this.fs
    // .collection('lancamentos2024')
    // .valueChanges({ idField: 'id' })
    // .subscribe((value) => {
    //   this.fonte = value})

  }




  gravardb(dadosgravar){

    const res = this.fs.collection('contas2025').add(dadosgravar).then(docRef =>{
      console.log("conta gravada com id: ", docRef.id);})
  }


  ajustarData(){

    const valores = fonte2;
    console.log(valores);
    console.log(valores.length)

    for (let i = 0; i < valores.length; i++) {

     // const gravar = valores[i].data;
     // const gravar2 = Timestamp.fromDate(new Date(gravar))
      //const gravar3 = Object.assign({}, valores[i], {data:gravar2})
      //this.gravardb(gravar3)

      //cod: `${Date.now()}`

      }

  }

  gravarConta(){


    const valores = fonte2;
    console.log(valores);
    console.log(valores.length)

    for (let i = 0; i < valores.length; i++) {

      const gravar = valores[i]
      this.gravardb(gravar)




      }



  }



  }




