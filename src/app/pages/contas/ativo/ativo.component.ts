import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { AtualizacaoService } from 'src/app/services/atualizacao.service';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-ativo',
  templateUrl: './ativo.component.html',
  styleUrls: ['./ativo.component.scss']
})
export class AtivoComponent {

 displayedColumns = ['demo-position','conta','enq','saldo', 'posicao']

  ativos: any = {};
  sum: number;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private fs: AngularFirestore, private as: AtualizacaoService, private sb: MatSnackBar){

    this.fs.collection('contas', (ref)=> ref.where('ativa', '==', true).where('natureza', '==','ativo').orderBy('enquadramento', 'asc').orderBy('cod', 'asc')).valueChanges({idField: 'id'}).subscribe(value =>  {
      this.ativos = value;


      this.sum = this.ativos.reduce( function( a, b ) {
        return a + b.saldo;
    }, 0 );

    this.as.atualizarativo(this.sum);
    this.openSnackBar("Ativo atualizado com sucesso!", "OK");

         })
}



openSnackBar(message: string, action: string) {
  this.sb.open(message, action,  {
    horizontalPosition: this.horizontalPosition,
    verticalPosition: this.verticalPosition,
  });
}
}
