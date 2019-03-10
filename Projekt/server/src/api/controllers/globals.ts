import { Response, Request, NextFunction } from 'express';

import { GLOBAL, GlobalField } from '../models/global';
import { GlobalFieldModel } from '../../database/models/global';

export async function globalCreate(req: Request, res: Response, next: NextFunction) {
    try {
        let field: GlobalField = GLOBAL.validate(req.body);
        field.companyId = req.params.companyId;

        field = await GlobalFieldModel.create(field);
        res.status(200).send(field);
    } catch (error) {
        next(error);
    }
}

export async function globalGet(req: Request, res: Response, next: NextFunction) {
    try {
        res.status(200).send(await GlobalFieldModel.get(req.params.companyId));
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
        await GlobalFieldModel.delete(req.params.companyId, id);
        res.status(204).send();
    } catch (error) {
        next(error);
    }
}