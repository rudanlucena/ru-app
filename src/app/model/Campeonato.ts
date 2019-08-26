import { Jogador } from "./Jogador";
import { Patrocinador } from "./Patrocinador";
import { Titulo } from "./Titulo";
import { Noticia } from "./Noticia";
import { Confronto } from "./Confronto";

export class Campeonato{
    public id:string
    public login:string
    public senha:string
    public nome:string;
    public cep:string;
    public estado:string;
    public cidade:string;
    public pro:boolean;
    public modalidade:string
    public genero:string 

    public confrontos: Confronto[]
    public noticias: Noticia[]

}