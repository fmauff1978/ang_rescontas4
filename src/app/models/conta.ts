import { Timestamp } from "@angular/fire/firestore";



  export interface Conta {

    id: string;
    cod: number;
    conta: string;
    natureza: string;
    enquadramento: string;
    mod_despesa: string;
    ativa: boolean;
    saldo: number;
    log: Timestamp;


  }
