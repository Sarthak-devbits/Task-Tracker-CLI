import {
  handleAddCommand,
  handleDeleteCommand,
  handleGetCommand,
  handleMarkAsDone,
  handleMarkAsTodo,
  handleMarkInProgress,
  handleUpdateCommand,
} from './taskManager';
import { commandType, TaskStatus } from './types';
import { addCommandSchema, updateCommandSchema } from './validation/validate';

const validCommand = [
  'list',
  'add',
  'update',
  'delete',
  'mark-in-progress',
  'mark-as-done',
  'mark-todo',
] as commandType[];

const taskStatus = ['todo', 'in-progress', 'done'] as TaskStatus[];

const args = process.argv;
const command: commandType = args[2] as commandType;

if (!validCommand.includes(command)) {
  console.log('Invalid Command Operation');
  process.exit(1);
}

switch (command) {
  case 'add': {
    const taskDescription = args.splice(3).join(' ');
    const result = addCommandSchema.safeParse({
      taskDescription,
    });
    if (!result.success) {
      console.log('Taskname or Taskdescription is missing');
    }
    handleAddCommand(taskDescription);
    break;
  }
  case 'update': {
    const taskId = args[3] ? parseInt(args[3]) : -1;
    const taskDescription = args.splice(3).join(' ');
    const result = updateCommandSchema.safeParse({
      taskId,
      taskDescription,
    });

    if (!result.success) {
      console.log('TaskId or Taskdescription is missing');
    }
    handleUpdateCommand(taskId, taskDescription);
    break;
  }
  case 'delete': {
    const taskId = args[3] ? parseInt(args[3]) : -1;
    if (taskId == -1) {
      console.log('Please provide TaskId');
      process.exit(1);
    }
    handleDeleteCommand(taskId);
    break;
  }
  case 'list': {
    const status = args[3] as TaskStatus;
    if (!taskStatus.includes(status)) {
      console.log('Please eneter valid CLI expression');
    }
    handleGetCommand(status);
    break;
  }
  case 'mark-in-progress': {
    const taskId = args[3] ? parseInt(args[3]) : -1;
    handleMarkInProgress(taskId);
    break;
  }
  case 'mark-as-done': {
    const taskId = args[3] ? parseInt(args[3]) : -1;
    handleMarkAsDone(taskId);
    break;
  }
  case 'mark-todo': {
    const taskId = args[3] ? parseInt(args[3]) : -1;
    handleMarkAsTodo(taskId);
    break;
  }
  default:
    break;
}
