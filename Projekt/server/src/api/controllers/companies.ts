import { Response, Request, NextFunction } from 'express';

import { ApiError, ErrorNumber } from '../../types';
import { COMPANY, Company } from '../models/company';
import { CompanyModel } from '../../database/models/company';

export async function companyCreate(req: Request, res: Response, next: NextFunction) {
    try {
        let company: Company = COMPANY.validate(req.body);
        company = await CompanyModel.create(company);
        res.status(200).send(company);
    } catch (error) {
        next(error);
    }
}

export async function companyGetAll(req: Request, res: Response, next: NextFunction) {
    try {
        res.status(200).send(await CompanyModel.getAll());
    } catch (error) {
        next(error);
    }
}

export async function companyGet(req: Request, res: Response, next: NextFunction) {
    try {
        const id: number = req.params.id;
        res.status(200).send(await CompanyModel.get(id));
    } catch (error) {
        next(error);
    }
}

export async function companyUpdate(req: Request, res: Response, next: NextFunction) {
    try {
        const id: number = req.params.id;
        let company: Company = COMPANY.validate(req.body);

        company = await CompanyModel.update(id, company);

        res.status(200).send(company);
    } catch (error) {
        next(error);
    }
}

export async function companyDelete(req: Request, res: Response, next: NextFunction) {
    try {
        const id: number = req.params.id;
        await CompanyModel.delete(id);
        res.status(204).send();
    } catch (error) {
        next(error);
    }
}