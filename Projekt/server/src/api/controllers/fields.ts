import { Response, Request, NextFunction } from 'express';

export async function getFields(
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.send({ fields: ['id', 'a', 'typeId'] });
}

export async function getFieldsForType(
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.send({ fields: ['id', 'a'] });
}
