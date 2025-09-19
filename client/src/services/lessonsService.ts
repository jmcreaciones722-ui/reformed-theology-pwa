import axios from 'axios';
import { ApiResponse } from '../types';

const API_BASE_URL = process.env.REACT_APP_API_URL || '/.netlify/functions/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const lessonsService = {
    async generateDailyLesson(topic: string) {
        try {
            const response = await api.post<ApiResponse<{
                content: string;
                topic: string;
                date: string;
            }>>('/lessons/daily', { topic });

            return response.data.data;
        } catch (error) {
            console.error('Error generating lesson:', error);
            throw new Error('Error al generar lección diaria');
        }
    },

    async getLessonTopics() {
        try {
            const response = await api.get<ApiResponse<string[]>>('/lessons/topics');
            return response.data.data;
        } catch (error) {
            console.error('Error getting lesson topics:', error);
            throw new Error('Error al obtener temas de lecciones');
        }
    }
};
