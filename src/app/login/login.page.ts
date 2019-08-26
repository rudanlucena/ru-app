import { Component, OnInit } from '@angular/core';
import { ClubeService } from '../service/clube-service';
import { Clube } from '../model/Clube';
import { Router } from '@angular/router';
import { CampeonatoService } from '../service/campeonato-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public login:string;
  public senha:string;
  public modo:string

  constructor(private clubeService:ClubeService, private campeonatoService:CampeonatoService, private router: Router) { 
    this.login = ""
    this.senha = ""
    this.modo=""
  }

  ngOnInit() {
  }

  logar(){
    if(this.modo=="treinador"){
      this.clubeService.getClubeByLogin(this.login, this.senha).subscribe(
        response => {
          let idClube = response.body.id.toString();
          sessionStorage.setItem("idRoot", idClube);
          this.login=""
          this.senha=""
          this.router.navigate(["/time/"+idClube])
          this.ionViewWillUnload();
          console.log(response)
        },
        error => {
          console.log("Houve algum erro ao carregar a lista");
        }
      )
    }
    else if(this.modo=="organizador"){
      this.campeonatoService.getCampeonatoByLogin(this.login, this.senha).subscribe(
        response => {
          let idCampeonato = response.body.id.toString();
          sessionStorage.setItem("idCampeonatoRoot", idCampeonato);
          this.login=""
          this.senha=""
          this.router.navigate(["/tabs/tab2"])
          console.log(response)
        },
        error => {
          console.log("Houve algum erro ao carregar a lista");
        }
      )
    }
  }

  ionViewWillUnload(){

  }

}
