import { Router } from 'express';
import { validateJsonWebToken } from '../controllers/authentication';
import { getFields, getFieldsForType } from '../controllers/fields';

export const fieldsRoute: Router = Router();
fieldsRoute.get('/', validateJsonWebToken, getFields);
fieldsRoute.get('/:typeId', validateJsonWebToken, getFieldsForType);
