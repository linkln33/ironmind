import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, TextInput } from 'react-native';

export default function SettingsScreen() {
  const [privacyLocal, setPrivacyLocal] = useState(true);
  const [backendUrl, setBackendUrl] = useState('http://localhost:4000');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <View style={styles.row}>
        <Text style={styles.label}>Local processing (privacy-first)</Text>
        <Switch value={privacyLocal} onValueChange={setPrivacyLocal} />
      </View>
      <Text style={styles.label}>Backend URL</Text>
      <TextInput
        value={backendUrl}
        onChangeText={setBackendUrl}
        autoCapitalize="none"
        autoCorrect={false}
        style={styles.input}
        placeholder="http://localhost:4000"
      />
      <Text style={styles.hint}>This screen is a stub; future versions will persist settings.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, gap: 12 },
  title: { fontSize: 22, fontWeight: '600', marginTop: 24 },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  label: { fontSize: 16 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 8, borderRadius: 6 },
  hint: { color: '#666', marginTop: 8 },
});
