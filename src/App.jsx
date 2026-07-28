import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />

          <Route path="/products" element={<Products />} />
          <Route path="/solutions" element={<Solutions />} />
          <Route path="/channels" element={<Channels />} />
          <Route path="/channels/sms-broadcasting" element={<SmsBroadcasting />} />
          <Route path="/channels/whatsapp-broadcasting" element={<WhatsappBroadcasting />} />
          <Route path="/channels/rcs-broadcasting" element={<RcsBroadcasting />} />
          <Route path="/channels/voice" element={<VoiceChannel />} />
          <Route path="/channels/social" element={<SocialInbox />} />
          <Route path="/channels/web-chat" element={<WebChat />} />
          <Route path="/numbers/did" element={<DidNumbers />} />

          <Route path="/platform" element={<Platform />} />
          <Route path="/platform/security" element={<PlatformSecurity />} />
          <Route path="/products/analytics" element={<ProductsAnalytics />} />
          <Route path="/products/omnichannel-inbox" element={<ProductsOmnichannelInbox />} />
          <Route path="/products/agent-copilot" element={<ProductsAgentCopilot />} />
          <Route path="/integrations" element={<IntegrationsPage />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/why-smslocal" element={<WhySmslocal />} />
          <Route path="/services/ai-consulting" element={<ServicesAiConsulting />} />

          <Route path="/channels/whatsapp" element={<WhatsappBusinessApi />} />
          <Route path="/channels/rcs" element={<RcsBusinessMessaging />} />
          <Route path="/channels/instagram" element={<InstagramMessagingApi />} />
          <Route path="/channels/messenger" element={<FacebookMessengerApi />} />
          <Route path="/channels/viber" element={<ViberBusinessMessages />} />
          <Route path="/channels/telegram" element={<TelegramBusiness />} />
          <Route path="/channels/line" element={<LineBusinessMessaging />} />
          <Route path="/channels/apple-messages" element={<AppleMessagesForBusiness />} />
          <Route path="/channels/email" element={<EmailApi />} />
          <Route path="/channels/kakaotalk" element={<KakaoTalkBusinessMessaging />} />

          <Route path="/agentic-ai" element={<AiAgentsPlatform />} />
          <Route path="/ai-agents/customer-service" element={<AiAgentsCustomerService />} />
          <Route path="/ai-agents/support" element={<AiAgentsSupport />} />
          <Route path="/voice-ai-agents" element={<AiAgentsVoice />} />
          <Route path="/ai-agents/sales" element={<AiAgentsSalesSdr />} />
          <Route path="/ai-agents/booking" element={<AiAgentsBooking />} />
          <Route path="/ai-agents/agent-builder" element={<AiAgentsBuilder />} />
          <Route path="/ai-agents" element={<AiAgentsOverview />} />

          <Route path="/industry/retail" element={<IndustryRetail />} />
          <Route path="/industry/travel-and-hospitality" element={<IndustryTravel />} />
          <Route path="/industry/fintech" element={<IndustryFintech />} />
          <Route path="/industry/education" element={<IndustryEducation />} />
          <Route path="/industry/media-entertainment" element={<IndustryMedia />} />
          <Route path="/industry/healthcare" element={<IndustryHealthcare />} />
          <Route path="/industry/insurance" element={<IndustryInsurance />} />
          <Route path="/industry/mortgage" element={<IndustryMortgage />} />
          <Route path="/industry/telecom" element={<IndustryTelecom />} />
          <Route path="/industry/real-estate" element={<IndustryRealEstate />} />

          <Route path="/compare" element={<CompareHub />} />
          <Route path="/compare/twilio" element={<CompareTwilio />} />
          <Route path="/compare/bird" element={<CompareBird />} />
          <Route path="/compare/plivo" element={<ComparePlivo />} />
          <Route path="/compare/infobip" element={<CompareInfobip />} />

          <Route path="/blog" element={<BlogIndex />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/resources/guides" element={<ResourcesGuides />} />
          <Route path="/resources/docs" element={<ResourcesDocs />} />
          <Route path="/resources/case-studies" element={<ResourcesCaseStudies />} />
          <Route path="/about-us" element={<About />} />
          <Route path="/contact-us" element={<Contact />} />
          <Route path="/partnerships" element={<Partners />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* old paths -> sheet canonical URLs */}
          <Route path="/whatsapp-business-api" element={<Navigate to="/channels/whatsapp" replace />} />
          <Route path="/rcs-business-messaging" element={<Navigate to="/channels/rcs" replace />} />
          <Route path="/instagram-messaging-api" element={<Navigate to="/channels/instagram" replace />} />
          <Route path="/facebook-messenger-api" element={<Navigate to="/channels/messenger" replace />} />
          <Route path="/ai-agents/voice" element={<Navigate to="/voice-ai-agents" replace />} />
          <Route path="/ai-agents/sales-sdr" element={<Navigate to="/ai-agents/sales" replace />} />
          <Route path="/ai-agents/builder" element={<Navigate to="/ai-agents/agent-builder" replace />} />
          <Route path="/about" element={<Navigate to="/about-us" replace />} />
          <Route path="/contact" element={<Navigate to="/contact-us" replace />} />
          <Route path="/partners" element={<Navigate to="/partnerships" replace />} />

          <Route path="*" element={<ComingSoon />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
