import { Response, Request, NextFunction } from 'express';

/** */
export async function listItems(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const page = req.query['page'] || 0;
  const per_page = req.query['per_page'] || 25;
  const items = Array.from({ length: per_page }).map((x, idx) => ({
    id: idx,
    typeId: page,
    fields: { a: 1 }
  }));
  setTimeout(() => {
    res.header('X-Total', '100').send(items);
  }, 2000);
}
export async function addItem(
  req: Request,
  res: Response,
  next: NextFunction
) {}
export async function updateItem(
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.send();
}
export async function deleteItem(
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.send();
}
