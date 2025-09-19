import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { chatRoutes } from './routes/chat';
import { lessonsRoutes } from './routes/lessons';
import { errorHandler } from './middleware/errorHandler';
import { rateLimiter } from './middleware/rateLimiter';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(helmet());
app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Rate limiting
app.use(rateLimiter);

// Routes
app.use('/api/chat', chatRoutes);
app.use('/api/lessons', lessonsRoutes);

// Health check
app.get('/api/health', (req, res) => {
    res.json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        version: '1.0.0',
        authors: 'Juan Pereira y Maria de Pereira'
    });
});

// Error handling
app.use(errorHandler);

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({
        error: 'Endpoint not found',
        path: req.originalUrl
    });
});

app.listen(PORT, () => {
    console.log(`🚀 Servidor de Teología Reformada ejecutándose en puerto ${PORT}`);
    console.log(`👥 Desarrollado por: Juan Pereira y Maria de Pereira`);
    console.log(`📚 Especializado en doctrina reformada y tradición presbiteriana`);
});

export default app;
