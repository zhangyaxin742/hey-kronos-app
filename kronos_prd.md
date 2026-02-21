# KRONOS Expo Mobile Application - Product Requirements Document

## Product Overview

KRONOS is an AI life coach for the unreasonably ambitious, built with Expo/React Native. This document specifies all technical requirements for an AI-powered accountability system that confronts users when they fall short of their moonshot goals, integrated with smart timeblocking and execution tracking.

**Core Value Proposition:** Set 10 moonshot goals. Get brutal AI feedback. Track execution through timeblocking. Get confronted when you're full of shit. Unfuck your life.

**Technical Philosophy:** Timeblocking + todos are the *execution layer*. AI coaching is the *accountability layer*. Combined = unstoppable.

---

## Design System & Visual Identity

### Core Aesthetic Principles

**Foundation:** Monochrome (black & white) base with vibrant, translucent timeblocks  
**Inspiration:** Notion's clean interface + Google Calendar's time layout + highlighter aesthetics  
**Philosophy:** Premium, smooth, never cheap or template-like

### Color Palette

```typescript
// Base Colors
const colors = {
  // Monochrome Foundation
  black: '#000000',
  white: '#FFFFFF',
  gray: {
    50: '#FAFAFA',
    100: '#F5F5F5',
    200: '#E5E5E5',
    300: '#D4D4D4',
    400: '#A3A3A3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717',
  },
  
  // Timeblock Colors (Translucent - like highlighter/watercolor)
  timeblockColors: {
    blue: 'rgba(59, 130, 246, 0.15)',
    green: 'rgba(34, 197, 94, 0.15)',
    red: 'rgba(239, 68, 68, 0.15)',
    purple: 'rgba(168, 85, 247, 0.15)',
    yellow: 'rgba(234, 179, 8, 0.15)',
    orange: 'rgba(249, 115, 22, 0.15)',
    pink: 'rgba(236, 72, 153, 0.15)',
    teal: 'rgba(20, 184, 166, 0.15)',
  },
  
  // Border versions (slightly more opaque)
  timeblockBorders: {
    blue: 'rgba(59, 130, 246, 0.3)',
    green: 'rgba(34, 197, 94, 0.3)',
    red: 'rgba(239, 68, 68, 0.3)',
    purple: 'rgba(168, 85, 247, 0.3)',
    yellow: 'rgba(234, 179, 8, 0.3)',
    orange: 'rgba(249, 115, 22, 0.3)',
    pink: 'rgba(236, 72, 153, 0.3)',
    teal: 'rgba(20, 184, 166, 0.3)',
  }
};
```

### Typography System

```typescript
const typography = {
  // Headings
  h1: { fontSize: 32, fontWeight: '700', lineHeight: 38, letterSpacing: -0.5 },
  h2: { fontSize: 24, fontWeight: '600', lineHeight: 30, letterSpacing: -0.3 },
  h3: { fontSize: 18, fontWeight: '600', lineHeight: 24, letterSpacing: -0.2 },
  
  // Body
  body: { fontSize: 16, fontWeight: '400', lineHeight: 22 },
  bodySmall: { fontSize: 14, fontWeight: '400', lineHeight: 20 },
  caption: { fontSize: 12, fontWeight: '400', lineHeight: 16 },
  
  // Specialized
  timeLabel: { fontSize: 14, fontWeight: '500', lineHeight: 18, color: '#737373' },
  timeblockTitle: { fontSize: 15, fontWeight: '600', lineHeight: 20 },
  
  // Font Family
  fontFamily: {
    regular: 'Inter-Regular',
    medium: 'Inter-Medium',
    semibold: 'Inter-SemiBold',
    bold: 'Inter-Bold',
  }
};
```

### Spacing & Layout

```typescript
const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

const layout = {
  screenPadding: 16,
  cardBorderRadius: 12,
  timeBlockBorderRadius: 8,
  inputBorderRadius: 8,
};
```

### Glassmorphism Specifications

```typescript
const glassEffects = {
  modal: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.05)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 30,
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.08)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
  }
};
```

---

## Technical Architecture

### Technology Stack

```
Platform: Expo SDK 50+
Language: TypeScript (strict mode)
Navigation: Expo Router (file-based routing)
State Management: Zustand + React Query
Data Persistence: AsyncStorage + SQLite (expo-sqlite)
Animations: React Native Reanimated 3.x + Gesture Handler
AI Integration: Claude API or OpenAI GPT-4 (wrapper with custom system prompts)
Notifications: Expo Notifications (daily check-ins)
Screentime Tracking: expo-device-info + platform-specific APIs (iOS Screen Time, Android Usage Stats)
UI Components: Custom components (no UI library)
Testing: Jest + React Native Testing Library
```

### Project Structure

```
/kronos-mobile
├── /app
│   ├── (auth)
│   │   ├── login.tsx
│   │   └── signup.tsx
│   ├── (tabs)
│   │   ├── index.tsx (Dashboard)
│   │   ├── goals.tsx (AI Goals & Progress)
│   │   ├── chat.tsx (AI Chat Interface)
│   │   ├── categories.tsx
│   │   └── settings.tsx
│   └── _layout.tsx
├── /components
│   ├── /ai
│   │   ├── ChatBubble.tsx
│   │   ├── ChatInput.tsx
│   │   ├── GoalCard.tsx
│   │   ├── MilestoneList.tsx
│   │   └── ConfrontationModal.tsx
│   ├── /timeblock
│   │   ├── TimeBlock.tsx
│   │   ├── TimeBlockModal.tsx
│   │   └── DraggableTimeBlock.tsx
│   ├── /calendar
│   │   ├── TimeColumn.tsx
│   │   ├── DayView.tsx
│   │   └── TimeGrid.tsx
│   ├── /todo
│   │   ├── TodoItem.tsx
│   │   ├── TodoList.tsx
│   │   └── DraggableTodo.tsx
│   ├── /category
│   │   ├── CategoryPicker.tsx
│   │   ├── CategoryModal.tsx
│   │   └── ColorPicker.tsx
│   └── /ui
│       ├── Button.tsx
│       ├── Input.tsx
│       ├── Modal.tsx
│       └── GlassCard.tsx
├── /store
│   ├── aiStore.ts (AI conversations, check-ins)
│   ├── goalsStore.ts (moonshot goals, milestones)
│   ├── timeblockStore.ts
│   ├── categoryStore.ts
│   ├── todoStore.ts
│   └── userStore.ts
├── /hooks
│   ├── useAIChat.ts
│   ├── useGoals.ts
│   ├── useCheckIns.ts
│   ├── useTimeblocks.ts
│   ├── useCategories.ts
│   └── useTodos.ts
├── /services
│   ├── ai.ts (AI API integration)
│   ├── metrics.ts (calculate completion rates, screentime)
│   ├── notifications.ts (daily check-in push)
│   ├── database.ts
│   ├── storage.ts
│   └── sync.ts
├── /types
│   ├── ai.types.ts
│   ├── goals.types.ts
│   ├── timeblock.types.ts
│   ├── category.types.ts
│   └── todo.types.ts
└── /utils
    ├── timeNormalization.ts
    ├── dragHelpers.ts
    └── dateHelpers.ts
```

### Core Data Models

```typescript
// Category Type
interface Category {
  id: string; // UUID
  name: string; // Max 20 characters
  color: TimeblockColor; // 'blue' | 'green' | 'red' | 'purple' | 'yellow' | 'orange' | 'pink' | 'teal'
  createdAt: Date;
  updatedAt: Date;
}

// TimeBlock Type
interface TimeBlock {
  id: string; // UUID
  title: string;
  categoryId: string; // FK to Category
  startTime: Date; // ISO string
  endTime: Date; // ISO string
  durationMinutes: number; // Calculated from start/end
  date: string; // YYYY-MM-DD format
  todos: Todo[]; // Array of associated todos
  createdAt: Date;
  updatedAt: Date;
}

// Todo Type
interface Todo {
  id: string; // UUID
  text: string;
  completed: boolean;
  timeblockId: string; // FK to TimeBlock
  categoryId: string; // FK to Category
  order: number; // For sorting within timeblock
  createdAt: Date;
  updatedAt: Date;
}

// User Type
interface User {
  id: string;
  email: string;
  name: string;
  preferences: UserPreferences;
  createdAt: Date;
}

interface UserPreferences {
  startOfDay: string; // "00:00" - "23:59"
  endOfDay: string; // "00:00" - "23:59"
  defaultBlockDuration: number; // minutes
  theme: 'light' | 'dark' | 'auto';
}

// AI Coaching Types
interface MoonshotGoal {
  id: string;
  title: string; // Max 100 chars
  description: string; // Max 500 chars
  targetDate: Date; // 12 months from creation
  status: 'active' | 'completed' | 'abandoned';
  milestones: Milestone[];
  createdAt: Date;
  updatedAt: Date;
}

interface Milestone {
  id: string;
  goalId: string;
  title: string;
  completed: boolean;
  dueDate: Date;
  order: number;
}

interface AICheckIn {
  id: string;
  goalId: string | null; // Can be general or goal-specific
  userMessage: string;
  aiResponse: string;
  confrontational: boolean; // True if AI called out user
  sentiment: 'positive' | 'neutral' | 'confrontational';
  metrics: CheckInMetrics;
  createdAt: Date;
}

interface CheckInMetrics {
  screentimeHours: number; // Last 7 days (if available)
  timeblockCompletionRate: number; // % of blocks completed this week
  todoCompletionRate: number; // % of todos checked off this week
  goalsOnTrack: number; // # of goals with recent progress
}

interface AIConversation {
  id: string;
  messages: AIMessage[];
  context: 'goal_setting' | 'check_in' | 'confrontation' | 'planning' | 'general';
  createdAt: Date;
  updatedAt: Date;
}

interface AIMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}
```

---

## AI API Integration

### AI Service Configuration

```typescript
// services/ai.ts
import Anthropic from '@anthropic-ai/sdk'; // or OpenAI

const anthropic = new Anthropic({
  apiKey: process.env.EXPO_PUBLIC_ANTHROPIC_API_KEY,
});

const SYSTEM_PROMPT = `
You are KRONOS, an AI life coach for the unreasonably ambitious.

Your role:
- Help users achieve 10 moonshot goals in 12 months
- Be DIRECT and CONFRONTATIONAL when they're full of shit
- Call out excuses immediately
- Push for asymmetric outcomes, not incremental improvement
- Use their actual data (timeblocks, screentime, completion rates) to hold them accountable

Personality:
- No coddling. No participation trophies.
- "You say you want X, but you did Y. Explain."
- Celebrate real wins. Ignore fake progress.
- Always seek the asymmetric outcome.

Current user context:
{USER_CONTEXT}
`;

export async function chatWithAI(
  message: string,
  context: UserContext,
  conversationHistory: AIMessage[] = []
): Promise<string> {
  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 1000,
    system: SYSTEM_PROMPT.replace('{USER_CONTEXT}', JSON.stringify(context)),
    messages: [
      ...conversationHistory.map(m => ({
        role: m.role as 'user' | 'assistant',
        content: m.content,
      })),
      { role: 'user', content: message },
    ],
  });

  return response.content[0].type === 'text' ? response.content[0].text : '';
}

export async function analyzeGoals(goals: MoonshotGoal[]): Promise<{
  questions: string[];
  executionPlan: string;
  milestones: Milestone[];
}> {
  const prompt = `
User has set these moonshot goals:
${goals.map((g, i) => `${i + 1}. ${g.title}: ${g.description}`).join('\n')}

Your tasks:
1. Ask 2-3 clarifying questions per goal to understand their WHY and definition of success
2. Generate a high-level execution plan
3. Break each goal into 3-5 milestones with suggested due dates

Be specific. Be ambitious. No generic advice.
`;

  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 2000,
    messages: [{ role: 'user', content: prompt }],
  });

  // Parse AI response into structured format
  return parseGoalAnalysis(response.content[0].type === 'text' ? response.content[0].text : '');
}

export async function generateDailyCheckIn(metrics: CheckInMetrics, goals: MoonshotGoal[]): Promise<string> {
  const prompt = `
Generate a daily check-in message for the user.

Their metrics this week:
- Timeblock completion: ${metrics.timeblockCompletionRate}%
- Todo completion: ${metrics.todoCompletionRate}%
- Screentime: ${metrics.screentimeHours} hours
- Goals on track: ${metrics.goalsOnTrack}/${goals.length}

Active goals: ${goals.map(g => g.title).join(', ')}

Ask how yesterday went. If metrics are bad, CONFRONT them directly. If good, acknowledge and push harder.
`;

  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 500,
    messages: [{ role: 'user', content: prompt }],
  });

  return response.content[0].type === 'text' ? response.content[0].text : '';
}
```

### Metrics Calculation Service

```typescript
// services/metrics.ts
import { db } from './database';
import { subDays, startOfWeek } from 'date-fns';

export async function calculateWeeklyMetrics(): Promise<CheckInMetrics> {
  const weekStart = startOfWeek(new Date());
  
  // Get timeblocks for this week
  const timeblocks = await db.timeblocks.findMany({
    where: {
      date: { gte: formatDateForDB(weekStart) }
    }
  });
  
  // Calculate completion rate (assuming we mark completed via a field)
  const completedBlocks = timeblocks.filter(tb => tb.completed).length;
  const timeblockCompletionRate = timeblocks.length > 0 
    ? (completedBlocks / timeblocks.length) * 100 
    : 0;
  
  // Get todos for this week
  const todos = await db.todos.findMany({
    where: {
      createdAt: { gte: weekStart }
    }
  });
  
  const completedTodos = todos.filter(t => t.completed).length;
  const todoCompletionRate = todos.length > 0 
    ? (completedTodos / todos.length) * 100 
    : 0;
  
  // Get goals with recent progress
  const goalsOnTrack = await db.goals.count({
    where: {
      status: 'active',
      milestones: {
        some: {
          completed: true,
          updatedAt: { gte: subDays(new Date(), 7) }
        }
      }
    }
  });
  
  // Screentime (platform-specific - placeholder)
  const screentimeHours = await getScreentimeHours(); // Platform API
  
  return {
    timeblockCompletionRate,
    todoCompletionRate,
    goalsOnTrack,
    screentimeHours,
  };
}

// Platform-specific screentime tracking
async function getScreentimeHours(): Promise<number> {
  // iOS: ScreenTime API (requires user permission)
  // Android: UsageStatsManager
  // For MVP: return 0 or allow manual input
  return 0; // Implement platform-specific logic
}
```

---

## Atomic User Stories

### AI Life Coaching (Primary Features)

#### US-APP-001: Set Moonshot Goals
**As a** unreasonably ambitious user  
**I want to** define 10 moonshot goals for the next 12 months  
**So that** the AI can hold me accountable to achieving them

**Acceptance Criteria:**
- [ ] Goal input screen accessible from main navigation
- [ ] Support 1-10 goals (enforced limit)
- [ ] Each goal: Title (max 100 chars), Description (max 500 chars), Auto-set 12-month target date
- [ ] AI analyzes goals and asks clarifying questions: "Why this goal? What does success look like?"
- [ ] AI generates initial execution plan with milestones
- [ ] Goals saved to SQLite with status tracking
- [ ] Visual: Goals displayed as cards with progress indicators

**Technical Notes:**
```typescript
// AI API Call for goal analysis
const analyzeGoals = async (goals: MoonshotGoal[]) => {
  const response = await fetch('/api/ai/analyze-goals', {
    method: 'POST',
    body: JSON.stringify({ 
      goals,
      currentMetrics: getUserMetrics() // screentime, completion rates
    }),
  });
  return response.json(); // Returns: clarifying questions, execution plan
};
```

---

#### US-APP-002: Daily AI Check-In
**As a** user with active goals  
**I want to** receive daily AI check-ins that ask about my progress  
**So that** I stay on track and get confronted when I'm slipping

**Acceptance Criteria:**
- [ ] Notification sent daily at user-defined time (default: 9 AM)
- [ ] Tap notification opens chat interface with AI
- [ ] AI asks: "How did yesterday go? Did you complete your planned timeblocks?"
- [ ] User responds with text or voice (voice-to-text)
- [ ] AI analyzes response + actual data (timeblocks completed, todos checked)
- [ ] If mismatch detected, AI confronts: "You say you're on track, but you only completed 2/8 timeblocks. What happened?"
- [ ] Check-in saved with confrontational flag for analytics
- [ ] Streak counter shows consecutive check-in days

**Technical Notes:**
```typescript
// AI check-in with metrics
const dailyCheckIn = async (userMessage: string) => {
  const metrics = calculateWeeklyMetrics(); // completion rates, screentime
  
  const response = await aiClient.chat({
    messages: [
      { role: 'system', content: CONFRONTATIONAL_COACH_PROMPT },
      { role: 'user', content: `${userMessage}\n\nActual metrics: ${JSON.stringify(metrics)}` }
    ],
  });
  
  return {
    aiResponse: response.content,
    confrontational: detectConfrontation(response.content),
    metrics,
  };
};
```

---

#### US-APP-003: AI Confrontation on Screentime
**As a** user tracked falling short  
**I want to** be called out when my screentime contradicts my goals  
**So that** I'm forced to confront my behavior

**Acceptance Criteria:**
- [ ] App tracks daily screentime via OS API (iOS Screen Time / Android Digital Wellbeing)
- [ ] If screentime >50 hours/week AND goals are "active", trigger confrontation
- [ ] AI message: "You say you want [Goal X], but your screentime this week is 87 hours. That's 12 hours/day. What is going on?"
- [ ] User must respond to dismiss (can't ignore)
- [ ] AI suggests specific changes: "Block Instagram 8-10 AM. Use that time for [related timeblock]."
- [ ] Confrontation logged with user's response

**Technical Notes:**
```typescript
// Screentime tracking (platform-specific)
import { getScreenTime } from 'expo-screen-time'; // Hypothetical module

const checkScreentimeThreshold = async () => {
  const screentime = await getScreenTime({ period: 'week' });
  const activeGoals = await db.goals.findMany({ where: { status: 'active' } });
  
  if (screentime.hours > 50 && activeGoals.length > 0) {
    triggerConfrontation({
      type: 'screentime',
      data: { hours: screentime.hours, goals: activeGoals },
    });
  }
};
```

---

#### US-APP-004: AI Chat Interface
**As a** user needing guidance  
**I want to** chat with my AI coach anytime  
**So that** I can get immediate feedback on plans or problems

**Acceptance Criteria:**
- [ ] Chat icon accessible from all screens (floating button)
- [ ] Opens full-screen chat interface
- [ ] Shows conversation history (last 30 days)
- [ ] User can type or use voice input
- [ ] AI responds in <3 seconds (streaming for long responses)
- [ ] AI has context of: all goals, recent timeblocks, todos, completion rates
- [ ] AI can suggest adding timeblocks: "Block 2 hours tomorrow for [goal milestone]"
- [ ] Suggested timeblocks appear as "Add to schedule" buttons

**Technical Notes:**
```typescript
// AI chat with full context
const chatWithAI = async (message: string, conversationId: string) => {
  const context = await buildUserContext(); // goals, metrics, recent activity
  
  const response = await aiClient.chat({
    messages: [
      { role: 'system', content: buildSystemPrompt(context) },
      ...conversationHistory,
      { role: 'user', content: message }
    ],
    stream: true, // Stream response for better UX
  });
  
  return response;
};

const buildSystemPrompt = (context: UserContext) => `
You are KRONOS, an AI life coach for the unreasonably ambitious.
User's goals: ${context.goals.map(g => g.title).join(', ')}
This week's stats: ${context.metrics.timeblockCompletionRate}% timeblocks completed, ${context.metrics.screentimeHours}hrs screentime.
Be direct. Call out bullshit. Push for asymmetric outcomes.
`;
```

---

#### US-APP-005: Goal Progress Tracking
**As a** user with active goals  
**I want to** see my progress toward each goal  
**So that** I know where I stand

**Acceptance Criteria:**
- [ ] Goals screen shows all 10 goals as cards
- [ ] Each card: Title, progress bar (% milestones completed), days remaining
- [ ] Tap goal opens detail view with: milestones list, AI-generated action items, related timeblocks
- [ ] Progress bar color: Green (>75%), Yellow (50-75%), Red (<50%)
- [ ] AI updates action items weekly based on progress
- [ ] Swipe to complete milestone (shows confetti animation)

---

### Category Management

#### US-APP-006: Create Custom Category
**As a** user  
**I want to** create a custom category with a name and color  
**So that** I can organize my timeblocks by type of activity

**Acceptance Criteria:**
- [ ] Tap "+" button in categories screen opens modal
- [ ] Modal contains: text input (20 char max), color picker (8 colors)
- [ ] Input has character counter: "12/20"
- [ ] Color picker shows all 8 colors in 2x4 grid
- [ ] Selected color has border indicator
- [ ] "Save" button disabled until name entered
- [ ] On save: modal closes, category appears in list
- [ ] Category saved to SQLite with UUID, timestamp
- [ ] Toast confirmation: "Category created"

**Technical Notes:**
```typescript
// Validation
- name: trim(), 1-20 chars, no special chars except spaces/hyphens
- color: enum validation against TimeblockColor type
- Duplicate check: case-insensitive name comparison
```

---

#### US-APP-002: Edit Existing Category
**As a** user  
**I want to** edit a category's name or color  
**So that** I can refine my organization system

**Acceptance Criteria:**
- [ ] Long press category card opens edit modal
- [ ] Modal pre-filled with current name and color
- [ ] Changes save immediately on "Save" tap
- [ ] All associated timeblocks update in real-time
- [ ] Optimistic UI update before DB write
- [ ] Toast confirmation: "Category updated"

**Technical Notes:**
```typescript
// Transaction handling
- Update category record
- Invalidate timeblock query cache
- Re-render affected timeblocks with new color
```

---

#### US-APP-003: Delete Category
**As a** user  
**I want to** delete a category I no longer need  
**So that** my category list stays clean

**Acceptance Criteria:**
- [ ] Swipe left on category card reveals "Delete" button
- [ ] Tap delete shows confirmation alert
- [ ] Alert text: "Delete '[Category Name]'? All associated timeblocks will become uncategorized."
- [ ] Options: "Cancel", "Delete" (red/destructive)
- [ ] On confirm: category deleted, timeblocks set to null categoryId
- [ ] Undo option via toast (5 second window)
- [ ] Toast: "Category deleted. Undo"

**Technical Notes:**
```typescript
// Cascading update
- Set timeblocks.categoryId = null WHERE categoryId = [deletedId]
- Delete category record
- Store deleted category in memory for undo window
- Clear undo cache after 5 seconds
```

---

### Timeblock Creation & Management

#### US-APP-004: Create Timeblock with Duration Input
**As a** user  
**I want to** create a timeblock by entering duration in minutes or hours  
**So that** I can quickly block out time for activities

**Acceptance Criteria:**
- [ ] Tap "+" FAB on dashboard opens create modal
- [ ] Modal fields: Title, Category picker, Duration input, Start time picker
- [ ] Duration input accepts: "30", "1.5", "90m", "1h 30m", "1:30"
- [ ] Duration normalized to minutes on blur
- [ ] Display format: "1h 30m" or "45m"
- [ ] Start time picker: scrollable time selector (15min increments)
- [ ] End time calculated and displayed automatically
- [ ] "Create" button creates timeblock at specified time
- [ ] New timeblock appears on calendar immediately

**Technical Notes:**
```typescript
// Duration normalization function
function normalizeDuration(input: string): number {
  // "1.5" → 90
  // "90m" → 90
  // "1h 30m" → 90
  // "1:30" → 90
  const patterns = [
    /^(\d+)$/,                      // "90"
    /^(\d+\.?\d*)$/,                // "1.5"
    /^(\d+)m$/,                     // "90m"
    /^(\d+)h\s*(\d+)m$/,           // "1h 30m"
    /^(\d+):(\d+)$/,               // "1:30"
  ];
  
  // Parse and return minutes
  // Validation: 1-1440 minutes (max 24 hours)
}
```

---

#### US-APP-005: Drag and Drop Timeblock Placement
**As a** user  
**I want to** drag a timeblock to any time slot in the day  
**So that** I can visually arrange my schedule

**Acceptance Criteria:**
- [ ] Long press timeblock (200ms) activates drag mode
- [ ] Haptic feedback on drag start
- [ ] Timeblock lifts with scale animation (1.05x) and shadow
- [ ] Dragging snaps to 15-minute intervals
- [ ] Visual indicator shows target time slot (ghost outline)
- [ ] Other timeblocks shift to avoid overlap
- [ ] Release gesture places timeblock at new time
- [ ] Smooth animation (300ms) to final position
- [ ] Start/end times update in database
- [ ] If overlaps existing block, show alert: "Overlap detected. Adjust?"

**Technical Notes:**
```typescript
// Gesture handling with Reanimated
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, { 
  useAnimatedStyle, 
  useSharedValue,
  withSpring,
  runOnJS 
} from 'react-native-reanimated';

// Snap to grid function
function snapToGrid(yPosition: number, gridSize: number): number {
  return Math.round(yPosition / gridSize) * gridSize;
}

// Collision detection
function detectOverlap(block1: TimeBlock, block2: TimeBlock): boolean {
  return block1.endTime > block2.startTime && 
         block1.startTime < block2.endTime;
}
```

---

#### US-APP-006: Duplicate Timeblock
**As a** user  
**I want to** duplicate a timeblock  
**So that** I can quickly create recurring blocks without re-entering details

**Acceptance Criteria:**
- [ ] Tap timeblock opens detail view/menu
- [ ] Menu option: "Duplicate"
- [ ] Duplicate appears directly below original
- [ ] Duration preserved, start time = original end time
- [ ] Title appended with " (Copy)" if same day
- [ ] All todos duplicated but marked incomplete
- [ ] Category preserved
- [ ] Can drag duplicate immediately after creation

**Technical Notes:**
```typescript
// Duplication logic
async function duplicateTimeblock(original: TimeBlock): Promise<TimeBlock> {
  const newBlock: TimeBlock = {
    ...original,
    id: generateUUID(),
    startTime: original.endTime,
    endTime: addMinutes(original.endTime, original.durationMinutes),
    title: shouldAppendCopy(original) ? `${original.title} (Copy)` : original.title,
    todos: original.todos.map(todo => ({
      ...todo,
      id: generateUUID(),
      completed: false,
      timeblockId: newBlockId,
    })),
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  
  await database.insert('timeblocks', newBlock);
  return newBlock;
}
```

---

#### US-APP-007: Edit Timeblock Details
**As a** user  
**I want to** modify a timeblock's title, duration, or category  
**So that** I can adjust my schedule as needed

**Acceptance Criteria:**
- [ ] Tap timeblock opens edit modal (same as create modal, pre-filled)
- [ ] All fields editable
- [ ] Changes save on "Save" tap
- [ ] Duration change triggers time recalculation
- [ ] Category change updates color immediately
- [ ] Visual update animates smoothly
- [ ] Toast confirmation: "Updated"

---

#### US-APP-008: Delete Timeblock
**As a** user  
**I want to** remove a timeblock  
**So that** I can clear cancelled or completed activities

**Acceptance Criteria:**
- [ ] Swipe left on timeblock reveals "Delete" button
- [ ] Tap delete immediately removes with fade-out animation (300ms)
- [ ] Associated todos also deleted (cascade)
- [ ] Toast with undo: "Timeblock deleted. Undo" (5s window)
- [ ] Undo restores timeblock and todos

---

### Dashboard & Calendar View

#### US-APP-009: View Today's Schedule
**As a** user  
**I want to** see my daily schedule as a calendar view  
**So that** I can visualize how my day is structured

**Acceptance Criteria:**
- [ ] Dashboard shows current day by default (e.g., "Monday, Feb 19")
- [ ] Time column on left: 00:00 - 23:59 (24-hour format)
- [ ] Time intervals: Every hour marked, 15-min grid lines (faint)
- [ ] Timeblocks displayed at correct vertical position
- [ ] Block height proportional to duration (1 hour = 60px)
- [ ] Color-coded by category (translucent background)
- [ ] Title visible if block ≥30 minutes, otherwise icon only
- [ ] Current time indicator: red horizontal line moving in real-time
- [ ] Scroll to current time on load
- [ ] Smooth scroll performance (60 FPS)

**Technical Notes:**
```typescript
// Time positioning calculation
const HOUR_HEIGHT = 60; // pixels per hour
const MINUTE_HEIGHT = HOUR_HEIGHT / 60; // 1px per minute

function calculateYPosition(time: Date): number {
  const minutes = time.getHours() * 60 + time.getMinutes();
  return minutes * MINUTE_HEIGHT;
}

function calculateBlockHeight(durationMinutes: number): number {
  return durationMinutes * MINUTE_HEIGHT;
}
```

---

#### US-APP-010: Navigate Between Days
**As a** user  
**I want to** swipe to view previous/next days  
**So that** I can plan ahead or review past schedules

**Acceptance Criteria:**
- [ ] Swipe left: Next day
- [ ] Swipe right: Previous day
- [ ] Smooth page animation (PagerView or custom gesture)
- [ ] Date header updates: "Tuesday, Feb 20"
- [ ] Timeblocks for selected date load immediately
- [ ] Optimistic loading: Show skeleton for next day
- [ ] Infinite scroll (±30 days cached)
- [ ] Today indicator in header: "Today" badge if viewing current day

---

#### US-APP-011: Current Time Indicator
**As a** user  
**I want to** see a visual marker for the current time  
**So that** I know where I am in my schedule

**Acceptance Criteria:**
- [ ] Red horizontal line across calendar
- [ ] Small circle indicator on left edge
- [ ] Updates every minute
- [ ] Only visible on today's view
- [ ] Z-index above timeblocks

**Technical Notes:**
```typescript
// Real-time update with useEffect
useEffect(() => {
  const interval = setInterval(() => {
    setCurrentTime(new Date());
  }, 60000); // Update every minute
  
  return () => clearInterval(interval);
}, []);
```

---

### To-Do List Management

#### US-APP-012: Add Todo to Timeblock
**As a** user  
**I want to** create a to-do item within a timeblock  
**So that** I can track specific tasks during that block

**Acceptance Criteria:**
- [ ] Tap timeblock opens detail view
- [ ] "Add todo" input at bottom of modal
- [ ] Type text, press enter to create
- [ ] Todo appears in list immediately
- [ ] Checkbox unchecked by default
- [ ] Empty input = no creation (validation)
- [ ] Maximum 50 todos per timeblock

**Technical Notes:**
```typescript
interface Todo {
  id: string;
  text: string;
  completed: boolean;
  timeblockId: string;
  categoryId: string; // Inherited from parent timeblock
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

// Auto-assign order based on array length
const newTodo = {
  ...todoData,
  order: existingTodos.length,
};
```

---

#### US-APP-013: Check Off Todo
**As a** user  
**I want to** mark a todo as complete  
**So that** I can track my progress

**Acceptance Criteria:**
- [ ] Tap checkbox toggles completed state
- [ ] Smooth animation: checkmark fades in (200ms)
- [ ] Completed todos get strikethrough text
- [ ] Text color changes to gray (#A3A3A3)
- [ ] State persists to database immediately
- [ ] Haptic feedback on completion

**Technical Notes:**
```typescript
// Optimistic update pattern
const toggleTodo = async (todoId: string) => {
  // 1. Update UI immediately
  setTodos(todos => 
    todos.map(t => t.id === todoId ? {...t, completed: !t.completed} : t)
  );
  
  // 2. Update database
  await database.update('todos', todoId, { completed: !todo.completed });
  
  // 3. On error, revert UI
  // Error handling logic here
};
```

---

#### US-APP-014: Reorder Todos via Drag
**As a** user  
**I want to** drag todos to reorder them within a timeblock  
**So that** I can prioritize tasks

**Acceptance Criteria:**
- [ ] Long press todo item (200ms) activates drag
- [ ] Item lifts with visual feedback (shadow, slight scale)
- [ ] Drag vertically within todo list
- [ ] Other items shift to make space
- [ ] Release drops item in new position
- [ ] Order values updated in database
- [ ] Smooth animations (300ms spring)

**Technical Notes:**
```typescript
// Draggable list implementation
import DraggableFlatList from 'react-native-draggable-flatlist';

<DraggableFlatList
  data={todos}
  onDragEnd={({ data }) => {
    // Update order values
    const reorderedTodos = data.map((todo, index) => ({
      ...todo,
      order: index,
    }));
    
    updateTodosOrder(reorderedTodos);
  }}
  keyExtractor={item => item.id}
  renderItem={renderTodoItem}
/>
```

---

#### US-APP-015: Move Todo to Different Timeblock
**As a** user  
**I want to** reassign a todo to another timeblock or category  
**So that** I can reorganize tasks as plans change

**Acceptance Criteria:**
- [ ] Long press todo opens context menu
- [ ] Menu option: "Move to..."
- [ ] Modal shows list of timeblocks for the day
- [ ] Tap timeblock moves todo
- [ ] Todo inherits category from new parent timeblock
- [ ] Visual feedback: Slide animation from old to new position
- [ ] Toast: "Moved to [Timeblock Title]"

---

#### US-APP-016: Delete Todo
**As a** user  
**I want to** remove a todo  
**So that** I can clean up my task list

**Acceptance Criteria:**
- [ ] Swipe left on todo reveals "Delete"
- [ ] Tap delete immediately removes with fade animation
- [ ] No confirmation required (undo available)
- [ ] Toast with undo: "Todo deleted. Undo" (5s)

---

### Data Persistence & Sync

#### US-APP-017: Automatic Data Persistence
**As a** developer  
**I want** all data saved locally via SQLite  
**So that** the app works offline and data persists between sessions

**Acceptance Criteria:**
- [ ] SQLite database initialized on app launch
- [ ] All create/update/delete operations write to DB
- [ ] Writes are atomic (transactions)
- [ ] Foreign key constraints enforced
- [ ] Migration system for schema changes
- [ ] Database backed up daily to AsyncStorage

**Technical Notes:**
```typescript
// Database schema
CREATE TABLE categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  color TEXT NOT NULL,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE TABLE timeblocks (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  category_id TEXT,
  start_time TEXT NOT NULL,
  end_time TEXT NOT NULL,
  duration_minutes INTEGER NOT NULL,
  date TEXT NOT NULL,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
);

CREATE TABLE todos (
  id TEXT PRIMARY KEY,
  text TEXT NOT NULL,
  completed INTEGER NOT NULL DEFAULT 0,
  timeblock_id TEXT NOT NULL,
  category_id TEXT,
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  FOREIGN KEY (timeblock_id) REFERENCES timeblocks(id) ON DELETE CASCADE,
  FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
);

// Indexes for performance
CREATE INDEX idx_timeblocks_date ON timeblocks(date);
CREATE INDEX idx_todos_timeblock ON todos(timeblock_id);
```

---

## UI/UX Specifications

### Dashboard Layout

```
┌─────────────────────────────────────┐
│  Monday, Feb 19      🔍  ⚙️         │ ← Header (56px)
├─────────────────────────────────────┤
│ 00:00 ┊                             │
│ 01:00 ┊                             │
│ 02:00 ┊                             │
│ 03:00 ┊                             │
│ 04:00 ┊                             │
│ 05:00 ┊                             │
│ 06:00 ┊                             │
│ 07:00 ┊  ┌──────────────────────┐  │
│ 08:00 ┊  │  Morning Routine     │  │ ← Timeblock (green)
│       ┊  │  🏃 Exercise         │  │
│ 09:00 ┊  └──────────────────────┘  │
│       ┊  ┌──────────────────────┐  │
│ 10:00 ┊  │  Deep Work           │  │ ← Timeblock (blue)
│       ┊  │  ☐ Review PRD        │  │
│ 11:00 ┊  │  ☐ Code feature      │  │
│       ┊  └──────────────────────┘  │
│ 12:00 ┊                             │
│ 13:00 ── [Current Time Line] ───── │
│ 14:00 ┊                             │
...
└─────────────────────────────────────┘
                                  [+] ← FAB (Create)
```

### Timeblock Component

```typescript
<TimeBlock
  backgroundColor={colors.timeblockColors[category.color]}
  borderColor={colors.timeblockBorders[category.color]}
  height={calculateBlockHeight(durationMinutes)}
  top={calculateYPosition(startTime)}
>
  <TimeBlock.Header>
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.time}>{startTime} - {endTime}</Text>
  </TimeBlock.Header>
  
  <TimeBlock.TodoList>
    {todos.map(todo => (
      <TodoItem key={todo.id} todo={todo} />
    ))}
  </TimeBlock.TodoList>
</TimeBlock>
```

### Animations & Gestures

#### Drag-and-Drop Animation
```typescript
const dragGesture = Gesture.Pan()
  .onStart(() => {
    // Lift animation
    scale.value = withSpring(1.05);
    shadowOpacity.value = withSpring(0.3);
  })
  .onUpdate((event) => {
    // Follow finger
    translateY.value = event.translationY;
    // Snap to grid
    const snappedY = snapToGrid(translateY.value, 15); // 15min intervals
  })
  .onEnd(() => {
    // Drop animation
    translateY.value = withSpring(finalPosition);
    scale.value = withSpring(1);
    shadowOpacity.value = withSpring(0.1);
    
    // Update database
    runOnJS(updateTimeblock)(newStartTime);
  });
```

#### Modal Presentation
```typescript
// Sheet modal from bottom
const modalAnimation = {
  enter: {
    translateY: 0,
    opacity: 1,
    duration: 300,
    easing: Easing.out(Easing.cubic),
  },
  exit: {
    translateY: screenHeight,
    opacity: 0,
    duration: 250,
    easing: Easing.in(Easing.cubic),
  }
};
```

---

## Performance Requirements

### Rendering Performance
- **Frame rate**: 60 FPS minimum during scrolling and gestures
- **Time to interactive**: <2 seconds on app launch
- **Memory usage**: <150MB on iOS, <200MB on Android

### Data Operations
- **Timeblock creation**: <100ms from tap to UI update
- **Database queries**: <50ms for daily timeblocks fetch
- **Drag gesture response**: <16ms frame time (60 FPS)

### Optimization Strategies
```typescript
// Virtualized list for long calendars
import { FlashList } from '@shopify/flash-list';

// Memoization for expensive computations
const memoizedTimeblocks = useMemo(() => 
  calculateTimeblockPositions(timeblocks),
  [timeblocks]
);

// Debounced database writes
const debouncedUpdate = useMemo(
  () => debounce((data) => database.update(data), 500),
  []
);
```

---

## Error Handling & Edge Cases

### Validation Rules
- Category name: 1-20 characters, trim whitespace
- Timeblock title: Required, 1-100 characters
- Duration: 1-1440 minutes (1min to 24 hours)
- Time range: Cannot exceed 24-hour period
- Todos per timeblock: Maximum 50

### Overlap Handling
```typescript
// When dragging timeblock creates overlap
if (detectOverlap(movingBlock, existingBlock)) {
  // Option 1: Show alert
  Alert.alert(
    'Schedule Conflict',
    'This timeblock overlaps with another. Adjust the time?',
    [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Adjust', onPress: () => autoAdjustTimes() }
    ]
  );
  
  // Option 2: Auto-adjust (push other blocks)
  shiftOverlappingBlocks(movingBlock);
}
```

### Error States
- Empty state: "No timeblocks yet. Tap + to get started"
- Network error (if sync enabled): "Offline mode. Changes will sync when online"
- Database error: "Unable to save. Please restart app"

---

## Acceptance Criteria (Full App)

### Visual Design
- [ ] All components follow design system exactly
- [ ] Timeblocks have correct translucent appearance (like highlighter)
- [ ] Monochrome base (black/white/gray) with colorful blocks only
- [ ] Glassmorphism effects on modals/cards
- [ ] No cheap or template-like visuals
- [ ] Smooth 60 FPS animations

### Functionality
- [ ] Create/edit/delete categories with custom names and colors
- [ ] Create timeblocks with flexible duration input (normalize to minutes)
- [ ] Drag-and-drop timeblock placement with 15-min snapping
- [ ] Duplicate timeblocks with all properties preserved
- [ ] Add/check/reorder/delete todos within timeblocks
- [ ] Navigate between days via swipe
- [ ] View daily schedule as calendar with time column
- [ ] Current time indicator (red line) on today's view
- [ ] All data persists locally (SQLite + AsyncStorage)

### Performance
- [ ] App launches in <2 seconds
- [ ] Smooth scrolling (60 FPS)
- [ ] Gestures responsive (<16ms frame time)
- [ ] No jank or visual glitches
- [ ] Memory usage within limits

### Code Quality
- [ ] TypeScript strict mode, no `any` types
- [ ] All components have proper types/interfaces
- [ ] Error boundaries implemented
- [ ] Comprehensive error handling
- [ ] Unit tests for core logic (≥80% coverage)
- [ ] Integration tests for critical flows

---

## Out of Scope (MVP)

These features are NOT included in initial version:
- Multi-device sync / cloud backup
- Recurring timeblocks
- Weekly/monthly views
- Calendar import/export
- Collaboration features
- Notifications/reminders
- Analytics/insights
- Dark mode (use monochrome as base, add later)

---

## Engineer Mindset Activation

**You are a world-class senior mobile engineer with 10+ years of React Native experience. You have built production apps used by millions. You take immense pride in:**

### 1. **Craftsmanship**
- Every pixel is intentional. Spacing, colors, borders - nothing is approximate.
- Animations are smooth, purposeful, and delightful. No janky transitions.
- The drag-and-drop feels tactile and responsive, like moving physical objects.

### 2. **Performance Obsession**
- You profile every interaction. Gesture handlers run on the UI thread.
- Lists are virtualized. Heavy computations are memoized or moved off the main thread.
- The app feels instant. No loading spinners for local operations.

### 3. **Architecture Excellence**
- State management is clean. No prop drilling, no useState hell.
- Components are small, focused, reusable. Each has a single responsibility.
- File structure is logical. Any developer can find what they need in 10 seconds.

### 4. **Type Safety**
- Every function, component, and API call is fully typed.
- No `any` types. No implicit types. No type assertions unless absolutely necessary.
- The compiler is your first line of defense.

### 5. **User Experience**
- Gestures feel natural. Long press durations are tested. Snap targets are intuitive.
- Error states are helpful, not frustrating. Users always know what to do next.
- The app respects user time. Autosave is instant. No "Are you sure?" for reversible actions.

### 6. **Code Readability**
- Variable names are descriptive: `timeblockStartYPosition`, not `y`.
- Functions do one thing well: `calculateBlockHeight()`, not `doCalc()`.
- Comments explain *why*, not *what*. The code itself is self-documenting.

### 7. **Premium Polish**
- The app doesn't just work - it feels expensive.
- Color choices are deliberate. The translucent timeblocks actually look like highlighter.
- The monochrome base isn't "black text on white background" - it's a carefully balanced palette.

---

## Development Phases

### Phase 1: Core Infrastructure (Week 1-2)
- [ ] Expo project setup with TypeScript
- [ ] Design system implementation (colors, typography, spacing)
- [ ] Database schema and services
- [ ] State management (Zustand stores)
- [ ] Navigation structure (Expo Router)

### Phase 2: Dashboard & Calendar (Week 3-4)
- [ ] Time column layout
- [ ] Day view rendering
- [ ] Current time indicator
- [ ] Day navigation (swipe)
- [ ] Scroll to current time

### Phase 3: Timeblock Management (Week 5-6)
- [ ] Create timeblock modal
- [ ] Duration input with normalization
- [ ] Category picker
- [ ] Timeblock rendering on calendar
- [ ] Edit/delete functionality

### Phase 4: Drag-and-Drop (Week 7-8)
- [ ] Gesture handlers setup
- [ ] Drag animation
- [ ] Snap to grid logic
- [ ] Overlap detection
- [ ] Position persistence

### Phase 5: Categories (Week 9)
- [ ] Category CRUD operations
- [ ] Color picker component
- [ ] Categories screen
- [ ] Category assignment to timeblocks

### Phase 6: To-Do Lists (Week 10-11)
- [ ] Todo item component
- [ ] Add/check/delete todos
- [ ] Todo reordering (drag)
- [ ] Todo assignment to timeblocks
- [ ] Todo state persistence

### Phase 7: Polish & Testing (Week 12)
- [ ] Animation refinement
- [ ] Error handling
- [ ] Empty states
- [ ] Unit tests
- [ ] Integration tests
- [ ] Performance optimization

---

## Success Metrics

### Technical KPIs
- **Test Coverage**: ≥80%
- **Type Coverage**: 100% (no implicit any)
- **Bundle Size**: <5MB
- **Crash-Free Rate**: ≥99.9%
- **ANR Rate**: <0.1%

### UX KPIs
- **Time to create timeblock**: <30 seconds
- **Drag-and-drop success rate**: ≥95%
- **Task completion rate**: Measured by todos checked off

---

## Final Notes

This PRD is your blueprint for building a **premium mobile productivity app**. Not a prototype. Not an MVP with compromises. A polished, production-ready application that users would pay for.

Every decision should be weighed against: **"Would Apple ship this?"**

- Would Apple allow jank in drag gestures? No.
- Would Apple use random colors without a design system? No.
- Would Apple ship untested code? No.

**You are building KRONOS to that standard. Make it exceptional.**