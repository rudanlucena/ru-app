import { Component } from '@angular/core';
import { CampeonatoService } from '../service/campeonato-service';
import { Campeonato } from '../model/Campeonato';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  public campeonatos:Campeonato[]
  public idCampeonato:string
  public cep:string
  public selectDisabled:boolean
  public toast:any

  constructor(private campeonatoService:CampeonatoService, private toastController:ToastController, private router:Router) {
    this.campeonatos = []
    this.idCampeonato=""
    this.selectDisabled = true
    let cepLocalStorage = localStorage.getItem("cepAtual");
    if(cepLocalStorage!=null)
    this.cep = cepLocalStorage
  }

  buscarCampeonatos() {
    localStorage.setItem("cepAtual", this.cep);
    this.campeonatoService.getCampeonatos(this.cep).subscribe(
      response => {
        this.campeonatos = response.body
        if(this.campeonatos.length!=0){
          this.selectDisabled = false;
        }
        if(this.campeonatos.length==0){
          this.showToastFail();
          this.selectDisabled = true;
        }
      },
      error => {
        console.log("Houve algum erro ao carregar a lista");
      }
    )
  }

  showToastFail() {
    this.toast = this.toastController.create({
      message: 'Nenhum campeonato encontrado para este CEP',
      color: "danger",
      position: "middle",
      duration: 2000
    }).then((toastData)=>{
      console.log(toastData);
      toastData.present();
    });
  }

  selecionarCampeonato(){
    localStorage.setItem("idCampeonatoAtual", this.idCampeonato);
    this.router.navigate(["/tabs/tab2"])
    console.log("Carreagando....");
  }

}
