import { useAccount } from '@app/hooks/queries/useAccount';
import { AppHeader } from '@ui/components/AppHeader';
import { AppText } from '@ui/components/AppText';
import { Button } from '@ui/components/Button';
import { ScrollView, View } from 'react-native';

import { styles } from './styles';
import { useEditGoalsController } from './useEditGoalsController';

export function EditGoals() {
  const { account } = useAccount();
  const { top, bottom, handleSave, isSubmitting } = useEditGoalsController();

  if (!account) {
    return null;
  }

  return (
    <View style={[styles.container, { paddingTop: top }]}>
      <AppHeader title="Editar Metas" />

      <ScrollView
        contentContainerStyle={[styles.content, { paddingBottom: bottom + 24 }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.form}>
          <View style={styles.goalItem}>
            <AppText style={styles.goalLabel}>Calorias</AppText>
            <AppText style={styles.goalValue}>{account.goal.calories} kcal</AppText>
          </View>

          <View style={styles.goalItem}>
            <AppText style={styles.goalLabel}>Proteínas</AppText>
            <AppText style={styles.goalValue}>{account.goal.proteins}g</AppText>
          </View>

          <View style={styles.goalItem}>
            <AppText style={styles.goalLabel}>Carboidratos</AppText>
            <AppText style={styles.goalValue}>{account.goal.carbohydrates}g</AppText>
          </View>

          <View style={styles.goalItem}>
            <AppText style={styles.goalLabel}>Gorduras</AppText>
            <AppText style={styles.goalValue}>{account.goal.fats}g</AppText>
          </View>

          <Button onPress={handleSave} isLoading={isSubmitting}>
            Salvar Alterações
          </Button>
        </View>
      </ScrollView>
    </View>
  );
}
