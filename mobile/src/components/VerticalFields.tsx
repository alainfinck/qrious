import React from 'react'
import { StyleSheet, View } from 'react-native'

import { Input, TextArea } from './ui'
import { BlockBuilder } from './PageBuilder/BlockBuilder'
import type { FormState } from '../lib/form-state'

export function VerticalFields({
  state,
  setField,
}: {
  state: FormState
  setField: <K extends keyof FormState>(key: K, value: FormState[K]) => void
}) {
  switch (state.vertical) {
    case 'redirect':
      return (
        <View style={styles.section}>
          <Input
            label="URL cible"
            value={state.redirectTargetUrl}
            onChangeText={(v) => setField('redirectTargetUrl', v)}
            autoCapitalize="none"
            placeholder="https://"
          />
          <Input
            label="Label"
            value={state.redirectLabel}
            onChangeText={(v) => setField('redirectLabel', v)}
          />
        </View>
      )
    case 'art':
      return (
        <View style={styles.section}>
          <Input label="Artiste" value={state.artistName} onChangeText={(v) => setField('artistName', v)} />
          <TextArea label="Bio" value={state.artistBio} onChangeText={(v) => setField('artistBio', v)} />
          <Input label="Année" value={state.artYear} onChangeText={(v) => setField('artYear', v)} />
          <Input label="Technique" value={state.medium} onChangeText={(v) => setField('medium', v)} />
          <Input label="Dimensions" value={state.dimensions} onChangeText={(v) => setField('dimensions', v)} />
          <TextArea
            label="Description"
            value={state.artDescription}
            onChangeText={(v) => setField('artDescription', v)}
          />
          <View style={styles.row}>
            <View style={{ flex: 1 }}>
              <Input label="Prix" value={state.artPrice} onChangeText={(v) => setField('artPrice', v)} keyboardType="numeric" />
            </View>
            <View style={{ flex: 1 }}>
              <Input label="Devise" value={state.currency} onChangeText={(v) => setField('currency', v)} />
            </View>
          </View>
          <Input label="Exposition" value={state.exhibitionName} onChangeText={(v) => setField('exhibitionName', v)} />
          <Input label="Vidéo URL" value={state.videoUrl} onChangeText={(v) => setField('videoUrl', v)} autoCapitalize="none" />
          <Input label="Audio-guide URL" value={state.audioGuideUrl} onChangeText={(v) => setField('audioGuideUrl', v)} autoCapitalize="none" />
          <Input label="Instagram" value={state.instagramUsername} onChangeText={(v) => setField('instagramUsername', v)} autoCapitalize="none" />
          <Input label="Site web" value={state.websiteUrl} onChangeText={(v) => setField('websiteUrl', v)} autoCapitalize="none" />
          <Input label="Email contact" value={state.contactEmail} onChangeText={(v) => setField('contactEmail', v)} autoCapitalize="none" />
        </View>
      )
    case 'immo':
      return (
        <View style={styles.section}>
          <Input label="Prix" value={state.price} onChangeText={(v) => setField('price', v)} keyboardType="numeric" />
          <View style={styles.row}>
            <View style={{ flex: 1 }}>
              <Input label="Surface" value={state.surface} onChangeText={(v) => setField('surface', v)} keyboardType="numeric" />
            </View>
            <View style={{ flex: 1 }}>
              <Input label="Pièces" value={state.rooms} onChangeText={(v) => setField('rooms', v)} keyboardType="numeric" />
            </View>
          </View>
          <Input label="DPE" value={state.dpe} onChangeText={(v) => setField('dpe', v)} placeholder="A-G" />
          <Input label="Type" value={state.propertyType} onChangeText={(v) => setField('propertyType', v)} placeholder="apartment, house…" />
          <Input label="Adresse" value={state.address} onChangeText={(v) => setField('address', v)} />
          <Input label="Ville" value={state.city} onChangeText={(v) => setField('city', v)} />
          <TextArea label="Message d’accueil" value={state.welcomeMessage} onChangeText={(v) => setField('welcomeMessage', v)} />
          <Input label="Wi-Fi" value={state.wifiName} onChangeText={(v) => setField('wifiName', v)} />
          <Input label="Mot de passe Wi-Fi" value={state.wifiPassword} onChangeText={(v) => setField('wifiPassword', v)} />
          <Input label="Hôte" value={state.hostName} onChangeText={(v) => setField('hostName', v)} />
          <Input label="Tél. hôte" value={state.hostPhone} onChangeText={(v) => setField('hostPhone', v)} />
          <Input label="URL réservation" value={state.bookingUrl} onChangeText={(v) => setField('bookingUrl', v)} autoCapitalize="none" />
        </View>
      )
    case 'vcard':
      return (
        <View style={styles.section}>
          <Input label="Nom complet" value={state.fullName} onChangeText={(v) => setField('fullName', v)} />
          <View style={styles.row}>
            <View style={{ flex: 1 }}>
              <Input label="Prénom" value={state.firstName} onChangeText={(v) => setField('firstName', v)} />
            </View>
            <View style={{ flex: 1 }}>
              <Input label="Nom" value={state.lastName} onChangeText={(v) => setField('lastName', v)} />
            </View>
          </View>
          <Input label="Poste" value={state.jobTitle} onChangeText={(v) => setField('jobTitle', v)} />
          <Input label="Société" value={state.company} onChangeText={(v) => setField('company', v)} />
          <TextArea label="Bio" value={state.bio} onChangeText={(v) => setField('bio', v)} />
          <Input label="Téléphone" value={state.phone} onChangeText={(v) => setField('phone', v)} />
          <Input label="Email" value={state.email} onChangeText={(v) => setField('email', v)} autoCapitalize="none" />
          <Input label="Site" value={state.website} onChangeText={(v) => setField('website', v)} autoCapitalize="none" />
          <Input label="LinkedIn" value={state.linkedinUrl} onChangeText={(v) => setField('linkedinUrl', v)} autoCapitalize="none" />
        </View>
      )
    case 'product':
      return (
        <View style={styles.section}>
          <Input label="Produit" value={state.productName} onChangeText={(v) => setField('productName', v)} />
          <Input label="Marque" value={state.brandName} onChangeText={(v) => setField('brandName', v)} />
          <Input label="Modèle" value={state.modelNumber} onChangeText={(v) => setField('modelNumber', v)} />
          <TextArea label="Description" value={state.productDescription} onChangeText={(v) => setField('productDescription', v)} />
          <Input label="Manuel URL" value={state.manualUrl} onChangeText={(v) => setField('manualUrl', v)} autoCapitalize="none" />
          <Input label="Support email" value={state.supportEmail} onChangeText={(v) => setField('supportEmail', v)} autoCapitalize="none" />
        </View>
      )
    case 'feedback':
      return (
        <View style={styles.section}>
          <Input label="Entreprise" value={state.feedbackCompanyName} onChangeText={(v) => setField('feedbackCompanyName', v)} />
          <Input label="Titre" value={state.feedbackHeading} onChangeText={(v) => setField('feedbackHeading', v)} />
          <Input label="Google Review URL" value={state.googleReviewUrl} onChangeText={(v) => setField('googleReviewUrl', v)} autoCapitalize="none" />
          <Input label="TripAdvisor URL" value={state.tripadvisorUrl} onChangeText={(v) => setField('tripadvisorUrl', v)} autoCapitalize="none" />
        </View>
      )
    case 'tourism':
      return (
        <View style={styles.section}>
          <Input label="Lieu" value={state.placeName} onChangeText={(v) => setField('placeName', v)} />
          <Input label="Localisation" value={state.locationName} onChangeText={(v) => setField('locationName', v)} />
          <TextArea label="Description" value={state.tourismDescription} onChangeText={(v) => setField('tourismDescription', v)} />
          <Input label="Audio-guide" value={state.tourismAudioGuideUrl} onChangeText={(v) => setField('tourismAudioGuideUrl', v)} autoCapitalize="none" />
          <Input label="Horaires" value={state.openingHours} onChangeText={(v) => setField('openingHours', v)} />
        </View>
      )
    case 'chrd':
      return (
        <View style={styles.section}>
          <Input label="Établissement" value={state.establishmentName} onChangeText={(v) => setField('establishmentName', v)} />
          <Input label="Type" value={state.establishmentType} onChangeText={(v) => setField('establishmentType', v)} placeholder="hotel, restaurant…" />
          <TextArea label="Message" value={state.chrdWelcomeMessage} onChangeText={(v) => setField('chrdWelcomeMessage', v)} />
          <Input label="Menu PDF URL" value={state.menuPdfUrl} onChangeText={(v) => setField('menuPdfUrl', v)} autoCapitalize="none" />
          <Input label="Wi-Fi" value={state.chrdWifiName} onChangeText={(v) => setField('chrdWifiName', v)} />
          <Input label="Mot de passe Wi-Fi" value={state.chrdWifiPassword} onChangeText={(v) => setField('chrdWifiPassword', v)} />
        </View>
      )
    case 'corporate_event':
      return (
        <View style={styles.section}>
          <Input label="Événement" value={state.eventName} onChangeText={(v) => setField('eventName', v)} />
          <Input label="Société" value={state.eventCompanyName} onChangeText={(v) => setField('eventCompanyName', v)} />
          <Input label="Date" value={state.eventDate} onChangeText={(v) => setField('eventDate', v)} />
          <Input label="Lieu" value={state.eventLocation} onChangeText={(v) => setField('eventLocation', v)} />
          <TextArea label="Message" value={state.eventWelcomeMessage} onChangeText={(v) => setField('eventWelcomeMessage', v)} />
          <Input label="Code Wi-Fi" value={state.wifiCode} onChangeText={(v) => setField('wifiCode', v)} />
        </View>
      )
    case 'ugc_retail':
      return (
        <View style={styles.section}>
          <Input label="Marque" value={state.ugcBrandName} onChangeText={(v) => setField('ugcBrandName', v)} />
          <Input label="Campagne" value={state.campaignTitle} onChangeText={(v) => setField('campaignTitle', v)} />
          <Input label="Produit" value={state.ugcProductName} onChangeText={(v) => setField('ugcProductName', v)} />
          <TextArea label="Instructions" value={state.instructions} onChangeText={(v) => setField('instructions', v)} />
          <Input label="Code promo" value={state.rewardDiscountCode} onChangeText={(v) => setField('rewardDiscountCode', v)} />
        </View>
      )
    case 'field_service':
      return (
        <View style={styles.section}>
          <Input label="Asset" value={state.assetName} onChangeText={(v) => setField('assetName', v)} />
          <Input label="ID" value={state.assetId} onChangeText={(v) => setField('assetId', v)} />
          <Input label="Catégorie" value={state.category} onChangeText={(v) => setField('category', v)} />
          <Input label="Localisation" value={state.fieldLocation} onChangeText={(v) => setField('fieldLocation', v)} />
          <Input label="Statut" value={state.fieldStatus} onChangeText={(v) => setField('fieldStatus', v)} placeholder="operational…" />
          <Input label="Documentation URL" value={state.documentationUrl} onChangeText={(v) => setField('documentationUrl', v)} autoCapitalize="none" />
          <Input label="Tél. technicien" value={state.contactTechnicianPhone} onChangeText={(v) => setField('contactTechnicianPhone', v)} />
        </View>
      )
    default:
      return (
        <View style={styles.section}>
          <BlockBuilder
            blocks={state.genericBlocks || []}
            onChange={(blocks) => setField('genericBlocks', blocks)}
          />
        </View>
      )
  }
}

// Local layout helpers used by VerticalFields
const styles = StyleSheet.create({
  section: { gap: 12 },
  row: { flexDirection: 'row', gap: 10, alignItems: 'flex-end' },
})
