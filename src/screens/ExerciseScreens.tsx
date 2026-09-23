import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { equipment } from '../data/equipment';
import { exercises } from '../data/exercises';
import type { ScreenProps } from '../navigation/AppNavigator';

export function ExerciseListScreen({
  route,
  navigation,
}: ScreenProps<'Exercises'>) {
  const selectedEquipment = equipment.find(
    (item) => item.id === route.params.equipmentId,
  );

  const matchingExercises = exercises.filter(
    (item) => item.equipmentId === route.params.equipmentId,
  );

  return (
    <SafeAreaView
      edges={['left', 'right', 'bottom']}
      style={styles.page}
    >
      <FlatList
        data={matchingExercises}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.content}
        ListHeaderComponent={
          <View style={styles.heading}>
            <Text accessibilityRole="header" style={styles.title}>
              {selectedEquipment?.name ?? 'Equipment not found'}
            </Text>

            <Text style={styles.muted}>
              Choose an exercise to explore
            </Text>

            <Text style={styles.notice}>
              Sample exercise library · Review pending
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={`View ${item.name}`}
            onPress={() =>
              navigation.navigate('ExerciseDetails', {
                exerciseId: item.id,
              })
            }
            style={({ pressed }) => [
              styles.row,
              pressed && styles.pressed,
            ]}
          >
            <View style={styles.rowBody}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.muted}>{item.primaryMuscles}</Text>
            </View>

            <Text
              accessible={false}
              style={styles.arrow}
            >
              ›
            </Text>
          </Pressable>
        )}
        ListEmptyComponent={
          <Text style={styles.muted}>
            No exercises have been added for this equipment yet
          </Text>
        }
      />
    </SafeAreaView>
  );
}

export function ExerciseDetailsScreen({
  route,
}: ScreenProps<'ExerciseDetails'>) {
  const exercise = exercises.find(
    (item) => item.id === route.params.exerciseId,
  );

  if (!exercise) {
    return (
      <SafeAreaView
        edges={['left', 'right', 'bottom']}
        style={styles.page}
      >
        <View style={styles.content}>
          <Text style={styles.title}>Exercise not found</Text>
          <Text style={styles.muted}>
            Go back and choose another exercise
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      edges={['left', 'right', 'bottom']}
      style={styles.page}
    >
      <ScrollView contentContainerStyle={styles.content}>
        <Text accessibilityRole="header" style={styles.title}>
          {exercise.name}
        </Text>

        <Text style={styles.notice}>
          Sample content · Not yet reviewed
        </Text>

        <View style={styles.section}>
          <Text style={styles.label}>Primary muscles</Text>
          <Text style={styles.value}>{exercise.primaryMuscles}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Setup overview</Text>
          <Text style={styles.value}>{exercise.setup}</Text>
          <Text style={styles.note}>
            Full setup and movement instructions will be added after review
          </Text>
        </View>

        <View style={styles.videoPlaceholder}>
          <Text style={styles.name}>Demonstration coming soon</Text>
          <Text style={styles.muted}>
            A short video will show the setup and movement
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Sets and reps</Text>
          <Text style={styles.muted}>
            Recommendations will be added with reviewed workout templates
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#0B0D14',
  },
  content: {
    width: '100%',
    maxWidth: 640,
    alignSelf: 'center',
    padding: 24,
    paddingBottom: 40,
  },
  heading: {
    marginBottom: 16,
  },
  title: {
    color: '#F5F6FC',
    fontSize: 30,
    fontWeight: '700',
    letterSpacing: -0.6,
    marginBottom: 12,
  },
  muted: {
    color: '#A6ADC2',
    fontSize: 15,
    lineHeight: 23,
  },
  notice: {
    color: '#BCA7FF',
    fontSize: 12,
    lineHeight: 19,
    marginTop: 14,
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    minHeight: 80,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#282E40',
  },
  rowBody: {
    flex: 1,
  },
  name: {
    color: '#F5F6FC',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 7,
  },
  arrow: {
    color: '#BCA7FF',
    fontSize: 28,
  },
  pressed: {
    opacity: 0.65,
  },
  section: {
    paddingVertical: 22,
    borderBottomWidth: 1,
    borderBottomColor: '#282E40',
  },
  label: {
    color: '#BCA7FF',
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 10,
  },
  value: {
    color: '#F5F6FC',
    fontSize: 17,
    lineHeight: 26,
  },
  note: {
    color: '#A6ADC2',
    fontSize: 13,
    lineHeight: 21,
    marginTop: 12,
  },
  videoPlaceholder: {
    backgroundColor: '#141824',
    borderRadius: 12,
    padding: 24,
    marginTop: 24,
    minHeight: 160,
    justifyContent: 'center',
  },
});