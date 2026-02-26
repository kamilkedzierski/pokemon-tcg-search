import { useState } from 'react';
import { TextInput, View } from 'react-native';

import { appStyles } from '../styles/appStyles';
import { PrimaryButton } from './PrimaryButton';

type SearchControlsProps = {
  hasIndex: boolean;
  initialNameQuery: string;
  initialNumberQuery: string;
  isBusy: boolean;
  onSearchByName: (query: string) => void;
  onSearchByNumber: (number: string) => void;
};

export const SearchControls = ({
  hasIndex,
  initialNameQuery,
  initialNumberQuery,
  isBusy,
  onSearchByName,
  onSearchByNumber,
}: SearchControlsProps) =>{
  const [nameQuery, setNameQuery] = useState(initialNameQuery);
  const [numberQuery, setNumberQuery] = useState(initialNumberQuery);

  return (
    <View style={appStyles.controls}>
      <TextInput
        value={nameQuery}
        onChangeText={setNameQuery}
        placeholder="Name query (e.g. pikachu)"
        placeholderTextColor="#7a7a7a"
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="search"
        onSubmitEditing={() => onSearchByName(nameQuery)}
        style={appStyles.input}
      />

      <PrimaryButton
        label="Search by name"
        disabled={!hasIndex || isBusy}
        onPress={() => onSearchByName(nameQuery)}
      />

      <TextInput
        value={numberQuery}
        onChangeText={setNumberQuery}
        placeholder="Card number (e.g. 4)"
        placeholderTextColor="#7a7a7a"
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="numbers-and-punctuation"
        returnKeyType="search"
        onSubmitEditing={() => onSearchByNumber(numberQuery)}
        style={appStyles.input}
      />

      <PrimaryButton
        label="Search by number"
        disabled={!hasIndex || isBusy}
        onPress={() => onSearchByNumber(numberQuery)}
      />
    </View>
  );
}
