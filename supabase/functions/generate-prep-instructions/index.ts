import { initClients } from '../_shared/clients.ts';
// @ts-expect-error-next-line
import { serve } from 'std/http/server';
import { z } from 'zod';
import { corsHeaders } from '../_shared/cors.ts';
import { generatePrepInstructions } from './generate-prep-instructions-ai.ts';

const PrepInstructionsSchema = z.object({
  prompt: z.any(),
  eatingOccasionId: z.string(),
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
    const { prompt, eatingOccasionId } = PrepInstructionsSchema.parse(body);
    console.log(eatingOccasionId);

    const { supabase, genAI } = initClients();

    const response = await generatePrepInstructions(genAI, prompt);
    const stringifyResponse = JSON.stringify({ response });

    const { error: updateError } = await supabase
      .from('eating_occasions')
      .update({ been_updated: false, prep_instructions: stringifyResponse })
      .eq('id', eatingOccasionId);
    if (updateError) throw updateError;

    return new Response(stringifyResponse, {
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

// example response
// <div>
//     <h2>Pui la gratar cu orez brun si broccoli</h2>
//     <h3>Pregătire</h3>
//     <ol>
//         <li>Spală 100g de broccoli sub apă rece. (5 minute)</li>
//         <li>Taie broccoli în buchețele mici. (5 minute)</li>
//         <li>Spală 100g de orez brun sub apă rece. (3 minute)</li>
//     </ol>
//     <h3>Gătire</h3>
//     <ol>
//         <li>Fierbe 500ml de apă într-o oală. (10 minute)</li>
//         <li>Adaugă 100g de orez brun în apă clocotită. (1 minut)</li>
//         <li>Reduce căldura la mediu și acoperă oala. Gătește orezul timp de 30 de minute.</li>
//         <li>Într-o altă oală, adaugă buchețelele de broccoli. Fierbe timp de 5 minute. (5 minute)</li>
//         <li>Între timp, pregătește 150g de pui la grătar pe o tigaie. Gătește timp de 7 minute pe fiecare parte. (14 minute)</li>
//     </ol>
// </div>
