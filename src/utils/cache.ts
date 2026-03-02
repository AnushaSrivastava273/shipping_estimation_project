import { NextFunction, Request, Response } from 'express';
import NodeCache from 'node-cache';

const cache = new NodeCache({ stdTTL: 3600 });

export const cacheMiddleware = (req: Request, res: Response, next: NextFunction) => {
    if (req.method !== 'GET' && req.method !== 'POST') {
        return next();
    }

    const key = `__express__${req.originalUrl || req.url}__${JSON.stringify(req.body)}`;

    const cachedResponse = cache.get(key);

    if (cachedResponse) {
        return res.json(cachedResponse);
    } else {
        const originalJson = res.json.bind(res);
        res.json = (body: any) => {
            cache.set(key, body);
            return originalJson(body);
        };
        next();
    }
};
