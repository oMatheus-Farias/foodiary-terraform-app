import * as z from 'zod/mini';

const schema = z.object({
  EXPO_PUBLIC_API_URL: z.url(),
});

const parsedEnv = schema.parse(process.env);

export const env = {
  api: {
    url: parsedEnv.EXPO_PUBLIC_API_URL,
  },
};
