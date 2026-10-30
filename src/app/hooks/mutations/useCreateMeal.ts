import { getFileInfo } from '@app/lib/getFileInfo';
import { MealsService } from '@app/services/MealsService';
import { useMutation } from '@tanstack/react-query';

export function useCreateMeal() {
  const { mutateAsync, isPending, data } = useMutation({
    mutationFn: async (fileUri: string) => {
      const { filename, type, size } = await getFileInfo(fileUri);

      const { mealId } = await MealsService.createMeal({
        file: {
          name: filename,
          type,
          uri: fileUri,
          size,
        },
      });

      return { mealId };
    },
  });

  return {
    createMeal: mutateAsync,
    isLoading: isPending,
    createdMealId: data?.mealId,
  };
}
