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
export class DshComponent implements OnInit, AfterViewInit{


  val: any = {};
  despesas: any = {} ;
  sum: number;
  diasdec: number;
  displayedColumns = ['cod','nome','saldoatual', 'posicao']
  displayedCol = ['cod', 'nome', 'tipo', 'objetivo', 'realizado', 'atg']
  sortedData: [] = [];
  ds = new MatTableDataSource<Conta>();




  constructor(private fs: AngularFirestore, private _liveAnnouncer: LiveAnnouncer){}


  ngOnInit() {


    this.fs.collection('agregados', (ref) => ref.orderBy('cod', 'asc')).valueChanges().subscribe(value => {
      this.val = value;


      this.sum = this.val.reduce( function( a, b ) {
        return a + b.saldo_atual;
    }, 0 );
    })

    this.fs.collection('contas', (ref)=> ref.where('ativa', '==', true).where('gd', '!=', 0).orderBy('saldo', 'desc')).valueChanges({idField: 'id'}).subscribe(value =>  {
      this.despesas = value;
      console.log(this.despesas)

      this.sortedData = this.despesas.slice();

      console.log(this.sortedData)



    })


      let start=moment(Date.now());
      let end1 = new Date (2024, 11,31)
      let duration = moment.duration(start.diff(end1)).asDays() * (-1);
      let dias_faltantes = Math.trunc(duration) + 1
      let dias_decorridos = 366-dias_faltantes;
      this.diasdec = dias_decorridos;


console.log(this.ds)

  }

  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.ds = new MatTableDataSource<Conta>(this.despesas);
    this.ds.sort = this.sort;
  }




   announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }




}

