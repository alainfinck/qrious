export interface CityScanLocation {
  id: string
  cityName: string
  region: string
  country: string
  scans: number
  percentage: number
  lat: number // Percentage x for SVG map (0-100)
  lng: number // Percentage y for SVG map (0-100)
}

export interface PeakHourData {
  hour: string
  hourNum: number
  scans: number
  isPeak: boolean
}

export interface DayHourMatrix {
  day: string
  hours: number[] // 24 values representing scan count
}

export interface DeviceStat {
  name: string
  count: number
  percentage: number
  color: string
}

export interface LanguageStat {
  code: string
  name: string
  scans: number
  percentage: number
  flag: string
}

export interface ScanFeedItem {
  id: string
  qrTitle: string
  city: string
  device: string
  browser: string
  timeAgo: string
  timestamp: string
}

export interface WeeklyReportSummary {
  periodLabel: string
  totalScans: number
  scanDiffPercent: number
  googleReviewsCollected: number
  reviewDiffPercent: number
  topQrTitle: string
  topQrScans: number
  peakDayTime: string
  peakDayScans: number
  topCity: string
  deviceBreakdown: { ios: number; android: number; desktop: number }
  insights: string[]
}

export const CITY_SCAN_LOCATIONS: CityScanLocation[] = [
  { id: '1', cityName: 'Paris', region: 'Île-de-France', country: 'France', scans: 542, percentage: 38.2, lat: 48, lng: 52 },
  { id: '2', cityName: 'Lyon', region: 'Auvergne-Rhône-Alpes', country: 'France', scans: 284, percentage: 20.0, lat: 62, lng: 65 },
  { id: '3', cityName: 'Marseille', region: 'Provence-Alpes-Côte d\'Azur', country: 'France', scans: 195, percentage: 13.7, lat: 78, lng: 70 },
  { id: '4', cityName: 'Bordeaux', region: 'Nouvelle-Aquitaine', country: 'France', scans: 142, percentage: 10.0, lat: 68, lng: 32 },
  { id: '5', cityName: 'Lille', region: 'Hauts-de-France', country: 'France', scans: 98, percentage: 6.9, lat: 28, lng: 56 },
  { id: '6', cityName: 'Toulouse', region: 'Occitanie', country: 'France', scans: 86, percentage: 6.1, lat: 76, lng: 42 },
  { id: '7', cityName: 'Bruxelles', region: 'Bruxelles-Capitale', country: 'Belgique', scans: 43, percentage: 3.0, lat: 22, lng: 62 },
  { id: '8', cityName: 'Genève', region: 'Canton de Genève', country: 'Suisse', scans: 30, percentage: 2.1, lat: 60, lng: 74 },
]

export const HOURLY_PEAK_DATA: PeakHourData[] = [
  { hour: '00h', hourNum: 0, scans: 12, isPeak: false },
  { hour: '01h', hourNum: 1, scans: 5, isPeak: false },
  { hour: '02h', hourNum: 2, scans: 2, isPeak: false },
  { hour: '03h', hourNum: 3, scans: 1, isPeak: false },
  { hour: '04h', hourNum: 4, scans: 3, isPeak: false },
  { hour: '05h', hourNum: 5, scans: 8, isPeak: false },
  { hour: '06h', hourNum: 6, scans: 15, isPeak: false },
  { hour: '07h', hourNum: 7, scans: 34, isPeak: false },
  { hour: '08h', hourNum: 8, scans: 62, isPeak: false },
  { hour: '09h', hourNum: 9, scans: 88, isPeak: false },
  { hour: '10h', hourNum: 10, scans: 110, isPeak: false },
  { hour: '11h', hourNum: 11, scans: 145, isPeak: false },
  { hour: '12h', hourNum: 12, scans: 248, isPeak: true },
  { hour: '13h', hourNum: 13, scans: 265, isPeak: true },
  { hour: '14h', hourNum: 14, scans: 190, isPeak: false },
  { hour: '15h', hourNum: 15, scans: 135, isPeak: false },
  { hour: '16h', hourNum: 16, scans: 142, isPeak: false },
  { hour: '17h', hourNum: 17, scans: 168, isPeak: false },
  { hour: '18h', hourNum: 18, scans: 210, isPeak: false },
  { hour: '19h', hourNum: 19, scans: 285, isPeak: true },
  { hour: '20h', hourNum: 20, scans: 310, isPeak: true },
  { hour: '21h', hourNum: 21, scans: 275, isPeak: true },
  { hour: '22h', hourNum: 22, scans: 154, isPeak: false },
  { hour: '23h', hourNum: 23, scans: 48, isPeak: false },
]

export const DAY_HOUR_HEATMAP: DayHourMatrix[] = [
  { day: 'Lun', hours: [4,2,1,0,1,3,8,22,45,60,75,98,180,195,120,90,95,110,140,190,210,180,95,30] },
  { day: 'Mar', hours: [5,1,0,0,1,4,10,25,50,65,80,110,190,205,130,95,100,120,150,200,220,190,100,35] },
  { day: 'Mer', hours: [6,2,1,0,2,5,12,28,55,70,85,115,195,210,135,100,105,125,160,210,230,200,105,40] },
  { day: 'Jeu', hours: [8,3,1,0,2,6,15,30,60,75,90,125,210,225,145,105,110,135,175,230,250,220,115,45] },
  { day: 'Ven', hours: [10,4,2,1,3,8,18,35,70,90,110,145,240,260,165,120,130,160,210,280,310,270,145,60] },
  { day: 'Sam', hours: [15,6,3,1,2,5,12,25,50,85,125,170,260,285,190,140,150,180,230,290,320,285,160,75] },
  { day: 'Dim', hours: [12,5,2,0,1,4,10,20,40,70,105,150,230,250,170,125,130,150,190,240,260,210,120,50] },
]

export const DEVICE_STATS: DeviceStat[] = [
  { name: 'iPhone (iOS)', count: 824, percentage: 58.0, color: 'hsl(var(--primary))' },
  { name: 'Android', count: 511, percentage: 36.0, color: '#3b82f6' },
  { name: 'Ordinateur / Desktop', count: 85, percentage: 6.0, color: '#10b981' },
]

export const BROWSER_LANGUAGES: LanguageStat[] = [
  { code: 'fr-FR', name: 'Français (France)', scans: 1022, percentage: 72.0, flag: '🇫🇷' },
  { code: 'en-US', name: 'Anglais (USA/UK)', scans: 213, percentage: 15.0, flag: '🇬🇧' },
  { code: 'es-ES', name: 'Espagnol', scans: 114, percentage: 8.0, flag: '🇪🇸' },
  { code: 'de-DE', name: 'Allemand', scans: 71, percentage: 5.0, flag: '🇩🇪' },
]

export const RECENT_SCAN_FEED: ScanFeedItem[] = [
  { id: 's1', qrTitle: 'Menu Resto & Carte des Vins', city: 'Paris', device: 'iPhone 15 Pro', browser: 'Safari Mobile', timeAgo: 'Il y a 2 min', timestamp: '23:41' },
  { id: 's2', qrTitle: 'Avis Google 5 Étoiles', city: 'Lyon', device: 'Samsung Galaxy S24', browser: 'Chrome Mobile', timeAgo: 'Il y a 6 min', timestamp: '23:37' },
  { id: 's3', qrTitle: 'Catalogue Exposition Art', city: 'Bordeaux', device: 'iPhone 14', browser: 'Safari Mobile', timeAgo: 'Il y a 14 min', timestamp: '23:29' },
  { id: 's4', qrTitle: 'Fiche Immo Appartement Haussmann', city: 'Paris', device: 'Google Pixel 8', browser: 'Chrome Mobile', timeAgo: 'Il y a 21 min', timestamp: '23:22' },
  { id: 's5', qrTitle: 'Carte de Visite vCard PDG', city: 'Marseille', device: 'iPhone 13', browser: 'Safari Mobile', timeAgo: 'Il y a 35 min', timestamp: '23:08' },
  { id: 's6', qrTitle: 'Menu Resto & Carte des Vins', city: 'Bruxelles', device: 'Xiaomi 13', browser: 'Chrome Mobile', timeAgo: 'Il y a 48 min', timestamp: '22:55' },
]

export const WEEKLY_REPORT_DATA: WeeklyReportSummary = {
  periodLabel: 'Semaine du 25 Juillet au 1er Août 2026',
  totalScans: 1420,
  scanDiffPercent: 24.3,
  googleReviewsCollected: 18,
  reviewDiffPercent: 12.5,
  topQrTitle: 'Menu Gastronomique & Carte des Vins',
  topQrScans: 890,
  peakDayTime: 'Vendredi entre 19h00 et 21h00',
  peakDayScans: 310,
  topCity: 'Paris (38.2% des scans)',
  deviceBreakdown: { ios: 58, android: 36, desktop: 6 },
  insights: [
    'Vos pics de fréquentation se situent pendant les services du déjeuner (12h-14h) et du dîner (19h-21h).',
    '72% de vos visiteurs utilisent un navigateur en Français, suivi de 15% en Anglais.',
    'Le QR Code "Avis Google" a permis de collecter 18 nouveaux avis vérifiés cette semaine.',
  ],
}
