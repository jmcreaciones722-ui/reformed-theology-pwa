import { Router } from 'express';
import { OpenAIService } from '../services/openaiService';
import { ChatController } from '../controllers/chatController';

const router = Router();
const openaiService = new OpenAIService();
const chatController = new ChatController(openaiService);

router.post('/message', chatController.sendMessage.bind(chatController));
router.get('/history/:sessionId', chatController.getHistory.bind(chatController));
router.delete('/history/:sessionId', chatController.clearHistory.bind(chatController));

export { router as chatRoutes };
