import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { AtualizacaoService } from 'src/app/services/atualizacao.service';

@Component({
  selector: 'app-agregados',
  templateUrl: './agregados.component.html',
  styleUrls: ['./agregados.component.scss']
})
export class AgregadosComponent implements OnInit {


  
 displayedColumns = ['demo-position','agregado','saldo', 'posicao']
 sub: any = {};
 sum: number;
 sumcompr: number;
 compr: any = {}
 ger: any = {}
 off: any = {}
 horizontalPosition: MatSnackBarHorizontalPosition = 'center';
 verticalPosition: MatSnackBarVerticalPosition = 'top';
  buckets = [];
  superavit : number ;


 constructor(private fs: AngularFirestore, private as: AtualizacaoService, private sb: MatSnackBar){

  this.fs.collection('sub_agregados', (ref)=> ref.where('descricao', '==', 'bucket').orderBy('cod', 'desc')).valueChanges({idField: 'id'}).subscribe(value =>  {
    this.sub = value; 

  //this.as.atualizarativo(this.sum);
 // this.openSnackBar("Ativo atualizado com sucesso!", "OK");

       })
}



ngOnInit() {

    this.fs.collection('contas', (ref)=> ref.where("natureza", "==", "despesa").where("mod_despesa",'==', "compromissada").where("ativa","==", true)).valueChanges({idField: 'id'}).subscribe(value =>  {
      this.compr = value;

      this.sumcompr = this.compr.reduce( function( a, b ) {
        return a + b.saldo;
          }, 0 );   
      
  this.as.atualizarbucket("9W8ZVFbgQkkwCpAjEY8b", this.sumcompr);    
    })

    this.fs.collection('contas', (ref)=> ref.where("natureza", "==", "despesa").where("mod_despesa",'==', "gerenciável").where("ativa","==", true)).valueChanges({idField: 'id'}).subscribe(value =>  {
      this.ger = value;

      this.sumcompr = this.ger.reduce( function( a, b ) {
        return a + b.saldo;
          }, 0 );   
      
  this.as.atualizarbucket("69pkU9qFFRR57xRLnBvi", this.sumcompr);    
    })

    this.fs.collection('contas', (ref)=> ref.where("natureza", "==", "despesa").where("mod_despesa",'==', "off").where("ativa","==", true)).valueChanges({idField: 'id'}).subscribe(value =>  {
      this.off = value;

      this.sumcompr = this.off.reduce( function( a, b ) {
        return a + b.saldo;
          }, 0 );   
      
  this.as.atualizarbucket("OYGBZIs2mVu43LuFptr1", this.sumcompr);    
    })


    this.fs.collection('sub_agregados', (ref)=> ref.where("cod", "in", [38,39])).valueChanges({idField: 'id'}).subscribe(value =>  {
      this.sub = value;

      this.sum = this.sub.reduce( function( a, b ) {
        return a + b.saldo_atual;
          }, 0 );   
      
  this.as.atualizarbucket("yDW6dJMmfT13jCBWUq2z", this.sum);    
    })

    this.fs.collection('contas', (ref)=> ref.where("cod", "in", [32,40,37,35,39])).valueChanges({idField: 'id'}).subscribe(value =>  {
      this.sub = value;

      this.sum = this.sub.reduce( function( a, b ) {
        return a + b.saldo;
          }, 0 );   
      
  this.as.atualizarbucket("4xArAMaYZVXgJzpLeX12", this.sum);    
    })


    this.fs.collection('contas', (ref)=> ref.where("natureza", "==", "ativo").where("enquadramento" , "==", "investimento")).valueChanges({idField: 'id'}).subscribe(value =>  {
      this.sub = value;

      this.sum = this.sub.reduce( function( a, b ) {
        return a + b.saldo;
          }, 0 );   
      
  this.as.atualizarbucket("ATWm8m90ckEWSgGVgih7", this.sum);    
    })

    this.fs.collection('sub_agregados', (ref)=> ref.where("cod", "in", [41,39.5])).valueChanges({idField: 'id'}).subscribe(value =>  {
      this.sub = value;

      let receita = this.sub[0].saldo_atual;
      let despesa = this.sub[1].saldo_atual;
      this.superavit = receita - despesa;
     
 
    })
     
     
        
       
  
   
  }



openSnackBar(message: string, action: string) {
this.sb.open(message, action,  {
  horizontalPosition: this.horizontalPosition,
  verticalPosition: this.verticalPosition,
});
}




}
