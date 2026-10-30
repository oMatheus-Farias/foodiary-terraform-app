import { theme } from '@ui/styles/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.black[900],
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    paddingTop: 16,
    paddingHorizontal: 20,
  },
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 32,
    marginTop: 16,
  },
  permissionContainer: {
    alignItems: 'center',
    gap: 16,
  },
  permissionLabel: {
    maxWidth: 270,
  },
  camera: {
    flex: 1,
    width: '100%',
  },
  picture: {
    flex: 1,
    width: '100%',
  },
  footer: {
    height: 112,
    marginTop: 24,
    marginBottom: 32,
  },
  actionsContainer: {
    alignItems: 'center',
    gap: 16,
  },
  actionsGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 32,
  },
});
