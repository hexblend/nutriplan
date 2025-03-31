// @ts-expect-error-next-line
import { parse } from 'https://deno.land/std@0.210.0/csv/mod.ts';

// Global fetch that's available in Deno runtime
declare const fetch: typeof globalThis.fetch;

/**
 * Insert AI ingredients into DB
 */
export const insertIngredients = async (
  supabase: any,
  aiResponse: any,
  dbDays: any[]
) => {
  console.log('Starting to add ingredients...');
  await Promise.all(
    aiResponse.days.map(async (aiDay: any) => {
      const foundDBDay = dbDays.find(
        (dbDay: any) => aiDay.name.toLowerCase() === dbDay.name.toLowerCase()
      );

      if (foundDBDay) {
        await Promise.all(
          await aiDay.eating_occasions.map(async (aiOccasion: any) => {
            const foundDBOccasion = foundDBDay.eating_occasions.find(
              (dbOccasion: any) =>
                aiOccasion.name.toLowerCase() === dbOccasion.name.toLowerCase()
            );

            if (foundDBOccasion) {
              const ingredientsToBeAdded = aiOccasion.ingredients.map(
                (ingredient: any) => ({
                  ...ingredient,
                  eating_occasion_id: foundDBOccasion.id,
                })
              );

              const { error } = await supabase
                .from('ingredients')
                .insert(ingredientsToBeAdded);

              if (error) {
                console.error('Could not add ingredients', error);
              }
            }
          })
        );
      }
    })
  );
  console.log('Added all ingredinets.');
};

/**
 * Update Food Plan After insertion
 */
export const updateFoodPlan = async (supabase: any, planId: string) => {
  const { error: updateError } = await supabase
    .from('food_plans')
    .update({ been_updated: true, been_generated: true })
    .eq('id', planId);
  if (updateError) throw updateError;
};

/**
 * Get all local ingredients
 */
export async function getLocalIngredients() {
  const PUBLIC_CSV_URL =
    'https://bgefmqefmboheirzxqvu.supabase.co/storage/v1/object/public/marketing/alimente.csv';

  try {
    const response = await fetch(PUBLIC_CSV_URL);
    const csvContent = await response.text();
    const records = await parse(csvContent, {
      skipFirstRow: false,
      columns: [
        'name',
        'calories',
        'proteins',
        'lipids',
        'carbohydrates',
        'fibers',
        'notes',
        'category',
      ],
    });
    console.log('Number of ingredients:', records.length);
    return records;
  } catch (error) {
    console.error('CSV parsing error:', error);
    throw error;
  }
}
