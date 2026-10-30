import { MealsService } from '@app/services/MealsService';
import { useQuery } from '@tanstack/react-query';

export function useMeals(date: Date) {
  const formattedDate = date.toISOString().split('T')[0];

  const { data, isLoading, isFetching, refetch } = useQuery({
    queryKey: ['meals', formattedDate],
    queryFn: () => MealsService.getMealsByDate(formattedDate),
    placeholderData: (previousData) => previousData, // keep previous data while refetching
    staleTime: Infinity,
  });

  return {
    meals: data?.meals ?? [],
    isInitialLoading: isLoading,
    isLoading: isFetching,
    reloadMeals: refetch,
  };
}
