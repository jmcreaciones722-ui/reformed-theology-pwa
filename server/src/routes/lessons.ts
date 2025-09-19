import { Router } from 'express';
import { OpenAIService } from '../services/openaiService';
import { LessonsController } from '../controllers/lessonsController';

const router = Router();
const openaiService = new OpenAIService();
const lessonsController = new LessonsController(openaiService);

router.post('/daily', lessonsController.generateDailyLesson.bind(lessonsController));
router.get('/topics', lessonsController.getLessonTopics.bind(lessonsController));

export { router as lessonsRoutes };
