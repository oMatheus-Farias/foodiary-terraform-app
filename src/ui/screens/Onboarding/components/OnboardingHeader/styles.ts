import { theme } from '@ui/styles/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    paddingHorizontal: 8,
    paddingBottom: 4,
  },
  progressBarBackground: {
    flex: 1,
    height: 4,
    borderRadius: 4,
    backgroundColor: theme.colors.gray[200],
  },
  progressBarForeground: {
    width: 0,
    height: '100%',
    borderRadius: 4,
    backgroundColor: theme.colors.lime[700],
  },
  rightActionPlaceholder: {
    width: 40,
    height: 40,
  },
});
