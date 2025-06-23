Project Url: https://roadmap.sh/projects/task-tracker


# ✅ Task Tracker CLI

A lightweight CLI-based task management tool built with Node.js and TypeScript.  
You can add, update, delete, list, and mark tasks with statuses like `todo`, `in-progress`, or `done`.

---

## 📦 Setup

1. **Clone the Repository**

   ```bash
   git clone <your-repo-url>
   cd <your-project-folder>
   ```

2. **Install Dependencies**

   ```bash
   pnpm install
   ```

3. **Run with ts-node-dev (Development)**

   ```bash
   pnpm dev <command> [arguments]
   ```

4. **Run Compiled JS (After Build)**
   ```bash
   pnpm build
   node dist/index.js <command> [arguments]
   ```

---

## 🚀 Commands

### ➕ Add a Task

```bash
pnpm dev add <task description>
```

**Example:**

```bash
pnpm dev add Buy groceries
```

---

### 📝 Update a Task

```bash
pnpm dev update <taskId> <new task description>
```

**Example:**

```bash
pnpm dev update 2 Pick up laundry from the store
```

---

### 🗑️ Delete a Task

```bash
pnpm dev delete <taskId>
```

**Example:**

```bash
pnpm dev delete 3
```

---

### 📋 List Tasks

```bash
pnpm dev list [status]
```

- Status can be: `todo`, `in-progress`, `done`
- If no status is provided, all tasks are shown.

**Examples:**

```bash
pnpm dev list           # Lists all tasks
pnpm dev list todo      # Lists only 'todo' tasks
```

---

### 🔄 Mark Task Status

#### Mark as In-Progress

```bash
pnpm dev mark-in-progress <taskId>
```

#### Mark as Done

```bash
pnpm dev mark-as-done <taskId>
```

#### Mark as Todo

```bash
pnpm dev mark-todo <taskId>
```

**Example:**

```bash
pnpm dev mark-as-done 2
```

---

## 🗃️ Task File Storage

Tasks are saved in `tasks.json` in the project directory.  
Each task has the following structure:

```json
{
  "id": 1,
  "description": "Example task",
  "status": "todo",
  "createdAt": "2025-06-23T11:00:00.000Z",
  "updatedAt": "2025-06-23T11:00:00.000Z"
}
```

---

## ⚠️ Validation & Errors

- `taskDescription` is required and cannot be `"hello"`
- `taskId` must be a positive number
- Invalid commands or missing arguments will show appropriate error messages

---

## 🛠 Tech Stack

- Node.js
- TypeScript
- Zod (input validation)
- fs module (file storage)

---

## 🧪 Coming Soon / Ideas

- [ ] Task search by keyword
- [ ] Task priority levels
- [ ] Due dates & reminders
- [ ] Export tasks to CSV

---

## 📄 License

MIT — free to use and modify.
