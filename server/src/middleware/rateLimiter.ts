import { RateLimiterMemory } from 'rate-limiter-flexible';
import { Request, Response, NextFunction } from 'express';

const rateLimiter = new RateLimiterMemory({
    keyPrefix: 'middleware',
    points: 10, // Número de requests
    duration: 60, // Por segundo
});

export const rateLimiter = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await rateLimiter.consume(req.ip);
        next();
    } catch (rejRes) {
        res.status(429).json({
            error: 'Demasiadas solicitudes',
            message: 'Por favor, espera un momento antes de hacer otra consulta',
            retryAfter: Math.round(rejRes.msBeforeNext / 1000) || 1
        });
    }
};
