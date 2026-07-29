import { useEffect, useState } from 'react'
import Seo from '../components/Seo.jsx'
import './Terms.css'

const SECTIONS = [
  { id: 'general-terms', title: 'General Terms And Conditions' },
  { id: 'cookies', title: 'Cookies' },
  { id: 'license', title: 'License' },
  { id: 'hyperlinking', title: 'Hyperlinking to our Content' },
  { id: 'iframes', title: 'iFrames' },
  { id: 'content-liability', title: 'Content Liability' },
  { id: 'your-privacy', title: 'Your Privacy' },
  { id: 'reservation-of-rights', title: 'Reservation of Rights' },
  { id: 'removal-of-links', title: 'Removal of links from our website' },
  { id: 'disclaimer', title: 'Disclaimer' },
  { id: 'refund-terms', title: 'Refund terms for Fraud or Spam Content' },
]

function Terms() {
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
        title="Terms and Conditions"
        description="Terms and Conditions for using SMSLocal's website and services."
      />

      <section className="section terms-section">
        <div className="container terms-layout">
          <aside className="terms-toc">
            <span className="terms-toc-label">On this page</span>
            <nav>
              <span className="terms-toc-indicator" style={{ '--terms-toc-i': SECTIONS.findIndex((s) => s.id === active) }} aria-hidden="true" />
              <ol>
                {SECTIONS.map((s) => (
                  <li key={s.id}>
                    <a href={`#${s.id}`} className={s.id === active ? 'is-active' : ''}>{s.title}</a>
                  </li>
                ))}
              </ol>
            </nav>
          </aside>

          <div className="terms-container">
          <h1 className="terms-title">Terms And Conditions</h1>

          <div className="terms-prose">
            <h2 id="general-terms">General Terms And Conditions</h2>
            <p>These General terms and conditions outline the rules and regulations for the use of SMS LOCAL's website located at www.smslocal.com.</p>
            <p>By accessing this website we assume you accept these terms and conditions. Do not continue to use SMS LOCAL if you do not agree to take all of the terms and conditions stated on this page.</p>
            <p>The following terminology applies to these Terms and Conditions, Privacy Statement and Disclaimer Notice and all Agreements: "Client", "You" and "Your" refers to you, the person log on this website and compliant to the Company's terms and conditions. "The Company", "Ourselves", "We", "Our" and "Us", refers to our Company. "Party", "Parties", or "Us", refers to both the Client and ourselves. All terms also refer to the offer, acceptance and consideration of payment necessary to undertake the process of our assistance to the Client in the most appropriate manner for the express purpose of meeting the Client's needs in respect of provision of the Company's stated services, in accordance with and subject to, prevailing law of Netherlands. Any use of the above terminology or other words in the singular, plural, capitalization and/or he/she or they, are taken as interchangeable and therefore as referring also same.</p>

            <h2 id="cookies">Cookies</h2>
            <p>We employ the use of cookies. By accessing SMS LOCAL, you agreed to use cookies in agreement with the SMS LOCAL's Privacy Policy.</p>
            <p>Most interactive websites use cookies to let us retrieve the user's details for each visit. Cookies are used by our website to enable. The functionality of certain areas to make it easier for people visiting our website. Some of our affiliate/advertising partners may also use cookies.</p>

            <h2 id="license">License</h2>
            <p>Unless otherwise stated, SMS LOCAL and/or its licensors own the intellectual property rights for all material on SMS LOCAL. All intellectual property rights are reserved. You may access this from SMS LOCAL for your own personal use subjected to restrictions set in these terms and conditions.</p>

            <h3>You must not:</h3>
            <ul>
              <li>Republish material from SMS LOCAL</li>
              <li>Sell, rent or sub-license material from SMS LOCAL</li>
              <li>Reproduce, duplicate or copy material from SMS LOCAL</li>
              <li>Redistribute content from SMS LOCAL</li>
            </ul>

            <h3>This Agreement shall begin on the date hereof.</h3>
            <p>Parts of this website offer an opportunity for users to post and exchange opinions and information in certain areas of the website. SMS LOCAL does not filter, edit, publish or review Comments prior to their presence on the website. Comments do not reflect the views and opinions of SMS LOCAL, its agents and/or affiliates. Comments reflect the views and opinions of the person who post their views and opinions. To the extent permitted by applicable laws, SMS LOCAL shall not be liable for the Comments or for any liability, damages or expenses caused and/or suffered as a result of any use of and/or posting of and/or appearance of the Comments on this website.</p>
            <p>SMS LOCAL reserves the right to monitor all Comments and to remove any Comments which can be considered inappropriate, offensive or causes breach of these Terms and Conditions.</p>

            <h3>You warrant and represent that:</h3>
            <ul>
              <li>You are entitled to post the Comments on our website and have all necessary licenses and consents to do so;</li>
              <li>The Comments do not invade any intellectual property right, including without limitation copyright, patent or trademark of any third party;</li>
              <li>Comments will not be used to solicit or promote business or custom or present commercial activities or unlawful activity.</li>
              <li>The Comments do not contain any defamatory, libelous, offensive, indecent or otherwise unlawful material which is an invasion of privacy</li>
            </ul>
            <p>SMS LOCAL reserves the right to monitor all Comments and to remove any Comments which can be considered inappropriate, offensive. You hereby grant SMS LOCAL a non-exclusive license to use, reproduce, edit and authorize others to use, reproduce and edit any of your Comments in any and all forms, formats or media, causes breach of these Terms and Conditions.</p>

            <h2 id="hyperlinking">Hyperlinking to our Content</h2>
            <p>The following organizations may link to our Website without prior written approval:</p>
            <ul>
              <li>Government agencies;</li>
              <li>Search engines;</li>
              <li>News organizations;</li>
              <li>Online directory distributors may link to our Website in the same manner as they hyperlink to the Websites of other listed businesses; and</li>
              <li>System wide Accredited Businesses except soliciting non-profit organizations, charity shopping malls, and charity fundraising groups which may not hyperlink to our Web site.</li>
            </ul>
            <p>These organizations may link to our home page, to publications or to other Website information so long as the link: (a) is not in any way deceptive; (b) does not falsely imply sponsorship, endorsement or approval of the linking party and its products and/or services; and (c) fits within the context of the linking party's site.</p>
            <p>We may consider and approve other link requests from the following types of organizations:</p>
            <ul>
              <li>commonly-known consumer and/or business information sources;</li>
              <li>dot.com community sites;</li>
              <li>associations or other groups representing charities;</li>
              <li>online directory distributors;</li>
              <li>internet portals;</li>
              <li>accounting, law and consulting firms; and</li>
              <li>educational institutions and trade associations.</li>
            </ul>
            <p>We will approve link requests from these organizations if we decide that: (a) the link would not make us look unfavorably to ourselves or to our accredited businesses; (b) the organization does not have any negative records with us; (c) the benefit to us from the visibility of the hyperlink compensates the absence of SMS LOCAL; and (d) the link is in the context of general resource information.</p>
            <p>These organizations may link to our home page so long as the link: (a) is not in any way deceptive; (b) does not falsely imply sponsorship, endorsement or approval of the linking party and its products or services; and (c) fits within the context of the linking party's site.</p>
            <p>If you are one of the organizations listed in paragraph 2 above and are interested in linking to our website, you must inform us by sending an e-mail to SMS LOCAL. Please include your name, your organization name, contact information as well as the URL of your site, a list of any URLs from which you intend to link to our Website, and a list of the URLs on our site to which you would like to link. Wait 2-3 weeks for a response.</p>
            <p>Approved organizations may hyperlink to our Website as follows:</p>
            <ul>
              <li>By use of our corporate name; or</li>
              <li>The uniform resource locator being linked to; or</li>
              <li>By use of any other description of our Website being linked to that makes sense within the context and format of content on the linking party's site.</li>
            </ul>
            <p>No use of SMS LOCAL's logo or other artwork will be allowed for linking absent a trademark license agreement.</p>

            <h2 id="iframes">iFrames</h2>
            <p>Without prior approval and written permission, you may not create frames around our Webpages that alter in any way the visual presentation or appearance of our Website.</p>

            <h2 id="content-liability">Content Liability</h2>
            <p>We shall not be held responsible for any content that appears on your Website. You agree to protect and defend us against all claims that is rising on your Website. No link(s) should appear on any Website that may be interpreted as libelous, obscene or criminal, or which infringes, otherwise violates, or advocates the infringement or other violation of, any third party rights.</p>

            <h2 id="your-privacy">Your Privacy</h2>
            <p>Please read our Privacy Policy.</p>

            <h2 id="reservation-of-rights">Reservation of Rights</h2>
            <p>We reserve the right to request that you remove all links or any particular link to our Website. You approve also immediately remove all links to our Website upon request. We also reserve the right to amend these terms and conditions and its linking policy at any time. By continuously linking to our Website, you agree to be bound to and follow these linking terms and conditions.</p>

            <h2 id="removal-of-links">Removal of links from our website</h2>
            <p>If you find any link on our Website that is offensive for any reason, you are free to contact and inform us any moment. We will consider requests to remove links but we are not obligated to or so or to respond to you directly.</p>
            <p>We do not ensure that the information on this website is correct, we do not warrant its completeness or accuracy; nor do we promise to ensure that the website remains available or that the material on the website is kept up to date.</p>

            <h2 id="disclaimer">Disclaimer</h2>
            <p>To the maximum extent permitted by applicable law, we exclude all representations, warranties and conditions relating to our website and the use of this website. Nothing in this disclaimer will:</p>
            <ul>
              <li>limit or exclude our or your liability for death or personal injury;</li>
              <li>exclude or limit our or your liability for fraud or fraudulent misrepresentation;</li>
              <li>limit any of our or your liabilities in any way that is not permitted under applicable law; or</li>
              <li>exclude any of our or your liabilities that may not be excluded under applicable law.</li>
            </ul>
            <p>The limitations and prohibitions of liability set in this Section and elsewhere in this disclaimer: (a) are subject to the preceding paragraph; and (b) govern all liabilities arising under the disclaimer, including liabilities arising in contract, in tort and for breach of statutory duty.</p>
            <p>As long as the website and the information and services on the website are provided free of charge, we will not be liable for any loss or damage of any nature.</p>

            <h2 id="refund-terms">Refund terms for Fraud or Spam Content</h2>
            <ol>
              <li>We do not allow Fraud or Spam messages over our network. Prohibited content shared through our network attracts sanctions like customer forfeiting account balance, and shall not be refunded in such cases, so that it helps us in recovering any penalties levied by the underlying operators.</li>
              <li>SMS LOCAL won't capture, screen, duplicate or reveal any user messages or individual data about the user or the user's SMS LOCAL record, phonebook or MSISDN's, other than in the ordinary course of the utilization of the Services, without the user's earlier authorization unless SMS LOCAL trusts in accordance with some basic honesty that such activity is important to fit in with lawful prerequisites to co-work or follow legitimate process, examinations, summonses, subpoenas and so forth, to ensure and guard the rights, property or legitimately protectable enthusiasm of SMS LOCAL, the User or other outsider, to uphold any of the arrangements of these terms and conditions or to secure SMS LOCAL's business or notoriety. The User concurs that SMS LOCAL may get to its record and message substance for the reasons depicted above without see and also keeping in mind the end goal to react to administration or specialized issues and that SMS LOCAL may speak with the user every now and then for purposes including, however not constrained to, conveying data in regards to any updates, overhauls, sees, or other data.</li>
              <li>A beneficiary of a message has the privilege to know the character of the sender, and this will be uncovered on demand to the beneficiary.</li>
              <li>Users concur that SMS LOCAL may make utilization of a User's profile and record data for non-individual measurable purposes.</li>
              <li>If a customer uses their account balance to make purchases or access services, any claims for disputes will not be entertained as per our terms and conditions.</li>
              <li>Users concur that they might not abuse any security laws, controls or appropriate implicit rules identifying with the insurance of individual data of End Users including however not restricted to names, addresses, email locations, landline and cell phone numbers and should not reveal the individual data of end clients to any outsider spare without the express assent of the End User or where particularly required or allowed by law to do as such.</li>
              <li>All substance, trademarks, and information on this site, including yet not restricted to programming, databases, icons, hyperlinks, private data, and plans, are the property of or authorized to SMS LOCAL, and all things considered shielded from encroachment by local and universal enactment and settlements. Subject to the rights stood to the User in this, every single other ideal to all protected innovation on this site is explicitly held.</li>
              <li>SMS LOCAL should allow a User an individual, individual, non-sub licensable, non-elite and also non-transferable permit ("the License") to utilize its exclusive programming or potentially application benefit in protest code frame just also, and just as per the pertinent User documentation, assuming any, and also just in conjunction with the significant Services. The User may not, straightforwardly or in a roundabout way, figure out, de-incorporate, dismantle or generally endeavor to build up the source code or basic thoughts or calculations of the product; change, decipher, or make subsidiary works in view of the product/application; also duplicate (aside from recorded purposes), lease, rent, disseminate, relegate, or generally exchange rights to the product/application; utilize the product/application for time sharing or administration department purposes or generally for the advantage of an outsider; or expel any restrictive notification or marks with respect to SMS LOCAL items also as well as administrations. The User recognizes that SMS LOCAL and its licensors hold responsibility for legitimacy applications, programming, protected innovation and any parts or duplicates thereof, and also all rights in that. Endless supply of the Services for any reason, this License will end and also the User might obliterate and stop to utilize also all product and applications in its ownership. The product is given and applications are offer "as seems to be" and subject to the Service guarantee disclaimers and restrictions of obligation discovered also somewhere else in these terms and conditions. It is the duty of the User to test the Services as they wish before going into assenting.</li>
              <li>The disappointment of either gathering to practice in any regard any privilege accommodated won't be considered a waiver of any further rights here under. On the off chance that any arrangement of these terms and conditions is watched to be unenforceable or invalid, such term(s) or condition(s) should be severable from the rest of the terms and conditions. The rest of the terms and conditions might not be influenced by such unenforceability or weakness and should stay enforceable.</li>
              <li>In the event that you have any inquiries, questions, or wish to ask for authorization to utilize any piece of this Website, including, connecting, confining, or seeking, please get in touch with us.</li>
            </ol>
          </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Terms
