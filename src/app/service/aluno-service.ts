import { Injectable } from '@angular/core';

import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Titulo } from '../model/Titulo';
import { environment } from 'src/environments/environment';
import { Noticia } from '../model/Noticia';
import { Patrocinador } from '../model/Patrocinador';
import { Confronto } from '../model/Confronto';
import { Aluno } from '../model/Aluno';
import { Cancelamento } from '../model/cancelamento';
import { AuxilioTemporario } from '../model/AuxilioTemporario';
import { Notificacao } from '../model/Notificacao';

@Injectable({
    providedIn: 'root'
})
export class AlunoService {

    private url = environment.host + "alunos"

    private urlSolicitacao = environment.host + "auxiliosTemporarios"

    private urlCancelamento = environment.host + "cancelamentos"

    private urlNotificacoes = environment.host + "notificacoes"

    constructor(private http: HttpClient) { }

    /*public getCampeonatos(cep: string): Observable<HttpResponse<Campeonato[]>> {
        const url = `${this.url}/localidade/${cep}`;
        return this.http.get<Campeonato[]>(url, { observe: 'response' })
    }

    public getCampeonato(id: number): Observable<HttpResponse<Campeonato>> {
        const url = `${this.url}/${id}`;
        return this.http.get<Campeonato>(url, { observe: 'response' })
    }*/

    public getAlunoByLogin(matricula:string, senha:string): Observable<HttpResponse<Aluno>> {
        const url = `${this.url}/${matricula}/${senha}`;
        return this.http.get<Aluno>(url, { observe: 'response' })
    }

    public getNotificacoes(id: number): Observable<HttpResponse<Notificacao[]>> {
        const url = `${this.urlSolicitacao}/aluno/${id}`;
        return this.http.get<Notificacao[]>(url, { observe: 'response' })
    }

    /*public getCampeonatoByCepAndNome(cep:string, nome:string): Observable<HttpResponse<Campeonato>> {
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
    }*/

    public async solicitarAuxilioTemporario(auxilio:AuxilioTemporario):Promise<AuxilioTemporario> {
        const url = `${this.urlSolicitacao}`;
        return await this.http.post<AuxilioTemporario>(url, auxilio).toPromise();
    }

    public async cancelarRefeicao(cancelamento:Cancelamento):Promise<Cancelamento> {
        const url = `${this.urlCancelamento}`;
        return await this.http.post<AuxilioTemporario>(url, cancelamento).toPromise();
    }

    public async removerCancelamento(id:number):Promise<Cancelamento> {
        const url = `${this.urlCancelamento}/${id}`;
        return await this.http.delete<Cancelamento>(url).toPromise();
    }

    /*

    getLocalidade(cep: String): Observable<any[]>{
        return this.http.get<[]>("https://viacep.com.br/ws/"+cep+"/json/" );
    }*/
}