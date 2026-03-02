import { Request, Response } from 'express';
import { customers, sellers, warehouses } from '../data/datastore';
import { ShippingService } from '../services/ShippingService';
import { WarehouseService } from '../services/WarehouseService';
import { DeliverySpeed } from '../utils/chargeCalculator';

export class ShippingController {
    public static getShippingCharge(req: Request, res: Response) {
        try {
            const warehouseId = req.query.warehouseId as string;
            const customerId = req.query.customerId as string;
            const deliverySpeedParam = req.query.deliverySpeed as string;

            if (!warehouseId || !customerId || !deliverySpeedParam) {
                return res.status(400).json({ error: 'Missing warehouseId, customerId, or deliverySpeed' });
            }

            const warehouse = warehouses.find(w => w.id === warehouseId);
            if (!warehouse) {
                return res.status(404).json({ error: 'Warehouse not found' });
            }

            const customer = customers.find(c => c.id === customerId);
            if (!customer) {
                return res.status(404).json({ error: 'Customer not found' });
            }

            let speed = DeliverySpeed.STANDARD;
            if (deliverySpeedParam.toLowerCase() === 'express') {
                speed = DeliverySpeed.EXPRESS;
            } else if (deliverySpeedParam.toLowerCase() !== 'standard') {
                return res.status(400).json({ error: 'Invalid deliverySpeed. Must be standard or express' });
            }

            const shippingCharge = ShippingService.calculateCharge(warehouse, customer, speed);

            return res.json({ shippingCharge });

        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }

    public static calculateCombinedShipping(req: Request, res: Response) {
        try {
            const { sellerId, customerId, deliverySpeed } = req.body;

            if (!sellerId || !customerId || !deliverySpeed) {
                return res.status(400).json({ error: 'Missing sellerId, customerId, or deliverySpeed' });
            }

            const seller = sellers.find(s => s.id === sellerId);
            if (!seller) {
                return res.status(404).json({ error: 'Seller not found' });
            }

            const customer = customers.find(c => c.id === customerId);
            if (!customer) {
                return res.status(404).json({ error: 'Customer not found' });
            }

            let speed = DeliverySpeed.STANDARD;
            if (deliverySpeed.toLowerCase() === 'express') {
                speed = DeliverySpeed.EXPRESS;
            } else if (deliverySpeed.toLowerCase() !== 'standard') {
                return res.status(400).json({ error: 'Invalid deliverySpeed. Must be standard or express' });
            }

            const nearestWarehouse = WarehouseService.getNearestWarehouse(
                seller.location.lat,
                seller.location.lng
            );

            if (!nearestWarehouse) {
                return res.status(404).json({ error: 'No warehouses found' });
            }

            const shippingCharge = ShippingService.calculateCharge(nearestWarehouse, customer, speed);

            return res.json({
                shippingCharge,
                nearestWarehouse: {
                    warehouseId: nearestWarehouse.id,
                    warehouseLocation: nearestWarehouse.location
                }
            });

        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
}
