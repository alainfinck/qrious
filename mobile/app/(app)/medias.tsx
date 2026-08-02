import React, { useCallback, useEffect, useState } from 'react'
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import * as DocumentPicker from 'expo-document-picker'
import * as ImagePicker from 'expo-image-picker'

import { fetchMedia, uploadMedia } from '../../src/api/landing-pages'
import { Button, Card, EmptyState, LoadingBlock, PageHeader } from '../../src/components/ui'
import { getApiBaseUrl } from '../../src/lib/utils'
import { colors, spacing } from '../../src/theme/colors'

type MediaDoc = {
  id: string | number
  alt?: string | null
  url?: string | null
  filename?: string | null
  mimeType?: string | null
  filesize?: number | null
}

export default function MediasScreen() {
  const [docs, setDocs] = useState<MediaDoc[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const reload = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const result = await fetchMedia()
      setDocs(result.docs)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erreur')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    void reload()
  }, [reload])

  async function handleUpload() {
    setUploading(true)
    setError(null)
    try {
      const image = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        quality: 0.9,
      })
      if (!image.canceled && image.assets[0]) {
        const asset = image.assets[0]
        await uploadMedia({
          uri: asset.uri,
          name: asset.fileName || `upload-${Date.now()}.jpg`,
          type: asset.mimeType || 'image/jpeg',
        })
        await reload()
        return
      }

      const doc = await DocumentPicker.getDocumentAsync({
        type: ['image/*', 'application/pdf'],
        copyToCacheDirectory: true,
      })
      if (!doc.canceled && doc.assets?.[0]) {
        const asset = doc.assets[0]
        await uploadMedia({
          uri: asset.uri,
          name: asset.name,
          type: asset.mimeType || 'application/octet-stream',
        })
        await reload()
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Échec de l’upload')
    } finally {
      setUploading(false)
    }
  }

  if (loading) return <LoadingBlock />

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <PageHeader
        title="Médias"
        description="Bibliothèque d’images et PDF pour vos landing pages."
        action={<Button label="Uploader" loading={uploading} onPress={() => void handleUpload()} />}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}

      {docs.length === 0 ? (
        <EmptyState
          title="Aucun média"
          description="Ajoutez des images ou PDF (max 10 Mo)."
          action={<Button label="Uploader un fichier" onPress={() => void handleUpload()} />}
        />
      ) : (
        <View style={styles.grid}>
          {docs.map((doc) => {
            const url = doc.url?.startsWith('http') ? doc.url : `${getApiBaseUrl()}${doc.url || ''}`
            const isImage = (doc.mimeType || '').startsWith('image/')
            return (
              <Card key={String(doc.id)} style={styles.card}>
                {isImage && doc.url ? (
                  <Image source={{ uri: url }} style={styles.image} resizeMode="cover" />
                ) : (
                  <View style={styles.fileThumb}>
                    <Text style={styles.fileThumbText}>PDF</Text>
                  </View>
                )}
                <Text style={styles.name} numberOfLines={2}>
                  {doc.alt || doc.filename || `Média ${doc.id}`}
                </Text>
              </Card>
            )
          })}
        </View>
      )}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: { gap: spacing.lg, paddingBottom: 40, maxWidth: 1100, width: '100%', alignSelf: 'center' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  card: { width: 160, padding: 0, overflow: 'hidden' },
  image: { width: '100%', height: 120, backgroundColor: colors.slate100 },
  fileThumb: {
    height: 120,
    backgroundColor: colors.slate100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fileThumbText: { fontWeight: '800', color: colors.slate400 },
  name: { padding: 10, fontSize: 12, color: colors.slate600 },
  error: { color: colors.danger },
})
