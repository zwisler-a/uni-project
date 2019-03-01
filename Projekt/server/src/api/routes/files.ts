import { Router } from 'express';
import { verifyJsonWebToken } from '../controllers/authentication';
import { fileInformation, fileUpload, fileDownload, fileUpdate, fileDelete } from '../controllers/files';


export const itemsRoute: Router = Router();
itemsRoute.get('/:type/:id', verifyJsonWebToken, fileInformation);
itemsRoute.get('/:type/:id/download', verifyJsonWebToken, fileDownload);
itemsRoute.post('/:type/:id', verifyJsonWebToken, fileUpload);
itemsRoute.patch('/:type/:id', verifyJsonWebToken, fileUpdate);
itemsRoute.delete('/:type/:id', verifyJsonWebToken, fileDelete);
