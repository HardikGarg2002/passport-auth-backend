import EntityService from '../service/entity-service';

export default class EntityController {
  private _entityService = new EntityService();

  public get = async (filters: any, sort: string, pagination: any) => {
    return await this._entityService.get(filters, sort, pagination);
  };

  public getById = async (id: string) => {
    return await this._entityService.getById(id);
  };

  public create = async (input: any) => {
    return await this._entityService.create(input);
  };

  public patch = async (id: string, input: any) => {
    return await this._entityService.patch(id, input);
  };

  public remove = async (id: string) => {
    return await this._entityService.delete(id);
  };
  public patchStatus = async (id: string, input: any) => {
    return await this._entityService.patchStatus(id, input);
  };
}
