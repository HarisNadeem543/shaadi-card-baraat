/**
 * Helper to determine the invitation mode from URL path or query params.
 * 
 * The two active cards are:
 * 1. 'baraat': Dedicated Nikkah & Baraat card (Saturday 19 Dec)
 *    URL: /baraat, ?event=baraat (also catches /walima so attendees only receive Baraat)
 * 2. 'full': Full invitation (Nikkah & Baraat + Walima)
 *    URL: / (root)
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

    // Dedicated Nikkah & Baraat card (/baraat, ?event=baraat, and any converted /walima links)
    if (
      path.includes('baraat') ||
      path.includes('barat') ||
      path.includes('nikah') ||
      path.includes('nikkah') ||
      path.includes('walima') ||
      eventParam === 'baraat' ||
      eventParam === 'barat' ||
      eventParam === 'nikah' ||
      eventParam === 'nikkah' ||
      eventParam === 'walima' ||
      search.includes('baraat') ||
      search.includes('barat') ||
      search.includes('walima')
    ) {
      return 'baraat';
    }
  } catch (e) {
    console.warn('Error reading URL parameters:', e);
  }

  return 'full';
}
