import { GerarsaldosComponent } from './pages/sobre/gerarsaldos/gerarsaldos.component';
import { GravacaoComponent } from './pages/sobre/gravacao/gravacao.component';
import { CriarParcelamentoComponent } from './pages/parcelamentos/criar-parcelamento/criar-parcelamento.component';
import { ParcelamentosComponent } from './pages/parcelamentos/parcelamentos.component';
import { CriarMultiplosComponent } from './pages/lancamentos/criar-lancamentos/criar-multiplos/criar-multiplos.component';
import { ResultadoComponent } from './pages/contas/resultado/resultado.component';
import { SobreComponent } from './pages/sobre/sobre.component';
import { DespesaComponent } from './pages/contas/despesa/despesa.component';
import { AtivoComponent } from './pages/contas/ativo/ativo.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DshComponent } from './pages/dsh/dsh.component';
import { DshContasComponent } from './pages/dsh-contas/dsh-contas.component';
import { PassivoComponent } from './pages/contas/passivo/passivo.component';
import { ReceitaComponent } from './pages/contas/receita/receita.component';
import { LancamentosComponent } from './pages/lancamentos/lancamentos.component';
import { CriarLancamentosComponent } from './pages/lancamentos/criar-lancamentos/criar-lancamentos.component';
import { AgregadosComponent } from './pages/agregados/agregados.component';
import { ParcelamentoTesteComponent } from './pages/parcelamentos/parcelamento-teste/parcelamento-teste.component';

const routes: Routes = [

{path: '', component: DshComponent},
{path: 'table', component: DshContasComponent},
{path: 'ativo', component: AtivoComponent},
{path: 'passivo', component: PassivoComponent},
{path: 'despesa', component: DespesaComponent},
{path: 'sobre', component: SobreComponent},
{path: 'receita', component: ReceitaComponent},
{path: 'resultado', component: ResultadoComponent},
{path: 'lctos', component: LancamentosComponent},
{path: 'lctos/criar-lcto', component: CriarLancamentosComponent},
{path: 'mult', component: CriarMultiplosComponent},
{path: 'subagregados', component: AgregadosComponent},
{path: 'parcelamentos', component: ParcelamentoTesteComponent},
{path: 'parcelamentos/criar-parcelamento', component: CriarParcelamentoComponent},
{path: 'gravacao', component: GravacaoComponent},
{path: 'saldos', component: GerarsaldosComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
