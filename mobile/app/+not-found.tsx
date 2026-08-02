import { Link, Stack } from 'expo-router'
import { StyleSheet, Text, View } from 'react-native'

import { colors } from '../src/theme/colors'

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Introuvable' }} />
      <View style={styles.container}>
        <Text style={styles.title}>Page introuvable</Text>
        <Link href="/" style={styles.link}>
          Retour au dashboard
        </Link>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: colors.slate50,
  },
  title: { fontSize: 20, fontWeight: '700', color: colors.ink },
  link: { marginTop: 16, color: colors.signal, fontWeight: '600' },
})
