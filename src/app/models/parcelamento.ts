import { Timestamp } from "@angular/fire/firestore";



  export interface Parcelamento {

   id: string;
    cod: string;
    datadacompra: Timestamp;
    descricao: string;
    cartaovinculado: {

      cod: string;
      enquadramento: string;
      nome: string;
    }

    dataparcela: Timestamp;
    enq: string;
    juros: number;
    origem: string;
    qtdedeparcelas: number;

    parcelasrestantes: number;
    ultimaparcela: Timestamp;
    saldorestante: number;
    ativa: boolean;
    sv: boolean;
    valorcompra: number;
    valorparcela: number;
    log: Timestamp;


  }
