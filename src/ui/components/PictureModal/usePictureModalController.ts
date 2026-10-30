import { useCreateMeal } from '@app/hooks/mutations/useCreateMeal';
import { useMeal } from '@app/hooks/queries/useMeal';
import { AppStackNavigationProps } from '@app/navigation/AppStack';
import { MealStatus } from '@app/types/Meal';
import { useNavigation } from '@react-navigation/native';
import { useQueryClient } from '@tanstack/react-query';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Alert } from 'react-native';

interface IUsePictureModalControllerParams {
  onClose: () => void;
  onCreate?: () => void;
}

export function usePictureModalController({ onClose, onCreate }: IUsePictureModalControllerParams) {
  const cameraRef = useRef<CameraView>(null);

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

  const [permission, requestPermission] = useCameraPermissions();
  const [pictureUri, setPictureUri] = useState<string | null>(null);

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

  async function handleTakePicture() {
    if (!cameraRef.current) {
      return;
    }

    const picture = await cameraRef.current.takePictureAsync({
      imageType: 'jpg',
    });

    setPictureUri(picture.uri);
  }

  async function handleTryAgain() {
    setPictureUri(null);
  }

  async function handleConfirm() {
    if (!pictureUri) {
      return;
    }

    try {
      await createMeal(pictureUri);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);

      Alert.alert('Oops!', 'Ocorreu um erro ao criar a sua refeição. Tente novamente.');
    }
  }

  return {
    isLoading: isCreatingMeal || isLoadingMeal || isProcessingMeal,
    permission,
    cameraRef,
    pictureUri,
    requestPermission,
    handleTakePicture,
    handleTryAgain,
    handleConfirm,
  };
}
