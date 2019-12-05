import { Component } from '@angular/core';
import { IonSlides, AlertController, LoadingController, ToastController } from '@ionic/angular';
import { Noticia } from '../model/Noticia';
import { Confronto } from '../model/Confronto';
import { ConfrontoService } from '../service/confronto-service';
import { Router, ActivatedRoute } from '@angular/router';
import { NoticiaService } from '../service/noticia-service';
import { NoticiaCampeonatoService } from '../service/noticia-service-campeonato';
import { EnqueteConfronto } from '../model/EnqueteConfronto';

import { Uid } from '@ionic-native/uid/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  ngOnInit() {

  }

  ionViewWillEnter() {

  }

}
