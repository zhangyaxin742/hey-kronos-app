// Core Types
export type TimeblockColor = 'blue' | 'green' | 'red' | 'purple' | 'yellow' | 'orange' | 'pink' | 'teal';

export interface Category {
  id: string;
  name: string;
  color: TimeblockColor;
  createdAt: Date;
  updatedAt: Date;
}

export interface TimeBlock {
  id: string;
  title: string;
  categoryId: string | null;
  startTime: Date;
  endTime: Date;
  durationMinutes: number;
  date: string; // YYYY-MM-DD format
  createdAt: Date;
  updatedAt: Date;
}

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  timeblockId: string;
  categoryId: string | null;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserPreferences {
  id: string;
  startOfDay: string;
  endOfDay: string;
  defaultBlockDuration: number;
  theme: 'light' | 'dark' | 'auto';
  createdAt: Date;
  updatedAt: Date;
}

// Database Row Types (snake_case from SQLite)
export interface CategoryRow {
  id: string;
  name: string;
  color: TimeblockColor;
  created_at: string;
  updated_at: string;
}

export interface TimeBlockRow {
  id: string;
  title: string;
  category_id: string | null;
  start_time: string;
  end_time: string;
  duration_minutes: number;
  date: string;
  created_at: string;
  updated_at: string;
}

export interface TodoRow {
  id: string;
  text: string;
  completed: number; // SQLite boolean as integer
  timeblock_id: string;
  category_id: string | null;
  order_index: number;
  created_at: string;
  updated_at: string;
}