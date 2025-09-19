import React from 'react';
import { Message } from '../../types';
import { Bot, User } from 'lucide-react';

interface MessageListProps {
    messages: Message[];
    isLoading: boolean;
}

export const MessageList: React.FC<MessageListProps> = ({ messages, isLoading }) => {
    const getCategoryClass = (category?: string) => {
        if (!category) return '';

        const categoryMap: { [key: string]: string } = {
            'Teología Propia': 'category-theology-propria',
            'Soteriología': 'category-soteriologia',
            'Eclesiología': 'category-ecclesiologia',
            'Escatología': 'category-escatologia',
            'Cristología': 'category-theology-propria',
            'Pneumatología': 'category-soteriologia',
            'Antropología': 'category-ecclesiologia',
            'Bibliología': 'category-escatologia',
        };

        return categoryMap[category] || 'bg-gray-100 text-gray-800';
    };

    return (
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 && (
                <div className="text-center text-gray-500 mt-8">
                    <Bot size={48} className="mx-auto mb-4 text-gray-400" />
                    <h3 className="text-lg font-semibold mb-2">Bienvenido al Asistente de Teología Reformada</h3>
                    <p className="text-sm">
                        Desarrollado por <strong>Juan Pereira y Maria de Pereira</strong>
                    </p>
                    <p className="text-sm mt-2">
                        Haz una pregunta sobre doctrina reformada, teología sistemática, o cualquier tema bíblico.
                    </p>
                </div>
            )}

            {messages.map((message) => (
                <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                    <div
                        className={`flex items-start space-x-3 max-w-3xl ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                            }`}
                    >
                        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${message.sender === 'user'
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-200 text-gray-600'
                            }`}>
                            {message.sender === 'user' ? <User size={16} /> : <Bot size={16} />}
                        </div>

                        <div className={`flex flex-col ${message.sender === 'user' ? 'items-end' : 'items-start'
                            }`}>
                            <div
                                className={`px-4 py-3 rounded-lg ${message.sender === 'user'
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-white text-gray-800 shadow-sm border'
                                    }`}
                            >
                                <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                            </div>

                            {message.category && message.sender === 'ai' && (
                                <div className="mt-1">
                                    <span className={`category-badge ${getCategoryClass(message.category)}`}>
                                        {message.category}
                                    </span>
                                </div>
                            )}

                            <span className="text-xs text-gray-500 mt-1">
                                {message.timestamp.toLocaleTimeString()}
                            </span>
                        </div>
                    </div>
                </div>
            ))}

            {isLoading && (
                <div className="flex justify-start">
                    <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center">
                            <Bot size={16} />
                        </div>
                        <div className="bg-white text-gray-800 shadow-sm border px-4 py-3 rounded-lg">
                            <div className="flex space-x-1">
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
