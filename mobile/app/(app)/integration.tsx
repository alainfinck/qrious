import React, { useState } from 'react'
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
  Linking,
  Platform,
} from 'react-native'
import * as Clipboard from 'expo-clipboard'
import {
  Check,
  Code,
  Copy,
  ExternalLink,
  Globe,
  Lock,
  Layers,
  Sparkles,
} from 'lucide-react-native'

import { Card, Input, PageHeader } from '../../src/components/ui'
import { colors, spacing } from '../../src/theme/colors'

type CodeTab = 'iframe' | 'url' | 'react'

export default function EmbedConfigScreen() {
  const [initialUrl, setInitialUrl] = useState('https://www.cartepostale.cool/agencies/agence-test')
  const [lockUrl, setLockUrl] = useState(true)
  const [partner, setPartner] = useState('cartepostale')
  const [iframeWidth, setIframeWidth] = useState('100%')
  const [iframeHeight, setIframeHeight] = useState('680')
  const [activeTab, setActiveTab] = useState<CodeTab>('iframe')
  const [copied, setCopied] = useState(false)

  const origin = typeof window !== 'undefined' && window.location.origin
    ? window.location.origin
    : 'https://www.qrious.fr'

  // Build the embed URL based on parameter inputs
  const buildEmbedUrl = () => {
    const params = new URLSearchParams()
    params.set('embed', '1')
    if (initialUrl.trim()) {
      params.set('url', initialUrl.trim())
    }
    if (lockUrl) {
      params.set('lockUrl', '1')
    }
    if (partner.trim()) {
      params.set('partner', partner.trim())
    }
    return `${origin}/embed?${params.toString()}`
  }

  const embedUrl = buildEmbedUrl()

  // Generate code snippet based on active tab
  const getCodeSnippet = () => {
    const w = iframeWidth.trim() || '100%'
    const h = iframeHeight.trim() || '680'
    const cleanHeight = h.endsWith('px') ? h : `${h}px`

    switch (activeTab) {
      case 'iframe':
        return `<iframe
  src="${embedUrl}"
  width="${w}"
  height="${h}"
  frameborder="0"
  style="border: none; border-radius: 12px; overflow: hidden; width: ${w}; height: ${cleanHeight}; shadow: 0 4px 12px rgba(0,0,0,0.08);"
  allow="clipboard-write"
></iframe>`

      case 'url':
        return embedUrl

      case 'react':
        return `<iframe
  src="${embedUrl}"
  style={{
    width: '${w}',
    height: '${cleanHeight}',
    border: 'none',
    borderRadius: '12px',
    overflow: 'hidden',
  }}
  allow="clipboard-write"
/>`
    }
  }

  const handleCopy = async () => {
    const code = getCodeSnippet()
    await Clipboard.setStringAsync(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2200)
  }

  const handleOpenPreview = () => {
    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      window.open(embedUrl, '_blank')
    } else {
      void Linking.openURL(embedUrl)
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <PageHeader
        title="Intégration (Embed)"
        description="Configurez le module d'édition de QR code et générez le code d'intégration HTML/Iframe pour votre site web."
      />

      <View style={styles.layoutRow}>
        {/* Left Column: Configuration Settings */}
        <View style={styles.configCol}>
          <Card style={styles.card}>
            <View style={styles.cardHeader}>
              <Sparkles size={20} color={colors.signal} />
              <Text style={styles.cardTitle}>Paramètres du Widget</Text>
            </View>

            <Input
              label="URL de destination pré-remplie"
              value={initialUrl}
              onChangeText={setInitialUrl}
              placeholder="https://votre-site.com/ma-page"
              autoCapitalize="none"
            />

            <View style={styles.switchRow}>
              <View style={styles.switchTextCol}>
                <View style={styles.switchLabelRow}>
                  <Lock size={15} color={colors.slate600} />
                  <Text style={styles.switchTitle}>Verrouiller l'URL cible</Text>
                </View>
                <Text style={styles.switchDesc}>
                  Empêche l'utilisateur final de modifier l'URL pré-remplie dans le widget.
                </Text>
              </View>
              <Switch
                value={lockUrl}
                onValueChange={setLockUrl}
                trackColor={{ false: colors.slate200, true: colors.slate900 }}
                thumbColor="#fff"
              />
            </View>

            <Input
              label="Identifiant Partenaire (optionnel)"
              value={partner}
              onChangeText={setPartner}
              placeholder="ex: cartepostale, mysite"
              autoCapitalize="none"
            />

            <View style={styles.dimensionsRow}>
              <View style={{ flex: 1 }}>
                <Input
                  label="Largeur Iframe"
                  value={iframeWidth}
                  onChangeText={setIframeWidth}
                  placeholder="100% ou 600px"
                  autoCapitalize="none"
                />
              </View>
              <View style={{ flex: 1 }}>
                <Input
                  label="Hauteur (px)"
                  value={iframeHeight}
                  onChangeText={setIframeHeight}
                  placeholder="680"
                  keyboardType="numeric"
                />
              </View>
            </View>
          </Card>

          {/* Quick instructions card */}
          <Card style={styles.infoCard}>
            <Text style={styles.infoTitle}>💡 Bon à savoir</Text>
            <Text style={styles.infoText}>
              Le widget s'adapte automatiquement aux écrans mobiles et ordinateurs. Les visiteurs pourront personnaliser et télécharger leur QR code directement depuis votre site.
            </Text>
          </Card>
        </View>

        {/* Right Column: Code Output & Live Preview */}
        <View style={styles.codeCol}>
          {/* Code Snippet Card */}
          <Card style={styles.card}>
            <View style={styles.codeCardHeader}>
              <View style={styles.tabContainer}>
                <Pressable
                  style={[styles.tabBtn, activeTab === 'iframe' && styles.tabBtnActive]}
                  onPress={() => setActiveTab('iframe')}
                >
                  <Code size={16} color={activeTab === 'iframe' ? colors.slate900 : colors.slate500} />
                  <Text style={[styles.tabText, activeTab === 'iframe' && styles.tabTextActive]}>
                    HTML Iframe
                  </Text>
                </Pressable>

                <Pressable
                  style={[styles.tabBtn, activeTab === 'react' && styles.tabBtnActive]}
                  onPress={() => setActiveTab('react')}
                >
                  <Layers size={16} color={activeTab === 'react' ? colors.slate900 : colors.slate500} />
                  <Text style={[styles.tabText, activeTab === 'react' && styles.tabTextActive]}>
                    React JSX
                  </Text>
                </Pressable>

                <Pressable
                  style={[styles.tabBtn, activeTab === 'url' && styles.tabBtnActive]}
                  onPress={() => setActiveTab('url')}
                >
                  <Globe size={16} color={activeTab === 'url' ? colors.slate900 : colors.slate500} />
                  <Text style={[styles.tabText, activeTab === 'url' && styles.tabTextActive]}>
                    Lien Direct
                  </Text>
                </Pressable>
              </View>

              <Pressable style={styles.copyBtn} onPress={() => void handleCopy()}>
                {copied ? (
                  <>
                    <Check size={16} color={colors.success} />
                    <Text style={[styles.copyBtnText, { color: colors.success }]}>Copié !</Text>
                  </>
                ) : (
                  <>
                    <Copy size={16} color={colors.slate700} />
                    <Text style={styles.copyBtnText}>Copier le code</Text>
                  </>
                )}
              </Pressable>
            </View>

            {/* Code View */}
            <View style={styles.codeBlock}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <Text style={styles.codeText}>{getCodeSnippet()}</Text>
              </ScrollView>
            </View>
          </Card>

          {/* Live Preview Card */}
          <Card style={styles.card}>
            <View style={styles.previewHeader}>
              <Text style={styles.cardTitle}>Aperçu du Widget</Text>
              <Pressable style={styles.openBtn} onPress={handleOpenPreview}>
                <ExternalLink size={15} color={colors.slate700} />
                <Text style={styles.openBtnText}>Ouvrir dans un onglet</Text>
              </Pressable>
            </View>

            {/* Live iframe container for web platform */}
            {Platform.OS === 'web' ? (
              <View style={styles.iframeContainer}>
                {/* @ts-ignore iframe is supported on web */}
                <iframe
                  src={embedUrl}
                  style={{
                    width: '100%',
                    height: '520px',
                    border: 'none',
                    borderRadius: 12,
                  }}
                  title="Aperçu Intégration QRious"
                />
              </View>
            ) : (
              <View style={styles.fallbackPreview}>
                <Text style={styles.fallbackText}>
                  Aperçu disponible en ouvrant le lien direct sur le navigateur web.
                </Text>
                <Pressable style={styles.openBtnLarge} onPress={handleOpenPreview}>
                  <ExternalLink size={16} color="#fff" />
                  <Text style={styles.openBtnLargeText}>Tester le lien embed</Text>
                </Pressable>
              </View>
            )}
          </Card>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.lg,
    paddingBottom: 40,
    maxWidth: 1200,
    width: '100%',
    alignSelf: 'center',
  },
  layoutRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.lg,
  },
  configCol: {
    flex: 1,
    minWidth: 320,
    gap: spacing.lg,
  },
  codeCol: {
    flex: 1.4,
    minWidth: 340,
    gap: spacing.lg,
  },
  card: {
    gap: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingBottom: 4,
    borderBottomWidth: 1,
    borderBottomColor: colors.slate100,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.ink,
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: colors.slate50,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.slate200,
    gap: 12,
  },
  switchTextCol: {
    flex: 1,
    gap: 4,
  },
  switchLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  switchTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.ink,
  },
  switchDesc: {
    fontSize: 12,
    color: colors.slate500,
  },
  dimensionsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  infoCard: {
    backgroundColor: '#F0FDFA',
    borderColor: '#CCFBF1',
    gap: 8,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F766E',
  },
  infoText: {
    fontSize: 13,
    lineHeight: 20,
    color: '#115E59',
  },
  codeCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 10,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: colors.slate100,
    borderRadius: 10,
    padding: 3,
    gap: 4,
  },
  tabBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  tabBtnActive: {
    backgroundColor: colors.white,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 1,
  },
  tabText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.slate500,
  },
  tabTextActive: {
    color: colors.slate900,
  },
  copyBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: colors.slate100,
    borderRadius: 10,
  },
  copyBtnText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.slate800,
  },
  codeBlock: {
    backgroundColor: '#0F172A',
    borderRadius: 12,
    padding: 16,
    minHeight: 120,
    justifyContent: 'center',
  },
  codeText: {
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    fontSize: 13,
    color: '#38BDF8',
    lineHeight: 20,
  },
  previewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 8,
  },
  openBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: colors.slate100,
  },
  openBtnText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.slate700,
  },
  iframeContainer: {
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.slate200,
    backgroundColor: colors.slate50,
  },
  fallbackPreview: {
    padding: 30,
    alignItems: 'center',
    gap: 16,
    backgroundColor: colors.slate50,
    borderRadius: 12,
  },
  fallbackText: {
    fontSize: 14,
    color: colors.slate500,
    textAlign: 'center',
  },
  openBtnLarge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: colors.slate900,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
  },
  openBtnLargeText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
})
