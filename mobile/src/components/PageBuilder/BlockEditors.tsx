import React from 'react'
import { View, StyleSheet, Text, Pressable } from 'react-native'
import { Input, Button } from '../ui'
import { colors } from '../../theme/colors'
import { Trash2, Plus } from 'lucide-react-native'
import type { PageBlock } from '../../types/landing-page'

type EditorProps = {
  block: PageBlock
  onChange: (updates: Partial<PageBlock>) => void
}

export function TextBlockEditor({ block, onChange }: EditorProps) {
  return (
    <View style={styles.editor}>
      <Input
        label="Titre (Optionnel)"
        value={block.title || ''}
        onChangeText={(v) => onChange({ title: v })}
        placeholder="Mon paragraphe"
      />
      <Input
        label="Contenu HTML ou Texte libre"
        value={block.htmlContent || ''}
        onChangeText={(v) => onChange({ htmlContent: v })}
        placeholder="Tapez votre contenu ici... (balises HTML supportées <b>, <i>, <br>...)"
        multiline
        style={{ minHeight: 120, textAlignVertical: 'top' }}
      />
    </View>
  )
}

export function GalleryBlockEditor({ block, onChange }: EditorProps) {
  const images = block.images || []
  return (
    <View style={styles.editor}>
      <Input
        label="Titre de la galerie (Optionnel)"
        value={block.title || ''}
        onChangeText={(v) => onChange({ title: v })}
        placeholder="Mes photos"
      />
      <Text style={styles.label}>URLs des images</Text>
      {images.map((img, idx) => (
        <View key={idx} style={styles.imageRow}>
          <View style={{ flex: 1 }}>
            <Input
              value={img}
              onChangeText={(v) => {
                const newImgs = [...images]
                newImgs[idx] = v
                onChange({ images: newImgs })
              }}
              placeholder="https://..."
            />
          </View>
          <Button
            label=""
            icon={<Trash2 size={16} color={colors.white} />}
            variant="danger"
            onPress={() => {
              const newImgs = [...images]
              newImgs.splice(idx, 1)
              onChange({ images: newImgs })
            }}
          />
        </View>
      ))}
      <Button
        label="Ajouter une image"
        variant="secondary"
        icon={<Plus size={16} color={colors.ink} />}
        onPress={() => {
          onChange({ images: [...images, ''] })
        }}
      />
    </View>
  )
}

export function ContactBlockEditor({ block, onChange }: EditorProps) {
  return (
    <View style={styles.editor}>
      <Input
        label="Titre (Optionnel)"
        value={block.title || ''}
        onChangeText={(v) => onChange({ title: v })}
        placeholder="Nous contacter"
      />
      <Input
        label="Email"
        value={block.email || ''}
        onChangeText={(v) => onChange({ email: v })}
        placeholder="contact@exemple.com"
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <Input
        label="Téléphone"
        value={block.phone || ''}
        onChangeText={(v) => onChange({ phone: v })}
        placeholder="+33 6 12 34 56 78"
        keyboardType="phone-pad"
      />
      <Input
        label="Adresse complète"
        value={block.address || ''}
        onChangeText={(v) => onChange({ address: v })}
        placeholder="12 rue de la Paix, 75000 Paris"
        multiline
      />
    </View>
  )
}

export function CtaBlockEditor({ block, onChange }: EditorProps) {
  return (
    <View style={styles.editor}>
      <Input
        label="Titre (Optionnel)"
        value={block.title || ''}
        onChangeText={(v) => onChange({ title: v })}
      />
      <Input
        label="Texte du bouton"
        value={block.buttonText || ''}
        onChangeText={(v) => onChange({ buttonText: v })}
        placeholder="Cliquez ici"
      />
      <Input
        label="Lien de destination"
        value={block.buttonUrl || ''}
        onChangeText={(v) => onChange({ buttonUrl: v })}
        placeholder="https://..."
        autoCapitalize="none"
        keyboardType="url"
      />
    </View>
  )
}

const styles = StyleSheet.create({
  editor: {
    gap: 12,
    marginTop: 12,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.slate700,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  imageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
})
