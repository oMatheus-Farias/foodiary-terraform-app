import { Meal, MealInputType } from '@app/types/Meal';
import { useNavigation } from '@react-navigation/native';
import { AppText } from '@ui/components/AppText';
import { Button } from '@ui/components/Button';
import { theme } from '@ui/styles/theme';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { ChevronLeftIcon } from 'lucide-react-native';
import { Skeleton } from 'moti/skeleton';
import { useMemo } from 'react';
import { ImageBackground, StatusBar, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { styles } from './styles';

interface IHeaderProps {
  meal: Meal | undefined;
  isLoading: boolean;
}

export function Header({ meal, isLoading }: IHeaderProps) {
  const { top } = useSafeAreaInsets();
  const { goBack } = useNavigation();

  const isImageInput = meal?.inputType === MealInputType.PICTURE;

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
    [meal?.foods],
  );

  const percentages = useMemo(() => {
    const proteinCalories = summary.proteins * 4;
    const carbohydratesCalories = summary.carbohydrates * 4;
    const fatsCalories = summary.fats * 9;
    const totalCalories = proteinCalories + carbohydratesCalories + fatsCalories;

    if (totalCalories === 0) {
      return { proteinPercent: 0, carbPercent: 0, fatPercent: 0 };
    }

    return {
      proteinPercent: Math.round((proteinCalories / totalCalories) * 100),
      carbPercent: Math.round((carbohydratesCalories / totalCalories) * 100),
      fatPercent: Math.round((fatsCalories / totalCalories) * 100),
    };
  }, [summary]);

  return (
    <>
      <StatusBar animated barStyle="light-content" />
      <View style={styles.container}>
        {isImageInput && (
          <ImageBackground
            style={styles.image}
            source={{
              uri: meal?.inputFileURL,
            }}
          >
            <LinearGradient
              style={[styles.overlay, { paddingTop: top + 8 }]}
              colors={['rgba(0,0,0,0.5)', 'rgba(0,0,0,0)']}
              start={{ y: 0.5, x: 0 }}
              end={{ y: 1, x: 0 }}
            >
              <BlurView style={styles.blurView}>
                <Button size="icon" variant="ghost" onPress={goBack}>
                  <ChevronLeftIcon size={20} color={theme.colors.white} />
                </Button>
              </BlurView>
            </LinearGradient>
          </ImageBackground>
        )}

        <View
          style={[
            styles.content,
            { marginTop: !isImageInput ? top : 0, paddingLeft: isImageInput ? 8 : 0 },
          ]}
        >
          <View style={styles.pageTitleContainer}>
            {!isImageInput && (
              <Button size="icon" variant="ghost" onPress={goBack}>
                <ChevronLeftIcon size={20} color={theme.colors.white} />
              </Button>
            )}

            <AppText weight="medium" color={theme.colors.gray[300]}>
              Refeição
            </AppText>
          </View>

          <View style={styles.caloriesContainer}>
            <AppText color={theme.colors.gray[300]}>Calorias</AppText>
            <Skeleton width={61} height={24} colorMode="dark">
              {isLoading ? null : (
                <AppText weight="medium" color={theme.colors.white}>
                  {summary.calories ?? 0} kcal
                </AppText>
              )}
            </Skeleton>
          </View>
        </View>
      </View>

      <View style={styles.macrosContainer}>
        <View style={styles.macro}>
          <AppText color={theme.colors.gray[700]}>Proteínas</AppText>
          <Skeleton width={96} height={24} colorMode="light">
            {isLoading ? null : (
              <AppText weight="medium" color={theme.colors.support.teal}>
                {summary.proteins ?? 0}g ({percentages.proteinPercent}%)
              </AppText>
            )}
          </Skeleton>
        </View>

        <View style={styles.macro}>
          <AppText color={theme.colors.gray[700]}>Carboidratos</AppText>
          <Skeleton width={96} height={24} colorMode="light">
            {isLoading ? null : (
              <AppText weight="medium" color={theme.colors.support.yellow}>
                {summary.carbohydrates ?? 0}g ({percentages.carbPercent}%)
              </AppText>
            )}
          </Skeleton>
        </View>

        <View style={styles.macro}>
          <AppText color={theme.colors.gray[700]}>Gorduras</AppText>
          <Skeleton width={96} height={24} colorMode="light">
            {isLoading ? null : (
              <AppText weight="medium" color={theme.colors.support.orange}>
                {summary.fats ?? 0}g ({percentages.fatPercent}%)
              </AppText>
            )}
          </Skeleton>
        </View>
      </View>

      <View style={styles.macroProgressContainer}>
        <Skeleton width={'100%'} height={4} colorMode="light">
          {isLoading ? null : (
            <View style={styles.macrosProgress}>
              <View
                style={[styles.proteinProgress, { width: `${percentages.proteinPercent}%` }]}
              ></View>
              <View
                style={[styles.carbohydratesProgress, { width: `${percentages.carbPercent}%` }]}
              ></View>
              <View style={[styles.fatsProgress, { width: `${percentages.fatPercent}%` }]}></View>
            </View>
          )}
        </Skeleton>
      </View>

      <View style={styles.divider} />

      <View style={styles.mealNameContainer}>
        <Skeleton width={'40%'} height={24} colorMode="light">
          {isLoading ? null : (
            <AppText size="xl" weight="semiBold" style={styles.mealName}>
              {meal?.name}
            </AppText>
          )}
        </Skeleton>
      </View>

      <AppText weight="medium" color={theme.colors.gray[700]} style={styles.mealItemsHeader}>
        Itens
      </AppText>
    </>
  );
}
