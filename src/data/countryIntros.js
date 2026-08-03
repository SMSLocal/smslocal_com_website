/**
 * Per-country opening paragraphs for markets without full authored content.
 *
 * Hand-written, one at a time. The point is that no two read alike: a template
 * with the name and figures swapped is exactly what this replaces.
 *
 * Every line sticks to things that are verifiable and actually matter when
 * sending: the writing system (Armenian, Arabic, Thai and Greek script force
 * UCS-2, which cuts a segment from 160 characters to 70; Latin does not),
 * geography, regional context, and how the dial code itself behaves. None of
 * them states a sender-ID, DND or consent rule — those live in
 * countryContent.js and only for markets where they have been researched.
 */
export const COUNTRY_INTROS = {
  // ---------------------------------------------------------------- Asia
  afghanistan:
    'Afghanistan dials on +93, a code issued after the country rejoined the international numbering plan in the early 2000s. Dari and Pashto both use Arabic script, so almost all local-language traffic is UCS-2 — 70 characters a segment rather than 160, which roughly doubles the cost of anything written the way recipients actually read.',
  armenia:
    'Armenia uses +374 and its own alphabet, unique to the language and unrelated to Latin or Cyrillic. That means Armenian-language SMS is unicode: 70 characters per segment. Landlocked between four neighbours with closed or limited borders, it has an outsized diaspora, so a large share of its inbound traffic originates abroad.',
  azerbaijan:
    'Azerbaijan sits on +994. Azerbaijani switched from Cyrillic to a Latin alphabet in the 1990s, so unlike most of its post-Soviet neighbours it fits GSM-7 and a full 160 characters — with the caveat that ə, ğ, ı, ö, ş and ü push some messages into unicode anyway.',
  bahrain:
    'Bahrain dials on +973, one of the shortest national numbering plans in the Gulf: eight digits, no trunk prefix, no area codes. The island is small enough that coverage is effectively universal, and with one of the highest mobile penetration rates anywhere, SMS reach is close to population reach.',
  bhutan:
    'Bhutan uses +975. Dzongkha is written in Tibetan script, which is unicode territory, though English is widely used in commerce and government messaging. Mobile arrived late here — the first network launched in 2003 — and leapfrogged fixed lines almost entirely.',
  brunei:
    'Brunei dials on +673 with seven-digit numbers. Malay in Latin script is standard for business messaging, so GSM-7 and full 160-character segments apply. A small, wealthy market on the north coast of Borneo, sharing the island with Malaysian and Indonesian territory that uses entirely different codes.',
  cambodia:
    'Cambodia is +855. Khmer script is unicode, so local-language messages run at 70 characters a segment. The market is unusual for the region in how many operators have competed at once, and mobile money over SMS reaches well beyond the banked population.',
  china:
    'China dials on +86 and is the largest mobile market in the world by subscribers. Chinese characters are unicode, so a message in Simplified Chinese carries 70 characters per segment — though the script is dense enough that 70 characters says considerably more than 70 Latin ones.',
  cyprus:
    'Cyprus uses +357 with eight-digit numbers and no trunk prefix. Greek script means unicode for Greek-language traffic; English is common in business and stays in GSM-7. Note the northern part of the island operates on Turkish networks and +90 numbers, which catches senders out.',
  georgia:
    'Georgia dials on +995 and writes in Mkhedruli, an alphabet used for no other language. Georgian SMS is therefore unicode at 70 characters. The country sits on the main overland route between Europe and Central Asia, and its numbering plan reflects a full rebuild after 2010.',
  iran:
    'Iran dials on +98. Persian uses Arabic script with four extra letters, so local-language messaging is unicode at 70 characters a segment. It is one of the largest mobile markets in the Middle East, with numbering that reserves distinct ranges for its main operators.',
  iraq:
    'Iraq is +964 — Arabic script, so unicode at 70 characters per segment for local-language traffic. The numbering plan was rebuilt after 2003 and mobile networks now carry the overwhelming majority of voice and messaging, fixed-line infrastructure having never fully recovered.',
  japan:
    'Japan uses +81. Japanese mixes three writing systems, all unicode, so segments run to 70 characters. The market is distinctive in that carrier email long outcompeted SMS for person-to-person messaging, leaving A2P SMS with an unusually transactional character — verification codes and delivery notices rather than marketing.',
  jordan:
    'Jordan dials on +962. Arabic script means unicode at 70 characters for local-language traffic. A small market by population, but one that hosts a large refugee and NGO presence, which shows up as sustained demand for bulk alerting and cash-transfer notifications.',
  kazakhstan:
    'Kazakhstan shares +7 with Russia — one of only a handful of codes used by two sovereign countries, distinguished by the digits that follow. Kazakh is mid-transition from Cyrillic to Latin script, so encoding depends on which alphabet a given audience actually reads.',
  kuwait:
    'Kuwait uses +965 with eight-digit numbers and no trunk prefix. Arabic script puts local-language traffic in unicode at 70 characters a segment. Mobile penetration exceeds one line per person, so subscriber counts overstate reachable individuals — a distinction that matters when sizing a campaign.',
  kyrgyzstan:
    'Kyrgyzstan dials on +996. Kyrgyz is written in Cyrillic, so local-language SMS is unicode at 70 characters. Mountainous terrain means coverage follows the valleys and the Bishkek–Osh corridor rather than spreading evenly, which is worth knowing before promising national reach.',
  laos:
    'Laos is +856. Lao script is unicode, so segments run to 70 characters. One of the least urbanised markets in Southeast Asia, where mobile arrived as the first telecommunications most households ever had, skipping fixed lines completely.',
  lebanon:
    'Lebanon dials on +961. Arabic script means unicode at 70 characters, though French and English both circulate widely in commercial messaging and stay in GSM-7. Only two mobile operators serve the country, both state-owned, which makes routing unusually simple.',
  maldives:
    'The Maldives dials on +960. Dhivehi is written in Thaana, a right-to-left script used nowhere else, so local-language SMS is unicode. With a population spread over roughly 200 inhabited islands, mobile is the only practical way to reach most of it.',
  mongolia:
    'Mongolia uses +976. Mongolian is written in Cyrillic here, so local-language traffic is unicode at 70 characters. Population density is the lowest of any sovereign country, and a substantial nomadic minority makes mobile the only realistic channel outside Ulaanbaatar.',
  myanmar:
    'Myanmar is +95. Burmese script is unicode, and the market has a specific complication: two competing encodings, Unicode and the older Zawgyi, rendered the same text as gibberish on the wrong handset for years. Unicode has largely won, but the legacy is worth knowing.',
  nepal:
    'Nepal dials on +977. Nepali is written in Devanagari, the same script as Hindi, so local-language SMS is unicode at 70 characters. Terrain drives everything here — coverage follows the Kathmandu valley and the Terai plain far more reliably than the mountains.',
  'north-korea':
    'North Korea holds +850. The code is assigned and technically routable, but international messaging into the country is not commercially available, and we do not offer routes to it. Listed here for completeness of the numbering plan.',
  palestine:
    'Palestine dials on +970. Arabic script means unicode at 70 characters per segment. Networks in the West Bank and Gaza operate under distinct constraints, and delivery behaves differently between them, so a single national expectation will not hold.',
  'south-korea':
    'South Korea uses +82. Hangul is unicode at 70 characters a segment, though it is a featural alphabet rather than a character set, so it packs meaning more densely than the count suggests. One of the most connected markets in the world, with near-total smartphone penetration.',
  turkiye:
    'Türkiye dials on +90 and renamed itself from Turkey in 2022 — older datasets still carry the previous name, which breaks name-based matching. Turkish uses ç, ğ, ı, ö, ş and ü, and the dotless ı in particular falls outside GSM-7.',
  oman:
    'Oman uses +968 with eight-digit numbers. Arabic script means unicode at 70 characters for local-language traffic. Geography is the operational fact: a long coastline, mountainous interior and the separate Musandam exclave, all of which shape where coverage is dependable.',
  qatar:
    'Qatar dials on +974, eight digits, no trunk prefix. Arabic is unicode at 70 characters a segment. One of the most concentrated markets anywhere — the overwhelming majority of the population lives in and around Doha, and a large share are non-nationals who may read English rather than Arabic.',
  'sri-lanka':
    'Sri Lanka is +94. Two local scripts are in use — Sinhala and Tamil, both unicode — alongside English, which stays in GSM-7. That makes audience segmentation an encoding decision as much as a language one, and it directly affects what a campaign costs.',
  syria:
    'Syria dials on +963. Arabic script puts local-language messaging in unicode at 70 characters. Network coverage has been shaped by more than a decade of conflict and is uneven by region, so delivery expectations should be set per area rather than nationally.',
  tajikistan:
    'Tajikistan dials on +992. Tajik is Persian written in Cyrillic — unicode either way, so 70 characters a segment. The most mountainous country in Central Asia, with coverage concentrated along the valleys and the Dushanbe corridor.',
  thailand:
    'Thailand is +66. Thai script is unicode, so local-language segments run to 70 characters, and Thai stacks vowels and tone marks in ways that make character counts less intuitive than they look. Testing on a handset before a bulk send is worth the ten minutes.',
  'timor-leste':
    'Timor-Leste dials on +670, a code issued after independence in 2002 — one of the newest in the global plan. Tetum and Portuguese are both official and both Latin script, so GSM-7 applies, with Portuguese accents occasionally pushing a message to unicode.',
  turkmenistan:
    'Turkmenistan uses +993. Turkmen switched to a Latin alphabet after independence, so it fits GSM-7 rather than the Cyrillic unicode its neighbours need. One of the most closed telecommunications markets in the region, with a single dominant state operator.',
  uzbekistan:
    'Uzbekistan dials on +998. Uzbek is written in both Latin and Cyrillic depending on context and generation, which makes encoding an audience question rather than a language one. It is the most populous country in Central Asia and the region\'s largest mobile market by some distance.',
  vietnam:
    'Vietnam is +84. Vietnamese uses Latin script but with extensive diacritics, and those tone marks push messages into unicode at 70 characters — a detail that surprises senders who assume Latin means GSM-7. Stripping accents is common practice and halves the cost.',
  yemen:
    'Yemen dials on +967. Arabic script means unicode at 70 characters. The numbering plan still reflects the 1990 unification of north and south, and network coverage is fragmented by ongoing conflict, so per-operator delivery varies far more than a national figure would suggest.',

  // -------------------------------------------------------------- Europe
  albania:
    'Albania uses +355. Albanian is Latin script, so GSM-7 and a full 160 characters apply, with ë and ç the only characters likely to cost extra. Mobile overtook fixed lines here faster than almost anywhere in Europe, and the diaspora in Italy and Greece drives noticeable cross-border traffic.',
  andorra:
    'Andorra dials on +376 with six-digit numbers — among the shortest national plans in Europe. Catalan is the official language, Latin script, GSM-7. A single operator serves the whole principality, which makes routing straightforward and coverage effectively uniform.',
  austria:
    'Austria uses +43. German in Latin script fits GSM-7, though ä, ö, ü and ß sit in the extension set and each quietly consumes two characters rather than one. A mature market where consent rules are enforced through competitor action as much as by the regulator.',
  belarus:
    'Belarus dials on +375. Both Belarusian and Russian are written in Cyrillic, so local-language SMS is unicode at 70 characters a segment. The telecommunications market remains substantially state-controlled, and international routing options are narrower than elsewhere in Europe.',
  belgium:
    'Belgium uses +32 and is genuinely trilingual — Dutch, French and German — which makes language the first campaign decision rather than an afterthought. All three are Latin script, though French accents push some messages to unicode. Regional targeting matters more here than in most markets its size.',
  'bosnia-and-herzegovina':
    'Bosnia and Herzegovina dials on +387. Both Latin and Cyrillic alphabets are in official use, so encoding depends on the audience rather than the language. Three separate mobile operators emerged along the country\'s administrative divisions, and their coverage footprints still reflect that.',
  bulgaria:
    'Bulgaria uses +359. Bulgarian is Cyrillic — and Bulgaria is where the alphabet originated — so local-language SMS is unicode at 70 characters. A common practice is transliterating into Latin to recover the full 160, which is understood by most recipients but reads as informal.',
  croatia:
    'Croatia dials on +385. Croatian uses Latin script with č, ć, ž, š and đ, all of which fall outside GSM-7 and push a message into unicode. Stripping them is common but changes meaning in some words, so it is a decision worth making deliberately.',
  czechia:
    'Czechia uses +420, a code it kept when Czechoslovakia split — Slovakia took +421. Czech has an unusually large set of accented characters, and any of them tips a message into unicode at 70 characters, so accent handling is the single biggest cost lever in a Czech campaign.',
  denmark:
    'Denmark dials on +45 with eight-digit numbers and no area codes at all — one of the flattest numbering plans in Europe. Danish uses æ, ø and å, which sit in the GSM-7 extension set and consume two characters each rather than tipping the whole message to unicode.',
  estonia:
    'Estonia uses +372. Estonian is Latin script with õ, ä, ö and ü. The market is notable for how far state services moved to digital identity and mobile authentication early, which shaped SMS into a verification channel more than a marketing one.',
  finland:
    'Finland dials on +358, and it is where SMS was commercially proven — the first person-to-person text was sent on a Finnish network in 1992. Finnish uses ä and ö from the GSM-7 extension set. Compound words run long, which matters more here than in most languages.',
  greece:
    'Greece uses +30 with ten-digit numbers and no trunk prefix. Greek script is unicode, so local-language segments are 70 characters. Greeklish — Greek transliterated into Latin — is widely understood informally and recovers the full 160, but reads as casual in a commercial message.',
  hungary:
    'Hungary dials on +36. Hungarian is Latin script but heavily accented, with á, é, í, ó, ö, ő, ú, ü and ű, and the double-acute characters in particular fall outside GSM-7. Word length is another practical constraint — Hungarian agglutinates, so messages run longer than their English equivalents.',
  iceland:
    'Iceland uses +354 with seven-digit numbers and no area codes. Icelandic uses þ, ð and several accented vowels, which put local-language messages into unicode. A small market where effectively the entire population is reachable by mobile, and coverage follows the ring road.',
  ireland:
    'Ireland dials on +353. English dominates commercial messaging and fits GSM-7 cleanly; Irish uses acute accents that cost extra. The market shares operators and a great deal of commercial traffic with the UK, but it is a separate numbering plan and separate consent regime.',
  italy:
    'Italy uses +39, and it is one of the few plans where the leading zero of a landline number is retained in international format — a genuine trap for anyone applying the usual drop-the-zero rule. Italian accents are limited enough that most messages stay within GSM-7.',
  kosovo:
    'Kosovo dials on +383, one of the most recently assigned codes in the global plan — numbers previously ran through Serbian and Monaco ranges. Albanian and Serbian are both official, which means Latin and Cyrillic audiences and two different encoding outcomes.',
  latvia:
    'Latvia uses +371 with eight-digit numbers and no trunk prefix. Latvian is Latin script with macrons and cedillas that fall outside GSM-7. A substantial Russian-speaking minority means many campaigns run in two languages with two different segment costs.',
  liechtenstein:
    'Liechtenstein dials on +423 with seven-digit numbers. German in Latin script applies. The principality shares much of its telecommunications infrastructure with Switzerland, and its numbering was separated from the Swiss plan only in 1999.',
  lithuania:
    'Lithuania uses +370. Lithuanian is Latin script with ą, č, ę, ė, į, š, ų, ū and ž — enough accented characters that most genuine Lithuanian text lands in unicode at 70 characters unless deliberately stripped.',
  luxembourg:
    'Luxembourg dials on +352. Three languages are in official use — Luxembourgish, French and German — in a country small enough to cross in an hour. Cross-border commuting from Belgium, France and Germany means a meaningful share of numbers reachable in Luxembourg are not Luxembourg numbers.',
  malta:
    'Malta uses +356 with eight-digit numbers and no area codes. Maltese is the only Semitic language written in Latin script, and its ġ, ħ, ż and ċ fall outside GSM-7. English is co-official and widely used in commerce, which keeps most business messaging in the full 160.',
  moldova:
    'Moldova dials on +373. Romanian in Latin script is official, while Russian in Cyrillic remains widely spoken, so encoding depends on audience. The separatist Transnistria region operates its own networks, and delivery there behaves differently from the rest of the country.',
  monaco:
    'Monaco uses +377, its own code despite being surrounded by France and under two square kilometres in size. French is official, Latin script. The resident population is small enough that most commercial SMS volume is driven by visitors rather than residents.',
  montenegro:
    'Montenegro dials on +382, assigned after independence in 2006. Montenegrin is written in both Latin and Cyrillic, so the encoding question is an audience one. A small market where tourism drives a pronounced seasonal swing in messaging volume.',
  netherlands:
    'The Netherlands uses +31. Dutch is Latin script and fits GSM-7 with almost no friction — one of the cleaner European markets for character budgeting. Mobile penetration and smartphone adoption are both high, and consent expectations are enforced strictly.',
  'north-macedonia':
    'North Macedonia dials on +389. Macedonian is Cyrillic, so local-language SMS is unicode at 70 characters. Albanian is also official and uses Latin script, which means the two main language audiences carry different per-message costs.',
  norway:
    'Norway uses +47 with eight-digit numbers and no area codes. Norwegian uses æ, ø and å from the GSM-7 extension set, each costing two characters. Coverage along the coast and in the far north is better than the terrain would suggest, thanks to sustained obligations on operators.',
  poland:
    'Poland dials on +48. Polish uses ą, ć, ę, ł, ń, ó, ś, ź and ż — none of which are in GSM-7, so authentic Polish text is unicode at 70 characters. Stripping the diacritics is common in bulk sending and is generally readable, though it looks careless in a branded message.',
  portugal:
    'Portugal uses +351 with nine-digit numbers and no trunk prefix. Portuguese accents fall outside GSM-7, so most genuine text is unicode at 70 characters. Worth noting that Portugal and Brazil differ in spelling conventions as well as code, so copy rarely transfers cleanly between them.',
  romania:
    'Romania dials on +40. Romanian uses ă, â, î, ș and ț, all outside GSM-7. A specific trap here: the correct ș and ț use commas below, but visually similar Turkish characters with cedillas are frequently substituted, and the two are not interchangeable in text processing.',
  russia:
    'Russia uses +7, shared with Kazakhstan and distinguished by the digits that follow — one of the few country codes serving two sovereign states. Cyrillic means unicode at 70 characters per segment, and the market is large enough that the difference is material at volume.',
  'san-marino':
    'San Marino dials on +378, its own code despite being entirely surrounded by Italy. Italian is the official language. The numbering plan is separate but the telecommunications infrastructure is closely tied to Italy\'s, so routing often follows Italian paths.',
  serbia:
    'Serbia uses +381. Serbian is written in both Cyrillic and Latin, officially and interchangeably, which makes it one of the clearest cases where encoding is a choice rather than a constraint — the same message costs 70 or 160 characters depending on alphabet.',
  slovakia:
    'Slovakia dials on +421, taking the adjacent code to Czechia\'s +420 when Czechoslovakia divided. Slovak has a wide accent set including ĺ and ŕ that falls outside GSM-7, so most authentic text runs as unicode.',
  slovenia:
    'Slovenia uses +386. Slovene needs only č, š and ž beyond the Latin basics, but all three sit outside GSM-7, so even a short message tips into unicode. A small, prosperous market with high smartphone penetration and strict consent expectations.',
  spain:
    'Spain dials on +34 with nine-digit numbers and no trunk prefix. Spanish needs ñ and accented vowels; ñ is in the GSM-7 extension set, so it costs two characters rather than tipping the whole message. Catalan, Galician and Basque campaigns are common and behave differently again.',
  sweden:
    'Sweden uses +46. Swedish uses å, ä and ö from the GSM-7 extension set, each consuming two characters. The market moved early and hard to mobile-first banking and identity, which made SMS primarily an authentication channel rather than a promotional one.',
  switzerland:
    'Switzerland dials on +41 with four national languages — German, French, Italian and Romansh. Language targeting by region is standard practice rather than a refinement, and French and Italian accents carry a segment cost that German largely avoids.',
  ukraine:
    'Ukraine uses +380. Ukrainian is Cyrillic, so local-language SMS is unicode at 70 characters. Network coverage and operator availability vary considerably by region under current conditions, and delivery expectations should be set per area rather than nationally.',
  // ------------------------------------------------------------ Americas
  // Fifteen of these share +1 under the North American Numbering Plan, which
  // makes the area code — not the country code — the thing that identifies
  // the country. That single fact drives most of what follows.
  'antigua-and-barbuda':
    'Antigua and Barbuda sits inside the North American Numbering Plan on +1, using area code 268. That means a number here looks American at a glance and is only distinguishable by its area code — the usual trap when routing Caribbean traffic. English is official.',
  argentina:
    'Argentina dials on +54, and mobile numbers carry an extra 9 after the country code when dialled internationally — a quirk that catches out almost every integration on first attempt. Spanish accents and ñ fall partly outside GSM-7.',
  bahamas:
    'The Bahamas uses +1 with area code 242, inside the North American Numbering Plan. English is official. Population spreads across roughly 30 inhabited islands, so coverage is genuinely archipelagic rather than national in the usual sense.',
  barbados:
    'Barbados dials on +1 under area code 246. English is official, Latin script. One of the most densely populated islands in the Caribbean, which means near-universal coverage from comparatively little infrastructure.',
  belize:
    'Belize uses +501 — one of the few Central American states outside the +1 plan and the only one with English as its official language, a legacy of British rather than Spanish colonisation. Spanish and Kriol are also widely spoken.',
  bolivia:
    'Bolivia dials on +591. Spanish is official alongside Quechua, Aymara and dozens of other recognised languages. The altiplano and the lowlands are effectively two different coverage problems, and La Paz sits higher than any other seat of government.',
  chile:
    'Chile uses +56. Spanish with accents and ñ, so some messages tip past GSM-7. The country runs 4,300 kilometres north to south and averages under 200 wide, which makes coverage a linear problem rather than an area one.',
  colombia:
    'Colombia dials on +57. Spanish is official, Latin script. Mobile numbers are ten digits beginning with 3, which distinguishes them cleanly from landlines — useful, since not every market makes that separation obvious.',
  'costa-rica':
    'Costa Rica uses +506 with eight-digit numbers and no trunk prefix. Spanish is official. One of the more connected markets in Central America, with mobile penetration above one line per person.',
  cuba:
    'Cuba dials on +53. Spanish is official, Latin script. A single state operator serves the country and international routing options are narrower than anywhere else in the region, which affects both cost and delivery reliability.',
  dominica:
    'Dominica sits on +1 with area code 767, inside the North American Numbering Plan. English is official and a French-based Creole is widely spoken. Not to be confused with the Dominican Republic, which is a different country on different area codes.',
  'dominican-republic':
    'The Dominican Republic uses +1 across three area codes — 809, 829 and 849 — more than most Caribbean states, reflecting its larger population. Spanish is official. It shares Hispaniola with Haiti, which sits outside the +1 plan entirely.',
  ecuador:
    'Ecuador dials on +593. Spanish is official, with Kichwa and Shuar also recognised. The Galápagos sit nearly a thousand kilometres offshore and are covered under the same numbering plan as the mainland.',
  'el-salvador':
    'El Salvador uses +503 with eight-digit numbers. Spanish is official. The smallest and most densely populated country in Central America, and a substantial diaspora in the United States drives heavy inbound international traffic.',
  grenada:
    'Grenada dials on +1 under area code 473, within the North American Numbering Plan. English is official. A small three-island state where the resident population is smaller than many single city districts.',
  guatemala:
    'Guatemala uses +502 with eight-digit numbers. Spanish is official, but more than twenty Mayan languages are spoken and several use characters outside the basic Latin set — relevant when localising beyond Spanish.',
  guyana:
    'Guyana dials on +592. English is the official language, the only South American country where that is the case. Most of the population lives on the narrow coastal strip, with the forested interior largely uncovered.',
  haiti:
    'Haiti uses +509, outside the +1 plan despite sharing Hispaniola with the Dominican Republic, which is inside it. French and Haitian Creole are both official; French accents push some messages past GSM-7.',
  honduras:
    'Honduras dials on +504 with eight-digit numbers. Spanish is official. Coverage concentrates around Tegucigalpa and San Pedro Sula, with the Mosquito Coast in the east materially less served.',
  jamaica:
    'Jamaica sits on +1 with area codes 876 and 658, inside the North American Numbering Plan. English is official and Patois is universally spoken. A large diaspora in the UK, US and Canada makes inbound international traffic substantial.',
  mexico:
    'Mexico uses +52. Numbers moved to a uniform ten-digit format in 2019, dropping the old 1 and 045 prefixes for mobile — a change that broke a great many stored contact lists and still catches out older integrations.',
  nicaragua:
    'Nicaragua dials on +505 with eight-digit numbers. Spanish is official, with English and indigenous languages recognised on the Caribbean coast, which functions as a distinct audience from the Pacific side.',
  panama:
    'Panama uses +507. Spanish is official. The canal makes it a logistics hub far out of proportion to its population, which shows up as unusually heavy transactional and shipping-related messaging.',
  paraguay:
    'Paraguay dials on +595. Spanish and Guaraní are both official, and Guaraní is genuinely widely spoken rather than ceremonial — one of the few indigenous languages in the Americas with that status. Both use Latin script.',
  peru:
    'Peru uses +51. Spanish is official alongside Quechua and Aymara. Coverage divides sharply between the coastal strip, the Andes and the Amazon basin, and a national figure conceals all three.',
  'saint-kitts-and-nevis':
    'Saint Kitts and Nevis dials on +1 with area code 869, inside the North American Numbering Plan. English is official. The smallest sovereign state in the Americas by both area and population.',
  'saint-lucia':
    'Saint Lucia uses +1 under area code 758. English is official and a French-based Creole is widely spoken. Like its Caribbean neighbours, its numbers are indistinguishable from US ones without checking the area code.',
  'saint-vincent-and-the-grenadines':
    'Saint Vincent and the Grenadines sits on +1 with area code 784. English is official. The state spans a main island and a chain of smaller ones, several inhabited, which makes coverage genuinely multi-island.',
  suriname:
    'Suriname dials on +597. Dutch is the official language — the only country in South America where that is so — with Sranan Tongo widely spoken. Most of the population lives near Paramaribo on the coast.',
  'trinidad-and-tobago':
    'Trinidad and Tobago uses +1 with area code 868, within the North American Numbering Plan. English is official. The most industrialised Caribbean economy, with energy exports driving a business messaging profile closer to a mainland market.',
  uruguay:
    'Uruguay dials on +598. Spanish is official, Latin script. Small, highly urbanised and one of the most connected markets in South America, with a large majority of the population in and around Montevideo.',
  venezuela:
    'Venezuela uses +58. Spanish is official, Latin script. Mobile numbers are identifiable by their operator prefix, and infrastructure conditions mean delivery reliability varies more by network here than in most of the region.',

  // ------------------------------------------------------------- Oceania
  fiji:
    'Fiji dials on +679 with seven-digit numbers. English, Fijian and Fiji Hindi are all official; Fiji Hindi is written in both Devanagari and Latin, so encoding depends on which. Around a hundred of its 330 islands are inhabited.',
  kiribati:
    'Kiribati uses +686. English and Gilbertese are both official, Latin script. The country straddles the equator and the 180th meridian across 33 atolls, spanning more longitude than almost anywhere — timing a send here is genuinely awkward.',
  'marshall-islands':
    'The Marshall Islands dials on +692. English and Marshallese are both official, Latin script. A little over a thousand islands and islets arranged in atolls, with a compact of free association keeping close US ties and traffic.',
  micronesia:
    'Micronesia uses +691. English is official across four states spread over more than 2,500 kilometres of ocean — the distance, not the population, is what makes coverage here a genuine engineering problem.',
  nauru:
    'Nauru dials on +674. English and Nauruan are both official. The third-smallest country in the world by area, a single raised coral island, with a population that would fit in a large office building.',
  'new-zealand':
    'New Zealand uses +64. English, Māori and NZ Sign Language are all official; Māori uses macrons that fall outside GSM-7, so genuine te reo text is unicode. Mobile coverage follows the population down the two main islands rather than the terrain.',
  palau:
    'Palau dials on +680. English and Palauan are both official, Latin script. A small archipelago in the western Pacific with close US ties, and a resident population under 20,000.',
  'papua-new-guinea':
    'Papua New Guinea uses +675. English, Tok Pisin and Hiri Motu are official, but more than 800 languages are spoken here — more than any other country. Extremely rugged terrain makes coverage highly uneven outside the main centres.',
  samoa:
    'Samoa dials on +685. Samoan and English are both official, Latin script. The country moved across the international date line in 2011 to align with Australia and New Zealand, which is worth remembering when scheduling.',
  'solomon-islands':
    'The Solomon Islands uses +677. English is official and Pijin is widely spoken, both Latin script. Nearly a thousand islands with a small, dispersed population, so national coverage means something different here than on a landmass.',
  tonga:
    'Tonga dials on +676. Tongan and English are both official; Tongan uses a macron and a glottal stop that fall outside GSM-7. One of the first countries to see each new day, sitting just west of the date line.',
  tuvalu:
    'Tuvalu uses +688. Tuvaluan and English are both official. One of the smallest and lowest-lying countries in the world, better known internationally for its .tv domain than its telecommunications.',
  vanuatu:
    'Vanuatu dials on +678. Bislama, English and French are all official, all Latin script. An archipelago of some 80 islands, where French and English audiences are genuinely distinct rather than nominally so.',

  // -------------------------------------------------------------- Africa
  algeria:
    'Algeria dials on +213 and is the largest country in Africa by land area. Arabic script means unicode at 70 characters, though French remains widespread in commerce and stays within GSM-7. Almost the entire population lives along the Mediterranean strip, with the Sahara largely uninhabited.',
  angola:
    'Angola uses +244. Portuguese is the official language, Latin script, so GSM-7 applies with accents costing extra. The market rebuilt its telecommunications almost entirely after 2002, which is why mobile coverage far outstrips anything fixed-line.',
  benin:
    'Benin dials on +229. French is official and Latin script, so full 160-character segments apply. Numbers moved from eight digits to ten in 2020 — old contact lists collected before that change will not deliver, which is the single most common problem with Benin data.',
  botswana:
    'Botswana uses +267. English and Setswana are both official and both Latin script, so GSM-7 throughout. The Kalahari covers most of the country, so population and coverage concentrate along the eastern corridor from Gaborone to Francistown.',
  'burkina-faso':
    'Burkina Faso is +226. French is official, Latin script, GSM-7. Landlocked in the Sahel with one of the youngest populations anywhere, which skews mobile adoption younger and more prepaid than most markets its size.',
  burundi:
    'Burundi dials on +257. Kirundi and French are both official and both Latin script. One of the most densely populated countries in Africa, which unusually means coverage reaches a high share of the population without needing many sites.',
  cameroon:
    'Cameroon uses +237. Both English and French are official — a genuine split, not a formality — so campaigns here are routinely bilingual, and the anglophone northwest and southwest behave as a distinct audience from the francophone majority.',
  'cape-verde':
    'Cape Verde dials on +238. Portuguese is official and Cape Verdean Creole is universally spoken; both are Latin script. An archipelago of ten islands several hundred kilometres offshore, with a diaspora larger than the resident population driving heavy inbound international traffic.',
  'central-african-republic':
    'The Central African Republic uses +236. French and Sango are both official, both Latin script. One of the least connected markets on the continent, where mobile coverage is concentrated around Bangui and delivery outside the capital should not be assumed.',
  chad:
    'Chad is +235. Arabic and French are both official, which means one audience reads unicode at 70 characters and the other GSM-7 at 160 — the same campaign costs differently depending on which half you address.',
  comoros:
    'The Comoros dials on +269. Comorian, Arabic and French are all official across three main islands. A small market where the entire population is closer to that of a mid-sized city, and where inter-island infrastructure shapes coverage more than terrain does.',
  djibouti:
    'Djibouti uses +253. Arabic and French are both official, so encoding depends on audience. Tiny by population but strategically placed at the mouth of the Red Sea, and one of the main landing points for submarine cables serving East Africa.',
  'dr-congo':
    'The Democratic Republic of the Congo dials on +243 and is the second-largest country in Africa. French is official and Latin script. Its scale is the operational fact: coverage clusters around Kinshasa, Lubumbashi and the mining regions, with vast areas between them unserved.',
  'equatorial-guinea':
    'Equatorial Guinea uses +240 and is the only sovereign African state with Spanish as an official language — Latin script, so ñ and accented vowels are the only characters costing extra. The country is split between a mainland region and the island holding its capital.',
  eritrea:
    'Eritrea dials on +291. Tigrinya is written in Geʽez script, which is unicode, while Arabic and English are also in use. One of the most tightly controlled telecommunications markets anywhere, with a single state operator and limited international routing.',
  eswatini:
    'Eswatini uses +268, and changed its name from Swaziland in 2018 — older datasets and dropdowns still carry the previous name, which causes matching failures. English and siSwati are both official and both Latin script.',
  ethiopia:
    'Ethiopia dials on +251. Amharic is written in Geʽez script, unicode at 70 characters per segment. It is the second most populous country in Africa and, until recently, one of the last major markets with a single state-run mobile operator.',
  gabon:
    'Gabon uses +241. French is official, Latin script, GSM-7. Heavily forested and lightly populated, with most people concentrated in Libreville and Port-Gentil — coverage follows that concentration closely.',
  gambia:
    'The Gambia dials on +220. English is official and Latin script. The smallest country on mainland Africa, a narrow strip along its river, entirely surrounded by Senegal — cross-border roaming is a routine part of how numbers behave here.',
  ghana:
    'Ghana uses +233. English is official and Latin script, so GSM-7 and full segments apply. Mobile money moves a substantial share of the economy here and runs on SMS confirmations, which makes transactional traffic unusually heavy relative to population.',
  guinea:
    'Guinea is +224. French is official, Latin script. Numbers moved to nine digits in 2016, so lists gathered before that need reformatting. Bauxite mining drives much of the economy and, with it, coverage around the mining corridors.',
  'guinea-bissau':
    'Guinea-Bissau dials on +245. Portuguese is official while Guinea-Bissau Creole is more widely spoken; both are Latin script. A small market including the Bijagós archipelago, where island coverage is materially thinner than the mainland.',
  'ivory-coast':
    'Ivory Coast uses +225. French is official, Latin script. Numbers moved from eight digits to ten in 2021, one of the more recent renumberings in West Africa — any contact list predating it will fail outright rather than misdeliver.',
  lesotho:
    'Lesotho dials on +266. English and Sesotho are both official, both Latin script. Entirely surrounded by South Africa and the only country in the world lying wholly above 1,000 metres, which shapes where coverage is practical.',
  liberia:
    'Liberia uses +231. English is official, Latin script. Founded by freed American settlers, it retains close US ties, and a large diaspora means substantial inbound international traffic relative to its population.',
  libya:
    'Libya dials on +218. Arabic script means unicode at 70 characters. Ninety per cent of the country is desert and the population lives almost entirely along the coast, so national coverage figures reflect a coastal strip rather than the landmass.',
  madagascar:
    'Madagascar uses +261. Malagasy and French are both official and both Latin script. The world\'s fourth-largest island, where distance and terrain mean coverage varies sharply between the highlands, the coasts and the interior.',
  malawi:
    'Malawi is +265. English and Chichewa are both official, both Latin script. One of the most densely populated countries in southern Africa, with the lake taking up a fifth of the territory and shaping where networks are built.',
  mali:
    'Mali dials on +223. French is official and Latin script. Landlocked and largely Saharan in the north, with population and coverage concentrated along the Niger river in the south.',
  mauritania:
    'Mauritania uses +222. Arabic is official — unicode at 70 characters — with French still common in business. Mostly desert, with the population concentrated in Nouakchott and along the southern river border.',
  mauritius:
    'Mauritius dials on +230. English and French are both official and Mauritian Creole is universally spoken; all Latin script. One of the most connected markets in Africa, with mobile penetration above one line per person and reliable island-wide coverage.',
  morocco:
    'Morocco uses +212. Arabic and Amazigh are official — Amazigh is written in Tifinagh, its own script — and French is widespread in commerce. That gives three encoding outcomes from one country, which makes audience segmentation a cost decision.',
  mozambique:
    'Mozambique dials on +258. Portuguese is official, Latin script. A long coastline means population and infrastructure stretch north to south rather than clustering, and coverage follows the coastal corridor and the main transport routes inland.',
  namibia:
    'Namibia uses +264. English is the sole official language, Latin script. The second least densely populated country in the world, so national coverage claims are worth reading carefully — the population concentrates in the north and around Windhoek.',
  niger:
    'Niger is +227. French is official, Latin script. Largely Saharan, with the population concentrated in the far south along the Nigerian border, which is where coverage and commercial activity both sit.',
  'republic-of-the-congo':
    'The Republic of the Congo dials on +242 — routinely confused with its much larger neighbour on +243. French is official, Latin script. Most of the population lives in Brazzaville and Pointe-Noire, and coverage reflects that concentration.',
  rwanda:
    'Rwanda uses +250. Kinyarwanda, English and French are all official and all Latin script. Small and densely populated with deliberate investment in connectivity, which makes it one of the more uniformly covered markets in East Africa.',
  'sao-tome-and-principe':
    'São Tomé and Príncipe dials on +239. Portuguese is official, Latin script, with accented characters costing extra. Two small islands off the Central African coast with one of the smallest populations of any sovereign state.',
  senegal:
    'Senegal uses +221. French is official and Wolof is the most widely spoken language; both use Latin script. Dakar sits at the westernmost point of the continent and is a major landing site for submarine cables serving West Africa.',
  seychelles:
    'The Seychelles dials on +248 with seven-digit numbers. English, French and Seychellois Creole are all official, all Latin script. An archipelago where the resident population is small enough that visitor traffic materially changes messaging volume by season.',
  'sierra-leone':
    'Sierra Leone uses +232. English is official, Latin script, with Krio spoken almost universally. Mobile networks rebuilt substantially after the civil war and again after the 2014 Ebola outbreak, during which bulk SMS became a primary public health channel.',
  somalia:
    'Somalia dials on +252. Somali uses Latin script, adopted officially in 1972, so GSM-7 applies despite Arabic\'s cultural presence. The market is notable for how far mobile money spread in the absence of conventional banking.',
  'south-sudan':
    'South Sudan uses +211, one of the newest country codes in the world — assigned on independence in 2011. English is official and Latin script. Telecommunications infrastructure is thin and coverage concentrates around Juba.',
  sudan:
    'Sudan dials on +249. Arabic script means unicode at 70 characters, with English also in official use. The numbering plan changed after South Sudan\'s separation, so older records may carry ranges that no longer belong to this country at all.',
  tanzania:
    'Tanzania uses +255. Swahili and English are both official and both Latin script, so GSM-7 throughout. Mobile money is deeply embedded here, and the numbering plan covers both the mainland and Zanzibar under a single code.',
  togo:
    'Togo dials on +228. French is official, Latin script. A narrow country running inland from a short coastline, with population and coverage densest in the south around Lomé.',
  tunisia:
    'Tunisia uses +216 with eight-digit numbers. Arabic is official — unicode at 70 characters — and French remains common in business messaging, where GSM-7 applies. One of the more connected markets in North Africa.',
  uganda:
    'Uganda dials on +256. English and Swahili are both official, Latin script. A young, fast-growing population with heavy mobile money usage, and coverage that follows the corridor from Kampala outward rather than spreading evenly.',
  zambia:
    'Zambia uses +260. English is official, Latin script. Landlocked and lightly populated for its size, with coverage concentrated along the line of rail from Livingstone through Lusaka to the Copperbelt.',
  zimbabwe:
    'Zimbabwe dials on +263. English is official alongside Shona and Ndebele, all Latin script. Mobile money and airtime transfer carry a substantial share of everyday transactions, which keeps transactional SMS volume high relative to population.',

  'vatican-city':
    'Vatican City dials on +379 in the numbering plan, though in practice its telephony runs through Italian +39 infrastructure. The smallest sovereign state in the world, with a resident population under a thousand — listed for completeness rather than as a commercial market.',
}
