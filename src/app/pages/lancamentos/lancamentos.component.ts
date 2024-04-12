import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { AtualizacaoService } from 'src/app/services/atualizacao.service';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-lancamentos',
  templateUrl: './lancamentos.component.html',
  styleUrls: ['./lancamentos.component.scss']
})
export class LancamentosComponent {


  displayedColumns = ['demo-position','data','cod', 'lancamento', 'ctadebitada', 'ctacreditada', 'valor', 'posicao']
  lctos: any = {};
  sum: number;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  dataSource: any = {};


  constructor(private fs: AngularFirestore, private as: AtualizacaoService, private sb: MatSnackBar){

    this.fs.collection('lancamentos',(ref)=> ref.orderBy('datadolancamento', 'desc')).valueChanges({idField: 'id'}).subscribe(value =>  {
      this.lctos = value;
     
          })
}





}
