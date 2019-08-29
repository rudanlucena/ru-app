import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Clube } from '../model/Clube';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Titulo } from '../model/Titulo';
import { Noticia } from '../model/Noticia';
import { Patrocinador } from '../model/Patrocinador';
import { Confronto } from '../model/Confronto';

@Injectable({
    providedIn: 'root'
})
export class ClubeService {
    private urlClube = environment.host + "clubes"

    constructor(private http: HttpClient) { }

    public getClubes(cep: string): Observable<HttpResponse<Clube[]>> {
        const url = `${this.urlClube}/localidade/${cep}`;
        return this.http.get<Clube[]>(url, { observe: 'response' })
    }

    public getClube(id: number): Observable<HttpResponse<Clube>> {
        const url = `${this.urlClube}/${id}`;
        return this.http.get<Clube>(url, { observe: 'response' })
    }

    public getClubeByLogin(login:string, senha:string): Observable<HttpResponse<Clube>> {
        const url = `${this.urlClube}/${login}/senha/${senha}`;
        return this.http.get<Clube>(url, { observe: 'response' })
    } 

    public getClubeByUsername(login:string): Observable<HttpResponse<Clube>> {
        const url = `${this.urlClube}/login/${login}`;
        return this.http.get<Clube>(url, { observe: 'response' })
    } 

    public getClubeByCepAndNome(cep:string, nome:string): Observable<HttpResponse<Clube>> {
        const url = `${this.urlClube}/${cep}/nome/${nome}`;
        return this.http.get<Clube>(url, { observe: 'response' })
    } 

    public getTitulos(id: number): Observable<HttpResponse<Titulo[]>> {
        const url = `${this.urlClube}/${id}/titulos`;
        return this.http.get<Titulo[]>(url, { observe: 'response' })
    }

    public getNoticias(id: number): Observable<HttpResponse<Noticia[]>> {
        const url = `${this.urlClube}/${id}/noticias`;
        return this.http.get<Noticia[]>(url, { observe: 'response' })
    }

    public getPatrocinadores(id: number): Observable<HttpResponse<Patrocinador[]>> {
        const url = `${this.urlClube}/${id}/patrocinadores`;
        return this.http.get<Patrocinador[]>(url, { observe: 'response' })
    }

    public getConfrontos(id: number): Observable<HttpResponse<Confronto[]>> {
        const url = `${this.urlClube}/${id}/confrontos`;
        return this.http.get<Confronto[]>(url, { observe: 'response' })
    }

    public async addClube(clube:Clube):Promise<Clube> {
        const url = `${this.urlClube}`;
        return await this.http.post<Clube>(url, clube).toPromise();
    }

    public async removerClube(id:number):Promise<Clube> {
        const url = `${this.urlClube}/${id}`;
        return await this.http.delete<Clube>(url).toPromise();
    }

    getLocalidade(cep: String): Observable<any[]>{
        return this.http.get<[]>("https://viacep.com.br/ws/"+cep+"/json/" );
    }
}