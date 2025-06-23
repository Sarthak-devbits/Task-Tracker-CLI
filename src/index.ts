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
  console.log('❌ Error: Invalid command. Please use one of the following:');
  console.log(validCommand.join(', '));
  process.exit(1);
}

switch (command) {
  case 'add': {
    const taskDescription = args.splice(3).join(' ');
    const result = addCommandSchema.safeParse({
      taskDescription,
    });

    if (!result.success) {
      console.log(
        '❌ Error: Task description is required and cannot be empty.'
      );
      process.exit(1);
    }

    handleAddCommand(taskDescription);
    break;
  }

  case 'update': {
    const taskId = args[3] ? parseInt(args[3]) : -1;
    const taskDescription = args.splice(4).join(' ');

    const result = updateCommandSchema.safeParse({
      taskId,
      taskDescription,
    });

    if (!result.success) {
      console.log(
        '❌ Error: Task ID must be a positive number and description cannot be empty or "hello".'
      );
      process.exit(1);
    }

    handleUpdateCommand(taskId, taskDescription);
    break;
  }

  case 'delete': {
    const taskId = args[3] ? parseInt(args[3]) : -1;
    if (taskId === -1 || isNaN(taskId)) {
      console.log('❌ Error: Please provide a valid Task ID to delete.');
      process.exit(1);
    }
    handleDeleteCommand(taskId);
    break;
  }

  case 'list': {
    const status = args[3] as TaskStatus;
    if (!taskStatus.includes(status)) {
      console.log(
        '❌ Error: Please provide a valid status (todo, in-progress, done) to filter tasks.'
      );
      process.exit(1);
    }
    handleGetCommand(status);
    break;
  }

  case 'mark-in-progress': {
    const taskId = args[3] ? parseInt(args[3]) : -1;
    if (taskId === -1 || isNaN(taskId)) {
      console.log(
        '❌ Error: Please provide a valid Task ID to mark as in-progress.'
      );
      process.exit(1);
    }
    handleMarkInProgress(taskId);
    break;
  }

  case 'mark-as-done': {
    const taskId = args[3] ? parseInt(args[3]) : -1;
    if (taskId === -1 || isNaN(taskId)) {
      console.log('❌ Error: Please provide a valid Task ID to mark as done.');
      process.exit(1);
    }
    handleMarkAsDone(taskId);
    break;
  }

  case 'mark-todo': {
    const taskId = args[3] ? parseInt(args[3]) : -1;
    if (taskId === -1 || isNaN(taskId)) {
      console.log('❌ Error: Please provide a valid Task ID to mark as todo.');
      process.exit(1);
    }
    handleMarkAsTodo(taskId);
    break;
  }

  default:
    console.log('⚠️ Unknown command received.');
    break;
}
