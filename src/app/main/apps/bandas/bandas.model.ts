import { FuseUtils } from '@fuse/utils';
import { Musico } from '../musicos/musicos.model';

export class Banda
{
    id: string;
    nome: string;
    musicos: Musico[];
    descricao: string;

    /**
     * Constructor
     *
     * @param banda
     */
    constructor(banda?)
    {
        banda = banda || {};
        this.id = banda.id || FuseUtils.generateGUID();
        this.nome = banda.nome || '';
        this.musicos = banda.musicos || '';
        this.descricao = banda.descricao || '';
    }
}