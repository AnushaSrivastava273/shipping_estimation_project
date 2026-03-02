import { warehouses } from '../data/datastore';
import { Warehouse } from '../entities/Warehouse';
import { calculateDistance } from '../utils/geoUtils';

export class WarehouseService {
    public static getNearestWarehouse(sellerLat: number, sellerLng: number): Warehouse | null {
        if (!warehouses || warehouses.length === 0) {
            return null;
        }

        let nearestWarehouse: Warehouse | null = null;
        let minDistance = Infinity;

        for (const warehouse of warehouses) {
            const distance = calculateDistance(
                sellerLat, sellerLng,
                warehouse.location.lat, warehouse.location.long
            );

            if (distance < minDistance) {
                minDistance = distance;
                nearestWarehouse = warehouse;
            }
        }

        return nearestWarehouse;
    }
}
