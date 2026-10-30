import { useMeals } from '@app/hooks/queries/useMeals';
import { useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export function useHomeController() {
  const { top, bottom } = useSafeAreaInsets();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [date, setDate] = useState(new Date());

  const { meals, isInitialLoading, isLoading, reloadMeals } = useMeals(date);

  async function handleRefresh() {
    setIsRefreshing(true);
    await reloadMeals();
    setIsRefreshing(false);
  }

  function handlePreviousDay() {
    setDate((prevSate) => {
      const newDate = new Date(prevSate);
      newDate.setDate(prevSate.getDate() - 1);

      return newDate;
    });
  }

  function handleNextDay() {
    setDate((prevSate) => {
      const newDate = new Date(prevSate);
      newDate.setDate(prevSate.getDate() + 1);

      return newDate;
    });
  }

  return {
    isRefreshing,
    top,
    bottom,
    meals,
    date,
    isInitialLoading,
    isLoading: isLoading && !isRefreshing,
    handleRefresh,
    handlePreviousDay,
    handleNextDay,
  };
}
