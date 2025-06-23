import fs from 'fs';
import path from 'path';
import { Task } from './types';

const filePath = path.join(__dirname, '/tasks.json');
const loadFile = () => {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, '[]');
  }
  const data = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(data);
};

const saveTask = (task: Task[]) => {
  fs.writeFileSync(filePath, JSON.stringify(task, null, 2));
};

export const handleAddCommand = (taskDescription: string) => {
  const existingData: Task[] = loadFile();
  const id =
    existingData.length === 0
      ? 1
      : existingData[existingData.length - 1].id + 1;
  const newTask: Task = {
    id,
    description: taskDescription,
    status: 'in-progress',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  const updatedTask: Task[] = [...existingData, newTask];
  saveTask(updatedTask);
};

export const handleUpdateCommand = (
  taskId: number,
  taskDescription: string
) => {
  const existingData: Task[] = loadFile();
  const existingTaskById = existingData.find((item) => item.id == taskId);
  if (!existingTaskById) {
    console.log(`Task with ID ${taskId} is not present or invalid`);
    process.exit(1);
  } else {
    const updatedData = existingData.map((item) => {
      return item.id == taskId
        ? { ...item, description: taskDescription }
        : item;
    });
    saveTask(updatedData);
  }
};

export const handleDeleteCommand = (taskId: number) => {
  const existingData: Task[] = loadFile();
  const isTaskExist = existingData.find((item) => item.id == taskId);
  if (!isTaskExist) {
    console.log('Invalid Task Id');
  }
  console.log(isTaskExist);
};
export const handleGetCommand = () => {};
