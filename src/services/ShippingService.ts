import { Customer } from '../entities/Customer';
import { Product } from '../entities/Product';
import { Warehouse } from '../entities/Warehouse';
import { calculateShippingCharge, DeliverySpeed } from '../utils/chargeCalculator';
import { calculateDistance } from '../utils/geoUtils';

export class ShippingService {
    public static calculateCharge(
        warehouse: Warehouse,
        customer: Customer,
        speed: DeliverySpeed,
        products: Product[] = []
    ): number | null {
        const distanceKm = calculateDistance(
            warehouse.location.lat, warehouse.location.long,
            customer.location.lat, customer.location.lng
        );

        let totalWeightKg = 0;
        if (products.length > 0) {
            totalWeightKg = products.reduce((total, p) => total + p.weightKg, 0);
        } else {
            totalWeightKg = 1;
        }

        return calculateShippingCharge(distanceKm, totalWeightKg, speed);
    }
}
