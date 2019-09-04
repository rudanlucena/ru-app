import { Injectable } from '@angular/core';

import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Titulo } from '../model/Titulo';
import { environment } from 'src/environments/environment';
import { Noticia } from '../model/Noticia';
import { Patrocinador } from '../model/Patrocinador';
import { Confronto } from '../model/Confronto';
import { Campeonato } from '../model/Campeonato';

@Injectable({
    providedIn: 'root'
})
export class CampeonatoService {

    private url = environment.host + "campeonatos"

    constructor(private http: HttpClient) { }

    public getCampeonatos(cep: string): Observable<HttpResponse<Campeonato[]>> {
        const url = `${this.url}/localidade/${cep}`;
        return this.http.get<Campeonato[]>(url, { observe: 'response' })
    }

    public getCampeonato(id: number): Observable<HttpResponse<Campeonato>> {
        const url = `${this.url}/${id}`;
        return this.http.get<Campeonato>(url, { observe: 'response' })
    }

    public getCampeonatoByLogin(login:string, senha:string): Observable<HttpResponse<Confronto>> {
        const url = `${this.url}/${login}/senha/${senha}`;
        return this.http.get<Confronto>(url, { observe: 'response' })
    }

    public getCampeonatoByCepAndNome(cep:string, nome:string): Observable<HttpResponse<Campeonato>> {
        const url = `${this.url}/${cep}/nome/${nome}`;
        return this.http.get<Campeonato>(url, { observe: 'response' })
    }

    public getNoticias(id: number): Observable<HttpResponse<Noticia[]>> {
        const url = `${this.url}/${id}/noticias`;
        return this.http.get<Noticia[]>(url, { observe: 'response' })
    }


    public getPatrocinadores(id: number): Observable<HttpResponse<Patrocinador[]>> {
        const url = `${this.url}/${id}/patrocinadores`;
        return this.http.get<Patrocinador[]>(url, { observe: 'response' })
    }

    public getConfrontos(id: number): Observable<HttpResponse<Confronto[]>> {
        const url = `${this.url}/${id}/confrontos`;
        return this.http.get<Confronto[]>(url, { observe: 'response' })
    }

    public async addCampeonato(campeonato:Campeonato):Promise<Campeonato> {
        const url = `${this.url}`;
        return await this.http.post<Campeonato>(url, campeonato).toPromise();
    }

    public async removerCampeonato(id:number):Promise<Campeonato> {
        const url = `${this.url}/${id}`;
        return await this.http.delete<Campeonato>(url).toPromise();
    }

    getLocalidade(cep: String): Observable<any[]>{
        return this.http.get<[]>("https://viacep.com.br/ws/"+cep+"/json/" );
    }
}