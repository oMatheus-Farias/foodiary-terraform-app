import { useCreateMeal } from '@app/hooks/mutations/useCreateMeal';
import { useMeal } from '@app/hooks/queries/useMeal';
import { AppStackNavigationProps } from '@app/navigation/AppStack';
import { MealStatus } from '@app/types/Meal';
import { useNavigation } from '@react-navigation/native';
import { useQueryClient } from '@tanstack/react-query';
import { AudioModule, RecordingPresets, setAudioModeAsync, useAudioRecorder } from 'expo-audio';
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Alert } from 'react-native';

export type AudioModalState = 'idle' | 'recording' | 'recorded';

interface IAudioModalControllerParams {
  onClose: () => void;
  onCreate?: () => void;
}

export function useAudioModalController({ onClose, onCreate }: IAudioModalControllerParams) {
  const memorizedOnClose = useRef(onClose);
  useLayoutEffect(() => {
    memorizedOnClose.current = onClose;
  }, [onClose]);

  const memorizedOnCreate = useRef(onCreate);
  useLayoutEffect(() => {
    memorizedOnCreate.current = onCreate;
  }, [onCreate]);

  const { createMeal, isLoading: isCreatingMeal, createdMealId } = useCreateMeal();
  const { meal, isLoading: isLoadingMeal, isProcessing: isProcessingMeal } = useMeal(createdMealId);
  const { navigate } = useNavigation<AppStackNavigationProps>();

  const queryClient = useQueryClient();

  const [state, setState] = useState<AudioModalState>('idle');
  const [audioUri, setAudioUri] = useState<string | null>(null);

  useEffect(() => {
    if (meal?.status === MealStatus.FAILED) {
      Alert.alert('Oops!', 'Ocorreu um erro ao processar a sua refeição. Tente novamente.');
    }

    if (meal?.status === MealStatus.SUCCESS) {
      memorizedOnClose.current();
      memorizedOnCreate.current?.();
      queryClient.invalidateQueries({ queryKey: ['meals'] });
      navigate('MealDetails', { mealId: meal.id });
    }
  }, [meal?.status, navigate, meal?.id, queryClient]);

  const audioRecorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);

  useEffect(() => {
    async function load() {
      const status = await AudioModule.requestRecordingPermissionsAsync();

      if (!status.granted) {
        Alert.alert('Permissão para acessar o microfone negada.');
      }

      setAudioModeAsync({
        playsInSilentMode: true,
        allowsRecording: true,
      });
    }

    load();
  }, []);

  const isRecording = state === 'recording';

  async function handleStartRecording() {
    await audioRecorder.prepareToRecordAsync();
    audioRecorder.record();

    setState('recording');
  }

  const handleStopRecording = useCallback(async () => {
    await audioRecorder.stop();

    setAudioUri(audioRecorder.uri);
    setState('recorded');
  }, []);

  async function handleTryAgain() {
    setState('idle');
  }

  async function handleConfirm() {
    if (!audioUri) {
      return;
    }

    try {
      await createMeal(audioUri);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);

      Alert.alert('Oops!', 'Ocorreu um erro ao criar a sua refeição. Tente novamente.');
    }
  }

  return {
    isLoading: isCreatingMeal || isLoadingMeal || isProcessingMeal,
    state,
    audioUri,
    isRecording,
    handleStartRecording,
    handleStopRecording,
    handleTryAgain,
    handleConfirm,
  };
}
