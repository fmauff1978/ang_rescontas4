import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FieldValue, Timestamp } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Conta } from '../models/conta';

@Injectable({
  providedIn: 'root'
})
export class AtualizacaoService {


 agregados: Observable<Conta[]>;
 fonte: any ={}

  constructor(private fs: AngularFirestore) { }

  atualizarativo (valor){
    let debito = this.fs.collection('agregados').doc('UQaBjTeHnn0OFKsWqL1b');
    debito.update({saldo_atual:(valor)});
    debito.update({log: Timestamp.now()});

  }

  atualizarpassivo (valor){
    let debito = this.fs.collection('agregados').doc('5sZmf4Rb1XJSelYK4yWw');
    debito.update({saldo_atual:(valor)});
    debito.update({log: Timestamp.now()});

  }

  atualizardespesa (valor){
    let debito = this.fs.collection('agregados').doc('lBxGgx2QkBC1ZnVVVndY');
    debito.update({saldo_atual:(valor)});
    debito.update({log: Timestamp.now()});

    let debito1 = this.fs.collection('sub_agregados').doc('bE6JzbSXhEI63Nkhn43P');
    debito1.update({saldo_atual:(valor)});
    debito1.update({log: Timestamp.now()});


  }

  atualizarreceita (valor){
    let debito = this.fs.collection('agregados').doc('Ugi07FMMNu2c7xyAlJDz');
    debito.update({saldo_atual:(valor)});
    debito.update({log: Timestamp.now()});


    let debito1 = this.fs.collection('sub_agregados').doc('QL2ucPyihtUZaxfSd9gX');
    debito1.update({saldo_atual:(valor*(-1))});
    debito1.update({log: Timestamp.now()});

  }


atualizaresultado (valor){
    let debito = this.fs.collection('agregados').doc('XRmnPtKzi8VJQA6SmWLD');
    debito.update({saldo_atual:(valor)});
    debito.update({log: Timestamp.now()});

  }


  pegarcontas (){

    this.agregados = this.fs.collection<Conta>('agregados').valueChanges({idField: 'id'})
    return this.agregados
  }

  atualizarbucket(id: string, valor: number) {

    let debito = this.fs.collection('sub_agregados').doc(id);
    debito.update({saldo_atual:(valor)});
    debito.update({log: Timestamp.now()});
  }





async atualizarparcelamentos(id, qtde, saldorestante){

  let debito15 =  await this.fs.collection('parcelamentos').doc(id);
   await debito15.update({parcelasrestantes: (qtde)} )
  await debito15.update({saldorestante: (saldorestante)})
 await debito15.update ({log: Timestamp.now()})

}



pegarparcelamentos (){

  return this.fs.collection('parcelamentos', (ref)=> ref.where('ativa','==',true)).valueChanges({idField: 'id'})

}

}



