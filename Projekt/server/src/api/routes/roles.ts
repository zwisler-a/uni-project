import { Router } from 'express';

import { verifyJsonWebToken } from '../controllers/authentication';
import { verifyPermission } from '../controllers/roles';
import { Permission } from '../models/role';

import { roleCreate, roleGetList, roleGet, roleUpdate, roleDelete } from '../controllers/roles';
import { param } from './util';

/** express.Router for path `/api/roles` */
export const rolesRoute: Router = Router();
rolesRoute.param('id', param);

rolesRoute.post('/',        verifyJsonWebToken, verifyPermission(Permission.LOCAL_ADMIN), roleCreate); // Create a role
rolesRoute.get('/',         verifyJsonWebToken, verifyPermission(Permission.LOCAL_ADMIN), roleGetList); // Get list of roles
rolesRoute.get('/:id',      verifyJsonWebToken, verifyPermission(Permission.LOCAL_ADMIN), roleGet); // Get a role by id
rolesRoute.patch('/:id',    verifyJsonWebToken, verifyPermission(Permission.LOCAL_ADMIN), roleUpdate); // Update role
rolesRoute.delete('/:id',   verifyJsonWebToken, verifyPermission(Permission.LOCAL_ADMIN), roleDelete); // Delete role
