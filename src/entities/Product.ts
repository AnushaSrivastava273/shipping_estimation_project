export interface Dimensions {
    length: number;
    width: number;
    height: number;
}

export interface Product {
    id: string;
    name: string;
    weightKg: number;
    dimensionsCm?: Dimensions;

    category?: 'FMCG' | 'Hardware' | 'Electronics' | 'Apparel';
    description?: string;
    isFragile?: boolean;
}
