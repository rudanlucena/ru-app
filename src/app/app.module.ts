import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TimePageModule } from './time/time.module';
import { JogadorPageModule } from './jogador/jogador.module';
import { LoginPageModule } from './login/login.module';
import { CadastroClubePageModule } from './cadastro-clube/cadastro-clube.module';
import { CadastroJogadorPageModule } from './cadastro-jogador/cadastro-jogador.module';
import { HttpClientModule } from '@angular/common/http';
import { CadastroTituloPageModule } from './cadastro-titulo/cadastro-titulo.module';
import { CadastroNoticiaPageModule } from './cadastro-noticia/cadastro-noticia.module';
import { CadastroPatrocinadorPageModule } from './cadastro-patrocinador/cadastro-patrocinador.module';
import { CadastroConfrontoPageModule } from './cadastro-confronto/cadastro-confronto.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CadastroProPageModule } from './cadastro-pro/cadastro-pro.module';
import { EditarClubePageModule } from './editar-clube/editar-clube.module';
import { CadastroNoticiaCampeonatoPageModule } from './cadastro-noticia-campeonato/cadastro-noticia-campeonato.module';
import { CadastroCampeonatoPageModule } from './cadastro-campeonato/cadastro-campeonato.module';
import { CampeonatoPageModule } from './campeonato/campeonato.module';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  exports: [
    FormsModule,
    ReactiveFormsModule
  ],
  imports: [BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    TimePageModule,
    JogadorPageModule,
    LoginPageModule,
    CadastroClubePageModule,
    CadastroJogadorPageModule,
    CadastroTituloPageModule,
    CadastroNoticiaPageModule,
    CadastroPatrocinadorPageModule,
    CadastroConfrontoPageModule,
    CadastroProPageModule,
    EditarClubePageModule,
    CadastroNoticiaCampeonatoPageModule,
    CadastroCampeonatoPageModule,
    CampeonatoPageModule,
    FormsModule,
    HttpClientModule],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
