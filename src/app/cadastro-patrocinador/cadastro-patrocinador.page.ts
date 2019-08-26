import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Noticia } from '../model/Noticia';
import { ActivatedRoute, Router } from '@angular/router';
import { Patrocinador } from '../model/Patrocinador';
import { PatrocinadorService } from '../service/patrocinador-service';

@Component({
  selector: 'app-cadastro-patrocinador',
  templateUrl: './cadastro-patrocinador.page.html',
  styleUrls: ['./cadastro-patrocinador.page.scss'],
})
export class CadastroPatrocinadorPage implements OnInit {
  patrocinador:Patrocinador
  toast:any
  id:number
  isFoto = false
  foto:string

  constructor(private patrocinadorService:PatrocinadorService, public toastController: ToastController, private activatedRoute: ActivatedRoute, private router: Router) { 
    this.patrocinador=new Patrocinador();
  }

  ngOnInit() {
    this.id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
  }

  async adicionarPatrocinador(){
    try{
      await this.patrocinadorService.addPatrocinador(this.patrocinador, this.id)
      this.router.navigate(["/time/"+this.id])
      console.log(this.patrocinador)
      this.showToastSuccess();
    }
    catch(e){
      this.showToastFail();
    }
  }

  showToastSuccess() {
    this.toast = this.toastController.create({
      message: 'Patrocinador adicionado com sucesso',
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
      message: 'Não foi possivel adicionar o patrocinador',
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
      me.patrocinador.img = me.foto;
      
    };
    
  }

}
