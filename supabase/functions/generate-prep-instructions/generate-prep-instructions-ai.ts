import { GoogleGenerativeAI, SchemaType } from '@google/generative-ai';

const SYSTEM_PROMPT = `Ești un asistent specializat în generarea de rețete culinare.
Eu sunt un novice care nu stie a gati foarte bine.
Pentru următoarele ingrediente, generează pașii de preparare în următorul format HTML exact:

<div class="recipe-container">
  <h2>[Titlul rețetei]</h2>

  <h3>Pregătire</h3>
  <ol class="prep-steps">
    [pașii de pregătire]
  </ol>

  <h3>Gătire</h3>
  <ol class="cooking-steps">
    [pașii de gătire]
  </ol>
</div>

Echipament disponibil pentru gatit:
Pentru fiecare ingredient:
- specifică cantitatea exactă conform listei furnizate
- pașii de preparare trebuie să fie:
- o singură acțiune clară per pas
- Cu timp specific pentru fiecare operațiune din categoria Gatire (ex: '15 minute', '180°C')
- Pentru pasii de gatire, daca un pas are mai mult de o propozitie, sparge-l in mai multi pasi. Fa propozitii scurte si fii ferm, dar respectuos, nu-mi da alternative.
- Important! In cazut in care la ingrediente gasesti tipuri de mancaruri gata gatite (ex: "tocanita de legume"), va trebuie sa generezi modul in care se gateste de la 0 o tocanita de legume,
  chiar daca ai nevoie de ingrediente aditionale. To procesul de facere de la 0 a acelei mancari (ex: clatite);
- Daca nu ai un titlu de dat, foloseste simplu numele ingredientului trimis catre tine.
- Tine cont de echipamentul disponibil. Nu sugera o metoda de gatit imposibila.
`;

export const generatePrepInstructions = async (
  genAI: GoogleGenerativeAI,
  prompt: any
) => {
  console.log('Starting prep instructions generation using Gemini...');

  const model = genAI.getGenerativeModel({
    model: 'gemini-2.0-flash',
    generationConfig: {
      temperature: 0.1,
      responseMimeType: 'application/json',
      responseSchema: schema,
    },
  });

  const finalPrompt = [
    { text: SYSTEM_PROMPT },
    { text: `Ingrediente: ${JSON.stringify(prompt.ingredients)}` },
    {
      text: `Echipament disponibil: ${prompt.cooking_equipment}`,
    },
  ];

  const result = await model.generateContent(finalPrompt);

  try {
    const jsonResponse = JSON.parse(result.response.text());
    console.log('Prep instructions generated');
    return jsonResponse.html;
  } catch (error: any) {
    console.error('Failed to parse Gemini response:', error);
    throw new Error('Invalid JSON response from Gemini');
  }
};

const schema = {
  type: SchemaType.OBJECT,
  properties: {
    html: {
      type: SchemaType.STRING,
      description:
        'HTML-ul complet al rețetei, formatat conform structurii cerute',
    },
  },
  required: ['html'],
};
