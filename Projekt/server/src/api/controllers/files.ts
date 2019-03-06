import { Response, Request, NextFunction } from 'express';
import multer from 'multer';
import fs from 'fs-extra';

import { File } from '../models/file';
import { FileModel } from '../../database/models/file';

interface MulterFile extends Express.Multer.File {
    timestamp: Date;
}

const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => cb(null, 'uploads'),
        filename: (req: Request, file: MulterFile, cb) => {
            const date = new Date();
            date.setMilliseconds(0); // clean milisecounds for later sql retrieval
            file.timestamp = date;
            cb(null, `${req.params.field}-${req.params.item}-${date.getTime()}`);
        }
    })
}).single('file');

(async () => {
    if (!await fs.pathExists('uploads/')) {
        await fs.mkdir('uploads/');
    }
})();

export async function fileCreate(req: Request, res: Response, next: NextFunction) {
    upload(req, res, async function(error) {
        const file: MulterFile = req.file as MulterFile;
        try {
            if (error) {
                throw error;
            }

            const result: File = {
                fieldId: req.params.field,
                itemId: req.params.item,
                timestamp: file.timestamp,
                name: file.originalname,
                mime: file.mimetype
            };
            await FileModel.create(result);

            res.status(200).send(result);
        } catch (error) {
            try {
                await fs.unlink(file.path);
            } catch (error) {
                console.error(error);
            }
            next(error);
        }
    });
}

export async function fileGet(req: Request, res: Response, next: NextFunction) {
    try {
        const file: File = await FileModel.get(req.params.field, req.params.item, new Date(req.params.time));

        res.status(200).sendFile(`${file.fieldId}-${file.itemId}-${file.timestamp.getTime()}`, {
            root: `uploads/`,
            headers: {
                'Content-Disposition': `inline; filename="${file.name}"`,
                'Content-Type': file.mime,
                'X-originalname': file.name
            }
        });
    } catch (error) {
        next(error);
    }
}
