import { Business } from './business';
export interface Agreement {
    id?: string,
    name: string,
    students: string,
    beginDate: Date,
    endDate: Date,
    creationDate: Date,
    userId: string,
    businessId: string,
    agreementBusiness?: Business
}