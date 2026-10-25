/**
 * Helper to determine the invitation mode from URL path or query params.
 * 
 * Supports:
 * - 'baraat': Dedicated Baraat & Nikah card (Saturday 19 Dec)
 *   Path: /baraat, /barat, /nikah
 *   Params: ?event=baraat, ?card=baraat, ?include=baraat, ?baraat
 * - 'walima': Dedicated Walima card (Sunday 20 Dec)
 *   Path: /walima
 *   Params: ?event=walima, ?card=walima, ?include=walima, ?walima
 * - 'full': Default root invitation (Nikkah & Baraat + Walima)
 *   Path: /
 */
export function getInvitationMode() {
  if (typeof window === 'undefined') return 'full';

  try {
    const url = new URL(window.location.href);
    const path = url.pathname.toLowerCase();
    const search = url.search.toLowerCase();
    const eventParam = (
      url.searchParams.get('event') ||
      url.searchParams.get('card') ||
      url.searchParams.get('type') ||
      url.searchParams.get('include') ||
      ''
    ).toLowerCase();

    // Check for Baraat & Nikah dedicated card
    if (
      path.includes('baraat') ||
      path.includes('barat') ||
      path.includes('nikah') ||
      path.includes('nikkah') ||
      eventParam === 'baraat' ||
      eventParam === 'barat' ||
      eventParam === 'nikah' ||
      eventParam === 'nikkah' ||
      search.includes('baraat') ||
      search.includes('barat')
    ) {
      return 'baraat';
    }

    // Check for Walima dedicated card
    if (
      path.includes('walima') ||
      eventParam === 'walima' ||
      search.includes('walima')
    ) {
      return 'walima';
    }
  } catch (e) {
    console.warn('Error reading URL parameters:', e);
  }

  return 'full';
}
