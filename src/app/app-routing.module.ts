import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  { path: 'time/:id', loadChildren: './time/time.module#TimePageModule' },
  { path: 'campeonato/:id', loadChildren: './campeonato/campeonato.module#CampeonatoPageModule' },
  { path: 'cadastro-titulo/:id', loadChildren: './cadastro-titulo/cadastro-titulo.module#CadastroTituloPageModule' },
  { path: 'cadastro-noticia/:id', loadChildren: './cadastro-noticia/cadastro-noticia.module#CadastroNoticiaPageModule' },
  { path: 'cadastro-noticia-campeonato/:id', loadChildren: './cadastro-noticia-campeonato/cadastro-noticia-campeonato.module#CadastroNoticiaCampeonatoPageModule' },
  { path: 'cadastro-patrocinador/:id', loadChildren: './cadastro-patrocinador/cadastro-patrocinador.module#CadastroPatrocinadorPageModule' },
  { path: 'cadastro-confronto/:id', loadChildren: './cadastro-confronto/cadastro-confronto.module#CadastroConfrontoPageModule' },
  { path: 'editar-clube/:id', loadChildren: './editar-clube/editar-clube.module#EditarClubePageModule' },
  { path: 'cadastro-confronto-campeonato/:id', loadChildren: './cadastro-confronto-campeonato/cadastro-confronto-campeonato.module#CadastroConfrontoCampeonatoPageModule' },
  { path: 'jogador', loadChildren: './jogador/jogador.module#JogadorPageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'cadastro-jogador', loadChildren: './cadastro-jogador/cadastro-jogador.module#CadastroJogadorPageModule' },
  { path: 'cadastro-clube', loadChildren: './cadastro-clube/cadastro-clube.module#CadastroClubePageModule' },
  { path: 'cadastro-pro', loadChildren: './cadastro-pro/cadastro-pro.module#CadastroProPageModule' },
  { path: 'cadastro-campeonato', loadChildren: './cadastro-campeonato/cadastro-campeonato.module#CadastroCampeonatoPageModule' },
  
  
  
  
  
  
  
  
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
