import React, { useCallback, useRef, useState } from 'react'
import {
  Image,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import * as DocumentPicker from 'expo-document-picker'
import * as ImagePicker from 'expo-image-picker'
import { ImagePlus, Upload } from 'lucide-react-native'

import { fetchMedia, uploadMedia } from '../../src/api/landing-pages'
import { Button, Card, EmptyState, LoadingBlock, PageHeader } from '../../src/components/ui'
import { getApiBaseUrl } from '../../src/lib/utils'
import { colors, spacing } from '../../src/theme/colors'

const MAX_BYTES = 50 * 1024 * 1024
const ACCEPT = 'image/*,application/pdf'

type MediaDoc = {
  id: string | number
  alt?: string | null
  url?: string | null
  filename?: string | null
  mimeType?: string | null
  filesize?: number | null
}

type DragEventLike = {
  preventDefault?: () => void
  stopPropagation?: () => void
  dataTransfer?: { files?: FileList }
}

function isAllowedFile(file: File) {
  return (
    file.size > 0 &&
    file.size <= MAX_BYTES &&
    (file.type.startsWith('image/') || file.type === 'application/pdf')
  )
}

function formatMaxSize() {
  return '50 Mo'
}

export default function MediasScreen() {
  const [docs, setDocs] = useState<MediaDoc[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [pendingCount, setPendingCount] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [dragging, setDragging] = useState(false)
  const dragDepth = useRef(0)
  const inputRef = useRef<HTMLInputElement | null>(null)

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

  React.useEffect(() => {
    void reload()
  }, [reload])

  const uploadFiles = useCallback(
    async (files: File[]) => {
      const allowed = files.filter(isAllowedFile)
      if (allowed.length === 0) {
        setError(`Seules les images et PDF jusqu’à ${formatMaxSize()} sont acceptés.`)
        return
      }

      setUploading(true)
      setPendingCount(allowed.length)
      setError(null)
      try {
        for (const file of allowed) {
          await uploadMedia(file)
        }
        await reload()
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Échec de l’upload')
      } finally {
        setUploading(false)
        setPendingCount(0)
      }
    },
    [reload],
  )

  function openWebFilePicker() {
    if (typeof document === 'undefined') return
    const existing = inputRef.current
    if (existing) {
      existing.click()
      return
    }
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = ACCEPT
    input.multiple = true
    input.style.display = 'none'
    input.onchange = () => {
      const files = Array.from(input.files || [])
      void uploadFiles(files)
      input.remove()
      inputRef.current = null
    }
    document.body.appendChild(input)
    inputRef.current = input
    input.click()
  }

  async function handleNativeUpload() {
    setUploading(true)
    setError(null)
    try {
      const image = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        quality: 0.9,
      })
      if (!image.canceled && image.assets[0]) {
        const asset = image.assets[0]
        if (asset.fileSize && asset.fileSize > MAX_BYTES) {
          setError(`Le fichier dépasse la limite de ${formatMaxSize()}.`)
          return
        }
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
        multiple: true,
      })
      if (!doc.canceled && doc.assets?.length) {
        for (const asset of doc.assets) {
          if (asset.size && asset.size > MAX_BYTES) {
            setError(`« ${asset.name} » dépasse la limite de ${formatMaxSize()}.`)
            return
          }
          await uploadMedia({
            uri: asset.uri,
            name: asset.name,
            type: asset.mimeType || 'application/octet-stream',
          })
        }
        await reload()
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Échec de l’upload')
    } finally {
      setUploading(false)
    }
  }

  function handleUpload() {
    if (Platform.OS === 'web') {
      openWebFilePicker()
      return
    }
    void handleNativeUpload()
  }

  const dropHandlers =
    Platform.OS === 'web'
      ? {
          onDragEnter: (e: DragEventLike) => {
            e.preventDefault?.()
            e.stopPropagation?.()
            dragDepth.current += 1
            if (!uploading) setDragging(true)
          },
          onDragOver: (e: DragEventLike) => {
            e.preventDefault?.()
            e.stopPropagation?.()
            if (!uploading) setDragging(true)
          },
          onDragLeave: (e: DragEventLike) => {
            e.preventDefault?.()
            e.stopPropagation?.()
            dragDepth.current = Math.max(0, dragDepth.current - 1)
            if (dragDepth.current === 0) setDragging(false)
          },
          onDrop: (e: DragEventLike) => {
            e.preventDefault?.()
            e.stopPropagation?.()
            dragDepth.current = 0
            setDragging(false)
            if (uploading) return
            const files = Array.from(e.dataTransfer?.files || [])
            void uploadFiles(files)
          },
        }
      : undefined

  if (loading) return <LoadingBlock />

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <PageHeader
        title="Médias"
        description="Bibliothèque d’images et PDF pour vos landing pages."
        action={<Button label="Uploader" loading={uploading} onPress={handleUpload} />}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}

      {Platform.OS === 'web' ? (
        <Pressable
          onPress={handleUpload}
          disabled={uploading}
          accessibilityRole="button"
          accessibilityLabel="Déposer ou choisir des médias"
          style={({ pressed }) => [
            styles.dropZone,
            dragging && styles.dropZoneActive,
            pressed && !uploading && styles.dropZonePressed,
            uploading && styles.dropZoneDisabled,
          ]}
          // @ts-expect-error web drag-and-drop events (react-native-web)
          {...dropHandlers}
        >
          <View style={[styles.dropIconWrap, dragging && styles.dropIconWrapActive]}>
            {uploading ? (
              <Upload size={28} color={colors.signal} />
            ) : (
              <ImagePlus size={28} color={dragging ? colors.signal : colors.slate500} />
            )}
          </View>
          <Text style={styles.dropTitle}>
            {uploading
              ? `Upload de ${pendingCount || 1} fichier${(pendingCount || 1) > 1 ? 's' : ''}…`
              : dragging
                ? 'Relâchez pour uploader'
                : 'Glissez-déposez vos médias ici'}
          </Text>
          <Text style={styles.dropHint}>
            Images ou PDF · max {formatMaxSize()} · plusieurs fichiers acceptés
          </Text>
          <View style={styles.browseRow}>
            <ImagePlus size={16} color={colors.slate600} />
            <Text style={styles.browseText}>Parcourir les fichiers</Text>
          </View>
        </Pressable>
      ) : null}

      {docs.length === 0 ? (
        <EmptyState
          title="Aucun média"
          description={`Ajoutez des images ou PDF (max ${formatMaxSize()}).`}
          action={
            Platform.OS === 'web' ? undefined : (
              <Button label="Uploader un fichier" onPress={handleUpload} />
            )
          }
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
  dropZone: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    paddingVertical: 40,
    paddingHorizontal: spacing.xl,
    borderRadius: 16,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: colors.slate300,
    backgroundColor: colors.slate50,
  },
  dropZoneActive: {
    borderColor: colors.signal,
    backgroundColor: 'rgba(18, 196, 168, 0.08)',
  },
  dropZonePressed: {
    borderColor: colors.slate400,
    backgroundColor: colors.slate100,
  },
  dropZoneDisabled: {
    opacity: 0.7,
  },
  dropIconWrap: {
    width: 56,
    height: 56,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.slate200,
    marginBottom: spacing.xs,
  },
  dropIconWrapActive: {
    borderColor: colors.signal,
  },
  dropTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.slate900,
    textAlign: 'center',
  },
  dropHint: {
    fontSize: 13,
    color: colors.slate500,
    textAlign: 'center',
  },
  browseRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: spacing.sm,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.slate200,
    backgroundColor: colors.white,
  },
  browseText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.slate600,
  },
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
