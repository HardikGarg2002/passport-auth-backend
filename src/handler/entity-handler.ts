import { Request, Response, NextFunction } from 'express';
import UserController from '../controller/entity-controller';

const userController = new UserController();

export const get = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const filters = req.query.filters;
    const pagination = req.query.pagination;
    let sort = req.query.sort as string;
    if (!sort) {
      sort = 'created_at:asc';
    }
    const response = await userController.get(filters, sort, pagination);
    res.json(response);
  } catch (err) {
    next(err);
  }
};

export const getById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    const response = await userController.getById(id);
    res.json(response);
  } catch (err) {
    next(err);
  }
};

export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await userController.create(req.body);
    res.json(response);
  } catch (err) {
    next(err);
  }
};

export const patch = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    const input = req.body;
    const response = await userController.patch(id, input);
    res.json(response);
  } catch (err) {
    next(err);
  }
};

export const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    const response = await userController.remove(id);
    res.json(response);
  } catch (err) {
    next(err);
  }
};

export const patchStatus = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    const status = req.body.is_active;

    const response = await userController.patchStatus(id, status);
    res.json(response);
  } catch (err) {
    next(err);
  }
};
