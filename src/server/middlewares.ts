import { NextFunction, Request, Response } from 'express';
import { AsyncCheckFunction, SyncCheckFunction } from 'fastest-validator';
import { TRole } from './interfaces';

const auth = (...roles: TRole[])=>  (req: Request, res: Response, next: NextFunction) => {
  const token =
    req.headers['authorization'] ??
    req.query['token'] ??
    req.body['authorization'];

  if (!token) {
    res.status(403).json({
      status: false,
      code: 403,
      error: 0,
      message: 'Where is the token',
    });
  }

  // @TODO: Verify token and if role is admin/user check it

  next();
};

const validate = (
  schema: SyncCheckFunction | AsyncCheckFunction
) => (req: Request, res: Response, next: NextFunction) => {
  const validation = schema(req.body);

  if (validation !== true) {
    res.status(400).json({
      status: false,
      code: 400,
      error: 0,
      message: 'Validation error',
      data: validation,
    });
  }

  next();
};

export default {
  auth,
  validate,
};
