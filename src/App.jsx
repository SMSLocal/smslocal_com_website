import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'
import BulkSms from './pages/BulkSms.jsx'
import SmsApi from './pages/SmsApi.jsx'
import OtpSms from './pages/OtpSms.jsx'
import WhatsappBusinessApi from './pages/WhatsappBusinessApi.jsx'
import RcsBusinessMessaging from './pages/RcsBusinessMessaging.jsx'
import InstagramMessagingApi from './pages/InstagramMessagingApi.jsx'
import FacebookMessengerApi from './pages/FacebookMessengerApi.jsx'
import ViberBusinessMessages from './pages/ViberBusinessMessages.jsx'
import TelegramBusiness from './pages/TelegramBusiness.jsx'
import AppleMessagesForBusiness from './pages/AppleMessagesForBusiness.jsx'
import LineBusinessMessaging from './pages/LineBusinessMessaging.jsx'
import EmailApi from './pages/EmailApi.jsx'
import ChatbotWhatsapp from './pages/ChatbotWhatsapp.jsx'
import ChatbotBuilder from './pages/ChatbotBuilder.jsx'
import AiAgentsCustomerService from './pages/AiAgentsCustomerService.jsx'
import AiAgentsVoice from './pages/AiAgentsVoice.jsx'
import AiAgentsSalesSdr from './pages/AiAgentsSalesSdr.jsx'
import Products from './pages/Products.jsx'
import Channels from './pages/Channels.jsx'
import TransactionalSms from './pages/TransactionalSms.jsx'
import PromotionalSms from './pages/PromotionalSms.jsx'
import ChatbotPlatform from './pages/ChatbotPlatform.jsx'
import ChatbotWebsite from './pages/ChatbotWebsite.jsx'
import ChatbotCustomerSupport from './pages/ChatbotCustomerSupport.jsx'
import AiAgentsPlatform from './pages/AiAgentsPlatform.jsx'
import AiAgentsBuilder from './pages/AiAgentsBuilder.jsx'
import AiAgentsWhatsapp from './pages/AiAgentsWhatsapp.jsx'
import ChatbotVsAiAgent from './pages/ChatbotVsAiAgent.jsx'
import ChatbotInstagramMessenger from './pages/ChatbotInstagramMessenger.jsx'
import ChatbotSms from './pages/ChatbotSms.jsx'
import ChatbotRcs from './pages/ChatbotRcs.jsx'
import ChatbotLeadGeneration from './pages/ChatbotLeadGeneration.jsx'
import ChatbotMarketingSales from './pages/ChatbotMarketingSales.jsx'
import ChatbotEcommerce from './pages/ChatbotEcommerce.jsx'
import ChatbotHealthcare from './pages/ChatbotHealthcare.jsx'
import ChatbotBankingFinancialServices from './pages/ChatbotBankingFinancialServices.jsx'
import ChatbotTravelHospitality from './pages/ChatbotTravelHospitality.jsx'
import AppCategory from './pages/AppCategory.jsx'
import AiAgentsOverview from './pages/AiAgentsOverview.jsx'
import AiAgentsAgentAssist from './pages/AiAgentsAgentAssist.jsx'
import AiAgentsOmnichannel from './pages/AiAgentsOmnichannel.jsx'
import AiAgentsEcommerce from './pages/AiAgentsEcommerce.jsx'
import AiAgentsFinancialServices from './pages/AiAgentsFinancialServices.jsx'
import AiAgentsHealthcare from './pages/AiAgentsHealthcare.jsx'
import Blog from './pages/Blog.jsx'
import ResourcesGuides from './pages/ResourcesGuides.jsx'
import ResourcesDocs from './pages/ResourcesDocs.jsx'
import ResourcesCaseStudies from './pages/ResourcesCaseStudies.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import Partners from './pages/Partners.jsx'
import Careers from './pages/Careers.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import ComingSoon from './pages/ComingSoon.jsx'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />

          <Route path="/products" element={<Products />} />
          <Route path="/channels" element={<Channels />} />

          <Route path="/bulk-sms" element={<BulkSms />} />
          <Route path="/sms-api" element={<SmsApi />} />
          <Route path="/otp-sms" element={<OtpSms />} />
          <Route path="/transactional-sms" element={<TransactionalSms />} />
          <Route path="/promotional-sms" element={<PromotionalSms />} />

          <Route path="/whatsapp-business-api" element={<WhatsappBusinessApi />} />
          <Route path="/rcs-business-messaging" element={<RcsBusinessMessaging />} />
          <Route path="/instagram-messaging-api" element={<InstagramMessagingApi />} />
          <Route path="/facebook-messenger-api" element={<FacebookMessengerApi />} />
          <Route path="/viber-business-messages" element={<ViberBusinessMessages />} />
          <Route path="/telegram-business" element={<TelegramBusiness />} />
          <Route path="/apple-messages-for-business" element={<AppleMessagesForBusiness />} />
          <Route path="/line-business-messaging" element={<LineBusinessMessaging />} />
          <Route path="/email-api" element={<EmailApi />} />

          <Route path="/chatbot" element={<ChatbotPlatform />} />
          <Route path="/chatbot/whatsapp" element={<ChatbotWhatsapp />} />
          <Route path="/chatbot/builder" element={<ChatbotBuilder />} />
          <Route path="/chatbot/website" element={<ChatbotWebsite />} />
          <Route path="/chatbot/customer-support" element={<ChatbotCustomerSupport />} />
          <Route path="/chatbot/instagram-messenger" element={<ChatbotInstagramMessenger />} />
          <Route path="/chatbot/sms" element={<ChatbotSms />} />
          <Route path="/chatbot/rcs" element={<ChatbotRcs />} />
          <Route path="/chatbot/lead-generation" element={<ChatbotLeadGeneration />} />
          <Route path="/chatbot/marketing-sales" element={<ChatbotMarketingSales />} />
          <Route path="/chatbot/ecommerce" element={<ChatbotEcommerce />} />
          <Route path="/chatbot/healthcare" element={<ChatbotHealthcare />} />
          <Route path="/chatbot/banking-financial-services" element={<ChatbotBankingFinancialServices />} />
          <Route path="/chatbot/travel-hospitality" element={<ChatbotTravelHospitality />} />

          <Route path="/agentic-ai" element={<AiAgentsPlatform />} />
          <Route path="/ai-agents/customer-service" element={<AiAgentsCustomerService />} />
          <Route path="/ai-agents/voice" element={<AiAgentsVoice />} />
          <Route path="/ai-agents/sales-sdr" element={<AiAgentsSalesSdr />} />
          <Route path="/ai-agents/builder" element={<AiAgentsBuilder />} />
          <Route path="/ai-agents/whatsapp" element={<AiAgentsWhatsapp />} />
          <Route path="/ai-agents/agent-assist" element={<AiAgentsAgentAssist />} />
          <Route path="/ai-agents/omnichannel-agent" element={<AiAgentsOmnichannel />} />
          <Route path="/ai-agents/ecommerce" element={<AiAgentsEcommerce />} />
          <Route path="/ai-agents/financial-services" element={<AiAgentsFinancialServices />} />
          <Route path="/ai-agents/healthcare" element={<AiAgentsHealthcare />} />
          <Route path="/ai-agents" element={<AiAgentsOverview />} />
          <Route path="/ai-agents/apps/:slug" element={<AppCategory />} />

          <Route path="/chatbot-vs-ai-agent" element={<ChatbotVsAiAgent />} />

          <Route path="/blog" element={<Blog />} />
          <Route path="/resources/guides" element={<ResourcesGuides />} />
          <Route path="/resources/docs" element={<ResourcesDocs />} />
          <Route path="/resources/case-studies" element={<ResourcesCaseStudies />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/partners" element={<Partners />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route path="*" element={<ComingSoon />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
