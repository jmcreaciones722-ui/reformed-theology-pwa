import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const THEOLOGY_SYSTEM_PROMPT = `
Eres un asistente experto en teología reformada y tradición presbiteriana. Tu conocimiento se basa en:

FUENTES PRIMARIAS:
- Confesión de Fe de Westminster (1647)
- Catecismo Menor y Mayor de Westminster  
- Catecismo de Heidelberg (1563)
- Confesión Belga (1561)
- Cánones de Dort (1618-1619)
- Institución de la Religión Cristiana - Juan Calvino
- Teología Sistemática - Louis Berkhof
- Teología Sistemática - Charles Hodge

PRINCIPIOS FUNDAMENTALES:
1. Sola Scriptura: La Biblia es la única autoridad infalible
2. Los Cinco Puntos del Calvinismo (TULIP)
3. Doctrina de los Pactos (Covenant Theology)
4. Teología Sistemática organizada en loci clásicos

CATEGORÍAS DE RESPUESTA:
- Teología Propia (Doctrina de Dios)
- Bibliología (Doctrina de la Escritura)
- Antropología (Doctrina del Hombre)
- Cristología (Doctrina de Cristo)
- Pneumatología (Doctrina del Espíritu Santo)
- Soteriología (Doctrina de la Salvación)
- Eclesiología (Doctrina de la Iglesia)
- Escatología (Doctrina de las Últimas Cosas)

ESTILO DE RESPUESTA:
- Cita confesiones reformadas relevantes
- Referencias bíblicas precisas
- Explicaciones claras pero académicamente rigurosas
- Diferencia entre interpretaciones dentro del campo reformado
- Contrasta con otras tradiciones cuando sea relevante
- Usa terminología teológica apropiada

LIMITACIONES:
- Permanece dentro de la ortodoxia reformada histórica
- No especules más allá de las fuentes establecidas
- Reconoce cuando hay debates legítimos dentro de la tradición
- Distingue entre doctrinas esenciales y asuntos de libertad cristiana

Desarrollado por Juan Pereira y Maria de Pereira para el estudio de la teología reformada.
`;

export class OpenAIService {
    async getChatResponse(message: string, conversationHistory: any[] = []) {
        try {
            const messages = [
                { role: 'system', content: THEOLOGY_SYSTEM_PROMPT },
                ...conversationHistory,
                { role: 'user', content: message }
            ];

            const response = await openai.chat.completions.create({
                model: 'gpt-4',
                messages: messages,
                max_tokens: 1000,
                temperature: 0.3,
            });

            return {
                message: response.choices[0].message?.content || 'No pude generar una respuesta.',
                category: this.categorizeResponse(message),
                timestamp: new Date().toISOString()
            };
        } catch (error) {
            console.error('Error with OpenAI:', error);
            throw new Error('Error al generar respuesta teológica');
        }
    }

    async generateDailyLesson(topic: string) {
        const lessonPrompt = `
    Crea una lección diaria detallada sobre: ${topic}

    ESTRUCTURA REQUERIDA:
    1. Título de la lección
    2. Categoría teológica
    3. Versículo(s) clave con referencia
    4. Explicación doctrinal (200-300 palabras)
    5. Conexión con confesiones reformadas
    6. Aplicación práctica (3 puntos)
    7. Preguntas para reflexión (2-3)
    8. Oración sugerida

    Mantén el nivel académico pero accesible para estudiantes de teología.
    Desarrollado por Juan Pereira y Maria de Pereira.
    `;

        try {
            const response = await openai.chat.completions.create({
                model: 'gpt-4',
                messages: [
                    { role: 'system', content: THEOLOGY_SYSTEM_PROMPT },
                    { role: 'user', content: lessonPrompt }
                ],
                max_tokens: 1200,
                temperature: 0.4,
            });

            return {
                content: response.choices[0].message?.content,
                topic,
                date: new Date().toISOString()
            };
        } catch (error) {
            console.error('Error generating lesson:', error);
            throw new Error('Error al generar lección diaria');
        }
    }

    private categorizeResponse(message: string): string {
        const lowerMessage = message.toLowerCase();

        if (lowerMessage.includes('dios') || lowerMessage.includes('trinidad') || lowerMessage.includes('atributos')) {
            return 'Teología Propia';
        }
        if (lowerMessage.includes('biblia') || lowerMessage.includes('escritura') || lowerMessage.includes('inspiración')) {
            return 'Bibliología';
        }
        if (lowerMessage.includes('hombre') || lowerMessage.includes('pecado') || lowerMessage.includes('caída')) {
            return 'Antropología';
        }
        if (lowerMessage.includes('cristo') || lowerMessage.includes('jesús') || lowerMessage.includes('encarnación')) {
            return 'Cristología';
        }
        if (lowerMessage.includes('espíritu') || lowerMessage.includes('santo') || lowerMessage.includes('pneumatología')) {
            return 'Pneumatología';
        }
        if (lowerMessage.includes('salvación') || lowerMessage.includes('tulip') || lowerMessage.includes('gracia')) {
            return 'Soteriología';
        }
        if (lowerMessage.includes('iglesia') || lowerMessage.includes('sacramentos') || lowerMessage.includes('bautismo')) {
            return 'Eclesiología';
        }
        if (lowerMessage.includes('futuro') || lowerMessage.includes('milenio') || lowerMessage.includes('juicio')) {
            return 'Escatología';
        }

        return 'Teología General';
    }
}
