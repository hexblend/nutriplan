export const insertShoppingItems = async (
  supabase: any,
  shoppingListId: string,
  items: any[]
) => {
  const shoppingListItems = items.map((item) => ({
    ...item,
    shopping_list_id: shoppingListId,
  }));

  const { error } = await supabase
    .from('shopping_list_items')
    .insert(shoppingListItems);

  if (error) throw error;
};

export const findShoppingList = async (supabase: any, planId: string) => {
  const { data: shoppingList, error: shoppingListError } = await supabase
    .from('shopping_lists')
    .select('id')
    .eq('food_plan_id', planId)
    .single();
  if (shoppingListError) throw shoppingListError;
  return shoppingList;
};

export const deleteExistingShoppingListItems = async (
  supabase: any,
  shoppingListId: string
) => {
  const { error: deleteError } = await supabase
    .from('shopping_list_items')
    .delete()
    .eq('shopping_list_id', shoppingListId);
  if (deleteError) throw deleteError;
};

export const updateFoodPlanStatus = async (supabase: any, planId: string) => {
  const { error: updateError } = await supabase
    .from('food_plans')
    .update({ been_updated: false })
    .eq('id', planId);
  if (updateError) throw updateError;
};
