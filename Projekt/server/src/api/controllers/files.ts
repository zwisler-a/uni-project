import { Response, Request, NextFunction } from 'express';

import { Field, ITEM } from '../models/item';

const multer = require('multer');

// save file to disk in specific folder 
// path is saved in db, in table item(?)


var storage = multer.diskStorage({
     destination: function(req, file, cb){
          cb(null, 'uploads')
      },
       filename: function(req, file, cb){
          cb(null, file.fieldname + '-' + Date.now())
    }
  })
    var upload = multer({ storage: storage}); 



export async function fileInformation(req: Request, res: Response, next: NextFunction){
    try {
        res.status(200);
    } catch (error) {
        next(error);
    }
}

export async function fileUpload(req: Request, res: Response, next: NextFunction) {
    try {
        const file = req.file
        if(!file){
            const error = new Error('No files choosen!')
        }
        res.send(file)
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
