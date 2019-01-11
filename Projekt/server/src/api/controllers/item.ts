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
    res.header('X-Total', '100').send({ items: items, types: [{ id: page, name: 'Typ1', fields: [{ name: 'a', type: 'string', required: false }] }]});
  }, 50);
}
export async function getItem(
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.send({
    items: [{
      id: 0,
      typeId: 0,
      fields: {
        name: 'name',
        color: '#FFAAFF',
        number: 5,
        bool: true,
        file: 'IDK',
        reference: 'ref'
      }
    }],
    types: [{
      id: 0,
      itemTypeId: 0,
      fields: [
        {name: 'name', type: 'string'},
        {name: 'color', type: 'color'},
        {name: 'number', type: 'number'},
        {name: 'bool', type: 'boolean'},
        {name: 'file', type: 'file'},
        {name: 'reference', type: 'reference'}
      ]
    }]
  });
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
