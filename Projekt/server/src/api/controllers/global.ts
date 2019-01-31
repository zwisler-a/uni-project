import { Response, Request, NextFunction } from 'express';

import { GLOBAL, GlobalField } from '../models/global';
import { GlobalFieldModel } from '../../database/models/global';

export async function globalCreate(req: Request, res: Response, next: NextFunction) {
    try {
        let field: GlobalField = GLOBAL.validate(req.body);

        // TODO use user company
        field.companyId = 1;

        field = await GlobalFieldModel.create(field);
        res.status(200).send(field);
    } catch (error) {
        next(error);
    }
}

export async function globalGet(req: Request, res: Response, next: NextFunction) {
    try {
        // TODO use user company
        res.status(200).send(await GlobalFieldModel.get(1));
    } catch (error) {
        next(error);
    }
}

export async function globalUpdate(req: Request, res: Response, next: NextFunction) {
    try {
        const id: number = req.params.id;
        let field: GlobalField = GLOBAL.validate(req.body);

        field = await GlobalFieldModel.update(id, field);

        res.status(200).send(field);
    } catch (error) {
        next(error);
    }
}

export async function globalDelete(req: Request, res: Response, next: NextFunction) {
    try {
        const id: number = req.params.id;
        // TODO use user company
        await GlobalFieldModel.delete(1, id);
        res.status(204).send();
    } catch (error) {
        next(error);
    }
}