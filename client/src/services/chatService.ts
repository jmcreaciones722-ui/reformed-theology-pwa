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

export const chatService = {
    async sendMessage(message: string, sessionId: string, conversationHistory: any[] = []) {
        try {
            const response = await api.post<ApiResponse<{
                message: string;
                category: string;
                timestamp: string;
            }>>('/chat/message', {
                message,
                sessionId,
                conversationHistory
            });

            return response.data.data;
        } catch (error) {
            console.error('Error sending message:', error);
            throw new Error('Error al enviar mensaje');
        }
    },

    async getHistory(sessionId: string) {
        try {
            const response = await api.get<ApiResponse<{
                sessionId: string;
                messages: any[];
            }>>(`/chat/history/${sessionId}`);

            return response.data.data;
        } catch (error) {
            console.error('Error getting history:', error);
            throw new Error('Error al obtener historial');
        }
    },

    async clearHistory(sessionId: string) {
        try {
            const response = await api.delete<ApiResponse<{
                message: string;
                sessionId: string;
            }>>(`/chat/history/${sessionId}`);

            return response.data;
        } catch (error) {
            console.error('Error clearing history:', error);
            throw new Error('Error al limpiar historial');
        }
    }
};
