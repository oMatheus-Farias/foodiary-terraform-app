import { theme } from '@ui/styles/theme';
import { Text, TextStyle } from 'react-native';

interface IAppTextProps extends React.ComponentProps<typeof Text> {
  size?: keyof typeof theme.fontSize;
  family?: keyof typeof theme.fontFamily;
  weight?: keyof typeof theme.fontFamily.sans;
  align?: TextStyle['textAlign'];
  color?: string;
}

export function AppText({
  size = 'base',
  family = 'sans',
  weight = 'regular',
  align = 'left',
  color = theme.colors.black[700],
  style,
  ...props
}: IAppTextProps) {
  return (
    <Text
      style={[
        {
          fontFamily: theme.fontFamily[family][weight],
          fontSize: theme.fontSize[size],
          textAlign: align,
          color,
        },
        style,
      ]}
      {...props}
    />
  );
}
