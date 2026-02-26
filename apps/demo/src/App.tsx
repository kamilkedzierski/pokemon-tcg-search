import { NavigationContainer } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  type NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { CardDetailsContainerScreen } from './screens/CardDetailsContainerScreen';
import { SearchContainerScreen } from './screens/SearchContainerScreen';
import type { RootStackParamList } from './types/navigation';

const Stack = createNativeStackNavigator<RootStackParamList>();
const STACK_SCREEN_OPTIONS: NativeStackNavigationOptions = {
  freezeOnBlur: true,
  headerStyle: { backgroundColor: '#ffffff' },
  headerTintColor: '#111111',
};

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={STACK_SCREEN_OPTIONS}>
          <Stack.Screen
            component={SearchContainerScreen}
            name="Search"
            options={{ title: 'Pokemon Card Search' }}
          />
          <Stack.Screen
            component={CardDetailsContainerScreen}
            name="CardDetails"
            options={{ title: 'Card Details' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
