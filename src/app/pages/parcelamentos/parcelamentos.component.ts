import { Component, ViewChild } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Timestamp } from 'firebase/firestore';
import * as moment from 'moment';
import { EMPTY_SUBSCRIPTION } from 'rxjs/internal/Subscription';
import { Parcelamento } from 'src/app/models/parcelamento';
import { AtualizacaoService } from 'src/app/services/atualizacao.service';

@Component({
  selector: 'app-parcelamentos',
  templateUrl: './parcelamentos.component.html',
  styleUrls: ['./parcelamentos.component.scss'],
})
export class ParcelamentosComponent {
  ResetForm() {
    throw new Error('Method not implemented.');
  }

 
}
