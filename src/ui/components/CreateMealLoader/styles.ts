import { theme } from '@ui/styles/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    backgroundColor: theme.colors.lime[900],
    alignItems: 'center',
    justifyContent: 'center',
    gap: 24,
  },
  video: {
    width: 136,
    height: 136,
    borderRadius: 68,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
});
