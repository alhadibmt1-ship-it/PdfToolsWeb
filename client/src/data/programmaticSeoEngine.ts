import type { ProgrammaticPage } from "./programmaticSeoData";

const BASE = "https://pdfhub24.com";

// ─── Seed data ────────────────────────────────────────────────────────────────

const SIZES = [
  { slug: "5kb",  label: "5KB",   bytes: "5,120",  example: "tiny ID scan or single-page text form" },
  { slug: "10kb", label: "10KB",  bytes: "10,240", example: "minimalist resume or short memo" },
  { slug: "15kb", label: "15KB",  bytes: "15,360", example: "short application cover letter" },
  { slug: "20kb", label: "20KB",  bytes: "20,480", example: "single-page invoice or receipt" },
  { slug: "25kb", label: "25KB",  bytes: "25,600", example: "passport-photo form or ID scan" },
  { slug: "30kb", label: "30KB",  bytes: "30,720", example: "2-page text document" },
  { slug: "40kb", label: "40KB",  bytes: "40,960", example: "simple 3-page report" },
  { slug: "75kb", label: "75KB",  bytes: "76,800", example: "bank statement or official letter" },
  { slug: "150kb","label": "150KB",bytes:"153,600","example":"multi-page professional report" },
  { slug: "250kb","label": "250KB",bytes:"256,000","example":"brochure or lightly illustrated guide" },
  { slug: "500kb","label": "500KB",bytes:"512,000","example":"photo-light presentation or catalog" },
  { slug: "750kb","label": "750KB",bytes:"768,000","example":"10-page illustrated report" },
  { slug: "2mb",  label: "2MB",   bytes: "2,097,152","example":"heavily illustrated business proposal" },
  { slug: "5mb",  label: "5MB",   bytes: "5,242,880","example":"large scanned document archive" },
  { slug: "10mb", label: "10MB",  bytes: "10,485,760","example":"photo-heavy annual report or portfolio" },
];

const COMPRESS_USE_CASES = [
  { slug: "linkedin",           label: "LinkedIn",             context: "LinkedIn has a 5MB file attachment limit. Keeping your PDF under 2MB ensures fast loading for hiring managers on slow connections." },
  { slug: "instagram",          label: "Instagram",            context: "While Instagram doesn't support direct PDF sharing, many users share PDF pages as images; compressing first keeps export quality high." },
  { slug: "twitter",            label: "Twitter / X",          context: "Twitter allows PDF uploads only via DM with a 5MB limit. Compressing ensures your document reaches every recipient." },
  { slug: "facebook",           label: "Facebook",             context: "Facebook allows PDF sharing in groups and Messenger. Smaller files load faster for mobile users on the platform." },
  { slug: "telegram",           label: "Telegram",             context: "Telegram's default 2GB limit is generous, but smaller PDFs load instantly even on mobile data for all group members." },
  { slug: "slack",              label: "Slack",                context: "Slack's free plan limits file storage. Compressing PDFs before uploading saves team storage and speeds up previews." },
  { slug: "google-drive",       label: "Google Drive",         context: "Google Drive counts PDFs against your 15GB quota. Compressing files helps stay under the free storage limit longer." },
  { slug: "dropbox",            label: "Dropbox",              context: "Dropbox syncs across all your devices. Smaller PDFs sync faster on mobile connections and take less bandwidth." },
  { slug: "onedrive",           label: "OneDrive",             context: "OneDrive integrates tightly with Microsoft 365. Compressed PDFs open faster in Word Online and SharePoint previews." },
  { slug: "icloud",             label: "iCloud",               context: "iCloud's 5GB free tier fills quickly. Compressing PDFs reduces your iCloud usage and keeps automatic backup faster." },
  { slug: "sharepoint",         label: "SharePoint",           context: "SharePoint has per-file size limits and throttles large uploads. Compressed PDFs stay within policy limits and load faster in Teams." },
  { slug: "teams",              label: "Microsoft Teams",      context: "Teams chat attachments load as previews. Smaller PDFs render the preview instantly without requiring a full download." },
  { slug: "zoom",               label: "Zoom",                 context: "Sharing a PDF via Zoom Chat or Whiteboard works best with files under 1MB for real-time collaborative review." },
  { slug: "government-forms",   label: "Government Forms",     context: "Government portals often enforce 1MB or 2MB file-size limits with no exception. Compression is mandatory to complete your submission." },
  { slug: "scholarship-application","label":"Scholarship Applications","context":"Scholarship portals typically cap supporting documents at 500KB. Compressing ensures your package uploads without error." },
  { slug: "insurance-claim",    label: "Insurance Claims",     context: "Insurance portals have tight document size limits. Compressed claims process faster through automated scanning systems." },
  { slug: "court-filing",       label: "Court Filings",        context: "Electronic court filing systems (CM/ECF, eFiling) enforce strict per-document size caps — often 5MB or less." },
  { slug: "medical-records",    label: "Medical Records",      context: "Patient portals and hospital intranets limit upload sizes. Compressed records transfer securely within compliance guidelines." },
  { slug: "tax-return",         label: "Tax Returns",          context: "Tax authority portals (IRS, HMRC, etc.) restrict supporting document sizes. Compressed returns file without rejection errors." },
  { slug: "bank-statement",     label: "Bank Statements",      context: "Lenders and landlords prefer emailed statements under 2MB. Compressing keeps your application moving quickly." },
  { slug: "loan-application",   label: "Loan Applications",    context: "Loan portals require multiple supporting documents. Compressing each file keeps your total submission under the portal limit." },
  { slug: "university-admission","label":"University Admissions","context":"University application portals cap supporting documents at 2–5MB. Compressed transcripts and essays upload reliably." },
  { slug: "passport-application","label":"Passport Applications","context":"Passport application portals have strict file-size requirements. Compress supporting documents to avoid upload errors." },
  { slug: "printing",           label: "Printing",             context: "Print shops prefer smaller files for faster transfer. Compressing without quality loss gives clean prints with quick uploads." },
  { slug: "presentation",       label: "Presentations",        context: "Sharing presentation PDFs via email or link is easier under 5MB. Recipients download instantly on any connection." },
  { slug: "website-upload",     label: "Website Upload",       context: "Websites load PDFs inline in the browser. Files under 1MB render immediately without a loading spinner." },
  { slug: "client-sharing",     label: "Client Sharing",       context: "Professional clients expect fast-loading documents. Compressed PDFs reflect attention to detail and respect for their time." },
  { slug: "mobile-sharing",     label: "Mobile Sharing",       context: "Mobile users on 4G or 5G still benefit from smaller PDFs. Files under 1MB open instantly in every mobile PDF viewer." },
];

const MERGE_USE_CASES = [
  { slug: "court-filing",         label: "Court Filings",         context: "Courts require all exhibits and filings as a single document. Merging ensures chronological order and proper pagination." },
  { slug: "medical-records",      label: "Medical Records",       context: "Combining patient history, test results, and prescriptions into one PDF simplifies referrals and hospital admissions." },
  { slug: "tax-return",           label: "Tax Returns",           context: "Tax authorities need income, expenses, and supporting evidence in one organised PDF submission." },
  { slug: "bank-statement",       label: "Bank Statements",       context: "Lenders need 3–6 months of statements in one file. Merging monthly PDFs delivers a clean, sequential package." },
  { slug: "loan-application",     label: "Loan Applications",     context: "Banks process loan applications faster when ID, payslips, and statements are merged into a single ordered PDF." },
  { slug: "university-admission", label: "University Admissions", context: "Combine your application form, transcripts, essays, and reference letters into one submission-ready PDF." },
  { slug: "scholarship-application","label":"Scholarship Applications","context":"Merge CV, personal statement, academic records, and references into one complete scholarship submission file." },
  { slug: "insurance-claim",      label: "Insurance Claims",      context: "Combine incident report, photos, receipts, and policy documents into one claim file for faster adjuster review." },
  { slug: "passport-application", label: "Passport Applications", context: "Merge completed forms, photo ID scans, and supporting evidence for a complete passport renewal package." },
  { slug: "business-proposal",    label: "Business Proposals",    context: "Combine executive summary, financial projections, team profiles, and terms into one professional proposal." },
  { slug: "contract-signing",     label: "Contracts",             context: "Merge contract body, schedules, annexures, and signature pages into one legally clean, paginated document." },
  { slug: "report-compilation",   label: "Reports",               context: "Combine department reports, charts, and appendices into a single polished PDF for executive presentation." },
  { slug: "portfolio-creation",   label: "Portfolios",            context: "Designers and creatives merge project pages into a single stunning portfolio PDF for client or recruiter review." },
  { slug: "invoice-submission",   label: "Invoice Submission",    context: "Merge invoices, purchase orders, and delivery notes into one accounts payable package for faster payment." },
  { slug: "travel-documents",     label: "Travel Documents",      context: "Combine itinerary, hotel bookings, flight tickets, and visa copies into one travel PDF for easy airport access." },
  { slug: "tenancy-agreement",    label: "Tenancy Agreements",    context: "Merge tenancy contract, inventory checklist, and standing order forms into one package for landlord and tenant." },
  { slug: "property-documents",   label: "Property Documents",    context: "Combine title deed, survey, and disclosure forms into a single organised property transaction file." },
  { slug: "audit-files",          label: "Audit Files",           context: "Accountants merge trial balances, ledgers, and supporting schedules into one clean audit submission binder." },
  { slug: "grant-application",    label: "Grant Applications",    context: "Combine project proposal, budget, CVs, and supporting evidence into one complete grant application pack." },
  { slug: "project-submission",   label: "Project Submissions",   context: "Merge project report, supporting data, references, and appendices into one complete academic or business submission." },
];

const PROFESSIONS = [
  { slug: "students",          label: "Students",           context: "Students handle assignments, theses, and application documents daily. Fast, free PDF tools eliminate the need for paid software." },
  { slug: "lawyers",           label: "Lawyers",            context: "Legal professionals manage contracts, pleadings, and evidence bundles. Reliable PDF tools speed up document preparation and court filings." },
  { slug: "doctors",           label: "Doctors",            context: "Healthcare professionals share patient records, referrals, and research papers. HIPAA-safe, local processing keeps patient data private." },
  { slug: "teachers",          label: "Teachers",           context: "Educators create lesson packs, worksheets, and grade reports. Browser-based PDF tools require no installation on school devices." },
  { slug: "engineers",         label: "Engineers",          context: "Engineers share CAD drawings, specifications, and reports as PDFs. Reliable compression and conversion keep large technical files manageable." },
  { slug: "accountants",       label: "Accountants",        context: "Accountants merge financial statements and compress tax documents for client portals. No cloud upload means client data stays private." },
  { slug: "nurses",            label: "Nurses",             context: "Nursing staff handle care plans, medication records, and discharge summaries. Lightweight PDF tools work on any hospital device." },
  { slug: "professors",        label: "Professors",         context: "Professors prepare course packets, research papers, and exam materials. Free tools reduce reliance on expensive university software licenses." },
  { slug: "researchers",       label: "Researchers",        context: "Academic researchers compile literature reviews, data tables, and appendices into submission-ready PDFs for journals and conferences." },
  { slug: "architects",        label: "Architects",         context: "Architects share floor plans, specifications, and permit drawings as PDFs. Lossless compression keeps technical details crisp." },
  { slug: "journalists",       label: "Journalists",        context: "Journalists compile press kits, interview transcripts, and photo spreads. Quick PDF tools meet tight publication deadlines." },
  { slug: "pharmacists",       label: "Pharmacists",        context: "Pharmacists handle prescription records, drug information sheets, and regulatory submissions requiring clean, properly formatted PDFs." },
  { slug: "real-estate-agents","label":"Real Estate Agents","context":"Agents merge listing agreements, disclosure forms, and inspection reports into one client-ready PDF package." },
  { slug: "hr-managers",       label: "HR Managers",        context: "HR professionals process CVs, contracts, and onboarding documents daily. Batch PDF tools dramatically reduce administrative time." },
  { slug: "financial-advisors","label":"Financial Advisors","context":"Financial advisors compile investment proposals, statements, and compliance documents into polished client presentation PDFs." },
];

const COUNTRIES = [
  // ── Existing 45 ────────────────────────────────────────────────────────────
  { slug: "uk",                 label: "UK",                  demonym: "UK users",                  portal: "HMRC, Companies House, and UK government portals" },
  { slug: "australia",          label: "Australia",            demonym: "Australians",               portal: "myGov, ASIC, and ATO portals" },
  { slug: "canada",             label: "Canada",               demonym: "Canadians",                 portal: "CRA, Service Canada, and provincial portals" },
  { slug: "usa",                label: "USA",                  demonym: "US users",                  portal: "IRS, USCIS, and federal government portals" },
  { slug: "india",              label: "India",                demonym: "Indian users",              portal: "DigiLocker, income tax, and government e-services" },
  { slug: "germany",            label: "Germany",              demonym: "German users",              portal: "Elster, Bund Online, and Bundesdruckerei portals" },
  { slug: "france",             label: "France",               demonym: "French users",              portal: "Impots.gouv, Ameli, and French administrative portals" },
  { slug: "spain",              label: "Spain",                demonym: "Spanish users",             portal: "AEAT, Seguridad Social, and Spanish eAdministration" },
  { slug: "italy",              label: "Italy",                demonym: "Italian users",             portal: "Agenzia Entrate, INPS, and Italian PA digital desks" },
  { slug: "japan",              label: "Japan",                demonym: "Japanese users",            portal: "e-Tax, My Number, and Japanese government portals" },
  { slug: "brazil",             label: "Brazil",               demonym: "Brazilian users",           portal: "Receita Federal, Gov.br, and Brazilian federal services" },
  { slug: "mexico",             label: "Mexico",               demonym: "Mexican users",             portal: "SAT, IMSS, and Mexican digital government portals" },
  { slug: "pakistan",           label: "Pakistan",             demonym: "Pakistani users",           portal: "FBR, NADRA, and Pakistani e-government services" },
  { slug: "uae",                label: "UAE",                  demonym: "UAE users",                 portal: "UAE PASS, eDNRD, and Federal Authority portals" },
  { slug: "nigeria",            label: "Nigeria",              demonym: "Nigerian users",            portal: "FIRS, CAC, and Nigerian federal e-services" },
  { slug: "indonesia",          label: "Indonesia",            demonym: "Indonesian users",          portal: "DJP Online, SIAK, and Indonesian government portals" },
  { slug: "turkey",             label: "Turkey",               demonym: "Turkish users",             portal: "e-Devlet, GIB, and Turkish digital public services" },
  { slug: "saudi-arabia",       label: "Saudi Arabia",         demonym: "Saudi users",               portal: "Absher, Muqeem, and Saudi digital government portals" },
  { slug: "south-africa",       label: "South Africa",         demonym: "South Africans",            portal: "SARS eFiling, Home Affairs, and SA government portals" },
  { slug: "china",              label: "China",                demonym: "Chinese users",             portal: "GSXT, tax bureaus, and Chinese administrative platforms" },
  { slug: "philippines",        label: "Philippines",          demonym: "Filipino users",            portal: "BIR eFPS, PSA, and Philippine e-government portals" },
  { slug: "bangladesh",         label: "Bangladesh",           demonym: "Bangladeshi users",         portal: "NBR eTax, BRTA, and Bangladesh e-service portals" },
  { slug: "sri-lanka",          label: "Sri Lanka",            demonym: "Sri Lankan users",          portal: "IRD Sri Lanka, BRTA, and government e-services" },
  { slug: "nepal",              label: "Nepal",                demonym: "Nepali users",              portal: "IRD Nepal, DoTM, and national government portals" },
  { slug: "malaysia",           label: "Malaysia",             demonym: "Malaysian users",           portal: "MyTax, MyEG, and Malaysian government portals" },
  { slug: "singapore",          label: "Singapore",            demonym: "Singapore users",           portal: "Singpass, IRAS, and Singapore government portals" },
  { slug: "thailand",           label: "Thailand",             demonym: "Thai users",                portal: "RD Thailand, DLT, and Thai government e-services" },
  { slug: "vietnam",            label: "Vietnam",              demonym: "Vietnamese users",          portal: "eTax VN, DRVN, and Vietnam e-government portals" },
  { slug: "egypt",              label: "Egypt",                demonym: "Egyptian users",            portal: "ETA, Nafeza, and Egyptian e-government portals" },
  { slug: "morocco",            label: "Morocco",              demonym: "Moroccan users",            portal: "DGI, CNSS, and Moroccan e-administration portals" },
  { slug: "kenya",              label: "Kenya",                demonym: "Kenyan users",              portal: "iTax, eCitizen, and Kenyan government portals" },
  { slug: "ghana",              label: "Ghana",                demonym: "Ghanaian users",            portal: "GRA, Ghana.gov.gh, and government e-services" },
  { slug: "ethiopia",           label: "Ethiopia",             demonym: "Ethiopian users",           portal: "ERCA, MoR, and Ethiopian e-government portals" },
  { slug: "argentina",          label: "Argentina",            demonym: "Argentine users",           portal: "AFIP, ANSES, and Argentine digital government portals" },
  { slug: "colombia",           label: "Colombia",             demonym: "Colombian users",           portal: "DIAN, Cancilleria, and Colombian digital portals" },
  { slug: "chile",              label: "Chile",                demonym: "Chilean users",             portal: "SII, ChileAtiende, and Chilean e-government portals" },
  { slug: "peru",               label: "Peru",                 demonym: "Peruvian users",            portal: "SUNAT, Gob.pe, and Peruvian government portals" },
  { slug: "poland",             label: "Poland",               demonym: "Polish users",              portal: "e-Urzad, ZUS PUE, and Polish digital government portals" },
  { slug: "netherlands",        label: "Netherlands",          demonym: "Dutch users",               portal: "Belastingdienst, DigiD, and Dutch government portals" },
  { slug: "romania",            label: "Romania",              demonym: "Romanian users",            portal: "ANAF, Romania.gov.ro, and digital government portals" },
  { slug: "ukraine",            label: "Ukraine",              demonym: "Ukrainian users",           portal: "Diia, tax.gov.ua, and Ukrainian e-government portals" },
  { slug: "greece",             label: "Greece",               demonym: "Greek users",               portal: "AADE, gov.gr, and Greek digital government portals" },
  { slug: "portugal",           label: "Portugal",             demonym: "Portuguese users",          portal: "Portal das Financas, SNS24, and Portuguese e-government" },
  { slug: "qatar",              label: "Qatar",                demonym: "Qatari users",              portal: "Hukoomi, Metrash2, and Qatar government portals" },
  { slug: "kuwait",             label: "Kuwait",               demonym: "Kuwaiti users",             portal: "MOI eServices, PACI, and Kuwait government portals" },

  // ── Europe (new) ─────────────────────────────────────────────────────────
  { slug: "russia",             label: "Russia",               demonym: "Russian users",             portal: "Gosuslugi, FNS, and Russian digital government portals" },
  { slug: "sweden",             label: "Sweden",               demonym: "Swedish users",             portal: "Skatteverket, BankID, and Swedish digital public services" },
  { slug: "norway",             label: "Norway",               demonym: "Norwegian users",           portal: "Altinn, Skatteetaten, and Norwegian government portals" },
  { slug: "denmark",            label: "Denmark",              demonym: "Danish users",              portal: "borger.dk, SKAT, and Danish digital government services" },
  { slug: "finland",            label: "Finland",              demonym: "Finnish users",             portal: "Suomi.fi, Vero.fi, and Finnish digital government portals" },
  { slug: "belgium",            label: "Belgium",              demonym: "Belgian users",             portal: "MyGov.be, BOSA, and Belgian federal e-services" },
  { slug: "switzerland",        label: "Switzerland",          demonym: "Swiss users",               portal: "eGovSuisse, ESTV, and Swiss federal digital portals" },
  { slug: "austria",            label: "Austria",              demonym: "Austrian users",            portal: "oesterreich.gv.at, Finanz Online, and Austrian e-government" },
  { slug: "czech-republic",     label: "Czech Republic",       demonym: "Czech users",               portal: "Portal.gov.cz, Datova schranka, and Czech digital services" },
  { slug: "hungary",            label: "Hungary",              demonym: "Hungarian users",           portal: "Ugyfelkapu, NAV, and Hungarian government digital portals" },
  { slug: "slovakia",           label: "Slovakia",             demonym: "Slovak users",              portal: "Slovensko.sk, eDane, and Slovak government portals" },
  { slug: "serbia",             label: "Serbia",               demonym: "Serbian users",             portal: "eUprava, PIO Fund, and Serbian digital government services" },
  { slug: "croatia",            label: "Croatia",              demonym: "Croatian users",            portal: "gov.hr, ePorezna, and Croatian government portals" },
  { slug: "bulgaria",           label: "Bulgaria",             demonym: "Bulgarian users",           portal: "e-government.bg, NRA, and Bulgarian digital services" },
  { slug: "ireland",            label: "Ireland",              demonym: "Irish users",               portal: "gov.ie, Revenue Online Service, and Irish digital portals" },
  { slug: "belarus",            label: "Belarus",              demonym: "Belarusian users",          portal: "portal.gov.by, MNS, and Belarusian government portals" },
  { slug: "estonia",            label: "Estonia",              demonym: "Estonian users",            portal: "eesti.ee, X-Road, and Estonian digital government portals" },
  { slug: "latvia",             label: "Latvia",               demonym: "Latvian users",             portal: "latvija.lv, EDS, and Latvian government digital portals" },
  { slug: "lithuania",          label: "Lithuania",            demonym: "Lithuanian users",          portal: "epaslaugos.lt, VMI, and Lithuanian government portals" },
  { slug: "moldova",            label: "Moldova",              demonym: "Moldovan users",            portal: "servicii.gov.md, SFS, and Moldovan e-government portals" },
  { slug: "albania",            label: "Albania",              demonym: "Albanian users",            portal: "e-albania.al, TATIME, and Albanian government portals" },
  { slug: "north-macedonia",    label: "North Macedonia",      demonym: "Macedonian users",          portal: "uslugi.gov.mk, UJP, and North Macedonia e-services" },
  { slug: "bosnia",             label: "Bosnia",               demonym: "Bosnian users",             portal: "eUprava, Porezna uprava, and Bosnia government portals" },
  { slug: "montenegro",         label: "Montenegro",           demonym: "Montenegrin users",         portal: "eUprava Montenegro, PU, and Montenegrin digital services" },
  { slug: "slovenia",           label: "Slovenia",             demonym: "Slovenian users",           portal: "e-uprava.gov.si, FURS, and Slovenian government portals" },
  { slug: "luxembourg",         label: "Luxembourg",           demonym: "Luxembourg users",          portal: "guichet.lu, AED, and Luxembourg government portals" },
  { slug: "malta",              label: "Malta",                demonym: "Maltese users",             portal: "servizz.gov.mt, CFR, and Malta government digital services" },
  { slug: "cyprus",             label: "Cyprus",               demonym: "Cypriot users",             portal: "ariadni.gov.cy, TAX.gov.cy, and Cyprus e-government portals" },
  { slug: "iceland",            label: "Iceland",              demonym: "Icelandic users",           portal: "island.is, RSK, and Icelandic government digital services" },
  { slug: "andorra",            label: "Andorra",              demonym: "Andorran users",            portal: "tramits.govern.ad, and Andorra government portals" },

  // ── Asia & Central Asia (new) ─────────────────────────────────────────────
  { slug: "south-korea",        label: "South Korea",          demonym: "South Korean users",        portal: "Korea.go.kr, Hometax, and South Korean government portals" },
  { slug: "taiwan",             label: "Taiwan",               demonym: "Taiwanese users",           portal: "gov.tw, eTAX, and Taiwan government digital portals" },
  { slug: "hong-kong",          label: "Hong Kong",            demonym: "Hong Kong users",           portal: "GovHK, eTAX, and Hong Kong government online services" },
  { slug: "myanmar",            label: "Myanmar",              demonym: "Myanmar users",             portal: "Myanmar e-government, IRD, and digital public services" },
  { slug: "cambodia",           label: "Cambodia",             demonym: "Cambodian users",           portal: "GDT Cambodia, MPTC, and Cambodian government portals" },
  { slug: "laos",               label: "Laos",                 demonym: "Laotian users",             portal: "Laos government portals, MoF, and e-service platforms" },
  { slug: "mongolia",           label: "Mongolia",             demonym: "Mongolian users",           portal: "e-government.mn, GTA, and Mongolian digital portals" },
  { slug: "afghanistan",        label: "Afghanistan",          demonym: "Afghan users",              portal: "Afghanistan government portals and administrative services" },
  { slug: "kazakhstan",         label: "Kazakhstan",           demonym: "Kazakhstani users",         portal: "egov.kz, KazTax, and Kazakhstan government portals" },
  { slug: "uzbekistan",         label: "Uzbekistan",           demonym: "Uzbek users",               portal: "my.gov.uz, STS, and Uzbekistan government portals" },
  { slug: "kyrgyzstan",         label: "Kyrgyzstan",           demonym: "Kyrgyz users",              portal: "tunduk.gov.kg, SRS, and Kyrgyzstan government portals" },
  { slug: "tajikistan",         label: "Tajikistan",           demonym: "Tajik users",               portal: "Tajikistan government portals and e-service platforms" },
  { slug: "turkmenistan",       label: "Turkmenistan",         demonym: "Turkmen users",             portal: "Turkmenistan government portals and administrative services" },
  { slug: "maldives",           label: "Maldives",             demonym: "Maldivian users",           portal: "egov.mv, MIRA, and Maldivian government portals" },
  { slug: "bhutan",             label: "Bhutan",               demonym: "Bhutanese users",           portal: "bhutan.gov.bt, MoF, and Bhutan government portals" },
  { slug: "brunei",             label: "Brunei",               demonym: "Brunei users",              portal: "gov.bn, MOFE, and Brunei government digital portals" },
  { slug: "east-timor",         label: "East Timor",           demonym: "Timorese users",            portal: "Timor-Leste government portals and public e-services" },
  { slug: "azerbaijan",         label: "Azerbaijan",           demonym: "Azerbaijani users",         portal: "e-gov.az, ASAN Service, and Azerbaijan digital portals" },
  { slug: "armenia",            label: "Armenia",              demonym: "Armenian users",            portal: "e-gov.am, Armenian Tax Service, and digital portals" },
  { slug: "georgia",            label: "Georgia",              demonym: "Georgian users",            portal: "my.gov.ge, RS.ge, and Georgian government portals" },

  // ── Middle East (new) ─────────────────────────────────────────────────────
  { slug: "iran",               label: "Iran",                 demonym: "Iranian users",             portal: "Iran e-government portals, Tax Administration, and digital services" },
  { slug: "iraq",               label: "Iraq",                 demonym: "Iraqi users",               portal: "MOF Iraq, GCT, and Iraqi government digital portals" },
  { slug: "israel",             label: "Israel",               demonym: "Israeli users",             portal: "gov.il, Israel Tax Authority, and Israeli digital services" },
  { slug: "jordan",             label: "Jordan",               demonym: "Jordanian users",           portal: "my.gov.jo, JAX, and Jordanian government portals" },
  { slug: "lebanon",            label: "Lebanon",              demonym: "Lebanese users",            portal: "Lebanon government portals and digital public services" },
  { slug: "oman",               label: "Oman",                 demonym: "Omani users",               portal: "Invest Easy, Oman e-government, and national portals" },
  { slug: "bahrain",            label: "Bahrain",              demonym: "Bahraini users",            portal: "bahrain.bh, NBR, and Bahraini government portals" },
  { slug: "yemen",              label: "Yemen",                demonym: "Yemeni users",              portal: "MOF Yemen and Yemeni government administrative services" },
  { slug: "syria",              label: "Syria",                demonym: "Syrian users",              portal: "Syrian government portals and administrative services" },

  // ── Africa (new) ──────────────────────────────────────────────────────────
  { slug: "tanzania",           label: "Tanzania",             demonym: "Tanzanian users",           portal: "TRA, e-Government Agency, and Tanzanian portals" },
  { slug: "uganda",             label: "Uganda",               demonym: "Ugandan users",             portal: "URA, URSB, and Ugandan government portals" },
  { slug: "cameroon",           label: "Cameroon",             demonym: "Cameroonian users",         portal: "DGI Cameroon, MINFI, and government e-services" },
  { slug: "ivory-coast",        label: "Ivory Coast",          demonym: "Ivorian users",             portal: "e-government.ci, DGI, and Ivory Coast portals" },
  { slug: "algeria",            label: "Algeria",              demonym: "Algerian users",            portal: "dgimpots.gov.dz, CNRPAH, and Algerian government portals" },
  { slug: "tunisia",            label: "Tunisia",              demonym: "Tunisian users",            portal: "impots.finances.gov.tn, CNSS, and Tunisian portals" },
  { slug: "sudan",              label: "Sudan",                demonym: "Sudanese users",            portal: "MOF Sudan and Sudanese government administrative portals" },
  { slug: "zimbabwe",           label: "Zimbabwe",             demonym: "Zimbabwean users",          portal: "ZIMRA, Government portals in Zimbabwe" },
  { slug: "angola",             label: "Angola",               demonym: "Angolan users",             portal: "AGT, Portal do Governo de Angola, and e-services" },
  { slug: "zambia",             label: "Zambia",               demonym: "Zambian users",             portal: "ZRA, Zambia government portals and digital services" },
  { slug: "mozambique",         label: "Mozambique",           demonym: "Mozambican users",          portal: "AT Mozambique, Portal do Governo, and e-services" },
  { slug: "senegal",            label: "Senegal",              demonym: "Senegalese users",          portal: "e-impots.finances.gouv.sn, IPRES, and Senegalese portals" },
  { slug: "rwanda",             label: "Rwanda",               demonym: "Rwandan users",             portal: "RRA, Irembo, and Rwandan e-government portals" },
  { slug: "drc",                label: "DR Congo",             demonym: "Congolese users",           portal: "DGI Congo, DGRAD, and DRC government portals" },
  { slug: "botswana",           label: "Botswana",             demonym: "Botswanan users",           portal: "BURS, gov.bw, and Botswana government portals" },
  { slug: "namibia",            label: "Namibia",              demonym: "Namibian users",            portal: "NamRA, gov.na, and Namibian government portals" },
  { slug: "mali",               label: "Mali",                 demonym: "Malian users",              portal: "DGI Mali, DGDP, and Mali government portals" },
  { slug: "niger",              label: "Niger",                demonym: "Nigerien users",            portal: "DGI Niger, and Niger government administrative portals" },
  { slug: "somalia",            label: "Somalia",              demonym: "Somali users",              portal: "Somali government portals and federal administrative services" },
  { slug: "sierra-leone",       label: "Sierra Leone",         demonym: "Sierra Leoneans",           portal: "NRA, and Sierra Leone government portals" },
  { slug: "liberia",            label: "Liberia",              demonym: "Liberian users",            portal: "LRA, and Liberian government digital services" },
  { slug: "togo",               label: "Togo",                 demonym: "Togolese users",            portal: "DGI Togo, OTR, and government portals" },
  { slug: "benin",              label: "Benin",                demonym: "Beninese users",            portal: "DGI Benin, DGDDI, and Benin government portals" },
  { slug: "burkina-faso",       label: "Burkina Faso",         demonym: "Burkinabe users",           portal: "DGI Burkina Faso, CNSS, and government portals" },
  { slug: "chad",               label: "Chad",                 demonym: "Chadian users",             portal: "DGI Chad, and Chad government administrative portals" },
  { slug: "gabon",              label: "Gabon",                demonym: "Gabonese users",            portal: "DGI Gabon, CNSS, and Gabon government portals" },
  { slug: "congo",              label: "Republic of Congo",    demonym: "Congolese users",           portal: "DGI Congo-Brazzaville and government e-services" },
  { slug: "mauritius",          label: "Mauritius",            demonym: "Mauritian users",           portal: "MRA, mauritius.gov.mu, and government portals" },
  { slug: "malawi",             label: "Malawi",               demonym: "Malawian users",            portal: "MRA, and Malawi government digital portals" },
  { slug: "gambia",             label: "Gambia",               demonym: "Gambian users",             portal: "GRA, and Gambia government portals" },
  { slug: "south-sudan",        label: "South Sudan",          demonym: "South Sudanese users",      portal: "MOF South Sudan and government administrative portals" },
  { slug: "eritrea",            label: "Eritrea",              demonym: "Eritrean users",            portal: "Eritrea government portals and administrative services" },
  { slug: "lesotho",            label: "Lesotho",              demonym: "Basotho users",             portal: "LRA, and Lesotho government portals" },
  { slug: "eswatini",           label: "Eswatini",             demonym: "Swazi users",               portal: "SRA, and Eswatini government digital portals" },
  { slug: "djibouti",           label: "Djibouti",             demonym: "Djiboutian users",          portal: "Djibouti government portals and administrative services" },
  { slug: "cape-verde",         label: "Cape Verde",           demonym: "Cape Verdean users",        portal: "DNRE, PortalSNIAS, and Cape Verde government portals" },
  { slug: "guinea",             label: "Guinea",               demonym: "Guinean users",             portal: "DGI Guinea, and Guinea government administrative portals" },
  { slug: "central-african-republic", label: "Central African Republic", demonym: "CAR users", portal: "CAR government portals and administrative services" },

  // ── Americas (new) ────────────────────────────────────────────────────────
  { slug: "venezuela",          label: "Venezuela",            demonym: "Venezuelan users",          portal: "SENIAT, Patria.org.ve, and Venezuelan government portals" },
  { slug: "bolivia",            label: "Bolivia",              demonym: "Bolivian users",            portal: "SIN, gob.bo, and Bolivian government portals" },
  { slug: "ecuador",            label: "Ecuador",              demonym: "Ecuadorian users",          portal: "SRI, Ecuador government portals and e-services" },
  { slug: "uruguay",            label: "Uruguay",              demonym: "Uruguayan users",           portal: "DGI, tramites.gub.uy, and Uruguay government portals" },
  { slug: "paraguay",           label: "Paraguay",             demonym: "Paraguayan users",          portal: "SET, Paraguay government portals and digital services" },
  { slug: "guatemala",          label: "Guatemala",            demonym: "Guatemalan users",          portal: "SAT, Guatemala government portals and e-services" },
  { slug: "honduras",           label: "Honduras",             demonym: "Honduran users",            portal: "SAR, SAT, and Honduras government portals" },
  { slug: "el-salvador",        label: "El Salvador",          demonym: "Salvadoran users",          portal: "DGII, Mi Portal, and El Salvador government portals" },
  { slug: "nicaragua",          label: "Nicaragua",            demonym: "Nicaraguan users",          portal: "DGI, Nicaragua government portals and e-services" },
  { slug: "costa-rica",         label: "Costa Rica",           demonym: "Costa Rican users",         portal: "Hacienda, Sede Electronica, and Costa Rica portals" },
  { slug: "panama",             label: "Panama",               demonym: "Panamanian users",          portal: "DGI Panama, and Panama government digital portals" },
  { slug: "cuba",               label: "Cuba",                 demonym: "Cuban users",               portal: "ONAT, and Cuban government administrative portals" },
  { slug: "dominican-republic", label: "Dominican Republic",   demonym: "Dominican users",           portal: "DGII, SISDOM, and Dominican Republic government portals" },
  { slug: "haiti",              label: "Haiti",                demonym: "Haitian users",             portal: "Haiti government portals and administrative services" },
  { slug: "jamaica",            label: "Jamaica",              demonym: "Jamaican users",            portal: "TAJ, JamaicaBizPro, and Jamaica government portals" },
  { slug: "trinidad-tobago",    label: "Trinidad and Tobago",  demonym: "Trinidadian users",         portal: "TTBIR, TTConnect, and T&T government portals" },
  { slug: "barbados",           label: "Barbados",             demonym: "Barbadian users",           portal: "BRA, and Barbados government digital portals" },
  { slug: "guyana",             label: "Guyana",               demonym: "Guyanese users",            portal: "GRA, and Guyana government portals" },
  { slug: "suriname",           label: "Suriname",             demonym: "Surinamese users",          portal: "Suriname government portals and administrative services" },
  { slug: "belize",             label: "Belize",               demonym: "Belizean users",            portal: "BTB, BIR, and Belize government portals" },
  { slug: "bahamas",            label: "Bahamas",              demonym: "Bahamian users",            portal: "Department of Inland Revenue, and Bahamas government portals" },

  // ── Pacific (new) ─────────────────────────────────────────────────────────
  { slug: "new-zealand",        label: "New Zealand",          demonym: "New Zealanders",            portal: "IRD, business.govt.nz, and New Zealand government portals" },
  { slug: "fiji",               label: "Fiji",                 demonym: "Fijian users",              portal: "FRCA, Government of Fiji, and e-services" },
  { slug: "papua-new-guinea",   label: "Papua New Guinea",     demonym: "Papua New Guinean users",   portal: "IRC, BPNG, and PNG government portals" },
  { slug: "samoa",              label: "Samoa",                demonym: "Samoan users",              portal: "MSAF, and Samoa government portals" },
  { slug: "vanuatu",            label: "Vanuatu",              demonym: "Vanuatuan users",           portal: "Vanuatu Financial Services Commission and government portals" },
  { slug: "tonga",              label: "Tonga",                demonym: "Tongan users",              portal: "IRCOT, and Tonga government portals" },
  { slug: "solomon-islands",    label: "Solomon Islands",      demonym: "Solomon Islander users",    portal: "IRD, and Solomon Islands government portals" },
];

interface CRich { currency: string; cities: string; compliance: string; docs: string; useCase: string; mobile: string; }
function v(currency: string, cities: string, compliance: string, docs: string, useCase: string, mobile: string): CRich { return { currency, cities, compliance, docs, useCase, mobile }; }

const COUNTRY_RICH: Record<string, CRich> = {
  "uk":                    v("GBP", "London, Manchester, and Birmingham", "UK GDPR / Data Protection Act 2018", "P60 forms, SA100 self-assessment tax returns, and Companies House annual accounts", "filing a self-assessment return with HMRC", "via email, WhatsApp, and banking apps"),
  "australia":             v("AUD", "Sydney, Melbourne, and Brisbane", "Australian Privacy Act 1988 (APPs)", "PAYG summary forms, TFN declaration forms, and ABN registration documents", "lodging a tax return through myGov ATO", "via banking apps and mobile"),
  "canada":                v("CAD", "Toronto, Vancouver, and Montreal", "PIPEDA / Canadian Privacy Act", "T4 slips, RRSP contribution receipts, and provincial benefit documents", "filing taxes through CRA My Account", "via email and banking apps"),
  "usa":                   v("USD", "New York, Los Angeles, and Chicago", "CCPA / US Federal Privacy standards", "W-2 forms, 1040 tax returns, and Social Security benefit letters", "filing a federal tax return with the IRS", "via email and banking portals"),
  "india":                 v("INR", "Mumbai, Delhi, and Bengaluru", "Digital Personal Data Protection Act 2023 (DPDPA)", "Form 16, Aadhaar-linked documents, and PAN card applications", "uploading documents to DigiLocker or ITR e-filing", "via WhatsApp and smartphone"),
  "germany":               v("EUR", "Berlin, Munich, and Hamburg", "GDPR / DSGVO", "Steuererklärung, Personalausweis scans, and Gewerbeanmeldung forms", "submitting an Elster tax declaration online", "via email and secure portal"),
  "france":                v("EUR", "Paris, Lyon, and Marseille", "RGPD (GDPR)", "déclarations de revenus, formulaires CERFA, and Carte Vitale documents", "submitting your tax return on impots.gouv.fr", "via email and mobile"),
  "spain":                 v("EUR", "Madrid, Barcelona, and Valencia", "GDPR (LOPDGDD)", "Modelo 303, DNI copies, and IRPF declarations", "filing your annual IRPF return on AEAT", "via mobile and email"),
  "italy":                 v("EUR", "Rome, Milan, and Naples", "GDPR (Codice Privacy)", "Modello 730, Codice Fiscale documents, and INPS contributions", "submitting your 730 form on Agenzia delle Entrate", "via SPID and email"),
  "japan":                 v("JPY", "Tokyo, Osaka, and Fukuoka", "APPI (個人情報保護法)", "確定申告 tax forms, マイナンバー notifications, and 住民票 certificates", "filing a 確定申告 on e-Tax", "via email and line messaging"),
  "brazil":                v("BRL", "São Paulo, Rio de Janeiro, and Brasília", "LGPD", "IRPF declarations, CPF registration forms, and CNPJ company documents", "filing your IRPF return on Receita Federal", "via mobile apps and WhatsApp"),
  "mexico":                v("MXN", "Mexico City, Guadalajara, and Monterrey", "Ley Federal de Protección de Datos", "SAT annual returns, CURP documents, and RFC registration forms", "submitting your annual SAT return online", "via WhatsApp and email"),
  "pakistan":              v("PKR", "Karachi, Lahore, and Islamabad", "Pakistan data protection law", "income tax returns, CNIC copies, and NTN registration documents", "filing your return on FBR IRIS portal", "via WhatsApp and mobile"),
  "uae":                   v("AED", "Dubai, Abu Dhabi, and Sharjah", "UAE Federal Data Protection Law", "Emirates ID applications, VAT returns, and trade license renewals", "submitting documents through UAE PASS or eDNRD", "via mobile apps"),
  "nigeria":               v("NGN", "Lagos, Abuja, and Port Harcourt", "Nigeria Data Protection Regulation (NDPR)", "TIN certificates, CAC Form CAC-IT/1, and FIRS withholding tax certificates", "registering a business or filing taxes on the FIRS portal", "via WhatsApp and mobile data"),
  "indonesia":             v("IDR", "Jakarta, Surabaya, and Bandung", "Indonesia PDPA (UU No. 27/2022)", "SPT tahunan annual returns, e-KTP identity documents, and NPWP tax numbers", "filing your SPT on DJP Online", "via WhatsApp and mobile apps"),
  "turkey":                v("TRY", "Istanbul, Ankara, and Izmir", "KVKK (data protection law)", "e-Beyanname forms, TC Kimlik copies, and vergi levhası certificates", "submitting an e-Beyanname on e-Devlet", "via mobile and WhatsApp"),
  "saudi-arabia":          v("SAR", "Riyadh, Jeddah, and Dammam", "Saudi Personal Data Protection Law", "هوية وطنية copies, Zakat returns, and commercial registration documents", "submitting documents through Absher or Zakat portal", "via mobile apps"),
  "south-africa":          v("ZAR", "Johannesburg, Cape Town, and Durban", "POPIA", "SARS income tax returns, South African ID documents, and CIPC company forms", "filing your SARS return via eFiling", "via email and mobile banking apps"),
  "china":                 v("CNY", "Beijing, Shanghai, and Shenzhen", "PIPL (个人信息保护法)", "税务申报表 tax forms, 身份证 copies, and 营业执照 business licenses", "submitting documents on GSXT or tax bureaus", "via WeChat and mobile apps"),
  "philippines":           v("PHP", "Manila, Cebu, and Davao", "Philippines Data Privacy Act (RA 10173)", "BIR Form 1701 tax returns, PHILSYS national ID, and TIN applications", "filing your BIR return on eFPS", "via GCash and mobile data"),
  "bangladesh":            v("BDT", "Dhaka, Chittagong, and Sylhet", "Bangladesh Personal Data Protection Act (draft)", "আয়কর রিটার্ন income tax forms, NID copies, and TIN certificates", "submitting your income tax return on NBR eTax", "via bKash and mobile data"),
  "sri-lanka":             v("LKR", "Colombo, Kandy, and Galle", "Sri Lanka data protection law", "income tax returns, NIC copies, and company registration documents", "filing documents with IRD Sri Lanka", "via mobile data and email"),
  "nepal":                 v("NPR", "Kathmandu, Pokhara, and Lalitpur", "Nepal privacy regulations", "tax return forms, नागरिकता citizenship documents, and PAN registration", "submitting your कर विवरण on IRD Nepal", "via mobile data and email"),
  "malaysia":              v("MYR", "Kuala Lumpur, Penang, and Johor Bahru", "Malaysia PDPA 2010", "LHDN e-Filing forms, MyKad identity copies, and EP Form/CP58 certificates", "filing your income tax return on LHDN MyTax portal", "via banking apps and email"),
  "singapore":             v("SGD", "Singapore, Jurong, and Woodlands", "Singapore PDPA 2012", "IR8A employment income forms, NRIC copies, and CorpPass-authenticated documents", "submitting your tax return on IRAS myTax Portal via SingPass", "via SingPass and email"),
  "thailand":              v("THB", "Bangkok, Chiang Mai, and Phuket", "Thailand PDPA", "ภ.ง.ด. tax forms, บัตรประชาชน national ID copies, and business registration", "filing your tax return on the RD Thailand portal", "via LINE messaging and mobile"),
  "vietnam":               v("VND", "Ho Chi Minh City, Hanoi, and Da Nang", "Vietnam Cybersecurity Law", "tờ khai thuế tax forms, căn cước công dân ID copies, and business licenses", "submitting your tax declaration on eTax VN", "via Zalo and mobile data"),
  "egypt":                 v("EGP", "Cairo, Alexandria, and Giza", "Egypt Data Protection Law No. 151/2020", "بطاقة رقم قومي national ID copies, ضريبة الدخل income tax forms, and commercial registration", "submitting documents to ETA or Nafeza portal", "via WhatsApp and mobile"),
  "morocco":               v("MAD", "Casablanca, Rabat, and Marrakech", "Morocco data protection law", "CIN copies, déclarations fiscales, and CNSS registration documents", "filing your tax return on the DGI portal", "via WhatsApp and mobile"),
  "kenya":                 v("KES", "Nairobi, Mombasa, and Kisumu", "Kenya Data Protection Act 2019", "KRA PIN certificates, Huduma Namba national ID, and business registration documents", "filing returns or applying for certificates on iTax or eCitizen", "via M-Pesa and mobile data"),
  "ghana":                 v("GHS", "Accra, Kumasi, and Tamale", "Ghana Data Protection Act", "Ghana Card copies, TIN certificates, and GRA tax returns", "submitting your tax return or registering on Ghana.gov.gh", "via mobile money and data"),
  "ethiopia":              v("ETB", "Addis Ababa, Dire Dawa, and Gondar", "Ethiopia data protection law", "TIN certificates, national ID copies, and ERCA tax forms", "filing documents with ERCA or MoR portal", "via mobile data and Telebirr"),
  "argentina":             v("ARS", "Buenos Aires, Córdoba, and Rosario", "Argentina data protection law (PDPA)", "AFIP income tax returns, CUIL/CUIT identity documents, and ANSES forms", "submitting your AFIP Ganancias return online", "via WhatsApp and email"),
  "colombia":              v("COP", "Bogotá, Medellín, and Cali", "Colombia Habeas Data law", "declaración de renta DIAN forms, cédula de ciudadanía copies, and NIT documents", "filing your declaración de renta on DIAN portal", "via WhatsApp and email"),
  "chile":                 v("CLP", "Santiago, Valparaíso, and Concepción", "Chile data protection law", "declaración de renta SII forms, RUT documents, and liquidaciones", "submitting your annual declaración de renta on SII", "via email and mobile"),
  "peru":                  v("PEN", "Lima, Arequipa, and Trujillo", "Peru data protection law", "declaración jurada SUNAT forms, DNI copies, and RUC documents", "filing your renta on SUNAT Operaciones en Línea", "via WhatsApp and email"),
  "poland":                v("PLN", "Warsaw, Kraków, and Wrocław", "GDPR (RODO)", "PIT-37 tax returns, PESEL identity documents, and KRS company filings", "filing your PIT return on e-Urząd Skarbowy", "via email and secure portal"),
  "netherlands":           v("EUR", "Amsterdam, Rotterdam, and The Hague", "GDPR (AVG)", "belastingaangifte tax returns, DigiD authentication forms, and inschrijvingsbewijs", "submitting your jaarlijkse aangifte on Mijn Belastingdienst", "via email and iDEAL"),
  "romania":               v("RON", "Bucharest, Cluj-Napoca, and Timișoara", "GDPR (Legea 190)", "declarație de impozit forms, CNP identity documents, and ANAF submissions", "filing your income tax declaration on ANAF", "via email and mobile"),
  "ukraine":               v("UAH", "Kyiv, Kharkiv, and Lviv", "Ukraine data protection law", "декларація tax forms, ІПН tax codes, and Diia identity documents", "submitting documents on the Дія portal", "via Viber and mobile apps"),
  "greece":                v("EUR", "Athens, Thessaloniki, and Patras", "GDPR (Ν. 4624/2019)", "φορολογική δήλωση forms, ΑΜΚΑ social security numbers, and TAXIS submissions", "filing your φορολογική δήλωση on AADE myTAXISnet", "via email and mobile"),
  "portugal":              v("EUR", "Lisbon, Porto, and Coimbra", "RGPD (GDPR)", "declarações de IRS, NIF tax numbers, and Cartão de Cidadão documents", "submitting your IRS declaration on Portal das Finanças", "via email and MB WAY"),
  "qatar":                 v("QAR", "Doha, Al Wakrah, and Al Khor", "Qatar data protection law", "QID copies, trade license documents, and tax registration forms", "submitting documents through Hukoomi or Metrash2", "via mobile apps"),
  "kuwait":                v("KWD", "Kuwait City, Hawalli, and Salmiya", "Kuwait data protection law", "Civil ID copies, commercial registration documents, and PACI forms", "submitting documents through MOI eServices or PACI portal", "via mobile apps"),
  "russia":                v("RUB", "Moscow, St. Petersburg, and Novosibirsk", "FZ-152 (Russian data law)", "3-НДФЛ tax returns, СНИЛС pension numbers, and ИНН tax certificates", "submitting your 3-НДФЛ on Госуслуги", "via mobile apps and email"),
  "sweden":                v("SEK", "Stockholm, Gothenburg, and Malmö", "GDPR (dataskyddsförordningen)", "inkomstdeklaration forms, personnummer documents, and Skatteverket submissions", "filing your inkomstdeklaration on Skatteverket", "via email and BankID"),
  "norway":                v("NOK", "Oslo, Bergen, and Trondheim", "GDPR (personopplysningsloven)", "skattemelding forms, personnummer documents, and Altinn submissions", "filing your skattemelding on Altinn", "via email and BankID"),
  "denmark":               v("DKK", "Copenhagen, Aarhus, and Odense", "GDPR (databeskyttelsesloven)", "årsopgørelse tax forms, CPR number documents, and SKAT submissions", "reviewing your årsopgørelse on borger.dk", "via email and NemID"),
  "finland":               v("EUR", "Helsinki, Tampere, and Espoo", "GDPR (tietosuojalaki)", "veroilmoitus forms, henkilötunnus identity documents, and Suomi.fi submissions", "filing your veroilmoitus on Vero.fi", "via email and mobile bank"),
  "belgium":               v("EUR", "Brussels, Antwerp, and Ghent", "GDPR (AVG/RGPD)", "Tax-on-Web declarations, eBox notifications, and rijksregisternummer forms", "filing your tax declaration on MyGov.be Tax-on-Web", "via email and itsme"),
  "switzerland":           v("CHF", "Zurich, Geneva, and Basel", "Swiss FADP (DSG)", "Steuererklärung forms, AHV-Nummer documents, and ESTV submissions", "filing your Steuererklärung with cantonal tax authorities", "via email and mobile"),
  "austria":               v("EUR", "Vienna, Graz, and Linz", "GDPR (DSG 2018)", "Steuererklärung forms, Meldezettel residence documents, and FinanzOnline filings", "submitting your Steuererklärung on Finanz Online", "via email and A-Trust"),
  "czech-republic":        v("CZK", "Prague, Brno, and Ostrava", "GDPR (zákon č. 110/2019)", "daňové přiznání tax returns, rodné číslo identity documents, and datová schránka submissions", "filing your daňové přiznání on Finanční správa portal", "via email and mobile"),
  "hungary":               v("HUF", "Budapest, Debrecen, and Pécs", "GDPR (Infotv.)", "szja bevallás tax returns, TAJ szám social security cards, and NAV submissions", "filing your szja on NAV eSZJA portal", "via email and mobile"),
  "slovakia":              v("EUR", "Bratislava, Košice, and Prešov", "GDPR (zákon č. 18/2018)", "daňové priznanie forms, rodné číslo identity documents, and eDane submissions", "filing your daňové priznanie on Finančná správa", "via email and mobile"),
  "serbia":                v("RSD", "Belgrade, Novi Sad, and Niš", "Serbia data protection law", "poreska prijava tax forms, JMBG identity documents, and eUprava submissions", "filing your poreska prijava on eUprava portal", "via email and mobile"),
  "croatia":               v("EUR", "Zagreb, Split, and Rijeka", "GDPR (ZZOP)", "dohodak tax forms, OIB identity numbers, and ePorezna submissions", "submitting your dohodak declaration on ePorezna", "via email and m-token"),
  "bulgaria":              v("BGN", "Sofia, Plovdiv, and Varna", "GDPR (ZZLD)", "данъчна декларация forms, ЕГН identity numbers, and NRA submissions", "filing your данъчна декларация on e-government.bg", "via email and mobile"),
  "ireland":               v("EUR", "Dublin, Cork, and Limerick", "GDPR (Irish Data Protection Act)", "Form 11 income tax returns, PPS number documents, and Revenue submissions", "filing your Form 11 on Revenue Online Service (ROS)", "via email and mobile"),
  "belarus":               v("BYR", "Minsk, Gomel, and Grodno", "Belarus data protection law", "налоговая декларация tax returns, УНП registration numbers, and МНС submissions", "filing documents on portal.gov.by or МНС portal", "via email and mobile"),
  "estonia":               v("EUR", "Tallinn, Tartu, and Narva", "GDPR (IKS)", "tuludeklaratsioon forms, isikukood identity documents, and X-Road submissions", "filing your tuludeklaratsioon on eesti.ee", "via email and ID-card"),
  "latvia":                v("EUR", "Riga, Daugavpils, and Liepāja", "GDPR (Fizisko personu datu apstrādes likums)", "ienākumu deklarācija forms, personas kods documents, and EDS submissions", "filing your deklarācija on latvija.lv EDS", "via email and smart-ID"),
  "lithuania":             v("EUR", "Vilnius, Kaunas, and Klaipėda", "GDPR (ADTAĮ)", "pajamų deklaracija forms, asmens kodas documents, and i.MAS submissions", "filing your deklaracija on vmi.lt", "via email and mobile"),
  "moldova":               v("MDL", "Chișinău, Bălți, and Cahul", "Moldova data protection law", "declaratia fiscala forms, IDNO documents, and SFS submissions", "submitting your declaratia fiscala on servicii.gov.md", "via email and mobile"),
  "albania":               v("ALL", "Tirana, Durrës, and Shkodër", "Albania data protection law", "deklaratë tatimore forms, NIPT business numbers, and e-albania submissions", "filing your deklaratë tatimore on e-albania.al", "via email and mobile"),
  "north-macedonia":       v("MKD", "Skopje, Bitola, and Kumanovo", "North Macedonia data protection law", "даночна пријава tax forms, ЕМБГ identity numbers, and UJP submissions", "filing your даночна пријава on uslugi.gov.mk", "via email and mobile"),
  "bosnia":                v("BAM", "Sarajevo, Banja Luka, and Mostar", "Bosnia data protection law", "poreska prijava forms, JMB identity documents, and eUprava submissions", "submitting your tax filing on eUprava portal", "via email and mobile"),
  "montenegro":            v("EUR", "Podgorica, Nikšić, and Bar", "Montenegro data protection law", "poreska prijava forms, JMBG identity documents, and eUprava Montenegro submissions", "filing documents on eUprava Montenegro portal", "via email and mobile"),
  "slovenia":              v("EUR", "Ljubljana, Maribor, and Celje", "GDPR (ZVOP-2)", "dohodninska napoved forms, EMŠO identity numbers, and eDavki submissions", "submitting your dohodninsko napoved on eDavki", "via email and mToken"),
  "luxembourg":            v("EUR", "Luxembourg City, Esch-sur-Alzette, and Differdange", "GDPR (loi du 1er août 2018)", "déclaration fiscale forms, numéro de matricule documents, and AED submissions", "filing your déclaration on guichet.lu", "via email and LuxTrust"),
  "malta":                 v("EUR", "Valletta, Sliema, and St. Julian's", "GDPR (Data Protection Act)", "income tax return forms, ID card copies, and CFR submissions", "filing your income tax return on servizz.gov.mt", "via email and mobile"),
  "cyprus":                v("EUR", "Nicosia, Limassol, and Larnaca", "GDPR (Law 125(I)/2018)", "φορολογική δήλωση forms, ΑΦΜ tax numbers, and TAXISnet submissions", "filing your tax declaration on TAXISnet Cyprus", "via email and mobile"),
  "iceland":               v("ISK", "Reykjavik, Akureyri, and Hafnarfjörður", "Iceland data protection law (lög nr. 90/2018)", "skattframtal forms, kennitala identity numbers, and Skatturinn submissions", "filing your skattframtal on skatturinn.is", "via email and Ísland.is"),
  "andorra":               v("EUR", "Andorra la Vella, Escaldes-Engordany, and Encamp", "Andorra data protection law (LQPD)", "declaració de renda forms, NRT numbers, and govern.ad submissions", "filing your declaració de renda on govern.ad", "via email and mobile"),
  "south-korea":           v("KRW", "Seoul, Busan, and Incheon", "PIPA (개인정보보호법)", "세금신고서 tax forms, 주민등록번호 identity documents, and Hometax submissions", "filing your 종합소득세 on Hometax", "via KakaoTalk and mobile apps"),
  "taiwan":                v("TWD", "Taipei, Kaohsiung, and Taichung", "Taiwan Personal Data Protection Act", "綜合所得稅 tax forms, 身分證 copies, and 統一編號 business numbers", "filing your 綜合所得稅 on eTax Taiwan", "via Line and mobile apps"),
  "hong-kong":             v("HKD", "Central, Kowloon, and New Territories", "PDPO (Personal Data Privacy Ordinance)", "IR56B employer returns, HKID copies, and salaries tax forms", "filing salaries tax on GovHK eTAX", "via mobile apps and email"),
  "myanmar":               v("MMK", "Yangon, Mandalay, and Naypyidaw", "Myanmar data protection law", "income tax returns, NRC copies, and IRD submission forms", "filing documents with IRD Myanmar", "via mobile data and Viber"),
  "cambodia":              v("KHR", "Phnom Penh, Siem Reap, and Battambang", "Cambodia data protection law", "tax declaration forms, national ID copies, and GDT submissions", "filing your tax declaration with GDT", "via mobile data and Wing"),
  "laos":                  v("LAK", "Vientiane, Luang Prabang, and Pakse", "Laos data protection law", "tax declaration forms, national ID copies, and DTD submissions", "submitting documents on Laos-gov.la", "via mobile data and email"),
  "mongolia":              v("MNT", "Ulaanbaatar, Erdenet, and Darkhan", "Mongolia data protection law", "tax declaration forms, registration number documents, and e-Mongolia submissions", "filing your tax declaration on e-Mongolia portal", "via mobile apps and email"),
  "afghanistan":           v("AFN", "Kabul, Kandahar, and Herat", "Afghanistan data protection law", "tax declaration forms, national ID copies, and AISA registration documents", "filing business or tax documents with AISA", "via mobile data and email"),
  "kazakhstan":            v("KZT", "Almaty, Nur-Sultan, and Shymkent", "Kazakhstan data protection law", "декларация tax forms, ИИН identity numbers, and egov.kz submissions", "filing your декларация on egov.kz portal", "via mobile apps and email"),
  "uzbekistan":            v("UZS", "Tashkent, Samarkand, and Namangan", "Uzbekistan data protection law", "солиқ декларацияси tax forms, ПИНФЛ identity codes, and my.gov.uz submissions", "filing your tax declaration on my.gov.uz", "via Telegram and mobile"),
  "kyrgyzstan":            v("KGS", "Bishkek, Osh, and Jalal-Abad", "Kyrgyzstan data protection law", "tax declaration forms, INN identity numbers, and salyk.kg submissions", "filing documents on salyk.kg or tunduk.kg", "via mobile data and email"),
  "tajikistan":            v("TJS", "Dushanbe, Khujand, and Kulob", "Tajikistan data protection law", "tax declaration forms, national ID copies, and andoz.tj submissions", "filing documents on andoz.tj portal", "via mobile data and email"),
  "turkmenistan":          v("TMT", "Ashgabat, Türkmenabat, and Daşoguz", "Turkmenistan data protection law", "tax declaration forms, national ID copies, and government submission forms", "submitting documents to Turkmenistan government portals", "via mobile data and email"),
  "maldives":              v("MVR", "Malé, Addu City, and Fuvahmulah", "Maldives data protection law", "tax declaration forms, national ID copies, and MIRA submissions", "filing documents with MIRA Maldives", "via mobile data and email"),
  "bhutan":                v("BTN", "Thimphu, Phuentsholing, and Punakha", "Bhutan data protection law", "tax declaration forms, CID identity copies, and RCSC submissions", "filing documents with Bhutan RCSC or MFET", "via mobile data and email"),
  "brunei":                v("BND", "Bandar Seri Begawan, Kuala Belait, and Seria", "Brunei data protection law", "income tax forms, IC number copies, and BruConnect submissions", "filing your income tax on e-Darussalam portal", "via mobile apps and email"),
  "east-timor":            v("USD", "Dili, Baucau, and Maliana", "East Timor data protection law", "tax declaration forms, national ID copies, and SERVE submissions", "filing documents with SERVE or MoF East Timor", "via mobile data and email"),
  "azerbaijan":            v("AZN", "Baku, Ganja, and Sumqayit", "Azerbaijan data protection law", "vergi bəyannaməsi tax forms, FİN identity numbers, and e-gov.az submissions", "filing your vergi bəyannaməsi on e-gov.az", "via mobile apps and email"),
  "armenia":               v("AMD", "Yerevan, Gyumri, and Vanadzor", "Armenia data protection law", "tax declaration forms, SSN documents, and e-gov.am submissions", "filing your tax declaration on e-gov.am", "via mobile apps and email"),
  "georgia":               v("GEL", "Tbilisi, Kutaisi, and Batumi", "Georgia data protection law", "deklaratsia forms, personal ID copies, and rs.ge submissions", "filing your deklaratsia on rs.ge portal", "via mobile apps and email"),
  "iran":                  v("IRR", "Tehran, Isfahan, and Shiraz", "Iran data protection law", "tax declaration forms, national ID copies, and Tax Administration submissions", "filing documents with Iran Tax Administration", "via Telegram and mobile"),
  "iraq":                  v("IQD", "Baghdad, Basra, and Erbil", "Iraq data protection law", "tax declaration forms, national ID copies, and FIA submission documents", "submitting documents to MOF Iraq or FIA portal", "via mobile data and email"),
  "israel":                v("ILS", "Tel Aviv, Jerusalem, and Haifa", "Israeli PDPA (Privacy Protection Law)", "annual tax return forms, ID number documents, and Tax Authority submissions", "filing your annual tax return with Israel Tax Authority", "via email and mobile"),
  "jordan":                v("JOD", "Amman, Zarqa, and Irbid", "Jordan data protection law", "income tax forms, national ID copies, and JAX submissions", "filing your income tax return on my.gov.jo or JAX", "via mobile apps and email"),
  "lebanon":               v("LBP", "Beirut, Tripoli, and Sidon", "Lebanon data protection law", "income tax forms, national ID copies, and MOF submissions", "filing your income tax with MOF Lebanon", "via WhatsApp and email"),
  "oman":                  v("OMR", "Muscat, Salalah, and Sohar", "Oman data protection law", "civil card copies, commercial registration forms, and Tax Authority submissions", "submitting documents on Invest Easy or Oman Tax Authority portal", "via mobile apps and email"),
  "bahrain":               v("BHD", "Manama, Riffa, and Muharraq", "Bahrain data protection law", "CPR copies, commercial registration documents, and NBR submissions", "submitting documents on bahrain.bh or NBR portal", "via mobile apps and email"),
  "yemen":                 v("YER", "Sanaa, Aden, and Taiz", "Yemen data protection law", "tax declaration forms, national ID copies, and MOF submission documents", "filing documents with MOF Yemen", "via mobile data and email"),
  "syria":                 v("SYP", "Damascus, Aleppo, and Homs", "Syria data protection law", "tax declaration forms, national ID copies, and administrative documents", "submitting documents to Syrian administrative portals", "via email and mobile"),
  "tanzania":              v("TZS", "Dar es Salaam, Dodoma, and Mwanza", "Tanzania Personal Data Protection Act", "TIN certificates, national ID copies, and TRA submission forms", "filing your tax return or registering on TRA Tanzania", "via M-Pesa and mobile data"),
  "uganda":                v("UGX", "Kampala, Gulu, and Mbarara", "Uganda Data Protection and Privacy Act", "TIN certificates, national ID copies, and URA submission forms", "filing returns or registering on URA Uganda portal", "via mobile money and data"),
  "cameroon":              v("XAF", "Yaoundé, Douala, and Garoua", "Cameroon data protection law", "déclaration fiscale forms, national ID copies, and DGI Cameroon submissions", "filing your déclaration fiscale on DGI Cameroon portal", "via mobile money and email"),
  "ivory-coast":           v("XOF", "Abidjan, Bouaké, and Yamoussoukro", "Ivory Coast data protection law", "déclaration fiscale forms, CNI copies, and DGI submissions", "filing your déclaration fiscale on e-government.ci or DGI", "via mobile money and email"),
  "algeria":               v("DZD", "Algiers, Oran, and Constantine", "Algeria data protection law", "إقرار ضريبي tax forms, بطاقة هوية وطنية ID copies, and DGI submissions", "filing your tax declaration on dgimpots.gov.dz", "via mobile data and email"),
  "tunisia":               v("TND", "Tunis, Sfax, and Sousse", "Tunisia data protection law", "tax declaration forms, بطاقة هوية ID copies, and DGI Tunisia submissions", "filing your tax declaration on impots.finances.gov.tn", "via mobile data and email"),
  "sudan":                 v("SDG", "Khartoum, Omdurman, and Port Sudan", "Sudan data protection law", "tax declaration forms, national ID copies, and STA submission documents", "filing documents with Sudan Tax Authority", "via mobile data and email"),
  "zimbabwe":              v("ZWL", "Harare, Bulawayo, and Mutare", "Zimbabwe data protection law", "TIN certificates, national ID copies, and ZIMRA submission forms", "filing returns or registering on ZIMRA Zimbabwe portal", "via mobile money EcoCash and email"),
  "angola":                v("AOA", "Luanda, Huambo, and Lobito", "Angola data protection law", "declaração fiscal forms, BI national ID copies, and AGT submissions", "filing your declaração fiscal on AGT portal", "via mobile data and email"),
  "zambia":                v("ZMW", "Lusaka, Kitwe, and Ndola", "Zambia Data Protection Act", "TIN certificates, national ID copies, and ZRA submission forms", "filing returns or registering on ZRA Zambia portal", "via mobile money and data"),
  "mozambique":            v("MZN", "Maputo, Beira, and Nampula", "Mozambique data protection law", "declaração fiscal forms, BI identity copies, and AT Mozambique submissions", "filing your declaração fiscal on Portal do Governo portal", "via mobile data and email"),
  "senegal":               v("XOF", "Dakar, Thiès, and Kaolack", "Senegal data protection law", "déclaration fiscale forms, CNI copies, and DGID submissions", "filing your déclaration fiscale on e-impots.finances.gouv.sn", "via mobile money and email"),
  "rwanda":                v("RWF", "Kigali, Butare, and Musanze", "Rwanda Data Protection Law", "TIN certificates, national ID copies, and RRA submission forms", "filing returns or registering on RRA or Irembo portal", "via MTN Mobile Money and data"),
  "drc":                   v("CDF", "Kinshasa, Lubumbashi, and Mbuji-Mayi", "DRC data protection law", "déclaration fiscale forms, carte d'identité copies, and DGRAD submissions", "submitting your fiscal documents on DGI Congo or DGRAD portal", "via mobile money and data"),
  "botswana":              v("BWP", "Gaborone, Francistown, and Molepolole", "Botswana Data Protection Act", "TIN certificates, national ID copies, and BURS submission forms", "filing returns or registering on BURS Botswana portal", "via Orange Money and email"),
  "namibia":               v("NAD", "Windhoek, Rundu, and Walvis Bay", "Namibia data protection law", "TIN certificates, national ID copies, and NamRA submission forms", "filing returns on NamRA Namibia portal", "via mobile data and email"),
  "mali":                  v("XOF", "Bamako, Sikasso, and Mopti", "Mali data protection law", "déclaration fiscale forms, CNI copies, and DGI Mali submissions", "filing your tax declaration with DGI Mali", "via Orange Money and email"),
  "niger":                 v("XOF", "Niamey, Zinder, and Maradi", "Niger data protection law", "déclaration fiscale forms, CNI copies, and DGI Niger submissions", "filing your tax declaration with DGI Niger", "via mobile data and email"),
  "somalia":               v("USD", "Mogadishu, Hargeisa, and Bosaso", "Somalia data protection law", "tax declaration forms, national ID copies, and MOF Somalia submissions", "submitting administrative documents to federal government portals", "via mobile data and Hormuud Telesom"),
  "sierra-leone":          v("SLL", "Freetown, Bo, and Kenema", "Sierra Leone data protection law", "TIN certificates, national ID copies, and NRA submission forms", "filing returns on NRA Sierra Leone portal", "via mobile money and data"),
  "liberia":               v("LRD", "Monrovia, Gbarnga, and Buchanan", "Liberia data protection law", "TIN certificates, national ID copies, and LRA submission forms", "filing returns on LRA Liberia portal", "via mobile data and email"),
  "togo":                  v("XOF", "Lomé, Sokodé, and Kara", "Togo data protection law", "déclaration fiscale forms, CNI copies, and OTR submissions", "filing your tax declaration with OTR Togo", "via mobile money and email"),
  "benin":                 v("XOF", "Cotonou, Porto-Novo, and Parakou", "Benin data protection law", "déclaration fiscale forms, CNI copies, and DGI Benin submissions", "filing your tax declaration with DGI Benin", "via MTN Mobile Money and email"),
  "burkina-faso":          v("XOF", "Ouagadougou, Bobo-Dioulasso, and Koudougou", "Burkina Faso data protection law", "déclaration fiscale forms, CNI copies, and DGI Burkina Faso submissions", "filing your tax declaration with DGI Burkina Faso", "via mobile money and email"),
  "chad":                  v("XAF", "N'Djamena, Moundou, and Sarh", "Chad data protection law", "déclaration fiscale forms, CNI copies, and DGI Chad submissions", "submitting your tax declaration with DGI Chad", "via mobile data and email"),
  "gabon":                 v("XAF", "Libreville, Port-Gentil, and Franceville", "Gabon data protection law", "déclaration fiscale forms, CNI copies, and DGI Gabon submissions", "filing your tax declaration with DGI Gabon", "via mobile data and email"),
  "congo":                 v("XAF", "Brazzaville, Pointe-Noire, and Dolisie", "Republic of Congo data protection law", "déclaration fiscale forms, CNI copies, and DGI Congo-Brazzaville submissions", "submitting your tax declaration on Congo government portals", "via mobile data and email"),
  "mauritius":             v("MUR", "Port Louis, Beau Bassin, and Rose Hill", "Mauritius Data Protection Act", "TAN certificates, national ID copies, and MRA submission forms", "filing your income tax return on MRA Mauritius portal", "via mobile banking and email"),
  "malawi":                v("MWK", "Lilongwe, Blantyre, and Mzuzu", "Malawi data protection law", "TIN certificates, national ID copies, and MRA Malawi submissions", "filing returns on MRA Malawi portal", "via mobile money and data"),
  "gambia":                v("GMD", "Banjul, Serekunda, and Brikama", "Gambia data protection law", "TIN certificates, national ID copies, and GRA submission forms", "filing returns or registering on GRA Gambia portal", "via mobile data and email"),
  "south-sudan":           v("SSP", "Juba, Wau, and Malakal", "South Sudan data protection law", "TIN certificates, national ID copies, and NRA submission forms", "filing documents with NRA South Sudan", "via mobile data and email"),
  "eritrea":               v("ERN", "Asmara, Keren, and Massawa", "Eritrea data protection law", "tax declaration forms, national ID copies, and ERCA submission documents", "filing documents with ERCA Eritrea", "via mobile data and email"),
  "lesotho":               v("LSL", "Maseru, Teyateyaneng, and Mafeteng", "Lesotho data protection law", "TIN certificates, national ID copies, and LRA submission forms", "filing returns on LRA Lesotho portal", "via mobile money and data"),
  "eswatini":              v("SZL", "Mbabane, Manzini, and Lobamba", "Eswatini data protection law", "TIN certificates, national ID copies, and SRA submission forms", "filing returns on SRA Eswatini portal", "via mobile money and data"),
  "djibouti":              v("DJF", "Djibouti City, Ali Sabieh, and Tadjourah", "Djibouti data protection law", "déclaration fiscale forms, CNI copies, and DGI Djibouti submissions", "filing your tax declaration with DGI Djibouti", "via mobile data and email"),
  "cape-verde":            v("CVE", "Praia, Mindelo, and Santa Maria", "Cape Verde data protection law", "declaração fiscal forms, BI identity copies, and DNRE submissions", "filing your declaração fiscal on portondinosilha portal", "via mobile data and email"),
  "guinea":                v("GNF", "Conakry, Nzérékoré, and Kankan", "Guinea data protection law", "déclaration fiscale forms, CNI copies, and DGI Guinea submissions", "filing your tax declaration with DGI Guinea", "via mobile money and email"),
  "central-african-republic": v("XAF", "Bangui, Bimbo, and Berbérati", "CAR data protection law", "déclaration fiscale forms, CNI copies, and DGID submissions", "submitting your tax declaration with DGID CAR", "via mobile data and email"),
  "venezuela":             v("VEF", "Caracas, Maracaibo, and Valencia", "Venezuela data protection law", "declaración definitiva forms, cédula de identidad copies, and RIF documents", "filing your declaración de renta on SENIAT portal", "via WhatsApp and mobile"),
  "bolivia":               v("BOB", "La Paz, Santa Cruz, and Cochabamba", "Bolivia data protection law", "declaración jurada forms, CI identity copies, and NIT documents", "submitting your declaración jurada on SIN Bolivia portal", "via WhatsApp and email"),
  "ecuador":               v("USD", "Quito, Guayaquil, and Cuenca", "Ecuador data protection law", "declaración de impuesto forms, cédula de identidad copies, and RUC documents", "filing your tax declaration on SRI Ecuador portal", "via WhatsApp and email"),
  "uruguay":               v("UYU", "Montevideo, Salto, and Paysandú", "Uruguay data protection law", "declaración jurada forms, cédula de identidad copies, and RUT documents", "filing your declaración jurada on DGI Uruguay portal", "via email and mobile"),
  "paraguay":              v("PYG", "Asunción, Ciudad del Este, and San Lorenzo", "Paraguay data protection law", "declaración jurada forms, cédula de identidad copies, and RUC documents", "filing your declaración jurada on SET Paraguay portal", "via WhatsApp and email"),
  "guatemala":             v("GTQ", "Guatemala City, Mixco, and Villa Nueva", "Guatemala data protection law", "declaración jurada forms, DPI identity copies, and NIT documents", "filing your declaración jurada on SAT Guatemala portal", "via WhatsApp and email"),
  "honduras":              v("HNL", "Tegucigalpa, San Pedro Sula, and Choloma", "Honduras data protection law", "declaración de impuestos forms, DNI copies, and RTN documents", "filing your tax declaration on SAR Honduras portal", "via WhatsApp and email"),
  "el-salvador":           v("USD", "San Salvador, Soyapango, and Santa Ana", "El Salvador data protection law", "declaración de impuestos forms, DUI copies, and NIT documents", "filing your tax declaration on DGII El Salvador portal", "via WhatsApp and email"),
  "nicaragua":             v("NIO", "Managua, León, and Masaya", "Nicaragua data protection law", "declaración de impuestos forms, cédula identity copies, and RUC documents", "filing your tax declaration on DGI Nicaragua portal", "via WhatsApp and email"),
  "costa-rica":            v("CRC", "San José, Alajuela, and Desamparados", "Costa Rica data protection law", "declaración de impuestos forms, cédula identity copies, and NIF documents", "filing your tax declaration on Hacienda Costa Rica portal", "via WhatsApp and email"),
  "panama":                v("USD", "Panama City, San Miguelito, and Tocumen", "Panama data protection law", "declaración de renta forms, cédula identity copies, and RUC documents", "filing your declaración de renta on DGI Panama portal", "via WhatsApp and email"),
  "cuba":                  v("CUP", "Havana, Santiago, and Camagüey", "Cuba data protection law", "declaración fiscal forms, carné de identidad copies, and ONAT documents", "filing documents with ONAT Cuba", "via email and mobile"),
  "dominican-republic":    v("DOP", "Santo Domingo, Santiago, and La Romana", "Dominican Republic data protection law", "declaración de impuestos forms, cédula identity copies, and RNC documents", "filing your declaración de impuestos on DGII portal", "via WhatsApp and email"),
  "haiti":                 v("HTG", "Port-au-Prince, Cap-Haïtien, and Gonaïves", "Haiti data protection law", "déclaration fiscale forms, CIN copies, and DGI Haiti submissions", "filing your déclaration fiscale with DGI Haiti", "via mobile data and email"),
  "jamaica":               v("JMD", "Kingston, Portmore, and Spanish Town", "Jamaica data protection law", "income tax return forms, TRN copies, and NIS documents", "filing your income tax return on TAJ Jamaica portal", "via email and mobile"),
  "trinidad-tobago":       v("TTD", "Port of Spain, San Fernando, and Chaguanas", "Trinidad and Tobago data protection law", "income tax return forms, TIN copies, and BIR documents", "filing your income tax return on TTBIR portal", "via email and mobile"),
  "barbados":              v("BBD", "Bridgetown, Speightstown, and Oistins", "Barbados data protection law", "income tax return forms, NIS copies, and TIN documents", "filing your income tax return on BRA Barbados portal", "via email and mobile"),
  "guyana":                v("GYD", "Georgetown, Linden, and New Amsterdam", "Guyana data protection law", "income tax return forms, TIN copies, and GRA documents", "filing your income tax return on GRA Guyana portal", "via email and mobile"),
  "suriname":              v("SRD", "Paramaribo, Lelydorp, and Nieuw Nickerie", "Suriname data protection law", "belastingaangifte forms, identity card copies, and DIB submissions", "filing your belastingaangifte on Suriname government portal", "via email and mobile"),
  "belize":                v("BZD", "Belize City, Belmopan, and San Ignacio", "Belize data protection law", "income tax return forms, social security copies, and BNBS documents", "filing your income tax return on Belize government portal", "via email and mobile"),
  "bahamas":               v("BSD", "Nassau, Freeport, and Marsh Harbour", "Bahamas data protection law", "income tax return forms, national ID copies, and DOI documents", "filing documents with the Bahamas Department of Inland Revenue", "via email and mobile"),
  "new-zealand":           v("NZD", "Auckland, Wellington, and Christchurch", "New Zealand Privacy Act 2020", "IR3 income tax returns, IRD number documents, and KiwiSaver forms", "filing your IR3 return on IRD myIR portal", "via email and mobile"),
  "fiji":                  v("FJD", "Suva, Nadi, and Lautoka", "Fiji data protection law", "income tax return forms, TIN copies, and FRCA submission documents", "filing your income tax return on FRCA Fiji portal", "via mobile data and email"),
  "papua-new-guinea":      v("PGK", "Port Moresby, Lae, and Mount Hagen", "PNG data protection law", "income tax return forms, TIN copies, and IRC submission documents", "filing your income tax return on IRC PNG portal", "via mobile data and email"),
  "samoa":                 v("WST", "Apia, Faleolo, and Salelologa", "Samoa data protection law", "income tax return forms, TIN copies, and MSAF submission documents", "filing your income tax return on Samoa government portal", "via mobile data and email"),
  "vanuatu":               v("VUV", "Port Vila, Luganville, and Isangel", "Vanuatu data protection law", "tax declaration forms, national ID copies, and VFSC submission documents", "filing documents with Vanuatu government portals", "via mobile data and email"),
  "tonga":                 v("TOP", "Nukualofa, Neiafu, and Haapai", "Tonga data protection law", "income tax return forms, national ID copies, and IRCOT submission documents", "filing your income tax return on Tonga government portal", "via mobile data and email"),
  "solomon-islands":       v("SBD", "Honiara, Gizo, and Auki", "Solomon Islands data protection law", "income tax return forms, TIN copies, and IRD submission documents", "filing your income tax return on Solomon Islands government portal", "via mobile data and email"),
};

function getRich(slug: string): CRich {
  return COUNTRY_RICH[slug] || { currency: "local currency", cities: "major cities", compliance: "local data protection law", docs: "tax forms and national ID documents", useCase: "submitting documents to government portals", mobile: "via mobile data and email" };
}

function slugVariant(slug: string): number {
  let h = 0;
  for (let i = 0; i < slug.length; i++) h = ((h << 5) - h + slug.charCodeAt(i)) | 0;
  return Math.abs(h) % 4;
}

function slugVariant6(slug: string): number {
  let h = 0;
  for (let i = 0; i < slug.length; i++) h = ((h << 5) - h + slug.charCodeAt(i) * 31) | 0;
  return Math.abs(h) % 6;
}

// 5th body-variant selector — returns 0-4; value 4 triggers industry-angle content
function slugVariant5(slug: string): number {
  let h = 0;
  for (let i = 0; i < slug.length; i++) h = ((h << 5) - h + slug.charCodeAt(i) * 17) | 0;
  return Math.abs(h) % 5;
}

// Structural de-fingerprinting: for ~20% of pages, move the closing secPara to the opening position.
// Eliminates the "every body ends with a data-security paragraph" template signal.
// Only activates for 3-paragraph content (all standard tool body variants qualify).
function rotateSecPara(slug: string, content: string): string {
  let h = 0;
  for (let i = 0; i < slug.length; i++) h = ((h << 5) - h + slug.charCodeAt(i) * 53) | 0;
  if (Math.abs(h) % 5 !== 1) return content; // only ~20% of pages
  const paras = content.split('\n\n');
  if (paras.length !== 3) return content; // only for the standard 3-paragraph structure
  return [paras[2], paras[0], paras[1]].join('\n\n');
}

// Top-20 high-volume countries that receive the 5th industry-angle variant
const TOP_20_COUNTRY_SLUGS = new Set([
  "uk","usa","india","australia","canada","germany","france","brazil",
  "japan","south-africa","kenya","nigeria","indonesia","malaysia",
  "philippines","saudi-arabia","uae","mexico","egypt","singapore"
]);

// Industry context per top-20 country
const COUNTRY_INDUSTRIES: Record<string, [string, string, string]> = {
  "uk":           ["finance and legal services", "healthcare and the NHS", "property and real estate"],
  "usa":          ["healthcare and insurance", "legal and paralegal services", "real estate and mortgage"],
  "india":        ["IT and software services", "banking and financial services", "government and compliance"],
  "australia":    ["mining and resources", "healthcare and aged care", "finance and accounting"],
  "canada":       ["real estate and mortgage", "finance and insurance", "healthcare and government"],
  "germany":      ["manufacturing and engineering", "legal and notarial services", "finance and banking"],
  "france":       ["public administration and legal", "healthcare and social services", "finance and insurance"],
  "brazil":       ["legal and cartorial services", "finance and banking", "government and public sector"],
  "japan":        ["manufacturing and trading", "finance and banking", "government and public services"],
  "south-africa": ["mining and resources", "legal and compliance", "finance and banking"],
  "kenya":        ["telecoms and fintech", "legal and compliance", "government and public services"],
  "nigeria":      ["banking and finance", "legal and compliance", "oil and gas administration"],
  "indonesia":    ["finance and banking", "government and public services", "manufacturing and trade"],
  "malaysia":     ["finance and banking", "manufacturing and trade", "government and public services"],
  "philippines":  ["business process outsourcing", "banking and finance", "government and public services"],
  "saudi-arabia": ["oil and energy administration", "banking and finance", "government and Vision 2030 projects"],
  "uae":          ["finance and free-zone business", "real estate and construction", "government and public services"],
  "mexico":       ["manufacturing and maquiladora", "finance and banking", "government and SAT compliance"],
  "egypt":        ["banking and finance", "tourism and hospitality administration", "government and public services"],
  "singapore":    ["finance and wealth management", "shipping and logistics", "government and regulatory compliance"],
};

const TOOL_INDUSTRY_VERB: Record<string, string> = {
  "merge":       "merge PDF documents",
  "pdf-to-word": "convert PDFs to Word",
  "sign-pdf":    "sign PDFs digitally",
  "split-pdf":   "split and extract PDF pages",
  "convert-pdf": "convert PDF documents",
  "jpg-to-pdf":  "convert images to PDF",
  "pdf-to-jpg":  "convert PDFs to images",
  "protect-pdf": "password-protect PDFs",
  "rotate-pdf":  "rotate PDF pages",
};

type CC = { label: string; demonym: string; portal: string; slug: string };

function industryAngleContent(toolId: string, c: CC): string {
  const rd = getRich(c.slug);
  const inds = COUNTRY_INDUSTRIES[c.slug] || ["business", "finance", "public sector"];
  const verb = TOOL_INDUSTRY_VERB[toolId] || "process PDF documents";
  const toolNames: Record<string, string> = {
    "merge": "PDF merger", "pdf-to-word": "PDF to Word converter",
    "sign-pdf": "electronic signature tool", "split-pdf": "PDF splitter",
    "convert-pdf": "PDF converter", "jpg-to-pdf": "image to PDF tool",
    "pdf-to-jpg": "PDF to image converter", "protect-pdf": "PDF encryption tool",
    "rotate-pdf": "PDF page rotation tool",
  };
  const toolLabel = toolNames[toolId] || "PDF processing tool";
  return `${c.demonym} working in ${inds[0]} and ${inds[1]} sectors need to ${verb} reliably every working day. Handling ${rd.docs.split(",")[0].trim()} and similar official documents is a routine part of professional life in ${rd.cities} — and PDF HUB 24's free ${toolLabel} eliminates the friction of desktop software, paid subscriptions, and IT-managed devices.\n\nProfessionals across ${c.label}'s ${inds[0]} industry submit documents to ${c.portal} and internal review systems that require specific PDF standards. Our ${toolLabel} produces output that passes validation at every major ${c.label} platform, with no watermarks, no branding, and no file count limits — whether you're processing a single document or dozens.\n\n${secPara(c.slug + toolId + "ind", rd.compliance, c.label)}`;
}

// 5 structurally distinct data-security closing paragraphs
function secPara(slug: string, compliance: string, label: string): string {
  const v = slugVariant6(slug + "sec") % 5;
  return [
    `All files are processed over an encrypted HTTPS connection and permanently deleted within 1 hour of upload. No data is retained on our servers, no content is ever accessed by staff, and no information is shared with third parties — fully consistent with ${compliance} data minimisation principles.`,
    `Your ${compliance} rights are protected by design. ${label} users benefit from HTTPS encryption on every file transfer and an automated 1-hour deletion policy that ensures no document lingers on our infrastructure after processing is complete. We never read, analyse, or share your files.`,
    `Unlike cloud-storage tools that retain files indefinitely, PDF HUB 24 deletes every processed document within 1 hour. HTTPS encryption protects all data in transit, and no third-party script has access to your file contents — an important consideration for ${label} users handling ${compliance}-regulated personal data.`,
    `${compliance} requires processors to retain personal data only as long as strictly necessary. We go further: files are automatically and permanently deleted within 1 hour, HTTPS transport encrypts every byte in transit, and our servers never log document content. Safe for even the most sensitive ${label} documents.`,
    `Once processing completes, an automated deletion timer starts. Your file is permanently removed within 1 hour — not archived, not analysed, not shared. All traffic uses HTTPS encryption. This workflow is designed to meet the data-minimisation expectations of ${compliance} for ${label} residents sharing sensitive official documents.`,
  ][v];
}

// Varied FAQ answer openers that avoid the uniform "Yes." start
const FAQ_OPENERS = ["Absolutely —", "Correct —", "Completely free —", "There are no restrictions —", "All tools are free —", "No cost at all —"];
function faqYes(i: number): string { return FAQ_OPENERS[i % FAQ_OPENERS.length]; }

// 6 structurally distinct FAQ Q1 question patterns — eliminates "Can {demonym} X for free?" fingerprint
function faqQ1(slug: string, demonym: string, verb: string): string {
  const v = slugVariant6(slug + "q1") % 6;
  return [
    `Can ${demonym} ${verb} for free?`,
    `How do ${demonym} ${verb} without paying for software?`,
    `What is the best free way for ${demonym} to ${verb} online?`,
    `Where can ${demonym} ${verb} for free, without an account?`,
    `Is there a free tool for ${demonym} to ${verb} online?`,
    `Do ${demonym} need to pay to ${verb}?`,
  ][v];
}

// Country-specific FAQ questions for top-20 countries — appended to FAQ arrays
const COUNTRY_SPECIFIC_FAQS: Record<string, Array<{ question: string; answer: string }>> = {
  "uk": [
    { question: "Do I need to compress my P60 before uploading to HMRC Self Assessment?", answer: "Yes — HMRC and UK government portals enforce upload size limits, typically 2–5 MB per document. Compressing your P60 and self-assessment tax returns to under 1 MB prevents rejected submissions and ensures your filing goes through first time." },
    { question: "Can I merge payslips, P60, and bank statements into one PDF for my UK accountant?", answer: "Absolutely — combining payslips, P60, and bank statements into a single PDF is standard practice for UK accountants and mortgage lenders. Our free PDF merger handles any number of files with drag-and-drop ordering in seconds." },
  ],
  "germany": [
    { question: "Muss ich meine Steuererklärung als PDF komprimieren, bevor ich sie an Elster sende?", answer: "Ja — Elster und andere deutsche Behördenportale haben Dateigrößenbeschränkungen von 1–5 MB pro Dokument. Komprimieren Sie Ihre Steuererklärung und Personalausweis-Scans auf unter 2 MB, um Uploadfehler zu vermeiden. Unser kostenloser Kompressor funktioniert direkt im Browser ohne Installation." },
    { question: "Kann ich Personalausweis und Gewerbeanmeldung für Elster als eine PDF-Datei zusammenführen?", answer: "Ja — laden Sie beide Dateien in unser kostenloses Zusammenführungstool hoch, ordnen Sie sie an und klicken Sie auf Zusammenführen. Das Ergebnis wird von Elster und allen deutschen Behördenportalen akzeptiert." },
  ],
  "india": [
    { question: "Can I compress my Form 16 and Aadhaar scans for ITR e-filing?", answer: "Yes — the Income Tax e-filing portal accepts PDF attachments up to 5 MB. Compressing your Form 16, Aadhaar scans, and PAN card documents to under 1 MB ensures your ITR submission uploads without portal errors, whether you're filing from Mumbai, Delhi, or Bengaluru." },
    { question: "How do I combine Form 16, Aadhaar, and PAN card into one PDF for DigiLocker or income tax?", answer: "Upload all documents to our free PDF merger, arrange them in order, and download a single PDF. The merged file is accepted by the Income Tax Department's e-filing portal, DigiLocker, and all major Indian government submission systems." },
  ],
  "australia": [
    { question: "Do I need to compress my tax documents before uploading to myGov ATO?", answer: "Yes — the ATO myGov portal has file size limits for supporting attachments. Compressing your PAYG summaries, receipts, and deduction evidence to under 2 MB prevents upload errors and ensures your tax return lodgement goes through without delays." },
    { question: "Can I merge multiple PAYG summaries and receipts for my ATO tax return?", answer: "Absolutely — combining your PAYG summaries, medical expense receipts, and work-related deduction documents into a single PDF is the recommended format for ATO online lodgement. Our free merger handles multiple files with instant results." },
  ],
  "canada": [
    { question: "Can I compress my T4 slips and CRA documents for online submission?", answer: "Yes — CRA My Account and provincial tax portals have document size limits. Compressing your T4 slips, RRSP contribution receipts, and supporting documents to under 2 MB prevents upload rejections and speeds up your CRA filing process." },
    { question: "How do I combine T4 slips and CRA forms into one PDF for my accountant?", answer: "Upload your T4 slips, T5 statements, and any supporting receipts to our free PDF merger. Arrange, merge, and download a single CRA-ready PDF accepted by CRA My Account and all provincial online tax systems." },
  ],
  "japan": [
    { question: "e-Taxに提出するPDFのサイズを圧縮する必要がありますか？", answer: "はい — e-Taxおよびその他の行政ポータルには添付ファイルのサイズ制限があります。確定申告書類のPDFを1MB以下に圧縮することで、アップロードエラーを防ぎ、スムーズに申告を完了できます。" },
    { question: "確定申告に必要な複数の書類（源泉徴収票・医療費明細）を一つのPDFにまとめられますか？", answer: "はい — 無料のPDF結合ツールに書類をアップロードし、順序を整えてから結合してください。e-Tax、マイナポータル、その他の行政ポータルで受け付けられる標準的なPDFが出力されます。" },
  ],
  "brazil": [
    { question: "Preciso compactar meu IRPF antes de enviar para a Receita Federal?", answer: "Sim — o portal da Receita Federal tem limites de tamanho de arquivo para declarações e documentos de suporte. Compactar sua declaração IRPF, comprovantes CPF e documentos CNPJ para menos de 2 MB evita erros de envio no portal da Receita Federal." },
    { question: "Posso unir minha declaração IRPF, CPF e comprovantes em um único PDF?", answer: "Sim — carregue todos os documentos em nossa ferramenta gratuita de mesclagem de PDF, organize-os na ordem correta e baixe um único PDF pronto para envio à Receita Federal. Funciona no desktop e no celular via WhatsApp ou mobile." },
    { question: "Posso comprimir meu IRPF e documentos da Receita Federal antes de enviar pelo Gov.br?", answer: "Sim — a Receita Federal e o Gov.br têm limites de tamanho para anexos de documentos fiscais. Comprimir sua declaração de IRPF, contracheques e documentos CPF para menos de 2 MB evita erros de envio e garante que sua declaração fiscal brasileira seja aceita sem problemas." },
  ],
  "france": [
    { question: "Dois-je compresser ma déclaration de revenus avant de la télécharger sur impots.gouv.fr ?", answer: "Oui — les portails gouvernementaux français ont des limites de taille de fichier pour les pièces jointes fiscales. Compressez vos formulaires CERFA et documents de revenus à moins de 2 Mo pour éviter les erreurs d'envoi sur impots.gouv.fr." },
    { question: "La compression d'un PDF est-elle conforme au RGPD en France ?", answer: "Oui — notre outil compresse vos PDF entièrement dans votre navigateur. Vos documents (déclaration de revenus, justificatifs d'identité, contrats) ne sont jamais transmis à nos serveurs, ce qui garantit la conformité au RGPD et à la loi Informatique et Libertés. Vos données restent sur votre appareil à Paris, Lyon ou Marseille." },
  ],
  "spain": [
    { question: "¿Necesito comprimir mis documentos antes de enviarlos a la Agencia Tributaria (AEAT)?", answer: "Sí — el portal de la Agencia Tributaria tiene límites de tamaño para los anexos de la declaración de la renta. Comprime tu IRPF, copia del DNI y documentos del Modelo 303 a menos de 2 MB para evitar errores de envío en la sede electrónica de la AEAT." },
    { question: "¿Es la compresión de PDF conforme a la LOPDGDD en España?", answer: "Sí — nuestro compresor de PDF funciona completamente en tu navegador sin enviar tus documentos a ningún servidor. Esto garantiza el cumplimiento de la LOPDGDD (Ley Orgánica de Protección de Datos) y el RGPD. Tus documentos de la Seguridad Social, DNI y declaraciones de hacienda permanecen en tu dispositivo en Madrid, Barcelona o Valencia." },
  ],
  "italy": [
    { question: "Devo comprimere il mio 730 prima di inviarlo ad Agenzia delle Entrate?", answer: "Sì — il portale di Agenzia delle Entrate ha limiti di dimensione per gli allegati della dichiarazione dei redditi. Comprimi il Modello 730, il Codice Fiscale e i documenti INPS a meno di 2 MB per evitare errori di invio tramite SPID o CIE." },
    { question: "La compressione PDF è conforme al Codice Privacy (GDPR) in Italia?", answer: "Sì — il nostro strumento comprime i PDF interamente nel tuo browser senza inviare documenti a server esterni. Questo garantisce la conformità al Codice Privacy italiano e al GDPR europeo. I tuoi documenti fiscali, i dati del Codice Fiscale e i file INPS rimangono sul tuo dispositivo a Roma, Milano o Napoli." },
  ],
  "south-korea": [
    { question: "국세청 홈택스에 PDF를 업로드하기 전에 압축해야 하나요?", answer: "예 — 홈택스 포털은 첨부 파일 크기에 제한이 있습니다. 종합소득세 신고서, 주민등록증 사본, 원천징수영수증을 2MB 이하로 압축하면 서울, 부산, 인천에서도 오류 없이 홈택스에 제출할 수 있습니다." },
    { question: "PDF 압축이 한국 개인정보보호법(PIPA)을 준수하나요?", answer: "예 — 당사의 PDF 압축 도구는 브라우저 내에서 완전히 작동하며 서버로 문서를 전송하지 않습니다. 이는 개인정보보호법(PIPA, 개인정보보호법) 및 카카오페이·공동인증서 관련 데이터 보안 요건을 준수합니다. 귀하의 세금 서류와 주민등록번호 관련 문서는 귀하의 기기에 안전하게 보관됩니다." },
  ],
  "poland": [
    { question: "Czy muszę skompresować PIT-37 przed wysłaniem do e-Urzędu Skarbowego?", answer: "Tak — portal e-Urząd Skarbowy ma limity rozmiaru plików dla załączników do deklaracji podatkowych. Skompresuj swój PIT-37, kopię dowodu osobistego (PESEL) i dokumenty ZUS do poniżej 2 MB, aby uniknąć błędów przesyłania w Warszawie, Krakowie lub Wrocławiu." },
    { question: "Czy kompresja PDF jest zgodna z RODO w Polsce?", answer: "Tak — nasz kompresor PDF działa całkowicie w Twojej przeglądarce i nie przesyła dokumentów na żadne serwery. Zapewnia to zgodność z RODO (Rozporządzenie o Ochronie Danych Osobowych) i polską ustawą o ochronie danych osobowych. Twoje zeznania podatkowe, numer PESEL i dokumenty ZUS pozostają na Twoim urządzeniu." },
  ],
  "argentina": [
    { question: "¿Necesito comprimir mis documentos antes de enviarlos a AFIP?", answer: "Sí — el portal de AFIP tiene límites de tamaño para los archivos adjuntos de declaraciones juradas. Comprime tu Ganancias, copias de DNI y documentos CUIL/CUIT a menos de 2 MB para evitar errores de envío en el sistema AFIP desde Buenos Aires, Córdoba o Rosario." },
    { question: "¿El compresor de PDF cumple con la Ley 25.326 de Protección de Datos en Argentina?", answer: "Sí — nuestro compresor funciona completamente en tu navegador sin enviar tus documentos a ningún servidor. Esto garantiza el cumplimiento de la Ley 25.326 de Protección de los Datos Personales de Argentina. Tus declaraciones de AFIP, datos del CUIL y documentos de ANSES permanecen en tu dispositivo." },
  ],
  "turkey": [
    { question: "e-Devlet'e yüklemeden önce PDF'mi sıkıştırmam gerekiyor mu?", answer: "Evet — e-Devlet ve GIB portalları vergi beyannameleri için dosya boyutu sınırlarına sahiptir. e-Beyanname formlarınızı, TC Kimlik kopyalarınızı ve vergi levhası belgelerinizi 2 MB'ın altına sıkıştırmak, İstanbul, Ankara veya İzmir'den e-Devlet'e gönderi hatalarını önler." },
    { question: "PDF sıkıştırma Türkiye'de KVKK'ya uygun mu?", answer: "Evet — PDF sıkıştırma aracımız tamamen tarayıcınızda çalışır ve belgeleriniz hiçbir sunucuya gönderilmez. Bu, Kişisel Verilerin Korunması Kanunu (KVKK) gerekliliklerine tam uyumu garanti eder. Vergi beyannameleriniz, TC Kimlik bilgileriniz ve e-Devlet belgeleri yalnızca cihazınızda kalır." },
  ],
  "thailand": [
    { question: "แบบ ภ.ง.ด. ต้องบีบอัดก่อนอัปโหลดไปยังกรมสรรพากรหรือไม่?", answer: "ใช่ — พอร์ทัลกรมสรรพากร (RD Thailand) มีขีดจำกัดขนาดไฟล์สำหรับเอกสารแนบการยื่นภาษี บีบอัดแบบ ภ.ง.ด. สำเนาบัตรประชาชน และเอกสารทะเบียนธุรกิจให้ต่ำกว่า 2 MB เพื่อป้องกันข้อผิดพลาดในการอัปโหลดจากกรุงเทพฯ เชียงใหม่ หรือภูเก็ต" },
    { question: "การบีบอัด PDF สอดคล้องกับ PDPA ของประเทศไทยหรือไม่?", answer: "ใช่ — เครื่องมือบีบอัด PDF ของเราทำงานในเบราว์เซอร์โดยสมบูรณ์โดยไม่ส่งเอกสารไปยังเซิร์ฟเวอร์ใดๆ ซึ่งรับประกันการปฏิบัติตาม พ.ร.บ. คุ้มครองข้อมูลส่วนบุคคล (PDPA) ของไทย เอกสารภาษี หมายเลขบัตรประชาชน และไฟล์ทะเบียนธุรกิจของคุณจะอยู่ในอุปกรณ์ของคุณเท่านั้น" },
  ],
  "south-africa": [
    { question: "Do I need to compress my SARS documents before submitting via eFiling?", answer: "Yes — SARS eFiling has document size limits for tax return attachments. Compressing your IRP5 certificates, income tax return, and supporting documents to under 2 MB prevents upload errors and ensures your SARS submission is processed without delays." },
    { question: "Can I merge my IRP5, payslips, and CIPC documents for my SARS accountant?", answer: "Yes — combining your IRP5 certificates, SARS income tax return, and CIPC company forms into a single PDF is standard practice for South African tax submissions. Our free merger handles multiple files instantly from Johannesburg, Cape Town, or Durban." },
    { question: "Can I compress my SARS eFiling documents before uploading my ITR12 in South Africa?", answer: "Yes — the SARS eFiling portal and Home Affairs digital services in South Africa enforce file size limits for tax return attachments. Compressing your ITR12, IRP5 certificates, and medical aid tax certificates to under 2 MB prevents upload errors and ensures your South African tax submission is accepted on the first attempt." },
  ],
  "kenya": [
    { question: "Can I compress my KRA documents before filing on iTax?", answer: "Yes — the iTax portal has file size limits for supporting documents. Compressing your KRA PIN certificate, national ID scan, and business registration documents to under 1 MB ensures smooth upload on iTax and eCitizen, especially on M-Pesa mobile data connections in Nairobi, Mombasa, or Kisumu." },
    { question: "How do I combine KRA and eCitizen documents on my phone in Kenya?", answer: "Open our free PDF merger in your mobile browser — it works over mobile data on any Kenyan network. Upload your KRA PIN certificate, national ID copies, and business registration forms, merge them, and download a single PDF for iTax or eCitizen submission." },
    { question: "Can I compress my KRA iTax documents before uploading to the eCitizen portal in Kenya?", answer: "Yes — the KRA iTax portal and eCitizen digital services in Kenya enforce file size limits for tax return attachments. Compressing your P9 forms, KRA PIN certificates, and income tax returns to under 2 MB prevents upload errors and ensures your Kenyan tax submission is accepted from Nairobi, Mombasa, or Kisumu." },
  ],
  "nigeria": [
    { question: "Can I compress my TIN certificate and FIRS documents for Nigerian tax filing?", answer: "Yes — the FIRS portal has file size restrictions for submitted documents. Compressing your TIN certificate, CAC registration forms, and FIRS tax documents to under 2 MB prevents upload failures when filing your returns or registering a business in Lagos, Abuja, or Port Harcourt." },
    { question: "Can I merge my TIN, CAC registration, and FIRS documents into one PDF in Nigeria?", answer: "Yes — upload your TIN certificate, CAC Form CAC-IT/1, and FIRS tax documents to our free PDF merger. Arrange, merge, and download a single PDF for FIRS submission. Works on any Nigerian mobile connection via WhatsApp data." },
  ],
  "philippines": [
    { question: "Can I compress my BIR Form 1701 before uploading to eFPS?", answer: "Yes — the BIR eFPS portal has file size limits for tax return attachments. Compressing your BIR Form 1701, supporting schedules, and PSA certificates to under 2 MB prevents upload errors and ensures your Philippine tax return submission is accepted." },
    { question: "Can I combine my BIR forms and PSA documents into one PDF for eFPS?", answer: "Yes — upload your BIR Form 1701, PSA birth certificate, and TIN application documents to our free PDF merger. The merged PDF is accepted by BIR eFPS and Philippine government portals. Works on mobile via GCash data." },
  ],
  "indonesia": [
    { question: "Apakah saya perlu mengompres SPT tahunan sebelum diunggah ke DJP Online?", answer: "Ya — portal DJP Online memiliki batas ukuran file untuk lampiran pajak. Mengompres SPT tahunan, e-KTP, dan dokumen NPWP Anda hingga di bawah 2 MB mencegah kesalahan unggahan dan memastikan pelaporan pajak SPT berhasil diproses di Jakarta, Surabaya, atau Bandung." },
  ],
  "malaysia": [
    { question: "Do I need to compress my e-Filing forms before submitting to MyTax LHDN?", answer: "Yes — the LHDN MyTax portal has file size limits for tax return attachments. Compressing your e-Filing forms, EA forms, and MyKad documents to under 2 MB prevents upload rejections and ensures your Malaysian income tax submission is accepted from Kuala Lumpur, Penang, or Johor Bahru." },
  ],
  "singapore": [
    { question: "Do I need to compress IR8A forms before submitting to IRAS myTax Portal?", answer: "Yes — the IRAS myTax Portal has file size limits for employment income documents. Compressing your IR8A forms and SingPass-authenticated documents to under 1 MB ensures fast upload and acceptance on the Singapore tax portal." },
  ],
  "uae": [
    { question: "Can I compress my Emirates ID documents for UAE PASS or eDNRD submission?", answer: "Yes — UAE government portals including UAE PASS and eDNRD enforce upload size limits. Compressing your Emirates ID application, VAT returns, and trade licence renewals to under 2 MB ensures smooth processing through UAE digital government services from Dubai, Abu Dhabi, or Sharjah." },
  ],
  "mexico": [
    { question: "¿Necesito comprimir mis documentos antes de enviarlos al portal SAT?", answer: "Sí — el portal del SAT tiene límites de tamaño para declaraciones anuales y documentos de soporte. Comprimir tu declaración anual, comprobantes CFDI y documentos RFC a menos de 2 MB evita errores de envío y agiliza tu trámite fiscal en México." },
  ],
  "sweden": [
    { question: "Behöver jag komprimera min inkomstdeklaration innan jag skickar till Skatteverket?", answer: "Ja — Skatteverkets e-tjänst har filstorleksgränser för bilagor. Komprimera din inkomstdeklaration, personnummer-dokument och Skatteverket-formulär till under 2 MB för att undvika uppladdningsfel när du deklarerar via Skatteverket.se eller BankID." },
  ],
  "netherlands": [
    { question: "Moet ik mijn belastingaangifte comprimeren voor Mijn Belastingdienst?", answer: "Ja — de Belastingdienst portal heeft bestandsgroottelimieten voor bijlagen bij de belastingaangifte. Comprimeer uw belastingaangifte en DigiD-documenten tot minder dan 2 MB om uploadfouten te voorkomen bij het indienen via Mijn Belastingdienst." },
  ],
  // ── Americas ──────────────────────────────────────────────────────────────
  "usa": [
    { question: "Can I compress my W-2 and IRS tax documents before uploading to IRS Direct File or state portals?", answer: "Yes — IRS portals, USCIS immigration services, and federal government portals enforce file size limits on PDF attachments. Compressing your W-2 forms, 1099 documents, and supporting schedules to under 2 MB prevents upload errors and ensures your federal tax submission is accepted on the first attempt." },
  ],
  "colombia": [
    { question: "Can I compress my DIAN tax return documents for online submission in Colombia?", answer: "Yes — the DIAN portal and Cancillería digital services in Colombia enforce upload size limits on tax return attachments. Compressing your Declaración de Renta, RUT documents, and DIAN forms to under 2 MB prevents submission errors and ensures your Colombian tax filing is processed promptly." },
  ],
  "chile": [
    { question: "Can I compress my Declaración de Renta documents before uploading to the SII portal in Chile?", answer: "Yes — the SII and ChileAtiende portals have file size restrictions for tax return attachments. Compressing your Declaración de Renta, RUT certificate, and supporting receipts to under 2 MB prevents upload failures and ensures your Chilean tax submission is accepted through the SII online system." },
  ],
  "peru": [
    { question: "Can I compress my Declaración Jurada documents for SUNAT online submission in Peru?", answer: "Yes — the SUNAT and Gob.pe portals enforce file size limits for PDFs. Compressing your Declaración Jurada, RUC certificate, and tax documents to under 2 MB prevents upload rejections and ensures your Peruvian tax submission is accepted through the SUNAT online platform." },
  ],
  "venezuela": [
    { question: "Can I compress my SENIAT tax documents for online submission in Venezuela?", answer: "Yes — the SENIAT portal and SUDEBAN financial services have file size limits for uploaded documents. Compressing your tax declarations and identity documents to under 2 MB helps ensure successful submissions to Venezuelan government digital portals." },
  ],
  "bolivia": [
    { question: "Can I compress my SIN tax forms before uploading to the Bolivian government portal?", answer: "Yes — the SIN tax authority and AJ digital portals in Bolivia have upload size limits for tax return documents. Compressing your tax forms and identity documents to under 2 MB prevents errors and ensures your Bolivian government submission is processed correctly." },
  ],
  "ecuador": [
    { question: "Can I compress my SRI tax documents before filing online in Ecuador?", answer: "Yes — the SRI and SENESCYT digital portals in Ecuador enforce file size limits for attachments. Compressing your Declaración de Impuesto a la Renta and supporting documents to under 2 MB prevents upload errors and ensures your Ecuadorian tax submission goes through without issues." },
  ],
  "uruguay": [
    { question: "Can I compress my DGI tax documents for online submission in Uruguay?", answer: "Yes — the DGI and BPS digital portals in Uruguay have file size limits for PDF attachments. Compressing your tax declarations, cédula scans, and BPS contribution documents to under 2 MB prevents upload errors and ensures your Uruguayan government submission is accepted." },
  ],
  "paraguay": [
    { question: "Can I compress my SET tax documents before uploading to the Paraguayan government portal?", answer: "Yes — the SET tax authority and MOPC portals in Paraguay enforce upload size restrictions. Compressing your Declaración Jurada and RUC documents to under 2 MB ensures your Paraguayan tax filing is processed without errors." },
  ],
  "guatemala": [
    { question: "Can I compress my SAT tax documents for online filing in Guatemala?", answer: "Yes — the SAT portal and MARN digital services in Guatemala have file size limits for PDF uploads. Compressing your Declaración de ISR and NIT documents to under 2 MB prevents submission errors and ensures your Guatemalan tax return is accepted through the SAT online portal." },
  ],
  "honduras": [
    { question: "Can I compress my SAR tax documents for online submission in Honduras?", answer: "Yes — the SAR and SEFIN digital portals in Honduras enforce upload size limits for tax documents. Compressing your Declaración de Impuesto Sobre la Renta and RTN documents to under 2 MB prevents errors and ensures your Honduran tax submission is processed successfully." },
  ],
  "el-salvador": [
    { question: "Can I compress my DGII tax forms before uploading to the El Salvador government portal?", answer: "Yes — the DGII and BFA digital portals in El Salvador have file size limits for PDF attachments. Compressing your Declaración de Renta, NIT documents, and tax forms to under 2 MB prevents upload rejections and ensures your Salvadoran government submission is accepted." },
  ],
  "nicaragua": [
    { question: "Can I compress my DGI tax documents for online filing in Nicaragua?", answer: "Yes — the DGI and INSS portals in Nicaragua enforce upload size restrictions for tax return documents. Compressing your Declaración Anual and RUC documents to under 2 MB prevents submission errors and ensures your Nicaraguan tax filing is processed without issues." },
  ],
  "costa-rica": [
    { question: "Can I compress my Hacienda tax documents for online submission in Costa Rica?", answer: "Yes — the Hacienda digital portal and SUGEF financial services in Costa Rica have file size limits for PDF attachments. Compressing your Declaración de Renta and cédula jurídica documents to under 2 MB prevents upload errors and ensures your Costa Rican tax submission is accepted." },
  ],
  "panama": [
    { question: "Can I compress my DGI tax documents before uploading to the Panama government portal?", answer: "Yes — the DGI and MEF digital portals in Panama enforce upload size limits for tax return documents. Compressing your Declaración de Renta, RUC certificate, and supporting documents to under 2 MB ensures your Panamanian tax submission is processed without errors." },
  ],
  "dominican-republic": [
    { question: "Can I compress my DGII tax documents for online filing in the Dominican Republic?", answer: "Yes — the DGII and TSS digital portals in the Dominican Republic have file size restrictions for PDF uploads. Compressing your Declaración de Impuesto Sobre la Renta and RNC documents to under 2 MB prevents upload failures and ensures your Dominican tax submission is accepted." },
  ],
  "jamaica": [
    { question: "Can I compress my TAJ tax documents before uploading to the Jamaica government portal?", answer: "Yes — the TAJ portal and JIPO digital services in Jamaica enforce file size limits for tax return attachments. Compressing your income tax returns, TRN documents, and supporting schedules to under 2 MB prevents upload errors and ensures your Jamaican government submission goes through." },
  ],
  "trinidad-tobago": [
    { question: "Can I compress my TTBIR tax documents for online submission in Trinidad & Tobago?", answer: "Yes — the TTBIR and TTConnect digital portals in Trinidad & Tobago enforce upload size limits for tax documents. Compressing your income tax returns and BIR Number documents to under 2 MB prevents submission errors and ensures your T&T tax filing is accepted without delays." },
  ],
  "barbados": [
    { question: "Can I compress my BRA tax documents before uploading to the Barbados government portal?", answer: "Yes — the BRA and BCC digital portals in Barbados have file size limits for PDF attachments. Compressing your income tax returns and NIS documents to under 2 MB prevents upload rejections and ensures your Barbadian government submission is processed correctly." },
  ],
  "guyana": [
    { question: "Can I compress my GRA tax documents for online submission in Guyana?", answer: "Yes — the GRA and GLSC digital portals in Guyana enforce upload size limits for tax return documents. Compressing your income tax returns and TIN documents to under 2 MB prevents errors and ensures your Guyanese government submission is accepted." },
  ],
  "suriname": [
    { question: "Can I compress my DIB tax documents before filing online in Suriname?", answer: "Yes — the DIB and CBvS digital portals in Suriname have file size restrictions for PDF uploads. Compressing your tax declarations and identity documents to under 2 MB ensures your Surinamese government submission is processed without issues." },
  ],
  "belize": [
    { question: "Can I compress my BNBS tax documents for online submission in Belize?", answer: "Yes — the BNBS and BTB digital portals in Belize enforce upload size limits for government document submissions. Compressing your tax returns and identity documents to under 2 MB prevents upload errors and ensures your Belizean government submission is accepted." },
  ],
  "bahamas": [
    { question: "Can I compress my DOI documents before uploading to the Bahamas government portal?", answer: "Yes — the DOI and BFSB digital portals in the Bahamas have file size limits for PDF attachments. Compressing your business licence applications, tax documents, and identity records to under 2 MB prevents upload rejections and ensures your Bahamian government submission goes through." },
  ],
  "new-zealand": [
    { question: "Can I compress my IRD tax documents before uploading to myIR in New Zealand?", answer: "Yes — the IRD myIR portal and Business.govt.nz digital services in New Zealand enforce file size limits for tax return attachments. Compressing your IR3 tax returns, GST forms, and payslip records to under 2 MB prevents upload errors and ensures your NZ tax submission is accepted." },
  ],
  "fiji": [
    { question: "Can I compress my FRCA tax documents for online submission in Fiji?", answer: "Yes — the FRCA and FRCS digital portals in Fiji have upload size limits for tax return documents. Compressing your income tax returns, TIN documents, and supporting schedules to under 2 MB prevents submission errors and ensures your Fijian government filing is processed correctly." },
  ],
  "papua-new-guinea": [
    { question: "Can I compress my IRC tax documents before uploading to the PNG government portal?", answer: "Yes — the IRC and IPA digital portals in Papua New Guinea enforce upload size limits for tax documents. Compressing your income tax returns and TIN certificates to under 2 MB prevents errors and ensures your PNG government submission is accepted without delays." },
  ],
  // ── Europe ──────────────────────────────────────────────────────────────────
  "russia": [
    { question: "Нужно ли мне сжимать налоговые документы перед загрузкой на Госуслуги?", answer: "Да — портал Госуслуги и ФНС имеют ограничения на размер файлов для вложений налоговых деклараций. Сжатие деклараций по налогу на прибыль, ИНН-документов и подтверждающих материалов до 2 МБ предотвращает ошибки загрузки и обеспечивает принятие вашей российской налоговой декларации." },
  ],
  "norway": [
    { question: "Do I need to compress my tax documents before uploading to Altinn in Norway?", answer: "Yes — the Altinn portal and Skatteetaten digital services in Norway have file size limits for tax return attachments. Compressing your Skattemelding, employment income documents, and supporting receipts to under 2 MB prevents upload errors and ensures your Norwegian tax submission is accepted without delays." },
  ],
  "denmark": [
    { question: "Do I need to compress my tax documents before uploading to borger.dk in Denmark?", answer: "Yes — the borger.dk portal and SKAT digital services in Denmark enforce file size limits for tax attachments. Compressing your Selvangivelse and NemID documents to under 2 MB prevents upload rejections and ensures your Danish tax submission is processed correctly." },
  ],
  "finland": [
    { question: "Do I need to compress my Veroilmoitus before uploading to Vero.fi in Finland?", answer: "Yes — the Vero.fi portal and Suomi.fi digital services in Finland have file size restrictions for tax return attachments. Compressing your Veroilmoitus, employer certificates, and supporting documents to under 2 MB prevents upload errors and ensures your Finnish tax submission is accepted." },
  ],
  "belgium": [
    { question: "Do I need to compress my tax documents before uploading to MyMinfin in Belgium?", answer: "Yes — the MyMinfin and CBSS digital portals in Belgium enforce file size limits for tax return attachments. Compressing your Déclaration fiscale, identity documents, and salary certificates to under 2 MB prevents upload errors and ensures your Belgian tax submission is accepted through MyMinfin." },
  ],
  "switzerland": [
    { question: "Do I need to compress my Steuererklärung before uploading to EasyGov in Switzerland?", answer: "Yes — the EasyGov portal and ESTV SuisseTax in Switzerland have upload size restrictions for tax documents. Compressing your Steuererklärung and AHV documents to under 2 MB prevents submission errors and ensures your Swiss federal and cantonal tax filing is accepted without issues." },
  ],
  "austria": [
    { question: "Muss ich meine Steuererklärung komprimieren, bevor ich sie über Finanz Online in Österreich einreiche?", answer: "Ja — das Finanz Online Portal und USP in Österreich haben Dateigrößenbeschränkungen für Steueranlagen. Komprimieren Sie Ihre Steuererklärung, Lohnzettel und Sozialversicherungsdokumente auf unter 2 MB, um Uploadfehler zu vermeiden und Ihre österreichische Steuererklärung erfolgreich einzureichen." },
  ],
  "czech-republic": [
    { question: "Do I need to compress my Daňové přiznání before uploading to Moje Daně in Czech Republic?", answer: "Yes — the Moje Daně and CzechPOINT digital portals in Czech Republic have file size limits for tax return attachments. Compressing your Daňové přiznání, birth certificate scans, and supporting documents to under 2 MB prevents upload errors and ensures your Czech tax submission is accepted." },
  ],
  "hungary": [
    { question: "Do I need to compress my adóbevallás before uploading to eSZJA in Hungary?", answer: "Yes — the eSZJA portal and Magyarország.hu digital services in Hungary have file size restrictions for tax return attachments. Compressing your adóbevallás, personal identity documents, and payslips to under 2 MB prevents upload errors and ensures your Hungarian tax submission is processed correctly." },
  ],
  "slovakia": [
    { question: "Do I need to compress my Daňové priznanie before uploading to Financná Sprava in Slovakia?", answer: "Yes — the Financná Sprava and UPVS digital portals in Slovakia enforce file size limits for tax return attachments. Compressing your Daňové priznanie, employee certificates, and supporting documents to under 2 MB prevents upload rejections and ensures your Slovak tax submission is accepted." },
  ],
  "serbia": [
    { question: "Do I need to compress my tax documents before uploading to ePorezi in Serbia?", answer: "Yes — the ePorezi and eUprava digital portals in Serbia have file size limits for PDF submissions. Compressing your Poreska prijava, identity documents, and supporting evidence to under 2 MB prevents upload errors and ensures your Serbian government submission is accepted without delays." },
  ],
  "croatia": [
    { question: "Do I need to compress my Porezna prijava before uploading to ePorezna in Croatia?", answer: "Yes — the ePorezna and ePisarnica digital portals in Croatia enforce upload size limits for tax documents. Compressing your Porezna prijava, JMBG identity documents, and employer certificates to under 2 MB prevents submission errors and ensures your Croatian tax filing is accepted." },
  ],
  "bulgaria": [
    { question: "Do I need to compress my tax declaration before uploading to NRA or eGov.bg in Bulgaria?", answer: "Yes — the NRA and eGov.bg digital portals in Bulgaria have file size limits for tax declaration attachments. Compressing your Годишна данъчна декларация, identity documents, and income certificates to under 2 MB prevents upload errors and ensures your Bulgarian tax submission is processed correctly." },
  ],
  "ireland": [
    { question: "Do I need to compress my tax documents before uploading to Revenue in Ireland?", answer: "Yes — the Revenue MyGovID portal in Ireland enforces file size limits for tax return attachments. Compressing your Form 11, payslips, pension documents, and supporting receipts to under 2 MB prevents upload errors and ensures your Irish tax return is submitted successfully through the Revenue online system." },
  ],
  "belarus": [
    { question: "Do I need to compress my tax documents before uploading to Nalog.gov.by in Belarus?", answer: "Yes — the Nalog.gov.by and portal.gov.by digital services in Belarus have file size limits for uploaded tax documents. Compressing your tax declarations and identity records to under 2 MB prevents submission errors and ensures your Belarusian government filing is accepted." },
  ],
  "estonia": [
    { question: "Do I need to compress my Maksudeklaratsioon before uploading to eesti.ee in Estonia?", answer: "Yes — the eesti.ee and X-Road digital government portals in Estonia have upload size restrictions for tax documents. Compressing your Maksudeklaratsioon and digital identity documents to under 1 MB ensures fast submission and acceptance through Estonia's e-government system, one of the most advanced in Europe." },
  ],
  "latvia": [
    { question: "Do I need to compress my Gada ienākumu deklarācija before uploading to latvija.lv in Latvia?", answer: "Yes — the latvija.lv and EDS digital portals in Latvia enforce file size limits for tax return attachments. Compressing your Gada ienākumu deklarācija and identity documents to under 2 MB prevents upload errors and ensures your Latvian tax submission is accepted without issues." },
  ],
  "lithuania": [
    { question: "Do I need to compress my Metinė pajamų deklaracija before uploading to vmi.lt in Lithuania?", answer: "Yes — the vmi.lt and epaslaugos digital portals in Lithuania have file size limits for tax declaration attachments. Compressing your Metinė pajamų deklaracija, employer certificates, and supporting documents to under 2 MB prevents upload errors and ensures your Lithuanian tax submission is processed correctly." },
  ],
  "slovenia": [
    { question: "Do I need to compress my Davčna napoved before uploading to eDavki in Slovenia?", answer: "Yes — the eDavki and e-Uprava digital portals in Slovenia enforce upload size limits for tax return documents. Compressing your Davčna napoved, EMŠO identity documents, and income certificates to under 2 MB prevents submission errors and ensures your Slovenian tax filing is accepted." },
  ],
  "luxembourg": [
    { question: "Do I need to compress my Déclaration fiscale before uploading to MyGuichet.lu in Luxembourg?", answer: "Yes — the MyGuichet.lu portal and AED digital services in Luxembourg have file size limits for tax declaration attachments. Compressing your Déclaration d'impôt and supporting identity documents to under 2 MB prevents upload errors and ensures your Luxembourg tax return is accepted." },
  ],
  "malta": [
    { question: "Do I need to compress my Income Tax Return before uploading to CFR Services in Malta?", answer: "Yes — the CFR Services and MyMalta digital portals enforce file size limits for tax return attachments. Compressing your Maltese Income Tax Return, ID card scans, and employer FS3 forms to under 2 MB prevents upload errors and ensures your Maltese tax submission is accepted by the Inland Revenue." },
  ],
  "cyprus": [
    { question: "Do I need to compress my Φορολογική Δήλωση before uploading to TAXISnet in Cyprus?", answer: "Yes — the TAXISnet and Ariadne digital portals in Cyprus enforce file size limits for tax return documents. Compressing your Φορολογική Δήλωση, identity documents, and payslips to under 2 MB prevents upload errors and ensures your Cypriot tax submission is processed correctly." },
  ],
  "iceland": [
    { question: "Do I need to compress my Skattframtal before uploading to Skatturinn in Iceland?", answer: "Yes — the Skatturinn portal and Island.is digital services in Iceland have upload size restrictions for tax return documents. Compressing your Skattframtal, kennitala identity documents, and income certificates to under 2 MB prevents submission errors and ensures your Icelandic tax filing is accepted." },
  ],
  "andorra": [
    { question: "Do I need to compress my tax documents before uploading to ANA or Govern.ad in Andorra?", answer: "Yes — the Govern.ad portal and ANA digital services in Andorra have file size limits for administrative document submissions. Compressing your tax declarations and identity documents to under 2 MB prevents upload errors and ensures your Andorran government submission is accepted." },
  ],
  "romania": [
    { question: "Do I need to compress my Declarație Fiscală before uploading to ANAF in Romania?", answer: "Yes — the ANAF and Romania.gov.ro digital portals enforce file size limits for tax return attachments. Compressing your Declarație de venit, CNP identity documents, and employer certificates to under 2 MB prevents upload errors and ensures your Romanian tax submission is accepted without delays." },
  ],
  "ukraine": [
    { question: "Do I need to compress my tax declaration before uploading to Diia or tax.gov.ua in Ukraine?", answer: "Yes — the Diia app and tax.gov.ua digital portals in Ukraine enforce file size limits for tax declaration attachments. Compressing your Податкова декларація, INN documents, and supporting evidence to under 2 MB prevents upload errors and ensures your Ukrainian government submission is accepted." },
  ],
  "greece": [
    { question: "Χρειάζεται να συμπιέσω τη φορολογική μου δήλωση πριν την υποβολή στο AADE;", answer: "Ναι — το AADE και το gov.gr έχουν όρια μεγέθους αρχείου για τα συνημμένα φορολογικών δηλώσεων. Η συμπίεση της φορολογικής σας δήλωσης Ε1, εγγράφων ΑΦΜ και αποδείξεων σε λιγότερο από 2 MB αποτρέπει σφάλματα μεταφόρτωσης στο ελληνικό σύστημα e-filing." },
  ],
  "portugal": [
    { question: "Preciso comprimir a minha Declaração de IRS antes de entregar no Portal das Finanças?", answer: "Sim — o Portal das Finanças e o SNS24 têm limites de tamanho de ficheiro para os anexos das declarações de IRS. Comprimir a sua Declaração de IRS, documentação NIF e certificados de rendimentos para menos de 2 MB evita erros de envio e garante que a sua declaração fiscal portuguesa é aceite sem problemas." },
  ],
  // ── Middle East ───────────────────────────────────────────────────────────
  "saudi-arabia": [
    { question: "Can I compress my Zakat or VAT documents before uploading to Absher in Saudi Arabia?", answer: "Yes — the Absher and Muqeem portals in Saudi Arabia enforce upload size limits for government document submissions. Compressing your VAT returns, Iqama documents, and Zakat filing attachments to under 2 MB prevents upload errors and ensures your Saudi digital government submission is accepted from Riyadh, Jeddah, or Dammam." },
  ],
  "qatar": [
    { question: "Can I compress my tax documents before uploading to Hukoomi or Metrash2 in Qatar?", answer: "Yes — the Hukoomi portal and Metrash2 digital services in Qatar enforce file size limits for government document uploads. Compressing your Qatar ID applications, business registration documents, and VAT returns to under 2 MB prevents upload errors and ensures your Qatari digital government submission is accepted." },
  ],
  "kuwait": [
    { question: "Can I compress my documents before uploading to MOI eServices or PACI in Kuwait?", answer: "Yes — the MOI eServices and PACI digital portals in Kuwait have upload size limits for civil identification and government document submissions. Compressing your Civil ID applications, residence documents, and government forms to under 2 MB prevents errors and ensures your Kuwaiti digital submission is accepted." },
  ],
  "israel": [
    { question: "Can I compress my tax documents before uploading to the MISIM portal in Israel?", answer: "Yes — the Gov.il and MISIM digital portals in Israel enforce file size limits for Mas Hachnasa (income tax) attachments. Compressing your annual tax return, Teudat Zehut documents, and supporting receipts to under 2 MB prevents upload errors and ensures your Israeli tax submission is processed correctly." },
  ],
  "jordan": [
    { question: "Can I compress my tax documents before uploading to the ISTD portal in Jordan?", answer: "Yes — the ISTD and e-Gov digital portals in Jordan enforce file size limits for income tax return attachments. Compressing your tax declarations, National ID documents, and supporting receipts to under 2 MB prevents submission errors and ensures your Jordanian tax filing is accepted." },
  ],
  "lebanon": [
    { question: "Can I compress my tax documents before uploading to MOF or LRA portals in Lebanon?", answer: "Yes — the MOF and LRA digital portals in Lebanon have file size limits for tax return submissions. Compressing your income tax declarations, commercial register documents, and supporting evidence to under 2 MB prevents upload errors and ensures your Lebanese government filing is accepted." },
  ],
  "oman": [
    { question: "Can I compress my VAT or income tax documents before uploading to the Oman Tax Authority portal?", answer: "Yes — the Oman Tax Authority and Invest Easy digital portals enforce upload size limits for VAT returns and tax filings. Compressing your tax documents, commercial registration certificates, and Civil Card records to under 2 MB prevents errors and ensures your Omani digital submission is accepted." },
  ],
  "bahrain": [
    { question: "Can I compress my NBR tax documents before uploading to Bahrain government portals?", answer: "Yes — the NBR portal and Bahrain.bh digital government services enforce file size limits for VAT return attachments. Compressing your VAT declarations, CPR identity documents, and commercial registration records to under 2 MB prevents upload errors and ensures your Bahraini tax submission is accepted." },
  ],
  "iran": [
    { question: "Can I compress my tax documents before uploading to my.tax.gov.ir in Iran?", answer: "Yes — the my.tax.gov.ir portal and Shahrvand digital services in Iran have upload size limits for tax return documents. Compressing your Maliati declarations, Melli Card documents, and supporting receipts to under 2 MB prevents submission errors and ensures your Iranian tax filing is accepted." },
  ],
  // ── Asia ─────────────────────────────────────────────────────────────────
  "china": [
    { question: "在向税务局或GSXT提交PDF文件前，我需要压缩它吗？", answer: "是的——税务局网上申报系统和GSXT工商信息平台对上传附件有文件大小限制。将您的个人所得税申报表、营业执照扫描件和增值税发票压缩到2MB以下，可以避免上传失败，确保您的中国税务文件顺利提交。" },
  ],
  "pakistan": [
    { question: "Can I compress my FBR tax return documents before uploading to Iris portal in Pakistan?", answer: "Yes — the FBR Iris portal and NADRA digital services in Pakistan enforce file size limits for income tax return attachments. Compressing your ITR documents, CNIC scans, and salary certificates to under 2 MB prevents upload errors and ensures your Pakistani tax submission is accepted on the first attempt." },
  ],
  "bangladesh": [
    { question: "Can I compress my NBR eTax documents before uploading to the Bangladesh tax portal?", answer: "Yes — the NBR eTax and BRTA digital portals in Bangladesh have file size limits for tax return attachments. Compressing your Income Tax Returns, NID card documents, and supporting certificates to under 2 MB prevents upload errors and ensures your Bangladeshi government submission is processed correctly." },
  ],
  "sri-lanka": [
    { question: "Can I compress my IRD documents before uploading to the Sri Lanka tax portal?", answer: "Yes — the IRD Sri Lanka and BRTA digital portals have upload size restrictions for tax return documents. Compressing your income tax returns, NIC card scans, and employer certificates to under 2 MB prevents submission errors and ensures your Sri Lankan government filing is accepted." },
  ],
  "nepal": [
    { question: "Can I compress my IRD Nepal tax documents before uploading to the government portal?", answer: "Yes — the IRD Nepal and OCMCM digital portals have file size limits for income tax return attachments. Compressing your Aaykar Bibaran, Citizenship Certificate scans, and PAN documents to under 2 MB prevents upload errors and ensures your Nepali government submission is accepted." },
  ],
  "vietnam": [
    { question: "Tôi có cần nén tài liệu thuế eTax VN trước khi nộp qua cổng thuế điện tử không?", answer: "Có — cổng eTax VN và DRVN có giới hạn kích thước tệp cho các phụ lục tờ khai thuế. Nén tờ khai thuế thu nhập cá nhân, tài liệu CMND/CCCD và các chứng từ hỗ trợ xuống dưới 2 MB giúp tránh lỗi tải lên và đảm bảo bản khai thuế của bạn được chấp nhận thành công." },
  ],
  "taiwan": [
    { question: "在向台灣eTax或MyData申報個人所得稅前，我需要壓縮PDF嗎？", answer: "是的——台灣eTax申報系統和MyData平台對附件大小有限制。將您的綜合所得稅申報書、身分證影本和扣繳憑單壓縮到2MB以下，可避免上傳失敗，確保您的台灣稅務申報順利完成。" },
  ],
  "hong-kong": [
    { question: "Can I compress my salaries tax documents before uploading to GovHK or eTAX in Hong Kong?", answer: "Yes — the GovHK portal and eTAX digital services in Hong Kong enforce upload size limits for Salaries Tax return attachments. Compressing your BIR60 tax returns, HKID scans, and employer's tax documents to under 2 MB prevents upload errors and ensures your Hong Kong Inland Revenue submission is accepted." },
  ],
  "cambodia": [
    { question: "Can I compress my GDT tax documents before uploading to the Cambodian government portal?", answer: "Yes — the GDT and MPTC digital portals in Cambodia enforce file size limits for tax return submissions. Compressing your profit tax returns, National ID scans, and supporting documents to under 2 MB prevents errors and ensures your Cambodian government submission is accepted." },
  ],
  "kazakhstan": [
    { question: "Нужно ли мне сжимать налоговые документы перед загрузкой на egov.kz в Казахстане?", answer: "Да — портал egov.kz и Kaz-tax имеют ограничения на размер загружаемых файлов. Сжатие деклараций по ИПН, удостоверения личности и подтверждающих документов до 2 МБ предотвращает ошибки загрузки и обеспечивает принятие вашей казахстанской налоговой декларации." },
  ],
  "uzbekistan": [
    { question: "Солиқ ҳужжатларимни my.gov.uz порталига юклашдан олдин сиқиб чиқаришим керакми?", answer: "Ҳа — my.gov.uz ва SoliqServis рақамли порталлари солиқ декларацияси илова ҳужжатлари учун файл ҳажмига чеклов белгилаган. Солиқ декларацияларингизни, паспорт нусхаларингизни ва тасдиқловчи ҳужжатларингизни 2 МБ дан кам бўладиган ҳажмга сиқиш юклашдаги хатоликларни олдини олади." },
  ],
  "brunei": [
    { question: "Can I compress my tax documents before uploading to BruConnect or e-Darussalam in Brunei?", answer: "Yes — the BruConnect portal and e-Darussalam digital services in Brunei enforce file size limits for government document submissions. Compressing your income tax returns, IC identity documents, and government forms to under 2 MB prevents upload errors and ensures your Brunei government submission is accepted." },
  ],
  "azerbaijan": [
    { question: "Can I compress my tax documents before uploading to e-gov.az or ASAN in Azerbaijan?", answer: "Yes — the e-gov.az portal and ASAN service centres in Azerbaijan enforce upload size limits for tax return documents. Compressing your income tax declarations, Şəxsiyyət vəsiqəsi scans, and VÖEN documents to under 2 MB prevents submission errors and ensures your Azerbaijani government filing is accepted." },
  ],
  "armenia": [
    { question: "Can I compress my tax documents before uploading to e-gov.am or tax.gov.am in Armenia?", answer: "Yes — the e-gov.am and tax.gov.am digital portals in Armenia enforce file size limits for income tax declaration attachments. Compressing your Եկամտի հայտարարագիր forms, passport scans, and supporting documents to under 2 MB prevents upload errors and ensures your Armenian tax submission is processed correctly." },
  ],
  "georgia": [
    { question: "Can I compress my tax documents before uploading to rs.ge or my.gov.ge in Georgia?", answer: "Yes — the rs.ge Revenue Service and my.gov.ge digital portals in Georgia enforce file size limits for income tax declaration attachments. Compressing your საშემოსავლო გადასახადის deklarations, ID card scans, and employer certificates to under 2 MB prevents submission errors and ensures your Georgian tax filing is accepted." },
  ],
  // ── Africa ───────────────────────────────────────────────────────────────
  "egypt": [
    { question: "Can I compress my ETA tax documents before uploading to the Nafeza portal in Egypt?", answer: "Yes — the ETA and Nafeza digital portals in Egypt have file size limits for tax return attachments. Compressing your income tax declarations, National ID scans, and supporting certificates to under 2 MB prevents upload errors and ensures your Egyptian tax submission is accepted through the digital government portal." },
  ],
  "morocco": [
    { question: "Dois-je compresser ma Déclaration de revenus avant de la soumettre sur le portail DGI du Maroc?", answer: "Oui — le portail DGI et la CNSS au Maroc imposent des limites de taille de fichier pour les pièces jointes de déclaration de revenus. Compresser votre déclaration d'IR, les copies de votre CIN et les justificatifs à moins de 2 Mo évite les erreurs d'envoi et garantit l'acceptation de votre déclaration fiscale marocaine." },
  ],
  "ghana": [
    { question: "Can I compress my GRA tax documents before uploading to the Ghana government portal?", answer: "Yes — the GRA and Ghana.gov.gh digital portals enforce file size limits for income tax return attachments. Compressing your Annual Income Tax Returns, Ghana Card scans, and TIN documents to under 2 MB prevents upload errors and ensures your Ghanaian tax submission is processed correctly." },
  ],
  "ethiopia": [
    { question: "Can I compress my ERCA tax documents before uploading to the Ethiopian government portal?", answer: "Yes — the ERCA and MoR digital portals in Ethiopia have file size limits for income tax declaration attachments. Compressing your income tax returns, Kebele ID scans, and TIN documents to under 2 MB prevents upload errors and ensures your Ethiopian government submission is accepted." },
  ],
  "tanzania": [
    { question: "Can I compress my TRA tax documents before uploading to the Tanzania government portal?", answer: "Yes — the TRA and BRELA digital portals in Tanzania enforce file size limits for income tax return attachments. Compressing your ITR forms, NIDA national ID documents, and TIN certificates to under 2 MB prevents upload errors and ensures your Tanzanian government submission is accepted." },
  ],
  "uganda": [
    { question: "Can I compress my URA tax documents before uploading to the Uganda government portal?", answer: "Yes — the URA and URSB digital portals in Uganda enforce upload size limits for income tax return attachments. Compressing your income tax returns, National ID scans, and TIN documents to under 2 MB prevents submission errors and ensures your Ugandan government filing is accepted." },
  ],
  "cameroon": [
    { question: "Dois-je compresser mes documents fiscaux DGI avant de les soumettre sur les portails gouvernementaux camerounais?", answer: "Oui — le portail DGI et le CDIP au Cameroun imposent des limites de taille de fichier pour les déclarations fiscales. Comprimer votre déclaration d'impôt sur le revenu, les copies de votre CNI et les justificatifs à moins de 2 Mo évite les erreurs d'envoi et garantit l'acceptation de votre déclaration fiscale camerounaise." },
  ],
  "ivory-coast": [
    { question: "Dois-je compresser mes documents fiscaux DGI avant de les soumettre sur e-Impôts en Côte d'Ivoire?", answer: "Oui — le portail e-Impôts et la DGI en Côte d'Ivoire ont des restrictions de taille de fichier pour les pièces jointes de déclaration de revenus. Comprimer votre déclaration d'ITS, les copies de votre CNI et les certificats d'employeur à moins de 2 Mo évite les erreurs d'envoi et garantit l'acceptation de votre dossier fiscal ivoirien." },
  ],
  "algeria": [
    { question: "هل أحتاج إلى ضغط وثائق الضريبة قبل الرفع على بوابة الضرائب الجزائرية؟", answer: "نعم — بوابة الضرائب DGI ومنصة jur2fisc في الجزائر لها حدود لحجم الملفات المرفقة. ضغط الإقرار الضريبي السنوي ووثائق بطاقة التعريف الوطنية إلى أقل من 2 ميغابايت يمنع أخطاء الرفع ويضمن قبول ملفك الضريبي الجزائري." },
  ],
  "tunisia": [
    { question: "Dois-je compresser mes documents fiscaux DGI avant de les soumettre sur Tunisia.gov.tn?", answer: "Oui — le portail DGI et Tunisia.gov.tn ont des limites de taille de fichier pour les déclarations fiscales. Comprimer votre déclaration d'impôt sur le revenu, les copies de votre CIN et les justificatifs à moins de 2 Mo évite les erreurs d'envoi et garantit l'acceptation de votre déclaration fiscale tunisienne." },
  ],
  "sudan": [
    { question: "Can I compress my STA tax documents before uploading to the Sudan government portal?", answer: "Yes — the STA and Sudan.gov.sd digital portals have file size limits for tax return submissions. Compressing your income tax declarations, National ID scans, and supporting documents to under 2 MB prevents upload errors and ensures your Sudanese government submission is accepted." },
  ],
  "zimbabwe": [
    { question: "Can I compress my ZIMRA tax documents before uploading to Zimbabwe e-Services?", answer: "Yes — the ZIMRA e-Services portal and Zimbabwe digital government services enforce file size limits for income tax return attachments. Compressing your ITF 263 tax returns, National ID scans, and ZIMRA registration documents to under 2 MB prevents upload errors and ensures your Zimbabwean tax submission is processed correctly." },
  ],
  "angola": [
    { question: "Preciso comprimir os meus documentos AGT antes de enviar pela plataforma BUE em Angola?", answer: "Sim — a AGT e o BUE em Angola têm limites de tamanho para os anexos das declarações fiscais. Comprimir a sua declaração de IRT, documentos NIF e BI para menos de 2 MB evita erros de envio e garante que a sua declaração fiscal angolana é aceite sem problemas." },
  ],
  "zambia": [
    { question: "Can I compress my ZRA tax documents before uploading to the Zambia government portal?", answer: "Yes — the ZRA and PACRA digital portals in Zambia enforce file size limits for income tax return attachments. Compressing your income tax returns, NRC identity documents, and TPIN certificates to under 2 MB prevents upload errors and ensures your Zambian government filing is accepted." },
  ],
  "mozambique": [
    { question: "Preciso comprimir os meus documentos AT antes de enviar pelo portal do governo de Moçambique?", answer: "Sim — a AT e o INSS em Moçambique têm limites de tamanho para os anexos de declarações fiscais. Comprimir a sua declaração de IRPS, documentos NUIT e BI para menos de 2 MB evita erros de envio e garante que a sua declaração fiscal moçambicana é aceite." },
  ],
  "senegal": [
    { question: "Dois-je compresser mes documents DGID avant de les soumettre sur Sénégal-services?", answer: "Oui — le portail DGID et Sénégal-services ont des limites de taille de fichier pour les déclarations fiscales. Comprimer votre déclaration d'impôt sur le revenu, les copies de votre CNI et les justificatifs à moins de 2 Mo évite les erreurs d'envoi et garantit l'acceptation de votre dossier fiscal sénégalais." },
  ],
  "rwanda": [
    { question: "Can I compress my RRA tax documents before uploading to Irembo in Rwanda?", answer: "Yes — the RRA portal and Irembo digital government services in Rwanda enforce upload size limits for income tax return attachments. Compressing your annual income tax returns, National ID scans, and TIN documents to under 2 MB prevents upload errors and ensures your Rwandan government submission is accepted." },
  ],
  "drc": [
    { question: "Dois-je compresser mes documents DGRAD avant de les soumettre sur les portails gouvernementaux de la RDC?", answer: "Oui — le portail DGRAD et la DGDA en République Démocratique du Congo imposent des limites de taille de fichier pour les déclarations fiscales. Comprimer votre déclaration d'impôt sur le revenu et les copies de votre pièce d'identité à moins de 2 Mo garantit l'acceptation de votre dossier fiscal congolais." },
  ],
  "botswana": [
    { question: "Can I compress my BURS tax documents before uploading to the Botswana government portal?", answer: "Yes — the BURS and CIPA digital portals in Botswana enforce file size limits for income tax return attachments. Compressing your ITF 261 tax returns, Omang national ID scans, and BURS registration documents to under 2 MB prevents upload errors and ensures your Botswana government submission is accepted." },
  ],
  "namibia": [
    { question: "Can I compress my NamRA tax documents before uploading to the Namibia government portal?", answer: "Yes — the NamRA and NBS digital portals in Namibia enforce upload size limits for income tax return attachments. Compressing your income tax returns, National ID scans, and supporting documents to under 2 MB prevents submission errors and ensures your Namibian government filing is accepted." },
  ],
  "gabon": [
    { question: "Dois-je compresser mes documents DGI avant de les soumettre sur Gabon.go.ga?", answer: "Oui — le portail DGI et Gabon.go.ga ont des limites de taille pour les déclarations fiscales. Comprimer votre déclaration d'impôt sur le revenu, votre carte d'identité et les justificatifs à moins de 2 Mo évite les erreurs d'envoi et garantit l'acceptation de votre dossier fiscal gabonais." },
  ],
  "congo": [
    { question: "Dois-je compresser mes documents DGI avant de les soumettre sur Congo-gov.cg?", answer: "Oui — le portail DGI de la République du Congo et Congo-gov.cg ont des restrictions de taille de fichier pour les déclarations fiscales. Comprimer votre déclaration d'impôt sur le revenu et les documents d'identité à moins de 2 Mo garantit l'acceptation de votre dossier fiscal congolais." },
  ],
  "mauritius": [
    { question: "Can I compress my MRA tax documents before uploading to the Mauritius government portal?", answer: "Yes — the MRA and CIEE digital portals in Mauritius enforce file size limits for income tax return attachments. Compressing your income tax returns, National Identity Card scans, and employer TDS certificates to under 2 MB prevents upload errors and ensures your Mauritian tax submission is accepted." },
  ],
  "malawi": [
    { question: "Can I compress my MRA tax documents before uploading to the Malawi government portal?", answer: "Yes — the MRA and MBRS digital portals in Malawi enforce file size limits for income tax return attachments. Compressing your income tax returns, National ID scans, and TPIN documents to under 2 MB prevents upload errors and ensures your Malawian government filing is accepted." },
  ],
};

// Per-country, per-tool first use-case scenario strings for top-20 countries
// Used to replace generic "Merging multiple documents for {portal}" bullets with doc-specific scenarios
const COUNTRY_DOC_SCENARIOS: Record<string, Record<string, string>> = {
  "uk": {
    "merge":              "Combining your P60, payslips, and bank statements into one PDF for HMRC Self Assessment submission",
    "pdf-to-word":        "Converting HMRC P60 forms and Companies House annual accounts into editable Word documents",
    "sign":               "Signing UK employment contracts, tenancy agreements, and consent forms electronically",
    "split":              "Extracting specific pages from HMRC tax correspondence or Companies House filing packs",
    "jpg-to-pdf":         "Converting photos of P60 slips and National Insurance documents for HMRC portal submission",
    "protect":            "Password-protecting sensitive P60 forms and self-assessment returns before emailing to your UK accountant",
    "rotate":             "Correcting orientation of scanned HMRC tax returns and Companies House correspondence",
    "edit":               "Annotating HMRC tax correspondence and Companies House filings before review",
    "convert-pdf":        "Converting Companies House annual accounts from PDF to Word for UK legal team editing",
    "pdf-to-jpg":         "Extracting pages from HMRC tax return correspondence to share with UK accountants and solicitors",
    "compress-pdf-online":"Compressing P60 and self-assessment returns for HMRC without installing Adobe Acrobat on a UK work computer",
  },
  "germany": {
    "merge":              "Steuererklärung, Personalausweis-Scan und Gewerbeanmeldung als eine PDF-Datei für Elster zusammenführen",
    "pdf-to-word":        "Steuererklärung und Behördenformulare aus Elster in editierbare Word-Dateien umwandeln",
    "sign":               "Arbeitsverträge, Mietverträge und Behördenformulare ohne Drucker elektronisch unterschreiben",
    "split":              "Einzelne Seiten aus Elster-Bescheiden und Behördenschreiben extrahieren",
    "jpg-to-pdf":         "Fotos von Steuerbescheiden, Personalausweis und Gewerbeanmeldung als PDF für Elster speichern",
    "protect":            "Steuererklärungen und Personalausweis-Scans DSGVO-konform vor dem E-Mail-Versand passwortschützen",
    "compress-pdf-online":"Steuererklärung und Elster-Formulare ohne Adobe Acrobat im Browser komprimieren",
  },
  "india": {
    "merge":              "Combining Form 16, Aadhaar card, and PAN card scans into one PDF for Income Tax e-filing or DigiLocker",
    "pdf-to-word":        "Converting Form 16 and government-issued DigiLocker PDFs into editable Word format for ITR preparation",
    "sign":               "Signing ITR acknowledgements, Aadhaar-linked forms, and EPFO documents digitally without printing",
    "split":              "Extracting specific pages from Form 26AS and income tax return documents for CA submission",
    "jpg-to-pdf":         "Converting photos of Form 16, Aadhaar card, and PAN card to PDF for income tax e-filing",
    "protect":            "Password-protecting Aadhaar-linked documents and PAN card scans before sharing via WhatsApp",
    "compress-pdf-online":"Compressing Form 16 and ITR documents without software on shared Indian office or cybercafé computers",
  },
  "australia": {
    "merge":              "Combining PAYG summaries, work expense receipts, and deduction evidence into one PDF for ATO myGov lodgement",
    "pdf-to-word":        "Converting ATO correspondence and myGov tax return documents into editable Word format",
    "sign":               "Signing Australian employment contracts, lease agreements, and ATO authorisation forms digitally",
    "split":              "Extracting specific pages from ATO tax assessment notices and myGov correspondence",
    "jpg-to-pdf":         "Converting scanned PAYG summaries and work expense receipts to PDF for ATO myGov submission",
    "protect":            "Password-protecting ATO tax return attachments and TFN documents before emailing to your Australian accountant",
    "compress-pdf-online":"Compressing ATO tax documents without installing software on a shared or work-managed Australian computer",
  },
  "canada": {
    "merge":              "Combining T4 slips, RRSP contribution receipts, and medical expense documents into one PDF for CRA My Account",
    "pdf-to-word":        "Converting T4 slips and CRA benefit correspondence into editable Word documents for Canadian tax professionals",
    "sign":               "Signing Canadian lease agreements, employment forms, and CRA-related documents without printing",
    "split":              "Extracting specific pages from CRA notices and provincial tax assessment letters",
    "jpg-to-pdf":         "Converting scanned T4 slips and receipt photos to PDF for CRA My Account lodgement",
    "protect":            "Password-protecting T4 slips and SIN-containing documents before emailing to your Canadian accountant",
    "compress-pdf-online":"Compressing T4 slips and CRA documents without software on Canadian remote-work or employer-managed computers",
  },
  "japan": {
    "merge":              "確定申告書、源泉徴収票、医療費明細書を一つのPDFにまとめてe-Taxに提出",
    "pdf-to-word":        "e-TaxのPDFフォームやマイナンバー書類をWord形式に変換して編集",
    "sign":               "雇用契約書、賃貸契約書、マイナンバー関連書類を電子署名で署名",
    "jpg-to-pdf":         "マイナンバー通知カード、源泉徴収票の写真をPDFに変換してe-Tax提出用に使用",
    "compress-pdf-online":"確定申告書とマイナンバー関連書類をAdobe Acrobatなしでブラウザ上で圧縮",
  },
  "brazil": {
    "merge":              "Combinando declaração IRPF, CPF e documentos CNPJ em um único PDF para envio à Receita Federal",
    "pdf-to-word":        "Convertendo declarações IRPF e formulários da Receita Federal em arquivos Word editáveis",
    "sign":               "Assinar contratos de trabalho, aluguéis e documentos da Receita Federal eletronicamente",
    "jpg-to-pdf":         "Convertendo fotos de CPF, CNPJ e recibos para PDF para submissão à Receita Federal via WhatsApp",
    "compress-pdf-online":"Compactar declaração IRPF e documentos da Receita Federal sem instalar software no computador",
  },
  "south-africa": {
    "merge":              "Combining IRP5 certificates, SARS income tax return, and CIPC company forms into one PDF for eFiling",
    "pdf-to-word":        "Converting SARS eFiling assessment notices and CIPC company documents into editable Word format",
    "sign":               "Signing South African employment contracts, lease agreements, and SARS authorisation forms digitally",
    "jpg-to-pdf":         "Converting scanned IRP5 certificates and South African ID documents to PDF for SARS eFiling",
    "compress-pdf-online":"Compressing SARS tax documents without installing software on South African corporate managed devices",
  },
  "kenya": {
    "merge":              "Combining KRA PIN certificate, national ID, and business registration documents for iTax or eCitizen submission",
    "pdf-to-word":        "Converting KRA certificates and eCitizen portal documents into editable Word format",
    "sign":               "Signing Kenyan business registration forms, leases, and government application documents electronically",
    "jpg-to-pdf":         "Converting M-Pesa payment receipts and KRA certificate photos to PDF for eCitizen submission",
    "protect":            "Password-protecting KRA and eCitizen documents before sharing via mobile banking apps in Kenya",
    "compress-pdf-online":"Compressing KRA documents for iTax submission without software — works on mobile data in Nairobi and beyond",
  },
  "nigeria": {
    "merge":              "Combining TIN certificate, CAC Form CAC-IT/1, and FIRS withholding tax certificates into one PDF for tax filing",
    "pdf-to-word":        "Converting FIRS tax assessment notices and CAC registration documents into editable Word format",
    "sign":               "Signing Nigerian business contracts, employment agreements, and CAC forms without printing",
    "jpg-to-pdf":         "Converting photos of TIN certificates and national ID cards to PDF for FIRS submission via WhatsApp",
    "compress-pdf-online":"Compressing TIN certificates and FIRS documents without software — works on mobile data across Nigeria",
  },
  "philippines": {
    "merge":              "Combining BIR Form 1701, PSA birth certificate, and PHILSYS national ID into one PDF for eFPS submission",
    "pdf-to-word":        "Converting BIR assessment forms and PhilSys ID documents into editable Word format",
    "sign":               "Signing Philippine BIR forms, employment contracts, and consent forms electronically",
    "jpg-to-pdf":         "Converting GCash payment receipts and BIR certificate photos to PDF for eFPS submission",
    "compress-pdf-online":"Compressing BIR Form 1701 and supporting schedules without software — accessible via GCash mobile data",
  },
  "indonesia": {
    "merge":              "Menggabungkan SPT tahunan, e-KTP, dan dokumen NPWP menjadi satu PDF untuk DJP Online atau OSS",
    "pdf-to-word":        "Mengonversi formulir SPT dari DJP Online dan surat pajak Indonesia menjadi file Word yang dapat diedit",
    "sign":               "Menandatangani kontrak kerja, perjanjian sewa, dan formulir pemerintah Indonesia secara elektronik",
    "jpg-to-pdf":         "Mengonversi foto e-KTP dan NPWP ke PDF untuk pengajuan DJP Online melalui ponsel",
    "compress-pdf-online":"Mengompres SPT tahunan dan e-KTP tanpa menginstal software — bisa diakses melalui WhatsApp di Jakarta dan seluruh Indonesia",
  },
  "malaysia": {
    "merge":              "Combining e-Filing tax forms, MyKad identity copies, and EP Form/CP58 into one PDF for LHDN MyTax",
    "pdf-to-word":        "Converting LHDN e-Filing assessment notices and MyKad documents into editable Word format",
    "sign":               "Signing Malaysian employment contracts, tenancy agreements, and SSM documents electronically",
    "jpg-to-pdf":         "Converting photos of MyKad and EPF statements to PDF for MyTax or SSM portal submission",
    "compress-pdf-online":"Compressing LHDN e-Filing forms and MyKad documents without software on Malaysian corporate computers",
  },
  "singapore": {
    "merge":              "Combining IR8A employment forms, NRIC copies, and CorpPass-authenticated documents into one PDF for IRAS",
    "pdf-to-word":        "Converting IRAS myTax Portal notices and SingPass documents into editable Word format",
    "jpg-to-pdf":         "Converting SingPass document photos and CPF statements to PDF for IRAS myTax submission",
  },
  "uae": {
    "merge":              "Combining Emirates ID application, VAT return, and trade licence renewal documents for UAE PASS or eDNRD",
    "pdf-to-word":        "Converting UAE government portal PDFs and Emirates ID documents into editable Word format",
    "sign":               "Signing UAE employment contracts, tenancy agreements, and government application forms electronically",
    "jpg-to-pdf":         "Converting Emirates ID and trade licence document photos to PDF for UAE PASS portal submission",
  },
  "mexico": {
    "merge":              "Combinando declaración anual SAT, RFC y documentos CURP en un único PDF para el portal del SAT",
    "pdf-to-word":        "Convirtiendo documentos SAT, comprobantes CFDI y formularios del RFC a Word editable",
    "sign":               "Firmar contratos laborales, arrendamientos y documentos del SAT electrónicamente en México",
    "jpg-to-pdf":         "Convirtiendo fotos de RFC, CURP y comprobantes CFDI a PDF para envío al portal SAT por WhatsApp",
  },
  "france": {
    "merge":              "Regrouper déclaration de revenus, formulaire CERFA et Carte Vitale dans un seul PDF pour impots.gouv.fr",
    "pdf-to-word":        "Convertir déclarations de revenus et formulaires CERFA d'impots.gouv.fr en fichiers Word modifiables",
    "sign":               "Signer des contrats de travail, baux et documents administratifs français électroniquement",
    "split":              "Extraire des pages spécifiques des avis d'imposition et courriers de l'administration fiscale française",
    "jpg-to-pdf":         "Convertir photos de Carte Vitale et justificatifs fiscaux en PDF pour soumission à impots.gouv.fr",
    "protect":            "Protéger par mot de passe les déclarations fiscales et documents CERFA avant envoi par e-mail au comptable",
    "rotate":             "Corriger l'orientation de formulaires CERFA et avis d'imposition scannés pour impots.gouv.fr",
    "edit":               "Annoter des formulaires CERFA et courriers de l'administration fiscale française avant révision",
    "compress-pdf-online":"Compresser déclarations de revenus et formulaires CERFA sans Adobe Acrobat sur un ordinateur professionnel français",
    "pdf-to-jpg":         "Extraire des pages d'avis d'imposition de impots.gouv.fr à partager avec comptables et notaires",
    "convert-pdf":        "Convertir des formulaires CERFA et documents DGFiP de PDF en Word pour les équipes juridiques françaises",
  },
  "south-korea": {
    "merge":              "종합소득세 신고서, 주민등록증 사본, 사업자등록증을 하나의 PDF로 합쳐 홈택스에 제출",
    "pdf-to-word":        "홈택스 PDF 서류와 국세청 공문을 편집 가능한 워드 파일로 변환",
    "sign":               "한국 근로계약서, 임대차계약서, 관공서 서류를 전자 서명",
    "split":              "홈택스 세금 납부서와 국세청 공문에서 특정 페이지 추출",
    "jpg-to-pdf":         "주민등록증과 사업자등록증 사진을 PDF로 변환하여 홈택스에 제출",
    "protect":            "주민등록증 스캔본과 소득세 신고 서류를 이메일 전송 전 비밀번호 보호",
    "rotate":             "홈택스에서 받은 세금 납부서와 공문의 페이지 방향 수정",
    "edit":               "홈택스 공문과 세금 신고 서류에 주석 및 메모 추가",
    "compress-pdf-online":"홈택스 세금 신고 서류를 소프트웨어 없이 브라우저에서 압축",
    "pdf-to-jpg":         "홈택스 세금 고지서에서 특정 페이지를 이미지로 변환하여 공유",
    "convert-pdf":        "홈택스 PDF 서류를 편집 가능한 형식으로 변환하여 세무사에게 전달",
  },
  "spain": {
    "merge":              "Combinar Modelo 303, DNI y declaración IRPF en un único PDF para la Agencia Tributaria (AEAT)",
    "pdf-to-word":        "Convertir declaraciones IRPF y formularios de la AEAT en documentos Word editables",
    "sign":               "Firmar contratos de trabajo, arrendamientos y formularios de la Seguridad Social electrónicamente",
    "split":              "Extraer páginas específicas de notificaciones de la AEAT y documentos del Catastro",
    "jpg-to-pdf":         "Convertir fotos del DNI y justificantes fiscales en PDF para el portal de la AEAT",
    "protect":            "Proteger con contraseña las declaraciones IRPF y documentos con NIE/DNI antes de enviarlos al gestor",
    "rotate":             "Corregir la orientación de formularios AEAT escaneados antes de subirlos al portal tributario",
    "edit":               "Anotar formularios de la AEAT y notificaciones de Hacienda antes de su revisión",
    "compress-pdf-online":"Comprimir la declaración IRPF y Modelo 303 sin instalar software en el ordenador del trabajo",
    "pdf-to-jpg":         "Extraer páginas de notificaciones de la AEAT para compartir con gestores fiscales españoles",
    "convert-pdf":        "Convertir formularios AEAT y documentos de Hacienda de PDF a Word para equipos jurídicos",
  },
  "italy": {
    "merge":              "Unire Modello 730, Codice Fiscale e contributi INPS in un unico PDF per l'Agenzia delle Entrate",
    "pdf-to-word":        "Convertire il Modello 730 e le dichiarazioni dei redditi in documenti Word modificabili",
    "sign":               "Firmare contratti di lavoro, contratti d'affitto e moduli INPS elettronicamente",
    "split":              "Estrarre pagine specifiche da comunicazioni dell'Agenzia delle Entrate e notifiche INPS",
    "jpg-to-pdf":         "Convertire foto del Codice Fiscale e documenti INPS in PDF per l'Agenzia delle Entrate",
    "protect":            "Proteggere con password il Modello 730 e i documenti INPS prima dell'invio al commercialista",
    "rotate":             "Correggere l'orientamento di formulari INPS e comunicazioni dell'Agenzia delle Entrate scansionati",
    "edit":               "Annotare il Modello 730 e i documenti dell'Agenzia delle Entrate prima della revisione",
    "compress-pdf-online":"Comprimere il Modello 730 e i documenti dell'Agenzia delle Entrate senza installare software",
    "pdf-to-jpg":         "Estrarre pagine da documenti INPS e Agenzia delle Entrate per condividerle con il commercialista",
    "convert-pdf":        "Convertire moduli INPS e dichiarazioni dei redditi da PDF a Word per lo studio commercialista",
  },
  "poland": {
    "merge":              "Łączenie deklaracji PIT, dowodu osobistego i dokumentów ZUS w jeden PDF do portalu e-Deklaracje",
    "pdf-to-word":        "Konwersja deklaracji PIT i dokumentów e-Deklaracje do edytowalnych plików Word",
    "sign":               "Elektroniczne podpisywanie umów o pracę, umów najmu i dokumentów ZUS w Polsce",
    "split":              "Wyodrębnianie określonych stron z decyzji podatkowych i pism urzędu skarbowego",
    "jpg-to-pdf":         "Konwersja zdjęć dowodu osobistego i dokumentów ZUS do PDF dla portalu e-Deklaracje",
    "protect":            "Zabezpieczanie hasłem deklaracji PIT i dokumentów PESEL przed wysłaniem do księgowego",
    "rotate":             "Korekta orientacji zeskanowanych dokumentów PIT i pism ZUS przed przesłaniem do e-Deklaracje",
    "edit":               "Dodawanie adnotacji do dokumentów PIT i korespondencji urzędu skarbowego przed przeglądem",
    "compress-pdf-online":"Kompresja deklaracji PIT i dokumentów ZUS bez oprogramowania na komputerze służbowym",
    "pdf-to-jpg":         "Wyodrębnianie stron z decyzji podatkowych do udostępnienia polskiemu doradcy podatkowemu",
    "convert-pdf":        "Konwersja formularzy ZUS i deklaracji PIT z PDF do Word dla polskich biur rachunkowych",
  },
  "argentina": {
    "merge":              "Combinar declaración jurada AFIP, DNI y comprobantes de monotributo en un único PDF para Mi AFIP",
    "pdf-to-word":        "Convertir declaraciones de AFIP y formularios de ANSES en documentos Word editables",
    "sign":               "Firmar contratos laborales, locaciones y formularios de la ANSES electrónicamente en Argentina",
    "split":              "Extraer páginas de notificaciones AFIP y documentos del ANSES",
    "jpg-to-pdf":         "Convertir fotos de DNI y comprobantes de pago AFIP en PDF para cargar en Mi AFIP",
    "protect":            "Proteger con contraseña las declaraciones AFIP y documentos CUIT/CUIL antes de enviarlos al contador",
    "rotate":             "Corregir la orientación de formularios AFIP escaneados antes de subirlos al portal",
    "edit":               "Anotar formularios AFIP y notificaciones de ANSES antes de su revisión",
    "compress-pdf-online":"Comprimir declaraciones AFIP y formularios del monotributo sin software en Buenos Aires y todo el país",
    "pdf-to-jpg":         "Extraer páginas de notificaciones AFIP para compartir con contadores en Argentina",
    "convert-pdf":        "Convertir formularios AFIP y comprobantes fiscales de PDF a Word para estudios contables argentinos",
  },
  "turkey": {
    "merge":              "Gelir vergisi beyannamesi, TC kimlik kartı kopyası ve e-Devlet belgelerini birleştirip İnteraktif Vergi Dairesi'ne gönderme",
    "pdf-to-word":        "İnteraktif Vergi Dairesi belgelerini ve TC kimlik kartı kayıtlarını düzenlenebilir Word dosyalarına dönüştürme",
    "sign":               "Türk iş sözleşmelerini, kira sözleşmelerini ve SGK belgelerini elektronik imzalama",
    "split":              "Vergi dairesi bildirimlerinden ve e-Devlet yazışmalarından belirli sayfaları çıkarma",
    "jpg-to-pdf":         "TC kimlik kartı ve SGK belgesi fotoğraflarını e-Devlet portalı için PDF'e dönüştürme",
    "protect":            "Vergi beyannameleri ve TC kimlik kartı kopyalarını muhasebeciye göndermeden önce şifreleme",
    "rotate":             "Vergi dairesinden alınan bildirimler ve e-Devlet belgelerinin sayfa yönünü düzeltme",
    "edit":               "Vergi beyannameleri ve e-Devlet belgelerine açıklama ve not ekleme",
    "compress-pdf-online":"Gelir vergisi beyannamelerini ve e-Devlet belgelerini yazılım kurmadan sıkıştırma",
    "pdf-to-jpg":         "Vergi dairesi bildirimlerinden sayfa çıkararak Türk mali danışmanlarla paylaşma",
    "convert-pdf":        "Türk vergi formları ve e-Devlet belgelerini PDF'den Word'e dönüştürme",
  },
  "thailand": {
    "merge":              "รวมแบบ ภ.ง.ด. ใบกำกับภาษี และบัตรประชาชน เป็น PDF เดียวเพื่อยื่นต่อกรมสรรพากร (RD Thailand)",
    "pdf-to-word":        "แปลงแบบแสดงรายการภาษีจาก RD Thailand เป็นไฟล์ Word ที่แก้ไขได้",
    "sign":               "เซ็นสัญญาจ้างงาน สัญญาเช่า และเอกสารราชการไทยแบบอิเล็กทรอนิกส์",
    "split":              "แยกหน้าเฉพาะจากหนังสือแจ้งกรมสรรพากรและเอกสารราชการไทย",
    "jpg-to-pdf":         "แปลงภาพบัตรประชาชนและเอกสารภาษีเป็น PDF สำหรับยื่นต่อกรมสรรพากร",
    "protect":            "ป้องกันด้วยรหัสผ่านสำหรับแบบภาษีและบัตรประชาชนก่อนส่งอีเมลถึงนักบัญชี",
    "rotate":             "แก้ไขการหมุนของเอกสารกรมสรรพากรและเอกสารราชการไทยที่สแกนด้วยสมาร์ตโฟน",
    "edit":               "เพิ่มหมายเหตุและคำอธิบายในแบบภาษีและเอกสารราชการไทยก่อนตรวจสอบ",
    "compress-pdf-online":"บีบอัดแบบ ภ.ง.ด. และเอกสาร RD Thailand โดยไม่ต้องติดตั้งซอฟต์แวร์",
    "pdf-to-jpg":         "แยกหน้าจากหนังสือแจ้งกรมสรรพากรเพื่อแชร์กับนักบัญชีผ่าน LINE",
    "convert-pdf":        "แปลงแบบฟอร์มภาษีและเอกสาร RD Thailand จาก PDF เป็น Word สำหรับสำนักงานบัญชี",
  },
};

// Countries with near-zero PDF tool search volume — skip from output
const NOINDEX_COUNTRY_SLUGS = new Set([
  "tonga","solomon-islands","samoa","vanuatu","east-timor","bhutan","maldives",
  "eritrea","djibouti","south-sudan","central-african-republic","chad",
  "lesotho","eswatini","gambia","cuba","haiti","yemen","syria","somalia",
  "guinea","guinea-bissau","sierra-leone","liberia","togo","benin","burkina-faso",
  "niger","mali","cape-verde","comoros","sao-tome","seychelles","kiribati","nauru","palau",
  // T3 near-duplicate content countries — protect crawl budget until content upgraded
  "tajikistan","kyrgyzstan","turkmenistan","laos","mongolia","afghanistan",
  "iraq","myanmar","north-macedonia","bosnia","montenegro","moldova","albania","guinea",
]);

// Tool-count phrasing variants to avoid "49+ free tools" repetition
const TOOL_COUNT = ["49+ free PDF tools","more than 49 online tools","a full suite of 49+ tools","over four dozen free tools","49+ PDF utilities","a complete toolkit of 49+ tools"];
function toolCount(slug: string): string { return TOOL_COUNT[slugVariant6(slug) % TOOL_COUNT.length]; }

const DOC_TYPES = [
  { slug: "resume",          label: "Resume",           context: "Job seekers need their resume PDF compressed for email attachments and ATS upload portals." },
  { slug: "invoice",         label: "Invoice",          context: "Small businesses send invoices by email daily. A compressed invoice under 200KB reaches any inbox reliably." },
  { slug: "contract",        label: "Contract",         context: "Contracts are shared for signature via email and DocuSign. Smaller files speed up the review and signing cycle." },
  { slug: "report",          label: "Report",           context: "Business and academic reports often contain charts and images. Compression keeps them shareable without quality loss." },
  { slug: "thesis",          label: "Thesis",           context: "University thesis submissions have strict file-size limits on institutional repositories. Compression is often required." },
  { slug: "certificate",     label: "Certificate",      context: "Certificates are frequently uploaded to professional profiles and government portals with tight size limits." },
  { slug: "application-form","label":"Application Form","context":"Application forms for jobs, visas, and universities must fit within portal upload size restrictions." },
  { slug: "ticket",          label: "Ticket",           context: "Event, travel, and support tickets are attached to emails and printed. Compact PDFs open instantly on mobile devices." },
  { slug: "receipt",         label: "Receipt",          context: "Expense receipts are uploaded to accounting systems and emailed to finance teams with strict size policies." },
  { slug: "presentation",    label: "Presentation",     context: "Slide presentations exported as PDF can be large. Compression makes them shareable via email and messaging apps." },
  { slug: "brochure",        label: "Brochure",         context: "Marketing brochures are shared digitally and printed. Compression reduces send time while maintaining print-ready quality." },
  { slug: "legal-document",  label: "Legal Document",   context: "Legal documents must be precisely readable. Lossless compression keeps text sharp while meeting court portal limits." },
  { slug: "medical-report",  label: "Medical Report",   context: "Medical reports and test results are shared between practitioners via secure portals with file size limits." },
  { slug: "tax-document",    label: "Tax Document",     context: "Tax authorities and accountants exchange large document bundles. Compression keeps each file within submission limits." },
  { slug: "bank-statement",  label: "Bank Statement",   context: "Bank statements submitted for loans and rentals must be compressed to fit lender portal upload restrictions." },
];

const INDUSTRIES = [
  { slug: "healthcare",    label: "Healthcare",    context: "Healthcare organisations process patient records, insurance claims, and clinical reports — all requiring precise PDF handling." },
  { slug: "finance",       label: "Finance",       context: "Financial firms manage contracts, statements, and regulatory filings. Reliable PDF tools ensure compliance with document standards." },
  { slug: "legal",         label: "Legal",         context: "Law firms handle briefs, contracts, and court documents. Organised, compressed PDFs meet strict court submission requirements." },
  { slug: "education",     label: "Education",     context: "Schools and universities manage transcripts, lesson materials, and research papers requiring free, accessible PDF tools." },
  { slug: "real-estate",   label: "Real Estate",   context: "Property professionals merge listing agreements, contracts, and inspection reports into client-ready PDF packages daily." },
  { slug: "government",    label: "Government",    context: "Government agencies enforce strict file-size limits on citizen submissions. Compliant PDFs ensure forms are accepted first time." },
  { slug: "retail",        label: "Retail",        context: "Retailers manage invoices, supplier contracts, and product catalogs. PDF tools help organise documents across supply chains." },
  { slug: "manufacturing", label: "Manufacturing", context: "Manufacturers share technical specifications, safety data sheets, and compliance reports as PDFs with suppliers and regulators." },
  { slug: "technology",    label: "Technology",    context: "Tech teams document APIs, share design specs, and archive release notes. Clean, compressed PDFs improve knowledge management." },
  { slug: "hospitality",   label: "Hospitality",   context: "Hotels and restaurants manage menus, booking confirmations, and supplier contracts requiring lightweight, shareable PDFs." },
];

const SPLIT_USE_CASES = [
  { slug: "chapters",       label: "Chapters",       context: "Splitting a textbook or manual by chapter creates individually shareable sections for students or team members." },
  { slug: "sharing",        label: "Sharing",         context: "Large PDFs are difficult to share via email. Splitting into sections keeps each part under email attachment limits." },
  { slug: "printing",       label: "Printing",        context: "Splitting before printing lets you print only the pages you need, saving paper and toner." },
  { slug: "archiving",      label: "Archiving",       context: "Breaking a large document into logical sections makes long-term digital archiving more organised and searchable." },
  { slug: "distribution",   label: "Distribution",    context: "Distribute only the relevant section of a report or manual to each recipient rather than the full document." },
  { slug: "emailing",       label: "Emailing",        context: "Split a large PDF into parts small enough to attach to emails without hitting the 10MB or 25MB attachment limit." },
  { slug: "collaboration",  label: "Collaboration",   context: "Split documents by section so multiple team members can review and annotate their assigned portions simultaneously." },
  { slug: "review",         label: "Review",          context: "Send specific pages to reviewers rather than an entire document, speeding up the feedback cycle." },
  { slug: "billing",        label: "Billing",         context: "Extract individual invoices from a combined monthly statement PDF for accurate per-client billing records." },
  { slug: "compliance",     label: "Compliance",      context: "Regulatory compliance often requires specific sections of a document to be filed separately with different agencies." },
];

const FORMATS_TO_PDF = [
  { slug: "bmp",    label: "BMP",     ext: ".bmp",   description: "Bitmap image files from older Windows systems" },
  { slug: "gif",    label: "GIF",     ext: ".gif",   description: "Animated or static GIF images from the web" },
  { slug: "tiff",   label: "TIFF",    ext: ".tiff",  description: "High-resolution TIFF images from scanners and cameras" },
  { slug: "webp",   label: "WebP",    ext: ".webp",  description: "Modern WebP images from websites and Chrome screenshots" },
  { slug: "svg",    label: "SVG",     ext: ".svg",   description: "Scalable vector graphics from design tools like Figma or Illustrator" },
  { slug: "txt",    label: "TXT",     ext: ".txt",   description: "Plain text files from Notepad or any text editor" },
  { slug: "rtf",    label: "RTF",     ext: ".rtf",   description: "Rich Text Format documents compatible with all word processors" },
  { slug: "odt",    label: "ODT",     ext: ".odt",   description: "OpenDocument Text files from LibreOffice or Google Docs" },
  { slug: "csv",    label: "CSV",     ext: ".csv",   description: "Comma-separated spreadsheet data from any data source" },
  { slug: "epub",   label: "EPUB",    ext: ".epub",  description: "eBook files from Kindle, Calibre, or online libraries" },
  { slug: "xps",    label: "XPS",     ext: ".xps",   description: "XPS documents generated by Windows Print to XPS" },
  { slug: "pages",  label: "Pages",   ext: ".pages", description: "Apple Pages documents created on Mac or iPad" },
  { slug: "key",    label: "Keynote", ext: ".key",   description: "Apple Keynote presentations from Mac users" },
  { slug: "numbers","label":"Numbers",ext: ".numbers","description":"Apple Numbers spreadsheets from Mac or iPad" },
  { slug: "md",     label: "Markdown",ext: ".md",    description: "Markdown files from documentation, GitHub READMEs, or Notion exports" },
];

const PDF_TO_FORMATS = [
  { slug: "epub",     label: "EPUB",     ext: ".epub",     description: "readable on Kindle, Kobo, Apple Books, and any e-reader" },
  { slug: "html",     label: "HTML",     ext: ".html",     description: "viewable in any web browser without a PDF reader" },
  { slug: "txt",      label: "TXT",      ext: ".txt",      description: "pure plain text for editing in Notepad, scripts, or databases" },
  { slug: "rtf",      label: "RTF",      ext: ".rtf",      description: "editable in any word processor including older versions of Microsoft Word" },
  { slug: "odt",      label: "ODT",      ext: ".odt",      description: "editable in LibreOffice, OpenOffice, and Google Docs" },
  { slug: "svg",      label: "SVG",      ext: ".svg",      description: "scalable vector that can be edited in Figma, Illustrator, or Inkscape" },
  { slug: "gif",      label: "GIF",      ext: ".gif",      description: "shareable on messaging apps and websites" },
  { slug: "bmp",      label: "BMP",      ext: ".bmp",      description: "uncompressed bitmap for legacy systems and Windows applications" },
  { slug: "tiff",     label: "TIFF",     ext: ".tiff",     description: "high-quality archival images for printing and scanning workflows" },
  { slug: "csv",      label: "CSV",      ext: ".csv",      description: "directly importable into Excel, Google Sheets, or any database" },
  { slug: "markdown", label: "Markdown", ext: ".md",       description: "ideal for documentation, GitHub, Notion, or static site generators" },
];

const MERGE_COUNTS = [2,3,4,5,6,7,8,9,10,12,15,20,25,30,50];
const SPLIT_INTO_COUNTS = [2,3,4,5,6,7,8,9,10,12,15,20,25];
const SPLIT_EVERY_COUNTS = [1,2,3,4,5,6,7,8,9,10,15,20];
const EXTRACT_N_COUNTS = [1,2,3,4,5,6,7,8,9,10,15,20];

const EXISTING_SLUGS = new Set([
  "compress-pdf-for-email","compress-pdf-for-whatsapp","compress-pdf-mobile",
  "compress-pdf-to-1mb","compress-pdf-to-300kb","compress-pdf-to-50kb",
  "compress-pdf-under-100kb","compress-pdf-without-losing-quality",
  "reduce-pdf-size-to-200kb","make-pdf-smaller-for-email",
  "merge-pdf-for-immigration","merge-pdf-for-job-application","merge-pdf-for-visa-application",
  "merge-pdf-free-no-limit","merge-pdf-two-files",
  "split-pdf-by-pages","split-pdf-by-size","split-pdf-into-single-pages",
  "add-page-numbers-to-pdf-automatically","add-page-numbers-to-pdf-free",
  "add-signature-to-pdf-free","add-watermark-to-pdf-free",
  "annotate-pdf-highlight-text-free","compress-jpg-png-image-online",
  "convert-docx-to-pdf-keep-formatting","convert-excel-to-pdf-free",
  "convert-html-webpage-to-pdf","convert-image-to-pdf-free",
  "convert-jpg-to-pdf-free-online","convert-jpg-to-pdf-multiple",
  "convert-multiple-images-to-one-pdf","convert-pdf-to-excel-with-tables",
  "convert-pdf-to-jpg-all-pages","convert-pdf-to-png-high-resolution",
  "convert-pdf-to-powerpoint-free","convert-pdf-to-word-free-online",
  "convert-pdf-to-word-without-losing-formatting","convert-scanned-pdf-to-word-editable",
  "convert-word-to-pdf-free-online","crop-pdf-margins-free-online",
  "delete-pages-from-pdf","edit-pdf-text-online-free","edit-pdf-without-adobe-acrobat",
  "extract-pages-from-pdf","extract-tables-from-pdf-to-spreadsheet",
  "flatten-pdf-for-printing","grayscale-pdf-free-online",
  "ocr-pdf-online-free","pdf-editor-free-without-watermark","pdf-to-excel-free-online",
  "pdf-to-jpg-high-quality","pdf-to-jpg-online-free-high-quality","pdf-to-png-all-pages-free",
  "pdf-to-powerpoint-online-free","pdf-to-word-editable-free","pdf-to-word-for-resume",
  "pdf-viewer-online-free","protect-pdf-with-password-256bit","protect-pdf-with-password-free",
  "rearrange-pdf-pages-free","redact-pdf-black-out-text","remove-pages-from-pdf",
  "remove-password-from-pdf","resize-pdf-to-a4-free","rotate-pdf-and-save",
  "rotate-pdf-free-online","sign-pdf-online-free-no-signup","unlock-pdf-for-editing",
  "unlock-pdf-remove-password-online","watermark-pdf-free-online","word-to-pdf-free-online",
]);

function page(slug: string, title: string, h1: string, description: string, toolPath: string, toolName: string, content: string, useCases: string[], faqs: { question: string; answer: string }[]): ProgrammaticPage {
  return { slug, title, h1, description, toolPath, toolName, content, useCases, faqs };
}

function skip(slug: string) { return EXISTING_SLUGS.has(slug); }

// ─── Generator functions ──────────────────────────────────────────────────────

function genCompressSizePages(): ProgrammaticPage[] {
  const results: ProgrammaticPage[] = [];
  for (const s of SIZES) {
    // compress-pdf-to-{size}
    const slug1 = `compress-pdf-to-${s.slug}`;
    if (!skip(slug1)) results.push(page(
      slug1,
      `Compress PDF to ${s.label} Free Online | PDF HUB 24`,
      `Compress PDF to ${s.label} Free Online`,
      `Reduce your PDF file size to ${s.label} or less online, free. No signup, no watermark. Perfect for upload limits requiring files under ${s.label}.`,
      "/compress-pdf", "Compress PDF",
      `Reaching a ${s.label} file size is a specific technical requirement for many online portals, email servers, and document management systems. A ${s.label} PDF represents a ${s.example} — and our free tool helps you get there without sacrificing readability.

To compress a PDF to ${s.label}, upload your file using our Compress PDF tool and select the appropriate compression level. Text-only documents respond best to medium compression and often reach ${s.label} easily. Image-heavy files may need high compression combined with the grayscale conversion step for maximum size reduction.

If your document still exceeds ${s.label} after a single compression pass, try this workflow: first remove any unnecessary pages using Delete Pages, then convert colour images to grayscale, and finally apply maximum compression. This three-step process achieves the smallest possible file size while keeping text crisp and readable.

Remember that file size depends on content complexity. A ${s.label} target is achievable for most documents when you approach it systematically rather than applying a single compression setting and hoping for the best.`,
      [
        `Upload portals requiring files under ${s.label}`,
        `Email systems with ${s.label} attachment limits`,
        `Online forms that reject large file uploads`,
        `Mobile apps with tight storage constraints`,
        `Government and institutional document portals`,
      ],
      [
        { question: `Can I really compress a PDF to ${s.label}?`, answer: `For most text-based documents, ${s.label} is achievable. Image-heavy files may need additional steps like grayscale conversion or page removal alongside compression to reach ${s.label}.` },
        { question: "Is my original file affected?", answer: "No. We always work on a copy. Your original file is never modified, and processed files are deleted from our servers within 1 hour." },
        { question: `What if my PDF is still over ${s.label} after compression?`, answer: `Try removing unnecessary pages first, then converting colour content to grayscale, then compressing again. This three-step approach achieves the smallest possible file size.` },
      ]
    ));

    // compress-pdf-under-{size}
    const slug2 = `compress-pdf-under-${s.slug}`;
    if (!skip(slug2)) results.push(page(
      slug2,
      `Compress PDF Under ${s.label} Free Online | PDF HUB 24`,
      `Compress PDF to Under ${s.label} Instantly`,
      `Compress PDF files to under ${s.label} free online. Meet strict upload size limits for portals, email, and applications. No signup needed.`,
      "/compress-pdf", "Compress PDF",
      `Many document submission systems reject files at exactly ${s.label} — meaning you need to stay strictly under this limit. Our compression tool gives you fine-grained control over the output size so you can confidently submit documents without getting an error.

The most common reason a PDF exceeds ${s.label} is embedded images. Every scanned page, photo, chart, or screenshot adds significant file size. Our high-compression mode reduces image resolution to the minimum acceptable for screen viewing, typically reducing file size by 60–90% compared to the original.

For documents that are already text-only, medium compression usually achieves files well under ${s.label} in a single step. For mixed documents, combine compression with the optional grayscale conversion for maximum size reduction.

Always check the compressed file by opening it before submitting — text should remain sharp and readable even at aggressive compression settings.`,
      [
        `Staying under portal size limits with a safety margin`,
        `Compressing before emailing to avoid bounce-backs`,
        `Fitting within LMS or university submission limits`,
        `Uploading to compliance and legal archiving systems`,
        `Sharing via messaging apps with file size restrictions`,
      ],
      [
        { question: `How do I get my PDF strictly under ${s.label}?`, answer: `Use our high compression setting. If the result is close, also convert images to grayscale. For text documents, medium compression is usually sufficient.` },
        { question: "Will text be readable at this size?", answer: "Text in PDFs is vector-based and remains perfectly sharp regardless of compression level. Only embedded images may show slight softening." },
        { question: "How many files can I compress at once?", answer: "You can compress files one at a time for free. Each processed file is kept for 1 hour then automatically deleted for your privacy." },
      ]
    ));

    // reduce-pdf-size-to-{size}
    const slug3 = `reduce-pdf-size-to-${s.slug}`;
    if (!skip(slug3)) results.push(page(
      slug3,
      `Reduce PDF Size to ${s.label} Free | PDF HUB 24`,
      `Reduce PDF File Size to ${s.label} Free`,
      `Reduce PDF file size to ${s.label} online free. Fast compression with quality options. No sign up required. Works on any device.`,
      "/compress-pdf", "Compress PDF",
      `Reducing a PDF to exactly ${s.label} is a common requirement across government portals, job application systems, insurance platforms, and cloud storage services. Our free tool handles this precisely, giving you a file that's within your target size without visible quality loss for text content.

The secret to reliable PDF size reduction is understanding what makes your file large in the first place. Scanned images are the biggest culprit — a single scanned A4 page at 300 DPI can exceed 500KB on its own. Our compressor reduces image DPI to the optimal level for screen viewing while keeping text extracted at full quality.

For a ${s.example}, you can typically achieve a ${s.label} result with medium compression in a single pass. For larger or more complex documents, use our three-step workflow: delete unnecessary pages, convert to grayscale, then compress with high settings.`,
      [
        `Reducing file size before uploading to any online form`,
        `Shrinking PDFs for sharing via mobile messaging apps`,
        `Meeting submission requirements for job or visa portals`,
        `Compressing scanned documents from physical paperwork`,
        `Preparing digital archives with consistent file sizes`,
      ],
      [
        { question: `What's the smallest size I can reduce a PDF to?`, answer: `For text-only documents, compression can reduce size by over 90%. For scanned image documents, combining high compression with grayscale conversion typically achieves 70–85% reduction.` },
        { question: "Does reducing PDF size affect print quality?", answer: "For standard office printing, no. Text remains sharp. High-quality photo printing from a heavily compressed PDF may show slight image softening, but it's rarely noticeable." },
        { question: "Is this tool safe for confidential documents?", answer: "Files are processed locally in your browser when possible, and any server-side processing deletes files within 1 hour. We do not access or store your document content." },
      ]
    ));
  }
  return results;
}

function genCompressUseCasePages(): ProgrammaticPage[] {
  return COMPRESS_USE_CASES.filter(u => !skip(`compress-pdf-for-${u.slug}`)).map(u => page(
    `compress-pdf-for-${u.slug}`,
    `Compress PDF for ${u.label} Free Online | PDF HUB 24`,
    `Compress PDF for ${u.label} — Free & Instant`,
    `Compress your PDF for ${u.label} online free. No signup, no watermark. Get your file within the required size limit in seconds.`,
    "/compress-pdf", "Compress PDF",
    `${u.context}

Our free PDF compressor handles ${u.label} requirements precisely. Simply upload your document, choose your compression level, and download the result. Three compression levels give you flexibility: low for minimal quality trade-off, medium for balanced results, and high for maximum size reduction.

For documents destined for ${u.label}, we recommend the medium compression setting as a starting point. This typically reduces file size by 60–70% while keeping all text perfectly readable and images sharp enough for screen viewing. If the result is still too large, switch to high compression or consider removing unnecessary pages first.

One important tip: always preview your compressed PDF before submitting or sharing. Open it in your browser or PDF viewer to confirm text is clear, images are acceptable, and all pages are present. Our compression never removes pages or alters content — only adjusts the image quality and encoding of your document.`,
    [
      `Preparing documents specifically for ${u.label} upload requirements`,
      `Ensuring fast delivery and acceptance by the ${u.label} platform`,
      `Avoiding file rejection errors caused by size limit violations`,
      `Sharing professional documents without long download wait times`,
      `Reducing bandwidth usage when many recipients access the same file`,
    ],
    [
      { question: `Why do I need to compress PDFs for ${u.label}?`, answer: `${u.context}` },
      { question: "How small can I compress my PDF?", answer: "For text-heavy documents, compression can reduce file size by 90% or more. Image-heavy PDFs typically compress by 60–80%. Combining compression with grayscale conversion achieves the smallest possible sizes." },
      { question: "Is the compression free?", answer: "Completely free — no signup, no watermark, no file count limit per session. Simply upload, compress, and download." },
    ]
  ));
}

function genCompressPlatformPages(): ProgrammaticPage[] {
  const platforms = [
    { slug: "windows", label: "Windows", detail: "Windows users can use this tool directly in Edge, Chrome, or Firefox — no installation required." },
    { slug: "mac", label: "Mac", detail: "Mac users can access the tool in Safari, Chrome, or Firefox. Files are processed without any app download." },
    { slug: "linux", label: "Linux", detail: "Linux users can compress PDFs directly in Firefox or Chrome with no installation or command-line tools required." },
    { slug: "iphone", label: "iPhone", detail: "iPhone users can compress PDFs in Safari or Chrome mobile. Use the Share button to open compressed files in Files or Mail." },
    { slug: "android", label: "Android", detail: "Android users can compress PDFs in Chrome or Samsung Internet. Files download directly to Downloads or Drive." },
    { slug: "ipad", label: "iPad", detail: "iPad users can compress PDFs in Safari. The full desktop experience works on iPad with no limitations." },
    { slug: "chromebook", label: "Chromebook", detail: "Chromebook users can use this tool in Chrome OS — no Linux environment or extensions needed." },
    { slug: "browser", label: "Browser", detail: "Works in any modern browser including Chrome, Firefox, Edge, Safari, and Opera — no software to install." },
  ];
  return platforms.filter(p => !skip(`compress-pdf-on-${p.slug}`)).map(p => page(
    `compress-pdf-on-${p.slug}`,
    `Compress PDF on ${p.label} Free | PDF HUB 24`,
    `Compress PDF on ${p.label} — Free & Instant`,
    `Compress PDF on ${p.label} free online. No app or software installation needed. Works entirely in your ${p.label} browser.`,
    "/compress-pdf", "Compress PDF",
    `${p.detail} This makes PDF compression accessible on ${p.label} without purchasing or installing dedicated software.

To compress a PDF on ${p.label}: open this page in your browser, click the upload area to select your PDF, choose a compression level (medium is recommended for most use cases), and click Compress. Within seconds your compressed file is ready to download.

This approach is ideal for ${p.label} users who need occasional PDF compression without committing to a subscription service. The tool handles files of any size and returns the compressed version typically 3–10× smaller than the original.

Security on ${p.label} is handled identically to desktop: your files are never stored permanently, and all connections use HTTPS encryption. Compressed files are automatically deleted from temporary servers within 1 hour of processing.`,
    [
      `Compressing PDFs on ${p.label} without installing software`,
      `Meeting email attachment size limits on ${p.label} devices`,
      `Uploading compressed documents to web portals from ${p.label}`,
      `Sharing smaller PDF files via messaging apps on ${p.label}`,
      `Reducing PDF file sizes when working remotely on ${p.label}`,
    ],
    [
      { question: `Does PDF compression work on ${p.label}?`, answer: `Our web-based tool works fully in any modern browser on ${p.label}. No app download, plugin, or software installation is required.` },
      { question: "What file size limit applies?", answer: "You can compress PDFs of any size. Very large files (100MB+) may take slightly longer to process but are fully supported." },
      { question: "Are my files safe on this device?", answer: "All processing happens over HTTPS, and files are permanently deleted from our servers within 1 hour. Nothing is saved or shared." },
    ]
  ));
}

function genCompressProfessionPages(): ProgrammaticPage[] {
  return PROFESSIONS.filter(pr => !skip(`compress-pdf-for-${pr.slug}`)).map(pr => page(
    `compress-pdf-for-${pr.slug}`,
    `Compress PDF for ${pr.label} Free | PDF HUB 24`,
    `Free PDF Compression for ${pr.label}`,
    `PDF compression tool built for ${pr.label}. Compress documents for portals, email, and sharing — free, no signup, no watermark.`,
    "/compress-pdf", "Compress PDF",
    `${pr.context}

${pr.label} benefit most from a fast, no-registration compression tool that handles the range of documents they work with: multi-page reports, scanned forms, image-rich presentations, and dense text documents. Our tool handles all of these with appropriate compression per content type.

For typical ${pr.label} workflows, medium compression strikes the right balance — it reduces file size by 60–75% while keeping text perfectly legible and images sharp enough for professional sharing. High compression is available when a specific size limit must be met, such as for government portal submissions or email attachment caps.

No account, no credit card, and no software installation is needed. ${pr.label} can bookmark this page and return whenever they need to compress a document, completely free of charge.`,
    [
      `Compressing professional documents for secure email delivery`,
      `Meeting upload size limits on specialist ${pr.label} portals`,
      `Reducing PDF file sizes for cloud storage and archiving`,
      `Preparing compressed documents for client or colleague sharing`,
      `Batch processing multiple documents efficiently from any device`,
    ],
    [
      { question: `Is this tool safe for sensitive documents used by ${pr.label}?`, answer: "Files are deleted within 1 hour of processing, connections are HTTPS-encrypted, and we do not access or store document content." },
      { question: "Can I compress multiple documents in a session?", answer: "You can compress as many files as you need in a single session. Each file is processed separately and independently." },
      { question: "Will compression affect document quality for professional use?", answer: "Text remains perfectly sharp at all compression levels. Images may show slight softening at high compression, but remain professional quality for screen viewing and standard printing." },
    ]
  ));
}

function genMergeCountPages(): ProgrammaticPage[] {
  const results: ProgrammaticPage[] = [];
  for (const n of MERGE_COUNTS) {
    const nLabel = n === 2 ? "Two" : n === 3 ? "Three" : n.toString();
    const slug1 = `merge-${n}-pdf-files`;
    if (!skip(slug1)) results.push(page(
      slug1,
      `Merge ${nLabel} PDF Files Free Online | PDF HUB 24`,
      `Merge ${nLabel} PDF Files Into One`,
      `Merge exactly ${n} PDF files into one document online, free. Drag to reorder pages, then download your combined PDF. No signup needed.`,
      "/merge-pdf", "Merge PDF",
      `Combining exactly ${n} PDF files into a single document is a common task for organising reports, assembling application packages, or creating a unified reference file. Our free tool handles this in three simple steps: upload your ${n} files, arrange them in the correct order, and download the merged PDF.

Page order matters when merging ${n} PDFs. Our drag-and-drop interface lets you arrange files or individual pages before merging, ensuring the final document follows the logical sequence you intend. You can also preview each document before merging to confirm the right files are selected.

The resulting merged PDF maintains the original formatting, fonts, images, and layout of all ${n} source files. There is no degradation in quality and no watermark added. The merged file is typically the sum of the individual file sizes, reduced slightly by removing redundant metadata.

For recurring workflows that require merging ${n} PDFs regularly, bookmark this page — it works on any device with a modern browser, no software installation required.`,
      [
        `Assembling ${n}-part application packages for visa, job, or university submissions`,
        `Combining ${n} monthly reports into a single quarterly or annual document`,
        `Merging ${n} contract sections into one signed, paginated agreement`,
        `Uniting ${n} scanned documents into a single organised archive file`,
        `Creating a unified reference document from ${n} separate source files`,
      ],
      [
        { question: `Can I really merge exactly ${n} PDFs into one?`, answer: `${faqYes(n % 6)} upload your ${n} files, arrange them in order, and click Merge. The result is a single PDF containing all pages from all ${n} documents.` },
        { question: "Is there a page limit?", answer: "No. You can merge PDFs of any length. The resulting document contains all pages from all input files." },
        { question: "Will my merged PDF have a watermark?", answer: "No. PDF HUB 24 never adds watermarks to merged documents. The result is a clean, professional PDF." },
      ]
    ));

    const slug2 = `combine-${n}-pdf-files`;
    if (!skip(slug2)) results.push(page(
      slug2,
      `Combine ${nLabel} PDF Files Free Online | PDF HUB 24`,
      `Combine ${nLabel} PDFs Into One Document`,
      `Combine ${n} PDF files into a single document free online. Fast, easy, no signup. Drag to reorder, then download your combined PDF.`,
      "/merge-pdf", "Merge PDF",
      `Combining ${n} PDF documents is straightforward with our free tool. Whether you're assembling a multi-part submission, creating a comprehensive reference document, or simply organising related files, merging ${n} PDFs takes under a minute.

Upload your ${n} files in any order — you can rearrange them in the interface before combining. Our tool preserves the complete content of each file, including all text, images, links, and formatting. The output is a standard PDF compatible with Adobe Reader, Mac Preview, Google Chrome, and every other PDF viewer.

Unlike many free online tools, we don't limit the number of pages in your source files or add any watermark to the result. Your combined ${n}-file PDF is yours completely, with no strings attached.`,
      [
        `Combining ${n} chapters of a book or manual into one PDF`,
        `Assembling ${n} project documents for client delivery`,
        `Uniting ${n} scanned pages into a single digital archive`,
        `Merging ${n} form pages into one submission-ready document`,
        `Creating one PDF from ${n} separate export files`,
      ],
      [
        { question: `How do I combine ${n} PDFs into one?`, answer: `Click the upload area, select your ${n} PDF files, arrange them in order by dragging, then click Combine. Download the resulting single PDF.` },
        { question: "Does combining PDFs reduce quality?", answer: "No. The original quality of all pages is preserved exactly. Combining does not re-compress or re-encode any content." },
        { question: "What's the maximum file size I can combine?", answer: "There is no hard limit. Very large files may take slightly longer to process, but all file sizes are supported." },
      ]
    ));
  }
  return results;
}

function genMergeUseCasePages(): ProgrammaticPage[] {
  const results: ProgrammaticPage[] = [];
  for (const u of MERGE_USE_CASES) {
    const s1 = `merge-pdf-for-${u.slug}`;
    if (!skip(s1)) results.push(page(
      s1,
      `Merge PDF for ${u.label} Free Online | PDF HUB 24`,
      `Merge PDF Documents for ${u.label}`,
      `Merge PDF files for ${u.label} online free. Combine multiple documents into one organised PDF. No signup, no watermark, instant download.`,
      "/merge-pdf", "Merge PDF",
      `${u.context}

To merge PDFs for ${u.label}: upload all your documents, arrange them in the correct order using drag-and-drop, then click Merge. The result is a single, professionally paginated PDF ready for submission or delivery.

Presentation matters in ${u.label} contexts. A well-organised, single PDF with consistent pagination makes a better impression than a zip file of separate documents and is easier for recipients to review. Our merge tool also lets you reorder individual pages within the merged document for complete control over the final layout.

No registration is required. Your documents are never shared with third parties, and merged files are automatically deleted from temporary servers within 1 hour of processing.`,
      [
        `Preparing a complete ${u.label} document package in one organised PDF`,
        `Combining supporting evidence and forms for ${u.label} submissions`,
        `Creating a single paginated file from multiple document sources`,
        `Assembling all required attachments in the correct sequence`,
        `Ensuring professional presentation for reviewers and decision-makers`,
      ],
      [
        { question: `What documents should I include when merging for ${u.label}?`, answer: `${u.context} Include all required forms, supporting evidence, and identification documents in the order specified by the receiving authority.` },
        { question: "Can I rearrange pages after merging?", answer: "After merging, you can use our Reorder Pages tool to fine-tune the page sequence before downloading your final document." },
        { question: "Is the merge free?", answer: "Completely free — no account, no watermark, no file count limit. Merge as many documents as your submission requires." },
      ]
    ));

    const s2 = `combine-pdf-for-${u.slug}`;
    if (!skip(s2)) results.push(page(
      s2,
      `Combine PDF for ${u.label} Free | PDF HUB 24`,
      `Combine PDFs for ${u.label} — Free & Instant`,
      `Combine multiple PDF files into one organised document for ${u.label}. Free online tool, no signup required, instant download.`,
      "/merge-pdf", "Merge PDF",
      `${u.context}

Combining PDFs specifically for ${u.label} purposes means getting the order and completeness right the first time. Our tool gives you full control: upload in any order, drag files or pages into the correct sequence, preview before merging, and download a polished single PDF.

Many ${u.label} processes have strict requirements about document order. Organise your files according to the checklist or instructions provided, then combine them in that exact sequence. The final PDF will have continuous page numbering and a clean, professional appearance.`,
      [
        `Combining all ${u.label} documents into one organised submission`,
        `Ensuring correct document order before submitting to reviewers`,
        `Reducing the number of attachments from multiple files to one`,
        `Meeting the requirement for a single PDF submission format`,
        `Creating a professional, easy-to-review ${u.label} document package`,
      ],
      [
        { question: `How do I combine PDFs for ${u.label}?`, answer: "Upload all your documents, arrange them using drag-and-drop in the required order, then click Combine and download the result." },
        { question: "Is there a limit to how many PDFs I can combine?", answer: "No. You can combine as many PDFs as your submission requires. Upload all files at once or add them one by one." },
        { question: "Will the combined PDF show a watermark?", answer: "Never. PDF HUB 24 does not add any watermarks or branding to combined documents." },
      ]
    ));
  }
  return results;
}

function genMergeProfessionPages(): ProgrammaticPage[] {
  return PROFESSIONS.filter(pr => !skip(`merge-pdf-for-${pr.slug}`)).map(pr => page(
    `merge-pdf-for-${pr.slug}`,
    `Merge PDF for ${pr.label} Free | PDF HUB 24`,
    `Merge PDF for ${pr.label} — Free Online Tool`,
    `Merge PDF files for ${pr.label} free online. Combine reports, documents, and case files into one organised PDF. No signup required.`,
    "/merge-pdf", "Merge PDF",
    `${pr.context}

For ${pr.label}, merging PDFs often means combining documents from different sources — forms, supporting evidence, identification, and signed agreements — into a single coherent package. Our tool handles this precisely, giving you full control over the order and composition of the final document.

The drag-and-drop interface is fast and intuitive, making it easy to organise complex multi-document packages. Reorder individual pages if needed, remove any accidentally included files, and preview the arrangement before generating the final merged PDF.

All merged documents are automatically deleted from our servers within 1 hour. No account is needed, and your documents are never shared with third parties.`,
    [
      `Combining multiple ${pr.label} case files or project documents into one PDF`,
      `Assembling complete document packages for review or submission`,
      `Merging scanned originals with digital forms and signed agreements`,
      `Creating unified reference files from multiple source documents`,
      `Organising client or patient document bundles professionally`,
    ],
    [
      { question: `How do ${pr.label} use the merge tool most effectively?`, answer: `Upload all required documents, arrange them in the logical or required sequence, then merge. For large packages, split the merge into thematic sections first if needed.` },
      { question: "Can I merge password-protected PDFs?", answer: "You'll need to unlock the PDFs first using our Unlock PDF tool, then merge the unlocked versions." },
      { question: "Is this tool secure for professional documents?", answer: "All connections are HTTPS encrypted, and files are permanently deleted within 1 hour of processing." },
    ]
  ));
}

function genSplitPages(): ProgrammaticPage[] {
  const results: ProgrammaticPage[] = [];

  for (const n of SPLIT_INTO_COUNTS) {
    const slug = `split-pdf-into-${n}-parts`;
    if (!skip(slug)) results.push(page(
      slug,
      `Split PDF Into ${n} Parts Free Online | PDF HUB 24`,
      `Split PDF Into ${n} Equal Parts Free`,
      `Split a PDF into ${n} parts online free. Divide your document evenly or by custom page ranges. No signup, instant download.`,
      "/split-pdf", "Split PDF",
      `Splitting a PDF into exactly ${n} parts is useful for distributing a document to ${n} reviewers, creating ${n} chapter files from a complete manual, or dividing a large submission into ${n} upload-sized pieces.

Our split tool offers two approaches: split evenly (our tool automatically calculates which pages go into each of the ${n} parts) or split by custom page ranges (you specify exactly which pages each part contains). Both options result in ${n} separate downloadable PDF files.

Even splitting is ideal when all ${n} recipients need an equal portion of the document. Custom ranges are better when the document has natural divisions — such as chapters, sections, or date ranges — that don't fall on evenly spaced page numbers.

All ${n} output files maintain the original quality, formatting, and any embedded links from the source document.`,
      [
        `Dividing a document into ${n} sections for separate review or editing`,
        `Creating ${n} chapter files from a complete book or manual`,
        `Splitting a large PDF into ${n} email-sized attachments`,
        `Distributing ${n} non-overlapping portions of a document to ${n} teams`,
        `Breaking a merged document back into its original ${n} component files`,
      ],
      [
        { question: `How does the split-into-${n} feature work?`, answer: `Upload your PDF, specify that you want ${n} equal parts (or define custom page ranges for each part), and our tool creates ${n} separate downloadable PDFs.` },
        { question: "Are all my pages included in the output?", answer: "Every page from the original document appears in one of the output parts. No pages are lost or omitted." },
        { question: "Can I split a PDF into unequal parts?", answer: "The custom page range mode lets you assign any number of pages to each part. The ranges don't need to be equal." },
      ]
    ));
  }

  for (const n of SPLIT_EVERY_COUNTS) {
    const slug = `split-pdf-every-${n}-pages`;
    if (!skip(slug)) results.push(page(
      slug,
      `Split PDF Every ${n} Page${n > 1 ? "s" : ""} Free Online | PDF HUB 24`,
      `Split PDF Every ${n} Page${n > 1 ? "s" : ""} — Free & Instant`,
      `Split a PDF into separate ${n}-page documents online free. Each output file contains exactly ${n} pages. No signup required.`,
      "/split-pdf", "Split PDF",
      `Splitting a PDF every ${n} page${n > 1 ? "s" : ""} creates a series of ${n}-page documents from a longer file. This is useful for creating standardised ${n}-page handout packets, extracting ${n}-page invoice batches, or dividing a scanned multi-form document where each form is exactly ${n} page${n > 1 ? "s" : ""} long.

After uploading your PDF and selecting the "split every ${n} page${n > 1 ? "s" : ""}" option, our tool automatically calculates how many output files to create and assigns the correct pages to each. If the total page count isn't evenly divisible by ${n}, the final output file will contain the remaining pages.

All output files are downloadable individually or as a ZIP archive, making it easy to distribute or archive the split documents. Original formatting, images, and embedded links are preserved in every output file.`,
      [
        `Splitting a form pack where each form is exactly ${n} page${n > 1 ? "s" : ""} long`,
        `Creating ${n}-page handout packets from a full course or training document`,
        `Dividing a scanned document batch into ${n}-page individual records`,
        `Extracting ${n}-page billing or invoice cycles from a combined statement`,
        `Organising a large archive into consistently sized ${n}-page chunks`,
      ],
      [
        { question: `How do I split a PDF every ${n} page${n > 1 ? "s" : ""}?`, answer: `Upload your PDF, select "Split every ${n} page${n > 1 ? "s" : ""}" from the split options, and download the resulting set of ${n}-page documents.` },
        { question: `What happens if my page count isn't a multiple of ${n}?`, answer: `The last output file will contain the remaining pages (fewer than ${n}). No pages are ever dropped or omitted.` },
        { question: "Can I download all output files at once?", answer: "After splitting, you can download all output files as a single ZIP archive for convenience." },
      ]
    ));
  }

  for (const n of EXTRACT_N_COUNTS) {
    const slug = `extract-${n}-pages-from-pdf`;
    if (!skip(slug)) results.push(page(
      slug,
      `Extract ${n} Page${n > 1 ? "s" : ""} From PDF Free | PDF HUB 24`,
      `Extract ${n} Specific Page${n > 1 ? "s" : ""} From Any PDF`,
      `Extract exactly ${n} page${n > 1 ? "s" : ""} from a PDF online free. Select specific pages and download as a new PDF. No signup needed.`,
      "/extract-pages", "Extract Pages",
      `Extracting exactly ${n} page${n > 1 ? "s" : ""} from a larger PDF lets you share or submit only the specific content needed without exposing the full document. Whether you need page ${n} of a contract, the first ${n} pages of a report, or any ${n} non-consecutive pages, our tool handles the selection precisely.

After uploading your PDF, a page thumbnail preview appears. Click to select exactly ${n} page${n > 1 ? "s" : ""} — consecutive or non-consecutive — then extract. The result is a new PDF containing only your selected page${n > 1 ? "s" : ""}, with the same quality and formatting as the original.

Common use cases for extracting ${n} page${n > 1 ? "s" : ""} include: isolating a ${n}-page executive summary from a full report, extracting ${n} specific exhibits from a legal bundle, pulling ${n} pages of data from a multi-month statement, or sharing a ${n}-page product spec from a complete catalogue.`,
      [
        `Extracting a specific ${n}-page section from a larger report`,
        `Isolating ${n} pages of evidence or exhibits from a document bundle`,
        `Pulling ${n} particular pages of data from a comprehensive document`,
        `Sharing only ${n} relevant pages without exposing the full file`,
        `Creating a ${n}-page highlight or summary from a complete document`,
      ],
      [
        { question: `How do I extract exactly ${n} page${n > 1 ? "s" : ""} from a PDF?`, answer: `Upload your PDF, select exactly ${n} page${n > 1 ? "s" : ""} from the thumbnail preview, and click Extract. A new PDF with only those pages is created.` },
        { question: "Do the extracted pages have to be consecutive?", answer: `No. You can select any ${n} pages regardless of whether they are adjacent in the document. The output preserves the order you select them.` },
        { question: "Is the original PDF modified?", answer: "No. Extraction creates a new document. Your original file is unchanged and can still be used or further processed." },
      ]
    ));
  }

  return results;
}

function genSplitUseCasePages(): ProgrammaticPage[] {
  return SPLIT_USE_CASES.filter(u => !skip(`split-pdf-for-${u.slug}`)).map(u => page(
    `split-pdf-for-${u.slug}`,
    `Split PDF for ${u.label} Free Online | PDF HUB 24`,
    `Split PDF for ${u.label} — Free & Fast`,
    `Split PDF files for ${u.label} online free. Divide documents into individual sections or parts. No signup, instant download.`,
    "/split-pdf", "Split PDF",
    `${u.context}

Splitting a PDF for ${u.label} purposes is straightforward with our free tool. Upload your document, choose how to split it (by page range, every N pages, or into equal parts), and download the resulting separate files. Each output retains the full quality and formatting of the original.

For ${u.label}, the most common splitting approach is by page range — defining exactly which pages form each section. This gives you precise control over the content of each output file, which is essential when documents have meaningful divisions that don't align with equal-page splits.

Download individual files or all sections at once as a ZIP archive.`,
    [
      `Splitting documents into logical sections for ${u.label}`,
      `Dividing large PDFs into manageable parts for separate handling`,
      `Creating individually shareable sections from a complete document`,
      `Reducing file size per section for easier upload and distribution`,
      `Organising split files for systematic ${u.label} workflows`,
    ],
    [
      { question: `How do I split a PDF for ${u.label}?`, answer: `Upload your PDF, choose your split method (by range, every N pages, or equal parts), then download the separate files for your ${u.label} workflow.` },
      { question: "Can I split by specific page numbers?", answer: "The custom range option lets you define exactly where each split occurs by specifying page numbers." },
      { question: "Is split PDF quality preserved?", answer: "Splitting never re-encodes or re-compresses content. All output files are identical in quality to the corresponding pages in the original." },
    ]
  ));
}

function genFormatConversionPages(): ProgrammaticPage[] {
  const results: ProgrammaticPage[] = [];

  for (const f of FORMATS_TO_PDF) {
    const slug = `${f.slug}-to-pdf-online`;
    if (!skip(slug)) results.push(page(
      slug,
      `${f.label} to PDF Online Free | PDF HUB 24`,
      `Convert ${f.label} to PDF Free Online`,
      `Convert ${f.ext} files to PDF online free. Fast, secure ${f.label}-to-PDF conversion. No signup, no watermark, instant download.`,
      "/jpg-to-pdf", "Image to PDF",
      `Converting ${f.label} files (${f.ext}) to PDF is useful when you need to share ${f.description} in a universally compatible format. PDF files open on any device without specialist software, preserve the original layout, and can be combined with other documents using our Merge PDF tool.

Our ${f.label}-to-PDF converter processes your file instantly in the browser. Upload your ${f.ext} file, adjust the page size and orientation if needed, and download the resulting PDF. The conversion preserves all visual content from the original ${f.label} file.

PDF is the standard format for professional document sharing because it looks identical on every device and operating system. Converting your ${f.label} files to PDF ensures recipients see exactly what you intended, without font substitution, layout shifts, or missing elements that can occur with other formats.`,
      [
        `Sharing ${f.description} as a universally compatible PDF`,
        `Archiving ${f.label} files in a format that opens on any device`,
        `Combining ${f.label} content with other documents using PDF Merge`,
        `Submitting ${f.label} content to portals that accept only PDF`,
        `Printing ${f.label} files with consistent results across printers`,
      ],
      [
        { question: `How do I convert ${f.label} to PDF?`, answer: `Upload your ${f.ext} file to our converter, adjust any settings, and click Convert. Download the resulting PDF instantly.` },
        { question: `Is the ${f.label} to PDF conversion free?`, answer: "Completely free — no signup, no watermark on the output, and no limit on conversions per session." },
        { question: `How is ${f.label} different from PDF?`, answer: `${f.description.charAt(0).toUpperCase() + f.description.slice(1)}. PDF is a fixed-layout format that looks identical on all devices and can combine multiple pages and document types in one file.` },
      ]
    ));
  }

  for (const f of PDF_TO_FORMATS) {
    const slug = `pdf-to-${f.slug}-online`;
    if (!skip(slug)) results.push(page(
      slug,
      `PDF to ${f.label} Free Online | PDF HUB 24`,
      `Convert PDF to ${f.label} Free Online`,
      `Convert PDF to ${f.label} (${f.ext}) online free. Fast, secure conversion without signup or watermark. Instant download.`,
      "/pdf-to-word", "Convert PDF",
      `Converting a PDF to ${f.label} gives you a file ${f.description}. This is useful when you need to repurpose PDF content in a more flexible or accessible format.

Our PDF to ${f.label} converter extracts and reformats content from your PDF file into a clean ${f.ext} output. Upload your PDF, let the converter process it, and download the result in seconds. No account or email is required.

PDF to ${f.label} conversion is particularly valuable when you need to edit content that was originally shared as a read-only PDF, import PDF data into another application, or distribute content on platforms that don't support PDF natively.`,
      [
        `Converting PDF content into a format ${f.description}`,
        `Extracting text and data from PDFs for reuse in other applications`,
        `Sharing PDF content with users who prefer or require ${f.label} format`,
        `Importing PDF data into systems that accept ${f.label} files`,
        `Creating an editable or platform-optimised version of a PDF document`,
      ],
      [
        { question: `How do I convert PDF to ${f.label}?`, answer: `Upload your PDF to our converter. The tool processes it and provides a download link for your ${f.ext} file within seconds.` },
        { question: `Is PDF to ${f.label} conversion free?`, answer: "No account, no watermark, and no limit on conversions per session. Completely free to use." },
        { question: `Does the converted ${f.label} preserve all content?`, answer: `Text and structure are preserved as accurately as the ${f.label} format allows. Complex layouts may be linearised, but all content is included.` },
      ]
    ));
  }

  return results;
}

function genProfessionToolPages(): ProgrammaticPage[] {
  const tools = [
    { prefix: "pdf-to-word-for", toolPath: "/pdf-to-word", toolName: "PDF to Word", action: "convert PDF documents to editable Word files" },
    { prefix: "sign-pdf-for", toolPath: "/sign-pdf", toolName: "Sign PDF", action: "add legally binding digital signatures to PDF documents" },
    { prefix: "protect-pdf-for", toolPath: "/protect-pdf", toolName: "Protect PDF", action: "add password protection to sensitive PDF documents" },
    { prefix: "split-pdf-for-profession", toolPath: "/split-pdf", toolName: "Split PDF", action: "divide large PDF documents into focused sections" },
    { prefix: "annotate-pdf-for", toolPath: "/annotate-pdf", toolName: "Annotate PDF", action: "add highlights, comments, and annotations to PDF documents" },
  ];

  const results: ProgrammaticPage[] = [];
  for (const t of tools) {
    for (const pr of PROFESSIONS) {
      const slug = `${t.prefix}-${pr.slug}`;
      if (skip(slug)) continue;
      results.push(page(
        slug,
        `${t.toolName} for ${pr.label} Free | PDF HUB 24`,
        `Free ${t.toolName} Tool for ${pr.label}`,
        `${t.toolName} tool for ${pr.label}. ${pr.context.split(".")[0]}. Free, no signup, no watermark.`,
        t.toolPath, t.toolName,
        `${pr.context}

For ${pr.label}, the ability to ${t.action} is an essential daily capability. Our free ${t.toolName} tool handles this without requiring software installation, subscriptions, or technical expertise.

Simply upload your PDF, use the tool's interface to complete your task, and download the result. The entire process typically takes under a minute, even for complex documents with many pages.

${pr.label} using this tool benefit from enterprise-grade processing without enterprise-grade costs. Security is maintained throughout — files are processed over HTTPS and deleted within 1 hour.`,
        [
          `${pr.label} who need to ${t.action} regularly`,
          `Professional document preparation without paid software subscriptions`,
          `Quick document processing from any device or location`,
          `Maintaining document security and privacy throughout the process`,
          `Handling occasional document tasks without installing specialist tools`,
        ],
        [
          { question: `Is this ${t.toolName} tool suitable for ${pr.label}?`, answer: `${faqYes(pr.label.length % 6)} ${pr.context} Our tool is designed for professional use with no feature restrictions or watermarks.` },
          { question: "Is the tool free for professional use?", answer: "Completely free — no account, no subscription, no per-file charge. Use it as often as you need." },
          { question: "Are documents safe when used by professionals?", answer: "All processing uses HTTPS encryption, files are never shared with third parties, and all uploads are deleted within 1 hour." },
        ]
      ));
    }
  }
  return results;
}

function genCountryPages(): ProgrammaticPage[] {
  const results: ProgrammaticPage[] = [];

  for (const c of COUNTRIES) {
    // Skip countries with near-zero PDF tool search volume
    if (NOINDEX_COUNTRY_SLUGS.has(c.slug)) continue;

    const rd = getRich(c.slug);
    const vr = slugVariant(c.slug);

    // ── compress-pdf-{country} — Portal/submission focus ───────────────────
    const s1 = `compress-pdf-${c.slug}`;
    if (!skip(s1)) {
      const compressContent = [
        // Variant 0 — Document-first
        `In ${c.label}, official submissions — including ${rd.docs} — often require PDFs under 1–5 MB. Residents of ${rd.cities} rely on our free PDF compressor daily to meet portal upload limits before submitting to ${c.portal}, without installing software or paying a subscription fee.\n\nMedium compression achieves the right balance for most government document submissions. For stricter portal limits under 500 KB, high compression combined with grayscale conversion can reduce file sizes by up to 90% while keeping text perfectly sharp and readable for reviewers.\n\n${secPara(s1, rd.compliance, c.label)}`,
        // Variant 1 — Portal-first
        `${c.portal} and other ${c.label} government platforms enforce file-size limits of 1–5 MB per document. A rejected upload means resubmission delays — a real problem when handling time-sensitive ${rd.docs}.\n\nOur free PDF compressor solves this without any software installation. Upload your document, choose a compression level, download a portal-ready file. Medium compression works for most ${c.label} document types; high compression tackles image-heavy scans. No watermark, no account, no cost.\n\n${secPara(s1, rd.compliance, c.label)}`,
        // Variant 2 — Problem-first
        `The frustration of ${rd.useCase} — only to have the portal reject your PDF for exceeding the file-size limit — is familiar to many ${c.label} residents. Our free compressor eliminates that obstacle.\n\nUpload your document — a ${rd.docs.split(",")[0].trim()} or a multi-page scanned file — choose a compression level, and download a portal-ready PDF in seconds. Three levels give you full control. Works on any device across ${rd.cities} and all of ${c.label}, no account needed.\n\n${secPara(s1, rd.compliance, c.label)}`,
        // Variant 3 — Mobile-first
        `${c.demonym} increasingly manage ${rd.docs} and other documents ${rd.mobile}, and large PDFs create real problems — slow uploads, rejected submissions, failed shares. Our free compressor is optimised for ${c.label} mobile connection speeds.\n\nOpen the tool in any browser, upload your PDF, and download a compressed file ready for ${c.portal} or any other ${c.label} platform. Three compression levels — low for maximum quality, medium for the best balance, high for the smallest file size — give you full control without installing anything.\n\n${secPara(s1, rd.compliance, c.label)}`,
      ][vr];

      results.push(page(
        s1,
        `Compress PDF Online Free — Best Tool for ${c.label} Users | PDF HUB 24`,
        `Best Free PDF Compressor for ${c.label} Users`,
        `Compress PDF online free — trusted by ${c.demonym}. Works for ${c.portal}. Meet upload limits for ${rd.docs}. No signup, no watermark.`,
        "/compress-pdf", "Compress PDF",
        compressContent,
        [
          `Compressing ${rd.docs.split(",")[0].trim()} before submitting to ${c.portal}`,
          `Meeting file-size limits on ${c.label} government and commercial portals`,
          `Sharing compressed PDFs ${rd.mobile} with ${c.label} colleagues`,
          `Reducing PDF size for cloud storage and email in ${rd.cities}`,
          `Preparing ${rd.compliance}-compliant compressed documents for ${c.label} submissions`,
        ],
        [
          { question: faqQ1(s1, c.demonym, "use this PDF compressor"), answer: `${faqYes(0)} the tool is completely free for ${c.demonym} — no signup, no watermark, and no usage limits. Accessible from ${rd.cities} and all of ${c.label}.` },
          { question: `Does the tool produce PDFs accepted by ${c.portal}?`, answer: `${faqYes(1)} our compressor outputs standard PDFs that meet the size requirements of ${c.portal}. Medium compression covers most ${c.label} portal limits; high compression handles stricter thresholds.` },
          { question: `How does PDF HUB 24 handle ${rd.compliance} data obligations?`, answer: `${faqYes(2)} files are encrypted in transit with HTTPS and permanently deleted within 1 hour. No content is retained, analysed, or shared — consistent with ${rd.compliance} requirements.` },
          ...(COUNTRY_SPECIFIC_FAQS[c.slug] || []),
        ]
      ));
    }

    // ── pdf-tools-{country} — Full tool-directory focus ────────────────────
    const s2 = `pdf-tools-${c.slug}`;
    if (!skip(s2)) {
      const tc = toolCount(s2);
      const toolsContent = [
        // Variant 0 — Tool directory angle
        `From ${rd.cities} to every corner of ${c.label}, PDF HUB 24 gives ${c.demonym} access to ${tc} — no registration, no watermarks, no hidden costs. Whether you are preparing ${rd.docs} for ${c.portal} or handling routine document tasks, the complete toolkit is permanently free.\n\nThe most-used tools among ${c.demonym}: Compress PDF (portal upload limits), Merge PDF (multi-document submissions), PDF to Word (editing official ${c.label} documents), Sign PDF (digital signatures without printing), and Protect PDF (256-bit AES encryption for sensitive ${rd.compliance}-regulated files before sharing).\n\nEvery tool runs in your browser — smartphone, tablet, or desktop — with no app download and no VPN required. ${secPara(s2, rd.compliance, c.label)}`,
        // Variant 1 — Cost-saving angle
        `An Adobe Acrobat subscription costs ${rd.currency === "GBP" ? "£" : rd.currency === "EUR" ? "€" : rd.currency === "JPY" ? "¥" : "$"}20+ per month for ${c.demonym}. PDF HUB 24 provides ${tc} — compress, merge, split, convert, sign, edit, protect — completely free, with no account required.\n\nFor ${c.portal} document workflows, the most valuable tools are Compress PDF (meeting portal upload limits), Merge PDF (combining ${rd.docs} into one submission package), and PDF to Word (turning official PDFs into editable files). Permanently free for all ${c.label} residents.\n\n${secPara(s2, rd.compliance, c.label)}`,
        // Variant 2 — Workflow angle
        `${c.label}'s document workflow — from ${rd.docs} to signed contracts and compressed portal submissions — requires a versatile PDF toolkit. ${c.demonym} handle a wide range of document tasks daily, and PDF HUB 24 provides every tool needed across ${tc}, all permanently free.\n\nUsers in ${rd.cities} and across ${c.label} consistently rely on: Compress PDF for reducing file sizes before uploading to ${c.portal}, Merge PDF for bundling multi-part applications, PDF to Word for editing scanned official documents, and Sign PDF for legally-accepted digital signatures.\n\n${secPara(s2, rd.compliance, c.label)}`,
        // Variant 3 — Speed and access angle
        `The best free PDF tools for ${c.label} — all in one place. ${tc.charAt(0).toUpperCase() + tc.slice(1)} covering everything from compression and merging to signing, protecting, and converting PDFs — no subscription, no watermarks, no signup.\n\nDocuments handled by ${c.label} residents — including ${rd.docs} — often need compression before uploading to ${c.portal}. The complete workflow — compress, merge, sign, download — takes minutes in any browser, from ${rd.cities} or anywhere in ${c.label}, on any device ${rd.mobile}.\n\n${secPara(s2, rd.compliance, c.label)}`,
      ][vr];

      results.push(page(
        s2,
        `Free PDF Tools for ${c.label} Users | PDF HUB 24`,
        `Free PDF Tools for ${c.label} — 49+ Online Tools`,
        `Complete PDF toolkit for ${c.label}. Compress, merge, split, convert, sign, and edit ${rd.docs} and more. Free, no signup, any device.`,
        "/", "PDF HUB 24",
        toolsContent,
        [
          `Accessing ${tc} for ${rd.docs} without software subscriptions in ${c.label}`,
          `Preparing ${c.portal} submissions using free online PDF tools from ${c.label}`,
          `Converting, compressing, and editing PDFs from ${rd.cities} and across ${c.label}`,
          `Handling ${rd.compliance}-compliant document workflows free of charge`,
          `Using enterprise-grade PDF tools for ${c.label} residents at no cost`,
        ],
        [
          { question: `Are all ${tc} really free for ${c.demonym}?`, answer: `${faqYes(3)} every tool is permanently free for ${c.demonym} in ${rd.cities} and across ${c.label} — no regional restrictions, no VPN, and no account required.` },
          { question: `Which PDF tools are most useful for ${c.label} government submissions?`, answer: `For ${c.portal} and other ${c.label} portals, Compress PDF, Merge PDF, and PDF to Word handle ${rd.docs} and similar documents most reliably. All are free with no usage limits.` },
          { question: `How does PDF HUB 24 protect ${rd.compliance}-regulated documents?`, answer: `${faqYes(4)} files are processed over HTTPS and permanently deleted within 1 hour — no data stored, no data shared, fully consistent with ${rd.compliance} expectations.` },
          ...(COUNTRY_SPECIFIC_FAQS[c.slug] || []),
        ]
      ));
    }

    // ── free-pdf-tools-{country} — Cost-comparison vs paid tools ──────────
    const s3 = `free-pdf-tools-${c.slug}`;
    if (!skip(s3)) {
      const tc3 = toolCount(s3);
      const freeToolsContent = [
        // Variant 0 — Comparison vs paid tools
        `Adobe Acrobat, Smallpdf, and iLovePDF all offer free tiers — but each imposes daily file limits, file-size caps, or watermarked output that make them impractical for regular ${c.label} document workflows. PDF HUB 24 provides ${tc3} with no limits, no watermarks, and no account needed — permanently free for ${c.demonym}.\n\nFrom compressing ${rd.docs} before submitting to ${c.portal}, to merging multi-part applications and converting scanned PDFs to editable Word format — every tool produces clean, watermark-free output every time. Residents of ${rd.cities} and across ${c.label} use these tools on desktop and mobile with equal reliability.\n\n${secPara(s3, rd.compliance, c.label)}`,
        // Variant 1 — Anti-paywall angle
        `${c.demonym} searching for free PDF tools online encounter the same pattern repeatedly: a free tier that limits you to 2 files per day, requires account creation, or adds watermarks to output. PDF HUB 24 is different — ${tc3} with none of those restrictions, permanently free.\n\nFor ${rd.useCase} and other common ${c.label} document tasks — including compressing ${rd.docs.split(",")[0].trim()} for ${c.portal}, merging applications, and converting scanned files — our tools deliver clean output with no artificial limits. Users in ${rd.cities} report fast processing on any connection speed.\n\n${secPara(s3, rd.compliance, c.label)}`,
        // Variant 2 — Cost-savings calculation angle
        `At ${rd.currency} 20–30 per month for Adobe Acrobat, ${c.label} residents and small businesses spend hundreds of ${rd.currency} annually on PDF software they could replace entirely with ${tc3} — all free, all browser-based, no installation required.\n\nThe tools most valued by ${c.demonym}: Compress PDF (eliminating portal rejection of ${rd.docs} due to file-size limits), Merge PDF (bundling multi-document submissions into one file), PDF to Word (editing official ${c.label} PDFs without a paid licence), and Protect PDF (256-bit AES encryption before sharing ${rd.mobile}).\n\n${secPara(s3, rd.compliance, c.label)}`,
        // Variant 3 — Permanence and trust angle
        `Free tools come and go — some become paywalled, some add watermarks after a promotional period. PDF HUB 24's ${tc3} have been free since launch and remain free. No bait-and-switch, no degraded free tier, no ${rd.currency} charges for ${c.demonym}.\n\nFor ${rd.useCase} and other ${c.label} document workflows, ${rd.docs.split(",")[0].trim()} and similar documents compress, merge, split, and convert reliably — portal-ready output every time, accessible from ${rd.cities} and all of ${c.label} on any device ${rd.mobile}.\n\n${secPara(s3, rd.compliance, c.label)}`,
      ][vr];

      results.push(page(
        s3,
        `Free PDF Tools ${c.label} — No Signup Required | PDF HUB 24`,
        `Free PDF Tools in ${c.label} — Complete Toolkit`,
        `Free PDF tools for ${c.label}. Compress ${rd.docs.split(",")[0].trim()}, merge, split, and convert PDFs. No signup, no watermark, no cost.`,
        "/", "PDF HUB 24",
        freeToolsContent,
        [
          `Free PDF compression for ${c.label} government portal submissions`,
          `Free PDF merging for ${rd.docs} applications in ${c.label}`,
          `Free PDF conversion for editing official ${c.label} documents`,
          `Free PDF signing for ${c.label} contracts and agreements`,
          `Free PDF tools with no signup or watermark for ${c.demonym}`,
        ],
        [
          { question: `Are there any free PDF tools in ${c.label} without watermarks?`, answer: `${faqYes(3)} PDF HUB 24 provides 49+ free tools for ${c.demonym} — no watermarks, no account required, no hidden fees. Accessible from ${rd.cities} and all of ${c.label}.` },
          { question: `Do these tools work for ${c.portal} document requirements?`, answer: `${faqYes(5)} our compress, merge, and convert tools produce PDFs accepted by ${c.portal} and all standard ${c.label} document portals. They handle ${rd.docs} and similar files reliably.` },
          { question: `How does PDF HUB 24 protect my ${rd.compliance}-regulated documents?`, answer: `All files are processed via HTTPS and permanently deleted within 1 hour. No data is stored, shared, or accessed — consistent with ${rd.compliance} data protection requirements.` },
          ...(COUNTRY_SPECIFIC_FAQS[c.slug] || []),
        ]
      ));
    }
  }
  return results;
}

function genDocTypePages(): ProgrammaticPage[] {
  const results: ProgrammaticPage[] = [];
  for (const d of DOC_TYPES) {
    const s1 = `compress-${d.slug}-pdf`;
    if (!skip(s1)) results.push(page(
      s1,
      `Compress ${d.label} PDF Free Online | PDF HUB 24`,
      `Compress ${d.label} PDF — Free & Instant`,
      `Compress ${d.label} PDF files online free. Reduce file size for email, upload portals, and sharing. No signup, no watermark.`,
      "/compress-pdf", "Compress PDF",
      `${d.context}

Compressing a ${d.label} PDF is straightforward: upload the file, select medium compression (which works well for most ${d.label} documents), and download the compressed version. The result is a smaller file that maintains the same professional appearance.

For ${d.label} documents specifically, text quality is paramount — our compression preserves vector text at full resolution regardless of the compression level chosen. Only embedded images are reduced in quality, and even at high compression the result is perfectly readable on screen and acceptable for printing.`,
      [
        `Reducing ${d.label} PDF size for email submission or attachment`,
        `Meeting upload size limits on portals for ${d.label} documents`,
        `Compressing ${d.label} PDFs for faster sharing via messaging apps`,
        `Archiving ${d.label} PDFs in a space-efficient compressed format`,
        `Preparing compressed ${d.label} PDFs for professional delivery`,
      ],
      [
        { question: `Will compressing my ${d.label} PDF affect its readability?`, answer: `No. Text in your ${d.label} remains perfectly sharp at all compression levels. Only images may show slight reduction in detail at high compression settings.` },
        { question: `What compression level should I use for a ${d.label}?`, answer: "Medium compression is recommended for most cases. Use high compression if the file is still too large after medium, or if images are not critical." },
        { question: `Is the compressed ${d.label} still legally valid?`, answer: "PDF compression does not alter the legal status or certified content of the document. The text, signatures, and data are unchanged." },
      ]
    ));

    const s2 = `merge-${d.slug}-pdf`;
    if (!skip(s2)) results.push(page(
      s2,
      `Merge ${d.label} PDF Files Free | PDF HUB 24`,
      `Merge ${d.label} PDFs Into One Document`,
      `Merge multiple ${d.label} PDF files into one organised document free online. No signup, no watermark, instant download.`,
      "/merge-pdf", "Merge PDF",
      `${d.context}

Merging ${d.label} PDFs combines multiple separate files into a single professionally organised document. This is useful when you have several ${d.label} documents that logically belong together — for example, multiple months of ${d.label} documents that need to be presented as a complete set.

Upload your ${d.label} PDFs, arrange them in the correct sequence using drag-and-drop, and click Merge. The result is a single PDF that maintains all original content, formatting, and page structure from each source file.`,
      [
        `Combining multiple ${d.label} PDFs into one complete submission package`,
        `Merging ${d.label} documents from different time periods into a single file`,
        `Creating a unified ${d.label} archive from separately saved files`,
        `Assembling a ${d.label} bundle for a lender, authority, or reviewer`,
        `Organising a ${d.label} collection into one navigable PDF`,
      ],
      [
        { question: `How do I merge ${d.label} PDFs into one?`, answer: `Upload all your ${d.label} PDF files, arrange them in order using drag-and-drop, then click Merge and download the combined document.` },
        { question: `Is merged ${d.label} content preserved accurately?`, answer: "Merging never alters the content of any document. Every page, number, date, and signature is preserved exactly." },
        { question: `Can I merge ${d.label} PDFs from different sources?`, answer: "PDFs from different software, scanners, or institutions can all be merged regardless of how they were originally created." },
      ]
    ));
  }
  return results;
}

function genIndustryPages(): ProgrammaticPage[] {
  const results: ProgrammaticPage[] = [];
  const tools = [
    { prefix: "compress-pdf-for", toolPath: "/compress-pdf", toolName: "Compress PDF" },
    { prefix: "merge-pdf-for", toolPath: "/merge-pdf", toolName: "Merge PDF" },
    { prefix: "split-pdf-for", toolPath: "/split-pdf", toolName: "Split PDF" },
  ];
  for (const t of tools) {
    for (const ind of INDUSTRIES) {
      const slug = `${t.prefix}-${ind.slug}-industry`;
      if (skip(slug)) continue;
      results.push(page(
        slug,
        `${t.toolName} for ${ind.label} Industry Free | PDF HUB 24`,
        `Free ${t.toolName} for the ${ind.label} Industry`,
        `${t.toolName} tool trusted by ${ind.label} professionals. Free, no signup, no watermark. Process documents securely online.`,
        t.toolPath, t.toolName,
        `${ind.context}

The ${ind.label} industry relies on precise, well-organised PDFs for daily operations. Our free ${t.toolName} tool supports ${ind.label} professionals with a reliable, no-cost solution that handles the document volumes and quality requirements of this sector.

No software installation is required — the tool works in any modern browser on desktop, tablet, or mobile. Files are processed securely and deleted within 1 hour, making it appropriate for handling sensitive ${ind.label} documents.`,
        [
          `${ind.label} professionals managing high document volumes`,
          `Processing ${ind.label} compliance and regulatory documents`,
          `Preparing ${ind.label} client or stakeholder document packages`,
          `Reducing PDF storage and transfer costs for ${ind.label} organisations`,
          `Handling ${ind.label} document workflows without paid software subscriptions`,
        ],
        [
          { question: `Is PDF HUB 24 suitable for ${ind.label} industry use?`, answer: `${faqYes(ind.label.length % 6)} ${ind.context} Our tool handles the document types and quality requirements typical of ${ind.label} professional workflows.` },
          { question: `Is the tool free for ${ind.label} organisations?`, answer: "Completely free — no subscription, no per-document charge, and no user limit. Suitable for individuals and teams." },
          { question: `How is data security handled for ${ind.label} documents?`, answer: "All processing uses HTTPS encryption. Files are never shared with third parties and are permanently deleted within 1 hour of processing." },
        ]
      ));
    }
  }
  return results;
}

function genWatermarkAnnotateSignPages(): ProgrammaticPage[] {
  const results: ProgrammaticPage[] = [];
  const wUseCases = [
    { slug: "copyright-protection", label: "Copyright Protection", context: "Protect original documents and creative works by watermarking before distribution." },
    { slug: "confidential-documents", label: "Confidential Documents", context: "Mark sensitive files as CONFIDENTIAL before sharing with limited audiences." },
    { slug: "draft-documents", label: "Draft Documents", context: "Label draft versions with DRAFT watermarks to prevent confusion with final approved versions." },
    { slug: "preview-files", label: "Preview Files", context: "Watermark preview or sample documents with SAMPLE before the final approved version is shared." },
    { slug: "business-documents", label: "Business Documents", context: "Brand business proposals, reports, and presentations with company watermarks for professionalism." },
    { slug: "legal-documents", label: "Legal Documents", context: "Mark legal documents with CLIENT COPY or READ ONLY watermarks before sharing draft versions." },
    { slug: "school-assignments", label: "School Assignments", context: "Teachers watermark student papers with grades or comments before returning digital copies." },
    { slug: "branding", label: "Branding", context: "Add company name or logo text watermarks to all outgoing documents for consistent brand identity." },
  ];
  for (const u of wUseCases) {
    const slug = `watermark-pdf-for-${u.slug}`;
    if (!skip(slug)) results.push(page(
      slug,
      `Watermark PDF for ${u.label} Free | PDF HUB 24`,
      `Add Watermark to PDF for ${u.label}`,
      `Watermark PDF files for ${u.label} online free. Add text or image watermarks with custom opacity and positioning. No signup needed.`,
      "/add-watermark", "Add Watermark",
      `${u.context}

Adding a watermark to a PDF for ${u.label} is quick and precise with our free tool. Choose from text watermarks (type your text, select font size, colour, and opacity) or image watermarks (upload your logo or signature image). Position the watermark anywhere on the page and apply to all pages or specific pages only.

The resulting watermarked PDF maintains the original quality of all content. Watermarks can be set at any opacity from barely visible to fully opaque, giving you full control over the visual impact.`,
      [`${u.label} document watermarking before distribution`, "Marking document versions with watermarks to prevent confusion", "Adding brand identity watermarks to professional documents", "Protecting sensitive content with visible deterrent watermarks", "Stamping draft, sample, or preview versions before final release"],
      [
        { question: `How do I watermark a PDF for ${u.label}?`, answer: "Upload your PDF, type your watermark text or upload an image, adjust opacity and position, then download the watermarked PDF." },
        { question: "Can I remove the watermark from the output PDF?", answer: "Our watermarks are embedded as visible elements. The text is generally removable only with advanced PDF editing tools, providing reasonable protection." },
        { question: "Can I apply the watermark to only some pages?", answer: "Apply the watermark to all pages or specify page ranges for selective watermarking." },
      ]
    ));
  }

  const signUseCases = [
    { slug: "contracts", label: "Contracts" }, { slug: "agreements", label: "Agreements" },
    { slug: "forms", label: "Forms" }, { slug: "invoices", label: "Invoices" },
    { slug: "nda", label: "NDAs" }, { slug: "employment", label: "Employment Documents" },
    { slug: "rental", label: "Rental Agreements" }, { slug: "healthcare-consent", label: "Healthcare Consent Forms" },
  ];
  for (const u of signUseCases) {
    const slug = `sign-pdf-for-${u.slug}`;
    if (!skip(slug)) results.push(page(
      slug,
      `Sign PDF ${u.label} Free Online | PDF HUB 24`,
      `Sign PDF ${u.label} Free — Digital Signature Tool`,
      `Sign PDF ${u.label} online free. Add digital signatures, initials, and dates. No signup, no watermark, legally binding.`,
      "/sign-pdf", "Sign PDF",
      `Signing PDF ${u.label} digitally is now the standard for professional and legal document workflows. Our free Sign PDF tool lets you add typed, drawn, or image-based signatures to any PDF ${u.label} in seconds.

After uploading your PDF, you can place your signature anywhere on the document, resize it, and add date stamps or initials alongside it. The signed document downloads as a standard PDF that opens correctly in all PDF viewers.

Digital signatures created through our tool are appropriate for most professional and commercial purposes. For documents requiring certified digital certificates under specific legal frameworks (e.g., eIDAS in the EU, ESIGN in the USA), consult with your legal advisor about the appropriate signature standard.`,
      [`Signing PDF ${u.label} without printing, scanning, or mailing`, `Adding digital signatures to ${u.label} for fast turnaround`, `Creating professionally signed ${u.label} from anywhere on any device`, "Completing document signing workflows without PDF editing software", `Signing ${u.label} securely with automatic file deletion after processing`],
      [
        { question: `Can I sign PDF ${u.label} with a drawn signature?`, answer: `${faqYes(u.slug.length % 6)} our tool supports drawn signatures (using mouse or touchscreen), typed signatures, and uploaded signature images for signing ${u.label}.` },
        { question: `Are digitally signed ${u.label} legally valid?`, answer: "In most jurisdictions, digitally signed documents are legally valid for commercial agreements. For regulated transactions, verify the signature standard required." },
        { question: `Is signing ${u.label} on PDF HUB 24 free?`, answer: "Completely free — no account required and no watermark added to signed documents." },
      ]
    ));
  }

  return results;
}

function genOcrAndSecurityPages(): ProgrammaticPage[] {
  const results: ProgrammaticPage[] = [];
  const ocrLangs = [
    { slug: "arabic", label: "Arabic" }, { slug: "hindi", label: "Hindi" },
    { slug: "spanish", label: "Spanish" }, { slug: "french", label: "French" },
    { slug: "german", label: "German" }, { slug: "chinese", label: "Chinese" },
    { slug: "japanese", label: "Japanese" }, { slug: "portuguese", label: "Portuguese" },
  ];
  for (const l of ocrLangs) {
    const slug = `ocr-pdf-${l.slug}`;
    if (!skip(slug)) results.push(page(
      slug,
      `OCR PDF ${l.label} Text Free Online | PDF HUB 24`,
      `OCR PDF to Searchable ${l.label} Text`,
      `Convert scanned ${l.label} PDF to searchable, editable text using OCR. Free online tool, no signup required, instant results.`,
      "/ocr-pdf", "OCR PDF",
      `Extracting ${l.label} text from scanned PDFs requires optical character recognition (OCR) that supports ${l.label} character sets and script. Our OCR tool processes ${l.label} documents accurately, converting scanned images of text into fully searchable and selectable content.

After OCR processing, your ${l.label} PDF becomes fully text-searchable. You can use Ctrl+F (or Cmd+F on Mac) to find specific words, copy text passages, and use the content in translation or editing tools.

OCR accuracy for ${l.label} depends on the scan quality. Clear, high-contrast scans at 200 DPI or above yield the best results. If your scan is blurry or low-contrast, the accuracy may be reduced — enhancing scan quality before OCR gives the best outcome.`,
      [`Making scanned ${l.label} documents searchable and copy-paste enabled`, `Converting ${l.label} scanned books, manuals, or reports to text`, `Digitising ${l.label} paperwork for electronic document management`, `Extracting ${l.label} data from scanned forms and tables`, `Creating editable ${l.label} text from non-selectable PDF scans`],
      [
        { question: `Does your OCR tool support ${l.label}?`, answer: `${faqYes(l.label.length % 6)} our OCR engine supports ${l.label} character recognition. Clear, high-resolution scans give the best text extraction accuracy.` },
        { question: `What scan quality is needed for good OCR results in ${l.label}?`, answer: "Scans at 200–300 DPI with good contrast give the best results. Blurry or very low-contrast scans reduce OCR accuracy in any language." },
        { question: `Is ${l.label} OCR free?`, answer: "Completely free — no signup, no watermark, and no page-count limit per file." },
      ]
    ));
  }

  const securityPages = [
    { slug: "compress-and-protect-pdf", toolPath: "/compress-pdf", toolName: "Compress PDF", h1: "Compress and Protect PDF in One Workflow", desc: "Compress your PDF to reduce file size, then protect it with a password — two essential steps for sharing sensitive documents securely." },
    { slug: "encrypt-pdf-free", toolPath: "/protect-pdf", toolName: "Protect PDF", h1: "Encrypt PDF with Password Free Online", desc: "Encrypt PDF files with 256-bit AES password protection online free. Prevent unauthorised access and control who can open your document." },
    { slug: "pdf-password-remove-free", toolPath: "/unlock-pdf", toolName: "Unlock PDF", h1: "Remove PDF Password Free Online", desc: "Remove password protection from your own PDF files online free. Unlock PDFs you own for editing, printing, and sharing." },
    { slug: "secure-pdf-for-sharing", toolPath: "/protect-pdf", toolName: "Protect PDF", h1: "Secure PDF Before Sharing — Password Protect", desc: "Add password protection to PDFs before sharing by email or messaging app. Control who can open your document with a strong password." },
    { slug: "pdf-viewer-no-download", toolPath: "/pdf-viewer", toolName: "PDF Viewer", h1: "View PDF Online Without Downloading", desc: "Open and view any PDF in your browser without downloading it to your device. Free online PDF viewer with zoom, search, and page navigation." },
  ];

  for (const sp of securityPages) {
    if (!skip(sp.slug)) results.push(page(
      sp.slug,
      `${sp.h1} | PDF HUB 24`,
      sp.h1,
      sp.desc,
      sp.toolPath, sp.toolName,
      `${sp.desc}

Our free tool handles this task with no registration required. Upload your PDF, complete the operation, and download the result. All processing is done securely with HTTPS encryption, and files are automatically deleted from our servers within 1 hour.

This approach ensures your document security needs are met without exposing your files to unnecessary storage or third-party access. The result is a PDF that behaves exactly as needed for your specific security or access control requirement.`,
      ["Protecting sensitive documents before sharing", "Controlling document access with password encryption", "Removing forgotten or unnecessary password restrictions", "Preparing secure PDFs for email and messaging", "Ensuring document privacy for professional and personal use"],
      [
        { question: "Is this tool free?", answer: "Completely free — no account, no watermark, and no usage limits." },
        { question: "Are my files safe?", answer: "Files are processed over HTTPS and deleted within 1 hour. We never store or access document content." },
        { question: "What encryption standard is used?", answer: "PDF password protection uses 256-bit AES encryption, the same standard used by banks and government agencies." },
      ]
    ));
  }

  return results;
}

function genBatchAndWorkflowPages(): ProgrammaticPage[] {
  const pages: ProgrammaticPage[] = [];
  const batchPages = [
    { slug: "batch-compress-pdf-files", h1: "Batch Compress Multiple PDF Files", desc: "Compress multiple PDF files at once online free. Batch PDF compression saves time when processing large document sets." },
    { slug: "bulk-pdf-compressor", h1: "Bulk PDF Compressor — Compress Many PDFs", desc: "Compress many PDF files in bulk online free. Perfect for processing invoice archives, scanned documents, and report collections." },
    { slug: "compress-large-pdf-free", h1: "Compress Large PDF Files Free Online", desc: "Compress very large PDF files online free. Handle 50MB, 100MB, or larger PDFs with our high-performance compression tool." },
    { slug: "compress-pdf-fast-online", h1: "Compress PDF Fast Online — Instant Results", desc: "Compress PDF files fast online free. Instant compression with no upload queue, no waiting, and no signup required." },
    { slug: "compress-pdf-without-software", h1: "Compress PDF Without Software or Installation", desc: "Compress PDF files without installing any software. Works entirely in your browser on any device, any operating system." },
    { slug: "pdf-size-reducer-online", h1: "Online PDF Size Reducer — Free Tool", desc: "Reduce PDF file size online free. Powerful compression with three quality settings for any document type." },
    { slug: "reduce-pdf-file-size-online", h1: "Reduce PDF File Size Online Free", desc: "Reduce PDF file size online in seconds. No signup, no watermark. Get smaller PDFs for email and upload portals." },
    { slug: "how-to-reduce-pdf-size", h1: "How to Reduce PDF Size — Step by Step", desc: "Learn how to reduce PDF size online for free. Simple step-by-step guide to compress any PDF in under 60 seconds." },
    { slug: "merge-pdf-pages-online", h1: "Merge PDF Pages Into One Document Online", desc: "Merge individual PDF pages into a single document online free. Combine pages from multiple PDFs into one organised file." },
    { slug: "combine-pdf-documents-free", h1: "Combine PDF Documents Free Online", desc: "Combine PDF documents into one file free online. No signup, no watermark. Instant download of combined PDF." },
    { slug: "pdf-joiner-online-free", h1: "Free Online PDF Joiner — Join PDFs Instantly", desc: "Join multiple PDF files into one document online free. Fast PDF joiner with drag-and-drop ordering. No signup required." },
    { slug: "pdf-combiner-no-watermark", h1: "PDF Combiner With No Watermark — Free", desc: "Combine PDF files online with no watermark added. Truly free PDF combiner — no hidden fees, no branding on output." },
    { slug: "split-pdf-pages-free", h1: "Split PDF Into Separate Pages Free", desc: "Split a PDF into individual pages online free. Each page becomes a separate PDF file. Instant download, no signup." },
    { slug: "extract-pdf-pages-online", h1: "Extract Pages From PDF Online Free", desc: "Extract specific pages from any PDF online free. Select pages by number and download as a new PDF instantly." },
    { slug: "pdf-page-extractor", h1: "PDF Page Extractor — Free Online Tool", desc: "Extract one or more pages from a PDF online free. Works on any device, no signup or software needed." },
    { slug: "delete-blank-pages-from-pdf", h1: "Delete Blank Pages From PDF Free Online", desc: "Remove blank and empty pages from a PDF online free. Clean up scanned documents and automated PDF exports." },
    { slug: "compress-pdf-api-free", h1: "Compress PDF API — Free Online Access", desc: "Access our PDF compression functionality for your workflow. Process PDFs online without API keys using our free web tool." },
    { slug: "pdf-metadata-editor-online", h1: "Edit PDF Metadata Online Free", desc: "Edit PDF metadata (title, author, subject, keywords) online free. Update document properties without editing content." },
    { slug: "remove-pdf-metadata", h1: "Remove PDF Metadata Free Online", desc: "Remove hidden metadata from PDF files online free. Strip author, creation date, and document properties for privacy." },
    { slug: "repair-corrupted-pdf-online", h1: "Repair Corrupted PDF File Online Free", desc: "Repair and recover corrupted or damaged PDF files online free. Our repair tool fixes common PDF errors and restores access." },
  ];

  for (const bp of batchPages) {
    if (!skip(bp.slug)) {
      pages.push(page(
        bp.slug,
        `${bp.h1} | PDF HUB 24`,
        bp.h1,
        bp.desc,
        "/compress-pdf", "Compress PDF",
        `${bp.desc}

Our free PDF tools handle this task with no registration required. Simply open the tool in your browser, upload your file or files, complete the operation, and download the results. All processing is done securely with HTTPS encryption, and files are automatically deleted from our servers within 1 hour of processing.

No software installation, no monthly subscription, and no watermarks on output files. PDF HUB 24 provides professional-grade PDF tools that are genuinely free for everyone.`,
        ["Processing PDFs without installing software or paying subscriptions", "Handling document preparation for email, upload portals, and sharing", "Managing document workflows efficiently from any device", "Maintaining document quality while reducing file size or reorganising pages", "Processing sensitive documents securely with automatic deletion"],
        [
          { question: "Is this tool really free?", answer: "Completely free — no signup, no credit card, no watermark on output, and no usage limits." },
          { question: "What devices does this work on?", answer: "Any modern browser on Windows, Mac, Linux, iPhone, Android, iPad, or Chromebook. No app download needed." },
          { question: "How secure is my document?", answer: "All processing uses HTTPS encryption. Files are never shared with third parties and are permanently deleted within 1 hour." },
        ]
      ));
    }
  }
  return pages;
}

// ─── Main export ──────────────────────────────────────────────────────────────

function genCountryToolPages(): ProgrammaticPage[] {
  const results: ProgrammaticPage[] = [];
  const tools = [
    {
      id: "merge",
      slug: (c: string) => `merge-pdf-${c}`,
      title: (label: string) => `Merge PDF Free Online in ${label} | PDF HUB 24`,
      h1: (label: string) => `Merge PDF in ${label} — Free Online Tool`,
      desc: (label: string, demonym: string) => `Merge PDF files free online — trusted by ${demonym}. Combine multiple PDFs into one. No signup, no watermark, instant download.`,
      toolPath: "/merge-pdf",
      toolName: "Merge PDF",
      content: (c: CC) => {
        const rd = getRich(c.slug); const vr = slugVariant(c.slug);
        return [
          `${c.demonym} regularly need to combine multiple PDF files — ${rd.docs} and more — into a single document for submission to ${c.portal} or sharing with colleagues in ${rd.cities}. Our free PDF merger lets you upload multiple PDFs, arrange them in any order, and download a combined file in seconds, no account needed.\n\nFor ${c.portal}, bundling all required documents into a single PDF is the standard submission format. Our merge tool makes this a one-step process: drag your files into order and click Merge. Works on any browser and any device, accessible across all of ${c.label} without VPN restrictions.\n\nFiles are processed securely with HTTPS encryption and permanently deleted within 1 hour — consistent with ${rd.compliance} data protection standards. Free and unlimited for all ${c.demonym}.`,
          `Assembling documents for ${rd.useCase} in ${c.label} often means combining several separate PDF files — a task that takes seconds with PDF HUB 24. Upload your ${rd.docs.split(",")[0].trim()} and other supporting files, arrange them in the correct order, and download a single merged PDF ready for ${c.portal}.\n\nThe tool works directly in your browser from ${rd.cities} and anywhere else in ${c.label}. No software to install, no registration required, and no watermark on the output. Simply drag and drop your PDFs into the desired order and click Merge.\n\nAll processing uses HTTPS encryption and files are deleted within 1 hour — meeting ${rd.compliance} requirements. Free for all ${c.demonym}, with no limit on the number of files you can merge.`,
          `The most common reason ${c.demonym} need to merge PDFs is preparing a complete package for ${c.portal} — combining ${rd.docs} into one organised submission file. PDF HUB 24 makes this effortless: upload, arrange, merge, download in under a minute.\n\nFrom ${rd.cities} to rural areas of ${c.label}, the tool works on any connection speed and any device. No app to download, no account to create. The merged PDF maintains the quality and formatting of all source files and is accepted by all major ${c.label} portals.\n\nData security: files are processed over HTTPS and permanently deleted within 1 hour — compliant with ${rd.compliance}. Completely free with no restrictions.`,
          `Managing documents ${rd.mobile} in ${c.label} means you need a merge tool that works quickly on a smartphone. PDF HUB 24 is fully optimised for mobile browsers — upload your ${rd.docs.split(",")[0].trim()} and other files, drag them into order, and download the merged PDF in seconds.\n\nThe tool is free for all ${c.demonym}, with no registration, no watermarks, and no file count limits. Merge as many PDFs as your ${c.portal} submission requires — the tool handles them all reliably.\n\nSecurity and privacy: all files use HTTPS encryption and are permanently deleted within 1 hour, meeting ${rd.compliance} data minimisation requirements.`,
        ][vr];
      },
      useCases: (c: { label: string; demonym: string; portal: string }) => [
        `Merging multiple PDF documents for submission to ${c.portal}`,
        `Combining contracts, invoices, and supporting files into one PDF in ${c.label}`,
        `Assembling multi-part applications as a single document for ${c.label} authorities`,
        `Bundling PDF reports for sharing with ${c.label} colleagues and clients`,
        `Creating unified document packages for ${c.label} regulatory submissions`,
      ],
      faqs: (c: CC) => [
        { question: faqQ1(`merge-pdf-${c.slug}`, c.demonym, "merge PDFs"), answer: `${faqYes(0)} PDF merging is completely free for all ${c.demonym} with no signup, no watermark, and no file count limit.` },
        { question: `How many PDFs can I merge in ${c.label}?`, answer: `There is no limit on the number of PDFs you can merge. Upload as many files as your document requires.` },
        { question: `Does the merged PDF work with ${c.portal}?`, answer: `${faqYes(2)} our merged PDFs are fully compatible with all major document portals and comply with standard PDF specifications.` },
        ...(COUNTRY_SPECIFIC_FAQS[c.slug] || []),
      ],
    },
    {
      id: "pdf-to-word",
      slug: (c: string) => `pdf-to-word-${c}`,
      title: (label: string) => `PDF to Word Free Online in ${label} | PDF HUB 24`,
      h1: (label: string) => `Convert PDF to Word in ${label} — Free`,
      desc: (label: string, demonym: string) => `Convert PDF to editable Word document free online in ${label}. Trusted by ${demonym}. No signup, instant DOCX download.`,
      toolPath: "/pdf-to-word",
      toolName: "PDF to Word",
      content: (c: CC) => {
        const rd = getRich(c.slug); const vr = slugVariant(c.slug);
        return [
          `Converting ${rd.docs.split(",")[0].trim()} and other official PDFs from ${c.portal} into editable Word files is a daily need for ${c.demonym} in ${rd.cities}. Our free converter extracts text, tables, and formatting accurately, delivering an editable DOCX in seconds.\n\nThe conversion preserves paragraph structure, headings, and table layouts as closely as possible. No Microsoft Word licence is required — the output DOCX works in LibreOffice, Google Docs, WPS Office, and all modern word processors.\n\nAll files are processed with HTTPS encryption and deleted within 1 hour — meeting ${rd.compliance} data protection standards. Free for ${c.demonym}, no signup required.`,
          `Editing a PDF you received from ${c.portal} or another ${c.label} institution requires conversion to Word format. PDF HUB 24 makes this free and instant — upload your PDF and download an editable DOCX in seconds, from ${rd.cities} or anywhere in ${c.label}.\n\nIntelligent layout analysis preserves the structure of your ${rd.docs.split(",")[0].trim()} and similar official documents. The output is a standard DOCX compatible with all word processors — no expensive Adobe licence needed.\n\nData security: all files use HTTPS encryption and are permanently deleted within 1 hour — aligned with ${rd.compliance} requirements.`,
          `${c.label} professionals and students in ${rd.cities} routinely need to edit PDFs — whether to update a ${rd.docs.split(",")[0].trim()} or revise a contract. Our free PDF to Word converter handles this without any software installation or account creation.\n\nThe converted DOCX file accurately reflects the layout of your original PDF, with text, tables, and headings preserved. Works for standard PDFs from ${c.portal} and all major ${c.label} institutions.\n\nFiles are deleted within 1 hour — meeting ${rd.compliance} standards for data protection. Completely free, no watermarks.`,
          `Managing documents ${rd.mobile} in ${c.label} often means you need to edit a PDF on the go. Our free PDF to Word converter works perfectly on mobile browsers — upload your ${rd.docs.split(",")[0].trim()} or other PDF, convert it, and download the editable DOCX in seconds.\n\nThe output is compatible with all word processors including Google Docs (popular for ${c.label} mobile users). No Microsoft Office subscription needed, no watermark, no registration.\n\nAll processing complies with ${rd.compliance}: files are encrypted in transit and deleted within 1 hour.`,
        ][vr];
      },
      useCases: (c: CC) => {
        const rd = getRich(c.slug);
        return [
          `Converting ${rd.docs.split(",")[0].trim()} from ${c.portal} into editable Word format`,
          `Editing scanned government forms and ${rd.docs.split(",")[1]?.trim() || "certificates"} in ${c.label}`,
          `Extracting text from ${c.label} contracts for legal team revision`,
          `Converting PDF academic papers and official documents for editing in ${rd.cities}`,
          `Repurposing PDF templates from ${c.label} institutions into editable DOCX files`,
        ];
      },
      faqs: (c: CC) => {
        const rd = getRich(c.slug);
        return [
          { question: faqQ1(`pdf-to-word-${c.slug}`, c.demonym, "convert PDF to Word"), answer: `${faqYes(1)} the converter is completely free for ${c.demonym} in ${rd.cities} and across ${c.label} — no signup, no watermark, no file size limits.` },
          { question: `Does it work for ${rd.docs.split(",")[0].trim()} and other ${c.portal} documents?`, answer: `${faqYes(3)} our converter handles standard PDFs from any ${c.label} source including government portals, banks, and official institutions.` },
          { question: `What Word format does the conversion produce?`, answer: `A standard DOCX file compatible with Microsoft Word 2010+, LibreOffice, Google Docs, and all modern word processors.` },
          ...(COUNTRY_SPECIFIC_FAQS[c.slug] || []),
        ];
      },
    },
    {
      id: "sign-pdf",
      slug: (c: string) => `sign-pdf-${c}`,
      title: (label: string) => `Sign PDF Free Online in ${label} | PDF HUB 24`,
      h1: (label: string) => `Sign PDF Online in ${label} — Free Digital Signature`,
      desc: (label: string, demonym: string) => `Sign PDF documents free online in ${label}. Trusted by ${demonym}. Draw, type, or upload your signature. No signup required.`,
      toolPath: "/sign-pdf",
      toolName: "Sign PDF",
      content: (c: CC) => {
        const rd = getRich(c.slug); const vr = slugVariant(c.slug);
        return [
          `${c.demonym} in ${rd.cities} sign contracts, rental agreements, employment forms, and documents submitted to ${c.portal} regularly. Our free PDF signature tool lets you add a legally recognised handwritten-style signature to any PDF — no printing, no scanning, no expensive software.\n\nThree methods: draw with mouse or finger, type your name in a handwriting font, or upload a photo of your signature. The signature is embedded permanently into the PDF and visible in all standard PDF viewers.\n\nFiles are deleted within 1 hour — meeting ${rd.compliance} data protection standards. Completely free for all ${c.demonym}.`,
          `Signing a ${rd.docs.split(",")[0].trim()} or other official document in ${c.label} no longer requires a printer. PDF HUB 24 lets ${c.demonym} sign any PDF electronically in seconds — draw, type, or upload your signature, then download the signed document ready for ${c.portal} or email.\n\nThe signature is embedded directly into the PDF and compatible with all PDF viewers and document platforms used in ${c.label}. No account, no watermark, no cost.\n\nAll files use HTTPS encryption and are permanently deleted within 1 hour — consistent with ${rd.compliance}.`,
          `From ${rd.cities} to rural ${c.label}, the need to sign PDFs electronically is universal. Our free tool supports three signature methods — draw, type, or upload — and works on any device without software installation.\n\nSigned PDFs from our tool are accepted by ${c.portal} and all major ${c.label} document portals and email systems. The signature is embedded at the pixel level and displays correctly in every PDF viewer.\n\nData is protected under ${rd.compliance} standards: HTTPS encryption throughout, files deleted within 1 hour.`,
          `Signing documents ${rd.mobile} in ${c.label} is effortless with PDF HUB 24. Upload your contract, consent form, or ${rd.docs.split(",")[0].trim()}, draw or type your signature, and download the signed PDF — all from your smartphone browser.\n\nNo app to install, no account to create, no watermark. The signed PDF is fully compatible with ${c.portal} and all standard document platforms in ${c.label}.\n\nPrivacy guaranteed: files are processed with HTTPS encryption and deleted within 1 hour, meeting ${rd.compliance} requirements.`,
        ][vr];
      },
      useCases: (c: CC) => {
        const rd = getRich(c.slug);
        return [
          `Signing ${rd.docs.split(",")[0].trim()} and contracts digitally in ${c.label}`,
          `Adding handwritten-style signatures to documents for ${c.portal}`,
          `Signing consent forms, applications, and official letters in ${rd.cities}`,
          `Signing rental and employment contracts as a ${c.label} resident`,
          `Adding digital signatures to PDFs without expensive software in ${c.label}`,
        ];
      },
      faqs: (c: CC) => {
        const rd = getRich(c.slug);
        return [
          { question: faqQ1(`sign-pdf-${c.slug}`, c.demonym, "sign PDFs digitally"), answer: `${faqYes(4)} PDF signing is completely free for ${c.demonym} — draw, type, or upload your signature with no account required, accessible from ${rd.cities} and all of ${c.label}.` },
          { question: `Is a digital signature valid in ${c.label}?`, answer: `Electronic signatures are widely accepted for personal and commercial documents in ${c.label}. For court or notarised documents, check with a qualified ${c.label} professional.` },
          { question: `Does the signed PDF work with ${c.portal}?`, answer: `${faqYes(5)} our signed PDFs are standard format accepted by ${c.portal} and all major document systems used in ${c.label}.` },
          ...(COUNTRY_SPECIFIC_FAQS[c.slug] || []),
        ];
      },
    },
    {
      id: "split-pdf",
      slug: (c: string) => `split-pdf-${c}`,
      title: (label: string) => `Split PDF Free Online in ${label} | PDF HUB 24`,
      h1: (label: string) => `Split PDF Online in ${label} — Extract Any Pages Free`,
      desc: (label: string, demonym: string) => `Split PDF documents free online in ${label}. Extract specific pages or split by page range. Trusted by ${demonym}. No signup.`,
      toolPath: "/split-pdf",
      toolName: "Split PDF",
      content: (c: CC) => {
        const rd = getRich(c.slug); const vr = slugVariant(c.slug);
        return [
          `${c.demonym} in ${rd.cities} often receive large multi-part PDFs from ${c.portal} — including ${rd.docs} — and need to extract only specific pages for a particular purpose. Our free PDF splitter makes this instant: upload, specify page numbers or ranges, download.\n\nExtracted pages maintain their original quality — no compression, no formatting loss. Works on desktop and mobile browsers across all of ${c.label} with no software installation required.\n\nFiles are processed with HTTPS encryption and deleted within 1 hour — meeting ${rd.compliance} data protection requirements. Free and unlimited for all ${c.demonym}.`,
          `Sharing only the relevant section of a ${rd.docs.split(",")[0].trim()} or government document is a common need in ${c.label}. Our free PDF splitter lets ${c.demonym} extract any page or range from any PDF in seconds — no software, no account, no cost.\n\nSpecify your pages (e.g., "1-3, 5, 8-10") and download a clean new PDF containing exactly what you need. The extracted pages are identical in quality to the original — no compression applied.\n\nData security: files use HTTPS encryption and are deleted within 1 hour, meeting ${rd.compliance} standards.`,
          `When you receive a combined PDF from ${c.portal} or another ${c.label} source, you sometimes need just one section — a single certificate, a specific invoice page, or a particular declaration from a set of ${rd.docs}. Our free PDF splitter extracts exactly what you need in seconds.\n\nFrom ${rd.cities} and across ${c.label}, the tool works on any device in any browser. No app to install, no registration. Simply upload, enter your page numbers, and download the extracted PDF.\n\nAll processing complies with ${rd.compliance}: HTTPS encryption throughout, files deleted within 1 hour.`,
          `Splitting PDFs ${rd.mobile} in ${c.label} — our tool works perfectly on mobile browsers. Upload your PDF, enter the page numbers you need (for example, just the signature page of your ${rd.docs.split(",")[0].trim()}), and download the extracted PDF instantly.\n\nThe tool handles all standard ${c.label} PDFs — from ${c.portal} government documents to business reports and academic papers. No watermark, no size limit, no account required.\n\nPrivacy: files are encrypted in transit and permanently deleted within 1 hour — consistent with ${rd.compliance}.`,
        ][vr];
      },
      useCases: (c: CC) => {
        const rd = getRich(c.slug);
        return [
          `Extracting specific pages from ${rd.docs.split(",")[0].trim()} and ${c.portal} PDFs in ${c.label}`,
          `Splitting large PDF reports into individual sections for ${rd.cities} colleagues`,
          `Separating a multi-document scan into individual files in ${c.label}`,
          `Extracting a single certificate or declaration page from a larger ${c.label} PDF`,
          `Creating smaller PDF excerpts to share with ${c.label} contacts`,
        ];
      },
      faqs: (c: CC) => {
        const rd = getRich(c.slug);
        return [
          { question: faqQ1(`split-pdf-${c.slug}`, c.demonym, "split PDF pages"), answer: `${faqYes(0)} PDF splitting is completely free for all ${c.demonym} — no signup, no watermark, and no page count limit. Accessible from ${rd.cities} and all of ${c.label}.` },
          { question: `How do I extract specific pages from a ${c.label} PDF?`, answer: `Upload your PDF, type the page numbers or ranges you want (e.g., 1-3, 5, 8-10), and download a new PDF with only those pages. Handles ${rd.docs.split(",")[0].trim()} and all standard ${c.label} document formats.` },
          { question: `Does splitting reduce the quality of my PDF?`, answer: `No. Splitting only separates pages — text, images, and formatting are preserved exactly from the original.` },
          ...(COUNTRY_SPECIFIC_FAQS[c.slug] || []),
        ];
      },
    },
    {
      id: "convert-pdf",
      slug: (c: string) => `convert-pdf-${c}`,
      title: (label: string) => `Convert PDF Free Online in ${label} | PDF HUB 24`,
      h1: (label: string) => `Convert PDF Online in ${label} — All Formats Free`,
      desc: (label: string, demonym: string) => `Convert PDF to Word, Excel, JPG, PNG, PowerPoint free online in ${label}. Trusted by ${demonym}. No signup, instant download.`,
      toolPath: "/convert-pdf",
      toolName: "PDF Converter",
      content: (c: CC) => {
        const rd = getRich(c.slug); const vr = slugVariant(c.slug);
        return [
          `${c.demonym} in ${rd.cities} frequently need to convert PDFs into different formats — ${rd.docs.split(",")[0].trim()} and similar ${c.portal} documents to Word for editing, data-heavy PDFs to Excel, or pages to JPG for messaging apps. Our free conversion suite covers every format in one place.\n\nChoose from PDF to Word, PDF to Excel, PDF to JPG, PDF to PNG, and PDF to PowerPoint. Each converter uses intelligent layout analysis to preserve the structure of your original ${c.label} document as accurately as possible.\n\nAll conversions use HTTPS encryption and files are deleted within 1 hour — meeting ${rd.compliance} data protection standards. Free, instant, no account required.`,
          `Converting documents from ${c.portal} into editable or shareable formats is a standard workflow for ${c.demonym}. Our free PDF converter handles all major output formats — Word, Excel, JPG, PNG, PowerPoint — from any PDF source, including ${rd.docs} and scanned documents.\n\nThe tool is accessible from ${rd.cities} and across ${c.label} on any browser and any device. No Microsoft Office or Adobe licence needed — output files work in all common software.\n\nData security: files use HTTPS encryption and are permanently deleted within 1 hour — consistent with ${rd.compliance}.`,
          `For ${c.label} professionals, academics, and government workers in ${rd.cities}, converting PDFs to editable formats is an everyday task. PDF HUB 24 provides a complete conversion suite — PDF to Word, Excel, JPG, PNG, PowerPoint — all free and all accessible without registration.\n\nDocuments from ${c.portal} and other ${c.label} sources convert reliably, with text, tables, and images faithfully reproduced in the output format. Most conversions complete in 10–30 seconds on any ${c.label} connection speed.\n\nAll files are encrypted in transit and deleted within 1 hour — meeting ${rd.compliance} requirements.`,
          `Converting PDFs ${rd.mobile} in ${c.label} — our full conversion suite works on any smartphone browser. Whether you are converting a ${rd.docs.split(",")[0].trim()} to Word or a PDF report to Excel, the tool handles it instantly without any app installation.\n\nOutput files are compatible with all common ${c.label} software — Microsoft Office, Google Workspace, and local alternatives. No watermarks, no registration, no cost.\n\nPrivacy: HTTPS encryption throughout, files deleted within 1 hour, meeting ${rd.compliance} standards.`,
        ][vr];
      },
      useCases: (c: CC) => {
        const rd = getRich(c.slug);
        return [
          `Converting ${rd.docs.split(",")[0].trim()} from ${c.portal} to editable Word or Excel format`,
          `Converting ${c.label} PDF reports and presentations to JPG or PNG images`,
          `Transforming ${rd.docs.split(",")[1]?.trim() || "PDF data tables"} into Excel spreadsheets for ${c.label} businesses`,
          `Converting PDF slides to PowerPoint for ${rd.cities} presentations`,
          `Converting scanned ${c.label} official documents to editable text formats`,
        ];
      },
      faqs: (c: CC) => {
        const rd = getRich(c.slug);
        return [
          { question: `What PDF conversion formats are available for ${c.demonym}?`, answer: `Convert PDF to Word, Excel, JPG, PNG, PowerPoint, and more — all free for ${c.demonym} in ${rd.cities} and across ${c.label}. No signup or watermark.` },
          { question: `Does PDF conversion work for ${rd.docs.split(",")[0].trim()} and other ${c.portal} documents?`, answer: `${faqYes(2)} our converters handle standard PDFs from all ${c.label} sources including government portals, banks, and institutions.` },
          { question: `How long does PDF conversion take in ${c.label}?`, answer: `Most conversions complete in 10-30 seconds. The tool works on all ${c.label} connection speeds including mobile data.` },
        ];
      },
    },
    {
      id: "compress-pdf-online",
      slug: (c: string) => `compress-pdf-online-${c}`,
      title: (label: string) => `Compress PDF Online Free in ${label} — No Software Needed | PDF HUB 24`,
      h1: (label: string) => `Compress PDF Online in ${label} — No Install, No Account`,
      desc: (label: string, demonym: string) => `Compress PDF online free in ${label} — no software installation, no Adobe Acrobat licence. Trusted by ${demonym}. Works on any browser.`,
      toolPath: "/compress-pdf",
      toolName: "Compress PDF",
      content: (c: CC) => {
        const rd = getRich(c.slug); const vr = slugVariant(c.slug);
        return [
          // Variant 0 — Software-replacement angle
          `Adobe Acrobat Pro costs over ${rd.currency} 200 per year. ${c.demonym} in ${rd.cities} use PDF HUB 24 to compress PDFs online — free, in any browser, with zero installation required. The result is the same as desktop software: a smaller PDF with sharp text and acceptable image quality.\n\nThe key advantage of online compression over installing software: it works on every device you own — home computer, work laptop, shared office PC, smartphone — without licence management or per-device installation. Upload, compress, download, done.\n\n${secPara(`compress-pdf-online-${c.slug}`, rd.compliance, c.label)}`,
          // Variant 1 — Any-device angle
          `Compressing a PDF used to require installing Acrobat, Smallpdf Desktop, or a similar programme. ${c.demonym} no longer need to do that — PDF HUB 24 runs entirely in the browser, on any operating system (Windows, macOS, Linux, ChromeOS) and any device (desktop, laptop, tablet, smartphone).\n\nFor ${c.label} users who share a work computer or access documents from multiple devices in ${rd.cities}, online compression removes the friction of managing software licences. No installation, no subscription, no watermark on the output — just upload and compress.\n\n${secPara(`compress-pdf-online-${c.slug}`, rd.compliance, c.label)}`,
          // Variant 2 — IT-restriction angle
          `Many ${c.label} workplaces and schools restrict software installations on their computers. ${c.demonym} in ${rd.cities} who cannot install Adobe Acrobat on a work or shared device rely on browser-based PDF compression as the practical alternative — no admin rights required, no IT approval needed.\n\nPDF HUB 24 works in Chrome, Firefox, Safari, and Edge without any plugin or extension. Compress ${rd.docs.split(",")[0].trim()} and other documents at up to 90% size reduction, then download the result instantly. The compressed file is standard PDF — no DRM, no proprietary format.\n\n${secPara(`compress-pdf-online-${c.slug}`, rd.compliance, c.label)}`,
          // Variant 3 — Frequent-use angle
          `${c.demonym} who occasionally need to compress a PDF — perhaps once a week before sending ${rd.docs.split(",")[0].trim()} or uploading to a ${c.label} portal — have no reason to pay for desktop software. A browser-based tool handles the task in the same time and produces an identical result.\n\nPDF HUB 24 is that browser-based tool, free for ${c.label} residents and accessible from any device in ${rd.cities} and across ${c.label}. No account to maintain, no subscription to cancel — just open a tab, compress, and download. The tool is always up to date and never asks for a software update.\n\n${secPara(`compress-pdf-online-${c.slug}`, rd.compliance, c.label)}`,
        ][vr];
      },
      useCases: (c: CC) => {
        const rd = getRich(c.slug);
        return [
          `Compressing PDFs online without installing Adobe Acrobat on a ${c.label} work computer`,
          `Free PDF compression on any device for ${c.demonym} in ${rd.cities}`,
          `Browser-based PDF compression for ${c.label} students and shared-device users`,
          `Replacing Smallpdf or iLovePDF paid tier with a permanently free online alternative`,
          `Compressing ${rd.docs.split(",")[0].trim()} and official PDFs without software licences in ${c.label}`,
        ];
      },
      faqs: (c: CC) => {
        const rd = getRich(c.slug);
        return [
          { question: `Do I need to install software to compress a PDF in ${c.label}?`, answer: `Not at all — PDF HUB 24 runs entirely in your browser. No Adobe Acrobat, no Smallpdf Desktop, no plugin required. Works on any device in ${rd.cities} and across ${c.label}.` },
          { question: `Is browser-based PDF compression as good as desktop software?`, answer: `For most use cases, yes. The compression algorithms produce equivalent results to desktop software. Text quality is preserved at all compression levels; only embedded images are reduced.` },
          { question: `How is my data protected under ${rd.compliance}?`, answer: `Your ${rd.compliance} rights are protected — files are encrypted in transit using HTTPS and permanently deleted within 1 hour. No content is retained, analysed, or shared.` },
          ...(COUNTRY_SPECIFIC_FAQS[c.slug] || []),
        ];
      },
    },
    {
      id: "edit-pdf",
      slug: (c: string) => `edit-pdf-${c}`,
      title: (label: string) => `Edit PDF Free Online in ${label} | PDF HUB 24`,
      h1: (label: string) => `Edit PDF Online in ${label} — Free PDF Editor`,
      desc: (label: string, demonym: string) => `Edit PDF files free online in ${label}. Add text, annotations, and signatures. Trusted by ${demonym}. No signup, instant results.`,
      toolPath: "/edit-pdf",
      toolName: "Edit PDF",
      content: (c: CC) => {
        const rd = getRich(c.slug); const vr = slugVariant(c.slug);
        return [
          `${c.demonym} in ${rd.cities} regularly need to annotate, mark up, and add notes to PDFs — whether reviewing a ${rd.docs.split(",")[0].trim()}, commenting on a contract, or inserting text into a form before submission to ${c.portal}. Our free online PDF editor handles all of this without software installation.\n\nAdd text annotations, highlight key sections, insert comments, and draw shapes — all edits are embedded directly into the PDF and visible in every standard PDF viewer. The edited document is accepted by ${c.portal} and all major ${c.label} platforms.\n\nFiles are processed with HTTPS encryption and deleted within 1 hour — meeting ${rd.compliance} standards. Free for all ${c.demonym}, no account required.`,
          `Editing a ${rd.docs.split(",")[0].trim()} or other official PDF from ${c.portal} without Adobe Acrobat is straightforward with PDF HUB 24. ${c.demonym} in ${rd.cities} can add text, highlight sections, insert annotations, and download the updated PDF in seconds, entirely in a browser.\n\nAll edits are permanently embedded into the PDF file — visible in every viewer and accepted by all ${c.label} document systems. No software to install, no account to create, no watermark.\n\nData security: HTTPS encryption and deletion within 1 hour, consistent with ${rd.compliance}.`,
          `Quick PDF edits are a daily need for ${c.label} professionals and students across ${rd.cities}. Our free editor lets ${c.demonym} add text, highlight important passages, and annotate any PDF from ${c.portal} or another ${c.label} source — in any browser on any device.\n\nAll annotations are embedded into the output PDF, which remains compatible with all standard PDF viewers and ${c.label} document portals. No expensive software licences, no account registration, no watermarks.\n\nAll processing complies with ${rd.compliance}: HTTPS encryption throughout, files deleted within 1 hour.`,
          `Annotating PDFs ${rd.mobile} in ${c.label} — our free editor works perfectly on mobile browsers. ${c.demonym} can highlight sections, insert text notes, and mark up a ${rd.docs.split(",")[0].trim()} or other document before sharing with colleagues or submitting to ${c.portal}.\n\nAll edits are embedded and visible in every PDF viewer. The result is fully compatible with ${c.label} government and commercial portals. No registration, no watermark, no cost.\n\nPrivacy: files use HTTPS encryption and are permanently deleted within 1 hour — meeting ${rd.compliance} standards.`,
        ][vr];
      },
      useCases: (c: CC) => {
        const rd = getRich(c.slug);
        return [
          `Adding text annotations to ${rd.docs.split(",")[0].trim()} and official PDFs from ${c.portal}`,
          `Marking up PDF reports and contracts for ${rd.cities} colleagues`,
          `Inserting comments and notes into ${c.label} government PDF forms`,
          `Editing PDF applications for ${c.label} submissions without software`,
          `Annotating scanned documents from ${c.label} offices before sharing`,
        ];
      },
      faqs: (c: CC) => {
        const rd = getRich(c.slug);
        return [
          { question: faqQ1(`edit-pdf-${c.slug}`, c.demonym, "edit PDFs online"), answer: `${faqYes(1)} our PDF editor is completely free for ${c.demonym} in ${rd.cities} and across ${c.label} — no signup, no watermark, and no usage limits.` },
          { question: `What editing features are available for ${c.label} users?`, answer: `Add text, highlight sections, insert annotations, and draw shapes. All edits are embedded into the PDF and compatible with ${c.portal} and all standard PDF viewers.` },
          { question: `Is the edited PDF compatible with ${rd.compliance} requirements?`, answer: `${faqYes(3)} our edited PDFs are standard format accepted by all major ${c.label} portals and document systems, with processing that meets ${rd.compliance} data protection standards.` },
          ...(COUNTRY_SPECIFIC_FAQS[c.slug] || []),
        ];
      },
    },
    {
      id: "jpg-to-pdf",
      slug: (c: string) => `jpg-to-pdf-${c}`,
      title: (label: string) => `JPG to PDF Free Online in ${label} | PDF HUB 24`,
      h1: (label: string) => `Convert JPG to PDF in ${label} — Free Online Tool`,
      desc: (label: string, demonym: string) => `Convert JPG images to PDF free online in ${label}. Trusted by ${demonym}. Combine multiple images into one PDF. No signup required.`,
      toolPath: "/jpg-to-pdf",
      toolName: "JPG to PDF",
      content: (c: CC) => {
        const rd = getRich(c.slug); const vr = slugVariant(c.slug);
        return [
          `Converting smartphone photos to PDF is a daily task for ${c.demonym} in ${rd.cities} — photographing ${rd.docs.split(",")[0].trim()} and other documents and submitting them to ${c.portal} as a PDF attachment. Our free JPG to PDF converter handles this in seconds.\n\nUpload one or multiple JPG images, arrange them in order, and download a single PDF with full-resolution images. Works on any device — smartphone, tablet, or desktop — in any browser across ${c.label}.\n\nFiles are deleted within 1 hour — meeting ${rd.compliance} data minimisation standards. No account, no watermark, completely free for all ${c.demonym}.`,
          `${c.portal} and other ${c.label} portals typically accept PDF uploads rather than raw image files. ${c.demonym} in ${rd.cities} use our free JPG to PDF converter to transform smartphone photos of ${rd.docs.split(",")[0].trim()} and other documents into submission-ready PDFs in seconds.\n\nUpload multiple JPGs in the correct order and get a single PDF preserving full image resolution. Works on all ${c.label} devices and browsers without any app download.\n\nAll files are processed with HTTPS encryption and deleted within 1 hour — consistent with ${rd.compliance}. Free, no limits, no watermark.`,
          `Scanning ID cards, receipts, handwritten forms, and ${rd.docs.split(",")[0].trim()} with a smartphone is standard practice in ${c.label}. Our free JPG to PDF converter turns those photos into a professional PDF ready for ${c.portal} in seconds — without a scanner or dedicated app.\n\nUpload your JPGs, set the order, and click Convert. The output PDF is accepted by all ${c.label} government and commercial portals. Accessible from ${rd.cities} and all of ${c.label} on any device.\n\nPrivacy: HTTPS encryption + deletion within 1 hour, meeting ${rd.compliance} requirements.`,
          `Converting photos to PDF ${rd.mobile} in ${c.label} — our free JPG to PDF converter is fully optimised for mobile. Upload photos of your ${rd.docs.split(",")[0].trim()} or other documents from your phone gallery, combine them into a PDF, and share or submit immediately.\n\nThe output PDF is full resolution and accepted by ${c.portal} and all standard ${c.label} document systems. No app download, no registration, no watermark.\n\nData protection: HTTPS encryption throughout, files deleted within 1 hour — meeting ${rd.compliance} standards.`,
        ][vr];
      },
      useCases: (c: CC) => {
        const rd = getRich(c.slug);
        return [
          `Converting ${rd.docs.split(",")[0].trim()} photos to PDF for ${c.portal} submissions`,
          `Creating PDFs from scanned receipts and invoices in ${rd.cities}`,
          `Combining multiple JPG photos into a single PDF for ${c.label} applications`,
          `Converting smartphone photos of ${c.label} documents to PDF format`,
          `Creating PDF portfolios from JPG images for ${c.label} institutions`,
        ];
      },
      faqs: (c: CC) => {
        const rd = getRich(c.slug);
        return [
          { question: faqQ1(`jpg-to-pdf-${c.slug}`, c.demonym, "convert JPG to PDF"), answer: `${faqYes(0)} JPG to PDF conversion is completely free for ${c.demonym} in ${rd.cities} and across ${c.label} — no signup, no watermark, no image count limit.` },
          { question: `Can I combine multiple JPG photos into one PDF in ${c.label}?`, answer: `${faqYes(4)} upload multiple JPG images and they are combined into a single PDF in the order you upload them — perfect for multi-page ${rd.docs.split(",")[0].trim()} submissions.` },
          { question: `Does the JPG to PDF output work with ${c.portal}?`, answer: `${faqYes(2)} our PDFs are standard format accepted by ${c.portal} and all major document systems in ${c.label}.` },
          ...(COUNTRY_SPECIFIC_FAQS[c.slug] || []),
        ];
      },
    },
    {
      id: "pdf-to-jpg",
      slug: (c: string) => `pdf-to-jpg-${c}`,
      title: (label: string) => `PDF to JPG Free Online in ${label} | PDF HUB 24`,
      h1: (label: string) => `Convert PDF to JPG in ${label} — Free High-Quality Tool`,
      desc: (label: string, demonym: string) => `Convert PDF to JPG images free online in ${label}. Trusted by ${demonym}. High-resolution output, instant download. No signup.`,
      toolPath: "/pdf-to-jpg",
      toolName: "PDF to JPG",
      content: (c: CC) => {
        const rd = getRich(c.slug); const vr = slugVariant(c.slug);
        return [
          `${c.demonym} in ${rd.cities} often need to share PDF content as images — extracting pages from ${c.portal} documents as JPGs for messaging apps, presentations, or platforms that do not accept PDF uploads. Our free converter handles this in seconds.\n\nConvert a single page or all pages at once. Output images are high-resolution JPGs — suitable for printing, presentations, and digital sharing. Works on any ${c.label} device in any browser without software installation.\n\nFiles are deleted within 1 hour — meeting ${rd.compliance} data minimisation requirements. Free for all ${c.demonym}, no account needed.`,
          `When you need to share a page from a ${rd.docs.split(",")[0].trim()} or other ${c.portal} document as an image — for a presentation, a WhatsApp message, or a platform that only accepts JPG uploads — our free PDF to JPG converter is the solution for ${c.demonym} across ${rd.cities}.\n\nExtract any page or all pages as high-resolution JPGs in one operation. Download as individual files or a ZIP archive. No software to install, no account to create.\n\nData security: HTTPS encryption + deletion within 1 hour, meeting ${rd.compliance} standards.`,
          `Extracting PDF pages as images is a common task for ${c.label} professionals in ${rd.cities} — from inserting a certificate into a presentation to sharing a document page ${rd.mobile}. Our free PDF to JPG converter makes this instant and free.\n\nConvert single pages or the entire PDF at once. All output images maintain the original document quality. Works for PDFs from ${c.portal} and all standard ${c.label} sources.\n\nAll processing complies with ${rd.compliance}: HTTPS encryption, files deleted within 1 hour. No watermarks, no registration.`,
          `Converting PDF pages to JPG ${rd.mobile} in ${c.label} — our free tool works perfectly on mobile browsers. ${c.demonym} can extract any page from a ${rd.docs.split(",")[0].trim()} or other PDF document and download it as a high-resolution JPG in seconds.\n\nThe output images are suitable for sharing on any platform used in ${c.label}. No app download required, no account, no watermark.\n\nPrivacy: HTTPS encryption throughout, files deleted within 1 hour — consistent with ${rd.compliance}.`,
        ][vr];
      },
      useCases: (c: CC) => {
        const rd = getRich(c.slug);
        return [
          `Converting ${c.portal} PDF pages to JPG images for sharing in ${rd.cities}`,
          `Extracting ${rd.docs.split(",")[0].trim()} content as images for ${c.label} presentations`,
          `Converting PDF certificates and documents to JPG for ${c.label} upload portals`,
          `Sharing PDF pages ${rd.mobile} in ${c.label}`,
          `Converting scanned ${c.label} PDFs to JPG images for editing or archiving`,
        ];
      },
      faqs: (c: CC) => {
        const rd = getRich(c.slug);
        return [
          { question: faqQ1(`pdf-to-jpg-${c.slug}`, c.demonym, "convert PDF to JPG"), answer: `${faqYes(5)} PDF to JPG conversion is completely free for ${c.demonym} in ${rd.cities} and across ${c.label} — no signup, no watermark, high-quality output.` },
          { question: `What resolution are the JPG images for ${c.label} users?`, answer: `High resolution suitable for printing, presentations, and digital sharing. Quality is maintained from the original PDF including ${c.portal} and other ${c.label} official documents.` },
          { question: `Can I convert multiple PDF pages to JPG at once in ${c.label}?`, answer: `${faqYes(1)} convert all pages in one operation and download as a ZIP archive — handles ${rd.docs.split(",")[0].trim()} and all standard ${c.label} PDF formats.` },
          ...(COUNTRY_SPECIFIC_FAQS[c.slug] || []),
        ];
      },
    },
    {
      id: "protect-pdf",
      slug: (c: string) => `protect-pdf-${c}`,
      title: (label: string) => `Password Protect PDF Free in ${label} | PDF HUB 24`,
      h1: (label: string) => `Protect PDF with Password in ${label} — Free Online Tool`,
      desc: (label: string, demonym: string) => `Add password protection to PDF free online in ${label}. Trusted by ${demonym}. 256-bit AES encryption. No signup required.`,
      toolPath: "/protect-pdf",
      toolName: "Protect PDF",
      content: (c: CC) => {
        const rd = getRich(c.slug); const vr = slugVariant(c.slug);
        return [
          `${c.demonym} in ${rd.cities} share sensitive documents — ${rd.docs} — by email and cloud storage every day. Before sharing, password-protecting your PDF adds a critical layer of security. Our free tool adds 256-bit AES encryption to any PDF in seconds.\n\nSet a password, download the protected file, and share it with the recipient separately. The protected PDF opens in any PDF viewer once the correct password is entered. This is the same encryption standard used by banks and government agencies in ${c.label}.\n\nFiles are deleted within 1 hour after processing — meeting ${rd.compliance} data minimisation requirements. Free for all ${c.demonym}, no account needed.`,
          `Under ${rd.compliance}, ${c.demonym} are responsible for protecting personal data shared in documents. Password-protecting your ${rd.docs.split(",")[0].trim()} and other sensitive PDFs before emailing or uploading to ${c.portal} is a straightforward compliance measure.\n\nOur free tool adds 256-bit AES encryption — the highest PDF security standard — in seconds. No Adobe Acrobat licence required. Works on any browser in ${rd.cities} and across all of ${c.label}.\n\nFiles are processed with HTTPS and deleted within 1 hour. Free, no watermark, no registration.`,
          `Sharing ${rd.docs.split(",")[0].trim()} and other sensitive ${c.label} documents by email or cloud platforms is risky without password protection. Our free PDF encryption tool adds 256-bit AES password protection — the same standard used by ${c.label} financial institutions — in seconds.\n\nFor documents submitted to ${c.portal} or shared with colleagues in ${rd.cities}, password protection is an important additional security layer. Simply upload, set your password, and download the protected file.\n\nData security: HTTPS encryption + deletion within 1 hour, meeting ${rd.compliance} requirements. Completely free, no account required.`,
          `Protecting PDFs ${rd.mobile} in ${c.label} — our free tool works perfectly on mobile browsers. ${c.demonym} can password-protect any ${rd.docs.split(",")[0].trim()} or other sensitive document before sending it ${rd.mobile} — in seconds, directly from their smartphone.\n\n256-bit AES encryption, the highest available for PDF files, is applied instantly. The protected PDF opens in any PDF viewer once the password is entered. Accepted by ${c.portal} and all standard ${c.label} platforms.\n\nPrivacy: HTTPS encryption throughout, files deleted within 1 hour — consistent with ${rd.compliance}.`,
        ][vr];
      },
      useCases: (c: CC) => {
        const rd = getRich(c.slug);
        return [
          `Password protecting ${rd.docs.split(",")[0].trim()} before emailing in ${c.label}`,
          `Encrypting PDFs containing ${rd.compliance}-regulated personal information`,
          `Securing ${c.label} business contracts and legal documents before sharing`,
          `Protecting confidential reports before uploading to ${c.label} cloud storage`,
          `Adding 256-bit AES encryption to PDF applications for ${c.portal}`,
        ];
      },
      faqs: (c: CC) => {
        const rd = getRich(c.slug);
        return [
          { question: faqQ1(`protect-pdf-${c.slug}`, c.demonym, "password protect PDFs"), answer: `${faqYes(3)} PDF password protection is completely free for ${c.demonym} in ${rd.cities} and across ${c.label} — no signup, no watermark, with 256-bit AES encryption.` },
          { question: `Does password protection meet ${rd.compliance} requirements in ${c.label}?`, answer: `256-bit AES encryption is the highest standard for PDF security and is recognised by banks, government agencies, and data protection authorities worldwide, including in ${c.label}.` },
          { question: `Can I open the protected PDF with ${c.portal} systems?`, answer: `${faqYes(0)} password-protected PDFs are standard format compatible with all PDF viewers. The recipient needs only the correct password to open the file.` },
          ...(COUNTRY_SPECIFIC_FAQS[c.slug] || []),
        ];
      },
    },
    {
      id: "rotate-pdf",
      slug: (c: string) => `rotate-pdf-${c}`,
      title: (label: string) => `Rotate PDF Free Online in ${label} | PDF HUB 24`,
      h1: (label: string) => `Rotate PDF Pages in ${label} — Free Online Tool`,
      desc: (label: string, demonym: string) => `Rotate PDF pages free online in ${label}. Fix sideways or upside-down pages instantly. Trusted by ${demonym}. No signup required.`,
      toolPath: "/rotate-pdf",
      toolName: "Rotate PDF",
      content: (c: CC) => {
        const rd = getRich(c.slug); const vr = slugVariant(c.slug);
        return [
          `Smartphone-scanned ${rd.docs.split(",")[0].trim()} and other documents often arrive in ${c.portal} sideways or upside down — a common issue for ${c.demonym} in ${rd.cities}. Our free PDF rotation tool corrects page orientation in seconds, no software required.\n\nRotate individual pages or all pages at once by 90°, 180°, or 270°. The corrected orientation is permanently saved into the PDF and displays correctly in all viewers and when printed. Works on any device in any browser.\n\nFiles are deleted within 1 hour — meeting ${rd.compliance} data minimisation requirements. Free and unlimited for all ${c.demonym}.`,
          `Receiving a ${rd.docs.split(",")[0].trim()} from ${c.portal} with pages in the wrong orientation is a common frustration in ${c.label}. Our free PDF rotation tool fixes this instantly — rotate any page or all pages by 90°, 180°, or 270°, and download a corrected PDF ready for printing or submission.\n\nAccessible from ${rd.cities} and all of ${c.label} on any device. No software installation, no account, no watermark. The corrected PDF works with all ${c.label} platforms.\n\nData security: HTTPS encryption + deletion within 1 hour, meeting ${rd.compliance} standards.`,
          `Mobile scanning is widely used across ${c.label} — and phone cameras often capture documents at the wrong angle. Our free PDF rotation tool lets ${c.demonym} in ${rd.cities} fix page orientation for ${rd.docs.split(",")[0].trim()} and other scanned PDFs before submitting to ${c.portal} or sharing.\n\nRotate individual pages or all at once. Corrected orientation is permanently embedded into the PDF file — no viewer-specific setting needed. Works in every browser on every device.\n\nAll processing complies with ${rd.compliance}: HTTPS encryption, files deleted within 1 hour.`,
          `Fixing PDF orientation ${rd.mobile} in ${c.label} — our free rotation tool works perfectly on smartphone browsers. ${c.demonym} can correct a sideways ${rd.docs.split(",")[0].trim()} or bank statement before sending it ${rd.mobile} to colleagues or submitting to ${c.portal}.\n\nRotate 90°, 180°, or 270° — individual pages or all at once. The fixed PDF downloads in seconds and is accepted by all ${c.label} document systems. No app, no registration, no watermark.\n\nPrivacy: HTTPS encryption throughout, files deleted within 1 hour — consistent with ${rd.compliance}.`,
        ][vr];
      },
      useCases: (c: CC) => {
        const rd = getRich(c.slug);
        return [
          `Fixing sideways ${rd.docs.split(",")[0].trim()} scans before submitting to ${c.portal}`,
          `Correcting page orientation in ${c.label} smartphone-scanned PDFs`,
          `Rotating upside-down pages in PDF reports and official letters in ${rd.cities}`,
          `Fixing orientation of ${rd.docs.split(",")[1]?.trim() || "bank statements"} and official letters in ${c.label}`,
          `Correcting PDF page rotation before email or cloud sharing in ${c.label}`,
        ];
      },
      faqs: (c: CC) => {
        const rd = getRich(c.slug);
        return [
          { question: faqQ1(`rotate-pdf-${c.slug}`, c.demonym, "rotate PDF pages"), answer: `${faqYes(4)} PDF page rotation is completely free for ${c.demonym} in ${rd.cities} and across ${c.label} — no signup, no watermark, no page count limit.` },
          { question: `Can I rotate only specific pages in my ${c.label} PDF?`, answer: `${faqYes(2)} rotate individual pages or apply rotation to all pages at once. Choose 90°, 180°, or 270° in either direction. Works for ${rd.docs.split(",")[0].trim()} and all standard PDF formats.` },
          { question: `Will the rotated PDF work with ${c.portal}?`, answer: `${faqYes(5)} rotated PDFs are standard format accepted by ${c.portal} and all PDF viewers and document portals used in ${c.label}.` },
          ...(COUNTRY_SPECIFIC_FAQS[c.slug] || []),
        ];
      },
    },
  ];

  for (const t of tools) {
    for (const c of COUNTRIES) {
      // Skip countries with near-zero PDF tool search volume
      if (NOINDEX_COUNTRY_SLUGS.has(c.slug)) continue;
      const slug = t.slug(c.slug);
      if (!skip(slug)) {
        const docScenarioKey = COUNTRY_DOC_SCENARIOS[c.slug]?.[t.id] !== undefined ? t.id : t.id.replace("-pdf", "");
        const docScenario = COUNTRY_DOC_SCENARIOS[c.slug]?.[docScenarioKey];
        const baseUseCases = t.useCases(c);
        const useCases = docScenario ? [docScenario, ...baseUseCases.slice(1)] : baseUseCases;
        // 5th body variant: industry-angle content for top-20 countries
        const useIndustryVariant = TOP_20_COUNTRY_SLUGS.has(c.slug) && slugVariant5(slug) === 4;
        const rawContent = useIndustryVariant ? industryAngleContent(t.id, c) : t.content(c);
        // Structural de-fingerprinting: ~20% of pages open with the secPara instead of closing with it
        const content = rotateSecPara(slug, rawContent);
        results.push({
          slug,
          title: t.title(c.label),
          h1: t.h1(c.label),
          description: t.desc(c.label, c.demonym),
          toolName: t.toolName,
          toolPath: t.toolPath,
          content,
          useCases,
          faqs: t.faqs(c),
        });
      }
    }
  }
  return results;
}

function genImageToolPages(): ProgrammaticPage[] {
  const pages: ProgrammaticPage[] = [];
  const tools = [
    { tool: "compress", label: "Compress Image", path: "/compress-img", verb: "compress" },
    { tool: "resize", label: "Resize Image", path: "/resize-image", verb: "resize" },
    { tool: "crop", label: "Crop Image", path: "/crop-image", verb: "crop" },
    { tool: "remove-background", label: "Remove Background", path: "/remove-bg", verb: "remove the background from" },
    { tool: "convert-to-webp", label: "Convert to WebP", path: "/convert-image", verb: "convert to WebP" },
  ];
  const useCases = [
    { slug: "for-website", label: "for Website", context: "web performance and page speed" },
    { slug: "for-ecommerce", label: "for eCommerce", context: "product listings and online stores" },
    { slug: "for-social-media", label: "for Social Media", context: "Instagram, Twitter, and LinkedIn posts" },
    { slug: "for-email", label: "for Email", context: "email attachments and campaigns" },
    { slug: "for-wordpress", label: "for WordPress", context: "WordPress blogs and websites" },
    { slug: "bulk-batch", label: "in Bulk", context: "batch processing multiple files at once" },
    { slug: "on-iphone", label: "on iPhone", context: "iOS devices and Safari browser" },
    { slug: "on-android", label: "on Android", context: "Android devices and Chrome browser" },
  ];
  for (const t of tools) {
    for (const uc of useCases) {
      const slug = `${t.tool}-image-${uc.slug}`;
      const title = `${t.label} ${uc.label} Free — Online Image Tool | PDF HUB 24`;
      const desc = `${t.label} ${uc.label.toLowerCase()} free online. Optimized for ${uc.context}. No software, no signup.`;
      pages.push({
        slug,
        title,
        description: desc,
        h1: `${t.label} ${uc.label} — Free Online Tool`,
        toolName: t.label,
        toolPath: t.path,
        content: `Use our free ${t.label.toLowerCase()} tool to ${t.verb} images ${uc.label.toLowerCase()}. Perfect for ${uc.context}. Upload your image, apply the transformation, and download instantly. Works in any browser on desktop and mobile — no software installation needed. Completely free with no signup, no watermark, and no file limit.`,
        useCases: [
          `${t.label.replace("Image", "images")} ${uc.label.toLowerCase()} for ${uc.context}`,
          `Batch ${t.verb} multiple images ${uc.label.toLowerCase()}`,
          `Free online alternative to expensive desktop software`,
          `Fast, secure processing — files deleted within 1 hour`,
        ],
        faqs: [
          { question: `Is this ${t.label.toLowerCase()} tool really free?`, answer: `Completely free — no subscription, no hidden fees, no watermark on output.` },
          { question: `Does it work on mobile?`, answer: `The tool works on iPhone, Android, and any modern browser without installing apps.` },
          { question: `How long are my files stored?`, answer: `Files are automatically deleted within 1 hour of upload. We do not retain your images.` },
        ],
      });
    }
  }
  return pages;
}

function genConversionQualityPages(): ProgrammaticPage[] {
  const pages: ProgrammaticPage[] = [];
  const qualities = [
    { slug: "high-quality", label: "High Quality", desc: "with maximum quality preservation" },
    { slug: "small-size", label: "Small File Size", desc: "with minimum file size output" },
    { slug: "lossless", label: "Lossless", desc: "without any quality loss" },
    { slug: "300dpi", label: "300 DPI", desc: "at 300 DPI print resolution" },
    { slug: "150dpi", label: "150 DPI", desc: "at 150 DPI screen resolution" },
  ];
  const conversions = [
    { slug: "pdf-to-jpg", label: "PDF to JPG", from: "PDF", to: "JPG", path: "/pdf-to-jpg" },
    { slug: "pdf-to-png", label: "PDF to PNG", from: "PDF", to: "PNG", path: "/pdf-to-png" },
    { slug: "jpg-to-pdf", label: "JPG to PDF", from: "JPG", to: "PDF", path: "/jpg-to-pdf" },
    { slug: "png-to-pdf", label: "PNG to PDF", from: "PNG", to: "PDF", path: "/png-to-pdf" },
    { slug: "word-to-pdf", label: "Word to PDF", from: "Word", to: "PDF", path: "/word-to-pdf" },
    { slug: "pdf-to-word", label: "PDF to Word", from: "PDF", to: "Word", path: "/pdf-to-word" },
  ];
  for (const c of conversions) {
    for (const q of qualities) {
      const slug = `${c.slug}-${q.slug}`;
      const title = `${c.label} ${q.label} Free Online | PDF HUB 24`;
      const desc = `Convert ${c.from} to ${c.to} ${q.desc} free online. No signup required, instant download.`;
      pages.push({
        slug,
        title,
        description: desc,
        h1: `${c.label} ${q.label} — Free Online Converter`,
        toolName: `${c.label} Converter`,
        toolPath: c.path,
        content: `Convert ${c.from} files to ${c.to} ${q.desc}. Our free online converter handles the conversion instantly in your browser. Upload your ${c.from} file, convert, and download the ${c.to} result. No software to install, no account to create, and no watermarks on output.`,
        useCases: [
          `Convert ${c.from} to ${c.to} ${q.desc} for professional documents`,
          `Batch convert multiple ${c.from} files at once`,
          `${c.from} to ${c.to} for email, web, and print`,
          `Free alternative to Adobe Acrobat conversion`,
        ],
        faqs: [
          { question: `Is the ${c.label} ${q.label} converter free?`, answer: `${faqYes((c.label.length + q.label.length) % 6)} completely free — no signup, no watermark, and no file size tricks.` },
          { question: `How many files can I convert?`, answer: `Convert as many files as you need — there is no daily limit or subscription required.` },
          { question: `Is my file secure?`, answer: `${faqYes(1)} files are processed securely and automatically deleted within 1 hour.` },
        ],
      });
    }
  }
  return pages;
}

let _allPages: ProgrammaticPage[] | null = null;
let _pageMap: Map<string, ProgrammaticPage> | null = null;

function buildAllPages(): ProgrammaticPage[] {
  if (_allPages) return _allPages;

  const generated = [
    ...genCompressSizePages(),
    ...genCompressUseCasePages(),
    ...genCompressPlatformPages(),
    ...genCompressProfessionPages(),
    ...genMergeCountPages(),
    ...genMergeUseCasePages(),
    ...genMergeProfessionPages(),
    ...genSplitPages(),
    ...genSplitUseCasePages(),
    ...genFormatConversionPages(),
    ...genProfessionToolPages(),
    ...genCountryPages(),
    ...genDocTypePages(),
    ...genIndustryPages(),
    ...genWatermarkAnnotateSignPages(),
    ...genOcrAndSecurityPages(),
    ...genBatchAndWorkflowPages(),
    ...genCountryToolPages(),
    ...genImageToolPages(),
    ...genConversionQualityPages(),
  ];

  // Deduplicate by slug, keeping first occurrence
  const seen = new Set<string>(EXISTING_SLUGS);
  const deduped: ProgrammaticPage[] = [];
  for (const p of generated) {
    if (!seen.has(p.slug)) {
      seen.add(p.slug);
      deduped.push(p);
    }
  }
  _allPages = deduped;
  return _allPages;
}

export function getAllGeneratedPages(): ProgrammaticPage[] {
  return buildAllPages();
}

export function getAllGeneratedSlugs(): string[] {
  return buildAllPages().map(p => p.slug);
}

export function getGeneratedPage(slug: string): ProgrammaticPage | undefined {
  if (!_pageMap) {
    _pageMap = new Map();
    for (const p of buildAllPages()) _pageMap.set(p.slug, p);
  }
  return _pageMap.get(slug);
}
