import { GoogleGenerativeAI, SchemaType } from '@google/generative-ai';

const SYSTEM_PROMPT = `Ești un bucătar expert și asistent pentru organizarea listelor de cumpărături cu următoarele responsabilități:

1. ANALIZĂ ȘI DESCOMPUNERE INGREDIENTE:
- Identifică dacă un item este ingredient individual sau un fel de mâncare complet
- Când detectezi un fel de mâncare (ex: "tocăniță", "supă", "salată", "paste", etc.), descompune-l automat în ingredientele sale de bază
- Pentru fiecare fel de mâncare, generează toate ingredientele necesare pentru a fi gatita folosind cunoștințele tale culinare
- Daca lipsesc cantitațile, folosește judecata culinară pentru a estima cantități rezonabile

2. STANDARDIZARE:
- Convertește numerele în format numeric (ex: "unu" -> "1")
- Standardizează unități: g, ml, buc (kg->g, L->ml)
- Fructe si legume: mereu intregi, nu jumatati sau felii
- Normalizează numele la forma de bază, lowercase

3. CONSOLIDARE INTELIGENTĂ:
- Combină cantitățile pentru ingrediente similare/identice
- Recunoaște și unifică ingrediente similare (ex: "roșii cherry" și "roșii" pot fi combinate)
- Elimina modul de gatit din nume si aduna cantitatile (ex: "pui la gratar" si "pui prajit" devin "pui", sau "peste la cuptor" si "peste la gratar" devin "peste", sau "orez fiert" devine "orez")
- 8 felii pâine = 1 pâine
- 1 albuș/gălbenuș = 1 ou

4. REGULI PENTRU CANTITĂȚI:
- Toate cantitatile sunt in g pentru alimente solide si ml pentru alimente lichide

6. REGULI SPECIALE:
- Ignoră complet orice ingredient numit "SAU"
- Nu include elemente de baza precum ulei, sare, piper, condimente esențiale
- Poti extrage ingrediente si din campul quantity daca exista (ex: "2 banane, 400ml lapte" în quantity)
- Pentru feluri de mâncare, nu include niciodată felul de mâncare în sine în lista finală
`;

export const generateShoppingList = async (
  genAI: GoogleGenerativeAI,
  ingredients: any[]
) => {
  console.log('Starting shopping list generation using Gemini...');

  const model = genAI.getGenerativeModel({
    model: 'gemini-2.0-flash',
    generationConfig: {
      temperature: 0.1,
      responseMimeType: 'application/json',
      responseSchema: schema,
    },
  });

  const result = await model.generateContent([
    {
      text: SYSTEM_PROMPT,
    },
    {
      text: `Organizează următoarele ingrediente în categorii, consolidează cantitățile.
      ${JSON.stringify(ingredients)}`,
    },
  ]);

  const response = result.response;
  console.log('Raw response:', response.text());

  try {
    const jsonResponse = JSON.parse(response.text());
    console.log('Shopping list generated');
    return jsonResponse;
  } catch (error: any) {
    console.error('Failed to parse Gemini response:', error);
    throw new Error('Invalid JSON response from Gemini');
  }
};

const schema = {
  type: SchemaType.ARRAY,
  items: {
    type: SchemaType.OBJECT,
    properties: {
      category: {
        type: SchemaType.STRING,
        description:
          'Categoria ingredientului (Lactate & Oua, Fructe, Legume, Carne & Peste, Brutarie & Patiserie, Nuci & Cereale, Suplimente)',
      },
      name: {
        type: SchemaType.STRING,
        description: 'Numele ingredientului',
      },
      quantity: {
        type: SchemaType.STRING,
        description: `Cantitatea cu unitatea de măsură corespunzătoare categoriei:
        - Lactate & Oua: ml pentru lichide, buc pentru ouă
        - Fructe & Legume: buc pentru întregi (mere, portocale etc), g pentru cele cântărite
        - Carne & Peste: g
        - Brutarie & Patiserie: buc sau g
        - Nuci & Cereale: g
        - Suplimente: g
        Exemplu: "2 buc", "500 g", "1000 ml"`,
      },
    },
    required: ['category', 'name', 'quantity'],
  },
};
