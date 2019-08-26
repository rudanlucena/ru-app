import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Clube } from '../model/Clube';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Titulo } from '../model/Titulo';

@Injectable({
    providedIn: 'root'
})
export class TituloService {
    private urlTitulo = environment.host + "titulos"

    constructor(private http: HttpClient) { }

    public async addTitulo(titulo:Titulo, idClube:number):Promise<Titulo> {
        const url = `${this.urlTitulo}/${idClube}`;
        return await this.http.post<Titulo>(url, titulo).toPromise();
    }

    public async removeTitulo(idTitulo:number, idClube:number):Promise<Titulo> {
        const url = `${this.urlTitulo}/${idTitulo}/clube/${idClube}`;
        return await this.http.delete<Titulo>(url).toPromise();
    }
}