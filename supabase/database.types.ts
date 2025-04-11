export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      client_updates: {
        Row: {
          client_id: string;
          date: string;
          field: string;
          id: string;
          value: string;
        };
        Insert: {
          client_id: string;
          date?: string;
          field: string;
          id?: string;
          value: string;
        };
        Update: {
          client_id?: string;
          date?: string;
          field?: string;
          id?: string;
          value?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'client_updates_client_id_fkey';
            columns: ['client_id'];
            isOneToOne: false;
            referencedRelation: 'clients';
            referencedColumns: ['id'];
          },
        ];
      };
      clients: {
        Row: {
          activity_level: string | null;
          age: number | null;
          biggest_challenge: string | null;
          breakfast_percentage: string | null;
          calories: number | null;
          carbohydrates_percentage: number | null;
          cooking_equipment: string | null;
          created_at: string;
          daily_meals: string | null;
          dinner_percentage: string | null;
          disliked_food: string | null;
          favourite_food: string | null;
          first_name: string;
          food_restrictions: string | null;
          goal: string | null;
          height_cm: number | null;
          id: string;
          last_name: string;
          lipids_percentage: number | null;
          lunch_percentage: string | null;
          proteins_percentage: number | null;
          sex: string | null;
          snacks_percentage: string | null;
          target_activity: string | null;
          target_condition: string | null;
          target_maintenance: string | null;
          target_sport: string | null;
          target_weight_kg: number | null;
          tried_before: string | null;
          user_id: string;
          weight_kg: number | null;
          workout_days: string | null;
        };
        Insert: {
          activity_level?: string | null;
          age?: number | null;
          biggest_challenge?: string | null;
          breakfast_percentage?: string | null;
          calories?: number | null;
          carbohydrates_percentage?: number | null;
          cooking_equipment?: string | null;
          created_at?: string;
          daily_meals?: string | null;
          dinner_percentage?: string | null;
          disliked_food?: string | null;
          favourite_food?: string | null;
          first_name: string;
          food_restrictions?: string | null;
          goal?: string | null;
          height_cm?: number | null;
          id?: string;
          last_name: string;
          lipids_percentage?: number | null;
          lunch_percentage?: string | null;
          proteins_percentage?: number | null;
          sex?: string | null;
          snacks_percentage?: string | null;
          target_activity?: string | null;
          target_condition?: string | null;
          target_maintenance?: string | null;
          target_sport?: string | null;
          target_weight_kg?: number | null;
          tried_before?: string | null;
          user_id?: string;
          weight_kg?: number | null;
          workout_days?: string | null;
        };
        Update: {
          activity_level?: string | null;
          age?: number | null;
          biggest_challenge?: string | null;
          breakfast_percentage?: string | null;
          calories?: number | null;
          carbohydrates_percentage?: number | null;
          cooking_equipment?: string | null;
          created_at?: string;
          daily_meals?: string | null;
          dinner_percentage?: string | null;
          disliked_food?: string | null;
          favourite_food?: string | null;
          first_name?: string;
          food_restrictions?: string | null;
          goal?: string | null;
          height_cm?: number | null;
          id?: string;
          last_name?: string;
          lipids_percentage?: number | null;
          lunch_percentage?: string | null;
          proteins_percentage?: number | null;
          sex?: string | null;
          snacks_percentage?: string | null;
          target_activity?: string | null;
          target_condition?: string | null;
          target_maintenance?: string | null;
          target_sport?: string | null;
          target_weight_kg?: number | null;
          tried_before?: string | null;
          user_id?: string;
          weight_kg?: number | null;
          workout_days?: string | null;
        };
        Relationships: [];
      };
      days: {
        Row: {
          created_at: string;
          food_plan_id: string;
          id: string;
          name: string;
        };
        Insert: {
          created_at?: string;
          food_plan_id: string;
          id?: string;
          name: string;
        };
        Update: {
          created_at?: string;
          food_plan_id?: string;
          id?: string;
          name?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'days_food_plan_id_fkey';
            columns: ['food_plan_id'];
            isOneToOne: false;
            referencedRelation: 'food_plans';
            referencedColumns: ['id'];
          },
        ];
      };
      eating_occasions: {
        Row: {
          been_updated: boolean;
          created_at: string;
          day_id: string;
          id: string;
          name: string;
          prep_instructions: string | null;
        };
        Insert: {
          been_updated?: boolean;
          created_at?: string;
          day_id: string;
          id?: string;
          name: string;
          prep_instructions?: string | null;
        };
        Update: {
          been_updated?: boolean;
          created_at?: string;
          day_id?: string;
          id?: string;
          name?: string;
          prep_instructions?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'eating_occasions_day_id_fkey';
            columns: ['day_id'];
            isOneToOne: false;
            referencedRelation: 'days';
            referencedColumns: ['id'];
          },
        ];
      };
      food_plans: {
        Row: {
          been_generated: boolean;
          been_updated: boolean;
          client_id: string;
          created_at: string;
          end_date: string;
          id: string;
          start_date: string;
          title: string | null;
        };
        Insert: {
          been_generated?: boolean;
          been_updated?: boolean;
          client_id: string;
          created_at?: string;
          end_date: string;
          id?: string;
          start_date: string;
          title?: string | null;
        };
        Update: {
          been_generated?: boolean;
          been_updated?: boolean;
          client_id?: string;
          created_at?: string;
          end_date?: string;
          id?: string;
          start_date?: string;
          title?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'food_plans_client_id_fkey';
            columns: ['client_id'];
            isOneToOne: false;
            referencedRelation: 'clients';
            referencedColumns: ['id'];
          },
        ];
      };
      ingredients: {
        Row: {
          calories: number | null;
          carbohydrates: number | null;
          category: string | null;
          created_at: string;
          eating_occasion_id: string;
          fibers: number | null;
          id: string;
          lipids: number | null;
          name: string;
          notes: string | null;
          order: number | null;
          proteins: number | null;
          quantity: string | null;
        };
        Insert: {
          calories?: number | null;
          carbohydrates?: number | null;
          category?: string | null;
          created_at?: string;
          eating_occasion_id: string;
          fibers?: number | null;
          id?: string;
          lipids?: number | null;
          name: string;
          notes?: string | null;
          order?: number | null;
          proteins?: number | null;
          quantity?: string | null;
        };
        Update: {
          calories?: number | null;
          carbohydrates?: number | null;
          category?: string | null;
          created_at?: string;
          eating_occasion_id?: string;
          fibers?: number | null;
          id?: string;
          lipids?: number | null;
          name?: string;
          notes?: string | null;
          order?: number | null;
          proteins?: number | null;
          quantity?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'ingredients_eating_occasion_id_fkey';
            columns: ['eating_occasion_id'];
            isOneToOne: false;
            referencedRelation: 'eating_occasions';
            referencedColumns: ['id'];
          },
        ];
      };
      local_ingredients: {
        Row: {
          calories: number;
          carbohydrates: number;
          category: string | null;
          created_at: string;
          fibers: number;
          id: string;
          lipids: number;
          name: string;
          notes: string | null;
          proteins: number;
        };
        Insert: {
          calories?: number;
          carbohydrates?: number;
          category?: string | null;
          created_at?: string;
          fibers?: number;
          id?: string;
          lipids?: number;
          name: string;
          notes?: string | null;
          proteins?: number;
        };
        Update: {
          calories?: number;
          carbohydrates?: number;
          category?: string | null;
          created_at?: string;
          fibers?: number;
          id?: string;
          lipids?: number;
          name?: string;
          notes?: string | null;
          proteins?: number;
        };
        Relationships: [];
      };
      profiles: {
        Row: {
          address: string | null;
          city: string | null;
          company_name: string | null;
          country: string | null;
          cui: string | null;
          email: string | null;
          first_name: string | null;
          height_unit: Database['public']['Enums']['unit_type'] | null;
          id: string;
          last_name: string | null;
          phone: string | null;
          reg_com: string | null;
          role: Database['public']['Enums']['user_role'];
          startco_company_id: string | null;
          startco_id: string | null;
          state: string | null;
          stripe_customer_id: string | null;
          subscription_type: Database['public']['Enums']['subscription_type'];
          updated_app_language: string | null;
          updated_at: string | null;
          weight_unit: Database['public']['Enums']['unit_type'] | null;
        };
        Insert: {
          address?: string | null;
          city?: string | null;
          company_name?: string | null;
          country?: string | null;
          cui?: string | null;
          email?: string | null;
          first_name?: string | null;
          height_unit?: Database['public']['Enums']['unit_type'] | null;
          id: string;
          last_name?: string | null;
          phone?: string | null;
          reg_com?: string | null;
          role?: Database['public']['Enums']['user_role'];
          startco_company_id?: string | null;
          startco_id?: string | null;
          state?: string | null;
          stripe_customer_id?: string | null;
          subscription_type?: Database['public']['Enums']['subscription_type'];
          updated_app_language?: string | null;
          updated_at?: string | null;
          weight_unit?: Database['public']['Enums']['unit_type'] | null;
        };
        Update: {
          address?: string | null;
          city?: string | null;
          company_name?: string | null;
          country?: string | null;
          cui?: string | null;
          email?: string | null;
          first_name?: string | null;
          height_unit?: Database['public']['Enums']['unit_type'] | null;
          id?: string;
          last_name?: string | null;
          phone?: string | null;
          reg_com?: string | null;
          role?: Database['public']['Enums']['user_role'];
          startco_company_id?: string | null;
          startco_id?: string | null;
          state?: string | null;
          stripe_customer_id?: string | null;
          subscription_type?: Database['public']['Enums']['subscription_type'];
          updated_app_language?: string | null;
          updated_at?: string | null;
          weight_unit?: Database['public']['Enums']['unit_type'] | null;
        };
        Relationships: [];
      };
      shopping_list_items: {
        Row: {
          category: string;
          checked: boolean;
          created_at: string;
          id: string;
          name: string;
          quantity: string | null;
          shopping_list_id: string | null;
        };
        Insert: {
          category: string;
          checked?: boolean;
          created_at?: string;
          id?: string;
          name: string;
          quantity?: string | null;
          shopping_list_id?: string | null;
        };
        Update: {
          category?: string;
          checked?: boolean;
          created_at?: string;
          id?: string;
          name?: string;
          quantity?: string | null;
          shopping_list_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'shopping_list_items_shopping_list_id_fkey';
            columns: ['shopping_list_id'];
            isOneToOne: false;
            referencedRelation: 'shopping_lists';
            referencedColumns: ['id'];
          },
        ];
      };
      shopping_lists: {
        Row: {
          created_at: string;
          food_plan_id: string;
          id: string;
        };
        Insert: {
          created_at?: string;
          food_plan_id: string;
          id?: string;
        };
        Update: {
          created_at?: string;
          food_plan_id?: string;
          id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'shopping_lists_food_plan_id_fkey';
            columns: ['food_plan_id'];
            isOneToOne: false;
            referencedRelation: 'food_plans';
            referencedColumns: ['id'];
          },
        ];
      };
      urls: {
        Row: {
          clicks: number;
          client_id: string;
          created_at: string;
          id: string;
          original_url: string;
          short_id: string;
        };
        Insert: {
          clicks?: number;
          client_id: string;
          created_at?: string;
          id?: string;
          original_url: string;
          short_id: string;
        };
        Update: {
          clicks?: number;
          client_id?: string;
          created_at?: string;
          id?: string;
          original_url?: string;
          short_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'urls_client_id_fkey';
            columns: ['client_id'];
            isOneToOne: false;
            referencedRelation: 'clients';
            referencedColumns: ['id'];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      binary_quantize: {
        Args: { '': string } | { '': unknown };
        Returns: unknown;
      };
      generate_short_id: {
        Args: { size?: number };
        Returns: string;
      };
      get_distinct_ingredients: {
        Args: { search_query: string };
        Returns: {
          calories: number;
          carbohydrates: number;
          category: string | null;
          created_at: string;
          fibers: number;
          id: string;
          lipids: number;
          name: string;
          notes: string | null;
          proteins: number;
        }[];
      };
      halfvec_avg: {
        Args: { '': number[] };
        Returns: unknown;
      };
      halfvec_out: {
        Args: { '': unknown };
        Returns: unknown;
      };
      halfvec_send: {
        Args: { '': unknown };
        Returns: string;
      };
      halfvec_typmod_in: {
        Args: { '': unknown[] };
        Returns: number;
      };
      hnsw_bit_support: {
        Args: { '': unknown };
        Returns: unknown;
      };
      hnsw_halfvec_support: {
        Args: { '': unknown };
        Returns: unknown;
      };
      hnsw_sparsevec_support: {
        Args: { '': unknown };
        Returns: unknown;
      };
      hnswhandler: {
        Args: { '': unknown };
        Returns: unknown;
      };
      ivfflat_bit_support: {
        Args: { '': unknown };
        Returns: unknown;
      };
      ivfflat_halfvec_support: {
        Args: { '': unknown };
        Returns: unknown;
      };
      ivfflathandler: {
        Args: { '': unknown };
        Returns: unknown;
      };
      l2_norm: {
        Args: { '': unknown } | { '': unknown };
        Returns: number;
      };
      l2_normalize: {
        Args: { '': string } | { '': unknown } | { '': unknown };
        Returns: string;
      };
      sparsevec_out: {
        Args: { '': unknown };
        Returns: unknown;
      };
      sparsevec_send: {
        Args: { '': unknown };
        Returns: string;
      };
      sparsevec_typmod_in: {
        Args: { '': unknown[] };
        Returns: number;
      };
      vector_avg: {
        Args: { '': number[] };
        Returns: string;
      };
      vector_dims: {
        Args: { '': string } | { '': unknown };
        Returns: number;
      };
      vector_norm: {
        Args: { '': string };
        Returns: number;
      };
      vector_out: {
        Args: { '': string };
        Returns: unknown;
      };
      vector_send: {
        Args: { '': string };
        Returns: string;
      };
      vector_typmod_in: {
        Args: { '': unknown[] };
        Returns: number;
      };
    };
    Enums: {
      subscription_type: 'free' | 'start' | 'plus' | 'pro' | 'elite' | 'max';
      unit_type: 'metric' | 'imperial';
      user_role: 'admin' | 'user';
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DefaultSchema = Database[Extract<keyof Database, 'public'>];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
        Database[DefaultSchemaTableNameOrOptions['schema']]['Views'])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
      Database[DefaultSchemaTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema['Tables'] &
        DefaultSchema['Views'])
    ? (DefaultSchema['Tables'] &
        DefaultSchema['Views'])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema['Enums']
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions['schema']]['Enums'][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums']
    ? DefaultSchema['Enums'][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema['CompositeTypes']
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema['CompositeTypes']
    ? DefaultSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  public: {
    Enums: {
      subscription_type: ['free', 'start', 'plus', 'pro', 'elite', 'max'],
      unit_type: ['metric', 'imperial'],
      user_role: ['admin', 'user'],
    },
  },
} as const;
