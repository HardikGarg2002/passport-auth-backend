import Entity from '../model/entity.ts';

export default class EntityService {
  public get = async (filters: any, sort: string, pagination: any) => {
    return await Entity.find(filters).sort(sort).skip(pagination.skip).limit(pagination.limit);
  };

  public getById = async (id: string) => {
    const entity = await Entity.findById(id);
    if (!entity) {
      throw new Error('Entity not found');
    }
    return entity;
  };

  public create = async (input: any) => {
    return await Entity.create(input);
  };

  public patch = async (id: string, input: any) => {
    return await Entity.findByIdAndUpdate(id, input, { new: true });
  };

  public delete = async (id: string) => {
    return await Entity.findByIdAndDelete(id);
  };

  public patchStatus = async (id: string, input: any) => {
    return await Entity.findByIdAndUpdate(id, input, { new: true });
  };
}
