import { WelcomeModal } from '@ui/components/WelcomeModal';
import { theme } from '@ui/styles/theme';
import { FlatList, RefreshControl, StatusBar, View } from 'react-native';

import { EmptyState } from './components/EmptyState';
import { Fab } from './components/Fab';
import { FullScreenLoader } from './components/FullScreenLoader';
import { Header } from './components/Header';
import { ItemSeparator } from './components/ItemSeparator';
import { MealCard } from './components/MealCard';
import { HomeProvider } from './contexts/HomeProvider';
import { styles } from './styles';
import { useHomeController } from './useHomeController';

export function Home() {
  const {
    bottom,
    date,
    meals,
    top,
    isInitialLoading,
    isLoading,
    isRefreshing,
    handleRefresh,
    handlePreviousDay,
    handleNextDay,
  } = useHomeController();

  if (isInitialLoading) {
    return <FullScreenLoader />;
  }

  return (
    <View style={[styles.container, { paddingTop: top }]}>
      <StatusBar barStyle="dark-content" animated />
      <WelcomeModal />

      <HomeProvider
        date={date}
        meals={meals}
        isLoading={isLoading}
        nextDay={handleNextDay}
        previousDay={handlePreviousDay}
      >
        <FlatList
          data={meals}
          keyExtractor={(item) => String(item.id)}
          contentContainerStyle={[styles.content, { paddingBottom: bottom + 24 }]}
          ListHeaderComponent={Header}
          ListEmptyComponent={EmptyState}
          ItemSeparatorComponent={ItemSeparator}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={handleRefresh}
              tintColor={theme.colors.lime[900]}
              colors={[theme.colors.lime[700]]}
            />
          }
          renderItem={({ item: meal }) => <MealCard meal={meal} />}
        />
      </HomeProvider>

      {meals.length > 0 && <Fab />}
    </View>
  );
}
