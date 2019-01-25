import { Router } from 'express';
import { verifyJsonWebToken } from '../controllers/authentication';
import { param } from './util';

/** express.Router for path `/api/roles` */
export const rolesRoute: Router = Router();
rolesRoute.param('id', param);
rolesRoute.param('type', param);
/*
rolesRoute.post('/', verifyJsonWebToken, null); // Create a role
rolesRoute.get('/', verifyJsonWebToken, null); // Get list of roles
rolesRoute.get('/:id', verifyJsonWebToken, null); // Gat a role by id
rolesRoute.patch('/:id', verifyJsonWebToken, null); // Update role metadata (name)
rolesRoute.patch('/:id/:type', verifyJsonWebToken, null); // Set role's permission for single type
rolesRoute.delete('/:id', verifyJsonWebToken, null); // Delete role
*/