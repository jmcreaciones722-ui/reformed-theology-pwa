import { Request, Response } from 'express';
import { OpenAIService } from '../services/openaiService';

export class LessonsController {
    constructor(private openaiService: OpenAIService) { }

    async generateDailyLesson(req: Request, res: Response) {
        try {
            const { topic } = req.body;

            if (!topic) {
                return res.status(400).json({
                    error: 'Tema de la lección es requerido'
                });
            }

            const lesson = await this.openaiService.generateDailyLesson(topic);

            res.json({
                success: true,
                data: lesson
            });
        } catch (error) {
            console.error('Error in generateDailyLesson:', error);
            res.status(500).json({
                error: 'Error al generar lección diaria',
                message: error instanceof Error ? error.message : 'Error desconocido'
            });
        }
    }

    async getLessonTopics(req: Request, res: Response) {
        try {
            const topics = [
                'La Soberanía de Dios',
                'Los Atributos de Dios',
                'La Doctrina de la Trinidad',
                'La Providencia Divina',
                'La Caída del Hombre',
                'El Pecado Original',
                'La Elección y Predestinación',
                'La Expiación Limitada',
                'La Gracia Irresistible',
                'La Perseverancia de los Santos',
                'La Justificación por la Fe',
                'La Santificación',
                'La Doctrina de los Pactos',
                'El Bautismo',
                'La Cena del Señor',
                'El Gobierno de la Iglesia',
                'La Segunda Venida de Cristo',
                'El Juicio Final',
                'La Resurrección',
                'El Estado Eterno'
            ];

            res.json({
                success: true,
                data: topics
            });
        } catch (error) {
            console.error('Error in getLessonTopics:', error);
            res.status(500).json({
                error: 'Error al obtener temas de lecciones'
            });
        }
    }
}
