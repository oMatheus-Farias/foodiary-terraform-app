import { theme } from '@ui/styles/theme';
import { createContext, use } from 'react';
import { TouchableOpacity, View } from 'react-native';

import { AppText } from '../AppText';
import { styles } from './styles';

interface IRadioGroupContextValue {
  value: string | null;
  onChangeValue: (value: string) => void;
  isHorizontal: boolean;
  error: boolean;
}

const RadioGroupContext = createContext({} as IRadioGroupContextValue);

interface IRadioGroupProps {
  children: React.ReactNode;
  value: string | null;
  onChangeValue: (value: string) => void;
  error?: boolean;
  orientation?: 'horizontal' | 'vertical';
}

export function RadioGroup({
  children,
  value,
  onChangeValue,
  error = false,
  orientation = 'vertical',
}: IRadioGroupProps) {
  const isHorizontal = orientation === 'horizontal';

  return (
    <RadioGroupContext.Provider value={{ value, onChangeValue, isHorizontal, error }}>
      <View style={[styles.container, isHorizontal && styles.containerHorizontal]}>{children}</View>
    </RadioGroupContext.Provider>
  );
}

interface IRadioGroupItemProps {
  children: React.ReactNode;
  value: string;
}

interface IRadioGroupItemContextValue {
  isSelected: boolean;
}

const RadioGroupItemContext = createContext({} as IRadioGroupItemContextValue);

export function RadioGroupItem({ children, value }: IRadioGroupItemProps) {
  const { value: selectedValue, onChangeValue, isHorizontal, error } = use(RadioGroupContext);

  const isSelected = selectedValue === value;

  return (
    <RadioGroupItemContext.Provider value={{ isSelected }}>
      <TouchableOpacity
        onPress={() => onChangeValue(value)}
        style={[
          styles.item,
          isHorizontal && styles.horizontalItem,
          isSelected && styles.selectedItem,
          error && styles.errorItem,
        ]}
      >
        {children}
      </TouchableOpacity>
    </RadioGroupItemContext.Provider>
  );
}

export function RadioGroupIcon({ children }: { children: string }) {
  const { isSelected } = use(RadioGroupItemContext);
  const { error } = use(RadioGroupContext);

  return (
    <View style={[styles.icon, (isSelected || error) && styles.whiteIconBg]}>
      <AppText>{children}</AppText>
    </View>
  );
}

export function RadioGroupLabel({ children }: { children: string }) {
  const { isHorizontal } = use(RadioGroupContext);

  return (
    <AppText weight="semiBold" style={[styles.label, isHorizontal && styles.textCenter]}>
      {children}
    </AppText>
  );
}

export function RadioGroupDescription({ children }: { children: string }) {
  const { isHorizontal } = use(RadioGroupContext);

  return (
    <AppText size="sm" color={theme.colors.gray[700]} style={[isHorizontal && styles.textCenter]}>
      {children}
    </AppText>
  );
}

export function RadioGroupItemInfo({ children }: { children: React.ReactNode }) {
  return <View style={styles.itemInfo}>{children}</View>;
}
