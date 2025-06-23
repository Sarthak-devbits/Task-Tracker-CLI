import fs from 'fs';
import path from 'path';
import { Task, TaskStatus } from './types';

const filePath = path.join(__dirname, '/tasks.json');

const loadFile = (): Task[] => {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, '[]');
  }
  const data = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(data);
};

const saveTask = (tasks: Task[]) => {
  fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2));
};

export const handleAddCommand = (taskDescription: string) => {
  const existingData = loadFile();
  const id =
    existingData.length === 0
      ? 1
      : existingData[existingData.length - 1].id + 1;

  const newTask: Task = {
    id,
    description: taskDescription,
    status: 'todo',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  saveTask([...existingData, newTask]);
  console.log(`✅ Task added with ID ${id}`);
};

export const handleUpdateCommand = (
  taskId: number,
  taskDescription: string
) => {
  const existingData = loadFile();
  const task = existingData.find((item) => item.id === taskId);

  if (!task) {
    console.log(`❌ Task with ID ${taskId} not found.`);
    process.exit(1);
  }

  const updatedData = existingData.map((item) =>
    item.id === taskId
      ? {
          ...item,
          description: taskDescription,
          updatedAt: new Date().toISOString(),
        }
      : item
  );

  saveTask(updatedData);
  console.log(`✅ Task ID ${taskId} updated.`);
};

export const handleDeleteCommand = (taskId: number) => {
  const existingData = loadFile();
  const index = existingData.findIndex((item) => item.id === taskId);

  if (index === -1) {
    console.log(`❌ Task with ID ${taskId} not found.`);
    process.exit(1);
  }

  existingData.splice(index, 1);
  saveTask(existingData);
  console.log(`🗑️ Task ID ${taskId} deleted.`);
};

export const handleGetCommand = (status?: TaskStatus) => {
  const existingData = loadFile();

  if (status) {
    const filtered = existingData.filter((item) => item.status === status);
    console.log(`📋 Tasks with status '${status}':\n`, filtered);
  } else {
    console.log(`📋 All Tasks:\n`, existingData);
  }
};

const updateStatus = (taskId: number, status: TaskStatus) => {
  const existingData = loadFile();
  const task = existingData.find((item) => item.id === taskId);

  if (!task) {
    console.log(`❌ Task with ID ${taskId} not found.`);
    process.exit(1);
  }

  const updatedData = existingData.map((item) =>
    item.id === taskId
      ? { ...item, status, updatedAt: new Date().toISOString() }
      : item
  );

  saveTask(updatedData);
  console.log(`✅ Task ID ${taskId} marked as '${status}'.`);
};

export const handleMarkInProgress = (taskId: number) =>
  updateStatus(taskId, 'in-progress');
export const handleMarkAsTodo = (taskId: number) =>
  updateStatus(taskId, 'todo');
export const handleMarkAsDone = (taskId: number) =>
  updateStatus(taskId, 'done');
