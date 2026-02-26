import { Pressable, Text } from 'react-native';

import { appStyles } from '../styles/appStyles';

type PrimaryButtonProps = {
  label: string;
  onPress: () => void;
  disabled?: boolean;
};

export const PrimaryButton = ({ label, onPress, disabled = false }: PrimaryButtonProps) => {
  return (
    <Pressable  
      style={[appStyles.button, disabled && appStyles.buttonDisabled]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={appStyles.buttonText}>{label}</Text>
    </Pressable>
  );
}
