import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpResponse } from '@angular/common/http';

import { Confronto } from '../model/Confronto';

@Injectable({
    providedIn: 'root'
})
export class ConfrontoService {
    private url = environment.host + "confrontos"

    constructor(private http: HttpClient) { }

    public async addConfronto(confronto:Confronto, idClube:number):Promise<Confronto> {
        const url = `${this.url}/${idClube}`;
        return await this.http.post<Confronto>(url, confronto).toPromise();
    }

    public async removeConfronto(idConfronto:number, idClube:number):Promise<Confronto> {
        const url = `${this.url}/${idConfronto}/clube/${idClube}`;
        return await this.http.delete<Confronto>(url).toPromise();
    }
}