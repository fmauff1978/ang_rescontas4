import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { AtualizacaoService } from 'src/app/services/atualizacao.service';

@Component({
  selector: 'app-receita',
  templateUrl: './receita.component.html',
  styleUrls: ['./receita.component.scss']
})
export class ReceitaComponent {

  displayedColumns = ['demo-position','conta','saldo', 'posicao']
  receitas: any = {};
  sum: number;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  dataSource: any = {};


  constructor(private fs: AngularFirestore, private as: AtualizacaoService, private sb: MatSnackBar){

    this.fs.collection('contas', (ref)=> ref.where('ativa', '==', true).where('natureza','==','receita').orderBy('saldo', 'asc')).valueChanges({idField: 'id'}).subscribe(value =>  {
      this.receitas = value;
      console.log(this.receitas)


      this.sum = this.receitas.reduce( function( a, b ) {
        return a + b.saldo;
    }, 0 );

   this.as.atualizarreceita(this.sum);
    this.openSnackBar("Receitas atualizadas com sucesso!", "OK");




         })
}



openSnackBar(message: string, action: string) {
  this.sb.open(message, action,  {
    horizontalPosition: this.horizontalPosition,
    verticalPosition: this.verticalPosition,
  });

}
}
