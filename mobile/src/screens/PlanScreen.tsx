import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function PlanScreen() {
  const [mode, setMode] = useState<'grind' | 'recovery'>('grind');
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Daily Plan</Text>
      <Text>Mode: {mode.toUpperCase()}</Text>
      <View style={styles.row}>
        <Button title="Grind" onPress={() => setMode('grind')} />
        <Button title="Recovery" onPress={() => setMode('recovery')} />
      </View>
      <Text style={styles.subtitle}>Micro-tasks will appear here</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, gap: 12, justifyContent: 'center' },
  title: { fontSize: 22, fontWeight: '600' },
  subtitle: { color: '#666' },
  row: { flexDirection: 'row', gap: 12, marginTop: 8 },
});
