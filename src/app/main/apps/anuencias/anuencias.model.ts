import { FuseUtils } from '@fuse/utils';

export class Anuencia
{
    id: string;
    numero: string;
    status: string;
    documentoDevedor: string;
    cartorio: string;
    numeroTitulo: string[];
    nomeDevedor: string;
    numeroProtocolo: string;
    dataVencimento: string;
    valorTitulo: string;
    telefoneDevedor: string;
    emailDevedor: string;
    

    /**
     * Constructor
     *
     * @param anuencia
     */
    constructor(anuencia?)
    {
        anuencia = anuencia || {};
        this.id = anuencia.id || FuseUtils.generateGUID();
        this.numero = anuencia.numero || '';
        this.status = anuencia.status || '';
        this.documentoDevedor = anuencia.documentoDevedor || '';
        this.cartorio = anuencia.cartorio || '';
        this.numeroTitulo = anuencia.numeroTitulo || '';
        this.nomeDevedor = anuencia.nomeDevedor || '';
        this.numeroProtocolo = anuencia.numeroProtocolo || '';
        this.dataVencimento = anuencia.dataVencimento || '';
        this.valorTitulo = anuencia.valorTitulo || '';
        this.telefoneDevedor = anuencia.telefoneDevedor || '';
        this.emailDevedor = anuencia.emailDevedor || '';
    }
}
