// # Adding a new task
// task-cli add "Buy groceries"
// # Output: Task added successfully (ID: 1)

// # Updating and deleting tasks
// task-cli update 1 "Buy groceries and cook dinner"
// task-cli delete 1

// # Marking a task as in progress or done
// task-cli mark-in-progress 1
// task-cli mark-done 1

// # Listing all tasks
// task-cli list

// # Listing tasks by status
// task-cli list done
// task-cli list todo
// task-cli list in-progress

import {
  handleAddCommand,
  handleDeleteCommand,
  handleGetCommand,
  handleUpdateCommand,
} from './taskManager';
import { commandType } from './types';
import { addCommandSchema, updateCommandSchema } from './validation/validate';

const validCommand = ['list', 'add', 'update', 'delete'] as commandType[];
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
  case 'delete':
    const taskId = args[3] ? parseInt(args[3]) : -1;
    if (taskId == -1) {
      console.log('Please provide TaskId');
      process.exit(1);
    }
    handleDeleteCommand(taskId);
    break;
  case 'list':
    handleGetCommand();
    break;
  default:
    break;
}
