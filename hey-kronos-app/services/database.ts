import * as SQLite from 'expo-sqlite';

const DB_NAME = 'kronos.db';

export async function initDatabase(): Promise<SQLite.SQLiteDatabase> {
  const db = await SQLite.openDatabaseAsync(DB_NAME);

  await db.execAsync(`
    PRAGMA journal_mode = WAL;
    PRAGMA foreign_keys = ON;
    
    -- Categories Table
    CREATE TABLE IF NOT EXISTS categories (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL CHECK(length(name) <= 20),
      color TEXT NOT NULL CHECK(color IN ('blue', 'green', 'red', 'purple', 'yellow', 'orange', 'pink', 'teal')),
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
    
    -- Timeblocks Table
    CREATE TABLE IF NOT EXISTS timeblocks (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL CHECK(length(title) <= 100),
      category_id TEXT,
      start_time TEXT NOT NULL,
      end_time TEXT NOT NULL,
      duration_minutes INTEGER NOT NULL CHECK(duration_minutes BETWEEN 1 AND 1440),
      date TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
    );
    
    -- Todos Table
    CREATE TABLE IF NOT EXISTS todos (
      id TEXT PRIMARY KEY,
      text TEXT NOT NULL CHECK(length(text) <= 500),
      completed INTEGER NOT NULL DEFAULT 0 CHECK(completed IN (0, 1)),
      timeblock_id TEXT NOT NULL,
      category_id TEXT,
      order_index INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (timeblock_id) REFERENCES timeblocks(id) ON DELETE CASCADE,
      FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
    );
    
    -- User Preferences Table
    CREATE TABLE IF NOT EXISTS user_preferences (
      id TEXT PRIMARY KEY DEFAULT 'default',
      start_of_day TEXT NOT NULL DEFAULT '00:00',
      end_of_day TEXT NOT NULL DEFAULT '23:59',
      default_block_duration INTEGER NOT NULL DEFAULT 60,
      theme TEXT NOT NULL DEFAULT 'light' CHECK(theme IN ('light', 'dark', 'auto')),
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
    
    -- AI Coaching Tables
    
    -- Moonshot Goals Table
    CREATE TABLE IF NOT EXISTS goals (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL CHECK(length(title) <= 100),
      description TEXT NOT NULL CHECK(length(description) <= 500),
      target_date TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'active' CHECK(status IN ('active', 'completed', 'abandoned')),
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
    
    -- Milestones Table
    CREATE TABLE IF NOT EXISTS milestones (
      id TEXT PRIMARY KEY,
      goal_id TEXT NOT NULL,
      title TEXT NOT NULL CHECK(length(title) <= 200),
      completed INTEGER NOT NULL DEFAULT 0 CHECK(completed IN (0, 1)),
      due_date TEXT NOT NULL,
      order_index INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (goal_id) REFERENCES goals(id) ON DELETE CASCADE
    );
    
    -- AI Check-ins Table
    CREATE TABLE IF NOT EXISTS check_ins (
      id TEXT PRIMARY KEY,
      goal_id TEXT,
      user_message TEXT NOT NULL,
      ai_response TEXT NOT NULL,
      confrontational INTEGER NOT NULL DEFAULT 0 CHECK(confrontational IN (0, 1)),
      sentiment TEXT NOT NULL DEFAULT 'neutral' CHECK(sentiment IN ('positive', 'neutral', 'confrontational')),
      screentime_hours REAL,
      timeblock_completion_rate REAL,
      todo_completion_rate REAL,
      goals_on_track INTEGER,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (goal_id) REFERENCES goals(id) ON DELETE SET NULL
    );
    
    -- AI Conversations Table
    CREATE TABLE IF NOT EXISTS ai_conversations (
      id TEXT PRIMARY KEY,
      context TEXT NOT NULL DEFAULT 'general' CHECK(context IN ('goal_setting', 'check_in', 'confrontation', 'planning', 'general')),
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
    
    -- AI Messages Table
    CREATE TABLE IF NOT EXISTS ai_messages (
      id TEXT PRIMARY KEY,
      conversation_id TEXT NOT NULL,
      role TEXT NOT NULL CHECK(role IN ('user', 'assistant')),
      content TEXT NOT NULL,
      timestamp TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (conversation_id) REFERENCES ai_conversations(id) ON DELETE CASCADE
    );
    
    -- Indexes for Performance
    CREATE INDEX IF NOT EXISTS idx_timeblocks_date ON timeblocks(date);
    CREATE INDEX IF NOT EXISTS idx_timeblocks_category ON timeblocks(category_id);
    CREATE INDEX IF NOT EXISTS idx_todos_timeblock ON todos(timeblock_id);
    CREATE INDEX IF NOT EXISTS idx_todos_category ON todos(category_id);
    CREATE INDEX IF NOT EXISTS idx_milestones_goal ON milestones(goal_id);
    CREATE INDEX IF NOT EXISTS idx_check_ins_goal ON check_ins(goal_id);
    CREATE INDEX IF NOT EXISTS idx_check_ins_created ON check_ins(created_at);
    CREATE INDEX IF NOT EXISTS idx_messages_conversation ON ai_messages(conversation_id);
    
    -- Insert default preferences if not exists
    INSERT OR IGNORE INTO user_preferences (id) VALUES ('default');
  `);

  return db;
}

// Export database instance
let dbInstance: SQLite.SQLiteDatabase | null = null;

export async function getDatabase(): Promise<SQLite.SQLiteDatabase> {
  if (!dbInstance) {
    dbInstance = await initDatabase();
  }
  return dbInstance;
}
