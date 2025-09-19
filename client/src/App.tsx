import React, { useState } from 'react';
import { ChatProvider } from './contexts/ChatContext';
import { ChatInterface } from './components/Chat/ChatInterface';
import { DailyLesson } from './components/Lessons/DailyLesson';
import { BookOpen, Menu, X } from 'lucide-react';

function App() {
    const [showDailyLesson, setShowDailyLesson] = useState(false);
    const [showSidebar, setShowSidebar] = useState(false);

    return (
        <ChatProvider>
            <div className="h-screen flex flex-col bg-gray-100">
                {/* Header */}
                <header className="bg-white shadow-sm border-b border-gray-200 px-4 py-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <button
                                onClick={() => setShowSidebar(!showSidebar)}
                                className="p-2 text-gray-600 hover:text-gray-900 lg:hidden"
                            >
                                {showSidebar ? <X size={24} /> : <Menu size={24} />}
                            </button>
                            <div className="flex items-center space-x-2">
                                <BookOpen size={28} className="text-blue-600" />
                                <div>
                                    <h1 className="text-xl font-bold text-gray-900">
                                        Teología Reformada
                                    </h1>
                                    <p className="text-sm text-gray-600">
                                        Asistente de IA especializado
                                    </p>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={() => setShowDailyLesson(true)}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                        >
                            <BookOpen size={16} />
                            <span className="hidden sm:inline">Lección Diaria</span>
                        </button>
                    </div>
                </header>

                {/* Main Content */}
                <main className="flex-1 flex overflow-hidden">
                    {/* Sidebar */}
                    <aside className={`bg-white border-r border-gray-200 w-64 transform transition-transform duration-300 ease-in-out ${showSidebar ? 'translate-x-0' : '-translate-x-full'
                        } lg:translate-x-0 lg:static lg:inset-0 absolute inset-y-0 left-0 z-10`}>
                        <div className="p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                Recursos de Estudio
                            </h3>

                            <div className="space-y-4">
                                <div className="bg-blue-50 p-4 rounded-lg">
                                    <h4 className="font-medium text-blue-900 mb-2">Confesiones Reformadas</h4>
                                    <ul className="text-sm text-blue-700 space-y-1">
                                        <li>• Confesión de Westminster</li>
                                        <li>• Catecismo de Heidelberg</li>
                                        <li>• Confesión Belga</li>
                                        <li>• Cánones de Dort</li>
                                    </ul>
                                </div>

                                <div className="bg-green-50 p-4 rounded-lg">
                                    <h4 className="font-medium text-green-900 mb-2">Teólogos Clásicos</h4>
                                    <ul className="text-sm text-green-700 space-y-1">
                                        <li>• Juan Calvino</li>
                                        <li>• Louis Berkhof</li>
                                        <li>• Charles Hodge</li>
                                        <li>• Herman Bavinck</li>
                                    </ul>
                                </div>

                                <div className="bg-purple-50 p-4 rounded-lg">
                                    <h4 className="font-medium text-purple-900 mb-2">Categorías Teológicas</h4>
                                    <ul className="text-sm text-purple-700 space-y-1">
                                        <li>• Teología Propia</li>
                                        <li>• Soteriología</li>
                                        <li>• Eclesiología</li>
                                        <li>• Escatología</li>
                                    </ul>
                                </div>
                            </div>

                            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                                <p className="text-xs text-gray-600 text-center">
                                    Desarrollado por<br />
                                    <strong>Juan Pereira y Maria de Pereira</strong>
                                </p>
                            </div>
                        </div>
                    </aside>

                    {/* Chat Interface */}
                    <div className="flex-1 flex flex-col">
                        <ChatInterface />
                    </div>
                </main>

                {/* Daily Lesson Modal */}
                {showDailyLesson && (
                    <DailyLesson onClose={() => setShowDailyLesson(false)} />
                )}

                {/* Overlay for mobile sidebar */}
                {showSidebar && (
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50 z-5 lg:hidden"
                        onClick={() => setShowSidebar(false)}
                    />
                )}
            </div>
        </ChatProvider>
    );
}

export default App;
