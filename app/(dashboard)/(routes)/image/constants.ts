import * as z from 'zod';

export const formSchema = z.object({
  prompt: z.string().min(1, { message: 'Prompt is required' }),
  amount: z.string().min(1),
  resolution: z.string().min(1),
});

export const amountOptions = Array.from({ length: 5 }, (_, index) => ({
  value: `${index + 1}`,
}));

export const resolutionOptions = Array.from({ length: 3 }, (_, index) => {
  const value = 256 * Math.pow(2, index);
  return {
    index,
    label: `${value}x${value}`
  };
});
