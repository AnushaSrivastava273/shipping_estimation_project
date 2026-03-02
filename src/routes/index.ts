import { Router } from 'express';
import { ShippingController } from '../controllers/ShippingController';
import { WarehouseController } from '../controllers/WarehouseController';
import { cacheMiddleware } from '../utils/cache';

const router = Router();

// Apply cache middleware to all calculating routes
router.use(cacheMiddleware);

// GET /api/v1/warehouse/nearest
router.get('/warehouse/nearest', WarehouseController.getNearestWarehouse);

// GET /api/v1/shipping-charge
router.get('/shipping-charge', ShippingController.getShippingCharge);

// POST /api/v1/shipping-charge/calculate
router.post('/shipping-charge/calculate', ShippingController.calculateCombinedShipping);

export default router;
