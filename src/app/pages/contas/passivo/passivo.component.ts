import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { AtualizacaoService } from 'src/app/services/atualizacao.service';

@Component({
  selector: 'app-passivo',
  templateUrl: './passivo.component.html',
  styleUrls: ['./passivo.component.scss']
})
export class PassivoComponent {


  displayedColumns = ['demo-position','conta','enq','saldo', 'posicao']

  passivos: any = {};
  sum: number;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private fs: AngularFirestore, private as: AtualizacaoService, private sb: MatSnackBar){

    this.fs.collection('contas', (ref)=> ref.where('ativa', '==', true).where('natureza', '==','passivo').orderBy('enquadramento', 'asc').orderBy('cod', 'asc')).valueChanges({idField: 'id'}).subscribe(value =>  {
      this.passivos = value;


      this.sum = this.passivos.reduce( function( a, b ) {
        return a + b.saldo;
    }, 0 );

    this.as.atualizarpassivo(this.sum);
    this.openSnackBar("Passivo atualizado com sucesso!", "OK");

         })
}

openSnackBar(message: string, action: string) {
  this.sb.open(message, action,  {
    horizontalPosition: this.horizontalPosition,
    verticalPosition: this.verticalPosition,
  });
}

}
