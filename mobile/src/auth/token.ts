import { Platform } from 'react-native'
import * as SecureStore from 'expo-secure-store'
import AsyncStorage from '@react-native-async-storage/async-storage'

const TOKEN_KEY = 'qrious_jwt'

async function storageGet(key: string): Promise<string | null> {
  if (Platform.OS === 'web') {
    return AsyncStorage.getItem(key)
  }
  return SecureStore.getItemAsync(key)
}

async function storageSet(key: string, value: string): Promise<void> {
  if (Platform.OS === 'web') {
    await AsyncStorage.setItem(key, value)
    return
  }
  await SecureStore.setItemAsync(key, value)
}

async function storageDelete(key: string): Promise<void> {
  if (Platform.OS === 'web') {
    await AsyncStorage.removeItem(key)
    return
  }
  await SecureStore.deleteItemAsync(key)
}

export async function getStoredToken(): Promise<string | null> {
  return storageGet(TOKEN_KEY)
}

export async function setStoredToken(token: string): Promise<void> {
  await storageSet(TOKEN_KEY, token)
}

export async function clearStoredToken(): Promise<void> {
  await storageDelete(TOKEN_KEY)
}
