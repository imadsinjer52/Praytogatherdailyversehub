/*
  # Create devotionals table for AI-generated daily devotionals

  1. New Tables
    - `devotionals`
      - `id` (uuid, primary key) - Unique identifier
      - `date` (date, unique, not null) - Date for the devotional (indexed for fast lookups)
      - `verse_reference` (text, not null) - Bible verse reference (e.g., "John 3:16")
      - `verse_text_en` (text, not null) - English verse text
      - `verse_text_ar` (text) - Arabic verse text
      - `verse_text_de` (text) - German verse text
      - `reflection_en` (text, not null) - English reflection
      - `reflection_ar` (text, not null) - Arabic reflection
      - `reflection_de` (text, not null) - German reflection
      - `prayer_en` (text, not null) - English prayer
      - `prayer_ar` (text, not null) - Arabic prayer
      - `prayer_de` (text, not null) - German prayer
      - `version_en` (text, not null) - English Bible version name
      - `version_ar` (text, not null) - Arabic Bible version name
      - `version_de` (text, not null) - German Bible version name
      - `created_at` (timestamptz, default now()) - When the record was created

  2. Security
    - Enable RLS on `devotionals` table
    - Add policy for public read access (devotionals are public content)
    - No write access from client (only server can create devotionals)

  3. Indexes
    - Unique index on `date` for fast lookups and preventing duplicates
    - Index on `created_at` for sorting

  ## Important Notes:
  - This table stores AI-generated devotional content
  - One row per date (enforced by unique constraint)
  - Server-side API checks for existing date before generating new content
  - All languages are generated and stored together in one API call
  - Public read access allows frontend to fetch without authentication
*/

CREATE TABLE IF NOT EXISTS devotionals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  date date UNIQUE NOT NULL,
  verse_reference text NOT NULL,
  verse_text_en text NOT NULL,
  verse_text_ar text,
  verse_text_de text,
  reflection_en text NOT NULL,
  reflection_ar text NOT NULL,
  reflection_de text NOT NULL,
  prayer_en text NOT NULL,
  prayer_ar text NOT NULL,
  prayer_de text NOT NULL,
  version_en text NOT NULL DEFAULT 'King James Version',
  version_ar text NOT NULL DEFAULT 'Arabic, Standard',
  version_de text NOT NULL DEFAULT 'Elberfelder',
  created_at timestamptz DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS devotionals_date_idx ON devotionals(date);
CREATE INDEX IF NOT EXISTS devotionals_created_at_idx ON devotionals(created_at DESC);

ALTER TABLE devotionals ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Devotionals are publicly readable"
  ON devotionals
  FOR SELECT
  TO public
  USING (true);
