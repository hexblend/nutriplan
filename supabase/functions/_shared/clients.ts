// @ts-ignore -- Module not found errors
import Anthropic from '@anthropic-ai/sdk';
// @ts-ignore -- Module not found errors
import { GoogleGenerativeAI } from '@google/generative-ai';
import { createClient } from '@supabase/supabase-js';
// @ts-ignore -- Module not found errors
import OpenAI from 'openai';

// Declare Deno namespace for use in Supabase Edge Functions
declare const Deno: {
  env: {
    // eslint-disable-next-line no-unused-vars
    get(key: string): string | undefined;
  };
};

export const initClients = () => {
  const supabaseUrl = Deno.env.get('SUPABASE_URL');
  const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY');
  const openaiKey = Deno.env.get('OPENAI_API_KEY');
  const geminiKey = Deno.env.get('GEMINI_API_KEY');
  const claudeKey = Deno.env.get('CLAUDE_API_KEY');

  if (!supabaseUrl || !supabaseKey || !openaiKey || !geminiKey || !claudeKey) {
    console.log('Supbase URL:', supabaseUrl);
    console.log('Supabase ANON KEY:', supabaseKey);
    console.log('OpenAI Key:', openaiKey);
    console.log('Gemini Key:', geminiKey);
    console.log('Claude Key:', claudeKey);
    throw new Error('Missing environment variables');
  }
  return {
    supabase: createClient(supabaseUrl, supabaseKey),
    openai: new OpenAI({ apiKey: openaiKey }),
    genAI: new GoogleGenerativeAI(geminiKey),
    anthropic: new Anthropic({ apiKey: claudeKey }),
  };
};
