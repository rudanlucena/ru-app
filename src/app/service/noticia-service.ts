import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Clube } from '../model/Clube';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Titulo } from '../model/Titulo';
import { Noticia } from '../model/Noticia';

@Injectable({
    providedIn: 'root'
})
export class NoticiaService {
    private urlNoticia = environment.host + "noticias"

    constructor(private http: HttpClient) { }

    public async addNoticia(noticia:Noticia, idClube:number):Promise<Noticia> {
        const url = `${this.urlNoticia}/${idClube}`;
        return await this.http.post<Noticia>(url, noticia).toPromise();
    }

    public async removeNoticia(idNoticia:number, idClube:number):Promise<Noticia> {
        const url = `${this.urlNoticia}/${idNoticia}/clube/${idClube}`;
        return await this.http.delete<Noticia>(url).toPromise();
    }
}