import './SmsApiHeroMock.css'
import { IconCheck } from './icons.jsx'

function SmsApiHeroMock() {
  return (
    <div className="apimock-wrap">
      <span className="apimock-chip">
        <span className="apimock-chip-dot" />
        webhook · delivered
      </span>

      <div className="apimock-window">
        <div className="apimock-titlebar">
          <span className="apimock-dot red" />
          <span className="apimock-dot yellow" />
          <span className="apimock-dot green" />
          <span className="apimock-file">send-otp.js</span>
        </div>

        <pre className="apimock-code">
          <span className="apimock-kw">await</span>{' '}
          <span className="apimock-fn">smslocal.messages.create</span>({'{'}
          {'\n'}  <span className="apimock-key">to</span>:{' '}
          <span className="apimock-str">&quot;+1 415 555 0123&quot;</span>,
          {'\n'}  <span className="apimock-key">from</span>:{' '}
          <span className="apimock-str">&quot;SMSLOCAL&quot;</span>,
          {'\n'}  <span className="apimock-key">text</span>:{' '}
          <span className="apimock-str">`Your code is ${'{'}code{'}'}`</span>,
          {'\n'}{'}'})
          {'\n'}
          {'\n'}<span className="apimock-com">// id: msg_9f2a · queued → sent</span>
        </pre>

        <div className="apimock-response">
          <span className="apimock-status">201 Created</span>
          <span className="apimock-latency">18 ms</span>
        </div>
      </div>

      <div className="apimock-phone">
        <div className="apimock-notch" />

        <div className="apimock-statusbar">
          <span>9:41</span>
          <span style={{ display: 'flex', alignItems: 'center' }}>
            <span className="apimock-signal">
              <i style={{ height: '3px' }} />
              <i style={{ height: '5px' }} />
              <i style={{ height: '7px' }} />
              <i style={{ height: '9px' }} />
            </span>
            <span className="apimock-battery" />
          </span>
        </div>

        <div className="apimock-phone-head">
          <span className="apimock-avatar">SL</span>
          <span className="apimock-sender">
            <strong>SMSLOCAL</strong>
            <span>now</span>
          </span>
        </div>

        <div className="apimock-thread">
          <span className="apimock-timestamp">Today 9:41</span>
          <p className="apimock-bubble">
            Your code is <code>481920</code>. It expires in 10 minutes.
          </p>
          <span className="apimock-delivered">
            <IconCheck />
            Delivered
          </span>
        </div>

        <div className="apimock-home-indicator" />
      </div>
    </div>
  )
}

export default SmsApiHeroMock
