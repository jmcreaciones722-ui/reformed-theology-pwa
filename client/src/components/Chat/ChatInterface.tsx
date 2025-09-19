import React, { useState, useRef, useEffect } from 'react';
import { Send, Trash2 } from 'lucide-react';
import { useChat } from '../../contexts/ChatContext';
import { MessageList } from './MessageList';
import { QuickActions } from './QuickActions';

export const ChatInterface: React.FC = () => {
    const [inputMessage, setInputMessage] = useState('');
    const { messages, isLoading, sendMessage, clearHistory } = useChat();
    const inputRef = useRef<HTMLInputElement>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async () => {
        if (!inputMessage.trim() || isLoading) return;

        await sendMessage(inputMessage);
        setInputMessage('');
        inputRef.current?.focus();
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const handleClearHistory = () => {
        if (window.confirm('¿Estás seguro de que quieres limpiar el historial de conversación?')) {
            clearHistory();
        }
    };

    return (
        <div className="flex flex-col h-full bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 px-4 py-3 flex justify-between items-center">
                <div>
                    <h1 className="text-lg font-semibold text-gray-900">
                        Asistente de Teología Reformada
                    </h1>
                    <p className="text-sm text-gray-600">
                        Desarrollado por Juan Pereira y Maria de Pereira
                    </p>
                </div>
                {messages.length > 0 && (
                    <button
                        onClick={handleClearHistory}
                        className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                        title="Limpiar historial"
                    >
                        <Trash2 size={20} />
                    </button>
                )}
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-hidden">
                <MessageList messages={messages} isLoading={isLoading} />
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="border-t bg-white p-4">
                <QuickActions onQuickAction={setInputMessage} />

                <div className="flex gap-2 mt-3">
                    <input
                        ref={inputRef}
                        type="text"
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Pregunta sobre doctrina reformada, teología sistemática..."
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                        disabled={isLoading}
                    />
                    <button
                        onClick={handleSend}
                        disabled={isLoading || !inputMessage.trim()}
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
                    >
                        <Send size={20} />
                        <span className="hidden sm:inline">Enviar</span>
                    </button>
                </div>
            </div>
        </div>
    );
};
