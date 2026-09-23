import { useState } from 'react';
import { Alert, Image, Linking, Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import type { ImageSourcePropType } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import credits from '../../assets/equipment/credits.json';

const photos: Record<string, ImageSourcePropType> = {
  dumbbells: require('../../assets/equipment/dumbbells.jpg'),
  'cable-station': require('../../assets/equipment/cable-station.jpg'),
  'leg-press': require('../../assets/equipment/leg-press.jpg'),
  barbell: require('../../assets/equipment/barbell.jpg'),
  'lat-pulldown': require('../../assets/equipment/lat-pulldown.jpg'),
  'chest-press': require('../../assets/equipment/chest-press.jpg'),
};

export function EquipmentPhoto({ equipmentId }: { equipmentId: string }) {
  const [failed, setFailed] = useState(false);
  const source = photos[equipmentId];
  return (
    <View style={styles.frame}>
      {source && !failed ? (
        <Image source={source} style={styles.image} resizeMode="contain"
          accessible={false} onError={() => setFailed(true)} />
      ) : <Text style={styles.muted}>No photo</Text>}
    </View>
  );
}

async function openLink(url: string) {
  try { await Linking.openURL(url); }
  catch { Alert.alert('Could not open link', 'Please try again when connected'); }
}

export function PhotoCredits() {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <Pressable accessibilityRole="button" onPress={() => setVisible(true)} style={styles.button}>
        <Text style={styles.link}>Photo credits</Text>
      </Pressable>
      <Modal visible={visible} animationType="slide" onRequestClose={() => setVisible(false)}>
        <SafeAreaView style={styles.page}>
          <Pressable accessibilityRole="button" onPress={() => setVisible(false)} style={styles.button}>
            <Text style={styles.link}>Close</Text>
          </Pressable>
          <ScrollView contentContainerStyle={styles.content}>
            <Text accessibilityRole="header" style={styles.heading}>Photo credits</Text>
            <Text style={styles.muted}>Example equipment photos from Wikimedia Commons — machine designs vary</Text>
            {credits.map((credit) => (
              <View key={credit.id} style={styles.credit}>
                <Text style={styles.title}>{credit.title}</Text>
                <Text style={styles.muted}>{credit.author}</Text>
                <Text style={styles.muted}>{credit.changes}</Text>
                <Pressable accessibilityRole="link" onPress={() => openLink(credit.source)} style={styles.button}>
                  <Text style={styles.link}>View original photo</Text>
                </Pressable>
                <Pressable accessibilityRole="link" onPress={() => openLink(credit.licenseUrl)} style={styles.button}>
                  <Text style={styles.link}>{credit.license}</Text>
                </Pressable>
              </View>
            ))}
          </ScrollView>
        </SafeAreaView>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  frame: { width: 96, height: 112, backgroundColor: '#141824', borderRadius: 10, overflow: 'hidden', alignItems: 'center', justifyContent: 'center' },
  image: { width: '100%', height: '100%' },
  page: { flex: 1, backgroundColor: '#0B0D14' },
  content: { padding: 24, paddingBottom: 40 },
  heading: { color: '#F5F6FC', fontSize: 26, fontWeight: '700', marginBottom: 16 },
  title: { color: '#F5F6FC', fontSize: 16, fontWeight: '600', marginBottom: 8 },
  muted: { color: '#A6ADC2', fontSize: 12, lineHeight: 19 },
  link: { color: '#BCA7FF', fontSize: 14 },
  button: { minHeight: 44, paddingHorizontal: 12, justifyContent: 'center', alignSelf: 'flex-start' },
  credit: { paddingVertical: 20, borderBottomWidth: 1, borderBottomColor: '#282E40' },
});
