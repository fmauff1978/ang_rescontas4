import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { AtualizacaoService } from 'src/app/services/atualizacao.service';

@Component({
  selector: 'app-resultado',
  templateUrl: './resultado.component.html',
  styleUrls: ['./resultado.component.scss']
})
export class ResultadoComponent {

  displayedColumns = ['demo-position','conta','saldo', 'posicao']
  resultado: any = {};
  sum: number;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  dataSource: any = {};


  constructor(private fs: AngularFirestore, private as: AtualizacaoService, private sb: MatSnackBar){

    this.fs.collection('contas', (ref)=> ref.where('ativa', '==', true).where('natureza','==','resultado').orderBy('saldo', 'asc')).valueChanges({idField: 'id'}).subscribe(value =>  {
      this.resultado = value;
      console.log(this.resultado)


      this.sum = this.resultado.reduce( function( a, b ) {
        return a + b.saldo;
    }, 0 );

   this.as.atualizaresultado(this.sum);
    this.openSnackBar("Resultado atualizado com sucesso!", "OK");




         })
}



openSnackBar(message: string, action: string) {
  this.sb.open(message, action,  {
    horizontalPosition: this.horizontalPosition,
    verticalPosition: this.verticalPosition,
  });

}
}


