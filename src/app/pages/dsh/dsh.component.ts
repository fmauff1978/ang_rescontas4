import { Component, OnInit } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import * as moment from 'moment';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {MatSort, Sort, MatSortModule} from '@angular/material/sort';
import {AfterViewInit,  ViewChild} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

import {NgFor} from '@angular/common';
import { Conta } from 'src/app/models/conta';




@Component({
  selector: 'app-dsh',
  templateUrl: './dsh.component.html',
  styleUrls: ['./dsh.component.scss']
})
export class DshComponent implements OnInit{


  val: any = {};
  despesas: any = {} ;
  sum: number;

  displayedColumns = ['cod','nome','saldoatual', 'posicao']




  constructor(private fs: AngularFirestore, private _liveAnnouncer: LiveAnnouncer){}


  ngOnInit() {


    this.fs.collection('agregados', (ref) => ref.orderBy('cod', 'asc')).valueChanges().subscribe(value => {
      this.val = value;


      this.sum = this.val.reduce( function( a, b ) {
        return a + b.saldo_atual;
    }, 0 );
    })


  }






}

