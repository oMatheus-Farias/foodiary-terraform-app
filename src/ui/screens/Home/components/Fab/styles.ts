import { theme } from '@ui/styles/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 16,
  },
  bottomSheet: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
    borderTopWidth: 1,
    borderTopColor: theme.colors.gray[200],
    borderRadius: 16,
  },
  content: {
    paddingHorizontal: 24,
    gap: 24,
  },
  title: {
    letterSpacing: -0.4,
  },
});
