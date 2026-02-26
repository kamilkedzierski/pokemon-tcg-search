import { Text, View } from 'react-native';

import { appStyles } from '../styles/appStyles';

type DetailRowProps = {
  label: string;
  value: string;
};

export const DetailRow = ({ label, value }: DetailRowProps) => {
  return (
    <View style={appStyles.detailsSection}>
      <Text style={appStyles.detailsSectionLabel}>{label}</Text>
      <Text style={appStyles.detailsSectionValue}>{value}</Text>
    </View> 
  );
}
