/**
 * App configuration for Reel Sales Letter (ByzBros).
 * This file is used to configure the app settings, branding, and store behavior.
 */
export default defineAppConfig({
  siteName: 'Reel Sales Letter',
  shortDescription: 'Transformă vizitatorii în clienți cu ajutorul funnel-urilor interactive cu videoclipuri verticale, construite pentru conversii maxime.',
  description: `Reel Sales Letter (RSL) combină puterea video-urilor verticale engaging cu un sistem avansat de vânzări directe, livrat pe o arhitectură web ultra-rapidă. Crește rata de conversie prin experiențe video interactive direct pe byzbros.com.`,
  baseUrl: 'https://byzbros.com',
  siteImage: 'https://byzbros.com/images/rsl-og-image.png', // Înlocuiește cu link-ul real către imaginea de prezentare (OG image)
  storeSettings: {
    autoOpenCart: false,
    // 'optimistic' actualizează UI-ul imediat; 'safe' așteaptă răspunsul serverului.
    cartMode: 'optimistic',
    showReviews: true,
    showFilters: true,
    showOrderByDropdown: true,
    showSKU: false,
    showRelatedProducts: true,
    showProductCategoriesOnSingleProduct: true,
    showBreadcrumbOnSingleProduct: true,
    showMoveToWishlist: true,
    hideBillingAddressForVirtualProducts: true, // Recomandat pentru produse digitale / servicii RSL
    initStoreOnUserActionToReduceServerLoad: true,
    productGalleryThumbnailsPosition: 'bottom', // 'bottom' sau 'left'
    saleBadge: 'percent', // 'percent', 'onSale' sau 'hidden'
    socialLoginsDisplay: 'buttons', // 'buttons' sau 'icons'
  },
});