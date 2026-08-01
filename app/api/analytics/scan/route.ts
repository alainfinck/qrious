import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { qrId, pageSlug, city, device, browser } = body

    // Log or store scan event
    console.log(`[QRious Analytics] New Scan Recorded:`, {
      qrId,
      pageSlug,
      city: city || 'Paris',
      device: device || 'Mobile',
      browser: browser || 'Safari',
      timestamp: new Date().toISOString(),
    })

    return NextResponse.json({
      success: true,
      message: 'Scan enregistré avec succès',
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Erreur lors de l\'enregistrement du scan' },
      { status: 400 }
    )
  }
}
