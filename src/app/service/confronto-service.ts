import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpResponse } from '@angular/common/http';

import { Confronto } from '../model/Confronto';
import { Observable } from 'rxjs';
import { EnqueteConfronto } from '../model/EnqueteConfronto';

@Injectable({
    providedIn: 'root'
})
export class ConfrontoService {
    private url = environment.host + "confrontos"
    private urlEnquete = environment.host + "enquetes"

    constructor(private http: HttpClient) { }

    public async addConfronto(confronto:Confronto, idClube:number):Promise<Confronto> {
        const url = `${this.url}/${idClube}`;
        return await this.http.post<Confronto>(url, confronto).toPromise();
    }

    public async votar(idEnquete, palpite):Promise<Confronto> {
        const url = `${this.urlEnquete}/${idEnquete}/${palpite}`;
        return await this.http.post<Confronto>(url, null).toPromise();
    }

    public getEnquetes(): Observable<HttpResponse<EnqueteConfronto[]>> {
        const url = `${this.urlEnquete}`;
        return this.http.get<EnqueteConfronto[]>(url, { observe: 'response' })
    }

    public async removeConfronto(idConfronto:number, idClube:number):Promise<Confronto> {
        const url = `${this.url}/${idConfronto}/clube/${idClube}`;
        return await this.http.delete<Confronto>(url).toPromise();
    }

    public async addConfrontoCampeonato(confronto:Confronto, idCampeonato:number):Promise<Confronto> {
        const url = `${this.url}/campeonato/${idCampeonato}`;
        return await this.http.post<Confronto>(url, confronto).toPromise();
    }

    public async removeConfrontoCampeonato(idConfronto:number, idCampeonato:number):Promise<Confronto> {
        const url = `${this.url}/${idConfronto}/campeonato/${idCampeonato}`;
        return await this.http.delete<Confronto>(url).toPromise();
    }
}