import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { chatService } from '../services/chatService';
import { Message, ChatContextType } from '../types';

interface ChatState {
    messages: Message[];
    isLoading: boolean;
    sessionId: string;
}

type ChatAction =
    | { type: 'ADD_MESSAGE'; payload: Message }
    | { type: 'SET_LOADING'; payload: boolean }
    | { type: 'CLEAR_MESSAGES' }
    | { type: 'SET_MESSAGES'; payload: Message[] };

const chatReducer = (state: ChatState, action: ChatAction): ChatState => {
    switch (action.type) {
        case 'ADD_MESSAGE':
            return { ...state, messages: [...state.messages, action.payload] };
        case 'SET_LOADING':
            return { ...state, isLoading: action.payload };
        case 'CLEAR_MESSAGES':
            return { ...state, messages: [] };
        case 'SET_MESSAGES':
            return { ...state, messages: action.payload };
        default:
            return state;
    }
};

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(chatReducer, {
        messages: [],
        isLoading: false,
        sessionId: crypto.randomUUID(),
    });

    const sendMessage = async (message: string) => {
        const userMessage: Message = {
            id: crypto.randomUUID(),
            text: message,
            sender: 'user',
            timestamp: new Date(),
        };

        dispatch({ type: 'ADD_MESSAGE', payload: userMessage });
        dispatch({ type: 'SET_LOADING', payload: true });

        try {
            const conversationHistory = state.messages.map(msg => ({
                role: msg.sender === 'user' ? 'user' : 'assistant',
                content: msg.text
            }));

            const response = await chatService.sendMessage(message, state.sessionId, conversationHistory);

            const aiMessage: Message = {
                id: crypto.randomUUID(),
                text: response.message,
                sender: 'ai',
                timestamp: new Date(),
                category: response.category,
            };

            dispatch({ type: 'ADD_MESSAGE', payload: aiMessage });
        } catch (error) {
            console.error('Error sending message:', error);

            const errorMessage: Message = {
                id: crypto.randomUUID(),
                text: 'Lo siento, hubo un error al procesar tu consulta. Por favor, intenta de nuevo.',
                sender: 'ai',
                timestamp: new Date(),
                category: 'Error',
            };

            dispatch({ type: 'ADD_MESSAGE', payload: errorMessage });
        } finally {
            dispatch({ type: 'SET_LOADING', payload: false });
        }
    };

    const clearHistory = () => {
        dispatch({ type: 'CLEAR_MESSAGES' });
    };

    return (
        <ChatContext.Provider value={{
            messages: state.messages,
            isLoading: state.isLoading,
            sendMessage,
            clearHistory,
        }}>
            {children}
        </ChatContext.Provider>
    );
};

export const useChat = () => {
    const context = useContext(ChatContext);
    if (!context) {
        throw new Error('useChat must be used within ChatProvider');
    }
    return context;
};
