import { Response, Request, NextFunction } from 'express';

import { Field, ITEM } from '../models/item';

export async function uploadFile(req: Request, res: Response, next: NextFunction) {
    try {
        res.status(200);
    } catch (error) {
        next(error);
    }
}

export async function downloadFile(req: Request, res: Response, next: NextFunction) {
    try {
        res.status(200);
    } catch (error) {
        next(error);
    }
}

export async function updateFile(req: Request, res: Response, next: NextFunction) {
    try {
       
        res.status(200);
    } catch (error) {
        next(error);
    }
}

export async function deleteFile(req: Request, res: Response, next: NextFunction) {
    try {
        res.status(204);
    } catch (error) {
        next(error);
    }
}
