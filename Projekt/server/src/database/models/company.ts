import { Cache } from '../../util/cache';
import { TypeModel } from './type';
import { DatabaseController } from '../controller';
import { Type } from '../../api/models/type';
import { Company } from '../../api/models/company';
import { ApiError, ErrorNumber } from '../../types';

/**
 * Database model class for company objects
 * @author Maurice
 */
export class CompanyModel {
    /** Company cache 1h */
    private static readonly cache = new Cache<Company>({
        stdTTL: 3600,
        checkperiod: 600
    });

    /** current instance of DatabaseController */
    private static database: DatabaseController;

    /**
     * Initialize the company model class
     * @param database current instance of DatabaseController
     */
    static initialize(database: DatabaseController) {
        if (CompanyModel.database) {
            throw new Error('Already initialized CompanyModel');
        }
        CompanyModel.database = database;
    }

    static async create(company: Company): Promise<Company> {
        await CompanyModel.database.beginTransaction(async function(connection) {
            const id = (await CompanyModel.database.COMPANY_CREATE.execute([ company.name ])).insertId;
            company.id = id;

            await CompanyModel.database.GLOBAL_TABLE_CREATE.executeConnection(connection, id);
        });

        await CompanyModel.cache.set(company.id.toString(), company);

        return company;
    }

    static async get(id: number): Promise<Company> {
        const key = id.toString();

        // Check cache
        let company: Company = await CompanyModel.cache.get(key);
        if (company === undefined) {
            // Fetch company
            const companies = await CompanyModel.database.COMPANY_GET_ID.execute([ id ]);
            if (companies.length === 0) {
                throw ApiError.NOT_FOUND(ErrorNumber.COMPANY_NOT_FOUND, id);
            }

            company = companies.pop();
            await CompanyModel.cache.set(key, company);
        } else {
            // Reset ttl after get
            CompanyModel.cache.ttl(key);
        }
        return company;
    }

    static async getAll(): Promise<Company[]> {
        const companies: Company[] = await CompanyModel.database.COMPANY_GET.execute();
        for (const company of companies) {
            await CompanyModel.cache.set(company.id.toString(), company);
        }
        return companies;
    }

    static async update(id: number, company: Company): Promise<Company> {
        const params = [ company.name, id ];
        if ((await CompanyModel.database.COMPANY_UPDATE.execute(params)).affectedRows === 0) {
            throw ApiError.NOT_FOUND(ErrorNumber.COMPANY_NOT_FOUND, id);
        }

        company.id = id;
        await CompanyModel.cache.set(id.toString(), company);

        return company;
    }

    static async delete(id: number): Promise<void> {
        const types: Type[] = await CompanyModel.database.TYPE_GET_COMPANY.execute([ id ]);

        for (const type of types) {
            await TypeModel.delete(type.id);
        }

        if ((await CompanyModel.database.COMPANY_DELETE.execute([ id ])).affectedRows === 0) {
            throw ApiError.NOT_FOUND(ErrorNumber.COMPANY_NOT_FOUND, id);
        }

        await CompanyModel.cache.del(id.toString());
    }
}