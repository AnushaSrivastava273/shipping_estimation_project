import { Location } from './Customer';

export interface Seller {
    id: string;
    name: string;
    location: Location;

    rating?: number;
    contactEmail?: string;
    isVerified?: boolean;
}

export interface SellerProduct {
    sellerId: string;
    productId: string;
    sellingPrice: number;

    stockQuantity?: number;
    discountPercentage?: number;
}
