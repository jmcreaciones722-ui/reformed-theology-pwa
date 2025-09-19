import React, { useState, useEffect } from 'react';
import { BookOpen, Calendar, Clock, Target, Lightbulb, Heart } from 'lucide-react';
import { lessonsService } from '../../services/lessonsService';

interface DailyLessonProps {
    onClose: () => void;
}

export const DailyLesson: React.FC<DailyLessonProps> = ({ onClose }) => {
    const [lesson, setLesson] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [topics, setTopics] = useState<string[]>([]);
    const [selectedTopic, setSelectedTopic] = useState('');

    useEffect(() => {
        loadTopics();
    }, []);

    const loadTopics = async () => {
        try {
            const topicsData = await lessonsService.getLessonTopics();
            setTopics(topicsData);
            if (topicsData.length > 0) {
                setSelectedTopic(topicsData[0]);
            }
        } catch (error) {
            console.error('Error loading topics:', error);
        }
    };

    const generateLesson = async () => {
        if (!selectedTopic) return;

        setIsLoading(true);
        try {
            const lessonData = await lessonsService.generateDailyLesson(selectedTopic);
            setLesson(lessonData);
        } catch (error) {
            console.error('Error generating lesson:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const parseLessonContent = (content: string) => {
        const sections = content.split('\n\n');
        const parsed = {
            title: '',
            category: '',
            scripture: '',
            explanation: '',
            application: [] as string[],
            reflection: [] as string[],
            prayer: ''
        };

        sections.forEach(section => {
            if (section.includes('Título:')) {
                parsed.title = section.replace('Título:', '').trim();
            } else if (section.includes('Categoría:')) {
                parsed.category = section.replace('Categoría:', '').trim();
            } else if (section.includes('Versículo(s) clave:')) {
                parsed.scripture = section.replace('Versículo(s) clave:', '').trim();
            } else if (section.includes('Explicación doctrinal:')) {
                parsed.explanation = section.replace('Explicación doctrinal:', '').trim();
            } else if (section.includes('Aplicación práctica:')) {
                const appText = section.replace('Aplicación práctica:', '').trim();
                parsed.application = appText.split('\n').filter(line => line.trim().startsWith('-')).map(line => line.replace('-', '').trim());
            } else if (section.includes('Preguntas para reflexión:')) {
                const refText = section.replace('Preguntas para reflexión:', '').trim();
                parsed.reflection = refText.split('\n').filter(line => line.trim().startsWith('-')).map(line => line.replace('-', '').trim());
            } else if (section.includes('Oración sugerida:')) {
                parsed.prayer = section.replace('Oración sugerida:', '').trim();
            }
        });

        return parsed;
    };

    const parsedLesson = lesson ? parseLessonContent(lesson.content) : null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                            <BookOpen className="mr-2 text-blue-600" size={28} />
                            Lección Diaria
                        </h2>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-600 text-2xl"
                        >
                            ×
                        </button>
                    </div>

                    {!lesson ? (
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Selecciona un tema para la lección:
                                </label>
                                <select
                                    value={selectedTopic}
                                    onChange={(e) => setSelectedTopic(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                >
                                    {topics.map((topic, index) => (
                                        <option key={index} value={topic}>
                                            {topic}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <button
                                onClick={generateLesson}
                                disabled={isLoading || !selectedTopic}
                                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                            >
                                {isLoading ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        <span>Generando lección...</span>
                                    </>
                                ) : (
                                    <>
                                        <Calendar size={20} />
                                        <span>Generar Lección Diaria</span>
                                    </>
                                )}
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            <div className="text-center">
                                <h3 className="text-xl font-bold text-gray-900 mb-2">
                                    {parsedLesson?.title || 'Lección Diaria'}
                                </h3>
                                {parsedLesson?.category && (
                                    <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                                        {parsedLesson.category}
                                    </span>
                                )}
                            </div>

                            {parsedLesson?.scripture && (
                                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                                        <BookOpen size={16} className="mr-2" />
                                        Versículo Clave
                                    </h4>
                                    <p className="text-gray-700 italic">"{parsedLesson.scripture}"</p>
                                </div>
                            )}

                            {parsedLesson?.explanation && (
                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                                        <Clock size={16} className="mr-2" />
                                        Explicación Doctrinal
                                    </h4>
                                    <p className="text-gray-700 leading-relaxed">{parsedLesson.explanation}</p>
                                </div>
                            )}

                            {parsedLesson?.application && parsedLesson.application.length > 0 && (
                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                                        <Target size={16} className="mr-2" />
                                        Aplicación Práctica
                                    </h4>
                                    <ul className="space-y-2">
                                        {parsedLesson.application.map((item, index) => (
                                            <li key={index} className="flex items-start">
                                                <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                                <span className="text-gray-700">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {parsedLesson?.reflection && parsedLesson.reflection.length > 0 && (
                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                                        <Lightbulb size={16} className="mr-2" />
                                        Preguntas para Reflexión
                                    </h4>
                                    <ul className="space-y-2">
                                        {parsedLesson.reflection.map((item, index) => (
                                            <li key={index} className="flex items-start">
                                                <span className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                                <span className="text-gray-700">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {parsedLesson?.prayer && (
                                <div className="bg-purple-50 border-l-4 border-purple-400 p-4">
                                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                                        <Heart size={16} className="mr-2" />
                                        Oración Sugerida
                                    </h4>
                                    <p className="text-gray-700 italic">"{parsedLesson.prayer}"</p>
                                </div>
                            )}

                            <div className="flex space-x-3">
                                <button
                                    onClick={generateLesson}
                                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    Nueva Lección
                                </button>
                                <button
                                    onClick={onClose}
                                    className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors"
                                >
                                    Cerrar
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
