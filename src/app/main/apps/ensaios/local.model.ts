import { FuseUtils } from '@fuse/utils';

export class Local
{
    latitude: string;
    longitude: string;
    descricao: string;
    
    /**
     * Constructor
     *
     * @param local
     */
    constructor(local?)
    {
        local = local || {};
        this.latitude = local.latitude || '';
        this.longitude = local.longitude || '';
        this.descricao = local.descricao || '';
    }
}
