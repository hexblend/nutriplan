import { initClients } from '../_shared/clients.ts';
// @ts-expect-error-next-line
import { serve } from 'std/http/server';
import { z } from 'zod';
import { corsHeaders } from '../_shared/cors.ts';
import { generateShoppingList } from './generate-shopping-list-ai.ts';
import {
  deleteExistingShoppingListItems,
  findShoppingList,
  insertShoppingItems,
  updateFoodPlanStatus,
} from './generate-shopping-list-db.ts';

const ShoppingListSchema = z.object({
  prompt: z.array(z.any()),
  planId: z.string(),
});

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }
  try {
    const body = await req.json();
    const { planId, prompt } = ShoppingListSchema.parse(body);

    const { supabase, genAI } = initClients(); // Changed from openai to genAI

    const shoppingList = await findShoppingList(supabase, planId);

    if (shoppingList) {
      await deleteExistingShoppingListItems(supabase, shoppingList.id);
    }

    const aiResponse = await generateShoppingList(genAI, prompt);

    await insertShoppingItems(supabase, shoppingList.id, aiResponse);

    await updateFoodPlanStatus(supabase, planId);

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({
        error: 'Error processing request',
        details: error.message,
        type: error.name,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: error.status || 500,
      }
    );
  }
});
