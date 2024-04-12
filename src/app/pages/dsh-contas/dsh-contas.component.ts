import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import * as moment from 'moment';
import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatSort, Sort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Conta } from 'src/app/models/conta';

@Component({
  selector: 'app-dsh-contas',
  templateUrl: './dsh-contas.component.html',
  styleUrls: ['./dsh-contas.component.scss']
})

export class DshContasComponent implements AfterViewInit {

  @Input() despesas: any[] = [];

  displayedColumns = ['cod', 'conta', 'enq', 'objetivo'];
  dataSource = new MatTableDataSource<Conta>();
  diasdec: number;
  ativos$: Observable<Conta[]> ;



  constructor(private fs: AngularFirestore, private _liveAnnouncer: LiveAnnouncer){
    this.fs.collection('contas', (ref)=> ref.where('ativa', '==', true).where('mod_despesa', '!=', 'off').orderBy('saldo', 'desc')).valueChanges({idField: 'id'}).subscribe(value =>  {
    this.despesas = value
    console.log(this.despesas)
   


  }
  )

   let start=moment(Date.now());
   let end1 = new Date (2024, 11,31)
   let duration = moment.duration(start.diff(end1)).asDays() * (-1);
   let dias_faltantes = Math.trunc(duration) + 1;
   let dias_decorridos = 366-dias_faltantes;
   this.diasdec = dias_decorridos;

   this.ativos$ =this.fs.collection('contas', (ref) => ref.where('natureza','==',"ativo").orderBy('enquadramento', 'asc').orderBy('cod','asc')).get().pipe(map((result)=> this.convertSnaps<Conta>(result)));



  }



  @ViewChild(MatSort) sort: MatSort;

ngAfterViewInit() {
   this.dataSource.sort = this.sort;

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

  convertSnaps<T>(results){
    return <T[]> results.docs.map(snap=>{
      return{
        id:snap.id,
        ...<any> snap.data()
   }
    })
   }

   getContas(){

  let debito = this.fs.collection('agregados').get();
    console.log(debito)
   }




}


