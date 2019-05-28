import { FuseUtils } from '@fuse/utils';

export class Musica
{
    nome: string;
    youtube: string;
    cifra: string;
    letra: string;
    observacao: string;
    
    /**
     * Constructor
     *
     * @param musica
     */
    constructor(musica?)
    {
        musica = musica || {};
        this.nome = musica.nome || '';
        this.youtube = musica.youtube || '';
        this.cifra = musica.cifra || '';
        this.letra = musica.letra || '';
        this.observacao = musica.observacao || '';
    }
}
