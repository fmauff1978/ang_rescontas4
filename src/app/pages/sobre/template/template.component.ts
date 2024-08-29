import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Timestamp } from '@angular/fire/firestore';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss'],
})
export class TemplateComponent {

addConta() {
throw new Error('Method not implemented.');
}
  startDate: any;
  contas: any ={}
  fonte: any ={}

constructor(private fb: FormBuilder, private fs: AngularFirestore){

  this.iniciarmeuForm();


  this.fs.collection('contas', (ref)=> ref.where('enquadramento', '==', 'fopag').where('ativa', '==', true)).valueChanges({idField: 'id'}).subscribe(value =>  {
    this.contas = value;

    console.log(this.contas)

       })

  }


  OnSubmit() {

    //const previ80 = (this.meuForm.value.previ+this.meuForm.value.previ2b)*0.80;


    //const fonte = [{id:"BmRfD5cDNg57cX04j6Mg", cod: }]


    const lote = {

      datadolancamento: this.meuForm.value.datalcto,
      descricao: this.meuForm.value.descricao,
      cod: `${Date.now()}`,
      previ: this.meuForm.value.previ,
      previ2b: this.meuForm.value.previ2b,
      previ80: (this.meuForm.value.previ+this.meuForm.value.previ2b)*0.80,
      cassi: this.meuForm.value.cassi,
      fgts: this.meuForm.value.fgts,
      ir: this.meuForm.value.ir,
      inss: this.meuForm.value.inss,
      cassi_fabio: this.meuForm.value.cassi_fabio,
      cassi_rosa: this.meuForm.value.cassi_rosa,
      cassi_lfelipe: this.meuForm.value.cassi_lfelipe,
      esprevi:this.meuForm.value.esprevi,
      previ13:this.meuForm.value.previ13,
      prov: this.meuForm.value.prov,
      contsind: this.meuForm.value.contsind,
      valorcred:this.meuForm.value.previ+this.meuForm.value.previ2b+((this.meuForm.value.previ+this.meuForm.value.previ2b)*0,80)+
      this.meuForm.value.cassi+this.meuForm.value.fgts+this.meuForm.value.ir+this.meuForm.value.inss+
      this.meuForm.value.cassi_fabio+this.meuForm.value.cassi_rosa+this.meuForm.value.cassi_lfelipe+
      this.meuForm.value.prov+this.meuForm.value.contsind+this.meuForm.value.esprevi+this.meuForm.value.previ13,
      log: Timestamp.now()
    }

    console.log(lote)
    console.log("rodando: "+ this.contas)

    const lctogravar = {

      datadolancamento: this.meuForm.value.datalcto,
      descricao: this.meuForm.value.descricao,
      cod: `${Date.now()}`,
     // conta_debitada: {contadeb_id: splitted_deb[0],
                   //   cod_deb: splitted_deb[1],
                    //  contadeb: splitted_deb[2],
                   //   naturezadeb: splitted_deb[3],
                   //   enquadramentodeb: splitted_deb[4],
                  //    mod_despesa_deb: splitted_deb[5]},
      //conta_creditada: {contacred_id: splitted_cred[0],
                      //  cod_cred: splitted_cred[1],
                      //  contacred: splitted_cred[2],
                      //  naturezacred: splitted_cred[3],
                       // enquadramentocred: splitted_cred[4],
                       // mod_despesa_cred: splitted_cred[5]},
      valor: this.meuForm.value.valor,
      log: Timestamp.now()
    }





  }

  meuForm: FormGroup;

  iniciarmeuForm() {
    this.meuForm = this.fb.group({
      datalcto: [' '],
      descricao: [' '],
      ctadebitada: [' '],
      ctacreditada: [' '],
      valorcred: [' '],
      previ: [' '],
      previ2b: [''],
      previ80: [' '],
      cassi: [' '],
      inss: [' '],
      ir: [' '],
      fgts: [' '],
      cassi_fabio: [' '],
      cassi_rosa: [' '],
      cassi_lfelipe: [' '],
      contsind: [' '],
      prov: [' '],
      esprevi: [' '],
      previ13: [' ']

    });
  }

  ResetForm() {
    this.meuForm.reset();
  }
}
