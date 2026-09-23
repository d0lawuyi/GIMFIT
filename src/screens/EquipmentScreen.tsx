import { useState } from 'react';
import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { categories, filterEquipment } from '../data/equipment';
import type { Category } from '../data/equipment';
import { EquipmentPhoto, PhotoCredits } from '../components/EquipmentPhoto';

const colors = {
  background: '#0B0D14',
  surface: '#141824',
  border: '#282E40',
  text: '#F5F6FC',
  secondary: '#A6ADC2',
  accent: '#7950F2',
  accentLight: '#BCA7FF',
};

type Props = {
  onSelectEquipment: (equipmentId: string) => void;
};

export function EquipmentScreen({ onSelectEquipment }: Props) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<Category>('All');
  const results = filterEquipment(query, category);

  function resetFilters() {
    setQuery('');
    setCategory('All');
  }

  return (
    <SafeAreaView style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.brand}>
          GIM<Text style={styles.brandAccent}>FiT</Text>
        </Text>
      </View>

      <FlatList
        data={results}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        ListHeaderComponent={
          <View>
            <Text accessibilityRole="header" style={styles.title}>
              Equipment
            </Text>

            <Text style={styles.subtitle}>
              Find what you’re working with
            </Text>

            <TextInput
              accessibilityLabel="Search equipment"
              placeholder="Search dumbbells, cables, machines"
              placeholderTextColor={colors.secondary}
              selectionColor={colors.accentLight}
              keyboardAppearance="dark"
              value={query}
              onChangeText={setQuery}
              autoCorrect={false}
              autoCapitalize="none"
              returnKeyType="search"
              clearButtonMode="while-editing"
              style={styles.search}
            />

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.filters}
              keyboardShouldPersistTaps="handled"
            >
              {categories.map((item) => {
                const selected = category === item;

                return (
                  <Pressable
                    key={item}
                    accessibilityRole="button"
                    accessibilityState={{ selected }}
                    onPress={() => setCategory(item)}
                    style={({ pressed }) => [
                      styles.filter,
                      selected && styles.filterSelected,
                      pressed && styles.pressed,
                    ]}
                  >
                    <Text
                      style={[
                        styles.filterText,
                        selected && styles.filterTextSelected,
                      ]}
                    >
                      {item}
                    </Text>
                  </Pressable>
                );
              })}
            </ScrollView>

            <View style={styles.listHeading}>
              <Text style={styles.listTitle}>
                {category === 'All' ? 'All equipment' : category}
              </Text>

              <Text style={styles.count}>
                {results.length} {results.length === 1 ? 'item' : 'items'}
              </Text>
            </View>
          </View>
        }
        renderItem={({ item }) => (
  <Pressable
    accessibilityRole="button"
    accessibilityLabel={`View exercises for ${item.name}`}
    onPress={() => onSelectEquipment(item.id)}
    style={({ pressed }) => [
      styles.equipmentRow,
      pressed && styles.pressed,
    ]}
  >
    <EquipmentPhoto equipmentId={item.id} />

    <View style={styles.rowBody}>
      <Text style={styles.equipmentName}>{item.name}</Text>

      <Text style={styles.description}>
        {item.description.replace(/\.+$/, '')}
      </Text>

      <Text style={styles.category}>View exercises ›</Text>
    </View>
  </Pressable>
)}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyTitle}>Nothing found</Text>

            <Text style={styles.description}>
              Try another search or clear your filters
            </Text>

            <Pressable
              accessibilityRole="button"
              onPress={resetFilters}
              style={({ pressed }) => [
                styles.reset,
                pressed && styles.pressed,
              ]}
            >
              <Text style={styles.resetText}>Clear filters</Text>
            </Pressable>
          </View>
        }
        ListFooterComponent={
  <View>
    <Text style={styles.footer}>Sample equipment library</Text>
    <PhotoCredits />
  </View>
}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 20,
    width: '100%',
    maxWidth: 640,
    alignSelf: 'center',
  },
  brand: {
    color: colors.text,
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: -0.8,
  },
  brandAccent: {
    color: colors.accentLight,
  },
  content: {
    paddingHorizontal: 24,
    paddingBottom: 32,
    width: '100%',
    maxWidth: 640,
    alignSelf: 'center',
  },
  title: {
    color: colors.text,
    fontSize: 32,
    fontWeight: '700',
    letterSpacing: -0.8,
    marginTop: 12,
  },
  subtitle: {
    color: colors.secondary,
    fontSize: 16,
    lineHeight: 24,
    marginTop: 8,
    marginBottom: 24,
  },
  search: {
    minHeight: 54,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 15,
    color: colors.text,
    fontSize: 15,
  },
  filters: {
    gap: 8,
    paddingTop: 16,
    paddingBottom: 28,
  },
  filter: {
    minHeight: 44,
    paddingHorizontal: 16,
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  filterSelected: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
  },
  filterText: {
    color: colors.secondary,
    fontSize: 14,
    fontWeight: '600',
  },
  filterTextSelected: {
    color: '#FFFFFF',
  },
  pressed: {
    opacity: 0.75,
  },
  listHeading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
    marginBottom: 8,
  },
  listTitle: {
    flex: 1,
    color: colors.text,
    fontSize: 16,
    fontWeight: '600',
  },
  count: {
    color: colors.secondary,
    fontSize: 13,
  },
  equipmentRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 16,
    paddingVertical: 22,
  },
  rowMarker: {
    width: 4,
    height: 28,
    borderRadius: 2,
    backgroundColor: colors.accent,
    marginTop: 3,
  },
  rowBody: {
    flex: 1,
  },
  equipmentName: {
    color: colors.text,
    fontSize: 19,
    fontWeight: '600',
    marginBottom: 7,
  },
  description: {
    color: colors.secondary,
    fontSize: 14,
    lineHeight: 22,
  },
  category: {
    color: colors.accentLight,
    fontSize: 12,
    fontWeight: '500',
    marginTop: 10,
  },
  separator: {
    height: 1,
    backgroundColor: colors.border,
    marginLeft: 20,
  },
  empty: {
    paddingVertical: 36,
  },
  emptyTitle: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
  },
  reset: {
    alignSelf: 'flex-start',
    minHeight: 44,
    justifyContent: 'center',
    paddingHorizontal: 18,
    backgroundColor: colors.accent,
    borderRadius: 10,
    marginTop: 20,
  },
  resetText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  footer: {
    color: colors.secondary,
    fontSize: 12,
    marginTop: 28,
  },
});