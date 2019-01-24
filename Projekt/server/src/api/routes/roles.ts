import { Router } from 'express';
import { validateJsonWebToken } from '../controllers/authentication';
import { param } from './util';

/** express.Router for path `/api/roles` */
export const rolesRoute: Router = Router();
rolesRoute.param('id', param);
rolesRoute.param('type', param);

rolesRoute.post('/', validateJsonWebToken, null); // Create a role
rolesRoute.get('/', validateJsonWebToken, null); // Get list of roles
rolesRoute.get('/:id', validateJsonWebToken, null); // Gat a role by id
rolesRoute.patch('/:id', validateJsonWebToken, null); // Update role metadata (name)
rolesRoute.patch('/:id/:type', validateJsonWebToken, null); // Set role's permission for single type
rolesRoute.delete('/:id', validateJsonWebToken, null); // Delete role