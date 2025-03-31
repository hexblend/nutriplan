

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;


CREATE EXTENSION IF NOT EXISTS "pg_net" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgsodium" WITH SCHEMA "pgsodium";






COMMENT ON SCHEMA "public" IS 'standard public schema';



CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";






CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgjwt" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";






CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";






CREATE TYPE "public"."subscription_type" AS ENUM (
    'free',
    'start',
    'plus',
    'pro',
    'elite',
    'max'
);


ALTER TYPE "public"."subscription_type" OWNER TO "postgres";


CREATE TYPE "public"."user_role" AS ENUM (
    'admin',
    'user'
);


ALTER TYPE "public"."user_role" OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."after_food_plan_insert"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$DECLARE
    day_names TEXT[] := ARRAY['Luni', 'Marti', 'Miercuri', 'Joi', 'Vineri', 'Sambata', 'Duminica'];
    eating_occasion_names TEXT[] := ARRAY['Mic dejun', 'Gustare', 'Pranz', 'Gustare 2', 'Cina'];
    day_id TEXT;
    day_name TEXT;
    occasion_name TEXT;
BEGIN
    -- Insert 7 days for the new food plan
    FOREACH day_name IN ARRAY day_names
    LOOP
        INSERT INTO public.days (name, food_plan_id)
        VALUES (day_name, NEW.id)
        RETURNING id INTO day_id;

        -- Insert 5 eating occasions for each day
        FOREACH occasion_name IN ARRAY eating_occasion_names
        LOOP
            INSERT INTO public.eating_occasions (name, day_id)
            VALUES (occasion_name, day_id);
        END LOOP;
    END LOOP;

    -- Insert a record in shopping_lists for the new food plan
    INSERT INTO public.shopping_lists (food_plan_id, created_at)
    VALUES (NEW.id, NOW());

    RETURN NEW;
END;$$;


ALTER FUNCTION "public"."after_food_plan_insert"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."generate_short_id"("size" integer DEFAULT 11) RETURNS "text"
    LANGUAGE "plpgsql"
    AS $$
DECLARE
  chars TEXT := 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  result TEXT := '';
  i INT := 0;
BEGIN
  IF size < 0 THEN
    RAISE EXCEPTION 'Size must be positive';
  END IF;
  WHILE i < size LOOP
    result := result || substr(chars, floor(random() * length(chars) + 1)::integer, 1);
    i := i + 1;
  END LOOP;
  RETURN result;
END;
$$;


ALTER FUNCTION "public"."generate_short_id"("size" integer) OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."get_distinct_ingredients"("search_query" "text") RETURNS TABLE("name" "text", "id" "text")
    LANGUAGE "sql"
    AS $$
SELECT distinct on (lower(name)) name, id 
FROM ingredients 
WHERE name ILIKE '%' || search_query || '%'
ORDER BY lower(name)
LIMIT 2;
$$;


ALTER FUNCTION "public"."get_distinct_ingredients"("search_query" "text") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."handle_new_user"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    SET "search_path" TO ''
    AS $$begin
  insert into public.profiles (id, first_name, last_name, email, phone)
  values (
    new.id, 
    new.raw_user_meta_data ->> 'first_name', 
    new.raw_user_meta_data ->> 'last_name',
    new.email,
    new.raw_user_meta_data ->> 'phone'
  );
  return new;
end;$$;


ALTER FUNCTION "public"."handle_new_user"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."set_new_ingredient_order"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
BEGIN
  NEW.order = (
    SELECT COALESCE(MAX("order"), 0) + 1
    FROM ingredients
    WHERE eating_occasion_id = NEW.eating_occasion_id
  );
  RETURN NEW;
END;
$$;


ALTER FUNCTION "public"."set_new_ingredient_order"() OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";


CREATE TABLE IF NOT EXISTS "public"."clients" (
    "id" "text" DEFAULT "public"."generate_short_id"() NOT NULL,
    "first_name" character varying NOT NULL,
    "last_name" character varying NOT NULL,
    "user_id" "uuid" DEFAULT "auth"."uid"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "color" character varying
);


ALTER TABLE "public"."clients" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."days" (
    "id" "text" DEFAULT "public"."generate_short_id"() NOT NULL,
    "name" character varying NOT NULL,
    "food_plan_id" "text" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."days" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."eating_occasions" (
    "name" character varying NOT NULL,
    "day_id" "text" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "id" "text" DEFAULT "public"."generate_short_id"() NOT NULL,
    "been_updated" boolean DEFAULT false NOT NULL,
    "prep_instructions" "text"
);


ALTER TABLE "public"."eating_occasions" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."food_plans" (
    "id" "text" DEFAULT "public"."generate_short_id"() NOT NULL,
    "start_date" timestamp with time zone NOT NULL,
    "end_date" timestamp with time zone NOT NULL,
    "client_id" "text" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "been_updated" boolean DEFAULT false NOT NULL,
    "title" "text",
    "been_generated" boolean DEFAULT false NOT NULL
);


ALTER TABLE "public"."food_plans" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."ingredients" (
    "id" "text" DEFAULT "public"."generate_short_id"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "name" character varying NOT NULL,
    "quantity" character varying,
    "eating_occasion_id" "text" NOT NULL,
    "order" integer
);


ALTER TABLE "public"."ingredients" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."profiles" (
    "id" "uuid" NOT NULL,
    "updated_at" timestamp with time zone DEFAULT ("now"() AT TIME ZONE 'utc'::"text"),
    "first_name" character varying,
    "last_name" character varying,
    "role" "public"."user_role" DEFAULT 'user'::"public"."user_role" NOT NULL,
    "stripe_customer_id" character varying,
    "email" character varying DEFAULT ''::character varying,
    "phone" "text",
    "startco_id" "text",
    "startco_company_id" "text",
    "country" "text",
    "state" "text",
    "city" "text",
    "address" "text",
    "subscription_type" "public"."subscription_type" DEFAULT 'free'::"public"."subscription_type" NOT NULL,
    "cui" "text",
    "reg_com" "text",
    "company_name" "text"
);


ALTER TABLE "public"."profiles" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."shopping_list_items" (
    "id" "text" DEFAULT "public"."generate_short_id"() NOT NULL,
    "name" "text" NOT NULL,
    "quantity" "text",
    "shopping_list_id" "text",
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "checked" boolean DEFAULT false NOT NULL,
    "category" "text" NOT NULL
);


ALTER TABLE "public"."shopping_list_items" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."shopping_lists" (
    "id" "text" DEFAULT "public"."generate_short_id"() NOT NULL,
    "food_plan_id" "text" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."shopping_lists" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."urls" (
    "id" "text" DEFAULT "public"."generate_short_id"() NOT NULL,
    "short_id" "text" NOT NULL,
    "original_url" "text" NOT NULL,
    "clicks" integer DEFAULT 0 NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "client_id" "text" NOT NULL
);


ALTER TABLE "public"."urls" OWNER TO "postgres";


ALTER TABLE ONLY "public"."clients"
    ADD CONSTRAINT "clients_id_key" UNIQUE ("id");



ALTER TABLE ONLY "public"."clients"
    ADD CONSTRAINT "clients_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."days"
    ADD CONSTRAINT "days_id_key" UNIQUE ("id");



ALTER TABLE ONLY "public"."days"
    ADD CONSTRAINT "days_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."eating_occasions"
    ADD CONSTRAINT "eating_occasions_id_key" UNIQUE ("id");



ALTER TABLE ONLY "public"."eating_occasions"
    ADD CONSTRAINT "eating_occasions_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."food_plans"
    ADD CONSTRAINT "food_plans_id_key" UNIQUE ("id");



ALTER TABLE ONLY "public"."food_plans"
    ADD CONSTRAINT "food_plans_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."ingredients"
    ADD CONSTRAINT "ingredients_id_key" UNIQUE ("id");



ALTER TABLE ONLY "public"."ingredients"
    ADD CONSTRAINT "ingredients_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_id_key" UNIQUE ("id");



ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."shopping_list_items"
    ADD CONSTRAINT "shopping_list_items_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."shopping_lists"
    ADD CONSTRAINT "shopping_lists_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."ingredients"
    ADD CONSTRAINT "unique_order_per_occasion" UNIQUE ("eating_occasion_id", "order");



ALTER TABLE ONLY "public"."urls"
    ADD CONSTRAINT "urls_id_key" UNIQUE ("id");



ALTER TABLE ONLY "public"."urls"
    ADD CONSTRAINT "urls_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."urls"
    ADD CONSTRAINT "urls_short_id_key" UNIQUE ("short_id");



CREATE OR REPLACE TRIGGER "after_food_plan_insert" AFTER INSERT ON "public"."food_plans" FOR EACH ROW EXECUTE FUNCTION "public"."after_food_plan_insert"();



CREATE OR REPLACE TRIGGER "set_new_ingredient_order_trigger" BEFORE INSERT ON "public"."ingredients" FOR EACH ROW EXECUTE FUNCTION "public"."set_new_ingredient_order"();



ALTER TABLE ONLY "public"."clients"
    ADD CONSTRAINT "clients_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."days"
    ADD CONSTRAINT "days_food_plan_id_fkey" FOREIGN KEY ("food_plan_id") REFERENCES "public"."food_plans"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."eating_occasions"
    ADD CONSTRAINT "eating_occasions_day_id_fkey" FOREIGN KEY ("day_id") REFERENCES "public"."days"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."food_plans"
    ADD CONSTRAINT "food_plans_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "public"."clients"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."ingredients"
    ADD CONSTRAINT "ingredients_eating_occasion_id_fkey" FOREIGN KEY ("eating_occasion_id") REFERENCES "public"."eating_occasions"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_id_fkey" FOREIGN KEY ("id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."shopping_list_items"
    ADD CONSTRAINT "shopping_list_items_shopping_list_id_fkey" FOREIGN KEY ("shopping_list_id") REFERENCES "public"."shopping_lists"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."shopping_lists"
    ADD CONSTRAINT "shopping_lists_food_plan_id_fkey" FOREIGN KEY ("food_plan_id") REFERENCES "public"."food_plans"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."urls"
    ADD CONSTRAINT "urls_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "public"."clients"("id") ON UPDATE CASCADE ON DELETE CASCADE;



CREATE POLICY "Public profiles are viewable by everyone." ON "public"."profiles" FOR SELECT USING (true);



CREATE POLICY "Users can insert their own profile." ON "public"."profiles" FOR INSERT WITH CHECK ((( SELECT "auth"."uid"() AS "uid") = "id"));



CREATE POLICY "Users can update own profile." ON "public"."profiles" FOR UPDATE USING ((( SELECT "auth"."uid"() AS "uid") = "id"));



ALTER TABLE "public"."profiles" ENABLE ROW LEVEL SECURITY;




ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";





GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";


























































































































































































GRANT ALL ON FUNCTION "public"."after_food_plan_insert"() TO "anon";
GRANT ALL ON FUNCTION "public"."after_food_plan_insert"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."after_food_plan_insert"() TO "service_role";



GRANT ALL ON FUNCTION "public"."generate_short_id"("size" integer) TO "anon";
GRANT ALL ON FUNCTION "public"."generate_short_id"("size" integer) TO "authenticated";
GRANT ALL ON FUNCTION "public"."generate_short_id"("size" integer) TO "service_role";



GRANT ALL ON FUNCTION "public"."get_distinct_ingredients"("search_query" "text") TO "anon";
GRANT ALL ON FUNCTION "public"."get_distinct_ingredients"("search_query" "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."get_distinct_ingredients"("search_query" "text") TO "service_role";



GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "anon";
GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "service_role";



GRANT ALL ON FUNCTION "public"."set_new_ingredient_order"() TO "anon";
GRANT ALL ON FUNCTION "public"."set_new_ingredient_order"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."set_new_ingredient_order"() TO "service_role";


















GRANT ALL ON TABLE "public"."clients" TO "anon";
GRANT ALL ON TABLE "public"."clients" TO "authenticated";
GRANT ALL ON TABLE "public"."clients" TO "service_role";



GRANT ALL ON TABLE "public"."days" TO "anon";
GRANT ALL ON TABLE "public"."days" TO "authenticated";
GRANT ALL ON TABLE "public"."days" TO "service_role";



GRANT ALL ON TABLE "public"."eating_occasions" TO "anon";
GRANT ALL ON TABLE "public"."eating_occasions" TO "authenticated";
GRANT ALL ON TABLE "public"."eating_occasions" TO "service_role";



GRANT ALL ON TABLE "public"."food_plans" TO "anon";
GRANT ALL ON TABLE "public"."food_plans" TO "authenticated";
GRANT ALL ON TABLE "public"."food_plans" TO "service_role";



GRANT ALL ON TABLE "public"."ingredients" TO "anon";
GRANT ALL ON TABLE "public"."ingredients" TO "authenticated";
GRANT ALL ON TABLE "public"."ingredients" TO "service_role";



GRANT ALL ON TABLE "public"."profiles" TO "anon";
GRANT ALL ON TABLE "public"."profiles" TO "authenticated";
GRANT ALL ON TABLE "public"."profiles" TO "service_role";



GRANT ALL ON TABLE "public"."shopping_list_items" TO "anon";
GRANT ALL ON TABLE "public"."shopping_list_items" TO "authenticated";
GRANT ALL ON TABLE "public"."shopping_list_items" TO "service_role";



GRANT ALL ON TABLE "public"."shopping_lists" TO "anon";
GRANT ALL ON TABLE "public"."shopping_lists" TO "authenticated";
GRANT ALL ON TABLE "public"."shopping_lists" TO "service_role";



GRANT ALL ON TABLE "public"."urls" TO "anon";
GRANT ALL ON TABLE "public"."urls" TO "authenticated";
GRANT ALL ON TABLE "public"."urls" TO "service_role";



ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "service_role";






























RESET ALL;
