// Mirrors the <select> option lists from the bulksms-partner-signup WordPress
// plugin (templates/index.php), so the field set matches the live backend.

// Regional-indicator flag emoji from an ISO 3166-1 alpha-2 code — every
// modern OS/browser renders these as the country's flag inline in <option>
// text, no images or custom dropdown needed.
export function isoToFlagEmoji(iso) {
  if (!iso || iso.length !== 2) return ''
  const codePoints = iso
    .toUpperCase()
    .split('')
    .map((c) => 127397 + c.charCodeAt(0))
  return String.fromCodePoint(...codePoints)
}

export const INDUSTRIES = [
  'Agriculture',
  'Media and Communications',
  'Construction, Materials, and Trade Services',
  'Education',
  'Entertainment',
  'Financial Services',
  'Gambling and Lottery',
  'Government Services and Agencies',
  'Healthcare and Life Sciences',
  'Hospitality and Travel',
  'HR, Staffing or Recruitment',
  'Insurance',
  'Legal',
  'Manufacturing',
  'Non-profit organization',
  'Political',
  'Postal and Delivery',
  'Professional Services',
  'Real Estate',
  'Retail and Consumer Products',
  'Information Technology Services',
  'Transportation or Logistics',
]

export const CURRENCIES = ['USD', 'EUR']

// Common dial codes for the phone field. The zip's PHP handler blindly
// prepends "+" to whatever is submitted, so we combine code + number
// ourselves before sending — more correct than the original bundled JS.
export const DIAL_CODES = [
  { iso: 'US', code: '1', label: 'United States (+1)' },
  { iso: 'CA', code: '1', label: 'Canada (+1)' },
  { iso: 'GB', code: '44', label: 'United Kingdom (+44)' },
  { iso: 'AU', code: '61', label: 'Australia (+61)' },
  { iso: 'IN', code: '91', label: 'India (+91)' },
  { iso: 'PK', code: '92', label: 'Pakistan (+92)' },
  { iso: 'AE', code: '971', label: 'UAE (+971)' },
  { iso: 'SA', code: '966', label: 'Saudi Arabia (+966)' },
  { iso: 'DE', code: '49', label: 'Germany (+49)' },
  { iso: 'FR', code: '33', label: 'France (+33)' },
  { iso: 'ES', code: '34', label: 'Spain (+34)' },
  { iso: 'IT', code: '39', label: 'Italy (+39)' },
  { iso: 'NL', code: '31', label: 'Netherlands (+31)' },
  { iso: 'SG', code: '65', label: 'Singapore (+65)' },
  { iso: 'PH', code: '63', label: 'Philippines (+63)' },
  { iso: 'NG', code: '234', label: 'Nigeria (+234)' },
  { iso: 'ZA', code: '27', label: 'South Africa (+27)' },
  { iso: 'BR', code: '55', label: 'Brazil (+55)' },
  { iso: 'MX', code: '52', label: 'Mexico (+52)' },
  { iso: 'ID', code: '62', label: 'Indonesia (+62)' },
]

// Name + ISO 3166-1 alpha-2 code (for the flag emoji), same order/spelling
// as the plugin's original flat list — country names posted to the backend
// must stay byte-for-byte identical, so COUNTRIES (below) still exports the
// plain name strings; this table is only consulted for the flag glyph.
const COUNTRY_ENTRIES = [
  ['Afghanistan', 'AF'], ['Åland Islands', 'AX'], ['Albania', 'AL'], ['Algeria', 'DZ'],
  ['American Samoa', 'AS'], ['Andorra', 'AD'], ['Angola', 'AO'], ['Anguilla', 'AI'],
  ['Antarctica', 'AQ'], ['Antigua and Barbuda', 'AG'], ['Argentina', 'AR'], ['Armenia', 'AM'],
  ['Aruba', 'AW'], ['Australia', 'AU'], ['Austria', 'AT'], ['Azerbaijan', 'AZ'],
  ['Bahamas', 'BS'], ['Bahrain', 'BH'], ['Bangladesh', 'BD'], ['Barbados', 'BB'],
  ['Belarus', 'BY'], ['Belgium', 'BE'], ['Belize', 'BZ'], ['Benin', 'BJ'], ['Bermuda', 'BM'],
  ['Bhutan', 'BT'], ['Bolivia', 'BO'], ['Bosnia and Herzegovina', 'BA'], ['Botswana', 'BW'],
  ['Bouvet Island', 'BV'], ['Brazil', 'BR'], ['British Indian Ocean Territory', 'IO'],
  ['Brunei Darussalam', 'BN'], ['Bulgaria', 'BG'], ['Burkina Faso', 'BF'], ['Burundi', 'BI'],
  ['Cambodia', 'KH'], ['Cameroon', 'CM'], ['Canada', 'CA'], ['Cape Verde', 'CV'],
  ['Cayman Islands', 'KY'], ['Central African Republic', 'CF'], ['Chad', 'TD'], ['Chile', 'CL'],
  ['China', 'CN'], ['Christmas Island', 'CX'], ['Cocos (Keeling) Islands', 'CC'],
  ['Colombia', 'CO'], ['Comoros', 'KM'], ['Congo', 'CG'],
  ['Congo, The Democratic Republic of The', 'CD'], ['Cook Islands', 'CK'], ['Costa Rica', 'CR'],
  ["Cote D'ivoire", 'CI'], ['Croatia', 'HR'], ['Cuba', 'CU'], ['Cyprus', 'CY'],
  ['Czech Republic', 'CZ'], ['Denmark', 'DK'], ['Djibouti', 'DJ'], ['Dominica', 'DM'],
  ['Dominican Republic', 'DO'], ['Ecuador', 'EC'], ['Egypt', 'EG'], ['El Salvador', 'SV'],
  ['Equatorial Guinea', 'GQ'], ['Eritrea', 'ER'], ['Estonia', 'EE'], ['Ethiopia', 'ET'],
  ['Falkland Islands (Malvinas)', 'FK'], ['Faroe Islands', 'FO'], ['Fiji', 'FJ'],
  ['Finland', 'FI'], ['France', 'FR'], ['French Guiana', 'GF'], ['French Polynesia', 'PF'],
  ['French Southern Territories', 'TF'], ['Gabon', 'GA'], ['Gambia', 'GM'], ['Georgia', 'GE'],
  ['Germany', 'DE'], ['Ghana', 'GH'], ['Gibraltar', 'GI'], ['Greece', 'GR'],
  ['Greenland', 'GL'], ['Grenada', 'GD'], ['Guadeloupe', 'GP'], ['Guam', 'GU'],
  ['Guatemala', 'GT'], ['Guernsey', 'GG'], ['Guinea', 'GN'], ['Guinea-bissau', 'GW'],
  ['Guyana', 'GY'], ['Haiti', 'HT'], ['Heard Island and Mcdonald Islands', 'HM'],
  ['Holy See (Vatican City State)', 'VA'], ['Honduras', 'HN'], ['Hong Kong', 'HK'],
  ['Hungary', 'HU'], ['Iceland', 'IS'], ['India', 'IN'], ['Indonesia', 'ID'],
  ['Iran, Islamic Republic of', 'IR'], ['Iraq', 'IQ'], ['Ireland', 'IE'], ['Isle of Man', 'IM'],
  ['Israel', 'IL'], ['Italy', 'IT'], ['Jamaica', 'JM'], ['Japan', 'JP'], ['Jersey', 'JE'],
  ['Jordan', 'JO'], ['Kazakhstan', 'KZ'], ['Kenya', 'KE'], ['Kiribati', 'KI'],
  ["Korea, Democratic People's Republic of", 'KP'], ['Korea, Republic of', 'KR'],
  ['Kuwait', 'KW'], ['Kyrgyzstan', 'KG'], ["Lao People's Democratic Republic", 'LA'],
  ['Latvia', 'LV'], ['Lebanon', 'LB'], ['Lesotho', 'LS'], ['Liberia', 'LR'],
  ['Libyan Arab Jamahiriya', 'LY'], ['Liechtenstein', 'LI'], ['Lithuania', 'LT'],
  ['Luxembourg', 'LU'], ['Macao', 'MO'], ['Macedonia, The Former Yugoslav Republic of', 'MK'],
  ['Madagascar', 'MG'], ['Malawi', 'MW'], ['Malaysia', 'MY'], ['Maldives', 'MV'], ['Mali', 'ML'],
  ['Malta', 'MT'], ['Marshall Islands', 'MH'], ['Martinique', 'MQ'], ['Mauritania', 'MR'],
  ['Mauritius', 'MU'], ['Mayotte', 'YT'], ['Mexico', 'MX'],
  ['Micronesia, Federated States of', 'FM'], ['Moldova, Republic of', 'MD'], ['Monaco', 'MC'],
  ['Mongolia', 'MN'], ['Montenegro', 'ME'], ['Montserrat', 'MS'], ['Morocco', 'MA'],
  ['Mozambique', 'MZ'], ['Myanmar', 'MM'], ['Namibia', 'NA'], ['Nauru', 'NR'], ['Nepal', 'NP'],
  ['Netherlands', 'NL'], ['Netherlands Antilles', 'AN'], ['New Caledonia', 'NC'],
  ['New Zealand', 'NZ'], ['Nicaragua', 'NI'], ['Niger', 'NE'], ['Nigeria', 'NG'], ['Niue', 'NU'],
  ['Norfolk Island', 'NF'], ['Northern Mariana Islands', 'MP'], ['Norway', 'NO'],
  ['Oman', 'OM'], ['Pakistan', 'PK'], ['Palau', 'PW'], ['Palestinian Territory, Occupied', 'PS'],
  ['Panama', 'PA'], ['Papua New Guinea', 'PG'], ['Paraguay', 'PY'], ['Peru', 'PE'],
  ['Philippines', 'PH'], ['Pitcairn', 'PN'], ['Poland', 'PL'], ['Portugal', 'PT'],
  ['Puerto Rico', 'PR'], ['Qatar', 'QA'], ['Reunion', 'RE'], ['Romania', 'RO'],
  ['Russian Federation', 'RU'], ['Rwanda', 'RW'], ['Saint Helena', 'SH'],
  ['Saint Kitts and Nevis', 'KN'], ['Saint Lucia', 'LC'], ['Saint Pierre and Miquelon', 'PM'],
  ['Saint Vincent and The Grenadines', 'VC'], ['Samoa', 'WS'], ['San Marino', 'SM'],
  ['Sao Tome and Principe', 'ST'], ['Saudi Arabia', 'SA'], ['Senegal', 'SN'], ['Serbia', 'RS'],
  ['Seychelles', 'SC'], ['Sierra Leone', 'SL'], ['Singapore', 'SG'], ['Slovakia', 'SK'],
  ['Slovenia', 'SI'], ['Solomon Islands', 'SB'], ['Somalia', 'SO'], ['South Africa', 'ZA'],
  ['South Georgia and The South Sandwich Islands', 'GS'], ['Spain', 'ES'], ['Sri Lanka', 'LK'],
  ['Sudan', 'SD'], ['Suriname', 'SR'], ['Svalbard and Jan Mayen', 'SJ'], ['Swaziland', 'SZ'],
  ['Sweden', 'SE'], ['Switzerland', 'CH'], ['Syrian Arab Republic', 'SY'], ['Taiwan', 'TW'],
  ['Tajikistan', 'TJ'], ['Tanzania, United Republic of', 'TZ'], ['Thailand', 'TH'],
  ['Timor-leste', 'TL'], ['Togo', 'TG'], ['Tokelau', 'TK'], ['Tonga', 'TO'],
  ['Trinidad and Tobago', 'TT'], ['Tunisia', 'TN'], ['Turkey', 'TR'], ['Turkmenistan', 'TM'],
  ['Turks and Caicos Islands', 'TC'], ['Tuvalu', 'TV'], ['Uganda', 'UG'], ['Ukraine', 'UA'],
  ['United Arab Emirates', 'AE'], ['United Kingdom', 'GB'], ['United States', 'US'],
  ['United States Minor Outlying Islands', 'UM'], ['Uruguay', 'UY'], ['Uzbekistan', 'UZ'],
  ['Vanuatu', 'VU'], ['Venezuela', 'VE'], ['Viet Nam', 'VN'], ['Virgin Islands, British', 'VG'],
  ['Virgin Islands, U.S.', 'VI'], ['Wallis and Futuna', 'WF'], ['Western Sahara', 'EH'],
  ['Yemen', 'YE'], ['Zambia', 'ZM'], ['Zimbabwe', 'ZW'],
]

export const COUNTRIES = COUNTRY_ENTRIES.map(([name]) => name)

const COUNTRY_ISO_BY_NAME = Object.fromEntries(COUNTRY_ENTRIES)

export function countryFlag(name) {
  return isoToFlagEmoji(COUNTRY_ISO_BY_NAME[name])
}

// ISO code for the currently selected country/dial code, used to render a
// real flag image next to the closed <select> — native <option> elements
// can't contain <img>, and Windows browsers don't reliably draw regional-
// indicator flag emoji as pictures, so the emoji in the option list itself
// isn't enough; this overlay is what actually guarantees a visible flag.
export function countryIso(name) {
  return COUNTRY_ISO_BY_NAME[name] || ''
}
