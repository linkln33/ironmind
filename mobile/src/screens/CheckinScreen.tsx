import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { api } from '../api/client';

export default function CheckinScreen() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const doMockCheckin = async () => {
    try {
      setLoading(true);
      const payload = {
        user_id: '00000000-0000-0000-0000-000000000001',
        timestamp: new Date().toISOString(),
        mh_local_features: { pitch_median: 120.2, energy: 0.6 },
      };
      const res = await api<{ id: string; mood_vector: any }>(`/api/checkins`, {
        method: 'POST',
        body: JSON.stringify(payload),
      });
      setResult(res);
    } catch (e: any) {
      Alert.alert('Check-in failed', e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Voice Check-in</Text>
      <Text style={styles.subtitle}>Mock payload to verify API path</Text>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <Button title="Send Mock Check-in" onPress={doMockCheckin} />
      )}
      {result && (
        <View style={styles.result}>
          <Text>Created: {result.id}</Text>
          <Text>Mood: {JSON.stringify(result.mood_vector)}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, gap: 16, justifyContent: 'center' },
  title: { fontSize: 22, fontWeight: '600' },
  subtitle: { color: '#666' },
  result: { marginTop: 12 },
});
