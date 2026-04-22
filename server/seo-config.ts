import { toolSEOData } from "../client/src/data/toolSEOData";
import { blogPosts } from "../client/src/data/blogData";
import { getProgrammaticPage } from "../client/src/data/programmaticSeoData";
import { categoryHubs } from "../client/src/data/categoryHubData";
import { TOOL_SLUG_TRANSLATIONS, TRANSLATED_TO_ENGLISH } from "../client/src/lib/translatedSlugs";
import { COUNTRIES, COUNTRY_MAP, TOOL_CONFIGS } from "../client/src/data/countryData";
import { TOOL_TITLE_TRANSLATIONS } from "../client/src/lib/languages";
import { getBlogMeta } from "./blog-meta-translations";

// ── PDF24-style: "100% {free phrase}" for title middle section ───────────────
// Format: "{Tool Name} - 100% {LANG_100_FREE} - PDF HUB 24"
const LANG_100_FREE: Record<string, string> = {
  es: "gratis y online",
  ar: "مجاني وعبر الإنترنت",
  hi: "मुफ्त और ऑनलाइन",
  fr: "gratuit et en ligne",
  pt: "grátis e online",
  de: "kostenlos & online",
  zh: "免费且在线",
  ja: "無料＆オンライン",
  id: "gratis & online",
  ru: "бесплатно и онлайн",
  it: "gratis e online",
  ur: "مفت اور آن لائن",
};

// ── PDF24-style: full description template with {name} placeholder ────────────
// Format: "{action} {name} {free}. ✓ No limits/watermarks. ✓ No install/signup."
const LANG_DESC_TEMPLATE: Record<string, string> = {
  es: "Usa {name} gratis. ✓ Sin límites y sin marcas de agua. ✓ Sin instalación ni registro.",
  ar: "استخدم {name} مجانًا. ✓ بدون حدود وبدون علامات مائية. ✓ بدون تثبيت أو تسجيل.",
  hi: "{name} को मुफ़्त इस्तेमाल करें। ✓ कोई सीमा नहीं, कोई वॉटरमार्क नहीं। ✓ कोई इंस्टॉलेशन या पंजीकरण नहीं।",
  fr: "Utilisez {name} gratuitement en ligne. ✓ Sans limites et sans filigrane. ✓ Aucune installation ni inscription requise.",
  pt: "Use {name} gratuitamente online. ✓ Sem limites e sem marcas d'água. ✓ Sem instalação ou registro.",
  de: "{name} kostenlos online nutzen. ✓ Keine Limits und keine Wasserzeichen. ✓ Keine Installation oder Registrierung erforderlich.",
  zh: "在线免费使用{name}。✓ 无任何限制且无水印。✓ 无需安装或注册。",
  ja: "{name}をオンラインで無料使用。✓ 制限なし、透かしなし。✓ インストールも登録も不要。",
  id: "Gunakan {name} gratis secara online. ✓ Tanpa batasan dan tanpa watermark. ✓ Tanpa instalasi atau pendaftaran.",
  ru: "Используйте {name} бесплатно онлайн. ✓ Без ограничений и без водяных знаков. ✓ Без установки и регистрации.",
  it: "Usa {name} gratis online. ✓ Nessun limite e nessuna filigrana. ✓ Nessuna installazione o registrazione richiesta.",
  ur: "{name} کو آن لائن مفت استعمال کریں۔ ✓ کوئی حد نہیں، کوئی واٹر مارک نہیں۔ ✓ کوئی انسٹالیشن یا رجسٹریشن نہیں۔",
};

// ── Translated homepage titles for language homepages (e.g. /de, /ja) ─────────
const LANG_HOME_TITLE: Record<string, string> = {
  es: "PDF HUB 24 — 49+ herramientas PDF gratuitas (Sin Registro, Sin Marca de Agua)",
  ar: "PDF HUB 24 — 49+ أداة PDF مجانية عبر الإنترنت (بدون تسجيل، بدون علامات مائية)",
  hi: "PDF HUB 24 — 49+ मुफ़्त PDF टूल ऑनलाइन (बिना साइनअप, बिना वॉटरमार्क)",
  fr: "PDF HUB 24 — 49+ outils PDF gratuits en ligne (Sans Inscription, Sans Filigrane)",
  pt: "PDF HUB 24 — 49+ ferramentas PDF gratuitas online (Sem Cadastro, Sem Marca d'Água)",
  de: "PDF HUB 24 — 49+ kostenlose PDF-Tools online (Ohne Anmeldung, Ohne Wasserzeichen)",
  zh: "PDF HUB 24 — 49+ 免费在线PDF工具（无需注册，无水印）",
  ja: "PDF HUB 24 — 49+ 無料オンラインPDFツール（登録不要、透かしなし）",
  id: "PDF HUB 24 — 49+ Alat PDF Gratis Online (Tanpa Daftar, Tanpa Watermark)",
  ru: "PDF HUB 24 — 49+ бесплатных PDF-инструментов онлайн (Без регистрации, Без водяных знаков)",
  it: "PDF HUB 24 — 49+ strumenti PDF gratuiti online (Senza Registrazione, Senza Filigrana)",
  ur: "PDF HUB 24 — 49+ مفت آن لائن PDF ٹولز (بغیر سائن اپ، بغیر واٹر مارک)",
};

// ── Translated homepage descriptions ──────────────────────────────────────────
const LANG_HOME_DESC: Record<string, string> = {
  es: "49+ herramientas PDF gratuitas: unir, dividir, comprimir, PDF a Word, JPG a PDF y más. Sin registro, sin marcas de agua, 100% seguro. Funciona en cualquier dispositivo.",
  ar: "49+ أداة PDF مجانية: دمج، تقسيم، ضغط، PDF إلى Word، JPG إلى PDF والمزيد. بدون تسجيل، بدون علامات مائية، آمن 100%.",
  hi: "49+ मुफ़्त PDF टूल: मर्ज, स्प्लिट, कम्प्रेस, PDF से Word, JPG से PDF और बहुत कुछ। बिना रजिस्ट्रेशन, बिना वॉटरमार्क, 100% सुरक्षित।",
  fr: "49+ outils PDF gratuits : fusionner, diviser, compresser, PDF en Word, JPG en PDF et plus. Sans inscription, sans filigrane, 100% sécurisé.",
  pt: "49+ ferramentas PDF gratuitas: unir, dividir, comprimir, PDF para Word, JPG para PDF e mais. Sem cadastro, sem marcas d'água, 100% seguro.",
  de: "49+ kostenlose PDF-Tools: zusammenführen, teilen, komprimieren, PDF in Word, JPG in PDF und mehr. Ohne Anmeldung, ohne Wasserzeichen, 100% sicher.",
  zh: "49+ 免费PDF工具：合并、拆分、压缩、PDF转Word、JPG转PDF等。无需注册，无水印，100%安全。",
  ja: "49+ 無料PDFツール：結合、分割、圧縮、PDFをWord変換、JPGをPDF変換など。登録不要、透かしなし、100%安全。",
  id: "49+ alat PDF gratis: gabungkan, pisahkan, kompres, PDF ke Word, JPG ke PDF dan lainnya. Tanpa pendaftaran, tanpa watermark, 100% aman.",
  ru: "49+ бесплатных PDF-инструментов: объединять, разделять, сжимать, PDF в Word, JPG в PDF и многое другое. Без регистрации, без водяных знаков, 100% безопасно.",
  it: "49+ strumenti PDF gratuiti: unire, dividere, comprimere, PDF in Word, JPG in PDF e altro. Senza registrazione, senza filigrana, 100% sicuro.",
  ur: "49+ مفت PDF ٹولز: ملائیں، تقسیم کریں، کمپریس کریں، PDF سے Word، JPG سے PDF اور مزید۔ بغیر رجسٹریشن، بغیر واٹر مارک، 100% محفوظ۔",
};

// ── Translated category hub titles/descriptions [title, description] ──────────
const LANG_CATEGORY: Record<string, Record<string, [string, string]>> = {
  "/convert-pdf": {
    es: ["Convertir PDF en línea gratis — Todos los formatos | PDF HUB 24", "Convierte PDF a Word, Excel, JPG, PNG, PowerPoint y más. Convierte imágenes y documentos a PDF. Gratis, sin registro."],
    ar: ["تحويل PDF عبر الإنترنت مجانًا — جميع التنسيقات | PDF HUB 24", "تحويل PDF إلى Word وExcel وJPG وPNG وPowerPoint والمزيد. تحويل الصور والمستندات إلى PDF. مجاني، بدون تسجيل."],
    hi: ["PDF ऑनलाइन कन्वर्ट करें मुफ़्त — सभी फ़ॉर्मेट | PDF HUB 24", "PDF को Word, Excel, JPG, PNG, PowerPoint में बदलें। मुफ़्त, बिना साइनअप के।"],
    fr: ["Convertir PDF en ligne gratuitement — Tous les formats | PDF HUB 24", "Convertissez PDF en Word, Excel, JPG, PNG, PowerPoint et plus. Convertissez images et documents en PDF. Gratuit, sans inscription."],
    pt: ["Converter PDF online grátis — Todos os formatos | PDF HUB 24", "Converta PDF para Word, Excel, JPG, PNG, PowerPoint e mais. Converta imagens e documentos para PDF. Grátis, sem cadastro."],
    de: ["PDF online kostenlos konvertieren — Alle Formate | PDF HUB 24", "PDF in Word, Excel, JPG, PNG, PowerPoint und mehr konvertieren. Bilder und Dokumente in PDF umwandeln. Kostenlos, ohne Anmeldung."],
    zh: ["在线免费转换PDF — 支持所有格式 | PDF HUB 24", "将PDF转换为Word、Excel、JPG、PNG、PowerPoint等。将图像和文档转换为PDF。免费，无需注册。"],
    ja: ["PDFをオンラインで無料変換 — 全フォーマット対応 | PDF HUB 24", "PDFをWord、Excel、JPG、PNG、PowerPointなどに変換。画像やドキュメントをPDFに変換。無料、登録不要。"],
    id: ["Konversi PDF Online Gratis — Semua Format Didukung | PDF HUB 24", "Konversi PDF ke Word, Excel, JPG, PNG, PowerPoint dan lainnya. Konversi gambar dan dokumen ke PDF. Gratis, tanpa daftar."],
    ru: ["Конвертировать PDF онлайн бесплатно — Все форматы | PDF HUB 24", "Конвертируйте PDF в Word, Excel, JPG, PNG, PowerPoint и другие форматы. Бесплатно, без регистрации."],
    it: ["Convertire PDF online gratis — Tutti i formati | PDF HUB 24", "Converti PDF in Word, Excel, JPG, PNG, PowerPoint e altro. Converti immagini e documenti in PDF. Gratis, senza registrazione."],
    ur: ["PDF آن لائن مفت تبدیل کریں — تمام فارمیٹس | PDF HUB 24", "PDF کو Word، Excel، JPG، PNG، PowerPoint میں تبدیل کریں۔ مفت، بغیر رجسٹریشن۔"],
  },
  "/compress-pdf-tools": {
    es: ["Comprimir PDF en línea gratis — Reducir tamaño 90% | PDF HUB 24", "Reduce el tamaño del PDF hasta un 90% sin perder calidad. Compresor PDF gratuito con 3 niveles de compresión. Sin registro."],
    ar: ["ضغط PDF عبر الإنترنت مجانًا — تقليل الحجم 90% | PDF HUB 24", "قلل حجم PDF بنسبة 90% دون فقدان الجودة. ضاغط PDF مجاني بثلاثة مستويات. بدون تسجيل."],
    hi: ["PDF कम्प्रेस करें ऑनलाइन मुफ़्त — 90% साइज़ घटाएं | PDF HUB 24", "गुणवत्ता खोए बिना PDF का आकार 90% तक कम करें। मुफ़्त, बिना साइनअप के।"],
    fr: ["Compresser PDF en ligne gratuitement — Réduire la taille 90% | PDF HUB 24", "Réduisez la taille de votre PDF jusqu'à 90% sans perte de qualité. Compresseur PDF gratuit avec 3 niveaux. Sans inscription."],
    pt: ["Comprimir PDF online grátis — Reduzir tamanho 90% | PDF HUB 24", "Reduza o tamanho do PDF em até 90% sem perder qualidade. Compressor PDF gratuito com 3 níveis. Sem cadastro."],
    de: ["PDF online kostenlos komprimieren — Größe 90% reduzieren | PDF HUB 24", "PDF-Dateigröße um bis zu 90% ohne Qualitätsverlust reduzieren. Kostenloser PDF-Kompressor mit 3 Stufen. Ohne Anmeldung."],
    zh: ["在线免费压缩PDF — 减小90%大小 | PDF HUB 24", "在不损失质量的情况下将PDF文件大小减小90%。免费PDF压缩器，3个压缩级别。无需注册。"],
    ja: ["PDFをオンラインで無料圧縮 — サイズ90%削減 | PDF HUB 24", "品質を失わずにPDFファイルサイズを90%削減。無料PDFコンプレッサー、3段階の圧縮レベル。登録不要。"],
    id: ["Kompres PDF Online Gratis — Kurangi Ukuran 90% | PDF HUB 24", "Kurangi ukuran file PDF hingga 90% tanpa kehilangan kualitas. Kompressor PDF gratis dengan 3 level. Tanpa daftar."],
    ru: ["Сжать PDF онлайн бесплатно — Уменьшить размер на 90% | PDF HUB 24", "Уменьшите размер PDF до 90% без потери качества. Бесплатный компрессор с 3 уровнями. Без регистрации."],
    it: ["Comprimere PDF online gratis — Ridurre dimensione 90% | PDF HUB 24", "Riduci la dimensione del PDF fino al 90% senza perdere qualità. Compressore PDF gratuito con 3 livelli. Senza registrazione."],
    ur: ["PDF آن لائن مفت کمپریس کریں — سائز 90% کم کریں | PDF HUB 24", "بغیر معیار کھوئے PDF کا سائز 90% تک کم کریں۔ مفت، بغیر رجسٹریشن۔"],
  },
  "/edit-pdf-tools": {
    es: ["Editar PDF en línea gratis — 15+ herramientas | PDF HUB 24", "Edita, une, divide, rota, firma, anota y redacta documentos PDF gratis en línea. 15+ herramientas sin instalación ni marcas de agua."],
    ar: ["تحرير PDF عبر الإنترنت مجانًا — 15+ أداة | PDF HUB 24", "تحرير، دمج، تقسيم، تدوير، توقيع، تعليق وحجب مستندات PDF مجانًا. 15+ أداة بدون تثبيت."],
    hi: ["PDF ऑनलाइन एडिट करें मुफ़्त — 15+ टूल | PDF HUB 24", "PDF दस्तावेज़ों को मर्ज, स्प्लिट, रोटेट, साइन, एनोटेट करें। 15+ टूल, बिना इंस्टॉलेशन के।"],
    fr: ["Éditer PDF en ligne gratuitement — 15+ outils | PDF HUB 24", "Modifiez, fusionnez, divisez, faites pivoter, signez, annotez et masquez des PDF. 15+ outils sans installation ni filigrane."],
    pt: ["Editar PDF online grátis — 15+ ferramentas | PDF HUB 24", "Edite, mescle, divida, gire, assine, anote e redija documentos PDF grátis. 15+ ferramentas sem instalação."],
    de: ["PDF online kostenlos bearbeiten — 15+ Tools | PDF HUB 24", "PDF-Dokumente bearbeiten, zusammenführen, teilen, drehen, signieren, kommentieren. 15+ Tools ohne Installation."],
    zh: ["在线免费编辑PDF — 15+工具 | PDF HUB 24", "在线免费编辑、合并、拆分、旋转、签署、注释和编辑PDF文档。15+工具，无需安装。"],
    ja: ["PDFをオンラインで無料編集 — 15+ツール | PDF HUB 24", "PDFドキュメントを結合、分割、回転、署名、注釈、編集。15+ツール、インストール不要。"],
    id: ["Edit PDF Online Gratis — 15+ Alat | PDF HUB 24", "Edit, gabungkan, pisahkan, putar, tandatangani, anotasi dokumen PDF gratis online. 15+ alat tanpa instalasi."],
    ru: ["Редактировать PDF онлайн бесплатно — 15+ инструментов | PDF HUB 24", "Редактируйте, объединяйте, разделяйте, подписывайте PDF-документы онлайн. 15+ инструментов без установки."],
    it: ["Modificare PDF online gratis — 15+ strumenti | PDF HUB 24", "Modifica, unisci, dividi, ruota, firma, annota documenti PDF gratis online. 15+ strumenti senza installazione."],
    ur: ["PDF آن لائن مفت ایڈٹ کریں — 15+ ٹولز | PDF HUB 24", "PDF دستاویزات کو ملائیں، تقسیم کریں، گھمائیں، دستخط کریں۔ 15+ ٹولز، بغیر انسٹالیشن۔"],
  },
  "/secure-pdf": {
    es: ["Seguridad PDF gratis — Encriptar, Redactar y Proteger | PDF HUB 24", "Protege con contraseña, encripta, redacta y asegura documentos PDF gratis. Cifrado AES-256, redacción permanente."],
    ar: ["حماية PDF مجانًا — تشفير، حجب وحماية | PDF HUB 24", "حماية بكلمة مرور، تشفير، حجب وتأمين مستندات PDF مجانًا. تشفير AES-256، حجب دائم."],
    hi: ["PDF सुरक्षा मुफ़्त — एन्क्रिप्ट, रिडैक्ट और सुरक्षित करें | PDF HUB 24", "PDF को पासवर्ड से सुरक्षित करें, एन्क्रिप्ट और रिडैक्ट करें। AES-256 एन्क्रिप्शन। मुफ़्त।"],
    fr: ["Sécurité PDF gratuite — Chiffrer, Caviarder et Protéger | PDF HUB 24", "Protégez par mot de passe, chiffrez, caviardez et sécurisez des PDF. Chiffrement AES-256, caviardage permanent. Gratuit."],
    pt: ["Segurança PDF grátis — Criptografar, Redigir e Proteger | PDF HUB 24", "Proteja com senha, criptografe, redija e proteja PDFs. Criptografia AES-256, redação permanente. Sem cadastro."],
    de: ["PDF-Sicherheit kostenlos — Verschlüsseln, Schwärzen & Schützen | PDF HUB 24", "PDFs mit Passwort schützen, verschlüsseln, schwärzen. AES-256-Verschlüsselung, permanente Schwärzung. Kostenlos."],
    zh: ["免费PDF安全 — 加密、编辑和保护 | PDF HUB 24", "免费为PDF添加密码保护、加密、编辑和保护。AES-256加密，永久编辑。无需注册。"],
    ja: ["PDF セキュリティ無料 — 暗号化、編集＆保護 | PDF HUB 24", "PDFをパスワード保護、暗号化、編集。AES-256暗号化、永続的な編集。登録不要。"],
    id: ["Keamanan PDF Gratis — Enkripsi, Redaksi & Lindungi | PDF HUB 24", "Lindungi dengan kata sandi, enkripsi, redaksi dan amankan PDF. Enkripsi AES-256, redaksi permanen. Tanpa daftar."],
    ru: ["Безопасность PDF бесплатно — Шифрование, Редактирование и Защита | PDF HUB 24", "Защита паролем, шифрование, редактирование PDF. AES-256 шифрование. Без регистрации."],
    it: ["Sicurezza PDF gratis — Crittografare, Oscurare e Proteggere | PDF HUB 24", "Proteggi con password, crittografa, oscura e metti al sicuro PDF. Crittografia AES-256, oscuramento permanente. Gratis."],
    ur: ["PDF سیکیورٹی مفت — انکرپٹ، ریڈیکٹ اور محفوظ کریں | PDF HUB 24", "PDF کو پاسورڈ سے محفوظ کریں، انکرپٹ کریں۔ AES-256 انکرپشن۔ مفت۔"],
  },
  "/image-tools": {
    es: ["Herramientas de imagen gratis — Comprimir, Redimensionar y Convertir | PDF HUB 24", "Herramientas de imagen en línea para compresión, redimensionado, recorte y conversión de formato. Admite JPG, PNG, WebP. Gratis."],
    ar: ["أدوات الصور مجانًا — ضغط وتغيير الحجم والتحويل | PDF HUB 24", "أدوات صور مجانية على الإنترنت للضغط وتغيير الحجم والقص وتحويل التنسيق. يدعم JPG وPNG وWebP."],
    hi: ["मुफ़्त इमेज टूल — कम्प्रेस, रीसाइज़ और कन्वर्ट | PDF HUB 24", "ऑनलाइन इमेज टूल — कम्प्रेशन, रीसाइज़िंग, क्रॉपिंग और फ़ॉर्मेट कन्वर्जन के लिए। मुफ़्त।"],
    fr: ["Outils d'image gratuits — Compresser, Redimensionner et Convertir | PDF HUB 24", "Outils d'image en ligne pour compression, redimensionnement, recadrage et conversion de format. Supporte JPG, PNG, WebP. Gratuit."],
    pt: ["Ferramentas de imagem grátis — Comprimir, Redimensionar e Converter | PDF HUB 24", "Ferramentas de imagem online para compressão, redimensionamento, recorte e conversão de formato. Suporta JPG, PNG, WebP. Grátis."],
    de: ["Kostenlose Bild-Tools — Komprimieren, Skalieren und Konvertieren | PDF HUB 24", "Online-Bild-Tools für Komprimierung, Skalierung, Zuschneiden und Formatkonvertierung. Unterstützt JPG, PNG, WebP. Kostenlos."],
    zh: ["免费图像工具 — 压缩、调整大小和转换 | PDF HUB 24", "在线免费图像工具，用于压缩、调整大小、裁剪和格式转换。支持JPG、PNG、WebP。"],
    ja: ["無料画像ツール — 圧縮、リサイズ＆変換 | PDF HUB 24", "オンライン無料画像ツール — 圧縮、リサイズ、トリミング、フォーマット変換。JPG、PNG、WebP対応。"],
    id: ["Alat Gambar Gratis — Kompres, Ubah Ukuran & Konversi | PDF HUB 24", "Alat gambar online gratis untuk kompresi, pengubahan ukuran, pemotongan dan konversi format. Mendukung JPG, PNG, WebP."],
    ru: ["Бесплатные инструменты для изображений — Сжать, Изменить размер и Конвертировать | PDF HUB 24", "Онлайн-инструменты для сжатия, изменения размера, обрезки и конвертации изображений. JPG, PNG, WebP. Бесплатно."],
    it: ["Strumenti immagine gratis — Comprimi, Ridimensiona e Converti | PDF HUB 24", "Strumenti immagine online per compressione, ridimensionamento, ritaglio e conversione formato. Supporta JPG, PNG, WebP. Gratis."],
    ur: ["مفت امیج ٹولز — کمپریس، ری سائز اور کنورٹ | PDF HUB 24", "آن لائن امیج ٹولز — کمپریشن، ری سائزنگ، کراپنگ اور فارمیٹ کنورژن کے لیے۔ JPG، PNG، WebP۔ مفت۔"],
  },
};

// ── Translated static page titles/descriptions [title, description] ───────────
const LANG_STATIC: Record<string, Record<string, [string, string]>> = {
  "/about": {
    es: ["Acerca de PDF HUB 24 - Herramientas PDF gratuitas en línea", "Conoce PDF HUB 24, tu fuente de confianza para herramientas PDF gratuitas en línea. 49+ herramientas para convertir, editar y gestionar archivos PDF."],
    ar: ["حول PDF HUB 24 - أدوات PDF مجانية عبر الإنترنت", "تعرف على PDF HUB 24، مصدرك الموثوق لأدوات PDF المجانية. 49+ أداة لتحويل ملفات PDF وتحريرها وإدارتها."],
    hi: ["PDF HUB 24 के बारे में - मुफ़्त ऑनलाइन PDF टूल", "PDF HUB 24 के बारे में जानें — मुफ़्त ऑनलाइन PDF टूल का विश्वसनीय स्रोत। 49+ टूल।"],
    fr: ["À propos de PDF HUB 24 - Outils PDF gratuits en ligne", "Découvrez PDF HUB 24, votre source de confiance pour des outils PDF gratuits en ligne. 49+ outils pour convertir, éditer et gérer des PDF."],
    pt: ["Sobre o PDF HUB 24 - Ferramentas PDF gratuitas online", "Conheça o PDF HUB 24, sua fonte confiável de ferramentas PDF gratuitas online. 49+ ferramentas para converter, editar e gerenciar PDFs."],
    de: ["Über PDF HUB 24 - Kostenlose Online-PDF-Tools", "Erfahren Sie mehr über PDF HUB 24, Ihre vertrauenswürdige Quelle für kostenlose Online-PDF-Tools. 49+ Tools zum Konvertieren, Bearbeiten und Verwalten von PDFs."],
    zh: ["关于 PDF HUB 24 - 免费在线PDF工具", "了解PDF HUB 24，您值得信赖的免费在线PDF工具来源。49+工具，用于转换、编辑和管理PDF文件。"],
    ja: ["PDF HUB 24 について - 無料オンラインPDFツール", "PDF HUB 24について — 無料オンラインPDFツールの信頼できるソース。PDFの変換、編集、管理のための49+ツール。"],
    id: ["Tentang PDF HUB 24 - Alat PDF Gratis Online", "Pelajari tentang PDF HUB 24, sumber terpercaya Anda untuk alat PDF gratis online. 49+ alat untuk mengonversi, mengedit, dan mengelola file PDF."],
    ru: ["О PDF HUB 24 - Бесплатные онлайн PDF-инструменты", "Узнайте о PDF HUB 24 — вашем надёжном источнике бесплатных PDF-инструментов. 49+ инструментов для конвертации, редактирования и управления PDF."],
    it: ["Informazioni su PDF HUB 24 - Strumenti PDF gratuiti online", "Scopri PDF HUB 24, la tua fonte affidabile per strumenti PDF gratuiti online. 49+ strumenti per convertire, modificare e gestire PDF."],
    ur: ["PDF HUB 24 کے بارے میں - مفت آن لائن PDF ٹولز", "PDF HUB 24 کے بارے میں جانیں — مفت آن لائن PDF ٹولز کا قابل اعتماد ذریعہ۔ 49+ ٹولز۔"],
  },
  "/pricing": {
    es: ["Precios de PDF HUB 24 — Gratis vs Pro | PDF HUB 24", "Compara los planes gratuito y pro de PDF HUB 24. Todas las herramientas PDF son gratuitas. Sin suscripción requerida."],
    ar: ["أسعار PDF HUB 24 — مجاني مقابل Pro | PDF HUB 24", "قارن بين الخطة المجانية والمدفوعة في PDF HUB 24. جميع أدوات PDF مجانية. لا يلزم اشتراك."],
    hi: ["PDF HUB 24 की कीमतें — मुफ़्त बनाम Pro | PDF HUB 24", "PDF HUB 24 के मुफ़्त और प्रो प्लान की तुलना करें। सभी PDF टूल मुफ़्त हैं।"],
    fr: ["Tarifs de PDF HUB 24 — Gratuit vs Pro | PDF HUB 24", "Comparez les plans gratuit et pro de PDF HUB 24. Tous les outils PDF sont gratuits. Aucun abonnement requis."],
    pt: ["Preços do PDF HUB 24 — Grátis vs Pro | PDF HUB 24", "Compare os planos gratuito e pro do PDF HUB 24. Todas as ferramentas PDF são gratuitas. Sem assinatura necessária."],
    de: ["PDF HUB 24 Preise — Kostenlos vs Pro | PDF HUB 24", "Vergleichen Sie die kostenlosen und Pro-Pläne von PDF HUB 24. Alle PDF-Tools sind kostenlos. Kein Abonnement erforderlich."],
    zh: ["PDF HUB 24 价格 — 免费版与专业版 | PDF HUB 24", "比较PDF HUB 24的免费和专业版计划。所有PDF工具均免费。无需订阅。"],
    ja: ["PDF HUB 24 の料金 — 無料版 vs プロ版 | PDF HUB 24", "PDF HUB 24の無料プランとプロプランを比較。すべてのPDFツールは無料。サブスクリプション不要。"],
    id: ["Harga PDF HUB 24 — Gratis vs Pro | PDF HUB 24", "Bandingkan paket gratis dan pro PDF HUB 24. Semua alat PDF gratis. Tidak perlu berlangganan."],
    ru: ["Цены PDF HUB 24 — Бесплатно vs Pro | PDF HUB 24", "Сравните бесплатный и профессиональный планы PDF HUB 24. Все PDF-инструменты бесплатны. Подписка не требуется."],
    it: ["Prezzi di PDF HUB 24 — Gratuito vs Pro | PDF HUB 24", "Confronta i piani gratuito e pro di PDF HUB 24. Tutti gli strumenti PDF sono gratuiti. Nessun abbonamento richiesto."],
    ur: ["PDF HUB 24 کی قیمتیں — مفت بنام Pro | PDF HUB 24", "PDF HUB 24 کے مفت اور پرو پلان کا موازنہ کریں۔ تمام PDF ٹولز مفت ہیں۔"],
  },
  "/data-security": {
    es: ["Seguridad de datos y privacidad — PDF HUB 24", "Descubre cómo PDF HUB 24 protege tus archivos. Cifrado SSL, eliminación automática en 1 hora, política de acceso cero, cumplimiento GDPR."],
    ar: ["أمان البيانات والخصوصية — PDF HUB 24", "تعرف على كيفية حماية PDF HUB 24 لملفاتك. تشفير SSL، حذف تلقائي خلال ساعة، سياسة عدم الوصول، امتثال GDPR."],
    hi: ["डेटा सुरक्षा और गोपनीयता — PDF HUB 24", "जानें कि PDF HUB 24 आपकी फ़ाइलें कैसे सुरक्षित करता है। SSL एन्क्रिप्शन, 1 घंटे में स्वत: हटाना, GDPR अनुपालन।"],
    fr: ["Sécurité des données et confidentialité — PDF HUB 24", "Découvrez comment PDF HUB 24 protège vos fichiers. Chiffrement SSL, suppression automatique en 1 heure, conformité RGPD."],
    pt: ["Segurança de dados e privacidade — PDF HUB 24", "Saiba como o PDF HUB 24 protege seus arquivos. Criptografia SSL, exclusão automática em 1 hora, conformidade GDPR."],
    de: ["Datensicherheit und Datenschutz — PDF HUB 24", "Erfahren Sie, wie PDF HUB 24 Ihre Dateien schützt. SSL-Verschlüsselung, automatische Löschung nach 1 Stunde, DSGVO-Konformität."],
    zh: ["数据安全与隐私 — PDF HUB 24", "了解PDF HUB 24如何保护您的文件。SSL加密，1小时内自动删除，零访问政策，GDPR合规。"],
    ja: ["データセキュリティとプライバシー — PDF HUB 24", "PDF HUB 24がファイルをどのように保護するかをご確認ください。SSL暗号化、1時間以内に自動削除、GDPRコンプライアンス。"],
    id: ["Keamanan Data & Privasi — PDF HUB 24", "Pelajari bagaimana PDF HUB 24 melindungi file Anda. Enkripsi SSL, penghapusan otomatis dalam 1 jam, kebijakan akses nol, kepatuhan GDPR."],
    ru: ["Безопасность данных и конфиденциальность — PDF HUB 24", "Узнайте, как PDF HUB 24 защищает ваши файлы. SSL-шифрование, автоматическое удаление через 1 час, соответствие GDPR."],
    it: ["Sicurezza dei dati e privacy — PDF HUB 24", "Scopri come PDF HUB 24 protegge i tuoi file. Crittografia SSL, eliminazione automatica entro 1 ora, conformità GDPR."],
    ur: ["ڈیٹا سیکیورٹی اور رازداری — PDF HUB 24", "جانیں کہ PDF HUB 24 آپ کی فائلیں کیسے محفوظ کرتا ہے۔ SSL انکرپشن، 1 گھنٹے میں خودکار حذف، GDPR کی تعمیل۔"],
  },
  "/privacy": {
    es: ["Política de privacidad — PDF HUB 24", "Lee nuestra política de privacidad. PDF HUB 24 respeta tu privacidad: los archivos se procesan de forma segura y se eliminan automáticamente."],
    ar: ["سياسة الخصوصية — PDF HUB 24", "اقرأ سياسة الخصوصية الخاصة بنا. PDF HUB 24 يحترم خصوصيتك — تُعالج الملفات بأمان وتُحذف تلقائيًا."],
    hi: ["गोपनीयता नीति — PDF HUB 24", "हमारी गोपनीयता नीति पढ़ें। PDF HUB 24 आपकी गोपनीयता का सम्मान करता है — फ़ाइलें सुरक्षित रूप से संसाधित होती हैं और स्वत: हटाई जाती हैं।"],
    fr: ["Politique de confidentialité — PDF HUB 24", "Lisez notre politique de confidentialité. PDF HUB 24 respecte votre vie privée — les fichiers sont traités en sécurité et supprimés automatiquement."],
    pt: ["Política de privacidade — PDF HUB 24", "Leia nossa política de privacidade. O PDF HUB 24 respeita sua privacidade — os arquivos são processados com segurança e excluídos automaticamente."],
    de: ["Datenschutzrichtlinie — PDF HUB 24", "Lesen Sie unsere Datenschutzrichtlinie. PDF HUB 24 respektiert Ihre Privatsphäre — Dateien werden sicher verarbeitet und automatisch gelöscht."],
    zh: ["隐私政策 — PDF HUB 24", "阅读我们的隐私政策。PDF HUB 24尊重您的隐私 — 文件安全处理并自动删除。"],
    ja: ["プライバシーポリシー — PDF HUB 24", "プライバシーポリシーをお読みください。PDF HUB 24はプライバシーを尊重します — ファイルは安全に処理され、自動的に削除されます。"],
    id: ["Kebijakan Privasi — PDF HUB 24", "Baca kebijakan privasi kami. PDF HUB 24 menghormati privasi Anda — file diproses dengan aman dan dihapus secara otomatis."],
    ru: ["Политика конфиденциальности — PDF HUB 24", "Прочитайте нашу политику конфиденциальности. PDF HUB 24 уважает вашу конфиденциальность — файлы обрабатываются безопасно и удаляются автоматически."],
    it: ["Informativa sulla privacy — PDF HUB 24", "Leggi la nostra informativa sulla privacy. PDF HUB 24 rispetta la tua privacy — i file vengono elaborati in modo sicuro ed eliminati automaticamente."],
    ur: ["رازداری کی پالیسی — PDF HUB 24", "ہماری رازداری کی پالیسی پڑھیں۔ PDF HUB 24 آپ کی رازداری کا احترام کرتا ہے — فائلیں محفوظ طریقے سے پروسیس کی جاتی ہیں اور خودکار حذف ہو جاتی ہیں۔"],
  },
  "/terms": {
    es: ["Términos de servicio — PDF HUB 24", "Lee nuestros términos de servicio. Directrices de uso para las herramientas PDF en línea de PDF HUB 24."],
    ar: ["شروط الخدمة — PDF HUB 24", "اقرأ شروط الخدمة الخاصة بنا. إرشادات الاستخدام لأدوات PDF عبر الإنترنت من PDF HUB 24."],
    hi: ["सेवा की शर्तें — PDF HUB 24", "हमारी सेवा की शर्तें पढ़ें। PDF HUB 24 के ऑनलाइन PDF टूल के उपयोग दिशानिर्देश।"],
    fr: ["Conditions d'utilisation — PDF HUB 24", "Lisez nos conditions d'utilisation. Directives d'utilisation pour les outils PDF en ligne de PDF HUB 24."],
    pt: ["Termos de serviço — PDF HUB 24", "Leia nossos termos de serviço. Diretrizes de uso para as ferramentas PDF online do PDF HUB 24."],
    de: ["Nutzungsbedingungen — PDF HUB 24", "Lesen Sie unsere Nutzungsbedingungen. Nutzungsrichtlinien für die Online-PDF-Tools von PDF HUB 24."],
    zh: ["服务条款 — PDF HUB 24", "阅读我们的服务条款。PDF HUB 24在线PDF工具的使用指南。"],
    ja: ["利用規約 — PDF HUB 24", "利用規約をお読みください。PDF HUB 24のオンラインPDFツールの使用ガイドライン。"],
    id: ["Syarat Layanan — PDF HUB 24", "Baca syarat layanan kami. Panduan penggunaan untuk alat PDF online PDF HUB 24."],
    ru: ["Условия использования — PDF HUB 24", "Прочитайте наши условия использования. Руководство по использованию онлайн PDF-инструментов PDF HUB 24."],
    it: ["Termini di servizio — PDF HUB 24", "Leggi i nostri termini di servizio. Linee guida per l'utilizzo degli strumenti PDF online di PDF HUB 24."],
    ur: ["سروس کی شرائط — PDF HUB 24", "ہماری سروس کی شرائط پڑھیں۔ PDF HUB 24 کے آن لائن PDF ٹولز کے استعمال کے رہنما اصول۔"],
  },
  "/write-for-us": {
    es: ["Escribe para nosotros — Contribuye al blog de PDF HUB 24", "Contribuye con artículos invitados a PDF HUB 24. Escribe sobre herramientas PDF, gestión de documentos y productividad."],
    ar: ["اكتب لنا — ساهم في مدونة PDF HUB 24", "ساهم بمقالات ضيف في PDF HUB 24. اكتب عن أدوات PDF وإدارة المستندات والإنتاجية."],
    hi: ["हमारे लिए लिखें — PDF HUB 24 ब्लॉग में योगदान दें", "PDF HUB 24 में गेस्ट पोस्ट लिखें। PDF टूल, दस्तावेज़ प्रबंधन और उत्पादकता पर लिखें।"],
    fr: ["Écrivez pour nous — Contribuez au blog de PDF HUB 24", "Contribuez avec des articles invités à PDF HUB 24. Écrivez sur les outils PDF, la gestion documentaire et la productivité."],
    pt: ["Escreva para nós — Contribua com o blog do PDF HUB 24", "Contribua com artigos para o PDF HUB 24. Escreva sobre ferramentas PDF, gestão de documentos e produtividade."],
    de: ["Für uns schreiben — Zum PDF HUB 24 Blog beitragen", "Gastbeiträge für PDF HUB 24 verfassen. Über PDF-Tools, Dokumentenmanagement und Produktivität schreiben."],
    zh: ["为我们撰稿 — 为PDF HUB 24博客贡献内容", "为PDF HUB 24投稿。撰写有关PDF工具、文档管理和生产力的文章。"],
    ja: ["私たちのために書く — PDF HUB 24ブログに貢献する", "PDF HUB 24にゲスト投稿を寄稿してください。PDFツール、ドキュメント管理、生産性について書いてください。"],
    id: ["Tulis untuk Kami — Kontribusi ke Blog PDF HUB 24", "Kontribusi artikel tamu ke PDF HUB 24. Tulis tentang alat PDF, manajemen dokumen, dan produktivitas."],
    ru: ["Пишите для нас — Вносите вклад в блог PDF HUB 24", "Публикуйте гостевые статьи на PDF HUB 24. Пишите об инструментах PDF, управлении документами и производительности."],
    it: ["Scrivi per noi — Contribuisci al blog di PDF HUB 24", "Contribuisci con articoli ospiti a PDF HUB 24. Scrivi di strumenti PDF, gestione documenti e produttività."],
    ur: ["ہمارے لیے لکھیں — PDF HUB 24 بلاگ میں حصہ ڈالیں", "PDF HUB 24 کے لیے گیسٹ پوسٹ لکھیں۔ PDF ٹولز، دستاویز انتظام اور پیداواریت کے بارے میں لکھیں۔"],
  },
};

// ── Canonical path → TOOL_TITLE_TRANSLATIONS key ─────────────────────────────
const PATH_TO_TOOL_KEY: Record<string, string> = {
  "/merge":            "merge",
  "/split":            "split",
  "/compress":         "compress",
  "/pdf-to-word":      "pdf-to-word",
  "/pdf-to-jpg":       "pdf-to-jpg",
  "/pdf-to-png":       "pdf-to-png",
  "/pdf-to-excel":     "pdf-to-excel",
  "/pdf-to-ppt":       "pdf-to-ppt",
  "/jpg-to-pdf":       "jpg-to-pdf",
  "/png-to-pdf":       "png-to-pdf",
  "/word-to-pdf":      "word-to-pdf",
  "/excel-to-pdf":     "excel-to-pdf",
  "/ppt-to-pdf":       "ppt-to-pdf",
  "/protect-pdf":      "protect",
  "/unlock-pdf":       "unlock",
  "/sign-pdf":         "sign",
  "/rotate":           "rotate",
  "/add-watermark":    "watermark",
  "/grayscale-pdf":    "grayscale",
  "/ocr-pdf":          "ocr-pdf",
  "/image-compressor": "image-compressor",
  "/resize-image":     "image-resize",
  "/crop-image":       "image-crop",
  "/convert-image":    "image-convert",
  "/edit-pdf":         "edit-pdf",
  "/annotate-pdf":     "annotate",
  "/redact-pdf":       "redact",
  "/add-page-numbers": "add-page-numbers",
  "/delete-pages":     "remove-pages",
  "/extract-pages":    "extract-pages",
  "/reorder-pages":    "reorder-pages",
  "/translate-pdf":    "translate-pdf",
  "/batch-compress":   "batch-compress",
  "/scan-to-pdf":      "scan-to-pdf",
  "/pdf-to-pdfa":      "pdf-to-pdfa",
  "/crop-pdf":         "crop-pdf",
  "/flatten-pdf":      "flatten-pdf",
  "/compress-img":     "compress-img",
  "/compare-pdf":      "edit-pdf",
  "/pdf-viewer":       "edit-pdf",
  "/repair-pdf":       "edit-pdf",
};

// All country pages get indexed with unique, locally-enriched content — no tier/noindex system.

function detectCountryPage(slug: string): { countryLabel: string; countryHreflang: string; toolPath: string } | null {
  const sorted = [...COUNTRIES].sort((a, b) => b.slug.length - a.slug.length);
  for (const country of sorted) {
    const suffix = "-" + country.slug;
    if (slug.endsWith(suffix)) {
      const toolSlug = slug.slice(0, slug.length - suffix.length);
      const toolConfig = TOOL_CONFIGS[toolSlug];
      if (toolConfig) {
        return { countryLabel: country.label, countryHreflang: country.hreflang, toolPath: toolConfig.toolPath };
      }
    }
  }
  return null;
}

export interface PageSEO {
  title: string;
  description: string;
  keywords: string;
  schema: object;
  h1?: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogUrl?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterCard?: string;
  robots?: string;
}

const BASE_URL = "https://pdfhub24.com";
const OG_IMAGE = "https://pdfhub24.com/og-image.png";

export const seoConfig: Record<string, PageSEO> = {
  "/": {
    title: "PDF HUB 24 — 49+ Free PDF Tools Online (No Signup, No Watermark)",
    description: "49+ free PDF tools: merge, split, compress, PDF to Word, JPG to PDF & more. No signup required, no watermarks, 100% secure. Works on any device in 2026.",
    keywords: "free PDF tools, PDF converter online, merge PDF, split PDF, compress PDF, PDF to Word, edit PDF free",
    schema: {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": `${BASE_URL}/#website`,
      "name": "PDF HUB 24",
      "url": BASE_URL,
      "description": "Free online PDF tools — 49+ tools for converting, editing, merging, compressing, and managing PDF files",
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": `${BASE_URL}/all-tools?q={search_term_string}`
        },
        "query-input": "required name=search_term_string"
      }
    }
  },
  "/merge": {
    title: "Merge PDF Free Online — Combine PDFs Instantly | PDF HUB 24",
    description: "Merge multiple PDF files into one in seconds. Free online PDF merger — drag & drop to combine PDFs. No registration, no watermarks, no file limits.",
    keywords: "merge PDF, combine PDF, join PDF files, PDF merger online, merge multiple PDFs free, combine PDF files",
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Merge PDF - PDF HUB 24",
      "url": `${BASE_URL}/merge`,
      "description": "Combine multiple PDF files into one document",
      "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL }
    }
  },
  "/split": {
    title: "Split PDF Free Online (Extract Any Page) | PDF HUB 24",
    description: "Split PDF files and extract specific pages in seconds. Free online PDF splitter — select page ranges or extract single pages. No signup, no watermark.",
    keywords: "split PDF, extract PDF pages, PDF splitter, separate PDF pages, split PDF online free",
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Split PDF - PDF HUB 24",
      "url": `${BASE_URL}/split`,
      "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL }
    }
  },
  "/compress": {
    title: "Compress PDF Free — Reduce PDF Size 90% | PDF HUB 24",
    description: "Compress PDF files and reduce size by up to 90%. Free online PDF compressor — 3 quality levels. Perfect for email under 25MB. No signup required.",
    keywords: "compress PDF, reduce PDF size, PDF compressor, optimize PDF, shrink PDF online free",
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Compress PDF - PDF HUB 24",
      "url": `${BASE_URL}/compress`,
      "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL }
    }
  },
  "/rotate": {
    title: "Rotate PDF Free — Fix Orientation Instantly | PDF HUB 24",
    description: "Rotate PDF pages 90°, 180°, or 270° clockwise. Free online PDF rotator — fix orientation issues instantly. No watermarks, no signup required.",
    keywords: "rotate PDF, turn PDF pages, PDF rotator, flip PDF, rotate PDF online free",
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Rotate PDF - PDF HUB 24",
      "url": `${BASE_URL}/rotate`,
      "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL }
    }
  },
  "/pdf-to-word": {
    title: "PDF to Word Free — No Email, No Watermark | PDF HUB 24",
    description: "Convert PDF to editable Word (DOCX) in seconds. Free PDF to Word converter — no email, no watermark, keeps formatting. Works on all devices.",
    keywords: "pdf to word converter free, convert pdf to word online, pdf to docx free, editable word from pdf, free pdf converter no email, secure pdf to word tool",
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "PDF to Word Converter - PDF HUB 24",
      "url": `${BASE_URL}/pdf-to-word`,
      "description": "Convert PDF to editable Word documents for free online",
      "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL }
    }
  },
  "/pdf-to-jpg": {
    title: "PDF to JPG Free (High Quality, No Signup) | PDF HUB 24",
    description: "Convert PDF pages to high-quality JPG images instantly. Free PDF to JPG converter — extract all pages as images. No registration, no watermark.",
    keywords: "PDF to JPG, PDF to image, convert PDF to JPG, PDF to JPEG, PDF to JPG online free",
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "PDF to JPG Converter - PDF HUB 24",
      "url": `${BASE_URL}/pdf-to-jpg`,
      "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL }
    }
  },
  "/pdf-to-png": {
    title: "PDF to PNG Free (Transparent, High Quality) | PDF HUB 24",
    description: "Convert PDF pages to high-quality PNG images with transparency. Free PDF to PNG converter — perfect for graphics and presentations. No signup.",
    keywords: "PDF to PNG, convert PDF to PNG, PDF to image, PDF to PNG online free",
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "PDF to PNG Converter - PDF HUB 24",
      "url": `${BASE_URL}/pdf-to-png`,
      "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL }
    }
  },
  "/pdf-to-excel": {
    title: "PDF to Excel Free (Keep Table Format) | PDF HUB 24",
    description: "Convert PDF tables to Excel spreadsheets (XLS/XLSX) instantly. Free PDF to Excel converter — extract data accurately. No registration, no watermark.",
    keywords: "PDF to Excel, PDF to XLS, convert PDF to Excel, PDF to spreadsheet, PDF to Excel online free",
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "PDF to Excel Converter - PDF HUB 24",
      "url": `${BASE_URL}/pdf-to-excel`,
      "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL }
    }
  },
  "/pdf-to-ppt": {
    title: "PDF to PowerPoint Free (Keeps Slides & Format) | PDF HUB 24",
    description: "Convert PDF to editable PowerPoint (PPT/PPTX) in seconds. Free PDF to PowerPoint converter — preserves slides and formatting. No signup required.",
    keywords: "PDF to PowerPoint, PDF to PPT, convert PDF to PowerPoint, PDF to PPTX, PDF to PowerPoint online free",
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "PDF to PowerPoint Converter - PDF HUB 24",
      "url": `${BASE_URL}/pdf-to-ppt`,
      "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL }
    }
  },
  "/word-to-pdf": {
    title: "Word to PDF Free Online (Keeps Formatting) | PDF HUB 24",
    description: "Convert Word documents (DOCX) to PDF in seconds. Free Word to PDF converter — preserves formatting perfectly. No signup, no watermark required.",
    keywords: "Word to PDF, DOCX to PDF, convert Word to PDF, Word to PDF online free",
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Word to PDF Converter - PDF HUB 24",
      "url": `${BASE_URL}/word-to-pdf`,
      "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL }
    }
  },
  "/jpg-to-pdf": {
    title: "JPG to PDF Free (Combine Multiple Images) | PDF HUB 24",
    description: "Convert JPG images to PDF in seconds. Free JPG to PDF converter — combine multiple photos into one PDF. No signup, no watermark, high quality.",
    keywords: "JPG to PDF, image to PDF, convert JPG to PDF, JPEG to PDF, JPG to PDF online free",
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "JPG to PDF Converter - PDF HUB 24",
      "url": `${BASE_URL}/jpg-to-pdf`,
      "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL }
    }
  },
  "/png-to-pdf": {
    title: "PNG to PDF Free Online (Keeps Transparency) | PDF HUB 24",
    description: "Convert PNG images to PDF in seconds. Free PNG to PDF converter — maintains transparency and quality. No signup, no watermark required.",
    keywords: "PNG to PDF, convert PNG to PDF, image to PDF, PNG to PDF online free",
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "PNG to PDF Converter - PDF HUB 24",
      "url": `${BASE_URL}/png-to-pdf`,
      "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL }
    }
  },
  "/excel-to-pdf": {
    title: "Excel to PDF Free (Keeps Tables & Format) | PDF HUB 24",
    description: "Convert Excel spreadsheets (XLS/XLSX) to PDF in seconds. Free Excel to PDF converter — preserves tables and formatting perfectly. No signup.",
    keywords: "Excel to PDF, XLS to PDF, convert Excel to PDF, XLSX to PDF, Excel to PDF online free",
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Excel to PDF Converter - PDF HUB 24",
      "url": `${BASE_URL}/excel-to-pdf`,
      "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL }
    }
  },
  "/ppt-to-pdf": {
    title: "PowerPoint to PDF Free (Keeps Slides) | PDF HUB 24",
    description: "Convert PowerPoint (PPT/PPTX) to PDF in seconds. Free PPT to PDF converter — preserves slides, images, and layout. No signup, no watermark.",
    keywords: "PowerPoint to PDF, PPT to PDF, convert PowerPoint to PDF, PPTX to PDF, PowerPoint to PDF online free",
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "PowerPoint to PDF Converter - PDF HUB 24",
      "url": `${BASE_URL}/ppt-to-pdf`,
      "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL }
    }
  },
  "/protect-pdf": {
    title: "Protect PDF Free — AES-256 Encryption | PDF HUB 24",
    description: "Add password protection to PDF files in seconds. Free PDF encryption tool — AES-256 security, set permissions. No signup, no watermark required.",
    keywords: "protect PDF, encrypt PDF, password protect PDF, secure PDF, PDF encryption online free",
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Protect PDF - PDF HUB 24",
      "url": `${BASE_URL}/protect-pdf`,
      "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL }
    }
  },
  "/unlock-pdf": {
    title: "Unlock PDF Free (Remove Password Instantly) | PDF HUB 24",
    description: "Remove password protection from PDF files in seconds. Free PDF unlocker — unlock PDFs for editing and printing. Requires your password. No signup.",
    keywords: "unlock PDF, remove PDF password, PDF unlocker, decrypt PDF, unlock PDF online free",
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Unlock PDF - PDF HUB 24",
      "url": `${BASE_URL}/unlock-pdf`,
      "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL }
    }
  },
  "/delete-pages": {
    title: "Delete PDF Pages Free Online (Select & Remove) | PDF HUB 24",
    description: "Remove unwanted pages from PDF documents in seconds. Free PDF page remover — select and delete specific pages. No signup, no watermark.",
    keywords: "delete PDF pages, remove PDF pages, PDF page remover, delete pages from PDF online free",
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Delete PDF Pages - PDF HUB 24",
      "url": `${BASE_URL}/delete-pages`,
      "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL }
    }
  },
  "/add-page-numbers": {
    title: "Add Page Numbers to PDF Free (Custom Position) | PDF HUB 24",
    description: "Add page numbers to PDF documents in seconds. Free PDF numbering tool — customize position, format, and style. No signup, no watermark.",
    keywords: "add page numbers PDF, PDF page numbers, number PDF pages, page numbering PDF online free",
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Add Page Numbers - PDF HUB 24",
      "url": `${BASE_URL}/add-page-numbers`,
      "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL }
    }
  },
  "/add-watermark": {
    title: "Add Watermark to PDF Free (Text & Custom Style) | PDF HUB 24",
    description: "Add text watermarks to PDF documents in seconds. Free PDF watermark tool — customize text, position, and opacity. No signup, no watermark limits.",
    keywords: "add watermark PDF, PDF watermark, watermark PDF online free, stamp PDF",
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Add Watermark - PDF HUB 24",
      "url": `${BASE_URL}/add-watermark`,
      "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL }
    }
  },
  "/extract-pages": {
    title: "Extract Pages from PDF Free (Select Any Pages) | PDF HUB 24",
    description: "Extract specific pages from any PDF instantly. Free PDF page extractor — enter page numbers or ranges like 1,3,5-8. No signup, no watermark.",
    keywords: "extract pages from PDF, PDF page extractor, extract PDF pages online free, save specific pages PDF, pull pages from PDF",
    canonical: `${BASE_URL}/extract-pages`,
    ogTitle: "Extract Pages from PDF Free | PDF HUB 24",
    ogDescription: "Extract specific pages from any PDF instantly. Enter page numbers or ranges — download in seconds. No signup required.",
    twitterCard: "summary_large_image",
    robots: "index, follow",
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Extract Pages from PDF - PDF HUB 24",
      "url": `${BASE_URL}/extract-pages`,
      "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL }
    }
  },
  "/reorder-pages": {
    title: "Reorder PDF Pages Free (Drag & Drop) | PDF HUB 24",
    description: "Reorder and rearrange PDF pages with drag & drop. Free PDF page organizer — change page sequence instantly. No signup, no watermark required.",
    keywords: "reorder PDF pages, rearrange PDF, organize PDF pages, sort PDF pages, reorder PDF online free",
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Reorder PDF Pages - PDF HUB 24",
      "url": `${BASE_URL}/reorder-pages`,
      "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL }
    }
  },
  "/extract-text": {
    title: "Extract Text from PDF Free (Copy & Download) | PDF HUB 24",
    description: "Extract text from PDF documents in seconds. Free PDF text extractor — copy text from any PDF. Works with scanned PDFs via OCR. No signup.",
    keywords: "extract text PDF, PDF to text, copy text from PDF, PDF text extractor, extract text online free",
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Extract Text from PDF - PDF HUB 24",
      "url": `${BASE_URL}/extract-text`,
      "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL }
    }
  },
  "/extract-images": {
    title: "Extract Images from PDF Free (Original Quality) | PDF HUB 24",
    description: "Extract all images from PDF documents in seconds. Free PDF image extractor — download images in original quality. No signup, no watermark.",
    keywords: "extract images PDF, PDF image extractor, get images from PDF, extract images online free",
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Extract Images from PDF - PDF HUB 24",
      "url": `${BASE_URL}/extract-images`,
      "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL }
    }
  },
  "/scan-to-pdf": {
    title: "Scan to PDF Free — Camera Scan Documents to PDF | PDF HUB 24",
    description: "Scan documents with your phone camera and convert to PDF instantly. Free online scan-to-PDF tool — take photos, combine into a PDF. No signup required.",
    keywords: "scan to PDF, camera scan PDF, document scanner, phone scan to PDF, scan document to PDF online free",
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Scan to PDF - PDF HUB 24",
      "url": `${BASE_URL}/scan-to-pdf`,
      "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL }
    }
  },
  "/pdf-to-pdfa": {
    title: "PDF to PDF/A Free — ISO Archive Format | PDF HUB 24",
    description: "Convert PDF to PDF/A-1b for long-term archiving. Free ISO-compliant PDF/A converter — perfect for legal, government, and official records. No signup.",
    keywords: "PDF to PDF/A, PDF/A converter, PDF archiving, ISO 19005, PDF/A-1b, PDF to PDF/A free online",
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "PDF to PDF/A - PDF HUB 24",
      "url": `${BASE_URL}/pdf-to-pdfa`,
      "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL }
    }
  },
  "/translate-pdf": {
    title: "Translate PDF Free — 50+ Languages Online | PDF HUB 24",
    description: "Translate any PDF document into 50+ languages instantly. Free online PDF translator — English, Spanish, French, Arabic, Hindi, Chinese & more. No signup.",
    keywords: "translate PDF, PDF translator online free, translate PDF to Spanish, translate PDF to French, translate PDF to Arabic, translate document online, PDF language translator",
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Translate PDF - PDF HUB 24",
      "url": `${BASE_URL}/translate-pdf`,
      "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL }
    }
  },
  "/batch-compress": {
    title: "Batch Compress PDF Free — Multiple PDFs at Once | PDF HUB 24",
    description: "Compress multiple PDF files at once and download as a ZIP. Free batch PDF compressor — reduce file sizes in bulk. No signup, no watermark.",
    keywords: "batch compress PDF, compress multiple PDFs, bulk PDF compressor, PDF batch processing, compress PDF ZIP",
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Batch Compress PDF - PDF HUB 24",
      "url": `${BASE_URL}/batch-compress`,
      "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL }
    }
  },
  "/ocr-pdf": {
    title: "OCR PDF Free — Scanned PDF to Searchable Text | PDF HUB 24",
    description: "OCR scanned PDFs and extract text instantly. Free online OCR tool — convert scanned documents to searchable, selectable text. No signup required.",
    keywords: "OCR PDF, optical character recognition, extract text scanned PDF, OCR online free",
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "OCR PDF - PDF HUB 24",
      "url": `${BASE_URL}/ocr-pdf`,
      "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL }
    }
  },
  "/crop-pdf": {
    title: "Crop PDF Free Online (Remove Margins Instantly) | PDF HUB 24",
    description: "Crop and trim PDF page margins in seconds. Free PDF cropper — remove white space and unwanted border areas. No signup, no watermark, instant download.",
    keywords: "crop PDF, trim PDF margins, PDF cropper, remove PDF margins, crop PDF online free",
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Crop PDF - PDF HUB 24",
      "url": `${BASE_URL}/crop-pdf`,
      "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL }
    }
  },
  "/resize-pdf": {
    title: "Resize PDF Free Online — A4, Letter & More | PDF HUB 24",
    description: "Resize PDF pages to A4, Letter, Legal, and custom sizes. Free PDF resizer — change document dimensions instantly. No signup, no watermark.",
    keywords: "resize PDF, change PDF size, PDF page size, resize PDF online free",
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Resize PDF - PDF HUB 24",
      "url": `${BASE_URL}/resize-pdf`,
      "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL }
    }
  },
  "/sign-pdf": {
    title: "Sign PDF Free Online (Draw, Type or Upload) | PDF HUB 24",
    description: "Add your signature to PDF documents in seconds. Free PDF signing tool — draw, type, or upload an image of your signature. No signup, no watermark required.",
    keywords: "sign PDF, add signature PDF, PDF signature, e-sign PDF, sign PDF online free",
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Sign PDF - PDF HUB 24",
      "url": `${BASE_URL}/sign-pdf`,
      "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL }
    }
  },
  "/flatten-pdf": {
    title: "Flatten PDF Free Online (Forms & Layers) | PDF HUB 24",
    description: "Flatten PDF forms and layers into static content. Free PDF flattener — convert fillable forms to regular PDFs. Perfect for printing. No signup.",
    keywords: "flatten PDF, merge PDF layers, flatten PDF forms, PDF flattener, flatten PDF online free",
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Flatten PDF - PDF HUB 24",
      "url": `${BASE_URL}/flatten-pdf`,
      "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL }
    }
  },
  "/grayscale-pdf": {
    title: "PDF to Grayscale Free (Save Ink & Toner) | PDF HUB 24",
    description: "Convert PDF to grayscale for black & white printing. Free PDF grayscale converter — reduce ink usage by up to 80%. No signup, no watermark.",
    keywords: "PDF to grayscale, black and white PDF, convert PDF grayscale, PDF grayscale online free",
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "PDF to Grayscale - PDF HUB 24",
      "url": `${BASE_URL}/grayscale-pdf`,
      "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL }
    }
  },
  "/repair-pdf": {
    title: "Repair PDF Free Online (Fix Corrupted Files) | PDF HUB 24",
    description: "Repair corrupted or damaged PDF files instantly. Free PDF repair tool — fix broken structure, recover content and pages. No signup, no watermark required.",
    keywords: "repair PDF, fix corrupted PDF, PDF repair tool, recover PDF, repair PDF online free",
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Repair PDF - PDF HUB 24",
      "url": `${BASE_URL}/repair-pdf`,
      "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL }
    }
  },
  "/edit-pdf": {
    title: "Edit PDF Free (Add Text, Images & Shapes) | PDF HUB 24",
    description: "Edit PDF documents online — add text, images, shapes, and annotations. Free PDF editor with drawing tools. No signup, no watermark required.",
    keywords: "edit PDF, PDF editor, add text to PDF, modify PDF, edit PDF online free",
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Edit PDF - PDF HUB 24",
      "url": `${BASE_URL}/edit-pdf`,
      "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL }
    }
  },
  "/annotate-pdf": {
    title: "Annotate PDF Free — Highlight & Add Notes | PDF HUB 24",
    description: "Annotate PDF documents with highlights, underlines, and notes. Free PDF annotation tool — mark up any PDF. No signup, no watermark required.",
    keywords: "annotate PDF, highlight PDF, PDF markup, PDF annotation, annotate PDF online free",
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Annotate PDF - PDF HUB 24",
      "url": `${BASE_URL}/annotate-pdf`,
      "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL }
    }
  },
  "/redact-pdf": {
    title: "Redact PDF Free — Remove Sensitive Info | PDF HUB 24",
    description: "Redact sensitive information from PDF documents. Free PDF redaction tool — permanently black out text and images. No signup, 100% secure.",
    keywords: "redact PDF, black out PDF, censor PDF, PDF redaction, redact PDF online free",
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Redact PDF - PDF HUB 24",
      "url": `${BASE_URL}/redact-pdf`,
      "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL }
    }
  },
  "/tiff-to-pdf": {
    title: "TIFF to PDF Free Online (High Quality) | PDF HUB 24",
    description: "Convert TIFF images to PDF in seconds. Free TIFF to PDF converter — maintains image quality perfectly. No signup, no watermark required.",
    keywords: "TIFF to PDF, convert TIFF to PDF, TIF to PDF, TIFF to PDF online free",
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "TIFF to PDF Converter - PDF HUB 24",
      "url": `${BASE_URL}/tiff-to-pdf`,
      "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL }
    }
  },
  "/gif-to-pdf": {
    title: "GIF to PDF Free Online (All Frames Preserved) | PDF HUB 24",
    description: "Convert GIF images to PDF in seconds with our free online tool. Preserves all animation frames and original quality. No signup, no watermark, instant results.",
    keywords: "GIF to PDF, convert GIF to PDF, GIF to PDF online free",
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "GIF to PDF Converter - PDF HUB 24",
      "url": `${BASE_URL}/gif-to-pdf`,
      "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL }
    }
  },
  "/webp-to-pdf": {
    title: "WebP to PDF Free Online (Fast & Lossless) | PDF HUB 24",
    description: "Convert WebP images to PDF in seconds with our free online converter. Maintains original quality, supports multiple WebP uploads. No signup, no watermark.",
    keywords: "WebP to PDF, convert WebP to PDF, WebP to PDF online free",
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "WebP to PDF Converter - PDF HUB 24",
      "url": `${BASE_URL}/webp-to-pdf`,
      "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL }
    }
  },
  "/html-to-pdf": {
    title: "HTML to PDF Free Online (Render Web Pages) | PDF HUB 24",
    description: "Convert HTML code to PDF documents in seconds. Free HTML to PDF converter — render web pages as PDFs with styling. No signup, no watermark.",
    keywords: "HTML to PDF, convert HTML to PDF, webpage to PDF, HTML to PDF online free",
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "HTML to PDF Converter - PDF HUB 24",
      "url": `${BASE_URL}/html-to-pdf`,
      "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL }
    }
  },
  "/pdf-viewer": {
    title: "PDF Viewer Free Online (No Download Needed) | PDF HUB 24",
    description: "View PDF files in your browser — no download, no install, no signup needed. Free online PDF viewer with zoom, scroll, and page navigation. Works on all devices.",
    keywords: "PDF viewer, view PDF online, read PDF, open PDF, PDF viewer online free",
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "PDF Viewer - PDF HUB 24",
      "url": `${BASE_URL}/pdf-viewer`,
      "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL }
    }
  },
  "/compare-pdf": {
    title: "Compare PDF Free Online (Find Every Difference) | PDF HUB 24",
    description: "Compare two PDF files and find differences in seconds. Free PDF comparison tool — highlight changes between documents. No signup required.",
    keywords: "compare PDF, PDF comparison, find PDF differences, compare PDF online free",
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Compare PDF - PDF HUB 24",
      "url": `${BASE_URL}/compare-pdf`,
      "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL }
    }
  },
  "/image-compressor": {
    title: "Image Compressor Free — JPG PNG WebP (No Loss) | PDF HUB 24",
    description: "Compress images (JPG, PNG, WebP) and reduce file size up to 80%. Free image compressor — maintain quality while saving space. No signup.",
    keywords: "compress image, image compressor, reduce image size, compress JPG PNG, image compressor online free",
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Image Compressor - PDF HUB 24",
      "url": `${BASE_URL}/image-compressor`,
      "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL }
    }
  },
  "/resize-image": {
    title: "Resize Image Free (Pixels or Percentage) | PDF HUB 24",
    description: "Resize images by pixels or percentage in seconds. Free image resizer — scale to any size. Supports JPG, PNG, WebP. No signup, no watermark.",
    keywords: "resize image, change image size, scale image, image resizer, resize image online free",
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Resize Image - PDF HUB 24",
      "url": `${BASE_URL}/resize-image`,
      "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL }
    }
  },
  "/crop-image": {
    title: "Crop Image Free Online (Select & Trim) | PDF HUB 24",
    description: "Crop images to remove unwanted areas in seconds. Free online image cropper — select and trim any portion precisely. Supports JPG, PNG, and WebP. No signup required.",
    keywords: "crop image, trim image, cut image, image cropper, crop image online free",
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Crop Image - PDF HUB 24",
      "url": `${BASE_URL}/crop-image`,
      "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL }
    }
  },
  "/rotate-image": {
    title: "Rotate & Flip Image Free (90°, 180°, Mirror) | PDF HUB 24",
    description: "Rotate or flip images in any direction. Free image rotator — turn images 90°, 180°, or flip horizontally/vertically. No signup required.",
    keywords: "rotate image, flip image, turn image, image rotator, rotate image online free",
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Rotate & Flip Image - PDF HUB 24",
      "url": `${BASE_URL}/rotate-image`,
      "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL }
    }
  },
  "/convert-image": {
    title: "Convert Image Free (JPG PNG WebP GIF — Instant) | PDF HUB 24",
    description: "Convert between image formats — JPG, PNG, WebP, GIF, TIFF, BMP. Free image converter — change format instantly. No signup, no watermark.",
    keywords: "convert image, image converter, JPG to PNG, PNG to JPG, convert image online free",
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Convert Image - PDF HUB 24",
      "url": `${BASE_URL}/convert-image`,
      "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL }
    }
  },
  "/watermark-pdf": {
    title: "Add Watermark to PDF Free (Text & Image) | PDF HUB 24",
    description: "Add custom text or image watermarks to any PDF. Free watermark tool — control opacity, position, and size. No signup, no watermarks added by us.",
    keywords: "add watermark to PDF, PDF watermark, watermark PDF free, text watermark PDF, image watermark PDF online",
    schema: { "@context": "https://schema.org", "@type": "WebPage", "name": "Add Watermark to PDF - PDF HUB 24", "url": `${BASE_URL}/watermark-pdf`, "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL } }
  },
  "/page-numbers": {
    title: "Add Page Numbers to PDF Free — Custom Style | PDF HUB 24",
    description: "Add page numbers to any PDF in any position — bottom center, top right, or custom offset. Multiple numbering styles. Free online tool, no signup.",
    keywords: "add page numbers to PDF, PDF page numbering, page numbers PDF free, number PDF pages online",
    schema: { "@context": "https://schema.org", "@type": "WebPage", "name": "Add Page Numbers to PDF - PDF HUB 24", "url": `${BASE_URL}/page-numbers`, "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL } }
  },
  "/jpg-to-png": {
    title: "JPG to PNG Free — Lossless Transparent Output | PDF HUB 24",
    description: "Convert JPG images to PNG with full transparency support. Free JPG to PNG converter — instant, lossless, supports batch conversion. No signup.",
    keywords: "JPG to PNG, convert JPG to PNG, JPEG to PNG free, JPG to PNG online, lossless image conversion",
    schema: { "@context": "https://schema.org", "@type": "WebPage", "name": "JPG to PNG Converter - PDF HUB 24", "url": `${BASE_URL}/jpg-to-png`, "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL } }
  },
  "/png-to-jpg": {
    title: "PNG to JPG Free — Reduce Image File Size | PDF HUB 24",
    description: "Convert PNG images to JPG and shrink file size significantly. Free PNG to JPG converter — custom quality, instant download, no signup required.",
    keywords: "PNG to JPG, convert PNG to JPG, PNG to JPEG free, PNG to JPG online, reduce image size",
    schema: { "@context": "https://schema.org", "@type": "WebPage", "name": "PNG to JPG Converter - PDF HUB 24", "url": `${BASE_URL}/png-to-jpg`, "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL } }
  },
  "/image-converter": {
    title: "Image Converter Free — JPG PNG WebP GIF | PDF HUB 24",
    description: "Convert images between JPG, PNG, WebP, GIF, TIFF, and BMP formats instantly. Free online image converter — batch supported, no signup required.",
    keywords: "image converter, convert image format, JPG PNG WebP converter, image format converter free online",
    schema: { "@context": "https://schema.org", "@type": "WebPage", "name": "Image Converter - PDF HUB 24", "url": `${BASE_URL}/image-converter`, "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL } }
  },
  "/epub-to-pdf": {
    title: "EPUB to PDF Free Online (Keeps Layout) | PDF HUB 24",
    description: "Convert EPUB ebooks to PDF in seconds. Free EPUB to PDF converter — preserves chapter structure, text flow, and images. No signup required.",
    keywords: "EPUB to PDF, convert EPUB to PDF, ebook to PDF, EPUB converter online free",
    schema: { "@context": "https://schema.org", "@type": "WebPage", "name": "EPUB to PDF Converter - PDF HUB 24", "url": `${BASE_URL}/epub-to-pdf`, "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL } }
  },
  "/pdf-to-epub": {
    title: "PDF to EPUB Free — Convert PDFs to eBooks | PDF HUB 24",
    description: "Convert PDF documents to EPUB ebook format for Kindle, Kobo, and Apple Books. Free PDF to EPUB — reflows text automatically. No signup required.",
    keywords: "PDF to EPUB, convert PDF to EPUB, PDF to ebook, PDF to Kindle, PDF to EPUB converter free",
    schema: { "@context": "https://schema.org", "@type": "WebPage", "name": "PDF to EPUB Converter - PDF HUB 24", "url": `${BASE_URL}/pdf-to-epub`, "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL } }
  },
  "/pdf-to-xml": {
    title: "PDF to XML Free Online (Structured Data) | PDF HUB 24",
    description: "Extract structured data from PDFs and export as XML. Free PDF to XML converter — preserves document structure and element hierarchy. No signup.",
    keywords: "PDF to XML, convert PDF to XML, PDF data extraction, PDF to structured XML free online",
    schema: { "@context": "https://schema.org", "@type": "WebPage", "name": "PDF to XML Converter - PDF HUB 24", "url": `${BASE_URL}/pdf-to-xml`, "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL } }
  },
  "/pdf-to-html": {
    title: "PDF to HTML Free Online (Web-Ready Output) | PDF HUB 24",
    description: "Convert PDF documents to HTML web pages with embedded styling. Free PDF to HTML converter — responsive output, inline CSS, no signup required.",
    keywords: "PDF to HTML, convert PDF to HTML, PDF to web page, PDF to HTML online free",
    schema: { "@context": "https://schema.org", "@type": "WebPage", "name": "PDF to HTML Converter - PDF HUB 24", "url": `${BASE_URL}/pdf-to-html`, "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL } }
  },
  "/pdf-to-text": {
    title: "PDF to Text Free — Extract All Text Content | PDF HUB 24",
    description: "Extract all text from PDF files as a plain TXT file. Free PDF to text tool — works on scanned PDFs with OCR. No signup, instant results.",
    keywords: "PDF to text, extract text from PDF, PDF to TXT, PDF text extractor free online",
    schema: { "@context": "https://schema.org", "@type": "WebPage", "name": "PDF to Text - PDF HUB 24", "url": `${BASE_URL}/pdf-to-text`, "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL } }
  },
  "/heic-to-jpg": {
    title: "HEIC to JPG Free — Convert iPhone Photos | PDF HUB 24",
    description: "Convert HEIC and HEIF photos from iPhone to JPG for universal compatibility. Free HEIC to JPG converter — batch supported, no signup required.",
    keywords: "HEIC to JPG, convert HEIC to JPG, HEIF to JPG, iPhone photo converter free online",
    schema: { "@context": "https://schema.org", "@type": "WebPage", "name": "HEIC to JPG Converter - PDF HUB 24", "url": `${BASE_URL}/heic-to-jpg`, "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL } }
  },
  "/heic-to-png": {
    title: "HEIC to PNG Free — Transparent PNG Output | PDF HUB 24",
    description: "Convert HEIC images from iPhone to PNG format with full transparency support. Free HEIC to PNG converter — lossless quality, no signup required.",
    keywords: "HEIC to PNG, convert HEIC to PNG, HEIF to PNG, iPhone HEIC converter free online",
    schema: { "@context": "https://schema.org", "@type": "WebPage", "name": "HEIC to PNG Converter - PDF HUB 24", "url": `${BASE_URL}/heic-to-png`, "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL } }
  },
  "/heic-to-pdf": {
    title: "HEIC to PDF Free — iPhone Photos to PDF | PDF HUB 24",
    description: "Convert HEIC photos from iPhone directly to PDF documents. Free HEIC to PDF converter — combine multiple photos into one PDF. No signup required.",
    keywords: "HEIC to PDF, convert HEIC to PDF, iPhone photos to PDF, HEIF to PDF free online",
    schema: { "@context": "https://schema.org", "@type": "WebPage", "name": "HEIC to PDF Converter - PDF HUB 24", "url": `${BASE_URL}/heic-to-pdf`, "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL } }
  },
  "/reduce-pdf-size": {
    title: "Reduce PDF Size Free — Lossless Online Tool | PDF HUB 24",
    description: "Reduce PDF file size without losing quality. Free online PDF size reducer — intelligent compression with 3 quality levels. No signup required.",
    keywords: "reduce PDF size, PDF size reducer, compress PDF free, shrink PDF online, reduce PDF file size",
    schema: { "@context": "https://schema.org", "@type": "WebPage", "name": "Reduce PDF Size - PDF HUB 24", "url": `${BASE_URL}/reduce-pdf-size`, "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL } }
  },
  "/pdf-page-size": {
    title: "PDF Page Size Converter — A4, Letter, Custom | PDF HUB 24",
    description: "Resize PDF pages to A4, Letter, A3, Legal, or any custom size online free. Free PDF page resizer — all standard sizes supported. No signup.",
    keywords: "PDF page size, resize PDF pages, PDF page resizer, change PDF paper size, A4 PDF converter free",
    schema: { "@context": "https://schema.org", "@type": "WebPage", "name": "PDF Page Size Converter - PDF HUB 24", "url": `${BASE_URL}/pdf-page-size`, "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL } }
  },
  "/pdf-metadata": {
    title: "Edit PDF Metadata Free — Title, Author & More | PDF HUB 24",
    description: "Edit PDF metadata including title, author, subject, and keywords. Free PDF metadata editor — add, modify, or clear document properties. No signup.",
    keywords: "PDF metadata editor, edit PDF metadata, PDF document properties, PDF title author keywords free",
    schema: { "@context": "https://schema.org", "@type": "WebPage", "name": "PDF Metadata Editor - PDF HUB 24", "url": `${BASE_URL}/pdf-metadata`, "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL } }
  },
  "/about": {
    title: "About PDF HUB 24 - Free Online PDF Tools",
    description: "Learn about PDF HUB 24 — your trusted source for 49+ free online PDF tools. Convert, edit, merge, compress, sign, and manage PDF files with no signup required.",
    keywords: "about PDF HUB 24, PDF tools, free PDF converter",
    schema: {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      "name": "About PDF HUB 24",
      "url": `${BASE_URL}/about`
    }
  },
  "/privacy": {
    title: "Privacy Policy — How We Protect Your Files | PDF HUB 24",
    description: "Read the PDF HUB 24 privacy policy. Uploads use TLS encryption, processed in-memory, and deleted within 1 hour. We never store or share your files. GDPR compliant.",
    keywords: "privacy policy, PDF HUB 24 privacy",
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Privacy Policy - PDF HUB 24",
      "url": `${BASE_URL}/privacy`,
      "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL }
    }
  },
  "/terms": {
    title: "Terms of Service — Usage Agreement | PDF HUB 24",
    description: "Read our terms of service. Learn about the usage terms for PDF HUB 24's free online PDF and image tools. Your rights and responsibilities.",
    keywords: "terms of service, PDF HUB 24 terms",
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Terms of Service - PDF HUB 24",
      "url": `${BASE_URL}/terms`,
      "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL }
    }
  },
  "/contact": {
    title: "Contact Us — Get Help With PDF Tools | PDF HUB 24",
    description: "Get in touch with PDF HUB 24. Contact our team for help with any PDF tool, to report a bug, request a feature, or share general feedback. We respond promptly.",
    keywords: "contact PDF HUB 24, PDF tools support, contact us",
    schema: {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      "name": "Contact PDF HUB 24",
      "url": `${BASE_URL}/contact`
    }
  },
  "/blog": {
    title: "PDF Tips & Tutorials Blog (25+ Free Guides) | PDF HUB 24",
    description: "25+ free PDF tutorials and guides. Learn to compress, convert, merge, edit, sign, and secure PDFs with step-by-step instructions. Updated for 2026.",
    keywords: "PDF tips, PDF tutorials, how to PDF, PDF guide, PDF help",
    schema: {
      "@context": "https://schema.org",
      "@type": "Blog",
      "name": "PDF HUB 24 Blog",
      "url": `${BASE_URL}/blog`,
      "description": "Tips, tutorials, and guides for working with PDF files"
    }
  },
  "/blog/how-to-compress-pdf-for-email": {
    title: "Compress PDF for Email Under 25MB — Free Guide | PDF HUB 24",
    description: "Compress PDF for email in seconds. Reduce under 25MB, 10MB, or 1MB while keeping quality. Free step-by-step guide with 3 compression levels.",
    keywords: "compress PDF for email, reduce PDF size, PDF email attachment, shrink PDF",
    schema: {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "How to Compress PDF for Email: Reduce File Size Under 25MB",
      "author": { "@type": "Organization", "name": "PDF HUB 24" },
      "publisher": { "@type": "Organization", "name": "PDF HUB 24", "url": BASE_URL },
      "datePublished": "2025-12-16",
      "dateModified": "2026-04-18",
      "url": `${BASE_URL}/blog/how-to-compress-pdf-for-email`
    }
  },
  "/blog/convert-pdf-to-word-without-losing-formatting": {
    title: "PDF to Word (Keep Formatting, No Email) — Free Guide 2026",
    description: "Convert PDF to Word without losing formatting, tables, or images. Free converter — no email, no watermark. Step-by-step guide with tips for 2026.",
    keywords: "PDF to Word formatting, convert PDF Word, preserve PDF formatting, PDF to DOCX",
    schema: {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "How to Convert PDF to Word Without Losing Formatting",
      "author": { "@type": "Organization", "name": "PDF HUB 24" },
      "publisher": { "@type": "Organization", "name": "PDF HUB 24", "url": BASE_URL },
      "datePublished": "2025-12-16",
      "dateModified": "2026-04-18",
      "url": `${BASE_URL}/blog/convert-pdf-to-word-without-losing-formatting`
    }
  },
  "/blog/merge-pdf-files-guide": {
    title: "Merge PDF Files Free — Combine 2+ PDFs | PDF HUB 24",
    description: "Merge multiple PDF files into one document for free. Step-by-step guide to combining PDFs online — drag, drop, reorder pages. No signup or watermark.",
    keywords: "merge PDF files, combine PDF, join PDF, PDF merger guide",
    schema: {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "How to Merge PDF Files: Complete Guide to Combining Documents",
      "author": { "@type": "Organization", "name": "PDF HUB 24" },
      "publisher": { "@type": "Organization", "name": "PDF HUB 24", "url": BASE_URL },
      "datePublished": "2025-12-16",
      "dateModified": "2026-04-18",
      "url": `${BASE_URL}/blog/merge-pdf-files-guide`
    }
  },
  "/blog/protect-pdf-with-password": {
    title: "Password Protect PDF Free (AES-256 Guide) | PDF HUB 24",
    description: "Add password protection to PDF files with AES-256 encryption. Free step-by-step guide to encrypting PDFs, setting permissions, and securing documents.",
    keywords: "password protect PDF, encrypt PDF, secure PDF, PDF password",
    schema: {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "How to Password Protect a PDF: Security Best Practices",
      "author": { "@type": "Organization", "name": "PDF HUB 24" },
      "publisher": { "@type": "Organization", "name": "PDF HUB 24", "url": BASE_URL },
      "datePublished": "2025-12-16",
      "dateModified": "2026-04-18",
      "url": `${BASE_URL}/blog/protect-pdf-with-password`
    }
  },
  "/blog/pdf-tools-for-students": {
    title: "10 Free PDF Tools Every Student Needs in 2026 | PDF HUB 24",
    description: "Essential free PDF tools for students — merge assignments, compress for LMS, convert to Word, sign forms. Complete academic guide for 2026.",
    keywords: "PDF tools students, academic PDF, student PDF guide, free PDF tools school",
    schema: {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "Essential PDF Tools Every Student Needs: Complete Guide",
      "author": { "@type": "Organization", "name": "PDF HUB 24" },
      "publisher": { "@type": "Organization", "name": "PDF HUB 24", "url": BASE_URL },
      "datePublished": "2025-12-16",
      "dateModified": "2026-04-18",
      "url": `${BASE_URL}/blog/pdf-tools-for-students`
    }
  },
  "/blog/sign-pdf-electronically": {
    title: "Sign PDF Free Online (3 Methods, No Printing) | PDF HUB 24",
    description: "Sign PDF documents electronically for free — draw, type, or upload your signature. No printing, no scanning. Step-by-step e-signing guide for 2026.",
    keywords: "sign PDF electronically, e-sign PDF, digital signature PDF, sign PDF free online",
    schema: {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "How to Sign a PDF Electronically: Complete Free Guide",
      "author": { "@type": "Organization", "name": "PDF HUB 24" },
      "publisher": { "@type": "Organization", "name": "PDF HUB 24", "url": BASE_URL },
      "datePublished": "2026-02-01",
      "dateModified": "2026-04-18",
      "url": `${BASE_URL}/blog/sign-pdf-electronically`
    }
  },
  "/blog/edit-pdf-text-images": {
    title: "Edit PDF Free — Add Text, Images & Shapes | PDF HUB 24",
    description: "Edit PDF files online for free — add text, images, shapes, and annotations. No software install. Step-by-step guide with tips for 2026.",
    keywords: "edit PDF free, add text to PDF, edit PDF online, modify PDF document",
    schema: {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "How to Edit a PDF: Add Text, Images, and Shapes",
      "author": { "@type": "Organization", "name": "PDF HUB 24" },
      "publisher": { "@type": "Organization", "name": "PDF HUB 24", "url": BASE_URL },
      "datePublished": "2026-02-01",
      "dateModified": "2026-04-18",
      "url": `${BASE_URL}/blog/edit-pdf-text-images`
    }
  },
  "/blog/watermark-pdf-documents": {
    title: "Add Watermark to PDF Free (Custom Text & Style) | PDF HUB 24",
    description: "Add text watermarks to PDF documents for free. Set custom position, opacity, and style. Step-by-step guide to branding and protecting your PDFs.",
    keywords: "watermark PDF, add watermark to PDF, PDF watermark free, stamp PDF online",
    schema: {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "How to Add Watermark to PDF Documents: Complete Guide",
      "author": { "@type": "Organization", "name": "PDF HUB 24" },
      "publisher": { "@type": "Organization", "name": "PDF HUB 24", "url": BASE_URL },
      "datePublished": "2026-02-01",
      "dateModified": "2026-04-18",
      "url": `${BASE_URL}/blog/watermark-pdf-documents`
    }
  },
  "/blog/pdf-to-excel-convert-tables": {
    title: "PDF to Excel Free — Convert Tables | PDF HUB 24",
    description: "Convert PDF tables to Excel spreadsheets accurately. Extract data to XLS/XLSX while preserving table structure. Free step-by-step guide for 2026.",
    keywords: "PDF to Excel, convert PDF tables, extract data PDF Excel, PDF to spreadsheet",
    schema: {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "How to Convert PDF Tables to Excel: Step-by-Step Guide",
      "author": { "@type": "Organization", "name": "PDF HUB 24" },
      "publisher": { "@type": "Organization", "name": "PDF HUB 24", "url": BASE_URL },
      "datePublished": "2026-02-01",
      "dateModified": "2026-04-18",
      "url": `${BASE_URL}/blog/pdf-to-excel-convert-tables`
    }
  },
  "/blog/redact-sensitive-pdf-information": {
    title: "How to Redact a PDF: Black Out Sensitive Text & Images (GDPR Guide)",
    description: "Step-by-step guide to redact sensitive data from PDFs. Black out text, images, and personal info. GDPR, HIPAA & CCPA compliant. Free online tool, no signup required.",
    keywords: "how to redact PDF, black out PDF text, GDPR PDF redaction, HIPAA redaction guide, remove sensitive info PDF, PDF redaction tutorial",
    schema: {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "How to Redact Sensitive Information in PDFs: Complete Guide",
      "author": { "@type": "Organization", "name": "PDF HUB 24" },
      "publisher": { "@type": "Organization", "name": "PDF HUB 24", "url": BASE_URL },
      "datePublished": "2026-02-01",
      "dateModified": "2026-04-18",
      "url": `${BASE_URL}/blog/redact-sensitive-pdf-information`
    }
  },
  "/pdf-statistics": {
    title: "PDF Statistics & Facts 2026 - Data & Trends | PDF HUB 24",
    description: "Comprehensive PDF statistics and facts for 2026. Document usage data, conversion trends, file size benchmarks, and security insights with citable sources.",
    keywords: "PDF statistics, PDF usage data, PDF facts 2026, document format trends, PDF market data",
    schema: {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "PDF Statistics & Facts 2026: Comprehensive Usage Data",
      "author": { "@type": "Organization", "name": "PDF HUB 24" },
      "publisher": { "@type": "Organization", "name": "PDF HUB 24", "url": BASE_URL },
      "datePublished": "2026-02-01",
      "dateModified": "2026-04-18",
      "url": `${BASE_URL}/pdf-statistics`
    }
  },
  "/press": {
    title: "Press & Media Kit - PDF HUB 24",
    description: "PDF HUB 24 press kit for journalists and bloggers. Download logo files, brand guidelines, company facts, tool screenshots, and find our media contact details.",
    keywords: "PDF HUB 24 press kit, media kit, company information, brand assets",
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Press & Media Kit - PDF HUB 24",
      "url": `${BASE_URL}/press`,
      "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL }
    }
  },
  "/all-tools": {
    title: "All 49+ Free PDF Tools — Complete List 2026 | PDF HUB 24",
    description: "Browse all 49+ free online PDF tools. Convert, edit, merge, split, compress PDFs and more. Complete tool directory — no signup, no watermark.",
    keywords: "all PDF tools, free PDF tools list, online PDF tools, PDF converter tools, PDF editor tools",
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "PDF HUB 24 - All Tools",
      "url": `${BASE_URL}/all-tools`,
      "description": "Complete collection of 49+ free online PDF tools",
      "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL }
    }
  },
  "/free-pdf-converter": {
    title: "Free PDF Converter (Any File, No Signup) | PDF HUB 24",
    description: "Best free PDF converter online. Convert PDF to Word, Excel, JPG, PNG, PPT and more. Convert images and documents to PDF. No signup, no watermark.",
    keywords: "free PDF converter, PDF converter online, convert PDF free, PDF to Word converter, image to PDF converter",
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Free PDF Converter - PDF HUB 24",
      "url": `${BASE_URL}/free-pdf-converter`,
      "description": "Convert PDF files to and from Word, Excel, JPG, PNG, PowerPoint and more formats for free",
      "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL }
    }
  },
  "/dmca": {
    title: "DMCA Policy — Copyright Compliance | PDF HUB 24",
    description: "Read the PDF HUB 24 DMCA policy. Learn how to report copyright infringement, our content takedown procedures, and how we handle intellectual property claims.",
    keywords: "DMCA policy, copyright, PDF HUB 24 DMCA",
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "DMCA Policy - PDF HUB 24",
      "url": `${BASE_URL}/dmca`,
      "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL }
    }
  },
  "/blog/how-to-split-pdf-pages": {
    title: "Split PDF Free — Extract Pages in Seconds | PDF HUB 24",
    description: "Split PDF pages and extract sections from large PDFs. Free PDF splitter — select page ranges or single pages. No software install, no signup.",
    keywords: "split PDF pages, extract PDF pages, separate PDF sections, PDF splitter free",
    schema: {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "How to Split PDF Pages: Extract and Separate PDF Documents",
      "author": { "@type": "Organization", "name": "PDF HUB 24" },
      "publisher": { "@type": "Organization", "name": "PDF HUB 24", "url": BASE_URL },
      "datePublished": "2026-02-01",
      "dateModified": "2026-04-18",
      "url": `${BASE_URL}/blog/how-to-split-pdf-pages`
    }
  },
  "/blog/add-page-numbers-to-pdf": {
    title: "Add Page Numbers to PDF Free — Custom Style | PDF HUB 24",
    description: "Add page numbers to PDF free. Customize position, style, starting number. Best free PDF numbering tool for reports and theses. No signup.",
    keywords: "add page numbers PDF, PDF page numbering, number PDF pages free",
    schema: {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "How to Add Page Numbers to PDF Documents",
      "author": { "@type": "Organization", "name": "PDF HUB 24" },
      "publisher": { "@type": "Organization", "name": "PDF HUB 24", "url": BASE_URL },
      "datePublished": "2026-02-01",
      "dateModified": "2026-04-18",
      "url": `${BASE_URL}/blog/add-page-numbers-to-pdf`
    }
  },
  "/blog/convert-images-to-pdf": {
    title: "Images to PDF Free — JPG PNG WebP (No Signup) | PDF HUB 24",
    description: "Convert images to PDF free. JPG, PNG, WebP, TIFF, GIF to PDF instantly. Best free image to PDF converter — combine multiple images, no signup.",
    keywords: "convert images to PDF, JPG to PDF, PNG to PDF, image to PDF free",
    schema: {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "How to Convert Images to PDF: JPG, PNG, and More",
      "author": { "@type": "Organization", "name": "PDF HUB 24" },
      "publisher": { "@type": "Organization", "name": "PDF HUB 24", "url": BASE_URL },
      "datePublished": "2026-02-01",
      "dateModified": "2026-04-18",
      "url": `${BASE_URL}/blog/convert-images-to-pdf`
    }
  },
  "/blog/ocr-scanned-pdf-to-text": {
    title: "OCR PDF Free — Scanned to Searchable Text | PDF HUB 24",
    description: "OCR PDF free online. Convert scanned documents to searchable text. Best free OCR tool — extract text from images and scanned pages instantly.",
    keywords: "OCR PDF, scanned PDF to text, optical character recognition, OCR free online",
    schema: {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "OCR PDF: Convert Scanned Documents to Searchable Text",
      "author": { "@type": "Organization", "name": "PDF HUB 24" },
      "publisher": { "@type": "Organization", "name": "PDF HUB 24", "url": BASE_URL },
      "datePublished": "2026-02-01",
      "dateModified": "2026-04-18",
      "url": `${BASE_URL}/blog/ocr-scanned-pdf-to-text`
    }
  },
  "/blog/rotate-pdf-pages": {
    title: "Rotate PDF Pages Free — Fix Orientation | PDF HUB 24",
    description: "Rotate PDF pages free. Fix upside-down or sideways PDFs — rotate 90°, 180°, 270°. Best free PDF rotation tool for all or specific pages.",
    keywords: "rotate PDF pages, fix PDF orientation, rotate PDF free, turn PDF pages",
    schema: {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "How to Rotate PDF Pages: Fix Orientation Issues",
      "author": { "@type": "Organization", "name": "PDF HUB 24" },
      "publisher": { "@type": "Organization", "name": "PDF HUB 24", "url": BASE_URL },
      "datePublished": "2026-02-01",
      "dateModified": "2026-04-18",
      "url": `${BASE_URL}/blog/rotate-pdf-pages`
    }
  },
  "/blog/how-to-flatten-pdf": {
    title: "Flatten PDF Free (Forms, Layers & Annotations) | PDF HUB 24",
    description: "Flatten PDF forms and layers into static content for printing and sharing. Free online tool — no signup. Perfect for archiving and distribution.",
    keywords: "flatten PDF, flatten PDF forms, PDF flatten online free, merge PDF layers",
    schema: {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "How to Flatten PDF Forms and Layers",
      "author": { "@type": "Organization", "name": "PDF HUB 24" },
      "publisher": { "@type": "Organization", "name": "PDF HUB 24", "url": BASE_URL },
      "datePublished": "2026-02-27",
      "dateModified": "2026-04-18",
      "url": `${BASE_URL}/blog/how-to-flatten-pdf`
    }
  },
  "/blog/crop-pdf-pages-guide": {
    title: "Crop PDF Pages Free (Remove Margins) | PDF HUB 24",
    description: "Crop PDF pages and remove unwanted margins or whitespace in seconds. Free online PDF cropper — trim borders precisely, no registration, no watermark needed.",
    keywords: "crop PDF, remove PDF margins, trim PDF pages, PDF cropper free online",
    schema: {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "How to Crop PDF Pages and Remove Margins",
      "author": { "@type": "Organization", "name": "PDF HUB 24" },
      "publisher": { "@type": "Organization", "name": "PDF HUB 24", "url": BASE_URL },
      "datePublished": "2026-02-27",
      "dateModified": "2026-04-18",
      "url": `${BASE_URL}/blog/crop-pdf-pages-guide`
    }
  },
  "/blog/resize-pdf-to-a4": {
    title: "Resize PDF to A4 or Letter Free (No Software) | PDF HUB 24",
    description: "Change PDF page size to A4, Letter, Legal, or custom dimensions online. Free PDF resizer — resize all or selected pages. No software download, no signup required.",
    keywords: "resize PDF to A4, change PDF page size, PDF resize online free, PDF to letter size",
    schema: {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "How to Resize PDF to A4 or Letter Size",
      "author": { "@type": "Organization", "name": "PDF HUB 24" },
      "publisher": { "@type": "Organization", "name": "PDF HUB 24", "url": BASE_URL },
      "datePublished": "2026-02-27",
      "dateModified": "2026-04-18",
      "url": `${BASE_URL}/blog/resize-pdf-to-a4`
    }
  },
  "/blog/compare-two-pdf-files": {
    title: "Compare 2 PDF Files Free (Find Every Change) | PDF HUB 24",
    description: "Compare two PDF files side by side and find every difference. Free PDF comparison tool — highlight changes between documents. No signup.",
    keywords: "compare PDF files, PDF diff tool, compare two PDFs online, find PDF differences",
    schema: {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "How to Compare Two PDF Files and Find Differences",
      "author": { "@type": "Organization", "name": "PDF HUB 24" },
      "publisher": { "@type": "Organization", "name": "PDF HUB 24", "url": BASE_URL },
      "datePublished": "2026-02-27",
      "dateModified": "2026-04-18",
      "url": `${BASE_URL}/blog/compare-two-pdf-files`
    }
  },
  "/blog/html-to-pdf-conversion": {
    title: "HTML to PDF Free — Render Web Pages (Keeps CSS) | PDF HUB 24",
    description: "Convert HTML and web pages to PDF documents with CSS styling. Free HTML to PDF converter — no signup, no watermark. Perfect for reports.",
    keywords: "HTML to PDF, convert HTML to PDF, web page to PDF, HTML to PDF free online",
    schema: {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "How to Convert HTML to PDF Documents",
      "author": { "@type": "Organization", "name": "PDF HUB 24" },
      "publisher": { "@type": "Organization", "name": "PDF HUB 24", "url": BASE_URL },
      "datePublished": "2026-02-27",
      "dateModified": "2026-04-18",
      "url": `${BASE_URL}/blog/html-to-pdf-conversion`
    }
  },
  "/blog/extract-text-from-pdf": {
    title: "Extract Text from PDF Free (Scans + OCR) | PDF HUB 24",
    description: "Extract and copy text from any PDF file online — including scanned documents using OCR. Free tool with instant results. No signup, no software installation needed.",
    keywords: "extract text from PDF, copy text from PDF, PDF text extractor, PDF to text free",
    schema: {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "How to Extract Text from PDF Files",
      "author": { "@type": "Organization", "name": "PDF HUB 24" },
      "publisher": { "@type": "Organization", "name": "PDF HUB 24", "url": BASE_URL },
      "datePublished": "2026-02-27",
      "dateModified": "2026-04-18",
      "url": `${BASE_URL}/blog/extract-text-from-pdf`
    }
  },
  "/blog/best-free-pdf-tools-2026": {
    title: "12 Best Free PDF Tools Online in 2026 | PDF HUB 24",
    description: "Complete guide to the best free online PDF tools in 2026. Convert, edit, merge, compress, sign, and more — no signup, no watermark, 100% free.",
    keywords: "best free PDF tools 2026, free PDF editor online, best PDF converter, free PDF tools",
    schema: {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "Best Free PDF Tools Online in 2026",
      "author": { "@type": "Organization", "name": "PDF HUB 24" },
      "publisher": { "@type": "Organization", "name": "PDF HUB 24", "url": BASE_URL },
      "datePublished": "2026-02-27",
      "dateModified": "2026-04-18",
      "url": `${BASE_URL}/blog/best-free-pdf-tools-2026`
    }
  },
  "/blog/pdf-accessibility-guide": {
    title: "PDF Accessibility Guide 2026 — OCR, Tags & ADA | PDF HUB 24",
    description: "Make PDFs accessible with OCR, text extraction, and proper formatting. Complete guide to ADA-compliant, inclusive PDF documents for 2026.",
    keywords: "PDF accessibility, accessible PDF, OCR PDF, PDF screen reader, ADA PDF compliance",
    schema: {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "PDF Accessibility Guide: Making PDFs Inclusive",
      "author": { "@type": "Organization", "name": "PDF HUB 24" },
      "publisher": { "@type": "Organization", "name": "PDF HUB 24", "url": BASE_URL },
      "datePublished": "2026-02-27",
      "dateModified": "2026-04-18",
      "url": `${BASE_URL}/blog/pdf-accessibility-guide`
    }
  },
  "/blog/batch-convert-images-to-pdf": {
    title: "Batch Convert Images to PDF Free (JPG PNG TIFF) | PDF HUB 24",
    description: "Batch convert JPG, PNG, WebP, TIFF, and GIF images to PDF. Combine multiple images into one PDF — free online, no signup, no watermark.",
    keywords: "batch images to PDF, multiple images to PDF, JPG to PDF, convert photos to PDF free",
    schema: {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "How to Batch Convert Images to PDF",
      "author": { "@type": "Organization", "name": "PDF HUB 24" },
      "publisher": { "@type": "Organization", "name": "PDF HUB 24", "url": BASE_URL },
      "datePublished": "2026-02-27",
      "dateModified": "2026-04-18",
      "url": `${BASE_URL}/blog/batch-convert-images-to-pdf`
    }
  },
  "/blog/unlock-pdf-remove-password": {
    title: "Unlock PDF Free — Remove Password (Instant) | PDF HUB 24",
    description: "Remove password protection from PDF files for free. Unlock PDFs for editing, printing, and copying. No signup — requires your password.",
    keywords: "unlock PDF, remove PDF password, PDF password remover free, unprotect PDF online",
    schema: {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "How to Unlock PDF and Remove Password Protection",
      "author": { "@type": "Organization", "name": "PDF HUB 24" },
      "publisher": { "@type": "Organization", "name": "PDF HUB 24", "url": BASE_URL },
      "datePublished": "2026-02-27",
      "dateModified": "2026-04-18",
      "url": `${BASE_URL}/blog/unlock-pdf-remove-password`
    }
  },
  "/blog/annotate-pdf-comments": {
    title: "How to Annotate PDF: Add Comments, Highlights, Notes | PDF HUB 24",
    description: "Learn how to annotate PDF files online free. Add comments, highlights, sticky notes, arrows, and text boxes to any PDF without software.",
    keywords: "annotate PDF, PDF comments, highlight PDF, PDF sticky notes, PDF markup",
    schema: { "@context": "https://schema.org", "@type": "Article", "headline": "How to Annotate PDF: Add Comments, Highlights, and Notes", "author": { "@type": "Organization", "name": "PDF HUB 24" }, "publisher": { "@type": "Organization", "name": "PDF HUB 24", "url": BASE_URL }, "datePublished": "2026-03-05",
      "dateModified": "2026-04-18", "url": `${BASE_URL}/blog/annotate-pdf-comments` }
  },
  "/blog/translate-pdf-documents": {
    title: "How to Translate a PDF to Any Language Free | PDF HUB 24",
    description: "Translate PDF documents to Spanish, French, German, Arabic, Chinese, and 100+ languages free. No signup. Download translated PDF instantly.",
    keywords: "translate PDF, PDF translation, PDF to Spanish, PDF to French, multilingual PDF",
    schema: { "@context": "https://schema.org", "@type": "Article", "headline": "How to Translate a PDF to Any Language", "author": { "@type": "Organization", "name": "PDF HUB 24" }, "publisher": { "@type": "Organization", "name": "PDF HUB 24", "url": BASE_URL }, "datePublished": "2026-03-08",
      "dateModified": "2026-04-18", "url": `${BASE_URL}/blog/translate-pdf-documents` }
  },
  "/blog/repair-corrupted-pdf": {
    title: "How to Repair a Corrupted PDF File Free Online | PDF HUB 24",
    description: "Fix corrupted, damaged, or unreadable PDF files free online. Repair PDFs that won't open, show errors, or have missing content. No signup.",
    keywords: "repair PDF, corrupted PDF, damaged PDF, fix PDF, PDF recovery",
    schema: { "@context": "https://schema.org", "@type": "Article", "headline": "How to Repair a Corrupted or Damaged PDF File", "author": { "@type": "Organization", "name": "PDF HUB 24" }, "publisher": { "@type": "Organization", "name": "PDF HUB 24", "url": BASE_URL }, "datePublished": "2026-03-10",
      "dateModified": "2026-04-18", "url": `${BASE_URL}/blog/repair-corrupted-pdf` }
  },
  "/blog/pdf-to-powerpoint-guide": {
    title: "Convert PDF to PowerPoint Free Online (2026) | PDF HUB 24",
    description: "Convert PDF to PowerPoint (PPT/PPTX) free online. Extract slides, preserve layout and text. No software needed. Download editable presentation instantly.",
    keywords: "PDF to PowerPoint, PDF to PPT, convert PDF presentation, PDF to PPTX free",
    schema: { "@context": "https://schema.org", "@type": "Article", "headline": "How to Convert PDF to PowerPoint Free Online", "author": { "@type": "Organization", "name": "PDF HUB 24" }, "publisher": { "@type": "Organization", "name": "PDF HUB 24", "url": BASE_URL }, "datePublished": "2026-03-12",
      "dateModified": "2026-04-18", "url": `${BASE_URL}/blog/pdf-to-powerpoint-guide` }
  },
  "/blog/jpg-to-pdf-guide": {
    title: "How to Convert JPG to PDF Free Online (2026) | PDF HUB 24",
    description: "Convert JPG images to PDF free online in seconds. Combine multiple JPEG photos into one PDF. No signup, no watermark, instant download. Works on all devices.",
    keywords: "JPG to PDF, convert image to PDF, photo to PDF, JPEG to PDF free",
    schema: { "@context": "https://schema.org", "@type": "Article", "headline": "How to Convert JPG to PDF: Complete Guide", "author": { "@type": "Organization", "name": "PDF HUB 24" }, "publisher": { "@type": "Organization", "name": "PDF HUB 24", "url": BASE_URL }, "datePublished": "2026-03-15",
      "dateModified": "2026-04-18", "url": `${BASE_URL}/blog/jpg-to-pdf-guide` }
  },
  "/blog/compress-images-online": {
    title: "How to Compress Images Without Losing Quality (2026) | PDF HUB 24",
    description: "Compress JPEG, PNG, WebP images free online. Reduce image file size by up to 80% without visible quality loss. No signup, instant download.",
    keywords: "compress images, reduce image size, image optimizer, compress JPEG PNG free",
    schema: { "@context": "https://schema.org", "@type": "Article", "headline": "How to Compress Images Without Losing Quality", "author": { "@type": "Organization", "name": "PDF HUB 24" }, "publisher": { "@type": "Organization", "name": "PDF HUB 24", "url": BASE_URL }, "datePublished": "2026-03-18",
      "dateModified": "2026-04-18", "url": `${BASE_URL}/blog/compress-images-online` }
  },
  "/blog/reorder-pdf-pages": {
    title: "How to Reorder PDF Pages: Rearrange and Organize | PDF HUB 24",
    description: "Reorder, rearrange, and reorganize PDF pages free online. Drag and drop pages into any order. No software, no signup. Download instantly.",
    keywords: "reorder PDF pages, rearrange PDF, organize PDF pages, move PDF pages",
    schema: { "@context": "https://schema.org", "@type": "Article", "headline": "How to Reorder PDF Pages: Rearrange, Move, and Organize", "author": { "@type": "Organization", "name": "PDF HUB 24" }, "publisher": { "@type": "Organization", "name": "PDF HUB 24", "url": BASE_URL }, "datePublished": "2026-03-20",
      "dateModified": "2026-04-18", "url": `${BASE_URL}/blog/reorder-pdf-pages` }
  },
  "/blog/remove-background-from-image": {
    title: "Remove Background from Image Free — Transparent PNG | PDF HUB 24",
    description: "Remove image backgrounds free online and get a transparent PNG in seconds. Works on photos, logos, and product images. No signup, no watermark, instant results.",
    keywords: "remove background, transparent PNG, background remover, cut out image free",
    schema: { "@context": "https://schema.org", "@type": "Article", "headline": "How to Remove Background from Any Image", "author": { "@type": "Organization", "name": "PDF HUB 24" }, "publisher": { "@type": "Organization", "name": "PDF HUB 24", "url": BASE_URL }, "datePublished": "2026-03-22",
      "dateModified": "2026-04-18", "url": `${BASE_URL}/blog/remove-background-from-image` }
  },
  "/blog/convert-pdf-to-png": {
    title: "Convert PDF to PNG Free Online — High Quality | PDF HUB 24",
    description: "Convert PDF pages to high-quality PNG images free online. Extract PDF as transparent PNG with no quality loss. No signup, instant download.",
    keywords: "PDF to PNG, convert PDF to image, PDF to transparent PNG, extract PDF pages as PNG",
    schema: { "@context": "https://schema.org", "@type": "Article", "headline": "How to Convert PDF to PNG: High Quality Image Extraction", "author": { "@type": "Organization", "name": "PDF HUB 24" }, "publisher": { "@type": "Organization", "name": "PDF HUB 24", "url": BASE_URL }, "datePublished": "2026-03-25",
      "dateModified": "2026-04-18", "url": `${BASE_URL}/blog/convert-pdf-to-png` }
  },
  "/blog/excel-to-pdf": {
    title: "Convert Excel to PDF Free — Spreadsheets & Tables | PDF HUB 24",
    description: "Convert Excel (XLS/XLSX) to PDF free online. Preserve tables, formatting, and formulas as values. No signup. Works with all Excel versions.",
    keywords: "Excel to PDF, XLSX to PDF, convert spreadsheet to PDF, Excel PDF converter",
    schema: { "@context": "https://schema.org", "@type": "Article", "headline": "How to Convert Excel to PDF: Spreadsheets, Tables, and Formatting", "author": { "@type": "Organization", "name": "PDF HUB 24" }, "publisher": { "@type": "Organization", "name": "PDF HUB 24", "url": BASE_URL }, "datePublished": "2026-03-28",
      "dateModified": "2026-04-18", "url": `${BASE_URL}/blog/excel-to-pdf` }
  },
  "/free-pdf-editor": {
    title: "Free PDF Editor Online — 49+ Tools (No Install) | PDF HUB 24",
    description: "Best free PDF editor online. Edit, merge, split, compress, rotate, sign, annotate, and redact PDFs. 49+ tools, no download, no registration needed.",
    keywords: "free PDF editor, edit PDF online, PDF editor free, online PDF editor, modify PDF free",
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Free PDF Editor - PDF HUB 24",
      "url": `${BASE_URL}/free-pdf-editor`,
      "description": "Edit PDF files online for free - merge, split, compress, rotate, sign, annotate, and more",
      "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL }
    }
  },
  "/convert-pdf": {
    title: "Convert PDF Online Free — All Formats Supported | PDF HUB 24",
    description: "Convert PDF to Word, Excel, JPG, PNG, PowerPoint and more. Convert images and documents to PDF. Free online converter with no signup, no watermark.",
    keywords: "convert PDF, PDF converter, PDF to Word, PDF to JPG, Word to PDF, image to PDF",
    schema: { "@context": "https://schema.org", "@type": "CollectionPage", "name": "Convert PDF Tools", "url": `${BASE_URL}/convert-pdf`, "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL } }
  },
  "/compress-pdf-tools": {
    title: "Compress PDF Online Free — Reduce Size 90% | PDF HUB 24",
    description: "Reduce PDF file size by up to 90% without losing quality. Free PDF compressor with 3 compression levels. Perfect for email, upload, and storage.",
    keywords: "compress PDF, reduce PDF size, PDF compressor, shrink PDF, optimize PDF",
    schema: { "@context": "https://schema.org", "@type": "CollectionPage", "name": "Compress PDF Tools", "url": `${BASE_URL}/compress-pdf-tools`, "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL } }
  },
  "/edit-pdf-tools": {
    title: "Edit PDF Online Free — 15+ Tools, No Install | PDF HUB 24",
    description: "Edit, merge, split, rotate, sign, annotate, and redact PDF documents free online. 15+ PDF editing tools with no software install and no watermarks.",
    keywords: "edit PDF, PDF editor, merge PDF, split PDF, sign PDF, annotate PDF",
    schema: { "@context": "https://schema.org", "@type": "CollectionPage", "name": "Edit PDF Tools", "url": `${BASE_URL}/edit-pdf-tools`, "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL } }
  },
  "/secure-pdf": {
    title: "Secure PDF Free — Encrypt, Redact & Protect | PDF HUB 24",
    description: "Password protect, encrypt, redact, and secure PDF documents free online. AES-256 encryption, permanent redaction, and file privacy tools.",
    keywords: "secure PDF, protect PDF, encrypt PDF, redact PDF, password protect PDF",
    schema: { "@context": "https://schema.org", "@type": "CollectionPage", "name": "Secure PDF Tools", "url": `${BASE_URL}/secure-pdf`, "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL } }
  },
  "/image-tools": {
    title: "Free Image Tools — Compress, Resize & Convert | PDF HUB 24",
    description: "Free online image tools — compress, resize, crop, rotate, and convert formats. Supports JPG, PNG, WebP, GIF, and TIFF. No signup, no watermark, instant results.",
    keywords: "image tools, compress image, resize image, crop image, convert image, image compressor",
    schema: { "@context": "https://schema.org", "@type": "CollectionPage", "name": "Image Tools", "url": `${BASE_URL}/image-tools`, "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL } }
  },
  "/write-for-us": {
    title: "Write for Us — Contribute to PDF HUB 24 Blog | PDF HUB 24",
    description: "Contribute guest posts to PDF HUB 24. Write about PDF tools, document management, and productivity. Get exposure to 300,000+ monthly readers.",
    keywords: "write for us, guest post, contribute, PDF blog, document management blog",
    schema: { "@context": "https://schema.org", "@type": "WebPage", "name": "Write for Us", "url": `${BASE_URL}/write-for-us`, "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL } }
  },
  "/data-security": {
    title: "Data Security & Privacy — How We Protect Files | PDF HUB 24",
    description: "Learn how PDF HUB 24 protects your files. TLS encryption in transit, automatic deletion within 1 hour, zero-access policy, and full GDPR compliance for all users.",
    keywords: "data security, file privacy, PDF security, GDPR, file encryption, auto delete",
    schema: { "@context": "https://schema.org", "@type": "WebPage", "name": "Data Security", "url": `${BASE_URL}/data-security`, "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL } }
  },
  "/auto-delete": {
    title: "Auto-Delete — How We Remove Your Files | PDF HUB 24",
    description: "PDF HUB 24 automatically deletes all uploaded files within 1 hour. Learn how our automatic file deletion works to protect your privacy.",
    keywords: "auto delete files, file deletion, privacy, secure deletion, temporary files",
    schema: { "@context": "https://schema.org", "@type": "WebPage", "name": "Automatic File Deletion", "url": `${BASE_URL}/auto-delete`, "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL } }
  },
  "/pricing": {
    title: "Pricing — 49+ Free PDF Tools (No Hidden Costs) | PDF HUB 24",
    description: "All 49+ PDF tools are 100% free — no signup, no watermarks, no daily limits, no file size cap. See what's included and what's coming in the Pro plan at PDF HUB 24.",
    keywords: "free pdf tools, pdf tool pricing, free pdf converter, free pdf editor, pdf hub pricing",
    schema: { "@context": "https://schema.org", "@type": "WebPage", "name": "Pricing", "url": `${BASE_URL}/pricing`, "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL } }
  },
  "/embed": {
    title: "Embed Free PDF Tools on Your Website | PDF HUB 24",
    description: "Embed free PDF tools on your website using our widget generator. Get ready-to-paste iframe code for merge, compress, convert, sign, and all 49+ PDF tools.",
    keywords: "embed pdf tools, pdf widget, iframe pdf converter, embed pdf merger, website pdf tools",
    robots: "noindex, nofollow",
    schema: { "@context": "https://schema.org", "@type": "WebPage", "name": "Embed Widget Generator", "url": `${BASE_URL}/embed`, "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL } }
  },
  "/pdf-comparison-chart": {
    title: "PDF Tools Comparison Chart 2026 | PDF HUB 24",
    description: "Compare 6 free PDF tool platforms side by side. Features, pricing, file limits, and capabilities of PDF HUB 24, Adobe, Smallpdf, ILovePDF, PDF24, and Sejda.",
    keywords: "pdf tools comparison, free pdf tools, best pdf tool, pdf converter comparison, adobe vs smallpdf",
    schema: { "@context": "https://schema.org", "@type": "Article", "headline": "Free PDF Tools Comparison Chart 2026", "url": `${BASE_URL}/pdf-comparison-chart`, "author": { "@type": "Organization", "name": "PDF HUB 24" }, "publisher": { "@type": "Organization", "name": "PDF HUB 24", "url": BASE_URL } }
  },
  "/pdf-glossary": {
    title: "PDF Glossary — 60+ PDF Terms Explained A-Z | PDF HUB 24",
    description: "Complete A-Z PDF glossary with 60+ terms. Definitions for PDF/A, OCR, compression, encryption, annotations, metadata, digital signatures & more.",
    keywords: "pdf glossary, pdf terms, pdf definitions, what is pdf/a, pdf compression terms, pdf encryption glossary, pdf metadata, pdf annotations, ocr pdf definition",
    canonical: `${BASE_URL}/pdf-glossary`,
    ogTitle: "PDF Glossary — Complete A-Z Reference | PDF HUB 24",
    ogDescription: "60+ PDF terms explained clearly. Covers PDF standards, compression, security, OCR, structured data, and more. Free reference for students and professionals.",
    twitterCard: "summary_large_image",
    robots: "index, follow",
    schema: {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "PDF Glossary — Complete A-Z Reference of PDF Terms",
      "description": "Comprehensive glossary of PDF terms covering format specifications, compression, security, accessibility, and PDF processing concepts.",
      "url": `${BASE_URL}/pdf-glossary`,
      "author": { "@type": "Organization", "name": "PDF HUB 24", "url": BASE_URL },
      "publisher": { "@type": "Organization", "name": "PDF HUB 24", "url": BASE_URL },
      "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL }
    }
  },
  "/pdf-file-formats-guide": {
    title: "File Formats Guide 2026 — PDF & Documents | PDF HUB 24",
    description: "Complete guide to PDF, DOCX, XLSX, PPTX, JPG, PNG, WebP, TIFF, GIF file formats. Specs, use cases, compression types, and conversion options.",
    keywords: "file formats guide, pdf format, docx format, image formats, document formats, file format comparison",
    schema: { "@context": "https://schema.org", "@type": "Article", "headline": "Ultimate Guide to PDF & Document File Formats 2026", "url": `${BASE_URL}/pdf-file-formats-guide`, "author": { "@type": "Organization", "name": "PDF HUB 24" }, "publisher": { "@type": "Organization", "name": "PDF HUB 24", "url": BASE_URL } }
  },
  "/html-sitemap": {
    title: "HTML Sitemap — All PDF Tools & Pages | PDF HUB 24",
    description: "Complete HTML sitemap for PDF HUB 24. Find all 49 PDF tools, 25 blog articles, category hubs, and information pages in one organized directory.",
    keywords: "sitemap, pdf tools list, all pdf tools, site map, pdf hub 24 pages",
    robots: "noindex, nofollow",
    canonical: `${BASE_URL}/html-sitemap`,
    ogTitle: "HTML Sitemap — All PDF Tools & Pages | PDF HUB 24",
    ogDescription: "Navigate all 49 PDF tools, 25 blog articles, and information pages on PDF HUB 24.",
    ogUrl: `${BASE_URL}/html-sitemap`,
    twitterTitle: "HTML Sitemap — All PDF Tools & Pages",
    twitterDescription: "Find every tool and page on PDF HUB 24 in one organized directory.",
    schema: { "@context": "https://schema.org", "@type": "WebPage", "name": "HTML Sitemap", "url": `${BASE_URL}/html-sitemap`, "description": "Complete directory of all pages on PDF HUB 24.", "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL } }
  },
  "/best-free-tools": {
    title: "Best Free PDF Tools 2026 — No Signup | PDF HUB 24",
    description: "Best free PDF tools of 2026: merge, compress, convert, sign, and edit PDFs online — no signup, no watermarks. Compare vs iLovePDF, Smallpdf, PDF24.",
    keywords: "best free pdf tools, free pdf tools 2026, pdf tools no signup, free pdf merger, best online pdf tools, free pdf converter",
    canonical: `${BASE_URL}/best-free-tools`,
    ogTitle: "Best Free PDF Tools 2026 — No Signup, No Watermarks",
    ogDescription: "Handpicked free PDF tools you can use right now. No account, no watermarks, no hidden fees. 49 tools compared.",
    ogUrl: `${BASE_URL}/best-free-tools`,
    twitterTitle: "Best Free PDF Tools 2026",
    twitterDescription: "49 free PDF tools — no signup, no watermarks. Merge, compress, convert, sign and more.",
    schema: { "@context": "https://schema.org", "@type": "Article", "headline": "Best Free PDF Tools 2026 — No Signup, No Watermarks", "url": `${BASE_URL}/best-free-tools`, "author": { "@type": "Organization", "name": "PDF HUB 24" }, "publisher": { "@type": "Organization", "name": "PDF HUB 24", "url": BASE_URL }, "datePublished": "2026-01-01" }
  },
  "/seo-audit": {
    title: "SEO Audit Dashboard | PDF HUB 24",
    description: "Internal SEO audit dashboard for PDF HUB 24. Validates sitemap URLs, checks structured data quality, and surfaces technical SEO issues across 4,000+ pages.",
    keywords: "seo audit, sitemap validation, content quality",
    robots: "noindex, nofollow",
    schema: { "@context": "https://schema.org", "@type": "WebPage", "name": "SEO Audit Dashboard", "url": `${BASE_URL}/seo-audit` }
  },
  "/tools/compress-pdf-under-100kb": {
    title: "Compress PDF Under 100KB Free Online | PDF HUB 24",
    description: "Reduce PDF file size to under 100KB free online. Perfect for form submissions, online applications, and strict upload limits. No signup required.",
    keywords: "compress pdf under 100kb, reduce pdf size 100kb, small pdf, pdf under 100kb",
    schema: { "@context": "https://schema.org", "@type": "WebPage", "name": "Compress PDF Under 100KB", "url": `${BASE_URL}/tools/compress-pdf-under-100kb`, "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL } }
  },
  "/tools/reduce-pdf-size-to-200kb": {
    title: "Reduce PDF Size to 200KB Free Online | PDF HUB 24",
    description: "Reduce any PDF to 200KB with our free online compressor. Perfect for government portal upload limits. Maintains readable quality throughout. No signup required.",
    keywords: "reduce pdf 200kb, compress pdf 200kb, pdf size 200kb, small pdf file",
    schema: { "@context": "https://schema.org", "@type": "WebPage", "name": "Reduce PDF to 200KB", "url": `${BASE_URL}/tools/reduce-pdf-size-to-200kb`, "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL } }
  },
  "/tools/compress-pdf-to-1mb": {
    title: "Compress PDF to 1MB Free Online | PDF HUB 24",
    description: "Compress large PDF files to 1MB or under. Free online PDF compressor with adjustable quality options. Perfect for email attachments and website uploads.",
    keywords: "compress pdf 1mb, reduce pdf to 1mb, pdf under 1mb, shrink pdf 1mb",
    schema: { "@context": "https://schema.org", "@type": "WebPage", "name": "Compress PDF to 1MB", "url": `${BASE_URL}/tools/compress-pdf-to-1mb`, "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL } }
  },
  "/tools/merge-pdf-for-visa-application": {
    title: "Merge PDF for Visa Application Free Online | PDF HUB 24",
    description: "Combine passport copies, bank statements, photos, and support documents into a single PDF for visa applications. Free online merger, no signup, instant download.",
    keywords: "merge pdf visa, combine documents visa, visa application pdf, merge pdf passport",
    schema: { "@context": "https://schema.org", "@type": "WebPage", "name": "Merge PDF for Visa Application", "url": `${BASE_URL}/tools/merge-pdf-for-visa-application`, "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL } }
  },
  "/tools/convert-scanned-pdf-to-word-editable": {
    title: "Convert Scanned PDF to Editable Word Free | PDF HUB 24",
    description: "Convert scanned PDF documents to editable Word (DOCX) files using OCR technology. Free online tool accurately extracts text from image-based scans.",
    keywords: "scanned pdf to word, ocr pdf to word, convert scan to editable, scanned document to word",
    schema: { "@context": "https://schema.org", "@type": "WebPage", "name": "Convert Scanned PDF to Word", "url": `${BASE_URL}/tools/convert-scanned-pdf-to-word-editable`, "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL } }
  },
  "/tools/make-pdf-smaller-for-email": {
    title: "Make PDF Smaller for Email Free Online | PDF HUB 24",
    description: "Make any PDF small enough for email. Shrink under 25MB for Gmail or 20MB for Outlook in seconds. Free online PDF compressor with adjustable quality. No signup.",
    keywords: "make pdf smaller email, compress pdf email, pdf too large email, reduce pdf for gmail",
    schema: { "@context": "https://schema.org", "@type": "WebPage", "name": "Make PDF Smaller for Email", "url": `${BASE_URL}/tools/make-pdf-smaller-for-email`, "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL } }
  },
  "/tools/pdf-to-jpg-high-quality": {
    title: "PDF to JPG High Quality Free Online | PDF HUB 24",
    description: "Convert PDF pages to high-resolution JPG images. Free online converter with 300 DPI output. Perfect for presentations and social media.",
    keywords: "pdf to jpg high quality, pdf to image hd, convert pdf jpg high resolution, pdf to jpg 300dpi",
    schema: { "@context": "https://schema.org", "@type": "WebPage", "name": "PDF to JPG High Quality", "url": `${BASE_URL}/tools/pdf-to-jpg-high-quality`, "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL } }
  },
  "/tools/merge-pdf-free-no-limit": {
    title: "Merge PDF Free No Limit — Combine Unlimited Files | PDF HUB 24",
    description: "Combine unlimited PDF files into one document free online. No file count limits, no page limits, no daily caps. Merge as many PDFs as you need.",
    keywords: "merge pdf free no limit, combine pdf unlimited, merge pdf no restriction, unlimited pdf merger",
    schema: { "@context": "https://schema.org", "@type": "WebPage", "name": "Merge PDF Free No Limit", "url": `${BASE_URL}/tools/merge-pdf-free-no-limit`, "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL } }
  },
  "/tools/split-pdf-by-pages": {
    title: "Split PDF by Pages Free Online | PDF HUB 24",
    description: "Split PDF files by page number or range free online. Extract specific pages, split into chapters, or divide large documents. No signup required.",
    keywords: "split pdf by pages, extract pdf pages, split pdf page range, separate pdf pages",
    schema: { "@context": "https://schema.org", "@type": "WebPage", "name": "Split PDF by Pages", "url": `${BASE_URL}/tools/split-pdf-by-pages`, "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL } }
  },
  "/tools/add-signature-to-pdf-free": {
    title: "Add Signature to PDF Free Online | PDF HUB 24",
    description: "Sign PDF documents free online. Draw, type, or upload your signature. No printing, no scanning needed. Legally recognized e-signatures.",
    keywords: "add signature pdf, sign pdf free, electronic signature pdf, e-sign pdf online",
    schema: { "@context": "https://schema.org", "@type": "WebPage", "name": "Add Signature to PDF", "url": `${BASE_URL}/tools/add-signature-to-pdf-free`, "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL } }
  },
  "/tools/compress-pdf-without-losing-quality": {
    title: "Compress PDF Without Losing Quality Free | PDF HUB 24",
    description: "Reduce PDF file size without visible quality loss. Free lossless compression preserves text, images & formatting. Choose from 3 adjustable quality levels.",
    keywords: "compress pdf without losing quality, lossless pdf compression, reduce pdf keep quality",
    schema: { "@context": "https://schema.org", "@type": "WebPage", "name": "Compress PDF Without Losing Quality", "url": `${BASE_URL}/tools/compress-pdf-without-losing-quality`, "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL } }
  },
  "/tools/pdf-to-word-editable-free": {
    title: "PDF to Word Editable Free Online | PDF HUB 24",
    description: "Convert any PDF to fully editable Word (DOCX) format free online. Preserves tables, images, headers, and formatting perfectly. No email or signup required.",
    keywords: "pdf to word editable, convert pdf to editable word, pdf to docx free, editable word from pdf",
    schema: { "@context": "https://schema.org", "@type": "WebPage", "name": "PDF to Editable Word", "url": `${BASE_URL}/tools/pdf-to-word-editable-free`, "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL } }
  },
  "/tools/unlock-pdf-for-editing": {
    title: "Unlock PDF for Editing Free Online | PDF HUB 24",
    description: "Remove editing restrictions from password-protected PDFs for free. Unlock PDFs for copying, printing, and editing. Owner password required. No signup needed.",
    keywords: "unlock pdf editing, remove pdf restrictions, unlock pdf free, pdf remove password editing",
    schema: { "@context": "https://schema.org", "@type": "WebPage", "name": "Unlock PDF for Editing", "url": `${BASE_URL}/tools/unlock-pdf-for-editing`, "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL } }
  },
  "/tools/rotate-pdf-and-save": {
    title: "Rotate PDF and Save Permanently Free | PDF HUB 24",
    description: "Rotate PDF pages 90, 180, or 270 degrees and save permanently. Fix sideways or upside-down scanned pages instantly. Free online tool, no signup.",
    keywords: "rotate pdf save, fix sideways pdf, rotate pdf permanently, turn pdf pages",
    schema: { "@context": "https://schema.org", "@type": "WebPage", "name": "Rotate PDF and Save", "url": `${BASE_URL}/tools/rotate-pdf-and-save`, "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL } }
  },
  "/tools/convert-pdf-to-jpg-all-pages": {
    title: "Convert PDF to JPG All Pages Free Online | PDF HUB 24",
    description: "Convert every page of your PDF to individual JPG images free online. Download all pages as a ZIP file. High quality 300 DPI output, no signup needed.",
    keywords: "pdf to jpg all pages, convert all pdf pages jpg, pdf pages to images, extract all pages jpg",
    schema: { "@context": "https://schema.org", "@type": "WebPage", "name": "Convert PDF to JPG All Pages", "url": `${BASE_URL}/tools/convert-pdf-to-jpg-all-pages`, "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL } }
  },
  "/tools/protect-pdf-with-password-free": {
    title: "Password Protect PDF Free Online (AES-256) | PDF HUB 24",
    description: "Add AES-256 password protection to PDF files free online. Set open and edit passwords, control printing and copying permissions. Enterprise-grade encryption.",
    keywords: "password protect pdf, encrypt pdf free, aes 256 pdf, pdf password protection online",
    schema: { "@context": "https://schema.org", "@type": "WebPage", "name": "Password Protect PDF", "url": `${BASE_URL}/tools/protect-pdf-with-password-free`, "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL } }
  },
  "/tools/remove-pages-from-pdf": {
    title: "Remove Pages from PDF Free Online | PDF HUB 24",
    description: "Delete specific pages from PDF documents free online. Select and remove unwanted pages instantly with visual preview. Keep your documents clean and organized.",
    keywords: "remove pages pdf, delete pdf pages, remove page from pdf free, delete pages pdf online",
    schema: { "@context": "https://schema.org", "@type": "WebPage", "name": "Remove Pages from PDF", "url": `${BASE_URL}/tools/remove-pages-from-pdf`, "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL } }
  },
  "/tools/flatten-pdf-for-printing": {
    title: "Flatten PDF for Printing Free Online | PDF HUB 24",
    description: "Flatten PDF forms and layers for reliable printing. Convert fillable fields to static text. Ensures consistent print output across all printers and devices.",
    keywords: "flatten pdf printing, flatten pdf forms, pdf print correctly, flatten fillable pdf",
    schema: { "@context": "https://schema.org", "@type": "WebPage", "name": "Flatten PDF for Printing", "url": `${BASE_URL}/tools/flatten-pdf-for-printing`, "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL } }
  },
  "/tools/add-watermark-to-pdf-free": {
    title: "Add Watermark to PDF Free Online | PDF HUB 24",
    description: "Add text or image watermarks to PDF files online for free. Customize position, opacity, and rotation. Protect your documents with professional watermarks.",
    keywords: "add watermark pdf free, watermark pdf online, text watermark pdf, image watermark pdf, stamp pdf",
    schema: { "@context": "https://schema.org", "@type": "WebPage", "name": "Add Watermark to PDF Free", "url": `${BASE_URL}/tools/add-watermark-to-pdf-free`, "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL } }
  },
  "/tools/convert-excel-to-pdf-free": {
    title: "Convert Excel to PDF Free Online | PDF HUB 24",
    description: "Convert Excel XLS and XLSX spreadsheets to PDF online for free. Preserves cell formatting, formulas display, column widths, and styles. No signup, no watermark.",
    keywords: "excel to pdf free, convert xlsx to pdf, spreadsheet to pdf, xls to pdf online, excel pdf converter",
    schema: { "@context": "https://schema.org", "@type": "WebPage", "name": "Convert Excel to PDF Free", "url": `${BASE_URL}/tools/convert-excel-to-pdf-free`, "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL } }
  },
  "/tools/convert-word-to-pdf-free-online": {
    title: "Convert Word to PDF Free Online | PDF HUB 24",
    description: "Convert Word DOC and DOCX files to PDF free online. Preserves fonts, images, and formatting perfectly. No signup, no watermark required.",
    keywords: "convert word to pdf free, word to pdf online, docx to pdf free, doc to pdf converter, word pdf free online",
    schema: { "@context": "https://schema.org", "@type": "WebPage", "name": "Convert Word to PDF Free Online", "url": `${BASE_URL}/tools/convert-word-to-pdf-free-online`, "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL } }
  },
  "/tools/convert-docx-to-pdf-keep-formatting": {
    title: "Convert DOCX to PDF Keep Formatting Free | PDF HUB 24",
    description: "Convert DOCX to PDF while preserving all formatting, fonts, and layout. Free online tool ensures your Word document looks identical as a PDF.",
    keywords: "docx to pdf keep formatting, word to pdf preserve layout, convert docx pdf formatting, word pdf same format",
    schema: { "@context": "https://schema.org", "@type": "WebPage", "name": "Convert DOCX to PDF Keep Formatting", "url": `${BASE_URL}/tools/convert-docx-to-pdf-keep-formatting`, "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL } }
  },
  "/tools/edit-pdf-text-online-free": {
    title: "Edit PDF Text Online Free | PDF HUB 24",
    description: "Edit text in PDF documents online for free. Add, modify, or delete text directly in your PDF files. No software download or signup required.",
    keywords: "edit pdf text online free, modify pdf text, change text in pdf, pdf text editor free, edit pdf content",
    schema: { "@context": "https://schema.org", "@type": "WebPage", "name": "Edit PDF Text Online Free", "url": `${BASE_URL}/tools/edit-pdf-text-online-free`, "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL } }
  },
  "/tools/edit-pdf-without-adobe-acrobat": {
    title: "Edit PDF Without Adobe Acrobat Free Online | PDF HUB 24",
    description: "Edit PDFs without Adobe Acrobat. Free online PDF editor with text editing, image insertion, shapes, and annotations. No signup, no software installation required.",
    keywords: "edit pdf without adobe, pdf editor no acrobat, free alternative adobe acrobat, edit pdf free no adobe",
    schema: { "@context": "https://schema.org", "@type": "WebPage", "name": "Edit PDF Without Adobe Acrobat", "url": `${BASE_URL}/tools/edit-pdf-without-adobe-acrobat`, "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL } }
  },
  "/tools/convert-pdf-to-excel-with-tables": {
    title: "Convert PDF to Excel With Tables Free Online | PDF HUB 24",
    description: "Convert PDF tables to Excel spreadsheets accurately. Free online tool preserves table structure, rows, and columns. Extract data from PDF to XLSX.",
    keywords: "pdf to excel with tables, extract tables pdf excel, pdf table to spreadsheet, convert pdf tables xlsx",
    schema: { "@context": "https://schema.org", "@type": "WebPage", "name": "Convert PDF to Excel With Tables", "url": `${BASE_URL}/tools/convert-pdf-to-excel-with-tables`, "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL } }
  },
  "/tools/extract-tables-from-pdf-to-spreadsheet": {
    title: "Extract Tables From PDF to Spreadsheet Free | PDF HUB 24",
    description: "Extract tables from PDF documents into editable spreadsheets. Free online tool detects and converts PDF tables to Excel or CSV format accurately.",
    keywords: "extract tables pdf, pdf table to spreadsheet, pdf table extractor, copy table from pdf to excel",
    schema: { "@context": "https://schema.org", "@type": "WebPage", "name": "Extract Tables From PDF to Spreadsheet", "url": `${BASE_URL}/tools/extract-tables-from-pdf-to-spreadsheet`, "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL } }
  },
  "/tools/convert-jpg-to-pdf-free-online": {
    title: "Convert JPG to PDF Free Online | PDF HUB 24",
    description: "Convert JPG and JPEG images to PDF free online. Combine multiple photos into one PDF document. Adjust page size and orientation. No signup needed.",
    keywords: "convert jpg to pdf free, jpeg to pdf online, jpg to pdf converter, image to pdf free online",
    schema: { "@context": "https://schema.org", "@type": "WebPage", "name": "Convert JPG to PDF Free Online", "url": `${BASE_URL}/tools/convert-jpg-to-pdf-free-online`, "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL } }
  },
  "/tools/convert-multiple-images-to-one-pdf": {
    title: "Convert Multiple Images to One PDF Free Online | PDF HUB 24",
    description: "Combine multiple images into a single PDF document. Supports JPG, PNG, WebP, and more. Drag and drop to reorder pages. Free online, no signup.",
    keywords: "multiple images to pdf, combine images pdf, merge photos to pdf, images to one pdf free",
    schema: { "@context": "https://schema.org", "@type": "WebPage", "name": "Convert Multiple Images to One PDF", "url": `${BASE_URL}/tools/convert-multiple-images-to-one-pdf`, "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL } }
  },
  "/tools/add-page-numbers-to-pdf-free": {
    title: "Add Page Numbers to PDF Free Online | PDF HUB 24",
    description: "Add page numbers to any PDF document free online. Customize position, font, size, and starting number. Perfect for reports and manuscripts.",
    keywords: "add page numbers pdf free, number pdf pages, pdf page numbering, insert page numbers pdf online",
    schema: { "@context": "https://schema.org", "@type": "WebPage", "name": "Add Page Numbers to PDF Free", "url": `${BASE_URL}/tools/add-page-numbers-to-pdf-free`, "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL } }
  },
  "/tools/redact-pdf-black-out-text": {
    title: "Redact PDF Black Out Text Free Online | PDF HUB 24",
    description: "Black out sensitive text in PDF documents permanently. Free PDF redaction tool removes confidential information securely. GDPR and HIPAA compliant.",
    keywords: "redact pdf black out text, censor pdf text, black out pdf, remove sensitive info pdf, pdf redaction tool",
    schema: { "@context": "https://schema.org", "@type": "WebPage", "name": "Redact PDF Black Out Text", "url": `${BASE_URL}/tools/redact-pdf-black-out-text`, "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL } }
  },
  "/tools/crop-pdf-margins-free-online": {
    title: "Crop PDF Margins Free Online | PDF HUB 24",
    description: "Crop and remove PDF margins free online. Trim white space, adjust page boundaries, and resize PDF content area. Perfect for printing and presentations.",
    keywords: "crop pdf margins free, trim pdf margins, remove pdf white space, pdf margin cutter online",
    schema: { "@context": "https://schema.org", "@type": "WebPage", "name": "Crop PDF Margins Free Online", "url": `${BASE_URL}/tools/crop-pdf-margins-free-online`, "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL } }
  },
  "/tools/resize-pdf-to-a4-free": {
    title: "Resize PDF to A4 Free Online | PDF HUB 24",
    description: "Resize PDF pages to A4 paper size (210×297 mm) free online. Convert Letter, Legal, or any custom size to standard A4 format for printing and sharing. No signup.",
    keywords: "resize pdf a4 free, change pdf to a4, pdf a4 size converter, convert pdf page size a4",
    schema: { "@context": "https://schema.org", "@type": "WebPage", "name": "Resize PDF to A4 Free", "url": `${BASE_URL}/tools/resize-pdf-to-a4-free`, "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL } }
  },
  "/tools/convert-html-webpage-to-pdf": {
    title: "Convert HTML Webpage to PDF Free Online | PDF HUB 24",
    description: "Convert any HTML webpage to PDF free online. Render web pages with CSS styling, images, and layout preserved. Save websites as PDF documents.",
    keywords: "convert html to pdf, webpage to pdf, save website as pdf, html page to pdf online free",
    schema: { "@context": "https://schema.org", "@type": "WebPage", "name": "Convert HTML Webpage to PDF", "url": `${BASE_URL}/tools/convert-html-webpage-to-pdf`, "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL } }
  },
  "/tools/compress-jpg-png-image-online": {
    title: "Compress JPG PNG Image Online Free | PDF HUB 24",
    description: "Compress JPG and PNG images online for free. Reduce image file size by up to 80% without visible quality loss. Perfect for web and email.",
    keywords: "compress jpg png online, image compressor free, reduce image size, compress photo online free",
    schema: { "@context": "https://schema.org", "@type": "WebPage", "name": "Compress JPG PNG Image Online", "url": `${BASE_URL}/tools/compress-jpg-png-image-online`, "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL } }
  },
  "/tools/rearrange-pdf-pages-free": {
    title: "Rearrange PDF Pages Free Online | PDF HUB 24",
    description: "Rearrange and reorder PDF pages free online. Drag and drop to change page sequence. Move, swap, or reverse page order instantly. No signup needed.",
    keywords: "rearrange pdf pages free, reorder pdf pages, change pdf page order, move pdf pages, sort pdf pages",
    schema: { "@context": "https://schema.org", "@type": "WebPage", "name": "Rearrange PDF Pages Free", "url": `${BASE_URL}/tools/rearrange-pdf-pages-free`, "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL } }
  },
  "/tools/convert-pdf-to-png-high-resolution": {
    title: "Convert PDF to PNG High Resolution Free | PDF HUB 24",
    description: "Convert PDF pages to high-resolution PNG images free online. 300 DPI output with transparency support. Perfect for graphics and design work.",
    keywords: "pdf to png high resolution, convert pdf png hd, pdf to png 300dpi, high quality pdf to png",
    schema: { "@context": "https://schema.org", "@type": "WebPage", "name": "Convert PDF to PNG High Resolution", "url": `${BASE_URL}/tools/convert-pdf-to-png-high-resolution`, "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL } }
  },
  "/tools/annotate-pdf-highlight-text-free": {
    title: "Annotate PDF Highlight Text Free Online | PDF HUB 24",
    description: "Highlight, underline, and annotate text in PDF documents free online. Add notes, comments, and markup to any PDF. Perfect for study and review.",
    keywords: "annotate pdf highlight text, highlight pdf free, pdf annotation tool, mark up pdf online free",
    schema: { "@context": "https://schema.org", "@type": "WebPage", "name": "Annotate PDF Highlight Text Free", "url": `${BASE_URL}/tools/annotate-pdf-highlight-text-free`, "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL } }
  },
  "/tools/convert-pdf-to-powerpoint-free": {
    title: "Convert PDF to PowerPoint Free Online | PDF HUB 24",
    description: "Convert PDF files to editable PowerPoint (PPTX) presentations free online. Preserves slides, text, images, and layout. No signup or watermark.",
    keywords: "convert pdf to powerpoint free, pdf to pptx online, pdf to ppt converter free, pdf to slides free",
    schema: { "@context": "https://schema.org", "@type": "WebPage", "name": "Convert PDF to PowerPoint Free", "url": `${BASE_URL}/tools/convert-pdf-to-powerpoint-free`, "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL } }
  },
  "/tools/convert-pdf-to-word-without-losing-formatting": {
    title: "Convert PDF to Word Without Losing Formatting Free | PDF HUB 24",
    description: "Convert PDF to Word DOCX without losing formatting. Free online converter preserves fonts, tables, images, and layout exactly as in the original PDF.",
    keywords: "pdf to word without losing formatting, convert pdf word keep format, pdf to docx preserve layout",
    schema: { "@context": "https://schema.org", "@type": "WebPage", "name": "Convert PDF to Word Without Losing Formatting", "url": `${BASE_URL}/tools/convert-pdf-to-word-without-losing-formatting`, "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL } }
  },
  "/tools/unlock-pdf-remove-password-online": {
    title: "Unlock PDF Remove Password Online Free | PDF HUB 24",
    description: "Remove password protection from PDF files online for free. Unlock PDFs for editing, printing, and copying. Requires your password. 100% secure.",
    keywords: "unlock pdf remove password, remove pdf password online, pdf password remover free, unlock protected pdf",
    schema: { "@context": "https://schema.org", "@type": "WebPage", "name": "Unlock PDF Remove Password Online", "url": `${BASE_URL}/tools/unlock-pdf-remove-password-online`, "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL } }
  }
};

const SUPPORTED_HREFLANG_LANGS = ["en", "es", "ar", "hi", "fr", "pt", "de", "zh", "ja", "id", "ru", "it", "ur"];

function stripLangPrefix(path: string): { lang: string; canonicalPath: string; localPath: string } {
  const match = path.match(/^\/(es|ar|hi|fr|pt|de|zh|ja|id|ru|it|ur)(\/.*)?$/);
  if (match) {
    const lang = match[1];
    const rawPath = match[2] || "/";
    // Resolve translated slug to English path for config lookup
    const slug = rawPath.replace(/^\//, "");
    const englishSlug = TRANSLATED_TO_ENGLISH[slug];
    const canonicalPath = englishSlug ? `/${englishSlug}` : rawPath;
    return { lang, canonicalPath, localPath: rawPath };
  }
  return { lang: "en", canonicalPath: path, localPath: path };
}

/** Get the translated slug path for a given language and English tool path */
function getTranslatedPathForLang(lang: string, englishPath: string): string {
  const englishSlug = englishPath.replace(/^\//, "");
  const translated = TOOL_SLUG_TRANSLATIONS[englishSlug]?.[lang];
  return translated ? `/${translated}` : englishPath;
}

function generateHreflangTags(canonicalPath: string): string {
  const canonicalUrl = `${BASE_URL}${canonicalPath === "/" ? "" : canonicalPath}`;
  const tags = SUPPORTED_HREFLANG_LANGS.map(lang => {
    if (lang === "en") return `<link rel="alternate" hreflang="en" href="${canonicalUrl}" />`;
    const langPath = getTranslatedPathForLang(lang, canonicalPath);
    const url = `${BASE_URL}/${lang}${langPath === "/" ? "" : langPath}`;
    return `<link rel="alternate" hreflang="${lang}" href="${url}" />`;
  });
  tags.push(`<link rel="alternate" hreflang="x-default" href="${canonicalUrl}" />`);
  return tags.join("\n    ");
}

function getLangAttribute(lang: string): string {
  const langMap: Record<string, string> = { en: "en", es: "es", ar: "ar", hi: "hi", fr: "fr", pt: "pt", de: "de", zh: "zh", ja: "ja", id: "id", ru: "ru", it: "it", ur: "ur" };
  return langMap[lang] || "en";
}

export function generateMetaTags(path: string): string {
  const { lang, canonicalPath, localPath } = stripLangPrefix(path);
  const seo = seoConfig[canonicalPath] || seoConfig["/"];
  // canonical uses the translated slug so Google indexes the correct language URL.
  // For non-English pages: prefer translated slug (e.g. /es/comprimir-pdf) over
  // the English slug path (e.g. /es/compress) so canonical always matches hreflang.
  const canonicalUrl = lang === "en"
    ? `${BASE_URL}${canonicalPath === "/" ? "" : canonicalPath}`
    : (() => {
        const translatedPath = getTranslatedPathForLang(lang, canonicalPath);
        // If a translated slug exists (different from English), use it; else fall back to localPath
        const slugPath = translatedPath !== canonicalPath ? translatedPath : (localPath === "/" ? "" : localPath);
        return `${BASE_URL}/${lang}${slugPath === "/" ? "" : slugPath}`;
      })();
  const hreflangTags = generateHreflangTags(canonicalPath);
  const langAttr = getLangAttribute(lang);

  // ── Detect blog page type early (needed for noindex logic) ──────────────
  const blogSlugMatch = canonicalPath.match(/^\/blog\/([^/]+)$/);
  const blogPost = blogSlugMatch ? blogPosts.find(p => p.slug === blogSlugMatch[1]) : null;
  const isUnknownBlogSlug = !!(blogSlugMatch && !blogPost);
  const isNoindex = !!(seo.robots && seo.robots.includes("noindex")) || isUnknownBlogSlug;
  const hreflangBlock = isNoindex ? "" : `\n    <!-- Hreflang International SEO -->\n    ${hreflangTags}`;

  // ── Detect page type ──────────────────────────────────────────────────────
  const progSlugMatch = canonicalPath.match(/^\/tools\/([^/]+)$/);
  // Also detect programmatic pages at root level (e.g. /compress-pdf-online-us)
  const directSlug = canonicalPath.slice(1);
  const isDefinedStaticPage = !!(seoConfig as Record<string, PageSEO>)[canonicalPath];
  const directProgPage = (!progSlugMatch && !blogSlugMatch && !isDefinedStaticPage)
    ? (getProgrammaticPage(directSlug) ?? null)
    : null;
  const progPage = progSlugMatch
    ? (getProgrammaticPage(progSlugMatch[1]) ?? null)
    : directProgPage;
  const toolId = canonicalPath.replace(/^\//, "");
  const toolData = toolSEOData[toolId as keyof typeof toolSEOData] || null;

  // ── Country page detection ─────────────────────────────────────────────────
  // All country pages are indexed with self-canonical + unique enriched content.
  const countryInfo = progSlugMatch
    ? detectCountryPage(progSlugMatch[1])
    : (directProgPage ? detectCountryPage(directSlug) : null);
  const effectiveCanonicalUrl = canonicalUrl;

  // Country pages: NO hreflang (no translated equivalents exist for /tools/ or country pages)
  // Blog posts: EN-only content → only emit en + x-default (not 13-language pointing to non-existent URLs)
  // Language pages: full 13-language hreflang set
  const blogOnlyHreflangBlock = blogPost
    ? `\n    <!-- Hreflang (EN-only blog content) -->\n    <link rel="alternate" hreflang="en" href="${BASE_URL}/blog/${blogPost.slug}" />\n    <link rel="alternate" hreflang="x-default" href="${BASE_URL}/blog/${blogPost.slug}" />`
    : "";
  const effectiveHreflangBlock = (progSlugMatch || directProgPage) ? "" : (blogPost ? blogOnlyHreflangBlock : hreflangBlock);

  // ── Truly unknown page detection ─────────────────────────────────────────
  // Any English path not matched by seoConfig, toolSEOData, blog, or prog pages
  // is a garbage/unknown URL → noindex, nofollow + suppress hreflang.
  // progSlugMatch covers all /tools/ paths even when getProgrammaticPage() returns null
  const isTrulyUnknownPage = lang === "en"
    && !isDefinedStaticPage
    && !toolData
    && !blogSlugMatch
    && !progPage
    && !progSlugMatch;
  const finalHreflangBlock = isTrulyUnknownPage ? "" : effectiveHreflangBlock;

  // ── Override seo title/description from progPage for generated pages ──────
  let effectiveTitle = progPage ? progPage.title : seo.title;
  let effectiveDescription = progPage ? progPage.description : seo.description;

  // ── Translate title + description for language pages (PDF24-style) ───────
  // All 1,380 language pages get native-language meta tags matching the
  // industry standard used by PDF24, iLovePDF, and Smallpdf:
  //   Title: "{Native Tool Name} - 100% {free phrase} - PDF HUB 24"
  //   Desc:  "{action} {name}. ✓ No limits/watermarks. ✓ No install/signup."
  if (lang !== "en" && !progSlugMatch) {
    if (canonicalPath === "/") {
      // Language homepage (e.g. /de, /ja) — serve native-language title + description
      if (LANG_HOME_TITLE[lang]) effectiveTitle = LANG_HOME_TITLE[lang];
      if (LANG_HOME_DESC[lang]) effectiveDescription = LANG_HOME_DESC[lang];
    } else if (blogSlugMatch) {
      // Language blog page — use pre-translated metaTitle + metaDescription
      const blogSlug = blogSlugMatch[1];
      const blogMeta = getBlogMeta(lang, blogSlug);
      if (blogMeta) {
        effectiveTitle = blogMeta[0];
        effectiveDescription = blogMeta[1];
      }
    } else if (LANG_CATEGORY[canonicalPath]?.[lang]) {
      // Language category hub page — use translated title + description
      const [catTitle, catDesc] = LANG_CATEGORY[canonicalPath][lang];
      effectiveTitle = catTitle;
      effectiveDescription = catDesc;
    } else if (LANG_STATIC[canonicalPath]?.[lang]) {
      // Language static page (about, pricing, etc.) — use translated title + description
      const [stTitle, stDesc] = LANG_STATIC[canonicalPath][lang];
      effectiveTitle = stTitle;
      effectiveDescription = stDesc;
    } else {
      // Tool pages — use translated tool name with PDF24-style format
      const toolKey = PATH_TO_TOOL_KEY[canonicalPath];
      const translatedName = toolKey
        ? (TOOL_TITLE_TRANSLATIONS[toolKey] as Record<string, string>)?.[lang]
        : null;
      if (translatedName) {
        const free100 = LANG_100_FREE[lang] || "free online";
        const descTpl = LANG_DESC_TEMPLATE[lang];
        effectiveTitle = `${translatedName} - 100% ${free100} - PDF HUB 24`;
        if (descTpl) effectiveDescription = descTpl.replace("{name}", translatedName);
      }
    }
  }

  // ── Country-specific title/description/keywords for Tier 1 countries ────────
  const countryPageData = (() => {
    if (!countryInfo || !progSlugMatch) return null;
    const slug = progSlugMatch[1];
    const countryObj = COUNTRIES.find(c => c.label === countryInfo.countryLabel);
    const suffix = countryObj ? "-" + countryObj.slug : "";
    const toolSlug = suffix ? slug.slice(0, slug.length - suffix.length) : slug;
    const tc = TOOL_CONFIGS[toolSlug];
    const n = tc ? tc.name : toolSlug.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase());
    const co = countryInfo.countryLabel;
    const portal = countryObj?.portal || "government portals";
    const demonym = countryObj?.demonym || `${co} users`;
    return { n, co, portal, demonym, toolSlug, tc };
  })();

  // Every country page gets a unique, locally-enriched title + description
  if (countryPageData) {
    const { n, co, portal, demonym } = countryPageData;
    effectiveTitle = `${n} Free Online for ${co} Users (No Signup) | PDF HUB 24`;
    effectiveDescription = `Free ${n} tool for ${demonym}. Works instantly online — no signup, no watermark. Trusted for ${portal}. 100% secure with SSL encryption.`;
  }

  const countryKeywords = (() => {
    if (!countryPageData) return "";
    const { n, co, demonym } = countryPageData;
    return [
      `${n} ${co}`, `${n} in ${co}`, `free ${n} ${co}`,
      `${n} online ${co}`, `${n} for ${co} users`, `best ${n} ${co}`,
      `${n} ${co} free`, `online ${n} ${co}`, `${n} tool ${co}`,
      `${demonym} ${n}`,
    ].join(", ");
  })();
  const effectiveKeywords = countryKeywords || seo.keywords || "";

  const ogTitle = seo.ogTitle || effectiveTitle;
  const ogDescription = seo.ogDescription || effectiveDescription;
  const isLangBlogPage = lang !== "en" && canonicalPath.startsWith("/blog/");
  const isEffectivelyNoindex = isNoindex;
  const ogUrl = isEffectivelyNoindex ? "" : (seo.ogUrl || canonicalUrl);
  const twitterTitle = seo.twitterTitle || ogTitle;
  const twitterDescription = seo.twitterDescription || ogDescription;

  // Blog posts, tool pages, and programmatic pages each get a unique dynamically-generated OG image
  const blogSlug = canonicalPath.startsWith("/blog/") ? canonicalPath.replace("/blog/", "") : null;
  const toolOgSlug = !blogSlug && toolData ? canonicalPath.slice(1)
    : (!blogSlug && progPage && progSlugMatch) ? progSlugMatch[1]
    : null;
  const pageOgImage = blogSlug
    ? `${BASE_URL}/api/og-image/${blogSlug}`
    : (toolOgSlug ? `${BASE_URL}/api/og-image/${toolOgSlug}` : OG_IMAGE);
  const pageOgAlt = (blogSlug || toolOgSlug)
    ? (ogTitle.replace(/ \|.*$/, "").trim())
    : "PDF HUB 24 — Free Online PDF Tools";

  // ── Robots directive logic ──────────────────────────────────────────────────
  // Language blog pages: INDEXED — each has unique fully-translated content per language
  // All country pages: INDEXED — each has unique locally-enriched content
  // All other pages: standard index,follow with full preview directives
  const robotsContent = (isUnknownBlogSlug || isTrulyUnknownPage)
    ? "noindex, nofollow"
    : (seo.robots || "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1");

  // ── og:type + article-specific OG tags ───────────────────────────────────
  const ogType = blogPost ? "article" : "website";
  const articleOgTags = blogPost ? `
    <meta property="article:published_time" content="${blogPost.publishDate || ""}" />
    <meta property="article:author" content="PDF HUB 24" />
    <meta property="article:section" content="${blogPost.category || "Tutorials"}" />
    ${(blogPost.tags || []).slice(0, 5).map(t => `<meta property="article:tag" content="${t}" />`).join("\n    ")}` : "";

  // ── Build JSON-LD schema array ────────────────────────────────────────────
  const schemas: object[] = [];

  if (blogPost) {
    // Full Article schema with all recommended fields
    schemas.push({
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": blogPost.title || "",
      "description": blogPost.excerpt || "",
      "author": { "@type": "Organization", "name": "PDF HUB 24", "url": BASE_URL },
      "publisher": {
        "@type": "Organization",
        "name": "PDF HUB 24",
        "url": BASE_URL,
        "logo": { "@type": "ImageObject", "url": `${BASE_URL}/og-image.png` }
      },
      "datePublished": blogPost.publishDate || "",
      "dateModified": blogPost.publishDate || "",
      "url": `${BASE_URL}/blog/${blogPost.slug}`,
      "mainEntityOfPage": { "@type": "WebPage", "@id": `${BASE_URL}/blog/${blogPost.slug}` },
      "keywords": (blogPost.tags || []).join(", "),
      "articleSection": blogPost.category || "Tutorials",
      "image": { "@type": "ImageObject", "url": `${BASE_URL}/api/og-image/${blogPost.slug}`, "width": 1200, "height": 630 }
    });
    // BreadcrumbList for blog article
    schemas.push({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": BASE_URL },
        { "@type": "ListItem", "position": 2, "name": "Blog", "item": `${BASE_URL}/blog` },
        { "@type": "ListItem", "position": 3, "name": blogPost.title || "", "item": `${BASE_URL}/blog/${blogPost.slug}` }
      ]
    });

  } else if (toolData) {
    // SoftwareApplication schema for tool pages
    const toolName = (toolData as any).pageTitle || seo.title.split(" | ")[0];
    schemas.push({
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": toolName,
      "description": (toolData as any).metaDescription || seo.description,
      "url": `${BASE_URL}${canonicalPath}`,
      "applicationCategory": "Utilities",
      "operatingSystem": "Web Browser",
      "browserRequirements": "Requires JavaScript",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD", "availability": "https://schema.org/InStock" },
      "author": { "@type": "Organization", "name": "PDF HUB 24", "url": BASE_URL },
      "publisher": { "@type": "Organization", "name": "PDF HUB 24", "url": BASE_URL }
    });
    // FAQPage schema if FAQs exist
    if ((toolData as any).faqs?.length) {
      schemas.push({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": (toolData as any).faqs.map((f: any) => ({
          "@type": "Question",
          "name": f.question,
          "acceptedAnswer": { "@type": "Answer", "text": f.answer }
        }))
      });
    }
    // HowTo schema if tutorial steps exist
    const tutorialSteps: { step: string; detail: string }[] = (toolData as any).tutorial?.steps || [];
    if (tutorialSteps.length > 0) {
      schemas.push({
        "@context": "https://schema.org",
        "@type": "HowTo",
        "name": (toolData as any).tutorial?.title || `How to use ${toolName}`,
        "description": seo.description,
        "step": tutorialSteps.map((s: { step: string; detail: string }, i: number) => ({
          "@type": "HowToStep",
          "position": i + 1,
          "name": s.step,
          "text": s.detail
        }))
      });
    }
    // BreadcrumbList for tool pages
    schemas.push({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": BASE_URL },
        { "@type": "ListItem", "position": 2, "name": toolName, "item": `${BASE_URL}${canonicalPath}` }
      ]
    });

  } else if (progPage) {
    // SoftwareApplication + FAQPage for programmatic/long-tail pages
    const pageName = (progPage.title || "").split(" | ")[0];
    const countrySchema: Record<string, unknown> = countryInfo
      ? { "areaServed": { "@type": "Country", "name": countryInfo.countryLabel } }
      : {};
    schemas.push({
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": pageName,
      "description": progPage.description || "",
      "url": `${BASE_URL}${canonicalPath}`,
      "applicationCategory": "Utilities",
      "operatingSystem": "Web Browser",
      "datePublished": "2025-12-16",
      "dateModified": "2026-04-18",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
      "author": { "@type": "Organization", "name": "PDF HUB 24", "url": BASE_URL },
      ...countrySchema
    });
    if (progPage.faqs?.length) {
      schemas.push({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": progPage.faqs.map((f: any) => ({
          "@type": "Question",
          "name": f.question,
          "acceptedAnswer": { "@type": "Answer", "text": f.answer }
        }))
      });
    }
    schemas.push({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": BASE_URL },
        { "@type": "ListItem", "position": 2, "name": "PDF Tools", "item": `${BASE_URL}/all-tools` },
        { "@type": "ListItem", "position": 3, "name": pageName, "item": `${BASE_URL}${canonicalPath}` }
      ]
    });

  } else {
    // Default: use hardcoded schema from seoConfig
    if (seo.schema) {
      const rawSchema = seo.schema as Record<string, unknown>;
      // Article rich results require image + publisher.logo — add defaults where missing
      if (rawSchema["@type"] === "Article") {
        const enriched: Record<string, unknown> = { ...rawSchema };
        if (!enriched["image"]) {
          const articleImageUrl = blogSlug ? `${BASE_URL}/api/og-image/${blogSlug}` : `${BASE_URL}/og-image.png`;
          enriched["image"] = { "@type": "ImageObject", "url": articleImageUrl, "width": 1200, "height": 630 };
        }
        const pub = enriched["publisher"] as Record<string, unknown> | undefined;
        if (pub && !pub["logo"]) {
          enriched["publisher"] = { ...pub, "logo": { "@type": "ImageObject", "url": `${BASE_URL}/favicon.png`, "width": 512, "height": 512 } };
        }
        schemas.push(enriched);
      } else {
        schemas.push(rawSchema);
      }
    }

    if (canonicalPath === "/" || canonicalPath === "") {
      // Homepage: add Organization + FAQPage schemas
      schemas.push({
        "@context": "https://schema.org",
        "@type": "Organization",
        "@id": `${BASE_URL}/#organization`,
        "name": "PDF HUB 24",
        "url": BASE_URL,
        "logo": {
          "@type": "ImageObject",
          "@id": `${BASE_URL}/#logo`,
          "url": `${BASE_URL}/og-image.png`,
          "width": 1200,
          "height": 630,
          "caption": "PDF HUB 24"
        },
        "sameAs": [
          "https://www.facebook.com/profile.php?id=61584792122187",
          "https://youtube.com/@pdfhub24"
        ],
        "description": "Free online PDF tools — merge, split, compress, convert, and edit PDF files with no signup."
      });
      schemas.push({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          { "@type": "Question", "name": "Are all PDF HUB 24 tools completely free?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. All 49+ PDF and image tools on PDF HUB 24 are 100% free with no signup, no watermarks, and no hidden limits." } },
          { "@type": "Question", "name": "Is it safe to upload my files to PDF HUB 24?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. All uploads use SSL encryption. Files are processed in memory and automatically deleted within 1 hour. We never access or share your files." } },
          { "@type": "Question", "name": "Do I need to create an account to use the tools?", "acceptedAnswer": { "@type": "Answer", "text": "No account is required. All tools work instantly without registration — just upload your file and download the result." } },
          { "@type": "Question", "name": "What file formats does PDF HUB 24 support?", "acceptedAnswer": { "@type": "Answer", "text": "PDF HUB 24 supports PDF, Word (DOCX), Excel (XLSX), PowerPoint (PPTX), JPG, PNG, WebP, GIF, TIFF, and more." } },
          { "@type": "Question", "name": "Can I use PDF HUB 24 on mobile devices?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. PDF HUB 24 is fully responsive and works on all devices — desktop, tablet, and mobile browsers." } }
        ]
      });
    } else {
      // Add BreadcrumbList for non-home pages
      const pageName = seo.title ? seo.title.split(" | ")[0] : "";
      schemas.push({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": BASE_URL },
          { "@type": "ListItem", "position": 2, "name": pageName, "item": `${BASE_URL}${canonicalPath}` }
        ]
      });
    }
  }

  const schemaBlocks = schemas
    .filter(Boolean)
    .map(s => `<script type="application/ld+json">${JSON.stringify(s)}</script>`)
    .join("\n    ");

  return `
    <title>${effectiveTitle}</title>
    <meta name="description" content="${effectiveDescription}" />
    <meta name="keywords" content="${effectiveKeywords}" />
    <link rel="canonical" href="${effectiveCanonicalUrl}" />
    ${finalHreflangBlock}
    
    <!-- Open Graph -->
    <meta property="og:title" content="${ogTitle}" />
    <meta property="og:description" content="${ogDescription}" />
    ${ogUrl ? `<meta property="og:url" content="${ogUrl}" />` : ""}
    <meta property="og:type" content="${ogType}" />
    <meta property="og:site_name" content="PDF HUB 24" />
    <meta property="og:image" content="${pageOgImage}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="${pageOgAlt}" />
    <meta property="og:locale" content="${langAttr}" />${articleOgTags}
    
    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content="@pdfhub24" />
    <meta name="twitter:title" content="${twitterTitle}" />
    <meta name="twitter:description" content="${twitterDescription}" />
    <meta name="twitter:image" content="${pageOgImage}" />
    <meta name="twitter:image:alt" content="${pageOgAlt}" />
    
    <!-- Robots -->
    <meta name="robots" content="${robotsContent}" />
    ${process.env.GOOGLE_SITE_VERIFICATION ? `\n    <!-- Google Search Console Verification -->\n    <meta name="google-site-verification" content="${process.env.GOOGLE_SITE_VERIFICATION}" />` : ""}
    
    <!-- Structured Data -->
    ${schemaBlocks}
  `;
}

function generateCrawlableNav(currentPath: string): string {
  const toolLinks = [
    { href: "/pdf-to-word", text: "PDF to Word" },
    { href: "/pdf-to-jpg", text: "PDF to JPG" },
    { href: "/pdf-to-png", text: "PDF to PNG" },
    { href: "/pdf-to-excel", text: "PDF to Excel" },
    { href: "/pdf-to-ppt", text: "PDF to PowerPoint" },
    { href: "/word-to-pdf", text: "Word to PDF" },
    { href: "/jpg-to-pdf", text: "JPG to PDF" },
    { href: "/png-to-pdf", text: "PNG to PDF" },
    { href: "/excel-to-pdf", text: "Excel to PDF" },
    { href: "/ppt-to-pdf", text: "PowerPoint to PDF" },
    { href: "/tiff-to-pdf", text: "TIFF to PDF" },
    { href: "/gif-to-pdf", text: "GIF to PDF" },
    { href: "/html-to-pdf", text: "HTML to PDF" },
    { href: "/webp-to-pdf", text: "WebP to PDF" },
    { href: "/merge", text: "Merge PDF" },
    { href: "/split", text: "Split PDF" },
    { href: "/compress", text: "Compress PDF" },
    { href: "/rotate", text: "Rotate PDF" },
    { href: "/delete-pages", text: "Delete Pages" },
    { href: "/protect-pdf", text: "Protect PDF" },
    { href: "/unlock-pdf", text: "Unlock PDF" },
    { href: "/add-page-numbers", text: "Add Page Numbers" },
    { href: "/add-watermark", text: "Add Watermark" },
    { href: "/reorder-pages", text: "Reorder Pages" },
    { href: "/crop-pdf", text: "Crop PDF" },
    { href: "/resize-pdf", text: "Resize PDF" },
    { href: "/sign-pdf", text: "Sign PDF" },
    { href: "/flatten-pdf", text: "Flatten PDF" },
    { href: "/grayscale-pdf", text: "PDF to Grayscale" },
    { href: "/repair-pdf", text: "Repair PDF" },
    { href: "/edit-pdf", text: "Edit PDF" },
    { href: "/annotate-pdf", text: "Annotate PDF" },
    { href: "/redact-pdf", text: "Redact PDF" },
    { href: "/extract-text", text: "Extract Text" },
    { href: "/ocr-pdf", text: "OCR PDF" },
    { href: "/pdf-viewer", text: "PDF Viewer" },
    { href: "/compare-pdf", text: "Compare PDF" },
    { href: "/image-compressor", text: "Image Compressor" },
    { href: "/resize-image", text: "Resize Image" },
    { href: "/crop-image", text: "Crop Image" },
    { href: "/rotate-image", text: "Rotate Image" },
    { href: "/convert-image", text: "Convert Image" },
    { href: "/extract-images", text: "Extract Images from PDF" },
  ];

  const categoryLinks = [
    { href: "/convert-pdf", text: "Convert PDF Tools" },
    { href: "/compress-pdf-tools", text: "Compress PDF Tools" },
    { href: "/edit-pdf-tools", text: "Edit PDF Tools" },
    { href: "/secure-pdf", text: "Secure PDF Tools" },
    { href: "/image-tools", text: "Image Tools" },
    { href: "/all-tools", text: "All PDF Tools" },
    { href: "/free-pdf-converter", text: "Free PDF Converter" },
    { href: "/free-pdf-editor", text: "Free PDF Editor" },
  ];

  const programmaticLinks = [
    { href: "/tools/compress-pdf-under-100kb", text: "Compress PDF Under 100KB" },
    { href: "/tools/reduce-pdf-size-to-200kb", text: "Reduce PDF Size to 200KB" },
    { href: "/tools/compress-pdf-to-1mb", text: "Compress PDF to 1MB" },
    { href: "/tools/merge-pdf-for-visa-application", text: "Merge PDF for Visa Application" },
    { href: "/tools/convert-scanned-pdf-to-word-editable", text: "Convert Scanned PDF to Word" },
    { href: "/tools/make-pdf-smaller-for-email", text: "Make PDF Smaller for Email" },
    { href: "/tools/pdf-to-jpg-high-quality", text: "PDF to JPG High Quality" },
    { href: "/tools/merge-pdf-free-no-limit", text: "Merge PDF Free No Limit" },
    { href: "/tools/split-pdf-by-pages", text: "Split PDF by Pages" },
    { href: "/tools/add-signature-to-pdf-free", text: "Add Signature to PDF Free" },
    { href: "/tools/compress-pdf-without-losing-quality", text: "Compress PDF Without Losing Quality" },
    { href: "/tools/pdf-to-word-editable-free", text: "PDF to Word Editable Free" },
    { href: "/tools/unlock-pdf-for-editing", text: "Unlock PDF for Editing" },
    { href: "/tools/rotate-pdf-and-save", text: "Rotate PDF and Save" },
    { href: "/tools/convert-pdf-to-jpg-all-pages", text: "Convert PDF to JPG All Pages" },
    { href: "/tools/protect-pdf-with-password-free", text: "Protect PDF with Password Free" },
    { href: "/tools/remove-pages-from-pdf", text: "Remove Pages from PDF" },
    { href: "/tools/flatten-pdf-for-printing", text: "Flatten PDF for Printing" },
    { href: "/tools/add-watermark-to-pdf-free", text: "Add Watermark to PDF Free" },
    { href: "/tools/convert-excel-to-pdf-free", text: "Convert Excel to PDF Free" },
    { href: "/tools/convert-word-to-pdf-free-online", text: "Convert Word to PDF Free Online" },
    { href: "/tools/convert-docx-to-pdf-keep-formatting", text: "Convert DOCX to PDF Keep Formatting" },
    { href: "/tools/edit-pdf-text-online-free", text: "Edit PDF Text Online Free" },
    { href: "/tools/edit-pdf-without-adobe-acrobat", text: "Edit PDF Without Adobe Acrobat" },
    { href: "/tools/convert-pdf-to-excel-with-tables", text: "Convert PDF to Excel With Tables" },
    { href: "/tools/extract-tables-from-pdf-to-spreadsheet", text: "Extract Tables From PDF to Spreadsheet" },
    { href: "/tools/convert-jpg-to-pdf-free-online", text: "Convert JPG to PDF Free Online" },
    { href: "/tools/convert-multiple-images-to-one-pdf", text: "Convert Multiple Images to One PDF" },
    { href: "/tools/add-page-numbers-to-pdf-free", text: "Add Page Numbers to PDF Free" },
    { href: "/tools/redact-pdf-black-out-text", text: "Redact PDF Black Out Text" },
    { href: "/tools/crop-pdf-margins-free-online", text: "Crop PDF Margins Free Online" },
    { href: "/tools/resize-pdf-to-a4-free", text: "Resize PDF to A4 Free" },
    { href: "/tools/convert-html-webpage-to-pdf", text: "Convert HTML Webpage to PDF" },
    { href: "/tools/compress-jpg-png-image-online", text: "Compress JPG PNG Image Online" },
    { href: "/tools/rearrange-pdf-pages-free", text: "Rearrange PDF Pages Free" },
    { href: "/tools/convert-pdf-to-png-high-resolution", text: "Convert PDF to PNG High Resolution" },
    { href: "/tools/annotate-pdf-highlight-text-free", text: "Annotate PDF Highlight Text Free" },
    { href: "/tools/convert-pdf-to-powerpoint-free", text: "Convert PDF to PowerPoint Free" },
    { href: "/tools/convert-pdf-to-word-without-losing-formatting", text: "Convert PDF to Word Without Losing Formatting" },
    { href: "/tools/unlock-pdf-remove-password-online", text: "Unlock PDF Remove Password Online" },
  ];

  const blogLinks = [
    { href: "/blog/how-to-compress-pdf-for-email", text: "How to Compress PDF for Email" },
    { href: "/blog/convert-pdf-to-word-without-losing-formatting", text: "Convert PDF to Word Without Losing Formatting" },
    { href: "/blog/merge-pdf-files-guide", text: "How to Merge PDF Files" },
    { href: "/blog/protect-pdf-with-password", text: "Password Protect PDF Guide" },
    { href: "/blog/pdf-tools-for-students", text: "PDF Tools for Students" },
    { href: "/blog/how-to-split-pdf-pages", text: "How to Split PDF Pages" },
    { href: "/blog/add-page-numbers-to-pdf", text: "Add Page Numbers to PDF" },
    { href: "/blog/convert-images-to-pdf", text: "Convert Images to PDF" },
    { href: "/blog/ocr-scanned-pdf-to-text", text: "OCR Scanned PDF to Text" },
    { href: "/blog/rotate-pdf-pages", text: "Rotate PDF Pages" },
    { href: "/blog/sign-pdf-electronically", text: "Sign PDF Electronically" },
    { href: "/blog/edit-pdf-text-images", text: "Edit PDF Text and Images" },
    { href: "/blog/watermark-pdf-documents", text: "Watermark PDF Documents" },
    { href: "/blog/pdf-to-excel-convert-tables", text: "PDF to Excel Convert Tables" },
    { href: "/blog/redact-sensitive-pdf-information", text: "Redact Sensitive PDF Information" },
    { href: "/blog/how-to-flatten-pdf", text: "How to Flatten PDF" },
    { href: "/blog/crop-pdf-pages-guide", text: "Crop PDF Pages Guide" },
    { href: "/blog/resize-pdf-to-a4", text: "Resize PDF to A4" },
    { href: "/blog/compare-two-pdf-files", text: "Compare Two PDF Files" },
    { href: "/blog/html-to-pdf-conversion", text: "HTML to PDF Conversion" },
    { href: "/blog/extract-text-from-pdf", text: "Extract Text from PDF" },
    { href: "/blog/best-free-pdf-tools-2026", text: "Best Free PDF Tools 2026" },
    { href: "/blog/pdf-accessibility-guide", text: "PDF Accessibility Guide" },
    { href: "/blog/batch-convert-images-to-pdf", text: "Batch Convert Images to PDF" },
    { href: "/blog/unlock-pdf-remove-password", text: "Unlock PDF Remove Password" },
  ];

  const infoLinks = [
    { href: "/", text: "Home" },
    { href: "/blog", text: "Blog" },
    { href: "/about", text: "About Us" },
    { href: "/privacy", text: "Privacy Policy" },
    { href: "/terms", text: "Terms of Service" },
    { href: "/contact", text: "Contact Us" },
    { href: "/dmca", text: "DMCA Policy" },
    { href: "/pricing", text: "Pricing" },
    { href: "/data-security", text: "Data Security" },
    { href: "/auto-delete", text: "Auto-Delete Policy" },
    { href: "/write-for-us", text: "Write for Us" },
    { href: "/embed", text: "Embed Our Tools" },
    { href: "/pdf-comparison-chart", text: "PDF Tools Comparison" },
    { href: "/pdf-file-formats-guide", text: "File Formats Guide" },
    { href: "/pdf-statistics", text: "PDF Statistics 2026" },
    { href: "/press", text: "Press and Media" },
  ];

  const allLinks = [...toolLinks, ...categoryLinks, ...programmaticLinks, ...blogLinks, ...infoLinks]
    .filter(link => link.href !== currentPath);

  const linkHtml = allLinks
    .map(link => `<a href="${link.href}">${link.text}</a>`)
    .join(" ");

  return `<nav aria-label="Site Navigation" style="position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0">${linkHtml}</nav>`;
}

function escJs(str: string): string {
  return str.replace(/\\/g, "\\\\").replace(/'/g, "\\'").replace(/\n/g, " ").replace(/\r/g, "");
}

function escHtml(str: string): string {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

// Convert markdown text to plain HTML for crawler visibility
function markdownToHtml(md: string, maxWords = 600): string {
  const lines = md.split("\n");
  const parts: string[] = [];
  let wordCount = 0;
  let ulOpen = false;

  const closeUl = () => { if (ulOpen) { parts.push("</ul>"); ulOpen = false; } };
  const countWords = (s: string) => s.trim().split(/\s+/).filter(Boolean).length;

  for (const rawLine of lines) {
    if (wordCount >= maxWords) break;
    const line = rawLine.trim();

    if (!line) { closeUl(); continue; }

    if (line.startsWith("#### ")) {
      closeUl();
      const text = escHtml(line.slice(5));
      parts.push(`<h4 style="font-size:0.95rem;font-weight:600;margin:1rem 0 0.4rem">${text}</h4>`);
      wordCount += countWords(line.slice(5));
    } else if (line.startsWith("### ")) {
      closeUl();
      const text = escHtml(line.slice(4));
      parts.push(`<h3 style="font-size:1.05rem;font-weight:700;margin:1.25rem 0 0.5rem">${text}</h3>`);
      wordCount += countWords(line.slice(4));
    } else if (line.startsWith("## ")) {
      closeUl();
      const text = escHtml(line.slice(3));
      parts.push(`<h2 style="font-size:1.2rem;font-weight:700;margin:1.5rem 0 0.6rem">${text}</h2>`);
      wordCount += countWords(line.slice(3));
    } else if (line.startsWith("- ") || line.startsWith("* ")) {
      if (!ulOpen) { parts.push('<ul style="padding-left:1.5rem;line-height:1.8;margin:0.5rem 0">'); ulOpen = true; }
      const text = escHtml(line.slice(2)).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
      parts.push(`<li>${text}</li>`);
      wordCount += countWords(line.slice(2));
    } else if (/^\d+\.\s/.test(line)) {
      closeUl();
      const text = escHtml(line.replace(/^\d+\.\s/, "")).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
      parts.push(`<p style="margin:0.3rem 0;padding-left:1.2rem">${text}</p>`);
      wordCount += countWords(text);
    } else {
      closeUl();
      const text = escHtml(line).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
      parts.push(`<p style="line-height:1.75;margin:0.6rem 0">${text}</p>`);
      wordCount += countWords(line);
    }
  }
  closeUl();
  return parts.join("\n");
}

// ── Comprehensive native-language content for language pages ──────────────────
// Used in generatePreRenderShell to generate 90%+ native-language body content
// for all 12 non-English languages on tool, blog, and category pages.

type LangLabels = {
  faq: string; howTo: string; benefits: string; relatedTools: string;
  exploreAll: string; convertFrom: string; convertTo: string; editPdf: string;
  securePdf: string; imageTools: string; utility: string; howToGuides: string;
  popularArticles: string; whyChoose: string; resources: string;
  availableTools: string; commonUseCases: string; browseByCategory: string;
};

const LANG_LABELS: Record<string, LangLabels> = {
  es: { faq:"Preguntas frecuentes", howTo:"Cómo usar", benefits:"Ventajas principales", relatedTools:"Herramientas PDF relacionadas", exploreAll:"Explorar todas las herramientas gratuitas", convertFrom:"Convertir desde PDF", convertTo:"Convertir a PDF", editPdf:"Editar PDF", securePdf:"PDF seguro", imageTools:"Herramientas de imagen", utility:"Utilidades", howToGuides:"Guías de uso", popularArticles:"Artículos populares", whyChoose:"¿Por qué elegir PDF HUB 24?", resources:"Recursos", availableTools:"Herramientas disponibles", commonUseCases:"Casos de uso comunes", browseByCategory:"Explorar por categoría" },
  ar: { faq:"الأسئلة الشائعة", howTo:"كيفية الاستخدام", benefits:"الفوائد الرئيسية", relatedTools:"أدوات PDF ذات الصلة", exploreAll:"استكشاف جميع الأدوات المجانية", convertFrom:"التحويل من PDF", convertTo:"التحويل إلى PDF", editPdf:"تحرير PDF", securePdf:"تأمين PDF", imageTools:"أدوات الصور", utility:"أدوات مساعدة", howToGuides:"أدلة الاستخدام", popularArticles:"مقالات شائعة", whyChoose:"لماذا تختار PDF HUB 24؟", resources:"الموارد", availableTools:"الأدوات المتاحة", commonUseCases:"حالات الاستخدام الشائعة", browseByCategory:"تصفح حسب الفئة" },
  hi: { faq:"अक्सर पूछे जाने वाले प्रश्न", howTo:"उपयोग कैसे करें", benefits:"मुख्य लाभ", relatedTools:"संबंधित PDF टूल", exploreAll:"सभी मुफ़्त टूल देखें", convertFrom:"PDF से कन्वर्ट", convertTo:"PDF में कन्वर्ट", editPdf:"PDF संपादित", securePdf:"PDF सुरक्षित", imageTools:"इमेज टूल", utility:"उपयोगिताएं", howToGuides:"उपयोग मार्गदर्शिकाएं", popularArticles:"लोकप्रिय लेख", whyChoose:"PDF HUB 24 क्यों चुनें?", resources:"संसाधन", availableTools:"उपलब्ध टूल", commonUseCases:"सामान्य उपयोग के मामले", browseByCategory:"श्रेणी के अनुसार ब्राउज़ करें" },
  fr: { faq:"Foire aux questions", howTo:"Comment utiliser", benefits:"Avantages clés", relatedTools:"Outils PDF associés", exploreAll:"Explorer tous les outils gratuits", convertFrom:"Convertir depuis PDF", convertTo:"Convertir en PDF", editPdf:"Modifier PDF", securePdf:"Sécuriser PDF", imageTools:"Outils d'image", utility:"Utilitaires", howToGuides:"Guides pratiques", popularArticles:"Articles populaires", whyChoose:"Pourquoi choisir PDF HUB 24 ?", resources:"Ressources", availableTools:"Outils disponibles", commonUseCases:"Cas d'usage courants", browseByCategory:"Parcourir par catégorie" },
  pt: { faq:"Perguntas frequentes", howTo:"Como usar", benefits:"Principais vantagens", relatedTools:"Ferramentas PDF relacionadas", exploreAll:"Explorar todas as ferramentas gratuitas", convertFrom:"Converter de PDF", convertTo:"Converter para PDF", editPdf:"Editar PDF", securePdf:"Proteger PDF", imageTools:"Ferramentas de imagem", utility:"Utilitários", howToGuides:"Guias de uso", popularArticles:"Artigos populares", whyChoose:"Por que escolher PDF HUB 24?", resources:"Recursos", availableTools:"Ferramentas disponíveis", commonUseCases:"Casos de uso comuns", browseByCategory:"Navegar por categoria" },
  de: { faq:"Häufig gestellte Fragen", howTo:"Wie man es benutzt", benefits:"Wichtige Vorteile", relatedTools:"Verwandte PDF-Tools", exploreAll:"Alle kostenlosen Tools erkunden", convertFrom:"Von PDF konvertieren", convertTo:"Zu PDF konvertieren", editPdf:"PDF bearbeiten", securePdf:"PDF sichern", imageTools:"Bildwerkzeuge", utility:"Dienstprogramme", howToGuides:"Anleitungen", popularArticles:"Beliebte Artikel", whyChoose:"Warum PDF HUB 24 wählen?", resources:"Ressourcen", availableTools:"Verfügbare Tools", commonUseCases:"Häufige Anwendungsfälle", browseByCategory:"Nach Kategorie durchsuchen" },
  zh: { faq:"常见问题", howTo:"如何使用", benefits:"主要优势", relatedTools:"相关PDF工具", exploreAll:"探索所有免费工具", convertFrom:"从PDF转换", convertTo:"转换为PDF", editPdf:"编辑PDF", securePdf:"安全PDF", imageTools:"图像工具", utility:"实用工具", howToGuides:"使用指南", popularArticles:"热门文章", whyChoose:"为什么选择PDF HUB 24？", resources:"资源", availableTools:"可用工具", commonUseCases:"常见使用场景", browseByCategory:"按类别浏览" },
  ja: { faq:"よくある質問", howTo:"使い方", benefits:"主な特長", relatedTools:"関連PDFツール", exploreAll:"すべての無料ツールを見る", convertFrom:"PDFから変換", convertTo:"PDFに変換", editPdf:"PDFを編集", securePdf:"PDFを保護", imageTools:"画像ツール", utility:"ユーティリティ", howToGuides:"使い方ガイド", popularArticles:"人気記事", whyChoose:"なぜPDF HUB 24？", resources:"リソース", availableTools:"利用可能なツール", commonUseCases:"よくある使用例", browseByCategory:"カテゴリ別に閲覧" },
  id: { faq:"Pertanyaan yang Sering Diajukan", howTo:"Cara Menggunakan", benefits:"Keunggulan Utama", relatedTools:"Alat PDF Terkait", exploreAll:"Jelajahi Semua Alat Gratis", convertFrom:"Konversi dari PDF", convertTo:"Konversi ke PDF", editPdf:"Edit PDF", securePdf:"Aman PDF", imageTools:"Alat Gambar", utility:"Utilitas", howToGuides:"Panduan Cara", popularArticles:"Artikel Populer", whyChoose:"Mengapa Pilih PDF HUB 24?", resources:"Sumber Daya", availableTools:"Alat Tersedia", commonUseCases:"Kasus Penggunaan Umum", browseByCategory:"Jelajahi berdasarkan kategori" },
  ru: { faq:"Часто задаваемые вопросы", howTo:"Как использовать", benefits:"Ключевые преимущества", relatedTools:"Связанные PDF-инструменты", exploreAll:"Все бесплатные инструменты", convertFrom:"Конвертировать из PDF", convertTo:"Конвертировать в PDF", editPdf:"Редактировать PDF", securePdf:"Защита PDF", imageTools:"Инструменты для изображений", utility:"Утилиты", howToGuides:"Инструкции", popularArticles:"Популярные статьи", whyChoose:"Почему PDF HUB 24?", resources:"Ресурсы", availableTools:"Доступные инструменты", commonUseCases:"Частые случаи использования", browseByCategory:"Просмотр по категориям" },
  it: { faq:"Domande frequenti", howTo:"Come si usa", benefits:"Vantaggi principali", relatedTools:"Strumenti PDF correlati", exploreAll:"Esplora tutti gli strumenti gratuiti", convertFrom:"Converti da PDF", convertTo:"Converti in PDF", editPdf:"Modifica PDF", securePdf:"Proteggi PDF", imageTools:"Strumenti immagine", utility:"Strumenti utili", howToGuides:"Guide pratiche", popularArticles:"Articoli popolari", whyChoose:"Perché PDF HUB 24?", resources:"Risorse", availableTools:"Strumenti disponibili", commonUseCases:"Casi d'uso comuni", browseByCategory:"Sfoglia per categoria" },
  ur: { faq:"اکثر پوچھے جانے والے سوالات", howTo:"استعمال کا طریقہ", benefits:"اہم فوائد", relatedTools:"متعلقہ PDF ٹولز", exploreAll:"تمام مفت ٹولز دیکھیں", convertFrom:"PDF سے تبدیل", convertTo:"PDF میں تبدیل", editPdf:"PDF ترمیم", securePdf:"PDF محفوظ", imageTools:"تصویری ٹولز", utility:"یوٹیلیٹی", howToGuides:"استعمال کی رہنمائی", popularArticles:"مشہور مضامین", whyChoose:"PDF HUB 24 کیوں چنیں؟", resources:"وسائل", availableTools:"دستیاب ٹولز", commonUseCases:"عام استعمالات", browseByCategory:"زمرہ کے حساب سے دیکھیں" },
};

// 3 how-to steps per language: [stepTitle, stepDescription with {name} placeholder]
const LANG_HOW_TO_STEPS: Record<string, [string,string][]> = {
  es: [["Subir archivo","Haz clic en el botón o arrastra tu archivo. {name} acepta archivos de hasta 100 MB."],["Iniciar proceso","Haz clic en 'Iniciar' y {name} procesa todo automáticamente en segundos."],["Descargar resultado","Descarga el archivo final gratis. Sin cuenta, sin correo, sin marcas de agua."]],
  ar: [["رفع الملف","انقر على الزر أو اسحب ملفك. {name} يقبل ملفات حتى 100 ميغابايت."],["بدء المعالجة","انقر على 'ابدأ' و{name} يعالج كل شيء تلقائيًا في ثوانٍ."],["تنزيل النتيجة","نزّل الملف النهائي مجانًا. بدون حساب، بدون بريد إلكتروني، بدون علامات مائية."]],
  hi: [["फ़ाइल अपलोड करें","बटन पर क्लिक करें या अपनी फ़ाइल खींचें। {name} 100 MB तक की फ़ाइलें स्वीकार करता है।"],["प्रक्रिया शुरू करें","'शुरू करें' पर क्लिक करें और {name} सब कुछ स्वचालित रूप से सेकंड में करता है।"],["डाउनलोड करें","अपनी तैयार फ़ाइल मुफ़्त में डाउनलोड करें। कोई अकाउंट, ईमेल या वॉटरमार्क नहीं।"]],
  fr: [["Téléverser le fichier","Cliquez sur le bouton ou glissez votre fichier. {name} accepte les fichiers jusqu'à 100 Mo."],["Lancer le traitement","Cliquez sur 'Démarrer' et {name} traite tout automatiquement en quelques secondes."],["Télécharger le résultat","Téléchargez votre fichier final gratuitement. Sans compte, sans email, sans filigrane."]],
  pt: [["Fazer upload do arquivo","Clique no botão ou arraste seu arquivo. {name} aceita arquivos de até 100 MB."],["Iniciar o processo","Clique em 'Iniciar' e {name} processa tudo automaticamente em segundos."],["Baixar o resultado","Baixe o arquivo final gratuitamente. Sem conta, sem e-mail, sem marca d'água."]],
  de: [["Datei hochladen","Klicken Sie auf die Schaltfläche oder ziehen Sie Ihre Datei per Drag & Drop. {name} akzeptiert Dateien bis zu 100 MB."],["Verarbeitung starten","Klicken Sie auf 'Starten' und {name} erledigt alles automatisch in Sekundenschnelle."],["Herunterladen","Laden Sie Ihre fertige Datei kostenlos herunter. Kein Konto, keine E-Mail, keine Wasserzeichen."]],
  zh: [["上传文件","点击按钮或拖放您的文件。{name}接受最大100MB的文件。"],["开始处理","点击'开始'，{name}将在数秒内自动完成处理。"],["下载结果","免费下载处理后的文件。无需账户、电子邮件或水印。"]],
  ja: [["ファイルをアップロード","ボタンをクリックするかファイルをドラッグ＆ドロップ。{name}は最大100MBのファイルに対応しています。"],["処理を開始","「開始」をクリックすると、{name}が数秒で自動的に処理します。"],["ダウンロード","完成したファイルを無料でダウンロード。アカウント、メール、透かし不要。"]],
  id: [["Unggah file","Klik tombol atau seret file Anda. {name} menerima file hingga 100 MB."],["Mulai proses","Klik 'Mulai' dan {name} memproses semuanya secara otomatis dalam hitungan detik."],["Unduh hasilnya","Unduh file Anda secara gratis. Tanpa akun, tanpa email, tanpa watermark."]],
  ru: [["Загрузить файл","Нажмите кнопку или перетащите файл. {name} принимает файлы до 100 МБ."],["Начать обработку","Нажмите 'Начать' и {name} всё сделает автоматически за считанные секунды."],["Скачать результат","Скачайте готовый файл бесплатно. Без аккаунта, без email, без водяных знаков."]],
  it: [["Carica il file","Clicca sul pulsante o trascina il tuo file. {name} accetta file fino a 100 MB."],["Avviare l'elaborazione","Clicca su 'Avvia' e {name} elabora tutto automaticamente in pochi secondi."],["Scaricare il risultato","Scarica il file finale gratuitamente. Senza account, email o filigrana."]],
  ur: [["فائل اپلوڈ کریں","بٹن پر کلک کریں یا اپنی فائل گھسیٹیں۔ {name} 100 MB تک کی فائلیں قبول کرتا ہے۔"],["عمل شروع کریں","'شروع کریں' پر کلک کریں اور {name} چند سیکنڈ میں سب کچھ خودکار طریقے سے کرتا ہے۔"],["ڈاؤن لوڈ کریں","اپنی مکمل فائل مفت ڈاؤن لوڈ کریں۔ کوئی اکاؤنٹ، ای میل یا واٹر مارک نہیں۔"]],
};

// 5 FAQ Q&A pairs per language with {name} placeholder
const LANG_TOOL_FAQS: Record<string, Array<{q:string;a:string}>> = {
  es: [
    {q:"¿{name} es realmente gratis?",a:"Sí, {name} es 100% gratuito. Sin costos ocultos, sin suscripción y sin necesidad de registrarse."},
    {q:"¿Qué tan seguros están mis archivos con {name}?",a:"Tus archivos se transfieren mediante cifrado SSL y se eliminan automáticamente de nuestros servidores después de 1 hora. Nadie tiene acceso a tus documentos."},
    {q:"¿Necesito instalar software para usar {name}?",a:"No. {name} funciona completamente en tu navegador — sin instalación, sin descarga, sin complementos necesarios."},
    {q:"¿Qué tamaño de archivo acepta {name}?",a:"{name} procesa archivos de hasta 100 MB. Para archivos muy grandes, te recomendamos dividirlos primero con nuestra herramienta Dividir PDF."},
    {q:"¿{name} funciona en dispositivos móviles?",a:"Sí, {name} funciona en todos los dispositivos — PC, Mac, smartphone y tablet. No es necesario descargar ninguna app."},
  ],
  ar: [
    {q:"هل {name} مجاني حقًا؟",a:"نعم، {name} مجاني 100%. لا توجد رسوم خفية، ولا اشتراك، ولا حاجة للتسجيل."},
    {q:"كيف يتم حماية ملفاتي مع {name}؟",a:"يتم نقل ملفاتك عبر تشفير SSL ويتم حذفها تلقائيًا من خوادمنا بعد ساعة واحدة. لا أحد يمكنه الوصول إلى مستنداتك."},
    {q:"هل أحتاج إلى تثبيت برنامج لاستخدام {name}؟",a:"لا. يعمل {name} بالكامل في متصفحك — لا تثبيت، لا تنزيل، لا إضافات مطلوبة."},
    {q:"ما حجم الملف الذي يدعمه {name}؟",a:"يعالج {name} ملفات حتى 100 ميغابايت. للملفات الكبيرة جدًا، نوصي بتقسيمها أولاً."},
    {q:"هل يعمل {name} على الأجهزة المحمولة؟",a:"نعم، يعمل {name} على جميع الأجهزة — الكمبيوتر والماك والهاتف الذكي والجهاز اللوحي. لا حاجة لتنزيل أي تطبيق."},
  ],
  hi: [
    {q:"{name} क्या सच में मुफ़्त है?",a:"हाँ, {name} 100% मुफ़्त है। कोई छिपी लागत नहीं, कोई सदस्यता नहीं और पंजीकरण की कोई ज़रूरत नहीं।"},
    {q:"{name} से मेरी फ़ाइलें कितनी सुरक्षित हैं?",a:"आपकी फ़ाइलें SSL एन्क्रिप्शन से ट्रांसफर होती हैं और 1 घंटे के बाद हमारे सर्वर से स्वत: हटा दी जाती हैं। आपके दस्तावेज़ों तक किसी की पहुँच नहीं है।"},
    {q:"{name} इस्तेमाल करने के लिए कोई सॉफ़्टवेयर इंस्टॉल करना होगा?",a:"नहीं। {name} पूरी तरह आपके ब्राउज़र में चलता है — कोई इंस्टॉलेशन, डाउनलोड या प्लगइन की ज़रूरत नहीं।"},
    {q:"{name} कितने बड़े आकार की फ़ाइल संभाल सकता है?",a:"{name} 100 MB तक की फ़ाइलें प्रोसेस करता है। बहुत बड़ी फ़ाइलों के लिए हम उन्हें पहले विभाजित करने की सलाह देते हैं।"},
    {q:"क्या {name} मोबाइल डिवाइस पर काम करता है?",a:"हाँ, {name} सभी उपकरणों पर काम करता है — PC, Mac, स्मार्टफोन और टैबलेट। कोई ऐप डाउनलोड ज़रूरी नहीं।"},
  ],
  fr: [
    {q:"{name} est-il vraiment gratuit ?",a:"Oui, {name} est 100% gratuit. Aucuns frais cachés, aucun abonnement et aucune inscription requise."},
    {q:"Mes fichiers sont-ils en sécurité avec {name} ?",a:"Vos fichiers sont transférés via chiffrement SSL et supprimés automatiquement de nos serveurs après 1 heure. Personne n'a accès à vos documents."},
    {q:"Dois-je installer un logiciel pour utiliser {name} ?",a:"Non. {name} fonctionne entièrement dans votre navigateur — aucune installation, aucun téléchargement, aucun plugin requis."},
    {q:"Quelle taille de fichier {name} prend-il en charge ?",a:"{name} traite des fichiers jusqu'à 100 Mo. Pour les très gros fichiers, nous recommandons de les diviser d'abord."},
    {q:"{name} fonctionne-t-il sur les appareils mobiles ?",a:"Oui, {name} fonctionne sur tous les appareils — PC, Mac, smartphone et tablette. Aucune application à télécharger."},
  ],
  pt: [
    {q:"{name} é realmente gratuito?",a:"Sim, {name} é 100% gratuito. Sem custos ocultos, sem assinatura e sem necessidade de registro."},
    {q:"Meus arquivos estão seguros com {name}?",a:"Seus arquivos são transferidos com criptografia SSL e excluídos automaticamente dos nossos servidores após 1 hora. Ninguém tem acesso aos seus documentos."},
    {q:"Preciso instalar algum software para usar {name}?",a:"Não. {name} funciona completamente no seu navegador — sem instalação, sem download, sem extensões necessárias."},
    {q:"Qual o tamanho de arquivo que {name} suporta?",a:"{name} processa arquivos de até 100 MB. Para arquivos muito grandes, recomendamos dividi-los primeiro."},
    {q:"{name} funciona em dispositivos móveis?",a:"Sim, {name} funciona em todos os dispositivos — PC, Mac, smartphone e tablet. Sem necessidade de baixar nenhum app."},
  ],
  de: [
    {q:"Ist {name} wirklich kostenlos?",a:"Ja, {name} ist 100% kostenlos. Es gibt keine versteckten Kosten, kein Abonnement und keine Registrierung erforderlich."},
    {q:"Wie sicher sind meine Dateien bei {name}?",a:"Ihre Dateien werden per SSL-Verschlüsselung übertragen und automatisch nach 1 Stunde von unseren Servern gelöscht. Niemand hat Zugriff auf Ihre Dokumente."},
    {q:"Muss ich Software installieren, um {name} zu nutzen?",a:"Nein. {name} läuft vollständig in Ihrem Browser — keine Installation, kein Download, kein Plugin erforderlich."},
    {q:"Welche Dateigröße unterstützt {name}?",a:"{name} verarbeitet Dateien bis zu 100 MB. Bei sehr großen Dateien empfehlen wir, diese zuerst aufzuteilen."},
    {q:"Funktioniert {name} auf Mobilgeräten?",a:"Ja, {name} funktioniert auf allen Geräten — PC, Mac, Smartphone und Tablet. Kein App-Download erforderlich."},
  ],
  zh: [
    {q:"{name}真的免费吗？",a:"是的，{name}完全免费。没有隐藏费用，无需订阅，也无需注册。"},
    {q:"使用{name}我的文件安全吗？",a:"您的文件通过SSL加密传输，并在1小时后从我们的服务器自动删除。没有人能访问您的文档。"},
    {q:"使用{name}需要安装软件吗？",a:"不需要。{name}完全在您的浏览器中运行——无需安装、下载或插件。"},
    {q:"{name}支持什么大小的文件？",a:"{name}处理最大100MB的文件。对于非常大的文件，我们建议先拆分它们。"},
    {q:"{name}在移动设备上可以使用吗？",a:"是的，{name}适用于所有设备——PC、Mac、智能手机和平板电脑。无需下载任何应用程序。"},
  ],
  ja: [
    {q:"{name}は本当に無料ですか？",a:"はい、{name}は100%無料です。隠れた費用なし、サブスクリプションなし、登録も不要です。"},
    {q:"{name}を使うとファイルは安全ですか？",a:"ファイルはSSL暗号化で転送され、1時間後に自動的にサーバーから削除されます。誰もあなたの文書にアクセスできません。"},
    {q:"{name}を使うためにソフトウェアをインストールする必要がありますか？",a:"いいえ。{name}はブラウザで完全に動作します——インストール、ダウンロード、プラグイン不要です。"},
    {q:"{name}はどのサイズのファイルに対応していますか？",a:"{name}は最大100MBのファイルを処理します。非常に大きなファイルの場合は、まず分割することをお勧めします。"},
    {q:"{name}はモバイルデバイスで使えますか？",a:"はい、{name}はすべてのデバイスで動作します——PC、Mac、スマートフォン、タブレット。アプリのダウンロードは不要です。"},
  ],
  id: [
    {q:"Apakah {name} benar-benar gratis?",a:"Ya, {name} 100% gratis. Tidak ada biaya tersembunyi, tidak ada langganan, dan tidak perlu mendaftar."},
    {q:"Apakah file saya aman dengan {name}?",a:"File Anda ditransfer dengan enkripsi SSL dan dihapus secara otomatis dari server kami setelah 1 jam. Tidak ada yang bisa mengakses dokumen Anda."},
    {q:"Apakah saya perlu menginstal perangkat lunak untuk menggunakan {name}?",a:"Tidak. {name} bekerja sepenuhnya di browser Anda — tanpa instalasi, unduhan, atau plugin."},
    {q:"Ukuran file apa yang didukung {name}?",a:"{name} memproses file hingga 100 MB. Untuk file yang sangat besar, kami sarankan untuk membaginya terlebih dahulu."},
    {q:"Apakah {name} bekerja di perangkat mobile?",a:"Ya, {name} bekerja di semua perangkat — PC, Mac, smartphone, dan tablet. Tidak perlu mengunduh aplikasi apapun."},
  ],
  ru: [
    {q:"{name} действительно бесплатный?",a:"Да, {name} на 100% бесплатный. Никаких скрытых платежей, подписок и регистрации не требуется."},
    {q:"Насколько безопасны мои файлы при использовании {name}?",a:"Ваши файлы передаются через SSL-шифрование и автоматически удаляются с наших серверов через 1 час. Никто не имеет доступа к вашим документам."},
    {q:"Нужно ли устанавливать программное обеспечение для использования {name}?",a:"Нет. {name} работает полностью в вашем браузере — никакой установки, загрузок или плагинов."},
    {q:"Какой размер файла поддерживает {name}?",a:"{name} обрабатывает файлы до 100 МБ. Для очень больших файлов мы рекомендуем сначала их разделить."},
    {q:"Работает ли {name} на мобильных устройствах?",a:"Да, {name} работает на всех устройствах — ПК, Mac, смартфон и планшет. Загрузка приложений не требуется."},
  ],
  it: [
    {q:"{name} è davvero gratuito?",a:"Sì, {name} è 100% gratuito. Nessun costo nascosto, nessun abbonamento e nessuna registrazione richiesta."},
    {q:"I miei file sono al sicuro con {name}?",a:"I tuoi file vengono trasferiti con crittografia SSL ed eliminati automaticamente dai nostri server dopo 1 ora. Nessuno ha accesso ai tuoi documenti."},
    {q:"Devo installare del software per usare {name}?",a:"No. {name} funziona interamente nel tuo browser — nessuna installazione, download o plugin richiesto."},
    {q:"Quale dimensione di file supporta {name}?",a:"{name} elabora file fino a 100 MB. Per file molto grandi, ti consigliamo di dividerli prima."},
    {q:"{name} funziona su dispositivi mobili?",a:"Sì, {name} funziona su tutti i dispositivi — PC, Mac, smartphone e tablet. Non è necessario scaricare nessuna app."},
  ],
  ur: [
    {q:"کیا {name} واقعی مفت ہے؟",a:"ہاں، {name} 100% مفت ہے۔ کوئی پوشیدہ اخراجات نہیں، کوئی سبسکرپشن نہیں اور رجسٹریشن کی ضرورت نہیں۔"},
    {q:"{name} کے ساتھ میری فائلیں کتنی محفوظ ہیں؟",a:"آپ کی فائلیں SSL انکرپشن کے ذریعے منتقل ہوتی ہیں اور 1 گھنٹے کے بعد ہمارے سرورز سے خودکار طریقے سے حذف ہو جاتی ہیں۔ کوئی بھی آپ کے دستاویزات تک رسائی نہیں پا سکتا۔"},
    {q:"{name} استعمال کرنے کے لیے کیا کوئی سافٹ ویئر انسٹال کرنا ہوگا؟",a:"نہیں۔ {name} مکمل طور پر آپ کے براؤزر میں چلتا ہے — کوئی انسٹالیشن، ڈاؤن لوڈ یا پلگ ان کی ضرورت نہیں۔"},
    {q:"{name} کتنے بڑے فائل سائز کو سپورٹ کرتا ہے؟",a:"{name} 100 MB تک کی فائلیں پروسیس کرتا ہے۔ بہت بڑی فائلوں کے لیے ہم پہلے انہیں تقسیم کرنے کی سفارش کرتے ہیں۔"},
    {q:"کیا {name} موبائل ڈیوائسز پر کام کرتا ہے؟",a:"ہاں، {name} تمام ڈیوائسز پر کام کرتا ہے — PC، Mac، سمارٹ فون اور ٹیبلیٹ۔ کوئی ایپ ڈاؤن لوڈ کرنے کی ضرورت نہیں۔"},
  ],
};

// 5 benefit bullet points per language (no {name} placeholder — generic trust points)
const LANG_BENEFITS: Record<string, string[]> = {
  es: ["Completamente gratuito — sin suscripciones ni costos ocultos","Sin registro ni dirección de correo electrónico necesarios","Funciona en todos los dispositivos — PC, Mac, tablet y smartphone","Sus archivos se eliminan automáticamente y de forma segura después de 1 hora","Cifrado SSL protege sus datos durante la transferencia"],
  ar: ["مجاني تمامًا — بدون اشتراكات، بدون رسوم خفية","لا حاجة للتسجيل أو البريد الإلكتروني","يعمل على جميع الأجهزة — الكمبيوتر والماك والجهاز اللوحي والهاتف الذكي","يتم حذف ملفاتك تلقائيًا وبأمان بعد ساعة واحدة","تشفير SSL يحمي بياناتك أثناء النقل"],
  hi: ["पूरी तरह मुफ़्त — कोई सदस्यता नहीं, कोई छिपी लागत नहीं","कोई पंजीकरण या ईमेल पते की ज़रूरत नहीं","सभी उपकरणों पर काम करता है — PC, Mac, टैबलेट और स्मार्टफोन","आपकी फ़ाइलें 1 घंटे बाद स्वत: और सुरक्षित रूप से हटा दी जाती हैं","SSL एन्क्रिप्शन ट्रांसफर के दौरान आपके डेटा की सुरक्षा करता है"],
  fr: ["Entièrement gratuit — sans abonnement, sans frais cachés","Aucune inscription ni adresse e-mail requise","Fonctionne sur tous les appareils — PC, Mac, tablette et smartphone","Vos fichiers sont supprimés automatiquement et en toute sécurité après 1 heure","Le chiffrement SSL protège vos données lors du transfert"],
  pt: ["Completamente gratuito — sem assinaturas, sem custos ocultos","Sem necessidade de cadastro ou endereço de e-mail","Funciona em todos os dispositivos — PC, Mac, tablet e smartphone","Seus arquivos são excluídos automática e seguramente após 1 hora","Criptografia SSL protege seus dados durante a transferência"],
  de: ["Vollständig kostenlos — keine Abonnements, keine versteckten Kosten","Keine Anmeldung oder E-Mail-Adresse erforderlich","Funktioniert auf allen Geräten — PC, Mac, Tablet und Smartphone","Ihre Dateien werden nach 1 Stunde automatisch und sicher gelöscht","SSL-Verschlüsselung schützt Ihre Daten bei der Übertragung"],
  zh: ["完全免费——无订阅，无隐藏费用","无需注册或电子邮件地址","适用于所有设备——PC、Mac、平板电脑和智能手机","您的文件在1小时后自动安全删除","SSL加密在传输过程中保护您的数据"],
  ja: ["完全無料——サブスクリプションなし、隠れた費用なし","登録やメールアドレス不要","すべてのデバイスで動作——PC、Mac、タブレット、スマートフォン","ファイルは1時間後に自動的に安全に削除されます","SSL暗号化が転送中にデータを保護します"],
  id: ["Sepenuhnya gratis — tanpa langganan, tanpa biaya tersembunyi","Tidak perlu registrasi atau alamat email","Bekerja di semua perangkat — PC, Mac, tablet, dan smartphone","File Anda dihapus secara otomatis dan aman setelah 1 jam","Enkripsi SSL melindungi data Anda selama transfer"],
  ru: ["Полностью бесплатно — без подписок, без скрытых платежей","Регистрация и электронная почта не требуются","Работает на всех устройствах — ПК, Mac, планшет и смартфон","Ваши файлы удаляются автоматически и безопасно через 1 час","SSL-шифрование защищает ваши данные при передаче"],
  it: ["Completamente gratuito — senza abbonamenti, senza costi nascosti","Nessuna registrazione o indirizzo email richiesto","Funziona su tutti i dispositivi — PC, Mac, tablet e smartphone","I tuoi file vengono eliminati automaticamente e in modo sicuro dopo 1 ora","La crittografia SSL protegge i tuoi dati durante il trasferimento"],
  ur: ["مکمل طور پر مفت — کوئی سبسکرپشن نہیں، کوئی پوشیدہ اخراجات نہیں","رجسٹریشن یا ای میل ایڈریس کی ضرورت نہیں","تمام ڈیوائسز پر کام کرتا ہے — PC، Mac، ٹیبلیٹ اور سمارٹ فون","آپ کی فائلیں 1 گھنٹے کے بعد خودکار اور محفوظ طریقے سے حذف ہو جاتی ہیں","SSL انکرپشن منتقلی کے دوران آپ کے ڈیٹا کی حفاظت کرتا ہے"],
};

/** Build native-language rich body content for a tool page in any non-English language */
function buildLangToolContent(toolName: string, lang: string): string {
  const L = LANG_LABELS[lang];
  if (!L) return "";
  const fill = (s: string) => s.replace(/\{name\}/g, toolName);
  let out = "";

  // How-to steps section
  const steps = LANG_HOW_TO_STEPS[lang];
  if (steps?.length) {
    const stepsHtml = steps.map(([ title, desc ], i) =>
      `<li style="margin-bottom:0.75rem"><strong>${escHtml(title)}:</strong> ${escHtml(fill(desc))}</li>`
    ).join("");
    out += `<section style="margin:2rem 0;text-align:left;max-width:800px;width:100%">
      <h2 style="font-size:1.25rem;font-weight:700;margin-bottom:0.75rem">${escHtml(L.howTo)}: ${escHtml(toolName)}</h2>
      <ol style="padding-left:1.5rem;line-height:1.8">${stepsHtml}</ol>
    </section>`;
  }

  // Key benefits section
  const benefits = LANG_BENEFITS[lang];
  if (benefits?.length) {
    const bHtml = benefits.map(b => `<li style="margin-bottom:0.4rem">${escHtml(b)}</li>`).join("");
    out += `<section style="margin:2rem 0;text-align:left;max-width:800px;width:100%">
      <h2 style="font-size:1.25rem;font-weight:700;margin-bottom:0.75rem">${escHtml(L.benefits)}</h2>
      <ul style="padding-left:1.5rem;line-height:1.8">${bHtml}</ul>
    </section>`;
  }

  // FAQ section
  const faqs = LANG_TOOL_FAQS[lang];
  if (faqs?.length) {
    const faqHtml = faqs.map(f =>
      `<div style="margin-bottom:1rem"><h3 style="font-size:1rem;font-weight:600;margin-bottom:0.25rem">${escHtml(fill(f.q))}</h3><p style="line-height:1.7">${escHtml(fill(f.a))}</p></div>`
    ).join("");
    out += `<section style="margin:2rem 0;text-align:left;max-width:800px;width:100%">
      <h2 style="font-size:1.25rem;font-weight:700;margin-bottom:0.75rem">${escHtml(L.faq)}</h2>
      ${faqHtml}
    </section>`;
  }

  return out;
}

/** Build native-language section headings for the all-tools grid */
function getLangCatLabel(cat: string, lang: string): string {
  const L = LANG_LABELS[lang];
  if (!L) return cat;
  const map: Record<string, keyof LangLabels> = {
    "Convert from PDF": "convertFrom",
    "Convert to PDF": "convertTo",
    "Edit PDF": "editPdf",
    "Secure PDF": "securePdf",
    "Image Tools": "imageTools",
    "Utility": "utility",
  };
  const key = map[cat];
  return key ? L[key] as string : cat;
}

function generatePreRenderShell(canonicalPath: string, lang: string = "en"): string {
  try {
  const config = seoConfig[canonicalPath];
  const isHome = canonicalPath === "/";

  // Derive tool id from path (e.g. "/merge" → "merge")
  const toolId = canonicalPath.replace(/^\//, "");
  const toolData = toolSEOData[toolId as keyof typeof toolSEOData];

  // Blog article: /blog/:slug
  const blogSlugMatch = canonicalPath.match(/^\/blog\/([^/]+)$/);
  const blogPost = blogSlugMatch ? blogPosts.find(p => p.slug === blogSlugMatch[1]) : null;

  // Programmatic page: /tools/:slug or root-level country pages (e.g. /compress-pdf-online-us)
  const progSlugMatch = canonicalPath.match(/^\/tools\/([^/]+)$/);
  const directSlugShell = canonicalPath.slice(1);
  const directProgPageShell = (!progSlugMatch && !blogSlugMatch && !config)
    ? (getProgrammaticPage(directSlugShell) ?? null)
    : null;
  const progPage = progSlugMatch
    ? (getProgrammaticPage(progSlugMatch[1]) ?? null)
    : directProgPageShell;

  // Category hub: /convert-pdf, /edit-pdf-tools, etc.
  const categoryHub = categoryHubs.find(h => `/${h.slug}` === canonicalPath);

  // Helper: strip brand suffix from any translated title string
  const stripBrand = (s: string) =>
    s.replace(/\s*[|—–]\s*PDF HUB 24\s*$/, "").trim();

  let h1Text = "";
  let descText = "";

  if (isHome) {
    h1Text = "Professional PDF Tools — 100% Free Online";
    descText = "Convert, merge, compress, edit, sign, and secure PDF files instantly. 49 free tools with no registration, no watermarks, and no file size tricks. Trusted by users worldwide.";
    // Language homepage: use native-language H1 derived from LANG_HOME_TITLE
    if (lang !== "en" && LANG_HOME_TITLE[lang]) {
      // Strip leading "PDF HUB 24 — " brand prefix to get the value-prop as H1
      h1Text = LANG_HOME_TITLE[lang].replace(/^PDF HUB 24\s*[—–]\s*/, "").trim();
      descText = LANG_HOME_DESC[lang] || descText;
    }
  } else if (blogPost) {
    h1Text = blogPost.title || "";
    descText = blogPost.excerpt || "";
    // Blog language pages: use translated title if available
    if (lang !== "en") {
      const blogMeta = getBlogMeta(lang, blogPost.slug);
      if (blogMeta?.[0]) h1Text = stripBrand(blogMeta[0]);
      if (blogMeta?.[1]) descText = blogMeta[1];
    }
  } else if (progPage) {
    h1Text = (progPage.title || "").split(" | ")[0];
    descText = progPage.description || "";
  } else if (categoryHub) {
    h1Text = categoryHub.h1 || "";
    descText = categoryHub.description || "";
    // Category hub language pages: use translated title
    if (lang !== "en" && LANG_CATEGORY[canonicalPath]?.[lang]) {
      const [catTitle, catDesc] = LANG_CATEGORY[canonicalPath][lang];
      h1Text = stripBrand(catTitle);
      descText = catDesc || descText;
    }
  } else if (toolData) {
    h1Text = toolData.longTailH1 || config?.title?.split(" | ")[0] || "";
    descText = toolData.metaDescription || config?.description || "";
    // Tool language pages: use native-language tool name + "100% free" suffix
    if (lang !== "en") {
      const toolKey = PATH_TO_TOOL_KEY[canonicalPath];
      const translatedName = toolKey
        ? (TOOL_TITLE_TRANSLATIONS as Record<string, Partial<Record<string,string>>>)[toolKey]?.[lang]
        : undefined;
      if (translatedName) {
        const free100 = LANG_100_FREE[lang] || "";
        h1Text = free100 ? `${translatedName} - 100% ${free100}` : translatedName;
        const descTpl = LANG_DESC_TEMPLATE[lang];
        if (descTpl) descText = descTpl.replace("{name}", translatedName);
      }
    }
  } else if (config?.h1) {
    h1Text = config.h1;
    descText = config.description || "";
    // Static config page language: use LANG_STATIC translated title
    if (lang !== "en" && LANG_STATIC[canonicalPath]?.[lang]) {
      const [stTitle, stDesc] = LANG_STATIC[canonicalPath][lang];
      h1Text = stripBrand(stTitle);
      descText = stDesc || descText;
    }
  } else if (config?.title) {
    h1Text = config.title.split(" | ")[0];
    descText = config.description || "";
    // Static config page language: use LANG_STATIC translated title
    if (lang !== "en" && LANG_STATIC[canonicalPath]?.[lang]) {
      const [stTitle, stDesc] = LANG_STATIC[canonicalPath][lang];
      h1Text = stripBrand(stTitle);
      descText = stDesc || descText;
    }
  } else {
    return "";
  }

  // Translated labels for this language (null for English — use English strings directly)
  const LL = lang !== "en" ? (LANG_LABELS[lang] ?? null) : null;

  // Build rich content sections
  let richContent = "";

  // ── BLOG ARTICLE ────────────────────────────────────────────────────────────
  if (blogPost) {
    if (lang === "en") {
      // English: render full article markdown
      const meta = `<p style="font-size:0.875rem;color:#64748b;margin-bottom:1.5rem">
        ${escHtml(blogPost.publishDate || "")} &bull; ${escHtml(blogPost.readTime || "")} &bull; ${escHtml(blogPost.category || "")}
      </p>`;
      richContent += meta;
      richContent += `<article style="text-align:left;max-width:800px;width:100%;line-height:1.75">
        ${markdownToHtml(blogPost.content, 800)}
      </article>`;
      if (blogPost.relatedTools?.length) {
        const links = blogPost.relatedTools.map(t =>
          `<a href="${escHtml(t.path)}" style="color:#E03535;text-decoration:none">${escHtml(t.name)} — ${escHtml(t.description)}</a>`
        ).join("<br>");
        richContent += `<section style="margin:2rem 0;text-align:left;max-width:800px;width:100%">
          <h2 style="font-size:1.2rem;font-weight:700;margin-bottom:0.75rem">Related PDF Tools</h2>
          <div style="display:flex;flex-direction:column;gap:0.5rem">${links}</div>
        </section>`;
      }
    } else {
      // Language pages: render native-language content (how-to + benefits + FAQs)
      // Use the blog title as the "tool name" in templates since it's a guide article
      const articleName = h1Text || blogPost.title || "PDF HUB 24";
      richContent += buildLangToolContent(articleName, lang);
      // Related tools with translated label
      const L = LANG_LABELS[lang];
      if (blogPost.relatedTools?.length && L) {
        const links = blogPost.relatedTools.map(t =>
          `<a href="${escHtml(t.path)}" style="color:#E03535;text-decoration:none">${escHtml(t.name)}</a>`
        ).join(" &bull; ");
        richContent += `<section style="margin:2rem 0;text-align:left;max-width:800px;width:100%">
          <h2 style="font-size:1.2rem;font-weight:700;margin-bottom:0.75rem">${escHtml(L.relatedTools)}</h2>
          <p style="line-height:1.8">${links}</p>
        </section>`;
      }
    }
  }

  // ── PROGRAMMATIC PAGE ────────────────────────────────────────────────────────
  else if (progPage) {
    richContent += `<p style="line-height:1.75;max-width:800px;margin-bottom:1.5rem">${escHtml(progPage.content)}</p>`;
    if (progPage.useCases?.length) {
      const items = progPage.useCases.map(u => `<li style="margin-bottom:0.4rem">${escHtml(u)}</li>`).join("");
      const useCasesLabel = LL ? LL.commonUseCases : "Common Use Cases";
      richContent += `<section style="margin:2rem 0;text-align:left;max-width:800px;width:100%">
        <h2 style="font-size:1.2rem;font-weight:700;margin-bottom:0.75rem">${escHtml(useCasesLabel)}</h2>
        <ul style="padding-left:1.5rem;line-height:1.8">${items}</ul>
      </section>`;
    }
    if (progPage.faqs?.length) {
      const faqs = progPage.faqs.map(f =>
        `<div style="margin-bottom:1rem"><h3 style="font-size:1rem;font-weight:600;margin-bottom:0.25rem">${escHtml(f.question)}</h3><p style="line-height:1.7">${escHtml(f.answer)}</p></div>`
      ).join("");
      const faqLabel = LL ? LL.faq : "Frequently Asked Questions";
      richContent += `<section style="margin:2rem 0;text-align:left;max-width:800px;width:100%">
        <h2 style="font-size:1.2rem;font-weight:700;margin-bottom:0.75rem">${escHtml(faqLabel)}</h2>
        ${faqs}
      </section>`;
    }
  }

  // ── CATEGORY HUB ─────────────────────────────────────────────────────────────
  else if (categoryHub) {
    if (lang === "en") {
      richContent += `<div style="text-align:left;max-width:800px;width:100%;line-height:1.75;margin-bottom:1.5rem">
        ${markdownToHtml(categoryHub.intro, 400)}
      </div>`;
    }
    if (categoryHub.tools?.length) {
      const toolLinks = categoryHub.tools.map(t =>
        `<li style="margin-bottom:0.5rem"><a href="${escHtml(t.path)}" style="color:#E03535;text-decoration:none;font-weight:600">${escHtml(t.name)}</a> — ${escHtml(t.description)}</li>`
      ).join("");
      const availLabel = LL ? LL.availableTools : "Available Tools";
      richContent += `<section style="margin:2rem 0;text-align:left;max-width:800px;width:100%">
        <h2 style="font-size:1.2rem;font-weight:700;margin-bottom:0.75rem">${escHtml(availLabel)}</h2>
        <ul style="padding-left:1.5rem;line-height:1.9">${toolLinks}</ul>
      </section>`;
    }
    if (lang === "en" && categoryHub.faqs?.length) {
      // English: show English FAQ
      const faqs = categoryHub.faqs.map(f =>
        `<div style="margin-bottom:1rem"><h3 style="font-size:1rem;font-weight:600;margin-bottom:0.25rem">${escHtml(f.question)}</h3><p style="line-height:1.7">${escHtml(f.answer)}</p></div>`
      ).join("");
      richContent += `<section style="margin:2rem 0;text-align:left;max-width:800px;width:100%">
        <h2 style="font-size:1.2rem;font-weight:700;margin-bottom:0.75rem">Frequently Asked Questions</h2>
        ${faqs}
      </section>`;
    } else if (lang !== "en") {
      // Language pages: show native-language benefits + FAQs
      richContent += buildLangToolContent(h1Text, lang);
    }
  }

  // ── TOOL PAGE ─────────────────────────────────────────────────────────────────
  else if (toolData) {
    if (lang === "en") {
      // English: render full tool-specific content
      if (toolData.useCases?.items?.length) {
        const items = toolData.useCases.items.map(i => `<li>${escHtml(i)}</li>`).join("");
        richContent += `<section style="margin:2rem 0;text-align:left;max-width:800px;width:100%">
          <h2 style="font-size:1.25rem;font-weight:700;margin-bottom:0.75rem">${escHtml(toolData.useCases.title)}</h2>
          <p style="margin-bottom:0.75rem">${escHtml(toolData.useCases.description)}</p>
          <ul style="padding-left:1.5rem;line-height:1.8">${items}</ul>
        </section>`;
      }
      if (toolData.tutorial?.steps?.length) {
        const steps = toolData.tutorial.steps.map((s) =>
          `<li style="margin-bottom:0.75rem"><strong>${escHtml(s.step)}:</strong> ${escHtml(s.detail)}</li>`
        ).join("");
        richContent += `<section style="margin:2rem 0;text-align:left;max-width:800px;width:100%">
          <h2 style="font-size:1.25rem;font-weight:700;margin-bottom:0.75rem">${escHtml(toolData.tutorial.title)}</h2>
          <ol style="padding-left:1.5rem;line-height:1.8">${steps}</ol>
        </section>`;
      }
      if (toolData.faqs?.length) {
        const faqs = toolData.faqs.map(f =>
          `<div style="margin-bottom:1rem"><h3 style="font-size:1rem;font-weight:600;margin-bottom:0.25rem">${escHtml(f.question)}</h3><p style="line-height:1.7">${escHtml(f.answer)}</p></div>`
        ).join("");
        richContent += `<section style="margin:2rem 0;text-align:left;max-width:800px;width:100%">
          <h2 style="font-size:1.25rem;font-weight:700;margin-bottom:0.75rem">Frequently Asked Questions</h2>
          ${faqs}
        </section>`;
      }
      const realLinks = toolData.internalLinks?.filter(l => !l.href.startsWith("/blog/")) || [];
      if (realLinks.length) {
        const links = realLinks.map(l =>
          `<a href="${escHtml(l.href)}" style="color:#E03535;text-decoration:none;margin-right:1.5rem">${escHtml(l.text)}</a>`
        ).join("");
        richContent += `<nav style="margin:1.5rem 0;text-align:left;max-width:800px;width:100%;flex-wrap:wrap;display:flex;gap:0.5rem">${links}</nav>`;
      }
    } else {
      // Language pages: replace English tool content with full native-language body
      richContent += buildLangToolContent(h1Text.split(" - ")[0] || h1Text, lang);
    }
  }

  // Comprehensive internal link sections — visible to crawlers on ALL pages
  const ALL_TOOLS = [
    { href: "/pdf-to-word", text: "PDF to Word", cat: "Convert from PDF" },
    { href: "/pdf-to-jpg", text: "PDF to JPG", cat: "Convert from PDF" },
    { href: "/pdf-to-png", text: "PDF to PNG", cat: "Convert from PDF" },
    { href: "/pdf-to-excel", text: "PDF to Excel", cat: "Convert from PDF" },
    { href: "/pdf-to-ppt", text: "PDF to PowerPoint", cat: "Convert from PDF" },
    { href: "/word-to-pdf", text: "Word to PDF", cat: "Convert to PDF" },
    { href: "/jpg-to-pdf", text: "JPG to PDF", cat: "Convert to PDF" },
    { href: "/png-to-pdf", text: "PNG to PDF", cat: "Convert to PDF" },
    { href: "/excel-to-pdf", text: "Excel to PDF", cat: "Convert to PDF" },
    { href: "/ppt-to-pdf", text: "PowerPoint to PDF", cat: "Convert to PDF" },
    { href: "/html-to-pdf", text: "HTML to PDF", cat: "Convert to PDF" },
    { href: "/tiff-to-pdf", text: "TIFF to PDF", cat: "Convert to PDF" },
    { href: "/webp-to-pdf", text: "WebP to PDF", cat: "Convert to PDF" },
    { href: "/merge", text: "Merge PDF", cat: "Edit PDF" },
    { href: "/split", text: "Split PDF", cat: "Edit PDF" },
    { href: "/compress", text: "Compress PDF", cat: "Edit PDF" },
    { href: "/rotate", text: "Rotate PDF", cat: "Edit PDF" },
    { href: "/edit-pdf", text: "Edit PDF Text", cat: "Edit PDF" },
    { href: "/annotate-pdf", text: "Annotate PDF", cat: "Edit PDF" },
    { href: "/redact-pdf", text: "Redact PDF", cat: "Edit PDF" },
    { href: "/add-watermark", text: "Add Watermark", cat: "Edit PDF" },
    { href: "/add-page-numbers", text: "Add Page Numbers", cat: "Edit PDF" },
    { href: "/extract-pages", text: "Extract Pages", cat: "Edit PDF" },
    { href: "/delete-pages", text: "Delete Pages", cat: "Edit PDF" },
    { href: "/reorder-pages", text: "Reorder Pages", cat: "Edit PDF" },
    { href: "/resize-pdf", text: "Resize PDF", cat: "Edit PDF" },
    { href: "/crop-pdf", text: "Crop PDF", cat: "Edit PDF" },
    { href: "/flatten-pdf", text: "Flatten PDF", cat: "Edit PDF" },
    { href: "/repair-pdf", text: "Repair PDF", cat: "Edit PDF" },
    { href: "/grayscale-pdf", text: "PDF to Grayscale", cat: "Edit PDF" },
    { href: "/protect-pdf", text: "Protect PDF", cat: "Secure PDF" },
    { href: "/unlock-pdf", text: "Unlock PDF", cat: "Secure PDF" },
    { href: "/sign-pdf", text: "Sign PDF", cat: "Secure PDF" },
    { href: "/ocr-pdf", text: "OCR PDF", cat: "Utility" },
    { href: "/translate-pdf", text: "Translate PDF", cat: "Utility" },
    { href: "/compare-pdf", text: "Compare PDFs", cat: "Utility" },
    { href: "/batch-compress", text: "Batch Compress", cat: "Utility" },
    { href: "/scan-to-pdf", text: "Scan to PDF", cat: "Utility" },
    { href: "/pdf-to-pdfa", text: "PDF to PDF/A", cat: "Utility" },
    { href: "/compress-img", text: "Compress Image", cat: "Image Tools" },
    { href: "/resize-image", text: "Resize Image", cat: "Image Tools" },
    { href: "/crop-image", text: "Crop Image", cat: "Image Tools" },
    { href: "/convert-image", text: "Convert Image", cat: "Image Tools" },
    { href: "/rotate-image", text: "Rotate Image", cat: "Image Tools" },
    { href: "/remove-bg", text: "Remove Background", cat: "Image Tools" },
    { href: "/jpg-to-png", text: "JPG to PNG", cat: "Image Tools" },
    { href: "/png-to-jpg", text: "PNG to JPG", cat: "Image Tools" },
    { href: "/image-to-text", text: "Image to Text", cat: "Image Tools" },
  ];

  const ALL_BLOGS = [
    { href: "/blog/how-to-compress-pdf-for-email", text: "How to Compress PDF for Email" },
    { href: "/blog/convert-pdf-to-word-without-losing-formatting", text: "Convert PDF to Word Without Losing Formatting" },
    { href: "/blog/merge-pdf-files-guide", text: "How to Merge PDF Files Online for Free" },
    { href: "/blog/protect-pdf-with-password", text: "How to Password Protect a PDF" },
    { href: "/blog/pdf-tools-for-students", text: "Essential PDF Tools Every Student Needs" },
    { href: "/blog/how-to-split-pdf-pages", text: "How to Split PDF Pages" },
    { href: "/blog/add-page-numbers-to-pdf", text: "How to Add Page Numbers to PDF" },
    { href: "/blog/convert-images-to-pdf", text: "How to Convert Images to PDF" },
    { href: "/blog/ocr-scanned-pdf-to-text", text: "OCR PDF: Convert Scanned Documents to Text" },
    { href: "/blog/rotate-pdf-pages", text: "How to Rotate PDF Pages" },
    { href: "/blog/sign-pdf-electronically", text: "How to Sign a PDF Electronically" },
    { href: "/blog/edit-pdf-text-images", text: "How to Edit a PDF" },
    { href: "/blog/watermark-pdf-documents", text: "How to Add Watermark to PDF" },
    { href: "/blog/pdf-to-excel-convert-tables", text: "Convert PDF Tables to Excel" },
    { href: "/blog/redact-sensitive-pdf-information", text: "How to Redact Sensitive Information in PDF" },
    { href: "/blog/how-to-flatten-pdf", text: "How to Flatten a PDF" },
    { href: "/blog/crop-pdf-pages-guide", text: "How to Crop PDF Pages" },
    { href: "/blog/resize-pdf-to-a4", text: "How to Resize PDF to A4" },
    { href: "/blog/compare-two-pdf-files", text: "How to Compare Two PDF Files" },
    { href: "/blog/html-to-pdf-conversion", text: "How to Convert HTML to PDF" },
    { href: "/blog/extract-text-from-pdf", text: "How to Extract Text from PDF" },
    { href: "/blog/best-free-pdf-tools-2026", text: "Best Free PDF Tools in 2026" },
    { href: "/blog/pdf-accessibility-guide", text: "Making PDFs Accessible" },
    { href: "/blog/batch-convert-images-to-pdf", text: "Batch Convert Images to PDF" },
    { href: "/blog/unlock-pdf-remove-password", text: "How to Unlock a PDF" },
    { href: "/blog/annotate-pdf-comments", text: "How to Annotate PDF" },
    { href: "/blog/translate-pdf-documents", text: "How to Translate a PDF" },
    { href: "/blog/repair-corrupted-pdf", text: "How to Repair a Corrupted PDF" },
    { href: "/blog/pdf-to-powerpoint-guide", text: "PDF to PowerPoint Guide" },
    { href: "/blog/jpg-to-pdf-guide", text: "How to Convert JPG to PDF" },
    { href: "/blog/compress-images-online", text: "How to Compress Images" },
    { href: "/blog/reorder-pdf-pages", text: "How to Reorder PDF Pages" },
    { href: "/blog/remove-background-from-image", text: "Remove Image Background" },
    { href: "/blog/convert-pdf-to-png", text: "PDF to PNG Guide" },
    { href: "/blog/excel-to-pdf", text: "How to Convert Excel to PDF" },
  ];

  const lnkStyle = `display:inline-block;padding:0.35rem 0.75rem;background:#f1f5f9;color:#1e40af;text-decoration:none;border-radius:4px;font-size:0.875rem;font-weight:500;margin:0.2rem`;

  if (isHome) {
    const toolsByCategory: Record<string, typeof ALL_TOOLS> = {};
    ALL_TOOLS.forEach(t => {
      if (!toolsByCategory[t.cat]) toolsByCategory[t.cat] = [];
      toolsByCategory[t.cat].push(t);
    });
    let homeToolSections = "";
    for (const [cat, tools] of Object.entries(toolsByCategory)) {
      const catLabel = LL ? getLangCatLabel(cat, lang) : cat;
      const toolLinks = tools.map(t => `<a href="${escHtml(t.href)}" style="${lnkStyle}">${escHtml(t.text)}</a>`).join("");
      homeToolSections += `<div style="margin-bottom:1.25rem">
        <h3 style="font-size:0.9rem;font-weight:700;margin-bottom:0.5rem;color:#334155;text-transform:uppercase;letter-spacing:0.05em">${escHtml(catLabel)}</h3>
        <div style="display:flex;flex-wrap:wrap">${toolLinks}</div>
      </div>`;
    }
    const catHubLinks = [
      { href: "/convert-pdf", text: "Convert PDF Tools" },
      { href: "/edit-pdf-tools", text: "Edit PDF Tools" },
      { href: "/compress-pdf-tools", text: "Compress PDF Tools" },
      { href: "/secure-pdf", text: "Secure PDF Tools" },
      { href: "/image-tools", text: "Image Tools" },
    ].map(c => `<a href="${escHtml(c.href)}" style="${lnkStyle}">${escHtml(c.text)}</a>`).join("");
    const blogLinks = ALL_BLOGS.map(b => `<a href="${escHtml(b.href)}" style="${lnkStyle}">${escHtml(b.text)}</a>`).join("");
    const footerLinks = [
      { href: "/all-tools", text: "All PDF Tools" },
      { href: "/blog", text: "Blog & Guides" },
      { href: "/about", text: "About Us" },
      { href: "/contact", text: "Contact" },
      { href: "/pricing", text: "Pricing" },
      { href: "/data-security", text: "Data Security" },
      { href: "/auto-delete", text: "Auto Delete Policy" },
      { href: "/privacy", text: "Privacy Policy" },
      { href: "/terms", text: "Terms of Service" },
      { href: "/write-for-us", text: "Write for Us" },
      { href: "/embed", text: "Embed Widget" },
      { href: "/pdf-comparison-chart", text: "PDF Tool Comparison" },
      { href: "/pdf-file-formats-guide", text: "PDF Formats Guide" },
    ].map(f => `<a href="${escHtml(f.href)}" style="${lnkStyle}">${escHtml(f.text)}</a>`).join("");

    const allToolsLabel = LL ? LL.exploreAll : "All Free PDF & Image Tools";
    const toolCatsLabel = LL ? LL.browseByCategory : "Tool Categories";
    const guidesLabel = LL ? LL.howToGuides : "PDF Guides & Tutorials";

    richContent += `<section style="margin:2.5rem 0 1rem;text-align:left;max-width:900px;width:100%">
      <h2 style="font-size:1.1rem;font-weight:700;margin-bottom:1rem;color:#0f172a">${escHtml(allToolsLabel)}</h2>
      ${homeToolSections}
    </section>
    <section style="margin:2rem 0;text-align:left;max-width:900px;width:100%">
      <h2 style="font-size:1.1rem;font-weight:700;margin-bottom:0.75rem;color:#0f172a">${escHtml(toolCatsLabel)}</h2>
      <div style="display:flex;flex-wrap:wrap">${catHubLinks}</div>
    </section>
    <section style="margin:2rem 0;text-align:left;max-width:900px;width:100%">
      <h2 style="font-size:1.1rem;font-weight:700;margin-bottom:0.75rem;color:#0f172a">${escHtml(guidesLabel)}</h2>
      <div style="display:flex;flex-wrap:wrap">${blogLinks}</div>
    </section>
    <nav style="margin:2rem 0;text-align:left;max-width:900px;width:100%">
      <h2 style="font-size:1.1rem;font-weight:700;margin-bottom:0.75rem;color:#0f172a">${escHtml(LL ? LL.whyChoose : "Company")}</h2>
      <div style="display:flex;flex-wrap:wrap">${footerLinks}</div>
    </nav>`;
  } else {
    const allToolLinks = ALL_TOOLS.filter(t => t.href !== canonicalPath)
      .map(t => `<a href="${escHtml(t.href)}" style="${lnkStyle}">${escHtml(t.text)}</a>`).join("");
    const exploreLabel = LL ? LL.exploreAll : "Explore All Free PDF &amp; Image Tools";
    richContent += `<section style="margin:2.5rem 0 1rem;padding:1.5rem;background:#f8fafc;border-radius:8px;text-align:left;max-width:800px;width:100%">
      <h2 style="font-size:1rem;font-weight:700;margin-bottom:0.75rem;color:#0f172a">${escHtml(exploreLabel)}</h2>
      <div style="display:flex;flex-wrap:wrap;gap:0.35rem">${allToolLinks}</div>
    </section>`;
  }

  // Static HTML pre-render — visible to Google on first-wave crawl
  // Small inline script only applies theme colors (no DOM creation)
  return `<div id="__psr" style="min-height:100vh;display:flex;flex-direction:column;font-family:-apple-system,BlinkMacSystemFont,Inter,sans-serif;background:#ffffff;color:#0f172a">
  <div style="height:56px;border-bottom:1px solid rgba(0,0,0,0.08);display:flex;align-items:center;padding:0 1.5rem">
    <a href="/" style="font-size:1.25rem;font-weight:700;color:#E03535;text-decoration:none">PDF HUB 24</a>
  </div>
  <main style="flex:1;max-width:1024px;margin:0 auto;padding:2.5rem 1.5rem;width:100%">
    <h1 style="font-size:clamp(1.5rem,5vw,2.75rem);font-weight:700;line-height:1.15;margin-bottom:1rem">${escHtml(h1Text)}</h1>
    <p style="font-size:1.05rem;line-height:1.7;margin-bottom:1.5rem;max-width:700px">${escHtml(descText)}</p>
    ${richContent}
  </main>
</div>
<script>(function(){try{var e=document.getElementById('__psr');if(!e)return;var t=localStorage.getItem('theme')||'system';var dk=t==='dark'||(t!=='light'&&window.matchMedia&&window.matchMedia('(prefers-color-scheme:dark)').matches);if(dk){e.style.background='#0a0a0a';e.style.color='#f8fafc';}}catch(err){}})();</script>`;
  } catch (err) {
    console.error("[SEO] generatePreRenderShell error for", canonicalPath, err);
    return "";
  }
}

export function injectSEO(html: string, path: string): string {
  const { lang, canonicalPath } = stripLangPrefix(path);
  const metaTags = generateMetaTags(path);
  const preRenderShell = generatePreRenderShell(canonicalPath, lang);
  const dir = (lang === "ar" || lang === "ur") ? "rtl" : "ltr";
  
  return html
    .replace(/<html([^>]*)>/, `<html lang="${lang}" dir="${dir}">`)
    .replace(/<title>.*?<\/title>/, '')
    .replace(/<meta name="description"[^>]*\/?>/, '')
    .replace(/<link rel="canonical"[^>]*\/?>/, '')
    .replace(/<link rel="alternate"[^>]*\/?>/, '')
    .replace(/<meta name="robots"[^>]*\/?>/, '')
    .replace(/<meta property="og:[^"]*"[^>]*\/?>/g, '')
    .replace(/<meta name="twitter:[^"]*"[^>]*\/?>/g, '')
    .replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/g, '')
    .replace('</head>', `${metaTags}\n  </head>`)
    .replace('<div id="root">', `<div id="root">${preRenderShell}`);
}
