// Core Types
export type TimeblockColor =
  | 'blue'
  | 'green'
  | 'red'
  | 'purple'
  | 'yellow'
  | 'orange'
  | 'pink'
  | 'teal';

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

// AI Coaching Domain Types
export interface Goal {
  id: string;
  title: string;
  description: string;
  targetDate: string;
  status: 'active' | 'completed' | 'abandoned';
  createdAt: Date;
  updatedAt: Date;
}

export interface Milestone {
  id: string;
  goalId: string;
  title: string;
  completed: boolean;
  dueDate: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CheckIn {
  id: string;
  goalId: string | null;
  userMessage: string;
  aiResponse: string;
  confrontational: boolean;
  sentiment: 'positive' | 'neutral' | 'confrontational';
  screentimeHours: number | null;
  timeblockCompletionRate: number | null;
  todoCompletionRate: number | null;
  goalsOnTrack: number | null;
  createdAt: Date;
}

export interface AIConversation {
  id: string;
  context: 'goal_setting' | 'check_in' | 'confrontation' | 'planning' | 'general';
  createdAt: Date;
  updatedAt: Date;
}

export interface AIMessage {
  id: string;
  conversationId: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
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

export interface GoalRow {
  id: string;
  title: string;
  description: string;
  target_date: string;
  status: 'active' | 'completed' | 'abandoned';
  created_at: string;
  updated_at: string;
}

export interface MilestoneRow {
  id: string;
  goal_id: string;
  title: string;
  completed: number;
  due_date: string;
  order_index: number;
  created_at: string;
  updated_at: string;
}

export interface CheckInRow {
  id: string;
  goal_id: string | null;
  user_message: string;
  ai_response: string;
  confrontational: number;
  sentiment: 'positive' | 'neutral' | 'confrontational';
  screentime_hours: number | null;
  timeblock_completion_rate: number | null;
  todo_completion_rate: number | null;
  goals_on_track: number | null;
  created_at: string;
}

export interface AIConversationRow {
  id: string;
  context: 'goal_setting' | 'check_in' | 'confrontation' | 'planning' | 'general';
  created_at: string;
  updated_at: string;
}

export interface AIMessageRow {
  id: string;
  conversation_id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}
