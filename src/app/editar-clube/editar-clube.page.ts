import { Component, OnInit } from '@angular/core';
import { Clube } from '../model/Clube';
import { Router, ActivatedRoute } from '@angular/router';
import { ClubeService } from '../service/clube-service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-editar-clube',
  templateUrl: './editar-clube.page.html',
  styleUrls: ['./editar-clube.page.scss'],
})
export class EditarClubePage implements OnInit {
  public clube: Clube
  id: number
  toast:any
  public novaImgem:string
  constructor(public toastController: ToastController, private clubeService: ClubeService, private activatedRoute: ActivatedRoute, private router: Router) { 
    this.clube = new Clube()
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.buscarClube(this.id)
  }

  buscarClube(id: number) {
    this.clubeService.getClube(id).subscribe(
      response => {
        this.clube = response.body
        console.log(response)
      },
      error => {
        console.log("Houve algum erro ao carregar a lista");
      }
    )
  }

  onFileChanged(event) {
    let me = this;
    const file = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      //me.modelvalue = reader.result;
      me.novaImgem = reader.result.toString();
      me.clube.img = me.novaImgem;
      
    };
    
  }

  async salvarClube() {
    try {
      await this.clubeService.addClube(this.clube)
      this.showToastSuccess();
    } catch (e) {
      this.showToastFail();
    }

  }

  showToastSuccess() {
    this.toast = this.toastController.create({
      message: 'clube salvo com sucesso!',
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

}
