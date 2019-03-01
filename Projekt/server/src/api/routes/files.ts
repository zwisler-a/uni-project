import { Router } from 'express';
import { verifyJsonWebToken } from '../controllers/authentication';
import { fileInformation, fileUpload, fileDownload, fileUpdate, fileDelete } from '../controllers/files';


export const filesRoute: Router = Router();
// get information which files exists for a specific item
filesRoute.get('/:type/:id', verifyJsonWebToken, fileInformation);
// get files for an item 
filesRoute.get('/:type/:id/download', verifyJsonWebToken, fileDownload);
// upload one new file for an item 
filesRoute.post('/:type/:id', verifyJsonWebToken, fileUpload);
filesRoute.patch('/:type/:id', verifyJsonWebToken, fileUpdate);
filesRoute.delete('/:type/:id', verifyJsonWebToken, fileDelete);
