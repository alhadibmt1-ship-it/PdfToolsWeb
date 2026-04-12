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
      "/compress", "Compress PDF",
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
        { question: `Can I really compress a PDF to ${s.label}?`, answer: `Yes, for most text-based documents. Image-heavy files may need additional steps like grayscale conversion or page removal alongside compression to reach ${s.label}.` },
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
      "/compress", "Compress PDF",
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
        { question: "Will text be readable at this size?", answer: "Yes. Text in PDFs is vector-based and remains perfectly sharp regardless of compression level. Only embedded images may show slight softening." },
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
      "/compress", "Compress PDF",
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
        { question: "Is this tool safe for confidential documents?", answer: "Yes. Files are processed locally in your browser when possible, and any server-side processing deletes files within 1 hour. We do not access or store your document content." },
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
    "/compress", "Compress PDF",
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
      { question: "Is the compression free?", answer: "Yes, completely free. No signup, no watermark, no file count limit per session. Simply upload, compress, and download." },
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
    "/compress", "Compress PDF",
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
      { question: `Does PDF compression work on ${p.label}?`, answer: `Yes, fully. Our web-based tool works in any modern browser on ${p.label}. No app download, plugin, or software installation is required.` },
      { question: "What file size limit applies?", answer: "You can compress PDFs of any size. Very large files (100MB+) may take slightly longer to process but are fully supported." },
      { question: "Are my files safe on this device?", answer: "Yes. All processing happens over HTTPS, and files are permanently deleted from our servers within 1 hour. Nothing is saved or shared." },
    ]
  ));
}

function genCompressProfessionPages(): ProgrammaticPage[] {
  return PROFESSIONS.filter(pr => !skip(`compress-pdf-for-${pr.slug}`)).map(pr => page(
    `compress-pdf-for-${pr.slug}`,
    `Compress PDF for ${pr.label} Free | PDF HUB 24`,
    `Free PDF Compression for ${pr.label}`,
    `PDF compression tool built for ${pr.label}. Compress documents for portals, email, and sharing — free, no signup, no watermark.`,
    "/compress", "Compress PDF",
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
      { question: `Is this tool safe for sensitive documents used by ${pr.label}?`, answer: "Yes. Files are deleted within 1 hour of processing, connections are HTTPS-encrypted, and we do not access or store document content." },
      { question: "Can I compress multiple documents in a session?", answer: "Yes, you can compress as many files as you need in a single session. Each file is processed separately and independently." },
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
      "/merge", "Merge PDF",
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
        { question: `Can I really merge exactly ${n} PDFs into one?`, answer: `Yes. Upload your ${n} files, arrange them in order, and click Merge. The result is a single PDF containing all pages from all ${n} documents.` },
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
      "/merge", "Merge PDF",
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
      "/merge", "Merge PDF",
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
        { question: "Can I rearrange pages after merging?", answer: "Yes. After merging, you can use our Reorder Pages tool to fine-tune the page sequence before downloading your final document." },
        { question: "Is the merge free?", answer: "Yes, completely free. No account, no watermark, no file count limit. Merge as many documents as your submission requires." },
      ]
    ));

    const s2 = `combine-pdf-for-${u.slug}`;
    if (!skip(s2)) results.push(page(
      s2,
      `Combine PDF for ${u.label} Free | PDF HUB 24`,
      `Combine PDFs for ${u.label} — Free & Instant`,
      `Combine multiple PDF files into one organised document for ${u.label}. Free online tool, no signup required, instant download.`,
      "/merge", "Merge PDF",
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
    "/merge", "Merge PDF",
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
      { question: "Is this tool secure for professional documents?", answer: "Yes. All connections are HTTPS encrypted, and files are permanently deleted within 1 hour of processing." },
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
      "/split", "Split PDF",
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
        { question: "Are all my pages included in the output?", answer: "Yes. Every page from the original document appears in one of the output parts. No pages are lost or omitted." },
        { question: "Can I split a PDF into unequal parts?", answer: "Yes. Use the custom page range mode to assign any number of pages to each part. The ranges don't need to be equal." },
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
      "/split", "Split PDF",
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
        { question: "Can I download all output files at once?", answer: "Yes. After splitting, you can download all output files as a single ZIP archive for convenience." },
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
    "/split", "Split PDF",
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
      { question: "Can I split by specific page numbers?", answer: "Yes. The custom range option lets you define exactly where each split occurs by specifying page numbers." },
      { question: "Is split PDF quality preserved?", answer: "Yes. Splitting never re-encodes or re-compresses content. All output files are identical in quality to the corresponding pages in the original." },
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
        { question: `Is the ${f.label} to PDF conversion free?`, answer: "Yes, completely free. No signup, no watermark on the output, and no limit on conversions per session." },
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
        { question: `Is PDF to ${f.label} conversion free?`, answer: "Yes. No account, no watermark, and no limit on conversions per session. Completely free to use." },
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
    { prefix: "split-pdf-for-profession", toolPath: "/split", toolName: "Split PDF", action: "divide large PDF documents into focused sections" },
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
          { question: `Is this ${t.toolName} tool suitable for ${pr.label}?`, answer: `Yes. ${pr.context} Our tool is designed for professional use with no feature restrictions or watermarks.` },
          { question: "Is the tool free for professional use?", answer: "Yes, completely free. No account, no subscription, no per-file charge. Use it as often as you need." },
          { question: "Are documents safe when used by professionals?", answer: "Yes. All processing uses HTTPS encryption, files are never shared with third parties, and all uploads are deleted within 1 hour." },
        ]
      ));
    }
  }
  return results;
}

function genCountryPages(): ProgrammaticPage[] {
  const results: ProgrammaticPage[] = [];
  for (const c of COUNTRIES) {
    const s1 = `compress-pdf-${c.slug}`;
    if (!skip(s1)) results.push(page(
      s1,
      `Compress PDF Online Free — Best Tool for ${c.label} Users | PDF HUB 24`,
      `Best Free PDF Compressor for ${c.label} Users`,
      `Compress PDF online free — trusted by ${c.demonym}. No signup, no watermark. Works perfectly for ${c.portal}.`,
      "/compress", "Compress PDF",
      `${c.demonym} regularly submit documents to ${c.portal}, many of which enforce strict file-size limits. Our free PDF compressor helps you meet these requirements reliably, without needing to install software or create an account.

The tool is fully accessible from ${c.label} — no VPN required, no regional restrictions. Simply open the page in any modern browser, upload your PDF, choose a compression level, and download the result.

For ${c.portal} submissions specifically, medium compression usually achieves the right balance between file size and document quality. For stricter limits (under 500KB), use high compression and consider converting colour scans to grayscale first for maximum reduction.

PDF HUB 24 serves users from over 150 countries including thousands of users in ${c.label} every month. The tool is optimised for speed on all connection types, including mobile data networks.`,
      [
        `Submitting compressed documents to ${c.portal}`,
        `Meeting file-size requirements for ${c.label} government online services`,
        `Sharing compressed PDFs via email with ${c.label} colleagues and clients`,
        `Reducing PDF size before uploading to ${c.label} cloud storage platforms`,
        `Preparing compressed documents for ${c.label} regulatory or compliance portals`,
      ],
      [
        { question: `Can ${c.demonym} use this PDF compressor for free?`, answer: `Yes. The tool is completely free, with no signup required. It works in any browser and is accessible from ${c.label} without restrictions.` },
        { question: `Does the tool work for ${c.portal}?`, answer: `Yes. Our compressor produces PDFs that meet the file-size requirements of ${c.portal}. Use medium or high compression to stay within their specific limits.` },
        { question: "Is there a daily or monthly usage limit?", answer: "No. You can compress as many PDFs as you need with no limits on usage, file count, or session length." },
      ]
    ));

    const s2 = `pdf-tools-${c.slug}`;
    if (!skip(s2)) results.push(page(
      s2,
      `Free PDF Tools for ${c.label} Users | PDF HUB 24`,
      `Free PDF Tools for ${c.label} — 49+ Online Tools`,
      `Complete PDF toolkit for ${c.label} users. Compress, merge, split, convert, sign, and edit PDFs free. No signup, works on any device.`,
      "/", "PDF HUB 24",
      `PDF HUB 24 provides ${c.demonym} with access to 49+ free online PDF tools with no registration, no watermarks, and no hidden costs. Whether you're preparing documents for ${c.portal} or simply managing everyday PDF files, our complete toolkit has everything you need.

Popular tools among ${c.demonym} include: Compress PDF for meeting government portal file-size limits, Merge PDF for assembling multi-document submissions, PDF to Word for converting official documents into editable format, and Sign PDF for adding digital signatures to contracts and forms.

All tools are fully accessible from ${c.label} — no VPN, no restrictions. The service is optimised for all connection speeds and works on desktop computers, laptops, tablets, and mobile phones.`,
      [
        `Accessing free PDF tools without paying for software subscriptions in ${c.label}`,
        `Preparing documents for ${c.portal} using free online tools`,
        `Converting, compressing, and editing PDFs from any ${c.label} device`,
        `Managing government and professional document workflows for free`,
        `Using enterprise-grade PDF tools without enterprise costs in ${c.label}`,
      ],
      [
        { question: `Are PDF HUB 24 tools available to ${c.demonym}?`, answer: `Yes. All 49+ tools are fully accessible from ${c.label} with no regional restrictions, no VPN required, and no signup.` },
        { question: `Which tools are most useful for ${c.label} document requirements?`, answer: `For ${c.portal}, the most commonly needed tools are Compress PDF, Merge PDF, and PDF to Word. All are free and unlimited.` },
        { question: `Is PDF HUB 24 free for ${c.demonym}?`, answer: "Yes, completely free. All 49+ tools are available at no charge, with no account required and no watermarks added." },
      ]
    ));

    const s3 = `free-pdf-tools-${c.slug}`;
    if (!skip(s3)) results.push(page(
      s3,
      `Free PDF Tools ${c.label} — No Signup Required | PDF HUB 24`,
      `Free PDF Tools in ${c.label} — Complete Toolkit`,
      `Free PDF tools for ${c.label}. 49+ tools including compress, merge, split, convert, sign, and edit. No signup, no watermark, no cost.`,
      "/", "PDF HUB 24",
      `Finding genuinely free PDF tools in ${c.label} without hidden costs, forced registrations, or watermarks is challenging. PDF HUB 24 provides exactly that — a complete set of 49+ PDF tools that are permanently free, require no account creation, and never add watermarks to your documents.

For ${c.demonym} specifically, the most popular free tools are: Compress PDF (for government and commercial portal submissions), Merge PDF (for assembling multi-document applications), PDF to Word (for editing official documents), and Protect PDF (for adding passwords to sensitive files before sharing).

All tools work identically for users in ${c.label} as anywhere else in the world. There are no geographical restrictions, premium tiers, or country-specific limitations. Every tool is free, every result is clean, and every file is deleted within 1 hour for your privacy.`,
      [
        `Free PDF compression for ${c.label} government portal submissions`,
        `Free PDF merging for multi-document professional applications in ${c.label}`,
        `Free PDF conversion for editing official documents in ${c.label}`,
        `Free PDF signing for contracts and agreements handled in ${c.label}`,
        `Free PDF tools with no signup or watermark for ${c.demonym}`,
      ],
      [
        { question: `Are there any free PDF tools in ${c.label} without watermarks?`, answer: `Yes. PDF HUB 24 provides 49+ PDF tools completely free for ${c.demonym} with no watermarks, no account required, and no hidden fees.` },
        { question: `Do these tools work on ${c.label} government portals?`, answer: `Yes. Our compress, merge, and convert tools produce PDFs compatible with ${c.portal} and all standard document portals.` },
        { question: `How long has PDF HUB 24 been serving ${c.label} users?`, answer: `PDF HUB 24 has been serving ${c.demonym} as part of a global user base of millions. The service is free and permanently available.` },
      ]
    ));
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
      "/compress", "Compress PDF",
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
        { question: `Is the compressed ${d.label} still legally valid?`, answer: "Yes. PDF compression does not alter the legal status or certified content of the document. The text, signatures, and data are unchanged." },
      ]
    ));

    const s2 = `merge-${d.slug}-pdf`;
    if (!skip(s2)) results.push(page(
      s2,
      `Merge ${d.label} PDF Files Free | PDF HUB 24`,
      `Merge ${d.label} PDFs Into One Document`,
      `Merge multiple ${d.label} PDF files into one organised document free online. No signup, no watermark, instant download.`,
      "/merge", "Merge PDF",
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
        { question: `Is merged ${d.label} content preserved accurately?`, answer: "Yes. Merging never alters the content of any document. Every page, number, date, and signature is preserved exactly." },
        { question: `Can I merge ${d.label} PDFs from different sources?`, answer: "Yes. PDFs from different software, scanners, or institutions can all be merged regardless of how they were originally created." },
      ]
    ));
  }
  return results;
}

function genIndustryPages(): ProgrammaticPage[] {
  const results: ProgrammaticPage[] = [];
  const tools = [
    { prefix: "compress-pdf-for", toolPath: "/compress", toolName: "Compress PDF" },
    { prefix: "merge-pdf-for", toolPath: "/merge", toolName: "Merge PDF" },
    { prefix: "split-pdf-for", toolPath: "/split", toolName: "Split PDF" },
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
          { question: `Is PDF HUB 24 suitable for ${ind.label} industry use?`, answer: `Yes. ${ind.context} Our tool handles the document types and quality requirements typical of ${ind.label} professional workflows.` },
          { question: `Is the tool free for ${ind.label} organisations?`, answer: "Yes, completely free. No subscription, no per-document charge, and no user limit. Suitable for individuals and teams." },
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
        { question: "Can I apply the watermark to only some pages?", answer: "Yes. You can apply the watermark to all pages or specify page ranges for selective watermarking." },
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
        { question: `Can I sign PDF ${u.label} with a drawn signature?`, answer: `Yes. Our tool supports drawn signatures (using mouse or touchscreen), typed signatures, and uploaded signature images for signing ${u.label}.` },
        { question: `Are digitally signed ${u.label} legally valid?`, answer: "In most jurisdictions, digitally signed documents are legally valid for commercial agreements. For regulated transactions, verify the signature standard required." },
        { question: `Is signing ${u.label} on PDF HUB 24 free?`, answer: "Yes, completely free. No account required and no watermark added to signed documents." },
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
        { question: `Does your OCR tool support ${l.label}?`, answer: `Yes. Our OCR engine supports ${l.label} character recognition. Clear, high-resolution scans give the best text extraction accuracy.` },
        { question: `What scan quality is needed for good OCR results in ${l.label}?`, answer: "Scans at 200–300 DPI with good contrast give the best results. Blurry or very low-contrast scans reduce OCR accuracy in any language." },
        { question: `Is ${l.label} OCR free?`, answer: "Yes, completely free. No signup, no watermark, and no page-count limit per file." },
      ]
    ));
  }

  const securityPages = [
    { slug: "compress-and-protect-pdf", toolPath: "/compress", toolName: "Compress PDF", h1: "Compress and Protect PDF in One Workflow", desc: "Compress your PDF to reduce file size, then protect it with a password — two essential steps for sharing sensitive documents securely." },
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
        { question: "Is this tool free?", answer: "Yes, completely free. No account, no watermark, and no usage limits." },
        { question: "Are my files safe?", answer: "Yes. Files are processed over HTTPS and deleted within 1 hour. We never store or access document content." },
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
        "/compress", "Compress PDF",
        `${bp.desc}

Our free PDF tools handle this task with no registration required. Simply open the tool in your browser, upload your file or files, complete the operation, and download the results. All processing is done securely with HTTPS encryption, and files are automatically deleted from our servers within 1 hour of processing.

No software installation, no monthly subscription, and no watermarks on output files. PDF HUB 24 provides professional-grade PDF tools that are genuinely free for everyone.`,
        ["Processing PDFs without installing software or paying subscriptions", "Handling document preparation for email, upload portals, and sharing", "Managing document workflows efficiently from any device", "Maintaining document quality while reducing file size or reorganising pages", "Processing sensitive documents securely with automatic deletion"],
        [
          { question: "Is this tool really free?", answer: "Yes, completely free. No signup, no credit card, no watermark on output, and no usage limits." },
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
      toolPath: "/merge",
      toolName: "Merge PDF",
      content: (c: { label: string; demonym: string; portal: string }) =>
        `${c.demonym} regularly need to combine multiple PDF files — from multi-part government applications and multi-page contracts to bundled financial documents. Our free PDF merger lets you upload multiple PDFs, arrange them in any order, and download a single combined file in seconds.\n\nThe tool works directly from any browser in ${c.label} — no app to install, no account to create. Whether you are using a desktop computer, laptop, or mobile phone, the experience is identical. Simply drag and drop your files, order them as needed, and click Merge.\n\nFor ${c.portal}, bundling all required documents into a single PDF is often the most convenient submission format. Our merge tool makes this a one-step process, free for all ${c.demonym}.`,
      useCases: (c: { label: string; demonym: string; portal: string }) => [
        `Merging multiple PDF documents for submission to ${c.portal}`,
        `Combining contracts, invoices, and supporting files into one PDF in ${c.label}`,
        `Assembling multi-part applications as a single document for ${c.label} authorities`,
        `Bundling PDF reports for sharing with ${c.label} colleagues and clients`,
        `Creating unified document packages for ${c.label} regulatory submissions`,
      ],
      faqs: (c: { label: string; demonym: string; portal: string }) => [
        { question: `Can ${c.demonym} merge PDFs for free?`, answer: `Yes. PDF merging is completely free for all ${c.demonym} with no signup, no watermark, and no file count limit.` },
        { question: `How many PDFs can I merge in ${c.label}?`, answer: `There is no limit on the number of PDFs you can merge. Upload as many files as your document requires.` },
        { question: `Does the merged PDF work with ${c.portal}?`, answer: `Yes. Our merged PDFs are fully compatible with all major document portals and comply with standard PDF specifications.` },
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
      content: (c: { label: string; demonym: string; portal: string }) =>
        `Converting PDF documents to editable Word files is an everyday need for ${c.demonym} — whether editing scanned forms from ${c.portal}, updating contracts, revising academic documents, or repurposing official letters.\n\nOur free PDF to Word converter accurately extracts text, tables, and formatting from any PDF and delivers an editable DOCX file in seconds. The conversion uses intelligent layout analysis to preserve paragraph structure, headings, and table rows as closely as possible.\n\nThe tool is fully accessible in ${c.label} from any browser on any device. No Microsoft Word subscription is required to use the converter — the output DOCX can be opened in any word processor including LibreOffice, Google Docs, and WPS Office.`,
      useCases: (c: { label: string; demonym: string; portal: string }) => [
        `Converting official PDF documents from ${c.portal} into editable Word format`,
        `Editing scanned government forms and certificates in ${c.label}`,
        `Extracting text from PDF contracts for revision by ${c.label} legal teams`,
        `Converting PDF academic papers and reports for editing in ${c.label}`,
        `Repurposing PDF templates from ${c.label} institutions into editable documents`,
      ],
      faqs: (c: { label: string; demonym: string; portal: string }) => [
        { question: `Can ${c.demonym} convert PDF to Word for free?`, answer: `Yes. The PDF to Word converter is completely free for ${c.demonym} — no signup, no watermark, and no file size tricks.` },
        { question: `Does PDF to Word conversion work for documents from ${c.portal}?`, answer: `Yes. Our converter handles standard PDFs from any source including government portals, banks, and institutions in ${c.label}.` },
        { question: `What Word format does the conversion produce?`, answer: `The output is a standard DOCX file compatible with Microsoft Word 2010+, LibreOffice, Google Docs, and all modern word processors.` },
      ],
    },
    {
      id: "sign-pdf",
      slug: (c: string) => `sign-pdf-${c}`,
      title: (label: string) => `Sign PDF Free Online in ${label} | PDF HUB 24`,
      h1: (label: string) => `Sign PDF Online in ${label} — Free Digital Signature`,
      desc: (label: string, demonym: string) => `Sign PDF documents free online in ${label}. Trusted by ${demonym}. Draw, type, or upload your signature. No signup required.`,
      toolPath: "/sign-pdf",
      toolName: "Sign PDF",
      content: (c: { label: string; demonym: string; portal: string }) =>
        `${c.demonym} sign contracts, agreements, consent forms, and official documents regularly. Our free online PDF signature tool lets you add a legally recognised handwritten-style signature to any PDF without printing, scanning, or paying for specialised software.\n\nThree signature methods are available: draw your signature with your mouse or finger, type your name and choose a handwriting-style font, or upload an image of your actual signature. The signature is embedded directly into the PDF and is visible in all standard PDF viewers.\n\nFor everyday use in ${c.label} — signing rental agreements, employment contracts, consent forms, or documents submitted to ${c.portal} — this free tool handles everything quickly and securely. Files are deleted within 1 hour.`,
      useCases: (c: { label: string; demonym: string; portal: string }) => [
        `Signing contracts and agreements digitally in ${c.label}`,
        `Adding handwritten signatures to documents for ${c.portal}`,
        `Signing consent forms, applications, and official letters in ${c.label}`,
        `Signing rental, employment, and service contracts as a ${c.label} resident`,
        `Adding digital signatures to PDFs without expensive software in ${c.label}`,
      ],
      faqs: (c: { label: string; demonym: string; portal: string }) => [
        { question: `Can ${c.demonym} sign PDFs for free?`, answer: `Yes. PDF signing is completely free for ${c.demonym} — draw, type, or upload your signature with no account required.` },
        { question: `Is a digital signature valid in ${c.label}?`, answer: `Electronic signatures are widely accepted for personal and commercial documents. For legally certified signatures on court or regulatory documents, consult a qualified professional in ${c.label}.` },
        { question: `Does the signature work with ${c.portal}?`, answer: `Yes. Our signed PDFs are standard PDF files accepted by all major document portals and email systems.` },
      ],
    },
    {
      id: "split-pdf",
      slug: (c: string) => `split-pdf-${c}`,
      title: (label: string) => `Split PDF Free Online in ${label} | PDF HUB 24`,
      h1: (label: string) => `Split PDF Online in ${label} — Extract Any Pages Free`,
      desc: (label: string, demonym: string) => `Split PDF documents free online in ${label}. Extract specific pages or split by page range. Trusted by ${demonym}. No signup.`,
      toolPath: "/split",
      toolName: "Split PDF",
      content: (c: { label: string; demonym: string; portal: string }) =>
        `Splitting a PDF is useful whenever you need to share only part of a document — a single section of a report, specific pages from a scanned document, or selected pages from a multi-chapter PDF from ${c.portal}.\n\nOur free PDF splitter lets ${c.demonym} extract any page or range of pages from a PDF document in seconds. Simply upload your PDF, specify the pages you need (e.g., "pages 3-7" or "pages 1, 5, 12"), and download the result as a new, smaller PDF.\n\nThe tool is fully accessible from ${c.label} with no restrictions. Works on desktop and mobile browsers without any software installation. Extracted pages maintain their original quality, formatting, and any embedded content.`,
      useCases: (c: { label: string; demonym: string; portal: string }) => [
        `Extracting specific pages from ${c.portal} PDF documents in ${c.label}`,
        `Splitting large PDF reports into individual sections for ${c.label} colleagues`,
        `Separating a multi-document scan into individual files in ${c.label}`,
        `Extracting a single page certificate or form from a larger PDF package`,
        `Creating a smaller PDF excerpt to share with ${c.label} contacts`,
      ],
      faqs: (c: { label: string; demonym: string; portal: string }) => [
        { question: `Can ${c.demonym} split PDFs for free?`, answer: `Yes. PDF splitting is completely free for all ${c.demonym} — no signup, no watermark, and no page count limit.` },
        { question: `How do I extract specific pages in ${c.label}?`, answer: `Upload your PDF, type the page numbers or ranges you want to extract (e.g., 1-3, 5, 8-10), and download the new PDF with only those pages.` },
        { question: `Does splitting reduce the quality of my PDF?`, answer: `No. Splitting only separates pages — it does not compress or alter the quality of text, images, or any other content.` },
      ],
    },
    {
      id: "convert-pdf",
      slug: (c: string) => `convert-pdf-${c}`,
      title: (label: string) => `Convert PDF Free Online in ${label} | PDF HUB 24`,
      h1: (label: string) => `Convert PDF Online in ${label} — All Formats Free`,
      desc: (label: string, demonym: string) => `Convert PDF to Word, Excel, JPG, PNG, PowerPoint free online in ${label}. Trusted by ${demonym}. No signup, instant download.`,
      toolPath: "/convert-pdf",
      toolName: "PDF Converter",
      content: (c: { label: string; demonym: string; portal: string }) =>
        `${c.demonym} frequently need to convert PDFs into different formats — Word for editing, Excel for data extraction, JPG for image sharing, or PNG for high-quality images. Our free PDF conversion suite covers all major formats in one place.\n\nAll conversion tools are accessible from ${c.label} without restriction. Choose from PDF to Word, PDF to Excel, PDF to JPG, PDF to PNG, PDF to PowerPoint, and more. Each converter produces high-quality output that accurately preserves the layout and content of your original PDF.\n\nFor documents from ${c.portal} and other ${c.label} sources, our converters handle standard PDF formats reliably. No software to install, no account to create — just upload, convert, and download.`,
      useCases: (c: { label: string; demonym: string; portal: string }) => [
        `Converting PDF documents from ${c.portal} to editable Word or Excel format`,
        `Converting PDF reports and presentations to JPG or PNG images in ${c.label}`,
        `Transforming PDF data tables into Excel spreadsheets for ${c.label} businesses`,
        `Converting PDF slides to PowerPoint for ${c.label} presentations`,
        `Converting scanned documents from ${c.label} offices to editable text formats`,
      ],
      faqs: (c: { label: string; demonym: string; portal: string }) => [
        { question: `What PDF conversion formats are available for ${c.demonym}?`, answer: `Convert PDF to Word, Excel, JPG, PNG, PowerPoint, and more — all free for ${c.demonym} with no signup or watermark.` },
        { question: `Does PDF conversion work for ${c.portal} documents?`, answer: `Yes. Our converters handle standard PDFs from all sources including government portals, banks, and institutions in ${c.label}.` },
        { question: `How long does PDF conversion take in ${c.label}?`, answer: `Most conversions complete in 10-30 seconds. The tool works on all connection speeds including mobile data networks.` },
      ],
    },
    {
      id: "compress-pdf-online",
      slug: (c: string) => `compress-pdf-online-${c}`,
      title: (label: string) => `Compress PDF Online in ${label} — Best Free Tool | PDF HUB 24`,
      h1: (label: string) => `Best PDF Compressor Online in ${label} — 100% Free`,
      desc: (label: string, demonym: string) => `Best free PDF compressor online for ${label}. Trusted by ${demonym}. Reduce PDF size by 90% instantly. No signup, no watermark.`,
      toolPath: "/compress",
      toolName: "Compress PDF",
      content: (c: { label: string; demonym: string; portal: string }) =>
        `The best free PDF compressor online for ${c.label} — no software, no subscription, no watermark. ${c.demonym} use our tool daily to reduce PDF file sizes for email, WhatsApp, government portal uploads, and cloud storage.\n\nChoose from three compression levels: low compression for maximum quality retention, medium compression for the best balance (recommended for ${c.portal} submissions), and high compression for the smallest possible file size. All levels preserve text at full sharpness — only embedded images are reduced.\n\nThe compressor is optimised for speed on all connection types available in ${c.label} including mobile data. Files are processed instantly and deleted within 1 hour of upload. Completely free, with no restrictions on how many PDFs you compress.`,
      useCases: (c: { label: string; demonym: string; portal: string }) => [
        `Best free PDF compression for ${c.label} government portal submissions`,
        `Compressing PDFs for WhatsApp and email sharing in ${c.label}`,
        `Reducing PDF file size for ${c.portal} upload limits`,
        `Free PDF compressor for students and professionals in ${c.label}`,
        `Compressing PDF without watermark online in ${c.label}`,
      ],
      faqs: (c: { label: string; demonym: string; portal: string }) => [
        { question: `What is the best free PDF compressor in ${c.label}?`, answer: `PDF HUB 24 is trusted by thousands of ${c.demonym} for free PDF compression with no signup, no watermark, and no hidden costs.` },
        { question: `How much can I compress a PDF in ${c.label}?`, answer: `Typically 60-90% file size reduction depending on content. Image-heavy PDFs compress the most; text-only PDFs typically compress 30-60%.` },
        { question: `Is PDF compression free for ${c.demonym}?`, answer: `Yes, completely free. No account needed, no watermarks added, no daily limits. Compress as many PDFs as you need.` },
      ],
    },
    {
      id: "edit-pdf",
      slug: (c: string) => `edit-pdf-${c}`,
      title: (label: string) => `Edit PDF Free Online in ${label} | PDF HUB 24`,
      h1: (label: string) => `Edit PDF Online in ${label} — Free PDF Editor`,
      desc: (label: string, demonym: string) => `Edit PDF files free online in ${label}. Add text, annotations, and signatures. Trusted by ${demonym}. No signup, instant results.`,
      toolPath: "/edit-pdf",
      toolName: "Edit PDF",
      content: (c: { label: string; demonym: string; portal: string }) =>
        `${c.demonym} regularly need to make quick edits to PDF files — adding text notes, highlighting important sections, inserting comments, or marking up documents before sharing. Our free online PDF editor handles all of these tasks without installing software or creating an account.\n\nThe editor works directly in your browser in ${c.label}. Open any PDF, click to add text annotations, use highlighting tools to mark key sections, and download the edited PDF instantly. All edits are embedded into the PDF file and visible in any standard PDF viewer.\n\nFor documents from ${c.portal} and other ${c.label} sources, our editor handles standard PDFs reliably. Files are processed securely over HTTPS and deleted from our servers within 1 hour — your document content is never stored or accessed by us.`,
      useCases: (c: { label: string; demonym: string; portal: string }) => [
        `Adding text annotations to official PDF documents from ${c.portal}`,
        `Marking up PDF reports and contracts for ${c.label} colleagues`,
        `Inserting comments and notes into PDF documents in ${c.label}`,
        `Editing PDF forms and applications for ${c.label} submissions`,
        `Annotating scanned documents from ${c.label} government offices`,
      ],
      faqs: (c: { label: string; demonym: string; portal: string }) => [
        { question: `Can ${c.demonym} edit PDFs for free online?`, answer: `Yes. Our PDF editor is completely free for ${c.demonym} — no signup, no watermark, and no usage limits.` },
        { question: `What editing features are available for ${c.label} users?`, answer: `Add text, highlight sections, insert annotations, and draw shapes. All edits are embedded into the PDF and compatible with all standard PDF viewers.` },
        { question: `Is edited PDF compatible with ${c.portal}?`, answer: `Yes. Our edited PDFs are standard PDF files accepted by all major document portals and email systems used in ${c.label}.` },
      ],
    },
    {
      id: "jpg-to-pdf",
      slug: (c: string) => `jpg-to-pdf-${c}`,
      title: (label: string) => `JPG to PDF Free Online in ${label} | PDF HUB 24`,
      h1: (label: string) => `Convert JPG to PDF in ${label} — Free Online Tool`,
      desc: (label: string, demonym: string) => `Convert JPG images to PDF free online in ${label}. Trusted by ${demonym}. Combine multiple images into one PDF. No signup required.`,
      toolPath: "/jpg-to-pdf",
      toolName: "JPG to PDF",
      content: (c: { label: string; demonym: string; portal: string }) =>
        `Converting JPG images to PDF is one of the most common document tasks for ${c.demonym} — scanning ID cards, photographs, receipts, and handwritten forms into a single PDF document for submission to ${c.portal} or sharing with colleagues.\n\nOur free JPG to PDF converter lets you upload one or multiple JPG images and combine them into a single PDF in seconds. Images are arranged in the order you upload them, and the output PDF maintains the full resolution of your original photos.\n\nThe tool works from any browser in ${c.label} on any device — smartphone, tablet, or desktop. No app download, no account, no watermark. Simply select your images, click Convert, and download your PDF. Files are automatically deleted within 1 hour.`,
      useCases: (c: { label: string; demonym: string; portal: string }) => [
        `Converting ID card and passport photos to PDF for ${c.portal} submissions`,
        `Creating PDF documents from scanned receipts and invoices in ${c.label}`,
        `Combining multiple JPG images into a single PDF for ${c.label} applications`,
        `Converting smartphone photos of documents to PDF format in ${c.label}`,
        `Creating PDF portfolios from JPG images for ${c.label} institutions`,
      ],
      faqs: (c: { label: string; demonym: string; portal: string }) => [
        { question: `Can ${c.demonym} convert JPG to PDF for free?`, answer: `Yes. JPG to PDF conversion is completely free for ${c.demonym} — no signup, no watermark, and no limit on image count.` },
        { question: `Can I combine multiple JPG images into one PDF in ${c.label}?`, answer: `Yes. Upload multiple JPG images and they will be combined into a single PDF in the order you upload them.` },
        { question: `Does the JPG to PDF output work with ${c.portal}?`, answer: `Yes. Our PDFs are standard format accepted by all major document portals and submission systems used in ${c.label}.` },
      ],
    },
    {
      id: "pdf-to-jpg",
      slug: (c: string) => `pdf-to-jpg-${c}`,
      title: (label: string) => `PDF to JPG Free Online in ${label} | PDF HUB 24`,
      h1: (label: string) => `Convert PDF to JPG in ${label} — Free High-Quality Tool`,
      desc: (label: string, demonym: string) => `Convert PDF to JPG images free online in ${label}. Trusted by ${demonym}. High-resolution output, instant download. No signup.`,
      toolPath: "/pdf-to-jpg",
      toolName: "PDF to JPG",
      content: (c: { label: string; demonym: string; portal: string }) =>
        `${c.demonym} frequently need to convert PDF pages into JPG images — for sharing on messaging apps, inserting into presentations, uploading to websites, or attaching to email when PDF format isn't accepted.\n\nOur free PDF to JPG converter extracts pages from any PDF as high-resolution JPG images. You can convert a single page or all pages at once. The output images are optimised for clarity and detail, making them suitable for both screen display and printing.\n\nThe tool is fully accessible from ${c.label} with no regional restrictions. Upload your PDF, select the pages or convert all, and download your JPG images. For documents obtained from ${c.portal} or other ${c.label} sources, our converter handles all standard PDF formats reliably.`,
      useCases: (c: { label: string; demonym: string; portal: string }) => [
        `Converting PDF pages from ${c.portal} to JPG images for sharing in ${c.label}`,
        `Extracting PDF content as images for presentations in ${c.label}`,
        `Converting PDF certificates and documents to JPG for upload portals`,
        `Sharing PDF pages via WhatsApp and messaging apps commonly used in ${c.label}`,
        `Converting scanned PDF documents to JPG images for editing in ${c.label}`,
      ],
      faqs: (c: { label: string; demonym: string; portal: string }) => [
        { question: `Can ${c.demonym} convert PDF to JPG for free?`, answer: `Yes. PDF to JPG conversion is completely free for ${c.demonym} — no signup, no watermark, and high-quality output.` },
        { question: `What resolution are the JPG images output for ${c.label} users?`, answer: `Images are output at high resolution suitable for printing, presentations, and digital sharing. Quality is maintained from the original PDF.` },
        { question: `Can I convert multiple PDF pages to JPG at once in ${c.label}?`, answer: `Yes. Convert all pages of a PDF to individual JPG images in one operation and download them as a ZIP archive.` },
      ],
    },
    {
      id: "protect-pdf",
      slug: (c: string) => `protect-pdf-${c}`,
      title: (label: string) => `Password Protect PDF Free in ${label} | PDF HUB 24`,
      h1: (label: string) => `Protect PDF with Password in ${label} — Free Online Tool`,
      desc: (label: string, demonym: string) => `Add password protection to PDF free online in ${label}. Trusted by ${demonym}. 256-bit AES encryption. No signup required.`,
      toolPath: "/protect-pdf",
      toolName: "Protect PDF",
      content: (c: { label: string; demonym: string; portal: string }) =>
        `Protecting sensitive PDF documents with a password is essential for ${c.demonym} sharing confidential files — from personal ID documents and bank statements to business contracts and legal filings. Our free PDF password protection tool adds 256-bit AES encryption to any PDF in seconds.\n\nSimply upload your PDF, set your chosen password, and download the protected file. The password-protected PDF requires the correct password to open in any PDF viewer. This is the same encryption standard used by banks and government agencies worldwide, including those in ${c.label}.\n\nFor sensitive documents related to ${c.portal} or other ${c.label} institutions, adding password protection before sharing by email or cloud storage significantly reduces the risk of unauthorised access. The tool is free, instant, and requires no account.`,
      useCases: (c: { label: string; demonym: string; portal: string }) => [
        `Password protecting sensitive documents before emailing in ${c.label}`,
        `Encrypting PDF files containing personal information for ${c.demonym}`,
        `Securing business contracts and legal documents shared in ${c.label}`,
        `Protecting confidential reports before sharing via cloud storage in ${c.label}`,
        `Adding password protection to PDF applications sent to ${c.portal}`,
      ],
      faqs: (c: { label: string; demonym: string; portal: string }) => [
        { question: `Can ${c.demonym} password protect PDFs for free?`, answer: `Yes. PDF password protection is completely free for ${c.demonym} — no signup, no watermark, with 256-bit AES encryption.` },
        { question: `What encryption level is used for ${c.label} users?`, answer: `256-bit AES encryption — the highest standard available for PDF protection, used by banks and government agencies worldwide.` },
        { question: `Can I open the protected PDF with ${c.portal} systems?`, answer: `Yes. Password-protected PDFs are standard format compatible with all PDF viewers. The recipient simply needs the password to open the file.` },
      ],
    },
    {
      id: "rotate-pdf",
      slug: (c: string) => `rotate-pdf-${c}`,
      title: (label: string) => `Rotate PDF Free Online in ${label} | PDF HUB 24`,
      h1: (label: string) => `Rotate PDF Pages in ${label} — Free Online Tool`,
      desc: (label: string, demonym: string) => `Rotate PDF pages free online in ${label}. Fix sideways or upside-down pages instantly. Trusted by ${demonym}. No signup required.`,
      toolPath: "/rotate-pdf",
      toolName: "Rotate PDF",
      content: (c: { label: string; demonym: string; portal: string }) =>
        `Scanned documents and PDFs from ${c.portal} sometimes arrive with pages in the wrong orientation — sideways or upside down. Our free PDF rotation tool lets ${c.demonym} fix page orientation instantly without any software installation.\n\nRotate individual pages or all pages at once by 90°, 180°, or 270° in either direction. The corrected orientation is permanently saved into the PDF file, so it displays correctly in all PDF viewers and when printed. This is especially useful for mobile phone scans and documents generated by older scanning equipment.\n\nThe tool is fully accessible from ${c.label} on any browser and any device. Upload your PDF, select the rotation you need, and download the corrected file in seconds. All files are deleted within 1 hour and your documents are never accessed or stored.`,
      useCases: (c: { label: string; demonym: string; portal: string }) => [
        `Fixing sideways scanned documents before submitting to ${c.portal}`,
        `Correcting page orientation in PDFs created by ${c.label} mobile phone scans`,
        `Rotating upside-down pages in PDF reports and presentations in ${c.label}`,
        `Fixing orientation of bank statements and official letters in ${c.label}`,
        `Correcting PDF page rotation before email or cloud sharing in ${c.label}`,
      ],
      faqs: (c: { label: string; demonym: string; portal: string }) => [
        { question: `Can ${c.demonym} rotate PDF pages for free?`, answer: `Yes. PDF page rotation is completely free for ${c.demonym} — no signup, no watermark, and no limit on page count.` },
        { question: `Can I rotate only specific pages in my PDF in ${c.label}?`, answer: `Yes. Choose to rotate individual pages or apply rotation to all pages at once. Rotate 90°, 180°, or 270° in either direction.` },
        { question: `Will the rotated PDF work with ${c.portal}?`, answer: `Yes. Rotated PDFs are standard format accepted by all PDF viewers and document portals used in ${c.label}.` },
      ],
    },
  ];

  for (const t of tools) {
    for (const c of COUNTRIES) {
      const slug = t.slug(c.slug);
      if (!skip(slug)) {
        results.push({
          slug,
          title: t.title(c.label),
          h1: t.h1(c.label),
          description: t.desc(c.label, c.demonym),
          toolName: t.toolName,
          toolPath: t.toolPath,
          content: t.content(c),
          useCases: t.useCases(c),
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
          { question: `Is this ${t.label.toLowerCase()} tool really free?`, answer: `Yes, completely free. No subscription, no hidden fees, no watermark on output.` },
          { question: `Does it work on mobile?`, answer: `Yes, the tool works on iPhone, Android, and any modern browser without installing apps.` },
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
          { question: `Is the ${c.label} ${q.label} converter free?`, answer: `Yes, completely free with no signup, no watermark, and no file size tricks.` },
          { question: `How many files can I convert?`, answer: `Convert as many files as you need — there is no daily limit or subscription required.` },
          { question: `Is my file secure?`, answer: `Yes. Files are processed securely and automatically deleted within 1 hour.` },
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
