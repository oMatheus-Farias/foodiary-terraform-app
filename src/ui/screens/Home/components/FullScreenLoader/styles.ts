import { theme } from '@ui/styles/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.lime[700],
    gap: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
