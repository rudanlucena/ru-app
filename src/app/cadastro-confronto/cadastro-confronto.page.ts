import { Component, OnInit } from '@angular/core';
import { Confronto } from '../model/Confronto';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfrontoService } from '../service/confronto-service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-cadastro-confronto',
  templateUrl: './cadastro-confronto.page.html',
  styleUrls: ['./cadastro-confronto.page.scss'],
})
export class CadastroConfrontoPage implements OnInit {
  confronto:Confronto
  toast:any
  id:number

  constructor(public toastController: ToastController, private confrontoService:ConfrontoService, private activatedRoute: ActivatedRoute, private router: Router) { 
    this.confronto = new Confronto();
  }

  ngOnInit() {
    this.id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
  }

  async adicionarConfronto(){
    try{
      await this.confrontoService.addConfronto(this.confronto, this.id)
      this.router.navigate(["/time/"+this.id])
      console.log(this.confronto)
      this.showToastSuccess();
    }
    catch(e){
      this.showToastFail();
    }
  }

  showToastSuccess() {
    this.toast = this.toastController.create({
      message: 'Jogo adicionado com sucesso',
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
      message: 'Não foi possivel adicionar o jogo',
      color: "danger",
      position: "middle",
      duration: 2000
    }).then((toastData)=>{
      console.log(toastData);
      toastData.present();
    });
  }

}
