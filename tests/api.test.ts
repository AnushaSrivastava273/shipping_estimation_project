import request from 'supertest';
import app from '../src/app';

describe('Shipping API Endpoints', () => {

    it('should return health status', async () => {
        const res = await request(app).get('/health');
        expect(res.status).toBe(200);
        expect(res.body.status).toBe('ok');
    });

    describe('GET /api/v1/warehouse/nearest', () => {
        it('should get the nearest warehouse for valid sellerId and productId', async () => {
            const res = await request(app).get('/api/v1/warehouse/nearest?sellerId=123&productId=456');
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('warehouseId');
            expect(res.body).toHaveProperty('warehouseLocation');
        });

        it('should return 400 when missing params', async () => {
            const res = await request(app).get('/api/v1/warehouse/nearest?sellerId=123');
            expect(res.status).toBe(400);
        });

        it('should return 404 when seller not found', async () => {
            const res = await request(app).get('/api/v1/warehouse/nearest?sellerId=invalid&productId=456');
            expect(res.status).toBe(404);
        });
    });

    describe('GET /api/v1/shipping-charge', () => {
        it('should return shipping charge', async () => {
            const res = await request(app).get('/api/v1/shipping-charge?warehouseId=789&customerId=123&deliverySpeed=standard');
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('shippingCharge');
            expect(typeof res.body.shippingCharge).toBe('number');
        });

        it('should return express charge', async () => {
            const res = await request(app).get('/api/v1/shipping-charge?warehouseId=789&customerId=123&deliverySpeed=express');
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('shippingCharge');
            expect(typeof res.body.shippingCharge).toBe('number');
        });

        it('should return 400 for invalid deliverySpeed', async () => {
            const res = await request(app).get('/api/v1/shipping-charge?warehouseId=789&customerId=123&deliverySpeed=invalid');
            expect(res.status).toBe(400);
        });
    });

    describe('POST /api/v1/shipping-charge/calculate', () => {
        it('should calculate combined shipping charge', async () => {
            const res = await request(app)
                .post('/api/v1/shipping-charge/calculate')
                .send({
                    sellerId: '123',
                    customerId: '456',
                    deliverySpeed: 'express'
                });

            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('shippingCharge');
            expect(res.body).toHaveProperty('nearestWarehouse');
        });

        it('should return 404 for missing customer', async () => {
            const res = await request(app)
                .post('/api/v1/shipping-charge/calculate')
                .send({
                    sellerId: '123',
                    customerId: 'invalid',
                    deliverySpeed: 'express'
                });

            expect(res.status).toBe(404);
        });
    });
});
