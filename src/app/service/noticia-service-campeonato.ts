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
export class NoticiaCampeonatoService {
    private urlNoticia = environment.host + "noticiasCampeoanto"

    constructor(private http: HttpClient) { }

    public async addNoticia(noticia:Noticia, idCampeonato:number):Promise<Noticia> {
        const url = `${this.urlNoticia}/${idCampeonato}`;
        return await this.http.post<Noticia>(url, noticia).toPromise();
    }

    public async removeNoticia(idNoticia:number, idCampeonato:number):Promise<Noticia> {
        const url = `${this.urlNoticia}/${idNoticia}/campeonato/${idCampeonato}`;
        return await this.http.delete<Noticia>(url).toPromise();
    }
}