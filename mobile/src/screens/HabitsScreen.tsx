import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TextInput, Alert } from 'react-native';
import { api } from '../api/client';

export default function HabitsScreen() {
  const [type, setType] = useState<'smoking' | 'alcohol' | 'porn' | 'gaming' | 'other'>('other');
  const [qty, setQty] = useState('1');

  const submit = async () => {
    try {
      const payload = {
        user_id: '00000000-0000-0000-0000-000000000001',
        timestamp: new Date().toISOString(),
        habit_type: type,
        quantity: parseInt(qty || '0', 10),
      };
      await api<{ id: string }>(`/api/habits`, {
        method: 'POST',
        body: JSON.stringify(payload),
      });
      Alert.alert('Saved habit event');
    } catch (e: any) {
      Alert.alert('Save failed', e.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Habit Log</Text>
      <View style={styles.row}>
        <Button title="Smoking" onPress={() => setType('smoking')} />
        <Button title="Alcohol" onPress={() => setType('alcohol')} />
        <Button title="Other" onPress={() => setType('other')} />
      </View>
      <Text>Selected: {type}</Text>
      <TextInput
        value={qty}
        onChangeText={setQty}
        keyboardType="number-pad"
        style={styles.input}
        placeholder="Quantity"
      />
      <Button title="Save" onPress={submit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, gap: 12 },
  title: { fontSize: 22, fontWeight: '600', marginTop: 24 },
  row: { flexDirection: 'row', gap: 8 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 8, borderRadius: 6 },
});
