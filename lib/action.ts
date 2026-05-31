import "server-only";
import { Pool } from "pg";

declare global {
  var restaurantDbPool: Pool | undefined;
}

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is required to connect to Supabase Postgres.");
}

const isLocalDatabase =
  connectionString.includes("localhost") ||
  connectionString.includes("127.0.0.1");

export const pool =
  globalThis.restaurantDbPool ??
  new Pool({
    connectionString,
    max: 10,
    idleTimeoutMillis: 30_000,
    connectionTimeoutMillis: 10_000,
    ssl: isLocalDatabase ? undefined : { rejectUnauthorized: false },
  });

if (process.env.NODE_ENV !== "production") {
  globalThis.restaurantDbPool = pool;
}

export interface Category {
  id: string;
  name: string;
  nameEn: string;
  slug: string;
  sortOrder: number;
  createdAt: Date;
}

export interface Subcategory {
  id: string;
  categoryId: string;
  name: string;
  nameEn: string;
  slug: string;
  sortOrder: number;
  createdAt: Date;
}

export interface MenuItem {
  id: string;
  subcategoryId: string;
  name: string;
  nameEn: string;
  description: string | null;
  descriptionEn: string | null;
  price: string;
  imageUrl: string | null;
  featured: boolean;
  available: boolean;
  sortOrder: number;
  createdAt: Date;
}

export interface LocalizedString {
  sr: string;
  en: string;
}

export interface MenuItemWithHierarchy {
  id: string;
  subcategoryId: string;
  title: LocalizedString;
  description: LocalizedString | null;
  price: string;
  imageUrl: string | null;
  featured: boolean;
  available: boolean;
  sortOrder: number;
  createdAt: Date;
  categoryId: string;
  categoryName: LocalizedString;
  categorySlug: string;
  subcategoryName: LocalizedString;
  subcategorySlug: string;
}

export interface MenuNavigationSubcategory {
  id: string;
  name: LocalizedString;
  slug: string;
  itemCount: number;
}

export interface MenuNavigationCategory {
  id: string;
  name: LocalizedString;
  slug: string;
  subcategories: MenuNavigationSubcategory[];
}

export const menuSchemaSql = `
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL CHECK (char_length(trim(name)) > 0),
  name_en text NOT NULL DEFAULT 'Temporary' CHECK (char_length(trim(name_en)) > 0),
  slug text NOT NULL UNIQUE CHECK (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Migration for existing categories
DO $$ 
BEGIN 
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='categories' AND column_name='name_en') THEN
    ALTER TABLE categories ADD COLUMN name_en text NOT NULL DEFAULT '';
    UPDATE categories SET name_en = name;
    ALTER TABLE categories ALTER COLUMN name_en DROP DEFAULT;
  END IF;
END $$;

CREATE TABLE IF NOT EXISTS subcategories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id uuid NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  name text NOT NULL CHECK (char_length(trim(name)) > 0),
  name_en text NOT NULL CHECK (char_length(trim(name_en)) > 0),
  slug text NOT NULL CHECK (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT subcategories_category_slug_unique UNIQUE (category_id, slug),
  CONSTRAINT subcategories_category_name_unique UNIQUE (category_id, name)
);

-- Migration for existing subcategories unique constraint
DO $$ 
BEGIN 
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'subcategories_category_name_unique') THEN
    ALTER TABLE subcategories ADD CONSTRAINT subcategories_category_name_unique UNIQUE (category_id, name);
  END IF;
END $$;

-- Migration for existing subcategories
DO $$ 
BEGIN 
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='subcategories' AND column_name='name_en') THEN
    ALTER TABLE subcategories ADD COLUMN name_en text NOT NULL DEFAULT '';
    UPDATE subcategories SET name_en = name;
    ALTER TABLE subcategories ALTER COLUMN name_en DROP DEFAULT;
  END IF;
END $$;

CREATE TABLE IF NOT EXISTS menu_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  subcategory_id uuid NOT NULL REFERENCES subcategories(id) ON DELETE CASCADE,
  name text NOT NULL CHECK (char_length(trim(name)) > 0),
  name_en text NOT NULL CHECK (char_length(trim(name_en)) > 0),
  description text,
  description_en text,
  price numeric(10, 2) NOT NULL CHECK (price >= 0),
  image_url text,
  featured boolean NOT NULL DEFAULT false,
  available boolean NOT NULL DEFAULT true,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT menu_items_subcategory_name_unique UNIQUE (subcategory_id, name)
);

-- Migration for existing menu_items unique constraint
DO $$ 
BEGIN 
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'menu_items_subcategory_name_unique') THEN
    ALTER TABLE menu_items ADD CONSTRAINT menu_items_subcategory_name_unique UNIQUE (subcategory_id, name);
  END IF;
END $$;

-- Migration for existing menu_items
DO $$ 
BEGIN 
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='menu_items' AND column_name='name_en') THEN
    ALTER TABLE menu_items ADD COLUMN name_en text NOT NULL DEFAULT '';
    UPDATE menu_items SET name_en = name;
    ALTER TABLE menu_items ALTER COLUMN name_en DROP DEFAULT;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='menu_items' AND column_name='description_en') THEN
    ALTER TABLE menu_items ADD COLUMN description_en text;
    UPDATE menu_items SET description_en = description;
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS categories_sort_order_idx
  ON categories (sort_order, name);

CREATE INDEX IF NOT EXISTS subcategories_category_sort_order_idx
  ON subcategories (category_id, sort_order, name);

CREATE INDEX IF NOT EXISTS subcategories_slug_idx
  ON subcategories (slug);

CREATE INDEX IF NOT EXISTS menu_items_subcategory_sort_order_idx
  ON menu_items (subcategory_id, sort_order, name);

CREATE INDEX IF NOT EXISTS menu_items_available_idx
  ON menu_items (available)
  WHERE available = true;

CREATE INDEX IF NOT EXISTS menu_items_featured_idx
  ON menu_items (featured)
  WHERE featured = true;

CREATE INDEX IF NOT EXISTS menu_items_price_idx
  ON menu_items (price);

CREATE INDEX IF NOT EXISTS menu_items_search_idx
  ON menu_items
  USING gin (to_tsvector('simple', coalesce(name, '') || ' ' || coalesce(description, '') || ' ' || coalesce(name_en, '') || ' ' || coalesce(description_en, '')));
`;

export const menuSeedSql = `
INSERT INTO categories (name, name_en, slug, sort_order)
VALUES
  ('Hrana', 'Food', 'hrana', 10),
  ('Piće', 'Drinks', 'pice', 20),
  ('Deserti', 'Desserts', 'deserti', 30)
ON CONFLICT (slug) DO UPDATE
SET name = EXCLUDED.name,
    name_en = EXCLUDED.name_en,
    sort_order = EXCLUDED.sort_order;

WITH category_lookup AS (
  SELECT id, slug FROM categories
)
INSERT INTO subcategories (category_id, name, name_en, slug, sort_order)
VALUES
  ((SELECT id FROM category_lookup WHERE slug = 'hrana'), 'Predjela', 'Appetizers', 'predjela', 10),
  ((SELECT id FROM category_lookup WHERE slug = 'hrana'), 'Čorbe', 'Soups', 'corbe', 20),
  ((SELECT id FROM category_lookup WHERE slug = 'hrana'), 'Roštilj', 'Grill', 'rostilj', 30),
  ((SELECT id FROM category_lookup WHERE slug = 'pice'), 'Vina', 'Wines', 'vina', 10),
  ((SELECT id FROM category_lookup WHERE slug = 'pice'), 'Rakije', 'Spirits', 'rakije', 20),
  ((SELECT id FROM category_lookup WHERE slug = 'pice'), 'Kokteli', 'Cocktails', 'kokteli', 30),
  ((SELECT id FROM category_lookup WHERE slug = 'deserti'), 'Deserti', 'Desserts', 'deserti', 10)
ON CONFLICT (category_id, slug) DO UPDATE
SET name = EXCLUDED.name,
    name_en = EXCLUDED.name_en,
    sort_order = EXCLUDED.sort_order;

WITH subcategory_lookup AS (
  SELECT
    subcategories.id,
    subcategories.slug,
    categories.slug AS category_slug
  FROM subcategories
  INNER JOIN categories ON categories.id = subcategories.category_id
)
INSERT INTO menu_items (
  subcategory_id,
  name,
  name_en,
  description,
  description_en,
  price,
  image_url,
  featured,
  available,
  sort_order
)
VALUES
  (
    (SELECT id FROM subcategory_lookup WHERE category_slug = 'hrana' AND slug = 'predjela'),
    'Domaća zakuska',
    'Homemade Appetizer',
    'Selekcija suhomesnatih proizvoda, sireva, kajmaka i domaće pogače.',
    'Selection of cured meats, cheeses, clotted cream and homemade bread.',
    1450.00,
    NULL,
    false,
    true,
    10
  ),
  (
    (SELECT id FROM subcategory_lookup WHERE category_slug = 'hrana' AND slug = 'corbe'),
    'Teleća čorba',
    'Veal Soup',
    'Bogata teleća čorba sa povrćem, začinima i domaćom pavlakom.',
    'Rich veal soup with vegetables, spices and homemade sour cream.',
    520.00,
    NULL,
    true,
    true,
    10
  ),
  (
    (SELECT id FROM subcategory_lookup WHERE category_slug = 'hrana' AND slug = 'rostilj'),
    'Ćevapi',
    'Cevapi',
    'Deset ćevapa sa somunom, lukom i kajmakom.',
    'Ten cevapi with flatbread, onions and clotted cream.',
    980.00,
    '/cevapi.png',
    true,
    true,
    10
  ),
  (
    (SELECT id FROM subcategory_lookup WHERE category_slug = 'hrana' AND slug = 'rostilj'),
    'Karađorđeva šnicla',
    'Karadjordje’s Schnitzel',
    'Rolovana svinjska šnicla punjena kajmakom, pohovana i servirana sa tartar sosom.',
    'Rolled pork schnitzel stuffed with clotted cream, breaded and served with tartar sauce.',
    1680.00,
    NULL,
    true,
    true,
    20
  ),
  (
    (SELECT id FROM subcategory_lookup WHERE category_slug = 'pice' AND slug = 'vina'),
    'Tamjanika',
    'Tamjanika',
    'Aromatično belo vino sa voćnim notama i svežom završnicom.',
    'Aromatic white wine with fruity notes and a fresh finish.',
    620.00,
    NULL,
    false,
    true,
    10
  ),
  (
    (SELECT id FROM subcategory_lookup WHERE category_slug = 'pice' AND slug = 'rakije'),
    'Šljivovica',
    'Sljivovica (Plum Brandy)',
    'Tradicionalna domaća rakija od šljive, služena rashlađena.',
    'Traditional homemade plum brandy, served chilled.',
    390.00,
    NULL,
    true,
    true,
    10
  ),
  (
    (SELECT id FROM subcategory_lookup WHERE category_slug = 'pice' AND slug = 'rakije'),
    'Kajsijevača',
    'Apricot Brandy',
    'Mirisna rakija od kajsije, mekana i voćna.',
    'Fragrant apricot brandy, smooth and fruity.',
    430.00,
    NULL,
    false,
    true,
    20
  ),
  (
    (SELECT id FROM subcategory_lookup WHERE category_slug = 'pice' AND slug = 'rakije'),
    'Dunjevača',
    'Quince Brandy',
    'Rakija od dunje sa punim mirisom zrelog voća.',
    'Quince brandy with the full aroma of ripe fruit.',
    450.00,
    NULL,
    false,
    true,
    30
  ),
  (
    (SELECT id FROM subcategory_lookup WHERE category_slug = 'pice' AND slug = 'rakije'),
    'Viljamovka',
    'Williams Pear Brandy',
    'Čista kruškova rakija sa elegantnim završetkom.',
    'Pure pear brandy with an elegant finish.',
    450.00,
    NULL,
    false,
    true,
    40
  ),
  (
    (SELECT id FROM subcategory_lookup WHERE category_slug = 'pice' AND slug = 'rakije'),
    'Travarica',
    'Herbal Brandy',
    'Tradicionalna rakija sa lekovitim biljem.',
    'Traditional brandy infused with aromatic herbs.',
    420.00,
    NULL,
    false,
    true,
    50
  ),
  (
    (SELECT id FROM subcategory_lookup WHERE category_slug = 'pice' AND slug = 'rakije'),
    'Loza',
    'Grape Brandy',
    'Snažna rakija od grožđa, vinske arome.',
    'Strong grape brandy with a wine-like aroma.',
    410.00,
    NULL,
    false,
    true,
    60
  ),
  (
    (SELECT id FROM subcategory_lookup WHERE category_slug = 'pice' AND slug = 'rakije'),
    'Medovača',
    'Honey Brandy',
    'Slatka i mekana rakija sa prirodnim medom.',
    'Sweet and smooth brandy with natural honey.',
    440.00,
    NULL,
    false,
    true,
    70
  ),
  (
    (SELECT id FROM subcategory_lookup WHERE category_slug = 'pice' AND slug = 'kokteli'),
    'Balkan Spritz',
    'Balkan Spritz',
    'Lagan koktel sa travaricom, citrusima i tonikom.',
    'Light cocktail with herbal brandy, citruses and tonic.',
    760.00,
    NULL,
    false,
    true,
    10
  ),
  (
    (SELECT id FROM subcategory_lookup WHERE category_slug = 'deserti' AND slug = 'deserti'),
    'Palačinke',
    'Crepes',
    'Domaće palačinke sa orasima, čokoladom ili džemom.',
    'Homemade crepes with walnuts, chocolate or jam.',
    560.00,
    NULL,
    true,
    true,
    10
  ),
  (
    (SELECT id FROM subcategory_lookup WHERE category_slug = 'deserti' AND slug = 'deserti'),
    'Baklava',
    'Baklava',
    'Tradicionalni desert sa orasima i medom.',
    'Traditional dessert with walnuts and honey.',
    480.00,
    '/baklave.png',
    false,
    true,
    20
  )
ON CONFLICT (subcategory_id, name) DO UPDATE
SET name_en = EXCLUDED.name_en,
    description_en = EXCLUDED.description_en;
`;

export const menuTranslationSql = `
UPDATE categories
SET name_en = CASE name
  WHEN 'Hrana' THEN 'Food'
  WHEN 'Piće' THEN 'Drinks'
  WHEN 'Deserti' THEN 'Desserts'
  ELSE name_en
END
WHERE name IN ('Hrana', 'Piće', 'Deserti');

UPDATE subcategories
SET name_en = CASE name
  WHEN 'Predjela' THEN 'Appetizers'
  WHEN 'Čorbe' THEN 'Soups'
  WHEN 'Roštilj' THEN 'Grill'
  WHEN 'Jela od mesa' THEN 'Meat Dishes'
  WHEN 'Vina' THEN 'Wines'
  WHEN 'Rakije' THEN 'Spirits'
  WHEN 'Kokteli' THEN 'Cocktails'
  WHEN 'Deserti' THEN 'Desserts'
  WHEN 'Domaći deserti' THEN 'Homemade Desserts'
  ELSE name_en
END
WHERE name IN (
  'Predjela',
  'Čorbe',
  'Roštilj',
  'Jela od mesa',
  'Vina',
  'Rakije',
  'Kokteli',
  'Deserti',
  'Domaći deserti'
);

UPDATE menu_items
SET
  name_en = translation.name_en,
  description_en = translation.description_en
FROM (
  VALUES
    ('Domaća zakuska', 'Homemade Appetizer', 'Selection of cured meats, cheeses, kajmak and homemade bread.'),
    ('Kajmak i lepinja', 'Kajmak and Flatbread', 'Young kajmak served with hot oven-baked flatbread.'),
    ('Gibanica', 'Gibanica Cheese Pie', 'Homemade cheese pie with eggs and thin pastry sheets, baked until golden.'),
    ('Proja sa sirom', 'Cornbread with Cheese', 'Cornbread with white cheese, served warm with cultured milk.'),
    ('Pečene paprike sa belim lukom', 'Roasted Peppers with Garlic', 'Roasted red peppers in olive oil with garlic and parsley.'),
    ('Teleća čorba', 'Veal Soup', 'Rich veal soup with vegetables, spices and homemade sour cream.'),
    ('Pileća supa sa rezancima', 'Chicken Noodle Soup', 'Clear homemade chicken soup with thin noodles and carrots.'),
    ('Riblja čorba', 'Fish Soup', 'Spicy river fish soup with paprika, onions and parsley.'),
    ('Paradajz čorba', 'Tomato Soup', 'Lightly seasoned tomato soup with homemade croutons.'),
    ('Ćevapi', 'Cevapi', 'Ten cevapi with flatbread, onions and kajmak.'),
    ('Karađorđeva šnicla', 'Karadjordje''s Schnitzel', 'Rolled pork schnitzel stuffed with kajmak, breaded and served with tartar sauce.'),
    ('Pljeskavica', 'Pljeskavica', 'Juicy mixed-meat patty grilled over charcoal.'),
    ('Sarma', 'Stuffed Cabbage Rolls', 'Sour cabbage leaves stuffed with meat and rice, slow-cooked with smoked meat.'),
    ('Gurmanska pljeskavica', 'Gourmet Pljeskavica', 'Pljeskavica with cheese, bacon, crushed pepper and onions.'),
    ('Punjene paprike', 'Stuffed Peppers', 'Peppers stuffed with minced meat and rice in homemade tomato sauce.'),
    ('Leskovački uštipci', 'Leskovac-Style Meat Fritters', 'Spicy grilled meat fritters with cheese, garlic and smoked paprika.'),
    ('Svadbarski kupus', 'Wedding-Style Cabbage', 'Clay-pot cabbage with pork, bacon and a gentle smoky note.'),
    ('Svinjski ražnjići', 'Pork Skewers', 'Marinated pork skewers with grilled vegetables.'),
    ('Teleći ribić u kajmaku', 'Veal Shank in Kajmak Sauce', 'Tender veal shank in a creamy kajmak sauce, served with mashed potatoes.'),
    ('Mešano meso za dvoje', 'Mixed Grill for Two', 'Cevapi, pljeskavica, skewers, sausage and chicken with potatoes and salad.'),
    ('Podvarak sa dimljenim mesom', 'Baked Sauerkraut with Smoked Meat', 'Sour cabbage baked with smoked pork and bay leaf.'),
    ('Tamjanika', 'Tamjanika', 'Aromatic white wine with fruity notes and a fresh finish.'),
    ('Prokupac', 'Prokupac', 'Serbian red wine with notes of sour cherry, spice and soft tannins.'),
    ('Vranac', 'Vranac', 'Full-bodied southern red wine, excellent with grilled and meat dishes.'),
    ('Graševina', 'Grasevina', 'Light white wine, clean and easy-drinking, ideal for starting a meal.'),
    ('Bermet', 'Bermet', 'Aromatized dessert wine from Srem, served chilled.'),
    ('Šljivovica', 'Sljivovica (Plum Brandy)', 'Traditional homemade plum brandy, served chilled.'),
    ('Kajsijevača', 'Apricot Brandy', 'Fragrant apricot brandy, smooth and fruity.'),
    ('Dunjevača', 'Quince Brandy', 'Quince brandy with the full aroma of ripe fruit.'),
    ('Viljamovka', 'Williams Pear Brandy', 'Pure pear brandy with an elegant finish.'),
    ('Travarica', 'Herbal Brandy', 'Herbal brandy with mountain herb aromas and a gentle bitter note.'),
    ('Loza', 'Grape Brandy', 'Strong grape brandy with a wine-like aroma.'),
    ('Medovača', 'Honey Brandy', 'Sweet and smooth brandy with natural honey.'),
    ('Balkan Spritz', 'Balkan Spritz', 'Light cocktail with herbal brandy, citrus and tonic.'),
    ('Šljiva Sour', 'Plum Brandy Sour', 'Sljivovica, lemon, sugar syrup and egg-white foam.'),
    ('Dunja Tonic', 'Quince Tonic', 'Quince brandy, tonic, honey and lemon peel.'),
    ('Rakija Mojito', 'Rakija Mojito', 'Grape brandy, mint, lime, soda and crushed ice.'),
    ('Beogradski Negroni', 'Belgrade Negroni', 'Bitter liqueur, red vermouth and homemade fruit distillate.'),
    ('Palačinke', 'Crepes', 'Homemade crepes with walnuts, chocolate, jam or honey.'),
    ('Baklava', 'Baklava', 'Juicy baklava with walnuts, thin pastry sheets and fragrant sugar syrup.'),
    ('Krempita', 'Cream Slice', 'Light vanilla cream between puff pastry layers, dusted with powdered sugar.'),
    ('Tufahije', 'Walnut-Stuffed Poached Apples', 'Poached apples stuffed with walnuts, served with whipped cream.'),
    ('Urmašice', 'Urmasice Syrup Cookies', 'Traditional shortcrust cookies soaked in sugar syrup.'),
    ('Vanilice', 'Vanilla Jam Cookies', 'Small cookies with apricot jam, walnuts and powdered sugar.')
) AS translation(name, name_en, description_en)
WHERE menu_items.name = translation.name;
`;

export async function initializeMenuDatabase() {
  await pool.query(menuSchemaSql);
  
  // Data cleanup: Fix any existing 'Temporary' or empty values from previous migrations
  await pool.query(`
    UPDATE categories SET name_en = name WHERE name_en = 'Temporary' OR name_en = '';
    UPDATE subcategories SET name_en = name WHERE name_en = 'Temporary' OR name_en = '';
    UPDATE menu_items SET name_en = name WHERE name_en = 'Temporary' OR name_en = '';
    UPDATE menu_items SET description_en = description WHERE (description_en = 'Temporary' OR description_en IS NULL OR description_en = '') AND description IS NOT NULL;
  `);

  await pool.query(menuSeedSql);
  await pool.query(menuTranslationSql);
}

export async function getMenuNavigation(): Promise<MenuNavigationCategory[]> {
  const { rows } = await pool.query<{
    category_id: string;
    category_name: string;
    category_name_en: string;
    category_slug: string;
    subcategory_id: string;
    subcategory_name: string;
    subcategory_name_en: string;
    subcategory_slug: string;
    item_count: number;
  }>(`
    SELECT
      categories.id AS category_id,
      categories.name AS category_name,
      categories.name_en AS category_name_en,
      categories.slug AS category_slug,
      subcategories.id AS subcategory_id,
      subcategories.name AS subcategory_name,
      subcategories.name_en AS subcategory_name_en,
      subcategories.slug AS subcategory_slug,
      count(menu_items.id)::int AS item_count
    FROM categories
    INNER JOIN subcategories ON subcategories.category_id = categories.id
    LEFT JOIN menu_items
      ON menu_items.subcategory_id = subcategories.id
      AND menu_items.available = true
    GROUP BY
      categories.id,
      categories.name,
      categories.name_en,
      categories.slug,
      categories.sort_order,
      subcategories.id,
      subcategories.name,
      subcategories.name_en,
      subcategories.slug,
      subcategories.sort_order
    ORDER BY
      categories.sort_order,
      subcategories.sort_order,
      subcategories.name;
  `);

  const categories = new Map<string, MenuNavigationCategory>();

  for (const row of rows) {
    const category =
      categories.get(row.category_id) ??
      {
        id: row.category_id,
        name: { sr: row.category_name, en: row.category_name_en },
        slug: row.category_slug,
        subcategories: [],
      };

    category.subcategories.push({
      id: row.subcategory_id,
      name: { sr: row.subcategory_name, en: row.subcategory_name_en },
      slug: row.subcategory_slug,
      itemCount: row.item_count,
    });

    categories.set(row.category_id, category);
  }

  return Array.from(categories.values());
}

export async function getMenuItems(): Promise<MenuItemWithHierarchy[]> {
  const { rows } = await pool.query<{
    id: string;
    subcategory_id: string;
    name: string;
    name_en: string;
    description: string | null;
    description_en: string | null;
    price: string;
    image_url: string | null;
    featured: boolean;
    available: boolean;
    sort_order: number;
    created_at: Date;
    category_id: string;
    category_name: string;
    category_name_en: string;
    category_slug: string;
    subcategory_name: string;
    subcategory_name_en: string;
    subcategory_slug: string;
  }>(`
    SELECT
      menu_items.id,
      menu_items.subcategory_id,
      menu_items.name,
      menu_items.name_en,
      menu_items.description,
      menu_items.description_en,
      menu_items.price,
      menu_items.image_url,
      menu_items.featured,
      menu_items.available,
      menu_items.sort_order,
      menu_items.created_at,
      categories.id AS category_id,
      categories.name AS category_name,
      categories.name_en AS category_name_en,
      categories.slug AS category_slug,
      subcategories.name AS subcategory_name,
      subcategories.name_en AS subcategory_name_en,
      subcategories.slug AS subcategory_slug
    FROM menu_items
    INNER JOIN subcategories ON subcategories.id = menu_items.subcategory_id
    INNER JOIN categories ON categories.id = subcategories.category_id
    WHERE menu_items.available = true
    ORDER BY
      categories.sort_order,
      subcategories.sort_order,
      menu_items.sort_order,
      menu_items.name;
  `);

  return rows.map((row) => ({
    id: row.id,
    subcategoryId: row.subcategory_id,
    title: { 
      sr: row.name, 
      en: (row.name_en && row.name_en !== 'Temporary') ? row.name_en : row.name 
    },
    description: row.description ? { 
      sr: row.description, 
      en: (row.description_en && row.description_en !== 'Temporary') ? row.description_en : row.description 
    } : null,
    price: row.price,
    imageUrl: row.image_url,
    featured: row.featured,
    available: row.available,
    sortOrder: row.sort_order,
    createdAt: row.created_at,
    categoryId: row.category_id,
    categoryName: { sr: row.category_name, en: row.category_name_en || row.category_name },
    categorySlug: row.category_slug,
    subcategoryName: { sr: row.subcategory_name, en: row.subcategory_name_en || row.subcategory_name },
    subcategorySlug: row.subcategory_slug,
  }));
}
