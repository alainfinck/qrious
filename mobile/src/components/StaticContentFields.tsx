import React from 'react'
import { Linking, Platform, Pressable, StyleSheet, Switch, Text, View } from 'react-native'
import {
  CalendarDays,
  Check,
  Copy,
  ExternalLink,
  FileText,
  Link2,
  Mail,
  MapPin,
  MessageCircle,
  MessageSquare,
  Phone,
  Share2,
  Smartphone,
  Type,
  User,
  Wifi,
  type LucideIcon,
} from 'lucide-react-native'
import * as Clipboard from 'expo-clipboard'

import { Input, TextArea } from './ui'
import {
  STATIC_CONTENT_TYPES,
  type StaticQrContentType,
  type StaticQrPayload,
} from '../lib/qr-payload'
import { colors, spacing } from '../theme/colors'

const ICONS: Record<StaticQrContentType, LucideIcon> = {
  url: Link2,
  text: Type,
  email: Mail,
  phone: Phone,
  sms: MessageSquare,
  wifi: Wifi,
  vcard: User,
  whatsapp: MessageCircle,
  location: MapPin,
  event: CalendarDays,
  social: Share2,
  pdf: FileText,
  app: Smartphone,
}

type Props = {
  contentType: StaticQrContentType
  payload: StaticQrPayload
  /** Masque le sélecteur de type et fige l’URL (partenaire embed) */
  lockUrl?: boolean
  hideTypeSelector?: boolean
  onTypeChange: (type: StaticQrContentType) => void
  onPayloadChange: (payload: StaticQrPayload) => void
}

export function StaticContentFields({
  contentType,
  payload,
  lockUrl = false,
  hideTypeSelector = false,
  onTypeChange,
  onPayloadChange,
}: Props) {
  return (
    <View style={styles.root}>
      <Text style={styles.hint}>
        {lockUrl
          ? 'Destination verrouillée par le site hôte. Personnalisez le design à l’étape suivante.'
          : 'QR figé : le contenu est gravé dans le code. Pour éditer plus tard, choisissez Smart Page.'}
      </Text>
      {!lockUrl && !hideTypeSelector ? (
        <View style={styles.typeGrid}>
          {STATIC_CONTENT_TYPES.map((opt) => {
            const Icon = ICONS[opt.value]
            const active = contentType === opt.value
            return (
              <Pressable
                key={opt.value}
                onPress={() => onTypeChange(opt.value)}
                style={[styles.typeCard, active && styles.typeCardActive]}
              >
                <View style={[styles.typeIcon, active && styles.typeIconActive]}>
                  <Icon size={16} color={active ? colors.ink : colors.slate700} />
                </View>
                <Text
                  style={[styles.typeLabel, active && { color: colors.white }]}
                  numberOfLines={1}
                >
                  {opt.label}
                </Text>
              </Pressable>
            )
          })}
        </View>
      ) : null}

      <StaticFields payload={payload} onChange={onPayloadChange} urlReadOnly={lockUrl} />
    </View>
  )
}

function CopyUrlButton({ url }: { url: string }) {
  const [copied, setCopied] = React.useState(false)
  if (!url) return null

  const handleOpen = () => {
    const targetUrl = url.startsWith('http://') || url.startsWith('https://') ? url : `https://${url}`
    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      window.open(targetUrl, '_blank')
    } else {
      void Linking.openURL(targetUrl)
    }
  }

  const handleCopy = async () => {
    await Clipboard.setStringAsync(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}>
      <Pressable
        onPress={handleOpen}
        style={{ padding: 4 }}
        hitSlop={6}
      >
        <ExternalLink size={16} color={colors.slate500} />
      </Pressable>
      <Pressable
        onPress={() => void handleCopy()}
        style={{ padding: 4 }}
        hitSlop={6}
      >
        {copied ? (
          <Check size={16} color={colors.signal} />
        ) : (
          <Copy size={16} color={colors.slate500} />
        )}
      </Pressable>
    </View>
  )
}

function StaticFields({
  payload,
  onChange,
  urlReadOnly = false,
}: {
  payload: StaticQrPayload
  onChange: (p: StaticQrPayload) => void
  urlReadOnly?: boolean
}) {
  switch (payload.type) {
    case 'url':
      return (
        <Input
          label="Lien web (URL)"
          value={payload.data.url}
          onChangeText={(url) => onChange({ type: 'url', data: { url } })}
          autoCapitalize="none"
          placeholder="https://"
          editable={!urlReadOnly}
          selectTextOnFocus={!urlReadOnly}
          rightElement={<CopyUrlButton url={payload.data.url} />}
        />
      )
    case 'text':
      return (
        <TextArea
          label="Texte"
          value={payload.data.text}
          onChangeText={(text) => onChange({ type: 'text', data: { text } })}
        />
      )
    case 'email':
      return (
        <View style={styles.fields}>
          <Input
            label="Email"
            value={payload.data.email}
            onChangeText={(email) => onChange({ ...payload, data: { ...payload.data, email } })}
            autoCapitalize="none"
          />
          <Input
            label="Sujet"
            value={payload.data.subject}
            onChangeText={(subject) => onChange({ ...payload, data: { ...payload.data, subject } })}
          />
          <TextArea
            label="Corps"
            value={payload.data.body}
            onChangeText={(body) => onChange({ ...payload, data: { ...payload.data, body } })}
          />
        </View>
      )
    case 'phone':
      return (
        <Input
          label="Téléphone"
          value={payload.data.phone}
          onChangeText={(phone) => onChange({ type: 'phone', data: { phone } })}
          keyboardType="phone-pad"
        />
      )
    case 'sms':
      return (
        <View style={styles.fields}>
          <Input
            label="Téléphone"
            value={payload.data.phone}
            onChangeText={(phone) => onChange({ ...payload, data: { ...payload.data, phone } })}
            keyboardType="phone-pad"
          />
          <TextArea
            label="Message"
            value={payload.data.message}
            onChangeText={(message) => onChange({ ...payload, data: { ...payload.data, message } })}
          />
        </View>
      )
    case 'wifi':
      return (
        <View style={styles.fields}>
          <Input
            label="SSID"
            value={payload.data.ssid}
            onChangeText={(ssid) => onChange({ ...payload, data: { ...payload.data, ssid } })}
          />
          <Input
            label="Mot de passe"
            value={payload.data.password}
            onChangeText={(password) => onChange({ ...payload, data: { ...payload.data, password } })}
          />
          <View style={styles.chipRow}>
            {(['WPA', 'WEP', 'nopass'] as const).map((enc) => {
              const active = payload.data.encryption === enc
              return (
                <Pressable
                  key={enc}
                  onPress={() => onChange({ ...payload, data: { ...payload.data, encryption: enc } })}
                  style={[styles.chip, active && styles.chipActive]}
                >
                  <Text style={[styles.chipText, active && { color: colors.white }]}>{enc}</Text>
                </Pressable>
              )
            })}
          </View>
          <View style={styles.switchRow}>
            <Text style={styles.switchLabel}>Réseau masqué</Text>
            <Switch
              value={payload.data.hidden}
              onValueChange={(hidden) => onChange({ ...payload, data: { ...payload.data, hidden } })}
            />
          </View>
        </View>
      )
    case 'vcard':
      return (
        <View style={styles.fields}>
          <Input
            label="Prénom"
            value={payload.data.firstName}
            onChangeText={(firstName) => onChange({ ...payload, data: { ...payload.data, firstName } })}
          />
          <Input
            label="Nom"
            value={payload.data.lastName}
            onChangeText={(lastName) => onChange({ ...payload, data: { ...payload.data, lastName } })}
          />
          <Input
            label="Société"
            value={payload.data.organization}
            onChangeText={(organization) =>
              onChange({ ...payload, data: { ...payload.data, organization } })
            }
          />
          <Input
            label="Poste"
            value={payload.data.title}
            onChangeText={(title) => onChange({ ...payload, data: { ...payload.data, title } })}
          />
          <Input
            label="Téléphone"
            value={payload.data.phone}
            onChangeText={(phone) => onChange({ ...payload, data: { ...payload.data, phone } })}
          />
          <Input
            label="Email"
            value={payload.data.email}
            onChangeText={(email) => onChange({ ...payload, data: { ...payload.data, email } })}
            autoCapitalize="none"
          />
          <Input
            label="Site"
            value={payload.data.website}
            onChangeText={(website) => onChange({ ...payload, data: { ...payload.data, website } })}
            autoCapitalize="none"
          />
        </View>
      )
    case 'whatsapp':
      return (
        <View style={styles.fields}>
          <Input
            label="Téléphone (+33…)"
            value={payload.data.phone}
            onChangeText={(phone) => onChange({ ...payload, data: { ...payload.data, phone } })}
          />
          <TextArea
            label="Message"
            value={payload.data.message}
            onChangeText={(message) => onChange({ ...payload, data: { ...payload.data, message } })}
          />
        </View>
      )
    case 'location':
      return (
        <View style={styles.fields}>
          <Input
            label="Adresse"
            value={payload.data.address}
            onChangeText={(address) => onChange({ ...payload, data: { ...payload.data, address } })}
          />
          <Input
            label="Latitude"
            value={payload.data.latitude}
            onChangeText={(latitude) => onChange({ ...payload, data: { ...payload.data, latitude } })}
          />
          <Input
            label="Longitude"
            value={payload.data.longitude}
            onChangeText={(longitude) =>
              onChange({ ...payload, data: { ...payload.data, longitude } })
            }
          />
        </View>
      )
    case 'event':
      return (
        <View style={styles.fields}>
          <Input
            label="Titre"
            value={payload.data.title}
            onChangeText={(title) => onChange({ ...payload, data: { ...payload.data, title } })}
          />
          <Input
            label="Début (YYYYMMDDTHHMMSS)"
            value={payload.data.startDate}
            onChangeText={(startDate) =>
              onChange({ ...payload, data: { ...payload.data, startDate } })
            }
          />
          <Input
            label="Fin"
            value={payload.data.endDate}
            onChangeText={(endDate) => onChange({ ...payload, data: { ...payload.data, endDate } })}
          />
          <Input
            label="Lieu"
            value={payload.data.location}
            onChangeText={(location) => onChange({ ...payload, data: { ...payload.data, location } })}
          />
          <TextArea
            label="Description"
            value={payload.data.description}
            onChangeText={(description) =>
              onChange({ ...payload, data: { ...payload.data, description } })
            }
          />
        </View>
      )
    case 'social':
      return (
        <View style={styles.fields}>
          <View style={styles.chipRow}>
            {(
              ['instagram', 'tiktok', 'linkedin', 'youtube', 'facebook', 'twitter'] as const
            ).map((platform) => {
              const active = payload.data.platform === platform
              return (
                <Pressable
                  key={platform}
                  onPress={() => onChange({ ...payload, data: { ...payload.data, platform } })}
                  style={[styles.chip, active && styles.chipActive]}
                >
                  <Text style={[styles.chipText, active && { color: colors.white }]}>{platform}</Text>
                </Pressable>
              )
            })}
          </View>
          <Input
            label="@username ou URL"
            value={payload.data.usernameOrUrl}
            onChangeText={(usernameOrUrl) =>
              onChange({ ...payload, data: { ...payload.data, usernameOrUrl } })
            }
            autoCapitalize="none"
          />
        </View>
      )
    case 'pdf':
      return (
        <Input
          label="URL du PDF"
          value={payload.data.pdfUrl}
          onChangeText={(pdfUrl) => onChange({ type: 'pdf', data: { pdfUrl } })}
          autoCapitalize="none"
        />
      )
    case 'app':
      return (
        <Input
          label="URL App Store / Play"
          value={payload.data.appUrl}
          onChangeText={(appUrl) => onChange({ type: 'app', data: { appUrl } })}
          autoCapitalize="none"
        />
      )
  }
}

const styles = StyleSheet.create({
  root: { gap: spacing.md },
  hint: { fontSize: 12, color: colors.slate500, lineHeight: 17 },
  typeGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  typeCard: {
    width: '31%',
    minWidth: 96,
    flexGrow: 1,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.slate200,
    backgroundColor: colors.white,
    padding: 10,
    gap: 8,
  },
  typeCardActive: { backgroundColor: colors.slate900, borderColor: colors.slate900 },
  typeIcon: {
    width: 28,
    height: 28,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.slate100,
  },
  typeIconActive: { backgroundColor: colors.signal },
  typeLabel: { fontSize: 11, fontWeight: '700', color: colors.ink },
  fields: { gap: spacing.md },
  chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: {
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.slate200,
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: colors.white,
  },
  chipActive: { backgroundColor: colors.slate900, borderColor: colors.slate900 },
  chipText: { fontSize: 11, fontWeight: '700', color: colors.slate700 },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  switchLabel: { fontWeight: '600', color: colors.slate700 },
})
