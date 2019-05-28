import { FuseUtils } from '@fuse/utils';

export class Musico
{
    id: string;
    nome: string;
    funcao: string;
    email: string;
    
    /**
     * Constructor
     *
     * @param musico
     */
    constructor(musico?)
    {
        musico = musico || {};
        this.id = musico.id || FuseUtils.generateGUID();
        this.nome = musico.nome || '';
        this.funcao = musico.funcao || '';
        this.email = musico.email || '';
    }
}
