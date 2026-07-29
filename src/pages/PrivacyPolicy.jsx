import { useEffect, useState } from 'react'
import Seo from '../components/Seo.jsx'
import './PrivacyPolicy.css'

const SECTIONS = [
  { id: 'privacy-policy-overview', title: 'Privacy Policy' },
  { id: 'data-collection', title: 'Data Collection and Processing' },
  { id: 'your-rights', title: 'Your Data, Your Rights' },
  { id: 'revisions-termination', title: 'Revisions and Termination' },
  { id: 'contact-us', title: 'Contact Us' },
]

function PrivacyPolicy() {
  const [active, setActive] = useState(SECTIONS[0].id)

  useEffect(() => {
    const headings = SECTIONS
      .map((s) => document.getElementById(s.id))
      .filter(Boolean)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-15% 0px -70% 0px', threshold: 0 }
    )

    headings.forEach((h) => observer.observe(h))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <Seo
        title="SMSLocal Privacy Policy & Data Practices"
        description="Read SMSLocal's Privacy Policy to learn what personal, sensitive and anonymous data we collect, how we use and protect it, and the privacy rights you have."
      />

      <section className="section privacy-section">
        <div className="container privacy-layout">
          <aside className="privacy-toc">
            <span className="privacy-toc-label">On this page</span>
            <nav>
              <span className="privacy-toc-indicator" style={{ '--privacy-toc-i': SECTIONS.findIndex((s) => s.id === active) }} aria-hidden="true" />
              <ol>
                {SECTIONS.map((s) => (
                  <li key={s.id}>
                    <a href={`#${s.id}`} className={s.id === active ? 'is-active' : ''}>{s.title}</a>
                  </li>
                ))}
              </ol>
            </nav>
          </aside>

          <div className="privacy-container">
          <h1 className="privacy-title">SmsLocal Privacy Policy</h1>

          <div className="privacy-prose">
            <p>SmsLocal recognizes the importance of protecting privacy. Our Privacy Policy describes what personal information we may collect and how we may use and protect any personal information that is made available to us.</p>

            <h2 id="privacy-policy-overview">Privacy Policy</h2>
            <p>At smslocal.com, we are committed to safeguarding your privacy and ensuring transparency in how we handle your data. This page outlines the types of data we collect, including personal, sensitive, and anonymous information, and explains the purposes for which we use this data. Our goal is to deliver high-quality services, enhance your experience, and communicate effectively while respecting your privacy. We prioritize your data security and strive to keep our practices clear and straightforward.</p>

            <h2 id="data-collection">Data Collection and Processing</h2>

            <h3>What We Collect</h3>
            <p>At smslocal.com, we collect various types of data to deliver our services, improve your experience, and communicate with you effectively. This includes personal, sensitive, and anonymous data. Our data collection is designed to be minimal, relevant, and necessary for our services. We strive to be transparent about our data collection practices and provide you with control over your data.</p>

            <h3>Personal Data</h3>
            <p>We collect personal data that identifies you or can be used to identify you, such as your name, email address, phone number, business name, and address. This information is collected when you create an account, sign up for our services, contact us for support, provide feedback, update your account settings or profile information, or engage with our services or website. We also collect login credentials, account settings, and preferences to provide a personalized experience.</p>

            <h3>Sensitive Data</h3>
            <p>We collect sensitive data, including message content, sender and recipient information, contact lists or phone numbers uploaded to our platform, message delivery reports and analytics data, payment information, and authentication data. This data is essential for providing our core services, such as message delivery and routing. We take extra precautions to protect sensitive data, including encryption and access controls.</p>

            <h3>Anonymous Data</h3>
            <p>We also collect anonymous data that cannot be used to identify you, such as browser type and version, operating system and device type, IP address and geolocation data, usage patterns and analytics data, referral source and campaign data, and device identifiers. This data helps us improve our services, understand usage patterns, and enhance your experience. We use anonymous data to identify trends and areas for improvement.</p>

            <h3>Purpose of Collection</h3>
            <p>We collect data for three primary purposes: Service Delivery, to provide our SMS services, deliver messages, and manage your account; Improvement, to enhance our services, fix issues, and develop new features; and Marketing, to communicate with you about our services, promotions, and updates, if you opt-in to receive marketing communications. Additionally, we may use data to comply with legal requirements, detect and prevent fraud or abuse, enforce our terms of service and policies, and provide customer support and assistance.</p>

            <h3>Data Usage</h3>
            <p>At smslocal.com, we use the data we collect to provide and improve our services, support our customers, and communicate with you effectively. We use your data to deliver SMS messages and provide our core services, manage your account and settings, authenticate and verify your identity, and provide customer support and assistance.</p>

            <h3>Service Provision and Customer Support</h3>
            <p>Our service provision and customer support teams use your data to respond to your inquiries and support requests, resolve issues and fix problems, and improve our customer support services. We may also use your data to measure the effectiveness of our customer support efforts.</p>

            <h3>Marketing</h3>
            <p>We use your data to communicate with you about our services, promotions, and updates (if you opt-in to receive marketing communications). Our marketing efforts are designed to be personalized and relevant to your needs. We may use data points such as:</p>
            <ul>
              <li>Your account settings and preferences</li>
              <li>Your usage patterns and behavior</li>
              <li>Your feedback and survey responses</li>
            </ul>
            <p>to better understand your needs and preferences.</p>

            <h3>Data Sharing</h3>
            <p>We share data with third parties in the following circumstances: We share data with vendors who help us provide our services, such as message delivery providers and infrastructure partners. We also share data with partners who help us improve our services, such as analytics providers and security partners. Additionally, we may share data with affiliates who help us promote our services, such as marketing partners and resellers. We ensure that our third-party vendors, partners, and affiliates follow strict data protection policies and procedures to safeguard your data.</p>

            <h3>Data Protection</h3>
            <p>At (smslocal.com), we take data protection seriously and implement robust security measures to protect your data. We comply with US data protection laws and regulations, including the California Consumer Privacy Act (CCPA) and the General Data Protection Regulation (GDPR) for transfers to countries outside the US. Our commitment to data protection is reflected in our technical and organizational security measures, which include:</p>
            <ul>
              <li>Encryption of data both in transit and at rest</li>
              <li>Strict access controls, including multi-factor authentication</li>
              <li>Regular data backup and disaster recovery plans</li>
              <li>Regular security audits and testing to identify vulnerabilities and strengthen our security posture</li>
            </ul>
            <p>We store your data in the United States, and for transfers outside the US, we ensure compliance with adequacy decisions such as the EU-US Privacy Shield Framework. Our data protection practices are designed to ensure the confidentiality, integrity, and availability of your data.</p>

            <h3>Compliance with US Data Protection Laws</h3>
            <p>We are committed to complying with US data protection laws and regulations. Our compliance framework includes adherence to the provisions of the California Consumer Privacy Act (CCPA), the General Data Protection Regulation (GDPR) for transfers to countries outside the US, and other applicable data protection laws. We regularly review and update our data protection practices to ensure compliance with evolving regulatory requirements.</p>

            <h3>Data Protection Officer</h3>
            <p>We have appointed a Data Protection Officer (DPO) to oversee our data protection practices and ensure compliance with US data protection laws and regulations. If you have any questions or concerns about our data protection practices, please contact our DPO at info@smslocal.com.</p>

            <h2 id="your-rights">Your Data, Your Rights</h2>

            <h3>Data Protection Officer</h3>
            <p>At SMSLocal, we respect your rights as a data subject under US data protection laws, including the California Consumer Privacy Act (CCPA). You have the following rights:</p>

            <h3>Right to Know</h3>
            <p>You have the right to request that we disclose what personal information we collect, use, disclose, and sell.</p>

            <h3>Right to Access</h3>
            <p>You have the right to access your personal information held by us. You can request access to your data by contacting us.</p>

            <h3>Right to Correct</h3>
            <p>You have the right to correct or update your personal information if it is inaccurate or incomplete. You can request corrections by contacting us.</p>

            <h3>Right to Delete</h3>
            <p>You have the right to delete your personal information held by us. You can request deletion, but please note that this may affect our ability to provide you with services.</p>

            <h3>Right to Opt-Out</h3>
            <p>You have the right to opt out of our sale of your personal information. You can opt out by contacting us.</p>

            <h3>Right to Non-Discrimination</h3>
            <p>You have the right to not be discriminated against for exercising your privacy rights.</p>

            <h3>Exercising Your Rights</h3>
            <p>To exercise your rights, please contact us at +1 917-475-6888. We will respond to your request within a reasonable timeframe, as required by US data protection laws. We may require verification of your identity before processing your request.</p>

            <h3>Data Retention</h3>
            <p>We retain your data only for as long as necessary to fulfill the purposes for which it was collected, as required by law, or for legitimate purposes. We have established data retention periods to ensure that your data is not kept longer than necessary. We retain your data for varying periods depending on the type of data and its purpose. For example:</p>
            <ul>
              <li><strong>Account and usage data:</strong> 3 years from last account activity</li>
              <li><strong>Message logs:</strong> 1 year from message delivery date</li>
              <li><strong>Customer support data:</strong> 2 years from support ticket resolution</li>
              <li><strong>Marketing data:</strong> 1 year from last marketing communication</li>
            </ul>
            <p>In certain circumstances, we may extend the retention period for specific data, such as:</p>
            <ul>
              <li><strong>Legal requirements:</strong> We may retain data for longer periods if required by US law or regulatory requirements, such as the Securities and Exchange Commission (SEC) or the Health Insurance Portability and Accountability Act (HIPAA).</li>
              <li><strong>Litigation:</strong> We may retain data for longer periods if it is relevant to ongoing or potential litigation.</li>
              <li><strong>Legitimate purposes:</strong> We may retain data for longer periods if it is necessary for legitimate purposes, such as fraud prevention, network security, or complying with US anti-money laundering laws.</li>
            </ul>
            <p>Once the retention period expires, we delete your data securely and permanently. If you request deletion of your data before the retention period expires, we will delete it promptly, unless we are required to retain it for legal or legitimate purposes.</p>

            <h3>Cross-Border Data Transfers</h3>
            <p>We may transfer your data outside the United States for processing and storage purposes. We ensure that such transfers are made in compliance with US data protection laws and regulations, including the General Data Protection Regulation (GDPR) for transfers to countries outside the US.</p>

            <h3>Safeguards for Cross-Border Data Transfers</h3>
            <p>When transferring data outside the US, we ensure that it is protected by appropriate safeguards, including:</p>
            <ul>
              <li>Encryption and access controls</li>
              <li>Binding corporate rules or standard contractual clauses</li>
              <li>Adequacy decisions by the US Department of Commerce (e.g., EU-US Privacy Shield Framework)</li>
            </ul>

            <h3>Countries We Transfer Data To</h3>
            <p>We transfer data to countries that have been recognized by the US Department of Commerce as having adequate data protection standards, such as:</p>
            <ul>
              <li>European Union (under the EU-US Privacy Shield Framework)</li>
              <li>United Kingdom (under the UK-US Privacy Shield Framework)</li>
              <li>Switzerland (under the Swiss-US Privacy Shield Framework)</li>
              <li>Other countries with similar data protection standards</li>
            </ul>

            <h3>Your Rights</h3>
            <p>You have the right to request information about the safeguards used for cross-border data transfers. If you have any concerns, please contact us. We are committed to ensuring the security and privacy of your data, even when transferred outside the US.</p>

            <h3>Changes to Privacy Policy</h3>
            <p>We may update our Privacy Policy from time to time to reflect changes in our data collection and use practices, or to comply with changes in US data protection laws and regulations. This ensures that we remain transparent about how we handle your personal data and maintain the trust you have placed in us.</p>

            <h3>Notification Process</h3>
            <p>If we make significant changes to our Privacy Policy, we will:</p>
            <ul>
              <li>Post a clear and conspicuous notice on our website, (smslocal.com), highlighting the changes and explaining how they may impact you</li>
              <li>Send an email notification to our registered users, if feasible, to keep you informed and up-to-date</li>
              <li>Update the "Last Updated" date at the top of this Privacy Policy page, so you can easily track when changes were made</li>
            </ul>

            <h3>Your Consent</h3>
            <p>By continuing to use our services after we post changes to this Privacy Policy, you agree to the updated terms. If you do not agree with the changes, please stop using our services. We encourage you to review this Privacy Policy regularly to stay informed about our data collection and use practices.</p>

            <h3>Reviewing Changes</h3>
            <p>We encourage you to review this Privacy Policy regularly to stay informed about our data collection and use practices. If you have any questions or concerns about our Privacy Policy or data handling practices, please don't hesitate to contact us at +1 917-475-6888. Your privacy is important to us, and we are committed to transparency and accountability.</p>

            <h3>APIs and Third-Party Processing</h3>
            <p>We may use APIs (Application Programming Interfaces) to integrate our services with third-party platforms and services, providing a seamless and enhanced user experience. When using our APIs, we may share your data with third-party platforms and services, but only to the extent necessary to provide the requested service.</p>

            <h3>Third-Party Processing</h3>
            <p>We may engage third-party processors to process your data on our behalf, carefully selecting and vetting them to ensure they meet our data protection standards. We enter into data protection agreements with these processors, ensuring they handle your data in accordance with US data protection laws and regulations, including the California Consumer Privacy Act (CCPA) and the General Data Protection Regulation (GDPR) for transfers outside the US.</p>

            <h3>Third-Party Data Sharing</h3>
            <p>We may share your data with third-party partners for specific purposes, including:</p>
            <ul>
              <li>Service delivery</li>
              <li>Customer support</li>
              <li>Marketing</li>
            </ul>

            <h3>Data Protection Safeguards</h3>
            <p>When sharing your data with third-party processors or partners, we ensure data protection agreements are in place to safeguard your data. We also use data encryption to protect your data in transit and implement access controls to limit access to your data.</p>

            <h3>Third-Party Vendor Management</h3>
            <p>We maintain a comprehensive vendor management program to ensure third-party processors and partners comply with our data protection standards. This program includes:</p>
            <ul>
              <li>Regular vendor assessments and audits</li>
              <li>Ongoing monitoring of vendor compliance</li>
              <li>Training and awareness programs for vendor personnel</li>
            </ul>

            <h3>Personal Information of Minors</h3>
            <p>At (smslocal.com), we are committed to protecting the privacy and security of minors. We do not knowingly collect or process personal information from individuals under the age of 18. If you are a parent or guardian and believe that we may have collected personal information from your child, please contact us at info@smslocal.com.</p>

            <h3>Age Restriction</h3>
            <p>Our services are intended for users who are 18 years of age or older. By using our services, you represent that you are at least 18 years old.</p>

            <h3>Parental Consent</h3>
            <p>In the event that we inadvertently collect personal information from a minor, we will require parental consent to retain and use such information. We will also provide parents with the ability to review, correct, or delete their child's personal information.</p>

            <h3>Compliance with COPPA</h3>
            <p>We comply with the Children's Online Privacy Protection Act (COPPA) and other applicable laws and regulations related to the collection and use of personal information from minors.</p>

            <h2 id="revisions-termination">Revisions and Termination</h2>

            <h3>Revisions</h3>
            <p>We reserve the right to revise, modify, or update this Privacy Policy at any time. We will notify you of any material changes by posting the revised Privacy Policy on our website and, if feasible, sending an email notification to our registered users. Your continued use of our services after the effective date of the revised Privacy Policy will constitute your acceptance of the changes.</p>

            <h3>Termination</h3>
            <p>We may terminate or suspend your access to our services immediately, without prior notice or liability, if:</p>
            <ul>
              <li>You breach any terms of this Privacy Policy or our Terms of Service</li>
              <li>We are required to do so by US law or regulation</li>
              <li>We have decided to discontinue our services</li>
            </ul>

            <h3>Effect of Termination</h3>
            <p>Upon termination, we will:</p>
            <ul>
              <li>Cease providing services to you</li>
              <li>Delete your account and personal information, unless required to retain it by US law</li>
              <li>Notify you of the termination and the reasons for it, if applicable</li>
            </ul>

            <h3>Governing Law</h3>
            <p>This Privacy Policy will be governed by and construed in accordance with the laws of the United States. Any disputes arising out of or related to this Privacy Policy will be resolved through binding arbitration in accordance with the Federal Arbitration Act (FAA).</p>

            <h2 id="contact-us">Contact Us</h2>
            <p>If you have any questions or concerns about this Privacy Policy or our handling of personal information, please contact us at info@smslocal.com.</p>
          </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default PrivacyPolicy
