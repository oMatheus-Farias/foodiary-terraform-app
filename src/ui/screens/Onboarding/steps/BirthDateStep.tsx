import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { AppText } from '@ui/components/AppText';
import { Button } from '@ui/components/Button';
import { theme } from '@ui/styles/theme';
import { ArrowRightIcon } from 'lucide-react-native';
import { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Platform, TouchableOpacity } from 'react-native';

import {
  Step,
  StepContent,
  StepFooter,
  StepHeader,
  StepSubtitle,
  StepTitle,
} from '../components/Step';
import { useOnboarding } from '../contexts/useOnboarding';
import { OnboardingSchema } from '../schema';

export function BirthDateStep() {
  const [isDatePickerVisible, setDatePickerVisible] = useState(true);

  const { nextStep } = useOnboarding();
  const form = useFormContext<OnboardingSchema>();

  function handleSelectDate(_event: DateTimePickerEvent, newDate?: Date) {
    if (!newDate) {
      return;
    }

    form.setValue('birthDate', newDate);
    if (Platform.OS === 'android') {
      setDatePickerVisible(false);
    }
  }

  async function handleNextStep() {
    const isValid = await form.trigger('birthDate');

    if (isValid) {
      return nextStep();
    }

    return;
  }

  return (
    <Step>
      <StepHeader>
        <StepTitle>Que dia você nasceu?</StepTitle>
        <StepSubtitle>Cada faixa etária responde de forma única</StepSubtitle>
      </StepHeader>

      <StepContent position="center">
        <Controller
          control={form.control}
          name="birthDate"
          render={({ field }) => (
            <>
              {isDatePickerVisible && (
                <DateTimePicker
                  mode="date"
                  value={field.value}
                  onChange={handleSelectDate}
                  display={Platform.OS === 'ios' ? 'spinner' : 'calendar'}
                />
              )}

              {Platform.OS === 'android' && (
                <TouchableOpacity onPress={() => setDatePickerVisible(true)}>
                  <AppText weight="semiBold" size="2xl" color={theme.colors.gray[700]}>
                    {field.value.toLocaleDateString('pt-BR', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                    })}
                  </AppText>
                </TouchableOpacity>
              )}
            </>
          )}
        />
      </StepContent>

      <StepFooter>
        <Button size="icon" onPress={handleNextStep}>
          <ArrowRightIcon size={20} color={theme.colors.black[700]} />
        </Button>
      </StepFooter>
    </Step>
  );
}
