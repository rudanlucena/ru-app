import { Jogador } from "./Jogador";
import { Patrocinador } from "./Patrocinador";
import { Titulo } from "./Titulo";
import { Noticia } from "./Noticia";

export class Clube{
    public img:string
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

    public jogadores: Jogador[]
    public patrocinadores: Patrocinador[]
    public titulos: Titulo[]
    public noticias: Noticia[]

}