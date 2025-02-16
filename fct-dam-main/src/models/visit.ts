import { Vehicle } from './vehicle';
import { Agreement } from './agreement';

export enum VisitType {"Primera", "Segunda", "Tercera", "Cuarta"};

export enum Conveyance {"Taxi", "Vehículo propio", "Bus/Tren"}

export interface Visit {
    id?: string,
    userId?: string,
    agreement?: Agreement,
    type: VisitType,
    last: boolean,
    request_help: boolean,
    transport: Conveyance,
    vehicle?: Vehicle,
    publicTransportIncome: number,
    beginDate: Date,
    endDate: Date,
    creationDate: Date,
    observations: string,
    authorized: Boolean,
    authorizedDate: Date
}