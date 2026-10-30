/* eslint-disable no-console */
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export function useEditGoalsController() {
  const { top, bottom } = useSafeAreaInsets();
  const navigation = useNavigation();
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSave() {
    setIsSubmitting(true);

    try {
      navigation.goBack();
    } catch (error) {
      console.error('Error saving goals:', error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return {
    top,
    bottom,
    isSubmitting,
    handleSave,
  };
}
