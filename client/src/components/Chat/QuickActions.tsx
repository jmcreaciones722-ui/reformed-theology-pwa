import React from 'react';
import { BookOpen, Heart, Church, Calendar, Search, HelpCircle } from 'lucide-react';

interface QuickActionsProps {
    onQuickAction: (action: string) => void;
}

const quickActions = [
    {
        icon: BookOpen,
        text: '¿Qué es la teología reformada?',
        action: '¿Qué es la teología reformada y cuáles son sus principios fundamentales?'
    },
    {
        icon: Heart,
        text: 'Explica TULIP',
        action: 'Explica los cinco puntos del calvinismo (TULIP) según la tradición reformada'
    },
    {
        icon: Church,
        text: 'Doctrina de la Iglesia',
        action: '¿Cuál es la doctrina reformada sobre la Iglesia y sus sacramentos?'
    },
    {
        icon: Calendar,
        text: 'Lección del día',
        action: 'Genera una lección diaria sobre teología sistemática'
    },
    {
        icon: Search,
        text: 'Búsqueda bíblica',
        action: 'Busca referencias bíblicas sobre la justificación por la fe'
    },
    {
        icon: HelpCircle,
        text: 'Confesión de Westminster',
        action: 'Explica los puntos principales de la Confesión de Fe de Westminster'
    }
];

export const QuickActions: React.FC<QuickActionsProps> = ({ onQuickAction }) => {
    return (
        <div className="space-y-2">
            <h4 className="text-sm font-medium text-gray-700 mb-3">
                Acciones rápidas:
            </h4>
            <div className="grid grid-cols-2 gap-2">
                {quickActions.map((action, index) => {
                    const Icon = action.icon;
                    return (
                        <button
                            key={index}
                            onClick={() => onQuickAction(action.action)}
                            className="quick-action flex items-center space-x-2 text-left"
                        >
                            <Icon size={16} className="flex-shrink-0" />
                            <span className="text-sm">{action.text}</span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};
