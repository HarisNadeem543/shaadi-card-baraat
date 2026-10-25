/**
 * Helper to determine the invitation mode from URL path or query params.
 * 
 * Supports:
 * - Pathname: /walima
 * - Query Params: ?event=walima, ?card=walima, ?type=walima, ?include=walima, ?walima
 * 
 * Returns:
 * - 'walima': Dedicated Walima card (Sunday 20 Dec)
 * - 'full': Default card (Baraat, Nikah & Walima)
 */
export function getInvitationMode() {
  if (typeof window === 'undefined') return 'full';

  try {
    const url = new URL(window.location.href);
    const path = url.pathname.toLowerCase();
    const search = url.search.toLowerCase();
    const eventParam = (url.searchParams.get('event') || url.searchParams.get('card') || url.searchParams.get('type') || url.searchParams.get('include') || '').toLowerCase();

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
