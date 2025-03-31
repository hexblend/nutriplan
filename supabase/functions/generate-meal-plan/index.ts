// @ts-expect-error-next-line
import { serve } from 'std/http/server';
import { z } from 'zod';
import { initClients } from '../_shared/clients.ts';
import { corsHeaders } from '../_shared/cors.ts';
import { generateMealPlan } from './generate-meal-plan-ai.ts';
import { insertIngredients, updateFoodPlan } from './generate-meal-plan-db.ts';
import { generateFoodPlanSchema } from './generate-meal-plan-types.ts';

export const MealPlanSchema = z.object({
  prompt: generateFoodPlanSchema,
  planId: z.string(),
});

/*
 * MAIN FUNCTION
 */
serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    console.log('Received new request');
    const body = await req.json();
    const { planId, prompt } = MealPlanSchema.parse(body);

    const { supabase, anthropic } = initClients(); // Note: using genAI instead of openai

    const aiResponse = await generateMealPlan(anthropic, prompt);

    const { data: dbDays, error: dbDaysError } = await supabase
      .from('days')
      .select(`id, name, eating_occasions (id, name)`)
      .eq('food_plan_id', planId);

    if (dbDaysError) throw dbDaysError;

    await insertIngredients(supabase, aiResponse, dbDays);

    await updateFoodPlan(supabase, planId);

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    });
  }
});

// Example response for testing
// export const exampleResponse = {
//   days: [
//     {
//       name: 'Luni',
//       eating_occasions: [
//         {
//           name: 'Mic dejun',
//           ingredients: [
//             {
//               name: 'Orez',
//               quantity: 100,
//               calories: 130,
//               proteins: 2.7,
//               lipids: 0.3,
//               carbohydrates: 28.7,
//               fibers: 0.4,
//             },
//             {
//               name: 'Ou',
//               quantity: 50,
//               calories: 72,
//               proteins: 6.3,
//               lipids: 5,
//               carbohydrates: 0.6,
//               fibers: 0,
//             },
//           ],
//         },
//         {
//           name: 'Gustare',
//           ingredients: [
//             {
//               name: 'Măr',
//               quantity: 150,
//               calories: 81,
//               proteins: 0.4,
//               lipids: 0.3,
//               carbohydrates: 22.2,
//               fibers: 3.6,
//             },
//           ],
//         },
//         {
//           name: 'Pranz',
//           ingredients: [
//             {
//               name: 'Pui la grătar',
//               quantity: 150,
//               calories: 165,
//               proteins: 31.5,
//               lipids: 3.6,
//               carbohydrates: 0,
//               fibers: 0,
//             },
//             {
//               name: 'Legume mixte',
//               quantity: 200,
//               calories: 70,
//               proteins: 3,
//               lipids: 0.5,
//               carbohydrates: 15,
//               fibers: 5,
//             },
//           ],
//         },
//         {
//           name: 'Gustare 2',
//           ingredients: [
//             {
//               name: 'Iaurt',
//               quantity: 150,
//               calories: 90,
//               proteins: 9,
//               lipids: 4.5,
//               carbohydrates: 6,
//               fibers: 0,
//             },
//           ],
//         },
//         {
//           name: 'Cina',
//           ingredients: [
//             {
//               name: 'Pește',
//               quantity: 150,
//               calories: 150,
//               proteins: 30,
//               lipids: 5,
//               carbohydrates: 0,
//               fibers: 0,
//             },
//             {
//               name: 'Salată verde',
//               quantity: 100,
//               calories: 14,
//               proteins: 1,
//               lipids: 0.2,
//               carbohydrates: 2.9,
//               fibers: 1,
//             },
//           ],
//         },
//       ],
//     },
//     {
//       name: 'Marti',
//       eating_occasions: [
//         {
//           name: 'Mic dejun',
//           ingredients: [
//             {
//               name: 'Fulgi de ovăz',
//               quantity: 100,
//               calories: 389,
//               proteins: 16.9,
//               lipids: 6.9,
//               carbohydrates: 66.3,
//               fibers: 10.6,
//             },
//             {
//               name: 'Banana',
//               quantity: 100,
//               calories: 89,
//               proteins: 1.1,
//               lipids: 0.3,
//               carbohydrates: 23,
//               fibers: 2.6,
//             },
//           ],
//         },
//         {
//           name: 'Gustare',
//           ingredients: [
//             {
//               name: 'Nuci',
//               quantity: 30,
//               calories: 200,
//               proteins: 4.5,
//               lipids: 20,
//               carbohydrates: 4,
//               fibers: 2,
//             },
//           ],
//         },
//         {
//           name: 'Pranz',
//           ingredients: [
//             {
//               name: 'Carne de vită',
//               quantity: 150,
//               calories: 250,
//               proteins: 26,
//               lipids: 17,
//               carbohydrates: 0,
//               fibers: 0,
//             },
//             {
//               name: 'Orez',
//               quantity: 100,
//               calories: 130,
//               proteins: 2.7,
//               lipids: 0.3,
//               carbohydrates: 28.7,
//               fibers: 0.4,
//             },
//           ],
//         },
//         {
//           name: 'Gustare 2',
//           ingredients: [
//             {
//               name: 'Morcov',
//               quantity: 100,
//               calories: 41,
//               proteins: 0.9,
//               lipids: 0.2,
//               carbohydrates: 9.6,
//               fibers: 2.8,
//             },
//           ],
//         },
//         {
//           name: 'Cina',
//           ingredients: [
//             {
//               name: 'Pui la cuptor',
//               quantity: 150,
//               calories: 165,
//               proteins: 31.5,
//               lipids: 3.6,
//               carbohydrates: 0,
//               fibers: 0,
//             },
//             {
//               name: 'Broccoli',
//               quantity: 100,
//               calories: 34,
//               proteins: 2.4,
//               lipids: 0.4,
//               carbohydrates: 7,
//               fibers: 2.6,
//             },
//           ],
//         },
//       ],
//     },
//   ],
// };
