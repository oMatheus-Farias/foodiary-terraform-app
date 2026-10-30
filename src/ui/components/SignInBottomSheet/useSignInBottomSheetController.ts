import { useAuth } from '@app/contexts/AuthContext/useAuth';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { zodResolver } from '@hookform/resolvers/zod';
import { useImperativeHandle, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import type { TextInputInstance } from 'react-native';
import { Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ISignInBottomSheet } from './ISignInBottomSheet';
import { SignInSchema, signInSchema } from './schema';

interface IUseSignInBottomSheetControllerProps {
  ref: React.Ref<ISignInBottomSheet>;
}

export function useSignInBottomSheetController({ ref }: IUseSignInBottomSheetControllerProps) {
  const { bottom } = useSafeAreaInsets();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const passwordInputRef = useRef<TextInputInstance>(null);
  const { signIn } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema as any),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  useImperativeHandle(
    ref,
    () => ({
      open: () => bottomSheetModalRef.current?.present(),
    }),
    [],
  );

  const handleSubmit = form.handleSubmit(async (data: SignInSchema) => {
    try {
      setIsLoading(true);
      await signIn(data);
    } catch {
      setIsLoading(false);
      Alert.alert('Oops! As credenciais informadas são inválidas');
    }
  });

  return { bottom, bottomSheetModalRef, passwordInputRef, form, handleSubmit, isLoading };
}
