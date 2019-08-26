import { Component, OnInit } from '@angular/core';
import { TituloService } from '../service/titulo-service';
import { Titulo } from '../model/Titulo';
import { ToastController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cadastro-titulo',
  templateUrl: './cadastro-titulo.page.html',
  styleUrls: ['./cadastro-titulo.page.scss'],
})
export class CadastroTituloPage implements OnInit {
  id:number
  toast:any
  public titulo:Titulo
  constructor(private tituloService:TituloService, public toastController: ToastController, private router: Router, private activatedRoute: ActivatedRoute) {
    this.titulo=new Titulo();
   }

  ngOnInit() {
    this.id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    //this.adicionarTitulo()
  }

  async adicionarTitulo(){
    try{
      await this.tituloService.addTitulo(this.titulo, this.id)
      this.router.navigate(["/time/"+this.id])
      this.showToastSuccess();
    }
    catch(e){
      this.showToastFail();
    }
  }

  showToastSuccess() {
    this.toast = this.toastController.create({
      message: 'Titulo adicionado com sucesso',
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
      message: 'Não foi possivel adicionar o titulo',
      color: "danger",
      position: "middle",
      duration: 2000
    }).then((toastData)=>{
      console.log(toastData);
      toastData.present();
    });
  }

}
