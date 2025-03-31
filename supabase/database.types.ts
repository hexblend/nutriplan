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
      clients: {
        Row: {
          activity_level: string | null;
          age: number | null;
          biggest_challenge: string | null;
          breakfast_percentage: string | null;
          calories: number | null;
          carbohydrates: string | null;
          cooking_equipment: string | null;
          created_at: string;
          dinner_percentage: string | null;
          disliked_food: string | null;
          favourite_food: string | null;
          first_name: string;
          food_restrictions: string | null;
          goal: string | null;
          height: string | null;
          id: string;
          last_name: string;
          lipids: string | null;
          lunch_percentage: string | null;
          proteins: string | null;
          sex: string | null;
          snacks_percentage: string | null;
          target_activity: string | null;
          target_condition: string | null;
          target_maintenance: string | null;
          target_sport: string | null;
          target_weight: string | null;
          tried_before: string | null;
          user_id: string;
          weight: string | null;
        };
        Insert: {
          activity_level?: string | null;
          age?: number | null;
          biggest_challenge?: string | null;
          breakfast_percentage?: string | null;
          calories?: number | null;
          carbohydrates?: string | null;
          cooking_equipment?: string | null;
          created_at?: string;
          dinner_percentage?: string | null;
          disliked_food?: string | null;
          favourite_food?: string | null;
          first_name: string;
          food_restrictions?: string | null;
          goal?: string | null;
          height?: string | null;
          id?: string;
          last_name: string;
          lipids?: string | null;
          lunch_percentage?: string | null;
          proteins?: string | null;
          sex?: string | null;
          snacks_percentage?: string | null;
          target_activity?: string | null;
          target_condition?: string | null;
          target_maintenance?: string | null;
          target_sport?: string | null;
          target_weight?: string | null;
          tried_before?: string | null;
          user_id?: string;
          weight?: string | null;
        };
        Update: {
          activity_level?: string | null;
          age?: number | null;
          biggest_challenge?: string | null;
          breakfast_percentage?: string | null;
          calories?: number | null;
          carbohydrates?: string | null;
          cooking_equipment?: string | null;
          created_at?: string;
          dinner_percentage?: string | null;
          disliked_food?: string | null;
          favourite_food?: string | null;
          first_name?: string;
          food_restrictions?: string | null;
          goal?: string | null;
          height?: string | null;
          id?: string;
          last_name?: string;
          lipids?: string | null;
          lunch_percentage?: string | null;
          proteins?: string | null;
          sex?: string | null;
          snacks_percentage?: string | null;
          target_activity?: string | null;
          target_condition?: string | null;
          target_maintenance?: string | null;
          target_sport?: string | null;
          target_weight?: string | null;
          tried_before?: string | null;
          user_id?: string;
          weight?: string | null;
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
          updated_at: string | null;
        };
        Insert: {
          address?: string | null;
          city?: string | null;
          company_name?: string | null;
          country?: string | null;
          cui?: string | null;
          email?: string | null;
          first_name?: string | null;
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
          updated_at?: string | null;
        };
        Update: {
          address?: string | null;
          city?: string | null;
          company_name?: string | null;
          country?: string | null;
          cui?: string | null;
          email?: string | null;
          first_name?: string | null;
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
          updated_at?: string | null;
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
      binary_quantize:
        | {
            Args: {
              '': string;
            };
            Returns: unknown;
          }
        | {
            Args: {
              '': unknown;
            };
            Returns: unknown;
          };
      generate_short_id: {
        Args: {
          size?: number;
        };
        Returns: string;
      };
      get_distinct_ingredients: {
        Args: {
          search_query: string;
        };
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
        Args: {
          '': number[];
        };
        Returns: unknown;
      };
      halfvec_out: {
        Args: {
          '': unknown;
        };
        Returns: unknown;
      };
      halfvec_send: {
        Args: {
          '': unknown;
        };
        Returns: string;
      };
      halfvec_typmod_in: {
        Args: {
          '': unknown[];
        };
        Returns: number;
      };
      hnsw_bit_support: {
        Args: {
          '': unknown;
        };
        Returns: unknown;
      };
      hnsw_halfvec_support: {
        Args: {
          '': unknown;
        };
        Returns: unknown;
      };
      hnsw_sparsevec_support: {
        Args: {
          '': unknown;
        };
        Returns: unknown;
      };
      hnswhandler: {
        Args: {
          '': unknown;
        };
        Returns: unknown;
      };
      ivfflat_bit_support: {
        Args: {
          '': unknown;
        };
        Returns: unknown;
      };
      ivfflat_halfvec_support: {
        Args: {
          '': unknown;
        };
        Returns: unknown;
      };
      ivfflathandler: {
        Args: {
          '': unknown;
        };
        Returns: unknown;
      };
      l2_norm:
        | {
            Args: {
              '': unknown;
            };
            Returns: number;
          }
        | {
            Args: {
              '': unknown;
            };
            Returns: number;
          };
      l2_normalize:
        | {
            Args: {
              '': string;
            };
            Returns: string;
          }
        | {
            Args: {
              '': unknown;
            };
            Returns: unknown;
          }
        | {
            Args: {
              '': unknown;
            };
            Returns: unknown;
          };
      sparsevec_out: {
        Args: {
          '': unknown;
        };
        Returns: unknown;
      };
      sparsevec_send: {
        Args: {
          '': unknown;
        };
        Returns: string;
      };
      sparsevec_typmod_in: {
        Args: {
          '': unknown[];
        };
        Returns: number;
      };
      vector_avg: {
        Args: {
          '': number[];
        };
        Returns: string;
      };
      vector_dims:
        | {
            Args: {
              '': string;
            };
            Returns: number;
          }
        | {
            Args: {
              '': unknown;
            };
            Returns: number;
          };
      vector_norm: {
        Args: {
          '': string;
        };
        Returns: number;
      };
      vector_out: {
        Args: {
          '': string;
        };
        Returns: unknown;
      };
      vector_send: {
        Args: {
          '': string;
        };
        Returns: string;
      };
      vector_typmod_in: {
        Args: {
          '': unknown[];
        };
        Returns: number;
      };
    };
    Enums: {
      subscription_type: 'free' | 'start' | 'plus' | 'pro' | 'elite' | 'max';
      user_role: 'admin' | 'user';
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, 'public'>];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema['Tables'] & PublicSchema['Views'])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] &
        PublicSchema['Views'])
    ? (PublicSchema['Tables'] &
        PublicSchema['Views'])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema['Enums']
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
    ? PublicSchema['Enums'][PublicEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema['CompositeTypes']
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema['CompositeTypes']
    ? PublicSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
    : never;
