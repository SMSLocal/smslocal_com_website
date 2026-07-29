// Google Apps Script — deploy this as a Web App under the info@smslocal.com
// Google account. It receives the contact form payload from /api/contact
// (site/api/contact.js) and sends the notification email via GmailApp,
// which uses Google's own mail-sending API instead of raw SMTP — this is
// what sidesteps the Workspace SMTP/app-password block.
//
// Setup: script.google.com (signed in as info@smslocal.com) > New project >
// paste this file's contents as-is (SHARED_SECRET below already matches the
// GAS_SHARED_SECRET value stored in Vercel) > Deploy > New deployment > type
// "Web app" > Execute as "Me" > Who has access "Anyone" > Deploy > authorize
// the permissions prompt > copy the Web app URL into Vercel's
// GAS_WEB_APP_URL env var.

const SHARED_SECRET = '1eb05e496c8866ec93f7826217b780e4caf27935ce08808a'

const RECIPIENTS = [
  'amrin@mycountrymobile.com',
  'jasmine@mycountrymobile.com',
  'sk3group@gmail.com',
  'sk3group1@gmail.com',
  'furkan@mycountrymobile.com',
  'sadik@mycountrymobile.com',
  'akil@mycountrymobile.com',
  'firoz@mycountrymobile.com',
  'naheead@mycountrymobile.com',
  'websiteleads001@gmail.com',
  'info@smslocal.com',
  'sk3group2@gmail.com',
]

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents)

    if (data.secret !== SHARED_SECRET) {
      return jsonOutput({ ok: false, error: 'Unauthorized' })
    }

    const { name, email, company, reason, phone, message } = data
    if (!name || !email || !company || !reason || !phone || !message) {
      return jsonOutput({ ok: false, error: 'All fields are required.' })
    }

    const subject = 'New contact form submission — ' + name
    const body =
      'Name: ' + name + '\n' +
      'Email: ' + email + '\n' +
      'Company: ' + company + '\n' +
      'Phone: ' + phone + '\n' +
      'Reason: ' + reason + '\n\n' +
      'Message:\n' + message

    // One sendEmail call per recipient, not one comma-joined "to" list — so a
    // single bad/rejecting address can't affect delivery to the others, and
    // failures are attributable to a specific address instead of an
    // all-or-nothing bounce report.
    const failures = []
    RECIPIENTS.forEach(function (recipient) {
      try {
        GmailApp.sendEmail(recipient, subject, body, {
          replyTo: email,
          name: 'SMSLocal Website',
        })
      } catch (sendErr) {
        failures.push({ recipient: recipient, error: String(sendErr) })
      }
    })

    if (failures.length > 0) {
      return jsonOutput({ ok: false, error: 'Failed for: ' + JSON.stringify(failures) })
    }

    return jsonOutput({ ok: true })
  } catch (err) {
    return jsonOutput({ ok: false, error: String(err) })
  }
}

function jsonOutput(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON)
}
