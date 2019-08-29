import { Component, OnInit } from '@angular/core';
import { Clube } from '../model/Clube';
import { ClubeService } from '../service/clube-service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cadastro-clube',
  templateUrl: './cadastro-clube.page.html',
  styleUrls: ['./cadastro-clube.page.scss'],
})
export class CadastroClubePage implements OnInit {
  subscriptions: Subscription[] = [];
  public clube: Clube
  toast:any
  isFoto = false
  foto:string
  localidade:any
  public loginForm: FormGroup;

  constructor(public formBuilder: FormBuilder, private clubeService: ClubeService, private router: Router, public toastController: ToastController) {
    this.clube = new Clube();
  }

  ngOnInit() {
  }

  async salvarClube() {
    try {
      await this.clubeService.addClube(this.clube)
      this.showToastSuccess();
      this.router.navigate(["/tabs/tab4"])
    } catch (e) {
      this.showToastFail();
    }

  }

  buscarClube(id: number) {
    this.clubeService.getClubeByCepAndNome(this.clube.cep, this.clube.nome).subscribe(
      response => {
        this.showToastFailNomeDuplicate()
      },
      error => {
        console.log(error);
        if(error.status==404){
          this.buscarUsername()
        }
        else{
          this.showToastFail()
        }
      }
    )
  }

  buscarUsername() {
    this.clubeService.getClubeByUsername(this.clube.login).subscribe(
      response => {
        this.showToastFailLoginDuplicate()
      },
      error => {
        console.log(error);
        if(error.status==404){
          this.salvarClube()
        }
        else{
          this.showToastFail()
        }
      }
      
    )
  }

  showToastSuccess() {
    this.toast = this.toastController.create({
      message: 'clube salvo com sucesso! informe seu login e senha para entar',
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
      message: 'Não foi possivel salvar o clube',
      color: "danger",
      position: "middle",
      duration: 2000
    }).then((toastData)=>{
      console.log(toastData);
      toastData.present();
    });
  }

  showToastFailNomeDuplicate() {
    this.toast = this.toastController.create({
      message: 'Este nome de clube ja existe em sua cidade!',
      color: "danger",
      position: "middle",
      duration: 2000
    }).then((toastData)=>{
      console.log(toastData);
      toastData.present();
    });
  }

  showToastFailLoginDuplicate() {
    this.toast = this.toastController.create({
      message: 'Este login ja é utilizado por outra conta!',
      color: "danger",
      position: "middle",
      duration: 2000
    }).then((toastData)=>{
      console.log(toastData);
      toastData.present();
    });
  }

  onFileChanged(event) {
    this.isFoto = true;
    let me = this;
    const file = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      //me.modelvalue = reader.result;
      me.foto = reader.result.toString();
      me.clube.img = me.foto;
      
    };
    
  }

  getLocalidade() {
    this.subscriptions.push(
      this.clubeService.getLocalidade(this.clube.cep).subscribe(res => {
        this.localidade = res;
        this.clube.cidade = this.localidade.localidade;
        this.clube.estado = this.localidade.uf
      })
    )
  }

}
