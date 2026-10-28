import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { getLocaleFromPathname, stripLocaleFromPathname } from './lib/locale.js'
import { LocaleProvider } from './lib/LocaleContext.jsx'
import LocaleTranslator from './i18n/LocaleTranslator.jsx'
import Layout from './components/Layout.jsx'
import { page, pagesReady } from './lib/lazyPage.js'
const Home = page(() => import('./pages/Home.jsx'))
const WhatsappBusinessApi = page(() => import('./pages/WhatsappBusinessApi.jsx'))
const RcsBusinessMessaging = page(() => import('./pages/RcsBusinessMessaging.jsx'))
const InstagramMessagingApi = page(() => import('./pages/InstagramMessagingApi.jsx'))
const FacebookMessengerApi = page(() => import('./pages/FacebookMessengerApi.jsx'))
const AiAgentsCustomerService = page(() => import('./pages/AiAgentsCustomerService.jsx'))
const AiAgentsVoice = page(() => import('./pages/AiAgentsVoice.jsx'))
const AiAgentsSalesSdr = page(() => import('./pages/AiAgentsSalesSdr.jsx'))
const AiAgentsBooking = page(() => import('./pages/AiAgentsBooking.jsx'))
const Products = page(() => import('./pages/Products.jsx'))
const Channels = page(() => import('./pages/Channels.jsx'))
const AiAgentsPlatform = page(() => import('./pages/AiAgentsPlatform.jsx'))
const AiAgentsBuilder = page(() => import('./pages/AiAgentsBuilder.jsx'))
const CompareHub = page(() => import('./pages/CompareHub.jsx'))
const CompareTwilio = page(() => import('./pages/CompareTwilio.jsx'))
const CompareInfobip = page(() => import('./pages/CompareInfobip.jsx'))
const AiAgentsOverview = page(() => import('./pages/AiAgentsOverview.jsx'))
const BlogIndex = page(() => import('./pages/blog/BlogIndex.jsx'))
const BlogPost = page(() => import('./pages/blog/BlogPost.jsx'))
const CountryIndex = page(() => import('./pages/country/CountryIndex.jsx'))
const CountryCode = page(() => import('./pages/country/CountryCode.jsx'))
const ResourcesGuides = page(() => import('./pages/ResourcesGuides.jsx'))
const ResourcesDocs = page(() => import('./pages/ResourcesDocs.jsx'))
const ResourcesCaseStudies = page(() => import('./pages/ResourcesCaseStudies.jsx'))
const About = page(() => import('./pages/About.jsx'))
const Contact = page(() => import('./pages/Contact.jsx'))
const Partners = page(() => import('./pages/Partners.jsx'))
const Careers = page(() => import('./pages/Careers.jsx'))
const Login = page(() => import('./pages/Login.jsx'))
const Signup = page(() => import('./pages/Signup.jsx'))
const Platform = page(() => import('./pages/Platform.jsx'))
const PlatformSecurity = page(() => import('./pages/PlatformSecurity.jsx'))
const ProductsAnalytics = page(() => import('./pages/ProductsAnalytics.jsx'))
const ProductsOmnichannelInbox = page(() => import('./pages/ProductsOmnichannelInbox.jsx'))
const IntegrationsPage = page(() => import('./pages/IntegrationsPage.jsx'))
const WhatsappBroadcasting = page(() => import('./pages/WhatsappBroadcasting.jsx'))
const RcsBroadcasting = page(() => import('./pages/RcsBroadcasting.jsx'))
const VoiceChannel = page(() => import('./pages/VoiceChannel.jsx'))
const SocialInbox = page(() => import('./pages/SocialInbox.jsx'))
const DidNumbers = page(() => import('./pages/DidNumbers.jsx'))
const Pricing = page(() => import('./pages/Pricing.jsx'))
const WhySmslocal = page(() => import('./pages/WhySmslocal.jsx'))
const ServicesAiConsulting = page(() => import('./pages/ServicesAiConsulting.jsx'))
const Solutions = page(() => import('./pages/Solutions.jsx'))
const Terms = page(() => import('./pages/Terms.jsx'))
const PrivacyPolicy = page(() => import('./pages/PrivacyPolicy.jsx'))
const IndustryRetail = page(() => import('./pages/IndustryRetail.jsx'))
const IndustryTravel = page(() => import('./pages/IndustryTravel.jsx'))
const IndustryFintech = page(() => import('./pages/IndustryFintech.jsx'))
const IndustryEducation = page(() => import('./pages/IndustryEducation.jsx'))
const IndustryMedia = page(() => import('./pages/IndustryMedia.jsx'))
const IndustryHealthcare = page(() => import('./pages/IndustryHealthcare.jsx'))
const IndustryInsurance = page(() => import('./pages/IndustryInsurance.jsx'))
const IndustryMortgage = page(() => import('./pages/IndustryMortgage.jsx'))
const IndustryTelecom = page(() => import('./pages/IndustryTelecom.jsx'))
const IndustryRealEstate = page(() => import('./pages/IndustryRealEstate.jsx'))
const AiAgentsSupport = page(() => import('./pages/AiAgentsSupport.jsx'))
const ProductsAgentCopilot = page(() => import('./pages/ProductsAgentCopilot.jsx'))
const SmsBroadcasting = page(() => import('./pages/SmsBroadcasting.jsx'))
const WebChat = page(() => import('./pages/WebChat.jsx'))
const CompareBird = page(() => import('./pages/CompareBird.jsx'))
const ComparePlivo = page(() => import('./pages/ComparePlivo.jsx'))
const ComingSoon = page(() => import('./pages/ComingSoon.jsx'))
const ToolSendText = page(() => import('./pages/tools/ToolSendText.jsx'))
const ToolTextFree = page(() => import('./pages/tools/ToolTextFree.jsx'))
const ToolCarrierLookup = page(() => import('./pages/tools/ToolCarrierLookup.jsx'))
const CpaasHub = page(() => import('./pages/cpaas/CpaasHub.jsx'))
const SmsApi = page(() => import('./pages/cpaas/SmsApi.jsx'))
const VerifyApi = page(() => import('./pages/cpaas/VerifyApi.jsx'))
const LookupApi = page(() => import('./pages/cpaas/LookupApi.jsx'))
const CampaignsHub = page(() => import('./pages/cpaas/CampaignsHub.jsx'))
const CampaignManager = page(() => import('./pages/cpaas/CampaignManager.jsx'))
const JourneyBuilder = page(() => import('./pages/cpaas/JourneyBuilder.jsx'))
const CtwaAds = page(() => import('./pages/cpaas/CtwaAds.jsx'))
const DevHub = page(() => import('./pages/cpaas/DevHub.jsx'))
const DevQuickstart = page(() => import('./pages/cpaas/DevQuickstart.jsx'))
const DevApiReference = page(() => import('./pages/cpaas/DevApiReference.jsx'))
const DevSdks = page(() => import('./pages/cpaas/DevSdks.jsx'))
const DevWebhooks = page(() => import('./pages/cpaas/DevWebhooks.jsx'))
const UcOtp = page(() => import('./pages/cpaas/UcOtp.jsx'))
const UcTransactional = page(() => import('./pages/cpaas/UcTransactional.jsx'))
const UcPromotions = page(() => import('./pages/cpaas/UcPromotions.jsx'))
const UcPayments = page(() => import('./pages/cpaas/UcPayments.jsx'))
const UcCommerce = page(() => import('./pages/cpaas/UcCommerce.jsx'))
const UcAppointments = page(() => import('./pages/cpaas/UcAppointments.jsx'))
const PlatformCompliance = page(() => import('./pages/cpaas/PlatformCompliance.jsx'))
const PlatformTrust = page(() => import('./pages/cpaas/PlatformTrust.jsx'))
const PlatformEnterprise = page(() => import('./pages/cpaas/PlatformEnterprise.jsx'))
const ToolsHub = page(() => import('./pages/cpaas/ToolsHub.jsx'))
const ToolWhatsappLink = page(() => import('./pages/tools/ToolWhatsappLink.jsx'))
const ViberBusinessMessages = page(() => import('./pages/ViberBusinessMessages.jsx'))
const TelegramBusiness = page(() => import('./pages/TelegramBusiness.jsx'))
const LineBusinessMessaging = page(() => import('./pages/LineBusinessMessaging.jsx'))
const AppleMessagesForBusiness = page(() => import('./pages/AppleMessagesForBusiness.jsx'))
const EmailApi = page(() => import('./pages/EmailApi.jsx'))
const KakaoTalkBusinessMessaging = page(() => import('./pages/KakaoTalkBusinessMessaging.jsx'))

/**
 * Every page route, declared once. src/main.jsx reads this to fetch the current
 * route's chunk before the first render, so keep it as the single list of pages.
 */
export const ROUTES = [
  ['/', Home],
  ['/products', Products],
  ['/solutions', Solutions],
  ['/products/channels', Channels],
  ['/products/channels/sms-broadcasting', SmsBroadcasting],
  ['/products/channels/whatsapp-broadcasting', WhatsappBroadcasting],
  ['/products/channels/rcs-broadcasting', RcsBroadcasting],
  ['/products/channels/voice', VoiceChannel],
  ['/products/social-and-apps', SocialInbox],
  ['/products/social-and-apps/web-chat', WebChat],
  ['/products/channels/did', DidNumbers],
  ['/platform', Platform],
  ['/platform/security', PlatformSecurity],
  ['/products/inbox-and-analytics/analytics', ProductsAnalytics],
  ['/products/inbox-and-analytics/omnichannel-inbox', ProductsOmnichannelInbox],
  ['/products/inbox-and-analytics/agent-copilot', ProductsAgentCopilot],
  ['/platform/integrations', IntegrationsPage],
  ['/pricing', Pricing],
  ['/platform/why-smslocal', WhySmslocal],
  ['/solutions/services/ai-consulting', ServicesAiConsulting],
  ['/products/channels/whatsapp', WhatsappBusinessApi],
  ['/products/channels/rcs', RcsBusinessMessaging],
  ['/products/social-and-apps/instagram', InstagramMessagingApi],
  ['/products/social-and-apps/messenger', FacebookMessengerApi],
  ['/products/social-and-apps/viber', ViberBusinessMessages],
  ['/products/social-and-apps/telegram', TelegramBusiness],
  ['/products/social-and-apps/line', LineBusinessMessaging],
  ['/products/social-and-apps/apple-messages', AppleMessagesForBusiness],
  ['/products/channels/email', EmailApi],
  ['/products/social-and-apps/kakaotalk', KakaoTalkBusinessMessaging],
  ['/products/ai-agents/agentic-ai', AiAgentsPlatform],
  ['/products/ai-agents/customer-service', AiAgentsCustomerService],
  ['/products/ai-agents/support', AiAgentsSupport],
  ['/products/ai-agents/voice', AiAgentsVoice],
  ['/products/ai-agents/sales', AiAgentsSalesSdr],
  ['/products/ai-agents/booking', AiAgentsBooking],
  ['/products/ai-agents/agent-builder', AiAgentsBuilder],
  ['/products/ai-agents', AiAgentsOverview],
  ['/solutions/industry/retail', IndustryRetail],
  ['/solutions/industry/travel-and-hospitality', IndustryTravel],
  ['/solutions/industry/fintech', IndustryFintech],
  ['/solutions/industry/education', IndustryEducation],
  ['/solutions/industry/media-entertainment', IndustryMedia],
  ['/solutions/industry/healthcare', IndustryHealthcare],
  ['/solutions/industry/insurance', IndustryInsurance],
  ['/solutions/industry/mortgage', IndustryMortgage],
  ['/solutions/industry/telecom', IndustryTelecom],
  ['/solutions/industry/real-estate', IndustryRealEstate],
  ['/compare', CompareHub],
  ['/compare/twilio', CompareTwilio],
  ['/compare/bird', CompareBird],
  ['/compare/plivo', ComparePlivo],
  ['/compare/infobip', CompareInfobip],
  ['/country-code', CountryIndex],
  ['/country-code/:slug', CountryCode],
  ['/blog', BlogIndex],
  ['/blog/:slug', BlogPost],
  // Imported archive: one article publishes under /resources/insights
  ['/resources/insights/:slug', BlogPost],
  ['/resources/guides', ResourcesGuides],
  ['/resources/docs', ResourcesDocs],
  ['/resources/case-studies', ResourcesCaseStudies],
  ['/about-us', About],
  ['/contact-us', Contact],
  ['/tools/send-text', ToolSendText],
  ['/tools/text-free', ToolTextFree],
  ['/tools/carrier-lookup', ToolCarrierLookup],
  ['/partnerships', Partners],
  ['/careers', Careers],
  ['/login', Login],
  ['/signup', Signup],
  ['/terms-and-conditions', Terms],
  ['/privacy-policy', PrivacyPolicy],
  // CPaaS, Developers, use-case and platform pages (template: components/CpaasPage.jsx)
  ['/products/cpaas', CpaasHub],
  ['/products/cpaas/sms-api', SmsApi],
  ['/products/cpaas/verify-api', VerifyApi],
  ['/products/cpaas/lookup-api', LookupApi],
  ['/products/campaigns', CampaignsHub],
  ['/products/campaigns/campaign-manager', CampaignManager],
  ['/products/campaigns/journey-builder', JourneyBuilder],
  ['/products/campaigns/click-to-whatsapp-ads', CtwaAds],
  ['/developers', DevHub],
  ['/developers/quickstart', DevQuickstart],
  ['/developers/api-reference', DevApiReference],
  ['/developers/sdks', DevSdks],
  ['/developers/webhooks', DevWebhooks],
  ['/solutions/use-case/otp-authentication', UcOtp],
  ['/solutions/use-case/transactional-alerts', UcTransactional],
  ['/solutions/use-case/promotions-campaigns', UcPromotions],
  ['/solutions/use-case/payment-collection', UcPayments],
  ['/solutions/use-case/conversational-commerce', UcCommerce],
  ['/solutions/use-case/appointment-reminders', UcAppointments],
  ['/platform/compliance', PlatformCompliance],
  ['/platform/trust-center', PlatformTrust],
  ['/platform/enterprise', PlatformEnterprise],
  ['/resources/tools', ToolsHub],
  ['/tools/whatsapp-link-generator', ToolWhatsappLink],
  ['*', ComingSoon],
  ['*', ComingSoon],
]

if (import.meta.env.SSR) await pagesReady()

/**
 * Locale lives purely as a URL prefix (/fr/pricing/), parsed the same way on
 * the server (StaticRouter's `location` string) and the client
 * (BrowserRouter's real URL). `<Routes location>` re-establishes the location
 * context for everything it renders — so stripping the prefix here means
 * every existing absolute route path below, and every `useLocation()` call
 * deeper in the tree (Layout, Canonical, Breadcrumbs, Navbar…), sees the
 * plain unprefixed pathname automatically. Locale itself is exposed
 * separately via LocaleProvider, for the one place that needs it: the
 * canonical/hreflang URLs.
 */
function RoutedApp() {
  const location = useLocation()
  const locale = getLocaleFromPathname(location.pathname)
  const strippedLocation = { ...location, pathname: stripLocaleFromPathname(location.pathname) }

  return (
    <LocaleProvider value={locale}>
      <LocaleTranslator />
      <Routes location={strippedLocation}>
        <Route element={<Layout />}>
          {ROUTES.map(([path, Component]) => (
            <Route key={path} path={path} element={<Component />} />
          ))}
          {/* old paths -> sheet canonical URLs */}
          <Route path="/whatsapp-business-api" element={<Navigate to="/products/channels/whatsapp/" replace />} />
          <Route path="/rcs-business-messaging" element={<Navigate to="/products/channels/rcs/" replace />} />
          <Route path="/instagram-messaging-api" element={<Navigate to="/products/social-and-apps/instagram/" replace />} />
          <Route path="/facebook-messenger-api" element={<Navigate to="/products/social-and-apps/messenger/" replace />} />
          <Route path="/ai-agents/voice" element={<Navigate to="/products/ai-agents/voice/" replace />} />
          <Route path="/ai-agents/sales-sdr" element={<Navigate to="/products/ai-agents/sales/" replace />} />
          <Route path="/ai-agents/builder" element={<Navigate to="/products/ai-agents/agent-builder/" replace />} />
          <Route path="/about" element={<Navigate to="/about-us/" replace />} />
          <Route path="/contact" element={<Navigate to="/contact-us/" replace />} />
          <Route path="/partners" element={<Navigate to="/partnerships/" replace />} />
          {/* Imported posts link their CTA at the WordPress signup path */}
          <Route path="/register" element={<Navigate to="/signup/" replace />} />
        </Route>
      </Routes>
    </LocaleProvider>
  )
}

/**
 * `router` lets the prerender entry swap in StaticRouter, which renders without
 * browser history; the browser keeps the BrowserRouter default. Remaining props
 * pass through to it (StaticRouter needs `location`).
 */
function App({ router: Router = BrowserRouter, ...routerProps }) {
  return (
    <Router {...routerProps}>
      <RoutedApp />
    </Router>
  )
}

export default App
