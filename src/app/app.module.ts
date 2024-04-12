import {  NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DshComponent } from './pages/dsh/dsh.component';
import { ContasComponent } from './pages/contas/contas.component';
import { LancamentosComponent } from './pages/lancamentos/lancamentos.component';
import { ParcelamentosComponent } from './pages/parcelamentos/parcelamentos.component';
import { CdcComponent } from './pages/cdc/cdc.component';
import { SobreComponent } from './pages/sobre/sobre.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';

import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import {NgIf} from '@angular/common';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatDividerModule} from '@angular/material/divider';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreModule} from '@angular/fire/compat/firestore';
import { AngularFireModule} from '@angular/fire/compat';
import { DEFAULT_CURRENCY_CODE, LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import ptBr from '@angular/common/locales/pt';
import {MatSort, Sort, MatSortModule} from '@angular/material/sort';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import { DshContasComponent } from './pages/dsh-contas/dsh-contas.component';
import { AtivoComponent } from './pages/contas/ativo/ativo.component';
import { PassivoComponent } from './pages/contas/passivo/passivo.component';
import { DespesaComponent } from './pages/contas/despesa/despesa.component';
import { ReceitaComponent } from './pages/contas/receita/receita.component';
import { ResultadoComponent } from './pages/contas/resultado/resultado.component';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarModule,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTableDataSource} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import { CriarLancamentosComponent } from './pages/lancamentos/criar-lancamentos/criar-lancamentos.component';
import {MatDatepickerModule} from '@angular/material/datepicker';

import {MatNativeDateModule} from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';




registerLocaleData(ptBr);


@NgModule({
  declarations: [
    AppComponent,
    DshComponent,
    ContasComponent,
    LancamentosComponent,
    ParcelamentosComponent,
    CdcComponent,
    SobreComponent,
    HeaderComponent,
    FooterComponent,
    DshContasComponent,
    AtivoComponent,
    PassivoComponent,
    DespesaComponent,
    ReceitaComponent,
    ResultadoComponent,
    CriarLancamentosComponent


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    //provideFirebaseApp(() => initializeApp(environment.firebase)),
   // provideFirestore(() => getFirestore()),
    BrowserAnimationsModule,
    MatIconModule,
    MatSidenavModule,
    MatButtonModule,
    MatToolbarModule,
    MatMenuModule,
    NgIf,
    MatCardModule,
    MatProgressBarModule,
    MatTableModule,
    AngularFirestoreModule,
    MatSortModule,
       MatPaginatorModule,
       MatSnackBarModule,
       MatSelectModule,
       MatFormFieldModule,
       MatInputModule,
       MatIconModule,
       MatDatepickerModule,
       MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule,ReactiveFormsModule, FormsModule,
       
  ],
  providers: [{provide: LOCALE_ID,useValue:'pt'},{ provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
