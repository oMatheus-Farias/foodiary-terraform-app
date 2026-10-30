import { AppText } from '@ui/components/AppText';
import { View } from 'react-native';

import { useHomeContext } from '../../contexts/useHomeContext';
import { CurrentGoal } from '../CurrentGoal';
import { DateSwitcher } from '../DateSwitcher';
import { UserHeader } from '../UserHeader';
import { styles } from './styles';

export function Header() {
  const { isLoading } = useHomeContext();

  return (
    <View>
      <UserHeader />

      <View style={styles.container}>
        <DateSwitcher />
        <CurrentGoal />

        <View style={styles.divider} />
        <AppText weight="medium" style={[styles.mealsLabel, isLoading && { opacity: 0.5 }]}>
          Refeições
        </AppText>
      </View>
    </View>
  );
}
