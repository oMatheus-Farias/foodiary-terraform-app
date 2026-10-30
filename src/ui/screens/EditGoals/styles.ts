import { theme } from '@ui/styles/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  content: {
    padding: 24,
  },
  header: {
    marginBottom: 32,
  },
  title: {
    fontFamily: theme.fontFamily.sans.semiBold,
    fontSize: theme.fontSize['2xl'],
    color: theme.colors.black[900],
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: theme.fontFamily.sans.regular,
    fontSize: theme.fontSize.base,
    color: theme.colors.gray[600],
  },
  form: {
    gap: 16,
    marginBottom: 32,
  },
  goalItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: theme.colors.gray[100],
    borderRadius: 12,
    borderWidth: 1,
    borderColor: theme.colors.gray[200],
  },
  goalLabel: {
    fontFamily: theme.fontFamily.sans.medium,
    fontSize: theme.fontSize.base,
    color: theme.colors.gray[700],
  },
  goalValue: {
    fontFamily: theme.fontFamily.sans.semiBold,
    fontSize: theme.fontSize.lg,
    color: theme.colors.black[900],
  },
});
