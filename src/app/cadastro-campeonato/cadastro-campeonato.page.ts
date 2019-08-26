import { Component, OnInit } from '@angular/core';
import { Campeonato } from '../model/Campeonato';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { CampeonatoService } from '../service/campeonato-service';

@Component({
  selector: 'app-cadastro-campeonato',
  templateUrl: './cadastro-campeonato.page.html',
  styleUrls: ['./cadastro-campeonato.page.scss'],
})
export class CadastroCampeonatoPage implements OnInit {
  subscriptions: Subscription[] = [];
  public campeonato:Campeonato
  toast:any
  localidade:any
  public loginForm: FormGroup;

  constructor(public formBuilder: FormBuilder, private campeonatoService: CampeonatoService, private router: Router, public toastController: ToastController) {
    this.campeonato = new Campeonato();
  }

  ngOnInit() {
  }

  async salvarCampeonato() {
    try {
      await this.campeonatoService.addCampeonato(this.campeonato)
      this.showToastSuccess();
      this.router.navigate(["/tabs/tab4"])
    } catch (e) {
      this.showToastFail();
    }

  }

  showToastSuccess() {
    this.toast = this.toastController.create({
      message: 'Campeonato salvo com sucesso! informe seu login e senha para entar',
      color: "success",
      position: "middle",
      duration: 3000
    }).then((toastData)=>{
      console.log(toastData);
      toastData.present();
    });
  }

  showToastFail() {
    this.toast = this.toastController.create({
      message: 'Não foi possivel salvar o Campeonato',
      color: "danger",
      position: "middle",
      duration: 2000
    }).then((toastData)=>{
      console.log(toastData);
      toastData.present();
    });
  }



  getLocalidade() {
    this.subscriptions.push(
      this.campeonatoService.getLocalidade(this.campeonato.cep).subscribe(res => {
        this.localidade = res;
        this.campeonato.cidade = this.localidade.localidade;
        this.campeonato.estado = this.localidade.uf
      })
    )
  }

}
