import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { AtualizacaoService } from 'src/app/services/atualizacao.service';

@Component({
  selector: 'app-despesa',
  templateUrl: './despesa.component.html',
  styleUrls: ['./despesa.component.scss']
})
export class DespesaComponent {

  displayedColumns = ['demo-position','conta','enq','saldo', 'posicao']
  despesas: any = {};
  sum: number;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  dataSource: any = {};


  constructor(private fs: AngularFirestore, private as: AtualizacaoService, private sb: MatSnackBar){

    this.fs.collection('contas', (ref)=> ref.where('ativa', '==', true).where('natureza','==','despesa').orderBy('saldo', 'desc')).valueChanges({idField: 'id'}).subscribe(value =>  {
      this.despesas = value;
      console.log(this.despesas)


      this.sum = this.despesas.reduce( function( a, b ) {
        return a + b.saldo;
    }, 0 );

   this.as.atualizardespesa(this.sum);
    this.openSnackBar("Despesas atualizadas com sucesso!", "OK");

     


         })
}



openSnackBar(message: string, action: string) {
  this.sb.open(message, action,  {
    horizontalPosition: this.horizontalPosition,
    verticalPosition: this.verticalPosition,
  });
}

applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();
}



}
