import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Timestamp } from '@angular/fire/firestore';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LancamentoService } from 'src/app/services/lancamento.service';

@Component({
  selector: 'app-criar-parcelamento',
  templateUrl: './criar-parcelamento.component.html',
  styleUrls: ['./criar-parcelamento.component.scss']
})
export class CriarParcelamentoComponent {




startDate = new Date();
contas: any ={};
meuForm!: FormGroup;
picker1: any;

constructor(private fs: AngularFirestore, private sb: MatSnackBar, private fb: FormBuilder, private ls: LancamentoService){

  this.fs.collection('contas', (ref)=> ref.where('enquadramento', '==', 'rotativo').where('ativa', '==', true).orderBy('conta', 'asc')).valueChanges({idField: 'id'}).subscribe(value =>  {
    this.contas = value;

       })
this.iniciarmeuForm()

}

iniciarmeuForm(){

  this.meuForm = this.fb.group({
    datacompra: [' '],
    descricao: [' '],
    cartaovinculado: [' '],
    origem: [' '],
    qtdeparc: [' '],
    dataprimeiraparcela: [' '],
    valor: [' '],
    log: [Timestamp.now()],
  });
}

ResetForm() {
  this.meuForm.reset();
}

OnSubmit() {

  let cardvinculado = this.meuForm.value.cartaovinculado.split('-');
  let primeiraparcela = this.meuForm.value.dataprimeiraparcela;
  console.log(primeiraparcela)


  const monthsToAdd = (this.meuForm.value.qtdeparc)-1;
  const ultparc = this.addMonths(primeiraparcela, monthsToAdd);
  console.log(ultparc)


  const parcelamentogravar = {
    ativa: true,
    datadacompra: this.meuForm.value.datacompra,
    descricao: this.meuForm.value.descricao.toUpperCase(),
    cod: `${Date.now()}`,
    cartaovinculado: {cod: cardvinculado[1],
                    enquadramento:'rotativo',
                    nome: cardvinculado[2]
                    },
    dataparcela: this.meuForm.value.dataprimeiraparcela,
    enq: "cartao",
    valorparcela: this.meuForm.value.valor,
    origem: this.meuForm.value.origem,
    parcelasrestantes: this.meuForm.value.qtdeparc,
    qtdedeparcelas: this.meuForm.value.qtdeparc,
    saldorestante: (this.meuForm.value.qtdeparc)*(this.meuForm.value.valor),
    sv: false,
    ultimaparcela: ultparc,
    valorcompra: (this.meuForm.value.qtdeparc)*(this.meuForm.value.valor),
    log: Timestamp.now()
  }
 this.ls.saveParc(parcelamentogravar);


}

addMonths(date, months) {
  const newDate = new Date(date.valueOf());
  const currentMonth = newDate.getMonth();
  const newMonth = currentMonth + months;
  newDate.setMonth(newMonth);
  // Verifique se o dia do mês mudou após adicionar os meses
  if (newDate.getDate() !== date.getDate()) {
    // Ajuste a data para o último dia do mês anterior
    newDate.setDate(0);
  }
  return newDate;
}

}
