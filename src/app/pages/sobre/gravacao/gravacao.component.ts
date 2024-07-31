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

  constructor(private fs: AngularFirestore){


    const valores = fonte2;
    console.log(valores);
    console.log(valores.length)

  for (let i = 0; i < valores.length; i++) {

    const gravar = valores[i]
    const res = this.fs.collection('contas25').add(gravar).then(docRef =>{
      console.log("conta gravada com id: ", docRef.id);

     })


    }


  }


  }


