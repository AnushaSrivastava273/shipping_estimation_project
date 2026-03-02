import { Request, Response } from 'express';
import { sellers } from '../data/datastore';
import { WarehouseService } from '../services/WarehouseService';

export class WarehouseController {
    public static getNearestWarehouse(req: Request, res: Response) {
        try {
            const sellerId = req.query.sellerId as string;
            const productId = req.query.productId as string;

            if (!sellerId || !productId) {
                return res.status(400).json({ error: 'Missing sellerId or productId' });
            }

            const seller = sellers.find(s => s.id === sellerId);

            if (!seller) {
                return res.status(404).json({ error: 'Seller not found' });
            }

            const nearestWarehouse = WarehouseService.getNearestWarehouse(
                seller.location.lat,
                seller.location.lng
            );

            if (!nearestWarehouse) {
                return res.status(404).json({ error: 'No warehouses found' });
            }

            return res.json({
                warehouseId: nearestWarehouse.id,
                warehouseLocation: nearestWarehouse.location
            });

        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
}
