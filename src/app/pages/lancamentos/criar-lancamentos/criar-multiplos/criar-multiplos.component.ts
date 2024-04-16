import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Timestamp } from '@angular/fire/firestore';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LancamentoService } from 'src/app/services/lancamento.service';

@Component({
  selector: 'app-criar-multiplos',
  templateUrl: './criar-multiplos.component.html',
  styleUrls: ['./criar-multiplos.component.scss']
})
export class CriarMultiplosComponent {
  lctos: any;


addLesson() {

  const lcForm = this.fb.group({

    datalcto: [' '],
    descricao: [' '],
    ctadebitada: [' '],
    valor: ['']
    
});

this.lctos.push(lcForm);
}



ResetForm() {
throw new Error('Method not implemented.');
}
OnSubmit() {
throw new Error('Method not implemented.');
}


  startDate = new Date(2024, 0, 1);
contas: any ={};
meuForm!: FormGroup;



constructor(private fs: AngularFirestore, private ls: LancamentoService, private sb: MatSnackBar, private fb: FormBuilder){

  this.fs.collection('contas', (ref)=> ref.where('ativa', '==', true).orderBy('conta', 'asc')).valueChanges({idField: 'id'}).subscribe(value =>  {
    this.contas = value;

    this.iniciarmeuForm();

       })
}

iniciarmeuForm(){

  this.meuForm = this.fb.group({
    datalcto: [' '],
    descricao: [' '],
    ctadebitada: [' '],
    ctacreditada: [' '],
    valor: [' '],
    log: [Timestamp.now()],
    lctos: this.fb.array([])

  });
}


getLctos(){

  return this.meuForm.controls['lctos'] as FormArray;
}

}
