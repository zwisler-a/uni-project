import { Router } from 'express';

// import { companyCreate, companyDelete, companyGet, companyGetAll, companyUpdate } from '../controllers/companies';
import { companyCreate, companyDelete, companyGet, companyGetAll, companyUpdate } from '../controllers/companies';
import { param } from './util';

/** express.Router for path `/api/companies` */
export const companiesRoute: Router = Router();
companiesRoute.param('id', param);
companiesRoute.post('/', companyCreate);
companiesRoute.get('/', companyGetAll);
companiesRoute.get('/:id', companyGet);
companiesRoute.patch('/:id', companyUpdate);
companiesRoute.delete('/:id', companyDelete);

