import { Request, Response } from 'express';
import { OpenAIService } from '../services/openaiService';

export class ChatController {
    constructor(private openaiService: OpenAIService) { }

    async sendMessage(req: Request, res: Response) {
        try {
            const { message, sessionId, conversationHistory = [] } = req.body;

            if (!message || !sessionId) {
                return res.status(400).json({
                    error: 'Mensaje y sessionId son requeridos'
                });
            }

            const response = await this.openaiService.getChatResponse(message, conversationHistory);

            res.json({
                success: true,
                data: response,
                sessionId
            });
        } catch (error) {
            console.error('Error in sendMessage:', error);
            res.status(500).json({
                error: 'Error interno del servidor',
                message: error instanceof Error ? error.message : 'Error desconocido'
            });
        }
    }

    async getHistory(req: Request, res: Response) {
        try {
            const { sessionId } = req.params;

            // En una implementación real, esto vendría de la base de datos
            // Por ahora retornamos un array vacío
            res.json({
                success: true,
                data: {
                    sessionId,
                    messages: []
                }
            });
        } catch (error) {
            console.error('Error in getHistory:', error);
            res.status(500).json({
                error: 'Error al obtener historial'
            });
        }
    }

    async clearHistory(req: Request, res: Response) {
        try {
            const { sessionId } = req.params;

            // En una implementación real, esto limpiaría la base de datos
            res.json({
                success: true,
                message: 'Historial limpiado exitosamente',
                sessionId
            });
        } catch (error) {
            console.error('Error in clearHistory:', error);
            res.status(500).json({
                error: 'Error al limpiar historial'
            });
        }
    }
}
