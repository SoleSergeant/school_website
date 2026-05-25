-- =============================================
-- Fergana Presidential School — Supabase Schema
-- Run this in your Supabase SQL editor
-- =============================================

-- Admin users
CREATE TABLE admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR NOT NULL,
  email VARCHAR UNIQUE NOT NULL,
  password_hash VARCHAR NOT NULL,
  role VARCHAR NOT NULL CHECK (role IN ('superadmin', 'media', 'writer')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Teachers
CREATE TABLE teachers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR NOT NULL,
  subject VARCHAR NOT NULL,
  experience VARCHAR,
  bio TEXT,
  photo VARCHAR,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Students / achievements
CREATE TABLE students (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR NOT NULL,
  grade VARCHAR,
  achievement TEXT,
  photo VARCHAR,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Articles
CREATE TABLE articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR NOT NULL,
  excerpt TEXT,
  content TEXT,
  cover VARCHAR,
  category VARCHAR DEFAULT 'News',
  author VARCHAR,
  author_id UUID REFERENCES admin_users(id) ON DELETE SET NULL,
  published BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Gallery
CREATE TABLE gallery (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  url VARCHAR NOT NULL,
  caption VARCHAR,
  uploaded_by UUID REFERENCES admin_users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Surveys (Echo)
CREATE TABLE surveys (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR NOT NULL,
  is_open BOOLEAN DEFAULT TRUE,
  created_by UUID REFERENCES admin_users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Survey questions
CREATE TABLE survey_questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  survey_id UUID REFERENCES surveys(id) ON DELETE CASCADE,
  question TEXT NOT NULL,
  type VARCHAR NOT NULL CHECK (type IN ('rating', 'text', 'multiple_choice')),
  options JSONB,
  order_index INTEGER DEFAULT 0
);

-- Anonymous survey responses
CREATE TABLE survey_responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  survey_id UUID REFERENCES surveys(id) ON DELETE CASCADE,
  answers JSONB NOT NULL,
  submitted_at TIMESTAMPTZ DEFAULT NOW()
  -- No user_id: fully anonymous
);

-- =============================================
-- Row Level Security (RLS)
-- =============================================

ALTER TABLE teachers ENABLE ROW LEVEL SECURITY;
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE surveys ENABLE ROW LEVEL SECURITY;
ALTER TABLE survey_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE survey_responses ENABLE ROW LEVEL SECURITY;

-- Public read access for all published content
CREATE POLICY "Public can read teachers" ON teachers FOR SELECT USING (TRUE);
CREATE POLICY "Public can read students" ON students FOR SELECT USING (TRUE);
CREATE POLICY "Public can read published articles" ON articles FOR SELECT USING (published = TRUE);
CREATE POLICY "Public can read gallery" ON gallery FOR SELECT USING (TRUE);
CREATE POLICY "Public can read surveys" ON surveys FOR SELECT USING (TRUE);
CREATE POLICY "Public can read survey questions" ON survey_questions FOR SELECT USING (TRUE);

-- Anyone can submit a survey response (anonymous)
CREATE POLICY "Anyone can submit survey response" ON survey_responses FOR INSERT WITH CHECK (TRUE);

-- Authenticated users (admins) can do everything
CREATE POLICY "Admins full access teachers" ON teachers FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admins full access students" ON students FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admins full access articles" ON articles FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admins full access gallery" ON gallery FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admins full access surveys" ON surveys FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admins full access survey_questions" ON survey_questions FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admins can read responses" ON survey_responses FOR SELECT USING (auth.role() = 'authenticated');

-- =============================================
-- Seed data (optional — matches mock.js)
-- =============================================

INSERT INTO teachers (name, subject, experience, bio, photo) VALUES
  ('Dilnoza Yusupova', 'Mathematics', '12 years', 'Cambridge-certified mathematics teacher specializing in olympiad preparation.', 'https://i.pravatar.cc/150?img=47'),
  ('Jasur Karimov', 'Physics', '9 years', 'Former national olympiad champion, now mentoring the next generation.', 'https://i.pravatar.cc/150?img=12'),
  ('Madina Rakhimova', 'English Language', '7 years', 'IELTS examiner and Cambridge IGCSE English specialist.', 'https://i.pravatar.cc/150?img=45'),
  ('Sherzod Toshmatov', 'Chemistry', '11 years', 'PhD in Organic Chemistry, leads the school science club.', 'https://i.pravatar.cc/150?img=15'),
  ('Nilufar Mirzayeva', 'Biology', '8 years', 'Researcher and educator passionate about life sciences.', 'https://i.pravatar.cc/150?img=49'),
  ('Bobur Eshmatov', 'Computer Science', '6 years', 'Full-stack developer turned educator, leads the robotics team.', 'https://i.pravatar.cc/150?img=18');

INSERT INTO students (name, grade, achievement, photo) VALUES
  ('Amir Sotvoldiyev', '11', 'Gold Medal – National Math Olympiad 2024', 'https://i.pravatar.cc/150?img=33'),
  ('Zulfiya Nazarova', '10', 'Silver – International Physics Olympiad (IPhO)', 'https://i.pravatar.cc/150?img=44'),
  ('Doniyor Xasanov', '12', 'Accepted to MIT — Class of 2028', 'https://i.pravatar.cc/150?img=25'),
  ('Sarvinoz Tursunova', '11', 'Gold – Regional Biology Olympiad', 'https://i.pravatar.cc/150?img=41'),
  ('Mansur Qodirov', '9', '1st Place – TEDx Fergana Presidential School', 'https://i.pravatar.cc/150?img=22'),
  ('Feruza Baxromova', '12', 'Bronze – International Chemistry Olympiad (IChO)', 'https://i.pravatar.cc/150?img=48');
