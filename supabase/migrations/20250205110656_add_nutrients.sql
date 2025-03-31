drop function if exists "public"."get_distinct_ingredients"(search_query text);

create table "public"."local_ingredients" (
    "id" text not null default generate_short_id(),
    "name" text not null,
    "calories" real not null default '0'::real,
    "proteins" real not null default '0'::real,
    "lipids" real not null default '0'::real,
    "carbohydrates" real not null default '0'::real,
    "fibers" real not null default '0'::real,
    "notes" text,
    "created_at" timestamp with time zone not null default now(),
    "category" text
);


alter table "public"."clients" add column "age" smallint;

alter table "public"."clients" add column "calories" smallint;

alter table "public"."clients" add column "carbohydrates" text;

alter table "public"."clients" add column "disliked_food" text;

alter table "public"."clients" add column "favourite_food" text;

alter table "public"."clients" add column "food_restrictions" text;

alter table "public"."clients" add column "height" smallint;

alter table "public"."clients" add column "lipids" text;

alter table "public"."clients" add column "proteins" text;

alter table "public"."clients" add column "sex" text;

alter table "public"."clients" add column "weight" smallint;

alter table "public"."ingredients" add column "calories" real;

alter table "public"."ingredients" add column "carbohydrates" real;

alter table "public"."ingredients" add column "category" text;

alter table "public"."ingredients" add column "fibers" real;

alter table "public"."ingredients" add column "lipids" real;

alter table "public"."ingredients" add column "notes" text;

alter table "public"."ingredients" add column "proteins" real;

CREATE UNIQUE INDEX local_ingredients_name_key ON public.local_ingredients USING btree (name);

CREATE UNIQUE INDEX local_ingredients_pkey ON public.local_ingredients USING btree (id);

alter table "public"."local_ingredients" add constraint "local_ingredients_pkey" PRIMARY KEY using index "local_ingredients_pkey";

alter table "public"."local_ingredients" add constraint "local_ingredients_name_key" UNIQUE using index "local_ingredients_name_key";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.get_distinct_ingredients(search_query text)
 RETURNS SETOF local_ingredients
 LANGUAGE sql
AS $function$
    SELECT DISTINCT ON (lower(name)) *
    FROM local_ingredients 
    WHERE name ILIKE search_query || '%'
    ORDER BY lower(name)
    LIMIT 15;
$function$
;

grant delete on table "public"."local_ingredients" to "anon";

grant insert on table "public"."local_ingredients" to "anon";

grant references on table "public"."local_ingredients" to "anon";

grant select on table "public"."local_ingredients" to "anon";

grant trigger on table "public"."local_ingredients" to "anon";

grant truncate on table "public"."local_ingredients" to "anon";

grant update on table "public"."local_ingredients" to "anon";

grant delete on table "public"."local_ingredients" to "authenticated";

grant insert on table "public"."local_ingredients" to "authenticated";

grant references on table "public"."local_ingredients" to "authenticated";

grant select on table "public"."local_ingredients" to "authenticated";

grant trigger on table "public"."local_ingredients" to "authenticated";

grant truncate on table "public"."local_ingredients" to "authenticated";

grant update on table "public"."local_ingredients" to "authenticated";

grant delete on table "public"."local_ingredients" to "service_role";

grant insert on table "public"."local_ingredients" to "service_role";

grant references on table "public"."local_ingredients" to "service_role";

grant select on table "public"."local_ingredients" to "service_role";

grant trigger on table "public"."local_ingredients" to "service_role";

grant truncate on table "public"."local_ingredients" to "service_role";

grant update on table "public"."local_ingredients" to "service_role";


