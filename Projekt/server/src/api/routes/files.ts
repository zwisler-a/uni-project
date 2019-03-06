import { Router } from 'express';

import { verifyJsonWebToken } from '../controllers/authentication';

import { fileCreate, fileGet } from '../controllers/files';
import { param } from './util';


/** express.Router for path `/api/files` */
export const filesRoute: Router = Router();
filesRoute.param('field', param);
filesRoute.param('item', param);

filesRoute.post('/:field/:item',        fileCreate); // Upload new version of file
filesRoute.get('/:field/:item/:time',   fileGet); // Get specific file versions content
