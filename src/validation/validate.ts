import z from 'zod';

export const addCommandSchema = z.object({
  taskDescription: z.string().min(1),
});

export const updateCommandSchema = z.object({
  taskId: z.number().min(1),
  taskDescription: z.string().min(1),
});
