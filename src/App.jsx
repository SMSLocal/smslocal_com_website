import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { getLocaleFromPathname, stripLocaleFromPathname } from './lib/locale.js'
import { LocaleProvider } from './lib/LocaleContext.jsx'
import LocaleTranslator from './i18n/LocaleTranslator.jsx'
import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'
import WhatsappBusinessApi from './pages/WhatsappBusinessApi.jsx'
import RcsBusinessMessaging from './pages/RcsBusinessMessaging.jsx'
import InstagramMessagingApi from './pages/InstagramMessagingApi.jsx'
import FacebookMessengerApi from './pages/FacebookMessengerApi.jsx'
import AiAgentsCustomerService from './pages/AiAgentsCustomerService.jsx'
import AiAgentsVoice from './pages/AiAgentsVoice.jsx'
import AiAgentsSalesSdr from './pages/AiAgentsSalesSdr.jsx'
import AiAgentsBooking from './pages/AiAgentsBooking.jsx'
import Products from './pages/Products.jsx'
import Channels from './pages/Channels.jsx'
import AiAgentsPlatform from './pages/AiAgentsPlatform.jsx'
import AiAgentsBuilder from './pages/AiAgentsBuilder.jsx'
import CompareHub from './pages/CompareHub.jsx'
import CompareTwilio from './pages/CompareTwilio.jsx'
import CompareInfobip from './pages/CompareInfobip.jsx'
import AiAgentsOverview from './pages/AiAgentsOverview.jsx'
import BlogIndex from './pages/blog/BlogIndex.jsx'
import BlogPost from './pages/blog/BlogPost.jsx'
import CountryIndex from './pages/country/CountryIndex.jsx'
import CountryCode from './pages/country/CountryCode.jsx'
import ResourcesGuides from './pages/ResourcesGuides.jsx'
import ResourcesDocs from './pages/ResourcesDocs.jsx'
import ResourcesCaseStudies from './pages/ResourcesCaseStudies.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import Partners from './pages/Partners.jsx'
import Careers from './pages/Careers.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import Platform from './pages/Platform.jsx'
import PlatformSecurity from './pages/PlatformSecurity.jsx'
import ProductsAnalytics from './pages/ProductsAnalytics.jsx'
import ProductsOmnichannelInbox from './pages/ProductsOmnichannelInbox.jsx'
import IntegrationsPage from './pages/IntegrationsPage.jsx'
import WhatsappBroadcasting from './pages/WhatsappBroadcasting.jsx'
import RcsBroadcasting from './pages/RcsBroadcasting.jsx'
import VoiceChannel from './pages/VoiceChannel.jsx'
import SocialInbox from './pages/SocialInbox.jsx'
import DidNumbers from './pages/DidNumbers.jsx'
import Pricing from './pages/Pricing.jsx'
import WhySmslocal from './pages/WhySmslocal.jsx'
import ServicesAiConsulting from './pages/ServicesAiConsulting.jsx'
import Solutions from './pages/Solutions.jsx'
import Terms from './pages/Terms.jsx'
import PrivacyPolicy from './pages/PrivacyPolicy.jsx'
import IndustryRetail from './pages/IndustryRetail.jsx'
import IndustryTravel from './pages/IndustryTravel.jsx'
import IndustryFintech from './pages/IndustryFintech.jsx'
import IndustryEducation from './pages/IndustryEducation.jsx'
import IndustryMedia from './pages/IndustryMedia.jsx'
import IndustryHealthcare from './pages/IndustryHealthcare.jsx'
import IndustryInsurance from './pages/IndustryInsurance.jsx'
import IndustryMortgage from './pages/IndustryMortgage.jsx'
import IndustryTelecom from './pages/IndustryTelecom.jsx'
import IndustryRealEstate from './pages/IndustryRealEstate.jsx'
import AiAgentsSupport from './pages/AiAgentsSupport.jsx'
import ProductsAgentCopilot from './pages/ProductsAgentCopilot.jsx'
import SmsBroadcasting from './pages/SmsBroadcasting.jsx'
import WebChat from './pages/WebChat.jsx'
import CompareBird from './pages/CompareBird.jsx'
import ComparePlivo from './pages/ComparePlivo.jsx'
import ComingSoon from './pages/ComingSoon.jsx'
import ViberBusinessMessages from './pages/ViberBusinessMessages.jsx'
import TelegramBusiness from './pages/TelegramBusiness.jsx'
import LineBusinessMessaging from './pages/LineBusinessMessaging.jsx'
import AppleMessagesForBusiness from './pages/AppleMessagesForBusiness.jsx'
import EmailApi from './pages/EmailApi.jsx'
import KakaoTalkBusinessMessaging from './pages/KakaoTalkBusinessMessaging.jsx'

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
          <Route path="/" element={<Home />} />

          <Route path="/products" element={<Products />} />
          <Route path="/solutions" element={<Solutions />} />
          <Route path="/products/channels" element={<Channels />} />
          <Route path="/products/channels/sms-broadcasting" element={<SmsBroadcasting />} />
          <Route path="/products/channels/whatsapp-broadcasting" element={<WhatsappBroadcasting />} />
          <Route path="/products/channels/rcs-broadcasting" element={<RcsBroadcasting />} />
          <Route path="/products/channels/voice" element={<VoiceChannel />} />
          <Route path="/products/social-and-apps" element={<SocialInbox />} />
          <Route path="/products/social-and-apps/web-chat" element={<WebChat />} />
          <Route path="/products/channels/did" element={<DidNumbers />} />

          <Route path="/platform" element={<Platform />} />
          <Route path="/platform/security" element={<PlatformSecurity />} />
          <Route path="/products/inbox-and-analytics/analytics" element={<ProductsAnalytics />} />
          <Route path="/products/inbox-and-analytics/omnichannel-inbox" element={<ProductsOmnichannelInbox />} />
          <Route path="/products/inbox-and-analytics/agent-copilot" element={<ProductsAgentCopilot />} />
          <Route path="/platform/integrations" element={<IntegrationsPage />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/platform/why-smslocal" element={<WhySmslocal />} />
          <Route path="/solutions/services/ai-consulting" element={<ServicesAiConsulting />} />

          <Route path="/products/channels/whatsapp" element={<WhatsappBusinessApi />} />
          <Route path="/products/channels/rcs" element={<RcsBusinessMessaging />} />
          <Route path="/products/social-and-apps/instagram" element={<InstagramMessagingApi />} />
          <Route path="/products/social-and-apps/messenger" element={<FacebookMessengerApi />} />
          <Route path="/products/social-and-apps/viber" element={<ViberBusinessMessages />} />
          <Route path="/products/social-and-apps/telegram" element={<TelegramBusiness />} />
          <Route path="/products/social-and-apps/line" element={<LineBusinessMessaging />} />
          <Route path="/products/social-and-apps/apple-messages" element={<AppleMessagesForBusiness />} />
          <Route path="/products/channels/email" element={<EmailApi />} />
          <Route path="/products/social-and-apps/kakaotalk" element={<KakaoTalkBusinessMessaging />} />

          <Route path="/products/ai-agents/agentic-ai" element={<AiAgentsPlatform />} />
          <Route path="/products/ai-agents/customer-service" element={<AiAgentsCustomerService />} />
          <Route path="/products/ai-agents/support" element={<AiAgentsSupport />} />
          <Route path="/products/ai-agents/voice" element={<AiAgentsVoice />} />
          <Route path="/products/ai-agents/sales" element={<AiAgentsSalesSdr />} />
          <Route path="/products/ai-agents/booking" element={<AiAgentsBooking />} />
          <Route path="/products/ai-agents/agent-builder" element={<AiAgentsBuilder />} />
          <Route path="/products/ai-agents" element={<AiAgentsOverview />} />

          <Route path="/solutions/industry/retail" element={<IndustryRetail />} />
          <Route path="/solutions/industry/travel-and-hospitality" element={<IndustryTravel />} />
          <Route path="/solutions/industry/fintech" element={<IndustryFintech />} />
          <Route path="/solutions/industry/education" element={<IndustryEducation />} />
          <Route path="/solutions/industry/media-entertainment" element={<IndustryMedia />} />
          <Route path="/solutions/industry/healthcare" element={<IndustryHealthcare />} />
          <Route path="/solutions/industry/insurance" element={<IndustryInsurance />} />
          <Route path="/solutions/industry/mortgage" element={<IndustryMortgage />} />
          <Route path="/solutions/industry/telecom" element={<IndustryTelecom />} />
          <Route path="/solutions/industry/real-estate" element={<IndustryRealEstate />} />

          <Route path="/compare" element={<CompareHub />} />
          <Route path="/compare/twilio" element={<CompareTwilio />} />
          <Route path="/compare/bird" element={<CompareBird />} />
          <Route path="/compare/plivo" element={<ComparePlivo />} />
          <Route path="/compare/infobip" element={<CompareInfobip />} />

          <Route path="/country-code" element={<CountryIndex />} />
          <Route path="/country-code/:slug" element={<CountryCode />} />

          <Route path="/blog" element={<BlogIndex />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          {/* Imported archive: one article publishes under /resources/insights */}
          <Route path="/resources/insights/:slug" element={<BlogPost />} />
          <Route path="/resources/guides" element={<ResourcesGuides />} />
          <Route path="/resources/docs" element={<ResourcesDocs />} />
          <Route path="/resources/case-studies" element={<ResourcesCaseStudies />} />
          <Route path="/about-us" element={<About />} />
          <Route path="/contact-us" element={<Contact />} />
          <Route path="/partnerships" element={<Partners />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/terms-and-conditions" element={<Terms />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />

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

          <Route path="*" element={<ComingSoon />} />
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
