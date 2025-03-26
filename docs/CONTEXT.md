# Productivity App - User Flow & Features

## Overview
This document outlines the user flow and key features of the productivity app, designed to help users focus on one task at a time. The app uses AI to prioritize tasks and includes a Focus Mode to enhance concentration.

## Tech Stack
- Frontend: React Native with TypeScript, Expo, and Expo Router
- Backend/Database: Supabase
- UI Framework: React Native Paper
- AI Processing: DeepSeek

## App Flow

### 1. Welcome Screen
**Purpose:** Provide a clean and simple entry point for users, ensuring a smooth onboarding experience.

**Elements:**
- App logo and branding.
- Brief tagline explaining the app's value ("Stay focus, one task at a time!").
- Buttons for **Sign Up** and **Log In** options.

### 2. Sign-Up Process
**Purpose:** Securely register new users and create personalized accounts.

**Options:**:
- Email-based sign-up and login. 

**Elements:**
- Email input field.
- Password setup.
- Email verification (optional but recommended for security).
- Success message and automatic redirection to the **Main Dashboard**.

### 3. Main Dashboard
**Purpose:** Central hub for managing tasks and accessing key productivity features.

**Elements:**
- **Task List:** Sorted by AI priority.
- **Quick-Add Button:** Fast task creation.
- **AI Chat:** Users can communicate with AI to:
  - Add, edit, and prioritize tasks.
  - Get productivity tips and recommendations.
- **Task Filters:** Sort tasks by category, priority, or deadline.
- **Settings Menu:** Personalize user preferences and notifications.

### 4. Adding Tasks
**Purpose:** Allow users to efficiently capture and organize tasks.

**Elements:**
- **Quick-Add Field:** Enter task title and optional details.
- **AI Chat Input:** Conversational method to:
  - Generate task suggestions.
  - Modify existing tasks.
  - Get prioritization assistance.
- **Tags & Labels:** Users can categorize tasks for better organization.

### 5. Focus Mode
**Purpose:** Help users concentrate by eliminating distractions and tracking focused work sessions.

**Elements:**
- **Notification Blocking:** Automatically silences non-essential alerts.
- **Focus Timer:** Adjustable countdown (e.g., Pomodoro-style sessions).
- **Minimal UI:** Shows only essential task information.
- **Background Options:** White noise, ambient sounds, or silence.
- **Pause/Stop Controls:** Users can take breaks as needed.

### 6. Completing a Focus Session
**Purpose:** Provide motivation and insights on productivity after a focused work session.

**Elements:**
- **Progress Summary:** Displays time spent, tasks completed, and productivity streaks.
- **Achievement System:** Encourages consistent focus with badges and rewards.
- **Next Steps Options:**
  - Start another session.
  - Take a break.
  - Review insights and adjust plans.

## Additional Features

### AI-Powered Task Management
**Purpose:** Enhance task organization and prioritization using AI.

**Elements:**
- Automatic ranking of tasks based on:
  - Deadlines
  - Importance
  - User habits
- Smart recommendations for workflow optimization.

### Notification Blocking
**Purpose:** Reduce distractions and maintain deep focus.

**Elements:**
- Automatic disabling of notifications in **Focus Mode**.
- Customizable notification preferences.

### Session History & Analytics
**Purpose:** Provide users with insights into their productivity trends.

**Elements:**
- **Focus Time Tracker:** Logs all completed sessions.
- **Productivity Reports:** Weekly/monthly performance summaries.
- **Task Completion Stats:** Helps users measure progress.

## Database Schema

### Tables

#### users
- id: uuid (primary key)
- email: string (unique)
- password_hash: string
- created_at: timestamp
- last_login: timestamp
- notification_preferences: jsonb
- settings: jsonb

#### tasks
- id: uuid (primary key)
- user_id: uuid (foreign key -> users.id)
- title: string
- description: text
- priority: integer (1-5)
- status: enum ('todo', 'in_progress', 'completed')
- due_date: timestamp
- created_at: timestamp
- updated_at: timestamp
- tags: string[]
- ai_priority_score: float

#### focus_sessions
- id: uuid (primary key)
- user_id: uuid (foreign key -> users.id)
- task_id: uuid (foreign key -> tasks.id) 
- start_time: timestamp
- end_time: timestamp
- duration: integer (in minutes)
- completed: boolean
- notes: text

#### achievements
- id: uuid (primary key)
- user_id: uuid (foreign key -> users.id)
- type: string
- earned_at: timestamp
- metadata: jsonb

#### tags
- id: uuid (primary key)
- user_id: uuid (foreign key -> users.id)
- name: string
- color: string

## Project Structure
OneTaskAi/
└── app/
    ├── (authenticated)/
    │   └── dashboard.tsx
    ├── components/
    │   └── tasks/
    │       ├── TaskList.tsx
    │       ├── TaskItem.tsx
    │       └── AddTaskModal.tsx
    ├── hooks/
    │   ├── useAuth.ts
    │   └── useTasks.ts
    ├── types/
    │   └── task.ts
    ├── lib/
    │   └── supabase.ts
    └── config/
        └── index.ts

