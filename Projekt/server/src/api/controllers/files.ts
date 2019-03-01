import { Response, Request, NextFunction } from 'express';

import { Field, ITEM } from '../models/item';


export async function fileInformation(req: Request, res: Response, next: NextFunction){
    try {
        res.status(200);
    } catch (error) {
        next(error);
    }
}

export async function fileUpload(req: Request, res: Response, next: NextFunction) {
    try {
        res.status(200);
    } catch (error) {
        next(error);
    }
}

export async function fileDownload(req: Request, res: Response, next: NextFunction) {
    try {
        res.status(200);
    } catch (error) {
        next(error);
    }
}

export async function fileUpdate(req: Request, res: Response, next: NextFunction) {
    try {
       
        res.status(200);
    } catch (error) {
        next(error);
    }
}

export async function fileDelete(req: Request, res: Response, next: NextFunction) {
    try {
        res.status(204);
    } catch (error) {
        next(error);
    }
}
