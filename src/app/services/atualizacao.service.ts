import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Timestamp } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AtualizacaoService {

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

  }

  atualizarreceita (valor){
    let debito = this.fs.collection('agregados').doc('Ugi07FMMNu2c7xyAlJDz');
    debito.update({saldo_atual:(valor)});
    debito.update({log: Timestamp.now()});}


atualizaresultado (valor){
    let debito = this.fs.collection('agregados').doc('XRmnPtKzi8VJQA6SmWLD');
    debito.update({saldo_atual:(valor)});
    debito.update({log: Timestamp.now()});}


}
