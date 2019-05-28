import { FuseUtils } from '@fuse/utils';
import { Local } from 'protractor/built/driverProviders';

export class Ensaio
{
    id: string;
    data: string;
    hora: string;
    local: Local;
    musicas: Musica[];
    
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
