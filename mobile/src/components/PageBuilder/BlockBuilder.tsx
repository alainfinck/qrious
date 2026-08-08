import React from 'react'
import { View, StyleSheet, Text, Pressable, ScrollView } from 'react-native'
import { Plus, Trash2, ArrowUp, ArrowDown, Type, Image as ImageIcon, Phone, MousePointerClick } from 'lucide-react-native'
import { colors } from '../../theme/colors'
import { Button } from '../ui'
import type { PageBlock, PageBlockType } from '../../types/landing-page'
import { TextBlockEditor, GalleryBlockEditor, ContactBlockEditor, CtaBlockEditor } from './BlockEditors'

type Props = {
  blocks: PageBlock[]
  onChange: (blocks: PageBlock[]) => void
}

const BLOCK_CONFIG: Record<PageBlockType, { label: string; icon: any }> = {
  text: { label: 'Texte / HTML', icon: Type },
  gallery: { label: 'Galerie Photos', icon: ImageIcon },
  contact: { label: 'Contact', icon: Phone },
  cta: { label: 'Bouton CTA', icon: MousePointerClick },
  hero: { label: 'Hero Section', icon: ImageIcon }, // Optional, not used yet
}

export function BlockBuilder({ blocks, onChange }: Props) {
  
  const addBlock = (type: PageBlockType) => {
    const newBlock: PageBlock = {
      id: Math.random().toString(36).substring(2, 9),
      type,
    }
    onChange([...blocks, newBlock])
  }

  const updateBlock = (index: number, updates: Partial<PageBlock>) => {
    const newBlocks = [...blocks]
    newBlocks[index] = { ...newBlocks[index], ...updates }
    onChange(newBlocks)
  }

  const removeBlock = (index: number) => {
    const newBlocks = [...blocks]
    newBlocks.splice(index, 1)
    onChange(newBlocks)
  }

  const moveBlock = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return
    if (direction === 'down' && index === blocks.length - 1) return
    
    const newBlocks = [...blocks]
    const targetIndex = direction === 'up' ? index - 1 : index + 1
    const temp = newBlocks[index]
    newBlocks[index] = newBlocks[targetIndex]
    newBlocks[targetIndex] = temp
    
    onChange(newBlocks)
  }

  const renderEditor = (block: PageBlock, index: number) => {
    switch (block.type) {
      case 'text':
        return <TextBlockEditor block={block} onChange={(u) => updateBlock(index, u)} />
      case 'gallery':
        return <GalleryBlockEditor block={block} onChange={(u) => updateBlock(index, u)} />
      case 'contact':
        return <ContactBlockEditor block={block} onChange={(u) => updateBlock(index, u)} />
      case 'cta':
        return <CtaBlockEditor block={block} onChange={(u) => updateBlock(index, u)} />
      default:
        return <Text>Type non supporté</Text>
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Contenu de la page (Blocs)</Text>
      <Text style={styles.subtitle}>Empilez et réorganisez les blocs pour créer votre page sur-mesure.</Text>

      <View style={styles.blockList}>
        {blocks.map((block, index) => {
          const config = BLOCK_CONFIG[block.type]
          const Icon = config?.icon || Type
          
          return (
            <View key={block.id} style={styles.blockCard}>
              <View style={styles.blockHeader}>
                <View style={styles.blockHeaderLeft}>
                  <Icon size={16} color={colors.slate700} />
                  <Text style={styles.blockTypeLabel}>{config?.label || block.type}</Text>
                </View>
                <View style={styles.blockHeaderActions}>
                  <Pressable 
                    onPress={() => moveBlock(index, 'up')}
                    disabled={index === 0}
                    style={[styles.actionBtn, index === 0 && styles.actionBtnDisabled]}
                  >
                    <ArrowUp size={16} color={colors.slate700} />
                  </Pressable>
                  <Pressable 
                    onPress={() => moveBlock(index, 'down')}
                    disabled={index === blocks.length - 1}
                    style={[styles.actionBtn, index === blocks.length - 1 && styles.actionBtnDisabled]}
                  >
                    <ArrowDown size={16} color={colors.slate700} />
                  </Pressable>
                  <Pressable 
                    onPress={() => removeBlock(index)}
                    style={styles.actionBtn}
                  >
                    <Trash2 size={16} color={colors.coral} />
                  </Pressable>
                </View>
              </View>
              
              <View style={styles.blockContent}>
                {renderEditor(block, index)}
              </View>
            </View>
          )
        })}
      </View>

      <View style={styles.addSection}>
        <Text style={styles.addTitle}>Ajouter un bloc</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.addList}>
          {(['text', 'gallery', 'contact', 'cta'] as PageBlockType[]).map((type) => {
            const config = BLOCK_CONFIG[type]
            const Icon = config.icon
            return (
              <Pressable key={type} style={styles.addBtn} onPress={() => addBlock(type)}>
                <View style={styles.addBtnIcon}>
                  <Icon size={18} color={colors.signal} />
                </View>
                <Text style={styles.addBtnText}>{config.label}</Text>
              </Pressable>
            )
          })}
        </ScrollView>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: 16,
    paddingVertical: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.ink,
  },
  subtitle: {
    fontSize: 13,
    color: colors.slate600,
    marginTop: -10,
  },
  blockList: {
    gap: 16,
  },
  blockCard: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: 'rgba(15,23,42,0.1)',
    borderRadius: 12,
    overflow: 'hidden',
  },
  blockHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: colors.slate50,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(15,23,42,0.06)',
  },
  blockHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  blockTypeLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.slate800,
  },
  blockHeaderActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  actionBtn: {
    padding: 6,
    borderRadius: 6,
    backgroundColor: 'rgba(15,23,42,0.04)',
  },
  actionBtnDisabled: {
    opacity: 0.3,
  },
  blockContent: {
    padding: 16,
  },
  addSection: {
    marginTop: 16,
    padding: 16,
    backgroundColor: 'rgba(15,23,42,0.03)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(15,23,42,0.06)',
    borderStyle: 'dashed',
  },
  addTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.slate700,
    marginBottom: 12,
  },
  addList: {
    gap: 12,
  },
  addBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: colors.white,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(15,23,42,0.08)',
  },
  addBtnIcon: {
    width: 28,
    height: 28,
    borderRadius: 6,
    backgroundColor: 'rgba(110,93,242,0.1)', // signal light
    alignItems: 'center',
    justifyContent: 'center',
  },
  addBtnText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.slate800,
  },
})
