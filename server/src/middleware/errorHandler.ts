import { Request, Response, NextFunction } from 'express';

export const errorHandler = (
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.error('Error:', error);

    // Error de validación
    if (error.name === 'ValidationError') {
        return res.status(400).json({
            error: 'Error de validación',
            message: error.message
        });
    }

    // Error de OpenAI
    if (error.message.includes('OpenAI')) {
        return res.status(503).json({
            error: 'Servicio de IA temporalmente no disponible',
            message: 'Por favor, intenta de nuevo más tarde'
        });
    }

    // Error genérico
    res.status(500).json({
        error: 'Error interno del servidor',
        message: process.env.NODE_ENV === 'development' ? error.message : 'Algo salió mal'
    });
};
