import { LancamentoService } from './../../../services/lancamento.service';
import { Timestamp } from '@angular/fire/firestore';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { MatSnackBar } from '@angular/material/snack-bar';
import { AtualizacaoService } from 'src/app/services/atualizacao.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, map } from 'rxjs';
import { Conta } from 'src/app/models/conta';

@Component({
  selector: 'app-criar-lancamentos',
  templateUrl: './criar-lancamentos.component.html',
  styleUrls: ['./criar-lancamentos.component.scss']
})
export class CriarLancamentosComponent implements OnInit {

startDate = new Date(2024, 0, 1);
contas: any ={};
meuForm!: FormGroup;
contas$: Observable<Conta[]>;


constructor(private fs: AngularFirestore, private ls: LancamentoService, private sb: MatSnackBar, private fb: FormBuilder){

  this.fs.collection('contas', (ref)=> ref.where('ativa', '==', true).orderBy('conta', 'asc')).valueChanges({idField: 'id'}).subscribe(value =>  {
    this.contas = value;

       })
}
  ngOnInit()  {

    this.iniciarmeuForm();
   
  }

  OnSubmit() {
    console.log(this.meuForm)
    let splitted_deb = this.meuForm.value.ctadebitada.split('-');
    let splitted_cred = this.meuForm.value.ctacreditada.split('-');
   

    const cont_debid = splitted_deb[0];
    const cont_cred = splitted_cred[0];
    const bucket_despdeb = splitted_deb[5];
    const bucket_desprec = splitted_cred[5];

    const lctogravar = {

      datadolancamento: this.meuForm.value.datalcto,
      descricao: this.meuForm.value.descricao,
      cod: `${Date.now()}`,
      conta_debitada: {contadeb_id: splitted_deb[0],
                      cod_deb: splitted_deb[1],
                      contadeb: splitted_deb[2],
                      naturezadeb: splitted_deb[3],
                      enquadramentodeb: splitted_deb[4],
                      mod_despesa_deb: splitted_deb[5]},
      conta_creditada: {contacred_id: splitted_cred[0],
                        cod_cred: splitted_cred[1],
                        contacred: splitted_cred[2],
                        naturezacred: splitted_cred[3],
                        enquadramentocred: splitted_cred[4],
                        mod_despesa_cred: splitted_cred[5]},
      valor: this.meuForm.value.valor,
      log: Timestamp.now()
    }
    this.ls.saveData(lctogravar);

    }

iniciarmeuForm(){

  this.meuForm = this.fb.group({
    datalcto: [' '],
    descricao: [' '],
    ctadebitada: [' '],
    ctacreditada: [' '],
    valor: [' '],
    log: [Timestamp.now()],
  });
}

ResetForm() {
  this.meuForm.reset();
}




}
