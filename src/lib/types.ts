export interface CompanyState {
    id?: number | null;
    name: string;
    address: string;
    currency: string;
    taxRate: number | null;
    serviceChargeRate: number | null;
    imageUrl?: string,
    coverPhoto?: string,
}

export interface LocationType{
    id?: number | null;
    name: string;
}