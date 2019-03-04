import { Response, Request, NextFunction } from 'express';
import { Field, ITEM } from '../models/item';
import * as multer from 'multer'

var storage = multer.diskStorage({
    destination: function(req, file, callback){
        callback(null, './uploads');
    },
    filename: function(req, file, callback){
        callback(null, `${Date.now()}`);
    }
});

var upload = multer.default({storage: storage});


export async function fileInformation(req: Request, res: Response, next: NextFunction){
    try {
        res.status(200);
    } catch (error) {
        next(error);
    }
}

export async function fileUpload(req: Request, res: Response, next: NextFunction) {
    try {
        const companyId: number = req.params.companyId;
        const typeId: number = req.params.type;
        const id: number = req.params.id;

        const folderName = `${companyId}${typeId}${id}`

        upload.single('file');

        res.send(req.file)
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
