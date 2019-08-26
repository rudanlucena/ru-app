import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Clube } from '../model/Clube';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Titulo } from '../model/Titulo';
import { Noticia } from '../model/Noticia';
import { Patrocinador } from '../model/Patrocinador';

@Injectable({
    providedIn: 'root'
})
export class PatrocinadorService {
    private url = environment.host + "patrocinadores"

    constructor(private http: HttpClient) { }

    public async addPatrocinador(patrocinador:Patrocinador, idClube:number):Promise<Patrocinador> {
        const url = `${this.url}/${idClube}`;
        return await this.http.post<Patrocinador>(url, patrocinador).toPromise();
    }

    public async removePatrocinador(idPatrocinador:number, idClube:number):Promise<Patrocinador> {
        const url = `${this.url}/${idPatrocinador}/clube/${idClube}`;
        return await this.http.delete<Patrocinador>(url).toPromise();
    }
}