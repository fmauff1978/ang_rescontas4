import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LancamentoService {

  res: any;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  durationInSeconds=2;

  constructor(private fs: AngularFirestore, private router: Router, private sb: MatSnackBar) { }


  async saveData(lcto){

    const res = await this.fs.collection('lancamentos').add(lcto).then(docRef =>{

      this.openSnackBar("Lançamento criado com sucesso", "OK")})

    this.router.navigate(['/lctos'])
}

openSnackBar(message: string, action: string) {
  this.sb.open(message, action,  {
    horizontalPosition: this.horizontalPosition,
    verticalPosition: this.verticalPosition,
    duration: this.durationInSeconds*1000,
  });
}


async saveParc(lcto){

  const res = await this.fs.collection('parcelamentos').add(lcto).then(docRef =>{

    this.openSnackBar("Parcelamento criado com sucesso", "OK")})

  this.router.navigate(['/parcelamentos'])
}



}
