export interface Message {
    id: string;
    text: string;
    sender: 'user' | 'ai';
    timestamp: Date;
    category?: string;
}

export interface DailyLesson {
    id: string;
    title: string;
    category: string;
    content: string;
    scripture: string;
    application: string[];
    reflection: string[];
    prayer: string;
    date: Date;
}

export interface ChatContextType {
    messages: Message[];
    isLoading: boolean;
    sendMessage: (message: string) => Promise<void>;
    clearHistory: () => void;
}

export interface LessonTopic {
    id: string;
    name: string;
    category: string;
    description: string;
}

export interface StudyProgress {
    userId: string;
    completedLessons: string[];
    currentTrack: string;
    streak: number;
    totalTime: number;
}

export interface ApiResponse<T> {
    success: boolean;
    data: T;
    error?: string;
    message?: string;
}
