import { DarkTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { EquipmentScreen } from '../screens/EquipmentScreen';
import {
  ExerciseListScreen,
  ExerciseDetailsScreen,
} from '../screens/ExerciseScreens';

export type RootStackParamList = {
  Equipment: undefined;
  Exercises: { equipmentId: string };
  ExerciseDetails: { exerciseId: string };
};

export type ScreenProps<
  Name extends keyof RootStackParamList,
> = NativeStackScreenProps<RootStackParamList, Name>;

const Stack = createNativeStackNavigator<RootStackParamList>();

const theme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: '#BCA7FF',
    background: '#0B0D14',
    card: '#0B0D14',
    text: '#F5F6FC',
    border: '#282E40',
  },
};

export function AppNavigator() {
  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#0B0D14' },
          headerTintColor: '#BCA7FF',
          headerTitleStyle: { color: '#F5F6FC' },
          headerShadowVisible: false,
          contentStyle: { backgroundColor: '#0B0D14' },
        }}
      >
        <Stack.Screen
          name="Equipment"
          options={{ headerShown: false }}
        >
          {({ navigation }) => (
            <EquipmentScreen
              onSelectEquipment={(equipmentId) =>
                navigation.navigate('Exercises', { equipmentId })
              }
            />
          )}
        </Stack.Screen>

        <Stack.Screen
          name="Exercises"
          component={ExerciseListScreen}
          options={{ title: 'Exercises' }}
        />

        <Stack.Screen
          name="ExerciseDetails"
          component={ExerciseDetailsScreen}
          options={{ title: 'Exercise details' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}