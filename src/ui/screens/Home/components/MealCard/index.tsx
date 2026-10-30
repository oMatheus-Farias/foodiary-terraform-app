import { AppStackNavigationProps } from '@app/navigation/AppStack';
import { SimplifiedMeal } from '@app/types/Meal';
import { useNavigation } from '@react-navigation/native';
import { AppText } from '@ui/components/AppText';
import { theme } from '@ui/styles/theme';
import { useMemo } from 'react';
import { Platform, Pressable, View } from 'react-native';

import { useHomeContext } from '../../contexts/useHomeContext';
import { styles } from './styles';

interface IMealCardProps {
  meal: SimplifiedMeal;
}

export function MealCard({ meal }: IMealCardProps) {
  const { navigate } = useNavigation<AppStackNavigationProps>();
  const { isLoading } = useHomeContext();

  const formattedFoods = useMemo(
    () => meal.foods.map((food) => food.name).join(', '),
    [meal.foods],
  );

  const summary = useMemo(
    () =>
      (meal?.foods || []).reduce(
        (acc, food) => {
          const proteinsCalories = food.proteins * 4;
          const carbohydratesCalories = food.carbohydrates * 4;
          const fatsCalories = food.fats * 9;
          const totalCalories = Math.round(proteinsCalories + carbohydratesCalories + fatsCalories);

          return {
            calories: acc.calories + totalCalories,
            proteins: acc.proteins + food.proteins,
            carbohydrates: acc.carbohydrates + food.carbohydrates,
            fats: Math.round(acc.fats + food.fats),
          };
        },
        { calories: 0, proteins: 0, carbohydrates: 0, fats: 0 },
      ),
    [meal.foods],
  );

  function handleNavigate() {
    navigate('MealDetails', { mealId: meal.id });
  }

  return (
    <View style={[styles.container, isLoading && { opacity: 0.5 }]}>
      <AppText color={theme.colors.gray[700]}>{formatTime(meal.createdAt)}</AppText>

      <View style={styles.wrapper}>
        <Pressable
          disabled={isLoading}
          onPress={handleNavigate}
          android_ripple={{ color: 'rgba(0, 0, 0, 0.1)', foreground: true }}
          style={({ pressed }) => [
            styles.card,
            isLoading || (pressed && Platform.OS === 'ios') ? { opacity: 0.5 } : undefined,
          ]}
        >
          <View style={styles.header}>
            <View style={styles.icon}>
              <AppText>{meal.icon}</AppText>
            </View>

            <View style={styles.mealDetails}>
              <AppText size="sm" color={theme.colors.gray[700]} numberOfLines={1}>
                {meal.name}
              </AppText>
              <AppText weight="medium" numberOfLines={1}>
                {formattedFoods}
              </AppText>
            </View>
          </View>

          <View style={styles.body}>
            <View style={styles.mealStatsRow}>
              <View style={styles.mealStat}>
                <AppText color={theme.colors.support.tomato} weight="medium">
                  {summary.calories}
                </AppText>
                <AppText color={theme.colors.gray[700]}>Kcal</AppText>
              </View>

              <View style={styles.mealStat}>
                <AppText color={theme.colors.support.teal} weight="medium">
                  {summary.proteins}g
                </AppText>
                <AppText color={theme.colors.gray[700]}>Proteínas</AppText>
              </View>
            </View>

            <View style={styles.mealStatsRow}>
              <View style={styles.mealStat}>
                <AppText color={theme.colors.support.yellow} weight="medium">
                  {summary.carbohydrates}g
                </AppText>
                <AppText color={theme.colors.gray[700]}>Carboidratos</AppText>
              </View>

              <View style={styles.mealStat}>
                <AppText color={theme.colors.support.orange} weight="medium">
                  {summary.fats}g
                </AppText>
                <AppText color={theme.colors.gray[700]}>Gorduras</AppText>
              </View>
            </View>
          </View>
        </Pressable>
      </View>
    </View>
  );
}

function formatTime(date: Date) {
  const BRAZIL_TIME_OFFSET = 3;

  const hours = (date.getHours() - BRAZIL_TIME_OFFSET).toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  return `${hours}h${minutes}`;
}
