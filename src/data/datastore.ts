import { Customer } from '../entities/Customer';
import { Product } from '../entities/Product';
import { Seller, SellerProduct } from '../entities/Seller';
import { Warehouse } from '../entities/Warehouse';

export const customers: Customer[] = [
    {
        id: '123',
        name: 'Shree Kirana Store',
        phoneNumber: '9847000000',
        location: { lat: 11.232, lng: 23.445495 },
        gstNumber: '29ABCDE1234F1Z5',
        shopType: 'Kirana',
        ownerName: 'Shree Ram'
    },
    {
        id: '456',
        name: 'Andheri Mini Mart',
        phoneNumber: '9101000000',
        location: { lat: 17.232, lng: 33.445495 },
        gstNumber: '27ZYXWV9876Q4P3',
        shopType: 'Supermarket',
        ownerName: 'Amit Patel'
    }
];

export const products: Product[] = [
    {
        id: '456',
        name: 'Maggie 500g',
        weightKg: 0.5,
        dimensionsCm: { length: 10, width: 10, height: 10 },
        category: 'FMCG',
        description: 'Instant noodles packet',
        isFragile: false
    },
    {
        id: '789',
        name: 'Rice Bag 10Kg',
        weightKg: 10,
        dimensionsCm: { length: 100, width: 80, height: 50 },
        category: 'FMCG',
        description: 'Premium Sona Masoori Rice',
        isFragile: false
    },
    {
        id: '101',
        name: 'Sugar Bag 25kg',
        weightKg: 25,
        dimensionsCm: { length: 100, width: 90, height: 60 },
        category: 'FMCG',
        description: 'Refined Sugar',
        isFragile: false
    }
];

export const sellers: Seller[] = [
    {
        id: '123',
        name: 'Nestle Seller',
        location: { lat: 11.000, lng: 30.000 },
        rating: 4.8,
        contactEmail: 'sales@nestleseller.in',
        isVerified: true
    },
    {
        id: 'sel-002',
        name: 'Rice Seller',
        location: { lat: 18.000, lng: 25.000 },
        rating: 4.2,
        contactEmail: 'contact@riceseller.net',
        isVerified: false
    }
];

export const sellerProducts: SellerProduct[] = [
    {
        sellerId: '123',
        productId: '456',
        sellingPrice: 10,
        stockQuantity: 5000,
        discountPercentage: 5
    },
    {
        sellerId: 'sel-002',
        productId: '789',
        sellingPrice: 500,
        stockQuantity: 200,
        discountPercentage: 0
    }
];

export const warehouses: Warehouse[] = [
    {
        id: '789',
        name: 'BLR_Warehouse',
        location: { lat: 12.99999, long: 37.923273 },
        capacitySt: 50000,
        managerName: 'Kiran Kumar',
        contactNumber: '080-12345678'
    },
    {
        id: 'wh-002',
        name: 'MUMB_Warehouse',
        location: { lat: 11.99999, long: 27.923273 },
        capacitySt: 75000,
        managerName: 'Rajesh Sharma',
        contactNumber: '022-87654321'
    }
];
