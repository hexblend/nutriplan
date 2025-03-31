import Anthropic from '@anthropic-ai/sdk';
import { GenerateFoodPlanFormData } from './generate-meal-plan-types.ts';

export const generateMealPlan = async (
  anthropic: Anthropic,
  prompt: GenerateFoodPlanFormData
) => {
  console.log(`Starting meal plan generation using Gemini...`);
  console.log('Prompt', prompt);

  const userPrompt = `
          CERINȚE STRICTE ZILNICE - TREBUIE RESPECTATE EXACT:
          Luni: ${prompt.luni_calorii} calorii, Proteine ${prompt.luni_proteine}, Carbohidrati ${prompt.luni_carbohidrati}, Grasimi ${prompt.luni_grasimi}. Impartite in procentajul meselor: Mic dejun: ${prompt.luni_procent_mic_dejun}, Pranz: ${prompt.luni_procent_pranz}, Cina: ${prompt.luni_procent_cina}, Gustari: ${prompt.luni_procent_gustari};
          Marti: ${prompt.marti_calorii} calorii, Proteine ${prompt.marti_proteine}, Carbohidrati ${prompt.marti_carbohidrati}, Grasimi ${prompt.marti_grasimi}. Impartite in procentajul meselor: Mic dejun: ${prompt.marti_procent_mic_dejun}, Pranz: ${prompt.marti_procent_pranz}, Cina: ${prompt.marti_procent_cina}, Gustari: ${prompt.marti_procent_gustari};
          Miercuri: ${prompt.miercuri_calorii} calorii, Proteine ${prompt.miercuri_proteine}, Carbohidrati ${prompt.miercuri_carbohidrati}, Grasimi ${prompt.miercuri_grasimi}. Impartite in procentajul meselor: Mic dejun: ${prompt.miercuri_procent_mic_dejun}, Pranz: ${prompt.miercuri_procent_pranz}, Cina: ${prompt.miercuri_procent_cina}, Gustari: ${prompt.miercuri_procent_gustari};
          Joi: ${prompt.joi_calorii} calorii, Proteine ${prompt.joi_proteine}, Carbohidrati ${prompt.joi_carbohidrati}, Grasimi ${prompt.joi_grasimi}. Impartite in procentajul meselor: Mic dejun: ${prompt.joi_procent_mic_dejun}, Pranz: ${prompt.joi_procent_pranz}, Cina: ${prompt.joi_procent_cina}, Gustari: ${prompt.joi_procent_gustari};
          Vineri: ${prompt.vineri_calorii} calorii, Proteine ${prompt.vineri_proteine}, Carbohidrati ${prompt.vineri_carbohidrati}, Grasimi ${prompt.vineri_grasimi}. Impartite in procentajul meselor: Mic dejun: ${prompt.vineri_procent_mic_dejun}, Pranz: ${prompt.vineri_procent_pranz}, Cina: ${prompt.vineri_procent_cina}, Gustari: ${prompt.vineri_procent_gustari};
          Sambata: ${prompt.sambata_calorii} calorii, Proteine ${prompt.sambata_proteine}, Carbohidrati ${prompt.sambata_carbohidrati}, Grasimi ${prompt.sambata_grasimi}. Impartite in procentajul meselor: Mic dejun: ${prompt.sambata_procent_mic_dejun}, Pranz: ${prompt.sambata_procent_pranz}, Cina: ${prompt.sambata_procent_cina}, Gustari: ${prompt.sambata_procent_gustari};
          Duminica: ${prompt.duminica_calorii} calorii, Proteine ${prompt.duminica_proteine}, Carbohidrati ${prompt.duminica_carbohidrati}, Grasimi ${prompt.duminica_grasimi}. Impartite in procentajul meselor: Mic dejun: ${prompt.duminica_procent_mic_dejun}, Pranz: ${prompt.duminica_procent_pranz}, Cina: ${prompt.duminica_procent_cina}, Gustari: ${prompt.duminica_procent_gustari};

          ${prompt.echipament_gatit ? `Echipament de gatit: ${prompt.echipament_gatit}` : ''}
          ${prompt.restrictii ? `Restrictii alimentare: ${prompt.restrictii}` : ''}
          ${prompt.include_alimente ? `include_alimente: ${prompt.include_alimente}` : ''}
          ${prompt.fara_aceste_alimente ? `fara_aceste_alimente: ${prompt.fara_aceste_alimente}` : ''}
          ${
            prompt.include_alimente ||
            (prompt.fara_aceste_alimente &&
              `Important:
            - Pentru alimentele din "include_alimente":
              * Include-le in MAXIM 2 zile din saptamana
              * Include-le MAXIM o data pe zi cand sunt folosite
              * Distribuie-le uniform in saptamana (nu toate in zile consecutive)
            - Pentru "fara_aceste_alimente", exclude-le complet din plan
            - Nu sugera un aliment sa fie gatit in vreun fel care nu e disponibil in echipamentul de gatit. De ex. nu sugera pui la gratar, daca in echipamentul de gatit nu este Gratar.
            `)
          }

          Important:
          - Respecta intocmai necesarul caloric si procentajul nutrientilor;
          - Nu repeta ingrediente / mancaruri sau mese;
          - Nu repeta tipare de exemplu in fiecare zi la cina sa fie peste;
          - Adauga nutrienti si la bauturi calde precum cafea sau ceai;

          Te rog să îmi răspunzi doar cu un JSON valid (fara alt text) care respectă următoarea structură exactă:
                    {
                      "days": [
                        {
                          "name": "string (numele zilei)", // Luni, Marti, Miercuri, Joi, Vineri, Sambata, Duminica
                          "eating_occasions": [
                            {
                              "name": "string (numele mesei)", // Mic dejun, Gustare, Pranz, Gustare 2, Cina
                              "ingredients": [
                                {
                                  "name": "string",
                                  "quantity": "string (doar număr bazat pe cantitate)",
                                  "calories": "string (doar număr bazat pe cantitate)",
                                  "proteins": "string (doar număr bazat pe cantitate)",
                                  "lipids": "string (doar număr bazat pe cantitate)",
                                  "carbohydrates": "string (doar număr bazat pe cantitate)",
                                  "fibers": "string (doar număr bazat pe cantitate)"
                                }
                              ]
                            }
                          ]
                        }
                      ]
                    }

           Foarte Important: - Toate caloriile adunate a ingredientelor dintr-o zi trebuie sa rezulte in caloriile setate pentru ziua respectiva. Daca o masa are 0%, atunci celelatle mese trebuie sa compenseze pentru a ajunge la totalul caloric cerut.
                             - Procentele nutrientilor dintr-o zi (proteine, carbohydrati, grasimi) trebuie sa fie egal cu procentele stabilite pentru ziua respectiva.
          `;
  // return console.log('user prompt', userPrompt);
  // ${JSON.stringify(localIngredients)}

  try {
    const response = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-latest',
      max_tokens: 8192,
      temperature: 0.7,
      system: `Ești un bucătar expert și nutriționist pentru sportivi si oameni care vor sa aibe grija de sanatatea lor.
      Genereaza plan alimentar de Luni pana Duminica cu 5 mese "Mic dejun", "Gustare", "Pranz", "Gustare 2", "Cina".`,
      messages: [
        {
          role: 'user',
          content: userPrompt,
        },
      ],
    });
    // @ts-expect-error-next-line
    const jsonResponse = JSON.parse(response.content[0].text);
    return jsonResponse;
  } catch (error: any) {
    console.log('error', error.message);
    throw new Error('Failed to generate or parse meal plan response');
  }
};

// const schema = {
//   type: SchemaType.OBJECT,
//   properties: {
//     days: {
//       type: SchemaType.ARRAY,
//       description: 'Lista planurilor alimentare zilnice',
//       items: {
//         type: SchemaType.OBJECT,
//         properties: {
//           name: {
//             type: SchemaType.STRING,
//             description:
//               'Luni, Marti, Miercuri, Joi, Vineri, Sambata, Duminica',
//             nullable: false,
//           },
//           eating_occasions: {
//             type: SchemaType.ARRAY,
//             description: 'Mic Dejun, Gustare, Pranz, Gustare 2, Cina',
//             items: {
//               type: SchemaType.OBJECT,
//               properties: {
//                 name: {
//                   type: SchemaType.STRING,
//                   description: 'Numele mesei',
//                   nullable: false,
//                 },
//                 ingredients: {
//                   type: SchemaType.ARRAY,
//                   description: `Lista ingredientelor individuale pentru masă.
//                     - Fiecare ingredient trebuie listat separat cu propriile valori nutritionale
//                     - Nu combina mai multe ingrediente într-unul singur
//                     - Pentru mesele principale include surse de proteină
//                     - Daca o masa are 0%, nu adauga niciun ingredient in array. Las-o goala - [];
//                     - Cantitățile să fie în grame sau mililitri (nu în bucăți)
//                     - Exemplu corect: "250g omletă" nu "omletă din 3 ouă"`,
//                   items: {
//                     type: SchemaType.OBJECT,
//                     properties: {
//                       name: {
//                         type: SchemaType.STRING,
//                         description: 'Numele ingredientului',
//                         nullable: false,
//                       },
//                       quantity: {
//                         type: SchemaType.STRING,
//                         description: 'Cantitatea în grame, doar numărul',
//                         pattern: '^[0-9]+$',
//                         nullable: false,
//                       },
//                       calories: {
//                         type: SchemaType.STRING,
//                         description:
//                           'Caloriile pentru cantitatea specificată, doar numărul',
//                         pattern: '^[0-9]+$',
//                         nullable: false,
//                       },
//                       proteins: {
//                         type: SchemaType.STRING,
//                         description:
//                           'Conținutul de proteine bazat pe cantitatea specificată, doar numărul',
//                         pattern: '^[0-9]+$',
//                         nullable: false,
//                       },
//                       lipids: {
//                         type: SchemaType.STRING,
//                         description:
//                           'Conținutul de grăsimi bazat pe cantitatea specificată, doar numărul',
//                         pattern: '^[0-9]+$',
//                         nullable: false,
//                       },
//                       carbohydrates: {
//                         type: SchemaType.STRING,
//                         description:
//                           'Conținutul de carbohidrați bazat pe cantitatea specificată, doar numărul',
//                         pattern: '^[0-9]+$',
//                         nullable: false,
//                       },
//                       fibers: {
//                         type: SchemaType.STRING,
//                         description:
//                           'Conținutul de fibre bazat pe cantitatea specificată, doar numărul',
//                         pattern: '^[0-9]+$',
//                         nullable: false,
//                       },
//                     },
//                     required: [
//                       'name',
//                       'quantity',
//                       'calories',
//                       'proteins',
//                       'lipids',
//                       'carbohydrates',
//                       'fibers',
//                     ],
//                   },
//                 },
//               },
//               required: ['name', 'ingredients'],
//             },
//           },
//         },
//         required: ['name', 'eating_occasions'],
//       },
//     },
//   },
//   required: ['days'],
// };
