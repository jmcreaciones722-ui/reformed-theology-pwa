const { OpenAI } = require('openai');

// Configurar OpenAI
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

Desarrollado por Juan Pereira y Maria de Pereira para el estudio de la teología reformada.
`;

exports.handler = async (event, context) => {
    // Configurar CORS
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
        'Content-Type': 'application/json'
    };

    // Manejar preflight requests
    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ message: 'CORS preflight' })
        };
    }

    try {
        // Verificar API key
        if (!process.env.OPENAI_API_KEY) {
            return {
                statusCode: 500,
                headers,
                body: JSON.stringify({ error: 'OpenAI API key not configured' })
            };
        }

        if (event.httpMethod === 'GET') {
            // Endpoint para obtener temas de lecciones
            const topics = [
                'La Soberanía de Dios',
                'Los Atributos de Dios',
                'La Doctrina de la Trinidad',
                'La Providencia Divina',
                'La Caída del Hombre',
                'El Pecado Original',
                'La Elección y Predestinación',
                'La Expiación Limitada',
                'La Gracia Irresistible',
                'La Perseverancia de los Santos',
                'La Justificación por la Fe',
                'La Santificación',
                'La Doctrina de los Pactos',
                'El Bautismo',
                'La Cena del Señor',
                'El Gobierno de la Iglesia',
                'La Segunda Venida de Cristo',
                'El Juicio Final',
                'La Resurrección',
                'El Estado Eterno'
            ];

            return {
                statusCode: 200,
                headers,
                body: JSON.stringify({
                    success: true,
                    data: topics
                })
            };
        }

        if (event.httpMethod === 'POST') {
            // Endpoint para generar lección diaria
            const { topic } = JSON.parse(event.body);

            if (!topic) {
                return {
                    statusCode: 400,
                    headers,
                    body: JSON.stringify({ error: 'Topic is required' })
                };
            }

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
                statusCode: 200,
                headers,
                body: JSON.stringify({
                    success: true,
                    data: {
                        content: response.choices[0].message?.content,
                        topic,
                        date: new Date().toISOString()
                    }
                })
            };
        }

        return {
            statusCode: 405,
            headers,
            body: JSON.stringify({ error: 'Method not allowed' })
        };

    } catch (error) {
        console.error('Error in lessons function:', error);

        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({
                error: 'Internal server error',
                message: error.message
            })
        };
    }
};
