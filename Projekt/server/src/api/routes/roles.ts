import { Router } from 'express';
import { verifyJsonWebToken } from '../controllers/authentication';
import { roleCreate, roleGetList, roleGet, roleUpdate, roleDelete } from '../controllers/roles';
import { param } from './util';

/** express.Router for path `/api/roles` */
export const rolesRoute: Router = Router();
rolesRoute.param('id', param);

rolesRoute.post('/', verifyJsonWebToken, roleCreate); // Create a role
rolesRoute.get('/', verifyJsonWebToken, roleGetList); // Get list of roles
rolesRoute.get('/:id', verifyJsonWebToken, roleGet); // Gat a role by id
rolesRoute.patch('/:id', verifyJsonWebToken, roleUpdate); // Update role
rolesRoute.delete('/:id', verifyJsonWebToken, roleDelete); // Delete role
