export interface ToolUseCases {
  title: (toolName: string) => string;
  desc: string;
  items: string[];
}

export interface ToolTroubleshooting {
  title: string;
  issues: { problem: string; solution: string }[];
}

// Per-tool translated content. Only useCases/troubleshooting are tool-specific —
// about/faqs/security are legitimately generic across tools (GDPR messaging,
// "is this safe" FAQ, etc.) and stay at the language level below.
export interface ToolSpecificTranslation {
  useCases: ToolUseCases;
  troubleshooting: ToolTroubleshooting;
}

export interface TranslatedToolContent {
  about: (toolName: string) => string;
  tutorial: {
    title: (toolName: string) => string;
    steps: { step: string; detail: string }[];
  };
  faqs: (toolName: string) => { question: string; answer: string }[];
  security: {
    title: string;
    content: string;
    points: string[];
  };

  // NEW: tool-specific useCases/troubleshooting, keyed by tool id (e.g. "add-watermark").
  // Populate incrementally — any tool not present here falls back to
  // defaultUseCases/defaultTroubleshooting below, so pages never break
  // while content is still being written.
  tools?: Partial<Record<string, ToolSpecificTranslation>>;

  // Fallback used only for tools not yet present in `tools` above.
  // Kept generic on purpose — this is the safety net, not the target state.
  defaultUseCases: ToolUseCases;
  defaultTroubleshooting: ToolTroubleshooting;
}

export const TOOL_CONTENT_TRANSLATIONS: Partial<Record<string, TranslatedToolContent>> = {

  es: {
    about: (n) => `Nuestra herramienta ${n} es completamente gratuita y funciona directamente en tu navegador sin necesidad de instalar ningún software. Todos los archivos se protegen con cifrado SSL de 256 bits y se eliminan automáticamente tras el procesamiento, en plena conformidad con el RGPD europeo y la LOPD española. Miles de profesionales en España, México, Argentina, Colombia y Chile confían en PDF HUB 24 para gestionar sus documentos con rapidez y total seguridad.`,
    tools: {
      "add-watermark": {
        useCases: {
          title: (n) => `¿Cuándo añadir una marca de agua a tu PDF?`,
          desc: "Marcar tus documentos PDF sirve para muchos propósitos distintos, desde proteger tu trabajo hasta indicar su estado:",
          items: [
            "Marcar documentos como Confidencial o Uso Interno",
            "Añadir el logotipo de tu empresa a propuestas e informes",
            "Sellar como Borrador los documentos pendientes de aprobación",
            "Identificar PDFs con tu nombre o el de tu negocio",
            "Añadir avisos de copyright a trabajos creativos",
            "Marcar documentos según su estado de aprobación",
            "Proteger imágenes y diseños de un uso no autorizado",
            "Añadir sellos de fecha a documentos con vigencia limitada",
          ],
        },
        troubleshooting: {
          title: "Problemas frecuentes con la marca de agua — y cómo resolverlos",
          issues: [
            { problem: "La marca de agua se ve en pantalla pero desaparece al imprimir", solution: "Suele deberse a que la marca se guardó como anotación y no como parte del contenido de la página. Solución: pasa el PDF por nuestra herramienta Aplanar PDF para fusionar la marca de agua de forma permanente con el contenido. Un PDF aplanado imprimirá la marca de agua de forma fiable en cualquier impresora." },
            { problem: "Añadí una marca «CONFIDENCIAL» pero alguien la eliminó editando el PDF", solution: "Las marcas de agua añadidas como anotaciones se pueden quitar con un editor de PDF básico. Para dificultarlo: usa la opacidad más alta y aplana el PDF con nuestra herramienta Aplanar PDF, que integra la marca como contenido permanente de la página. Para documentos sensibles, combina la marca de agua con protección por contraseña." },
            { problem: "El texto de la marca de agua no tiene la fuente o el estilo que quiero", solution: "Para un control total sobre el aspecto, crea tu marca de agua como imagen: escribe el texto en un editor gráfico (incluso Word o PowerPoint sirve), dale el estilo exacto que buscas, expórtalo como PNG con fondo transparente y súbelo como marca de imagen en lugar de usar la opción de texto." },
            { problem: "La marca de agua tiene un tamaño distinto en cada página", solution: "Si tu PDF mezcla páginas A4, A5 y tamaños personalizados, una marca de tamaño fijo se verá desproporcionada. Usa un ajuste basado en porcentaje si está disponible, o normaliza antes todas las páginas al mismo tamaño con nuestra herramienta Redimensionar PDF." },
          ],
        },
      },
      "compress": {
        useCases: {
          title: (n) => `¿Cuándo comprimir tus archivos PDF?`,
          desc: "Comprimir un PDF es imprescindible en muchas situaciones habituales. Estos son los casos donde más se nota la diferencia:",
          items: [
            "Adjuntos de correo que superan el límite de 25 MB en Gmail o Outlook",
            "Subida de documentos a sedes electrónicas y portales con límite de tamaño",
            "Envío de archivos por WhatsApp, Telegram o Messenger",
            "Liberar espacio de almacenamiento en tu ordenador, móvil o nube",
            "Acelerar la carga de PDFs en páginas web o blogs",
            "Enviar candidaturas de trabajo con CV y portafolio en PDF",
            "Enviar facturas, contratos y documentos legales a clientes",
            "Archivar documentos antiguos para ahorrar espacio en disco",
          ],
        },
        troubleshooting: {
          title: "Por qué tu PDF sigue pesando demasiado — y cómo solucionarlo de verdad",
          issues: [
            { problem: "Lo comprimí y sigue pesando más de 10 MB — el correo lo sigue rechazando", solution: "El peso suele venir de las imágenes, no del texto. Prueba primero con compresión Alta. Si sigue siendo demasiado grande, probablemente el PDF contiene muchas páginas escaneadas o fotos en alta resolución: usa nuestra herramienta Dividir PDF para separarlo en 2-3 documentos más pequeños que sí pasarán el límite de 25 MB de Gmail." },
            { problem: "Las imágenes se ven borrosas o pixeladas tras comprimir — ¿cómo mantengo la calidad?", solution: "La compresión Alta reduce la resolución de imagen de ~150 a ~72 DPI, adecuado para pantalla pero se nota al imprimir. Usa compresión Media para cualquier documento que se vaya a imprimir: reduce el tamaño un 50-60% sin apenas diferencia visible en pantalla." },
            { problem: "Un PDF con fuentes incrustadas comprime menos de lo esperado", solution: "El texto en sí ocupa muy poco y se comprime mínimamente. Si tu PDF es sobre todo texto (contratos, informes), ya era bastante eficiente de partida. Las mayores reducciones vienen de las imágenes — un contrato de 5 MB solo de texto puede quedar en 4,2 MB, y es normal." },
            { problem: "El PDF comprimido pesa igual o más que el original", solution: "Significa que el original ya estaba optimizado — algo habitual en PDFs exportados desde Adobe Acrobat o Word, que aplican su propia compresión. En ese caso, la herramienta devuelve el archivo original sin alterar. Si necesitas un resultado más ligero, prueba a dividir el PDF y compartir solo las páginas relevantes." },
          ],
        },
      },
      "merge": {
        useCases: {
          title: (n) => `¿Cuándo necesitas unir archivos PDF?`,
          desc: "Unir PDFs es esencial para organizar documentos de forma eficiente. Estos son los casos más habituales:",
          items: [
            "Combinar CV, carta de presentación y portafolio en una sola candidatura",
            "Unir varias páginas de facturas en un único documento de cobro",
            "Recomponer las páginas escaneadas de un documento de varias hojas",
            "Crear informes completos a partir de capítulos individuales",
            "Juntar las páginas de un contrato con su página de firmas",
            "Combinar DNI, certificados y formularios para trámites y solicitudes",
            "Unir diapositivas de una presentación exportadas como PDFs sueltos",
            "Agrupar colecciones de fotos o bocetos de diseño en un solo archivo",
          ],
        },
        troubleshooting: {
          title: "Problemas frecuentes al unir PDFs — soluciones concretas",
          issues: [
            { problem: "El archivo unido pesa 80 MB — ¿cómo lo bajo de 25 MB para enviarlo por correo?", solution: "Unir archivos no los comprime, solo los junta: el resultado pesa la suma de todos los originales. Después de unirlos, pasa el resultado por nuestra herramienta Comprimir PDF. Si sigue pesando demasiado, identifica qué archivo de origen es el más pesado (normalmente páginas escaneadas), compímelo por separado primero y luego únelos." },
            { problem: "Las páginas quedan en el orden equivocado en el archivo final", solution: "El orden de unión sigue el orden en que aparecen los archivos en la lista de subida, no el alfabético. Antes de unir, arrastra los archivos hasta el orden que quieras. Si ya descargaste el PDF con el orden incorrecto, no hace falta empezar de nuevo: usa nuestra herramienta Reordenar Páginas sobre el archivo ya unido." },
            { problem: "Uno de mis PDFs se sube pero desaparece de la lista", solution: "Normalmente significa que el archivo tiene contraseña. Incluso una contraseña solo de permisos puede bloquear la unión. Pasa el archivo problemático primero por nuestra herramienta Desbloquear PDF. Si el archivo viene de una aplicación poco común, prueba a abrirlo en el navegador e «imprimir a PDF» para generar una copia limpia." },
            { problem: "Algunas páginas cambian de tipografía después de unir los archivos", solution: "Cada PDF lleva sus propias fuentes incrustadas, y la herramienta de unión las respeta tal cual sin normalizarlas. Si una página se ve distinta, el PDF de origen probablemente usaba una fuente no estándar. La solución es aplanar antes el PDF problemático con nuestra herramienta Aplanar PDF y luego unirlo." },
          ],
        },
      },
    },

    defaultUseCases: {
      title: (n) => `¿Para qué se usa ${n}?`,
      desc: "Ideal para particulares, autónomos, estudiantes, administraciones públicas y empresas que gestionan documentos PDF en su día a día.",
      items: [
        "Contratos laborales, acuerdos comerciales y documentos notariales",
        "Formularios de la Agencia Tributaria, SEPE, Seguridad Social y otros organismos",
        "Facturas electrónicas, presupuestos y albaranes de empresa",
        "Trabajos de fin de grado, tesis doctorales y certificados académicos",
        "Expedientes médicos, informes clínicos y recetas electrónicas",
        "Declaraciones de la renta, nóminas y documentación fiscal",
      ],
    },
    tutorial: {
      title: (n) => `Cómo usar ${n}: guía paso a paso`,
      steps: [
        { step: "Sube tu archivo PDF", detail: "Arrastra el documento a la zona de carga o haz clic en «Seleccionar archivo» para localizarlo en tu dispositivo." },
        { step: "Ajusta las opciones", detail: "Configura los parámetros según tus necesidades: calidad de salida, rango de páginas u otras opciones disponibles." },
        { step: "Procesa el documento", detail: "Pulsa el botón de acción. El procesamiento es inmediato y se realiza en nuestros servidores seguros." },
        { step: "Descarga el resultado", detail: "Descarga tu archivo al instante. Se elimina automáticamente de nuestros servidores a los pocos minutos." },
      ],
    },
    faqs: (n) => [
      { question: `¿Es seguro usar ${n}?`, answer: "Sí, completamente. Todos los archivos se cifran con SSL de 256 bits durante la transferencia y se eliminan automáticamente tras el procesamiento. Nunca accedemos al contenido de tus documentos ni los compartimos con terceros." },
      { question: "¿Necesito registrarme o crear una cuenta?", answer: "No. PDF HUB 24 es 100 % gratuito y no requiere ningún registro. Puedes usar todas las herramientas sin límites, sin marcas de agua y sin necesidad de proporcionar tu dirección de correo." },
      { question: "¿Cumple con el RGPD y la LOPD?", answer: "Sí. Operamos en pleno cumplimiento con el Reglamento General de Protección de Datos (RGPD) de la Unión Europea y la Ley Orgánica de Protección de Datos y Garantía de Derechos Digitales (LOPDGDD) española." },
      { question: `¿Funciona ${n} en dispositivos móviles?`, answer: "Sí. Puedes acceder a PDF HUB 24 desde cualquier dispositivo: ordenadores, tablets y smartphones. La interfaz se adapta perfectamente a todas las resoluciones de pantalla." },
      { question: "¿Hay límite de tamaño en los archivos?", answer: "Aceptamos archivos de hasta 50 MB en la mayoría de herramientas. Para archivos de mayor tamaño, te recomendamos comprimirlos primero con nuestra herramienta de compresión PDF." },
    ],
    defaultTroubleshooting: {
      title: "Solución de problemas habituales",
      issues: [
        { problem: "El archivo PDF no se carga o aparece un mensaje de error", solution: "Comprueba que el archivo no esté protegido con contraseña ni dañado. Si está cifrado, utiliza primero nuestra herramienta para desbloquear PDFs y vuelve a intentarlo." },
        { problem: "El resultado no tiene la calidad esperada", solution: "Aumenta el nivel de calidad en las opciones avanzadas. Para documentos con imágenes de alta resolución, selecciona el modo de calidad máxima disponible." },
      ],
    },
    security: {
      title: "Seguridad y protección de tus datos",
      content: "La privacidad de tus documentos es nuestra máxima prioridad. PDF HUB 24 aplica los más altos estándares de seguridad: cifrado SSL de 256 bits en todas las transferencias, eliminación automática de archivos y pleno cumplimiento con el RGPD y la LOPDGDD española.",
      points: ["Cifrado SSL de 256 bits en todas las conexiones", "Eliminación automática de archivos tras el procesamiento", "Sin almacenamiento permanente ni acceso a contenidos", "Cumplimiento con RGPD (UE) y LOPDGDD (España)"],
    },
  },

  ar: {
    about: (n) => `تتيح لك أداة ${n} معالجة ملفاتك بشكل احترافي وسريع مباشرةً من متصفحك دون الحاجة إلى تثبيت أي برنامج أو إنشاء حساب. نحمي ملفاتك بتشفير SSL بقوة 256 بت ونحذفها تلقائياً بعد المعالجة وفقاً للوائح حماية البيانات الدولية. يثق بـ PDF HUB 24 آلاف المستخدمين في المملكة العربية السعودية ومصر والإمارات والأردن وسائر الدول العربية للتعامل مع وثائقهم اليومية بثقة وأمان.`,
    tools: {
      // TODO: add tool-specific entries here (see add-watermark/compress/merge in `es` for the pattern)
    },

    defaultUseCases: {
      title: (n) => `متى تستخدم ${n}؟`,
      desc: "هذه الأداة مثالية للأفراد والطلاب والشركات والمؤسسات الحكومية التي تتعامل مع ملفات PDF بشكل يومي في بيئة العمل.",
      items: [
        "العقود التجارية والاتفاقيات القانونية والوثائق الرسمية",
        "نماذج الجهات الحكومية والمعاملات الإدارية والتراخيص",
        "الفواتير والعروض التجارية والتقارير المالية ربع السنوية",
        "الأبحاث الجامعية والرسائل العلمية وشهادات التخرج",
        "السجلات الطبية وتقارير الفحوصات والوصفات الطبية الإلكترونية",
        "الوثائق الشخصية كالهوية الوطنية وجواز السفر وتصاريح الإقامة",
      ],
    },
    tutorial: {
      title: (n) => `كيفية استخدام ${n} خطوة بخطوة`,
      steps: [
        { step: "رفع الملف", detail: "اسحب ملف PDF وأفلته في منطقة الرفع، أو انقر على «اختر الملف» للبحث عنه في جهازك." },
        { step: "ضبط الإعدادات", detail: "اختر الخيارات المناسبة لاحتياجاتك مثل جودة الإخراج أو نطاق الصفحات أو غيرها من الخيارات المتاحة." },
        { step: "بدء المعالجة", detail: "انقر على زر التنفيذ وانتظر لحظات قليلة ريثما تتم المعالجة على خوادمنا الآمنة." },
        { step: "تحميل النتيجة", detail: "بمجرد اكتمال المعالجة، يمكنك تحميل ملفك فوراً. يُحذف الملف تلقائياً من خوادمنا بعد دقائق قليلة." },
      ],
    },
    faqs: (n) => [
      { question: `هل ${n} آمنة للاستخدام؟`, answer: "نعم، تماماً. تُشفَّر جميع الملفات بتشفير SSL بقوة 256 بت خلال النقل وتُحذف تلقائياً من خوادمنا فور اكتمال المعالجة. لا نطّلع أبداً على محتوى مستنداتك ولا نشاركها مع أي طرف ثالث." },
      { question: "هل أحتاج إلى إنشاء حساب أو التسجيل؟", answer: "لا. PDF HUB 24 مجاني بالكامل ولا يتطلب أي تسجيل. يمكنك استخدام جميع الأدوات دون قيود ودون علامات مائية ودون الحاجة إلى تقديم بريدك الإلكتروني." },
      { question: "هل تلتزم المنصة بأنظمة حماية البيانات العربية والدولية؟", answer: "نعم. نلتزم بأعلى معايير حماية البيانات الدولية بما فيها اللائحة الأوروبية GDPR، كما نتوافق مع أنظمة حماية البيانات في دول الخليج ومنطقة الشرق الأوسط وشمال أفريقيا." },
      { question: `هل تعمل ${n} على الأجهزة المحمولة؟`, answer: "نعم. يمكنك الوصول إلى PDF HUB 24 من أي جهاز سواء كان حاسوباً أو لوحياً أو هاتفاً ذكياً. تتكيف الواجهة تلقائياً مع جميع أحجام الشاشات بما فيها شاشات الهواتف الصغيرة." },
      { question: "هل هناك حد أقصى لحجم الملفات؟", answer: "نقبل ملفات يصل حجمها إلى 100 ميجابايت في معظم الأدوات. إذا كان ملفك أكبر من ذلك، يمكنك استخدام أداة ضغط PDF لتصغيره أولاً ثم معالجته بسهولة." },
    ],
    defaultTroubleshooting: {
      title: "حل المشكلات الشائعة",
      issues: [
        { problem: "تعذّر رفع الملف أو ظهور رسالة خطأ", solution: "تأكد من أن الملف غير محمي بكلمة مرور وغير تالف. إذا كان مشفراً، استخدم أداة إلغاء حماية PDF أولاً ثم أعد المحاولة." },
        { problem: "جودة الملف الناتج غير مرضية", solution: "جرّب رفع مستوى جودة الإخراج في الإعدادات المتقدمة. للمستندات التي تحتوي على صور عالية الدقة، اختر وضع الجودة القصوى." },
      ],
    },
    security: {
      title: "الأمان وحماية بياناتك",
      content: "حماية مستنداتك هي أولويتنا القصوى. تعتمد PDF HUB 24 أعلى معايير الأمان: تشفير SSL بقوة 256 بت في جميع عمليات النقل، وحذف تلقائي للملفات فور انتهاء المعالجة، والالتزام الكامل بأنظمة حماية البيانات الدولية.",
      points: ["تشفير SSL بقوة 256 بت في جميع الاتصالات", "حذف تلقائي للملفات فور اكتمال المعالجة", "بدون تخزين دائم أو اطلاع على المحتوى", "الامتثال للوائح حماية البيانات الدولية (GDPR)"],
    },
  },

  hi: {
    about: (n) => `${n} टूल बिना कोई सॉफ़्टवेयर इंस्टॉल किए सीधे आपके ब्राउज़र में काम करता है। आपकी फ़ाइलें 256-बिट SSL एन्क्रिप्शन से सुरक्षित रहती हैं और प्रोसेसिंग के बाद स्वचालित रूप से डिलीट हो जाती हैं — भारत के डिजिटल पर्सनल डेटा प्रोटेक्शन एक्ट 2023 (DPDPA) और अंतरराष्ट्रीय मानकों के अनुरूप। PDF HUB 24 पर भारत, पाकिस्तान और दक्षिण एशिया के हजारों छात्रों, सरकारी कर्मचारियों और व्यवसायियों का भरोसा है।`,
    tools: {
      // TODO: add tool-specific entries here (see add-watermark/compress/merge in `es` for the pattern)
    },

    defaultUseCases: {
      title: (n) => `${n} का उपयोग कब करें?`,
      desc: "यह टूल व्यक्तिगत उपयोगकर्ताओं, छात्रों, सरकारी कर्मचारियों, वकीलों और व्यवसायों के लिए अत्यंत उपयोगी है।",
      items: [
        "आधार कार्ड, पैन कार्ड और अन्य सरकारी पहचान दस्तावेज़",
        "नौकरी आवेदन, रोजगार अनुबंध और ऑफर लेटर",
        "GST चालान, आयकर रिटर्न और बैंक स्टेटमेंट",
        "B.Tech/M.Tech थीसिस, प्रोजेक्ट रिपोर्ट और मार्कशीट",
        "मेडिकल रिकॉर्ड, लैब रिपोर्ट और डॉक्टरी प्रिस्क्रिप्शन",
        "व्यावसायिक प्रस्ताव, कोटेशन और GST इनवॉइस",
      ],
    },
    tutorial: {
      title: (n) => `${n} का उपयोग कैसे करें: चरण-दर-चरण गाइड`,
      steps: [
        { step: "फ़ाइल अपलोड करें", detail: "अपनी PDF फ़ाइल को अपलोड क्षेत्र में ड्रैग और ड्रॉप करें, या 'फ़ाइल चुनें' बटन पर क्लिक करके अपने डिवाइस से खोजें।" },
        { step: "विकल्प सेट करें", detail: "अपनी आवश्यकता के अनुसार गुणवत्ता स्तर, पृष्ठ श्रेणी या अन्य उपलब्ध विकल्प चुनें।" },
        { step: "प्रोसेस करें", detail: "मुख्य बटन पर क्लिक करें और हमारे सुरक्षित सर्वर पर कुछ सेकंड में प्रोसेसिंग पूरी होने का इंतजार करें।" },
        { step: "डाउनलोड करें", detail: "प्रोसेसिंग पूरी होते ही तुरंत अपनी फ़ाइल डाउनलोड करें। फ़ाइल कुछ मिनटों बाद सर्वर से स्वचालित रूप से हटा दी जाती है।" },
      ],
    },
    faqs: (n) => [
      { question: `क्या ${n} सुरक्षित है?`, answer: "हाँ, बिल्कुल। सभी फ़ाइलें ट्रांसफर के दौरान 256-बिट SSL एन्क्रिप्शन से सुरक्षित रहती हैं और प्रोसेसिंग के बाद स्वचालित रूप से डिलीट हो जाती हैं। हम आपके दस्तावेज़ों की सामग्री कभी नहीं देखते और न ही किसी तीसरे पक्ष से साझा करते हैं।" },
      { question: "क्या मुझे अकाउंट बनाना होगा?", answer: "नहीं। PDF HUB 24 पूरी तरह मुफ़्त है और किसी रजिस्ट्रेशन की ज़रूरत नहीं। बिना किसी सीमा के, बिना वॉटरमार्क के, और बिना ईमेल दिए सभी टूल का उपयोग करें।" },
      { question: "क्या यह DPDPA 2023 का पालन करता है?", answer: "हाँ। हम भारत के डिजिटल पर्सनल डेटा प्रोटेक्शन एक्ट 2023 (DPDPA) और IT Act 2000 के प्रावधानों के साथ-साथ अंतरराष्ट्रीय GDPR मानकों का पालन करते हैं।" },
      { question: `${n} मोबाइल पर काम करता है?`, answer: "हाँ। PDF HUB 24 Android और iOS स्मार्टफोन, टैबलेट और कंप्यूटर — सभी डिवाइस पर बेहतरीन तरीके से काम करता है। किसी ऐप को इंस्टॉल करने की ज़रूरत नहीं।" },
      { question: "फ़ाइल का अधिकतम आकार क्या है?", answer: "अधिकांश टूल में 50 MB तक की फ़ाइलें स्वीकार की जाती हैं। बड़ी फ़ाइलों के लिए पहले हमारे PDF Compress टूल का उपयोग करके फ़ाइल का आकार कम करें।" },
    ],
    defaultTroubleshooting: {
      title: "सामान्य समस्याओं का समाधान",
      issues: [
        { problem: "फ़ाइल अपलोड नहीं हो रही या त्रुटि दिख रही है", solution: "जाँचें कि फ़ाइल पासवर्ड से सुरक्षित या खराब तो नहीं है। पासवर्ड वाली PDF के लिए पहले Unlock PDF टूल का उपयोग करें।" },
        { problem: "परिणाम की गुणवत्ता संतोषजनक नहीं है", solution: "Advanced Options में जाकर Quality Level को High या Maximum पर सेट करें। इमेज वाले दस्तावेज़ों के लिए उच्च रिज़ॉल्यूशन मोड चुनें।" },
      ],
    },
    security: {
      title: "आपके डेटा की सुरक्षा",
      content: "PDF HUB 24 पर आपके दस्तावेज़ों की गोपनीयता हमारी सर्वोच्च प्राथमिकता है। सभी फ़ाइल ट्रांसफर 256-बिट SSL एन्क्रिप्शन से सुरक्षित हैं, DPDPA 2023 और IT Act 2000 का पालन किया जाता है, और प्रोसेसिंग के बाद फ़ाइलें स्वचालित रूप से हटा दी जाती हैं।",
      points: ["256-बिट SSL एन्क्रिप्शन", "प्रोसेसिंग के बाद स्वचालित डेटा डिलीशन", "कोई स्थायी संग्रहण नहीं", "DPDPA 2023 और GDPR अनुपालन"],
    },
  },

  fr: {
    about: (n) => `L'outil ${n} fonctionne entièrement dans votre navigateur, sans installation de logiciel ni création de compte. Vos fichiers sont protégés par un chiffrement SSL 256 bits et supprimés automatiquement après traitement, en pleine conformité avec le RGPD et la loi française Informatique et Libertés. Des milliers d'utilisateurs en France, en Belgique, en Suisse, au Canada et dans toute la Francophonie font confiance à PDF HUB 24 pour gérer leurs documents professionnels et personnels.`,
    tools: {
      // TODO: add tool-specific entries here (see add-watermark/compress/merge in `es` for the pattern)
    },

    defaultUseCases: {
      title: (n) => `À quoi sert ${n} ?`,
      desc: "Conçu pour les particuliers, les professionnels libéraux, les administrations publiques et les entreprises qui traitent des fichiers PDF au quotidien.",
      items: [
        "Contrats de travail, actes notariés et documents juridiques",
        "Formulaires Cerfa, démarches en ligne et documents administratifs",
        "Factures, devis, bons de commande et documents comptables",
        "Mémoires de master, thèses de doctorat et diplômes d'État",
        "Dossiers médicaux, ordonnances et comptes-rendus de consultation",
        "Déclarations fiscales, avis d'imposition et fiches de paie",
      ],
    },
    tutorial: {
      title: (n) => `Comment utiliser ${n} : guide étape par étape`,
      steps: [
        { step: "Importez votre fichier", detail: "Glissez-déposez votre document PDF dans la zone prévue, ou cliquez sur « Sélectionner un fichier » pour le parcourir depuis votre appareil." },
        { step: "Paramétrez l'outil", detail: "Ajustez les options disponibles selon vos besoins : qualité d'export, plage de pages, orientation ou autres paramètres spécifiques." },
        { step: "Lancez le traitement", detail: "Cliquez sur le bouton d'action. Le traitement s'effectue en quelques secondes sur nos serveurs sécurisés basés en Europe." },
        { step: "Téléchargez le résultat", detail: "Votre fichier traité est immédiatement disponible. Il est supprimé automatiquement de nos serveurs après quelques minutes." },
      ],
    },
    faqs: (n) => [
      { question: `L'utilisation de ${n} est-elle sécurisée ?`, answer: "Oui, absolument. Tous les fichiers sont chiffrés en transit via SSL 256 bits et supprimés automatiquement de nos serveurs après le traitement. Nous n'accédons jamais au contenu de vos documents et ne les partageons avec aucun tiers." },
      { question: "Faut-il créer un compte ou s'inscrire ?", answer: "Non. PDF HUB 24 est entièrement gratuit et ne nécessite aucune inscription. Vous pouvez utiliser tous les outils sans limite, sans filigrane et sans fournir votre adresse e-mail." },
      { question: `${n} est-il conforme au RGPD ?`, answer: "Oui. Nous opérons en pleine conformité avec le Règlement Général sur la Protection des Données (RGPD) de l'Union Européenne et la loi française Informatique et Libertés modifiée." },
      { question: `Puis-je utiliser ${n} sur mobile ?`, answer: "Oui. PDF HUB 24 fonctionne parfaitement sur tous les appareils : ordinateurs, tablettes et smartphones. L'interface s'adapte à toutes les tailles d'écran sans nécessiter d'application dédiée." },
      { question: "Y a-t-il une limite de taille de fichier ?", answer: "Nous acceptons des fichiers jusqu'à 100 Mo pour la plupart des outils. Pour les fichiers plus volumineux, commencez par les compresser avec notre outil de compression PDF." },
    ],
    defaultTroubleshooting: {
      title: "Résolution des problèmes courants",
      issues: [
        { problem: "Le fichier PDF ne se charge pas ou une erreur s'affiche", solution: "Vérifiez que le fichier n'est pas protégé par un mot de passe et qu'il n'est pas corrompu. Si le PDF est chiffré, utilisez d'abord notre outil de déverrouillage, puis réessayez." },
        { problem: "La qualité du résultat n'est pas satisfaisante", solution: "Augmentez le niveau de qualité dans les options avancées. Pour les documents contenant des images haute résolution, sélectionnez le mode qualité maximale." },
      ],
    },
    security: {
      title: "Sécurité et protection de vos données",
      content: "La confidentialité de vos documents est notre priorité absolue. PDF HUB 24 applique les normes de sécurité les plus strictes : chiffrement SSL 256 bits, suppression automatique des fichiers et conformité totale avec le RGPD et la loi Informatique et Libertés.",
      points: ["Chiffrement SSL 256 bits pour toutes les connexions", "Suppression automatique des fichiers après traitement", "Aucun stockage permanent ni accès au contenu", "Conformité RGPD (UE) et loi Informatique et Libertés (France)"],
    },
  },

  pt: {
    about: (n) => `A ferramenta ${n} funciona diretamente no seu navegador, sem precisar instalar nenhum software ou criar uma conta. Seus arquivos são protegidos com criptografia SSL de 256 bits e excluídos automaticamente após o processamento, em total conformidade com a Lei Geral de Proteção de Dados (LGPD) do Brasil. Milhares de usuários no Brasil, Portugal, Angola e em toda a comunidade lusófona confiam no PDF HUB 24 para gerenciar seus documentos com rapidez e segurança.`,
    tools: {
      "add-watermark": {
        useCases: {
          title: (n) => `Quando adicionar marca d'água a um PDF?`,
          desc: "Marcar seus documentos PDF serve para diversos propósitos, desde proteger seu trabalho até indicar o status do arquivo:",
          items: [
            "Marcar documentos como Confidencial ou Uso Interno",
            "Adicionar a logomarca da empresa a propostas e relatórios",
            "Carimbar como Rascunho documentos pendentes de aprovação",
            "Identificar PDFs com seu nome ou o da sua empresa",
            "Adicionar avisos de direitos autorais a trabalhos criativos",
            "Marcar documentos conforme o status de aprovação",
            "Proteger imagens e designs contra uso não autorizado",
            "Adicionar carimbo de data em documentos com prazo de validade",
          ],
        },
        troubleshooting: {
          title: "Problemas comuns com marca d'água — e como resolver",
          issues: [
            { problem: "A marca d'água aparece na tela mas some ao imprimir", solution: "Geralmente acontece porque a marca foi salva como anotação, e não como parte do conteúdo da página. Solução: passe o PDF pela nossa ferramenta Achatar PDF para fundir a marca d'água permanentemente ao conteúdo. Um PDF achatado imprime a marca d'água de forma confiável em qualquer impressora." },
            { problem: "Adicionei uma marca 'CONFIDENCIAL' mas alguém removeu editando o PDF", solution: "Marcas d'água adicionadas como anotações podem ser removidas com um editor de PDF básico. Para dificultar: use a opacidade máxima e achate o PDF com nossa ferramenta Achatar PDF, que incorpora a marca como conteúdo permanente da página. Para documentos sensíveis, combine a marca d'água com proteção por senha." },
            { problem: "O texto da marca d'água não está na fonte ou estilo que eu quero", solution: "Para controle total da aparência, crie sua marca d'água como imagem: digite o texto em um editor gráfico (até o Word ou PowerPoint servem), estilize como quiser, exporte como PNG com fundo transparente e faça upload dessa imagem em vez de usar a opção de texto." },
            { problem: "A marca d'água tem um tamanho diferente em cada página", solution: "Se seu PDF mistura páginas A4, A5 e tamanhos personalizados, uma marca de tamanho fixo vai aparecer desproporcional. Use um ajuste baseado em porcentagem se disponível, ou normalize antes todas as páginas para o mesmo tamanho com nossa ferramenta Redimensionar PDF." },
          ],
        },
      },
      "compress": {
        useCases: {
          title: (n) => `Quando comprimir seus arquivos PDF?`,
          desc: "Comprimir um PDF é essencial em muitas situações do dia a dia. Veja os casos em que isso faz mais diferença:",
          items: [
            "Anexos de e-mail que ultrapassam o limite de 25 MB do Gmail ou Outlook",
            "Envio de documentos a portais governamentais com limite de tamanho",
            "Compartilhamento de arquivos via WhatsApp, Telegram ou Messenger",
            "Liberar espaço de armazenamento no computador, celular ou nuvem",
            "Acelerar o carregamento de PDFs em sites e blogs",
            "Enviar candidaturas de emprego com currículo e portfólio em PDF",
            "Enviar faturas, contratos e documentos jurídicos a clientes",
            "Arquivar documentos antigos para economizar espaço em disco",
          ],
        },
        troubleshooting: {
          title: "Por que seu PDF continua pesado — e como resolver de verdade",
          issues: [
            { problem: "Comprimi e ainda passa de 10 MB — o e-mail continua recusando", solution: "O peso geralmente vem das imagens, não do texto. Tente primeiro a compressão Alta. Se ainda estiver grande, o PDF provavelmente tem muitas páginas escaneadas ou fotos em alta resolução: use nossa ferramenta Dividir PDF para separar em 2-3 documentos menores que passarão no limite de 25 MB do Gmail." },
            { problem: "As imagens ficam borradas ou pixeladas após comprimir — como manter a qualidade?", solution: "A compressão Alta reduz a resolução de imagem de ~150 para ~72 DPI, ok para tela mas visível na impressão. Use compressão Média para qualquer documento que será impresso: reduz o tamanho em 50-60% com pouquíssima diferença visível na tela." },
            { problem: "Um PDF com fontes incorporadas comprime menos do que eu esperava", solution: "O texto em si ocupa muito pouco espaço e se comprime minimamente. Se seu PDF é majoritariamente texto (contratos, relatórios), ele já era bastante eficiente. Os maiores ganhos vêm das imagens — um contrato de 5 MB só de texto pode ficar em 4,2 MB, e isso é normal." },
            { problem: "O PDF comprimido ficou do mesmo tamanho ou maior que o original", solution: "Isso significa que o original já estava otimizado — comum em PDFs exportados do Adobe Acrobat ou Word, que aplicam sua própria compressão. Nesse caso, a ferramenta devolve o arquivo original sem alterações. Se precisar de um resultado menor, tente dividir o PDF e compartilhar só as páginas relevantes." },
          ],
        },
      },
      "merge": {
        useCases: {
          title: (n) => `Quando você precisa juntar arquivos PDF?`,
          desc: "Juntar PDFs é essencial para organizar documentos com eficiência. Veja os casos mais comuns:",
          items: [
            "Combinar currículo, carta de apresentação e portfólio em uma candidatura só",
            "Juntar várias páginas de faturas em um único documento de cobrança",
            "Recompor as páginas escaneadas de um documento de várias folhas",
            "Criar relatórios completos a partir de capítulos individuais",
            "Juntar as páginas de um contrato com a página de assinaturas",
            "Combinar RG, certidões e formulários para trâmites e solicitações",
            "Juntar slides de apresentação exportados como PDFs separados",
            "Agrupar coleções de fotos ou rascunhos de design em um único arquivo",
          ],
        },
        troubleshooting: {
          title: "Problemas comuns ao juntar PDFs — soluções concretas",
          issues: [
            { problem: "O arquivo juntado ficou com 80 MB — como reduzir para menos de 25 MB para enviar por e-mail?", solution: "Juntar arquivos não comprime, apenas une: o resultado pesa a soma de todos os originais. Depois de juntar, passe o resultado pela nossa ferramenta Comprimir PDF. Se ainda estiver muito grande, identifique qual arquivo de origem é o mais pesado (geralmente páginas escaneadas), comprima-o separadamente primeiro e depois junte." },
            { problem: "As páginas ficam na ordem errada no arquivo final", solution: "A ordem de junção segue a ordem em que os arquivos aparecem na lista de upload, não a ordem alfabética. Antes de juntar, arraste os arquivos até a ordem desejada. Se você já baixou o PDF com a ordem errada, não precisa recomeçar: use nossa ferramenta Reordenar Páginas no arquivo já juntado." },
            { problem: "Um dos meus PDFs faz upload mas some da lista", solution: "Geralmente significa que o arquivo tem senha. Mesmo uma senha só de permissões pode bloquear a junção. Passe o arquivo problemático primeiro pela nossa ferramenta Desbloquear PDF. Se o arquivo veio de um aplicativo incomum, tente abri-lo no navegador e 'imprimir como PDF' para gerar uma cópia limpa." },
            { problem: "Algumas páginas mudam de fonte depois de juntar os arquivos", solution: "Cada PDF traz suas próprias fontes incorporadas, e a ferramenta de junção as preserva sem normalizar. Se uma página parece diferente, o PDF de origem provavelmente usava uma fonte não padrão. A solução é achatar antes o PDF problemático com nossa ferramenta Achatar PDF e depois juntá-lo." },
          ],
        },
      },
    },

    defaultUseCases: {
      title: (n) => `Para que serve ${n}?`,
      desc: "Ideal para pessoas físicas, autônomos, empresas, escritórios de advocacia e órgãos públicos que lidam com arquivos PDF no dia a dia.",
      items: [
        "Contratos de trabalho CLT, acordos comerciais e documentos jurídicos",
        "Formulários da Receita Federal, INSS, DETRAN e outros órgãos",
        "Notas fiscais eletrônicas (NF-e), orçamentos e relatórios contábeis",
        "TCCs, dissertações de mestrado, teses de doutorado e certificados",
        "Prontuários médicos, laudos, receituários e exames laboratoriais",
        "Documentos pessoais como CPF, RG, CNH e comprovante de residência",
      ],
    },
    tutorial: {
      title: (n) => `Como usar ${n}: passo a passo`,
      steps: [
        { step: "Envie o arquivo", detail: "Arraste e solte o arquivo PDF na área de upload ou clique em 'Selecionar arquivo' para buscá-lo no seu dispositivo." },
        { step: "Configure as opções", detail: "Ajuste os parâmetros disponíveis conforme sua necessidade: qualidade de saída, intervalo de páginas ou outras configurações específicas." },
        { step: "Processe o documento", detail: "Clique no botão de ação principal e aguarde poucos segundos enquanto o processamento ocorre nos nossos servidores seguros." },
        { step: "Baixe o resultado", detail: "Assim que o processamento terminar, baixe seu arquivo imediatamente. Ele é excluído automaticamente do servidor após alguns minutos." },
      ],
    },
    faqs: (n) => [
      { question: `${n} é seguro de usar?`, answer: "Sim, completamente. Todos os arquivos são protegidos com criptografia SSL de 256 bits durante a transferência e excluídos automaticamente dos nossos servidores após o processamento. Nunca acessamos o conteúdo dos seus documentos." },
      { question: "Preciso criar uma conta ou me cadastrar?", answer: "Não. O PDF HUB 24 é 100% gratuito e não exige nenhum cadastro. Você pode usar todas as ferramentas sem limites, sem marcas d'água e sem precisar informar seu e-mail." },
      { question: `${n} está em conformidade com a LGPD?`, answer: "Sim. Operamos em total conformidade com a Lei Geral de Proteção de Dados (LGPD) — Lei nº 13.709/2018 — e com as normas internacionais do GDPR europeu, garantindo a máxima proteção dos seus dados pessoais." },
      { question: `Posso usar ${n} no celular?`, answer: "Sim. O PDF HUB 24 funciona perfeitamente em celulares Android e iOS, tablets e computadores. A interface se adapta automaticamente ao tamanho da tela sem necessidade de instalar nenhum aplicativo." },
      { question: "Qual é o tamanho máximo do arquivo?", answer: "Aceitamos arquivos de até 50 MB na maioria das ferramentas. Para arquivos maiores, recomendamos usar primeiro a ferramenta de compressão de PDF disponível em nossa plataforma." },
    ],
    defaultTroubleshooting: {
      title: "Solução de problemas comuns",
      issues: [
        { problem: "O arquivo PDF não carrega ou exibe uma mensagem de erro", solution: "Verifique se o arquivo não está protegido por senha ou corrompido. Se estiver criptografado, use primeiro a ferramenta para desbloquear PDF e depois tente novamente." },
        { problem: "A qualidade do resultado não está satisfatória", solution: "Tente aumentar o nível de qualidade nas opções avançadas. Para documentos com imagens em alta resolução, selecione o modo de qualidade máxima disponível." },
      ],
    },
    security: {
      title: "Segurança e proteção dos seus dados",
      content: "A privacidade dos seus documentos é nossa prioridade máxima. O PDF HUB 24 aplica os mais altos padrões de segurança: criptografia SSL de 256 bits em todas as transferências, exclusão automática de arquivos após o processamento e conformidade com a LGPD brasileira e o GDPR europeu.",
      points: ["Criptografia SSL de 256 bits em todas as conexões", "Exclusão automática dos arquivos após o processamento", "Sem armazenamento permanente ou acesso ao conteúdo", "Conformidade com LGPD (Brasil) e GDPR (UE)"],
    },
  },

  de: {
    about: (n) => `Das ${n}-Tool funktioniert direkt in Ihrem Browser — ohne Software-Installation oder Kontoerstellung. Alle Dateien werden mit 256-Bit-SSL-Verschlüsselung gesichert und nach der Verarbeitung automatisch gelöscht, in vollständiger Konformität mit der DSGVO und dem deutschen Bundesdatenschutzgesetz (BDSG). Tausende Nutzer in Deutschland, Österreich und der Schweiz vertrauen PDF HUB 24 täglich für ihre geschäftlichen und privaten Dokumente.`,
    tools: {
      // TODO: add tool-specific entries here (see add-watermark/compress/merge in `es` for the pattern)
    },

    defaultUseCases: {
      title: (n) => `Wofür wird ${n} verwendet?`,
      desc: "Dieses Tool ist ideal für Privatpersonen, Freiberufler, Unternehmen und Behörden, die täglich mit PDF-Dokumenten arbeiten.",
      items: [
        "Arbeitsverträge, Handelsverträge und notarielle Urkunden",
        "Behördenformulare (Finanzamt, BAMF, Jobcenter) und Verwaltungsdokumente",
        "Rechnungen, Angebote, Lieferscheine und steuerrelevante Belege",
        "Abschlussarbeiten, Dissertationen und akademische Zeugnisse",
        "Arztbriefe, Rezepte, Laborbefunde und Krankenhausentlassungsberichte",
        "Steuererklärungen, Gehaltsabrechnungen und Kontoauszüge",
      ],
    },
    tutorial: {
      title: (n) => `${n} verwenden: Schritt-für-Schritt-Anleitung`,
      steps: [
        { step: "Datei hochladen", detail: "Ziehen Sie Ihre PDF-Datei per Drag & Drop in den Upload-Bereich oder klicken Sie auf „Datei auswählen”, um sie auf Ihrem Gerät zu suchen." },
        { step: "Einstellungen anpassen", detail: "Konfigurieren Sie die verfügbaren Optionen nach Ihren Anforderungen: Ausgabequalität, Seitenbereich oder weitere Parameter." },
        { step: "Verarbeitung starten", detail: "Klicken Sie auf die Schaltfläche und warten Sie wenige Sekunden — die Verarbeitung erfolgt auf unseren sicheren Servern." },
        { step: "Ergebnis herunterladen", detail: "Nach der Verarbeitung steht Ihre Datei sofort zum Download bereit. Sie wird automatisch nach einigen Minuten von unseren Servern gelöscht." },
      ],
    },
    faqs: (n) => [
      { question: `Ist ${n} sicher zu verwenden?`, answer: "Ja, absolut. Alle Dateien werden während der Übertragung mit 256-Bit-SSL-Verschlüsselung gesichert und automatisch nach der Verarbeitung von unseren Servern gelöscht. Wir greifen niemals auf den Inhalt Ihrer Dokumente zu und geben ihn nicht weiter." },
      { question: "Muss ich ein Konto erstellen oder mich registrieren?", answer: "Nein. PDF HUB 24 ist vollständig kostenlos und erfordert keine Registrierung. Nutzen Sie alle Tools ohne Einschränkungen, ohne Wasserzeichen und ohne Angabe Ihrer E-Mail-Adresse." },
      { question: `Ist ${n} DSGVO-konform?`, answer: "Ja. Wir betreiben unsere Dienste in vollständiger Konformität mit der Datenschutz-Grundverordnung (DSGVO) der Europäischen Union sowie dem deutschen Bundesdatenschutzgesetz (BDSG n. F.)." },
      { question: `Funktioniert ${n} auf Mobilgeräten?`, answer: "Ja. PDF HUB 24 ist vollständig responsiv und funktioniert auf Smartphones, Tablets und Computern mit jedem modernen Browser — ohne App-Installation." },
      { question: "Gibt es eine maximale Dateigröße?", answer: "Wir akzeptieren Dateien bis zu 50 MB bei den meisten Tools. Für größere Dateien empfehlen wir, diese zunächst mit unserem PDF-Komprimierungstool zu verkleinern." },
    ],
    defaultTroubleshooting: {
      title: "Häufige Probleme und Lösungen",
      issues: [
        { problem: "Die PDF-Datei lässt sich nicht hochladen oder eine Fehlermeldung erscheint", solution: "Prüfen Sie, ob die Datei passwortgeschützt oder beschädigt ist. Bei verschlüsselten PDFs nutzen Sie zunächst unser PDF-Entsperrungstool und versuchen Sie es danach erneut." },
        { problem: "Die Ausgabequalität entspricht nicht den Erwartungen", solution: "Erhöhen Sie den Qualitätswert in den erweiterten Einstellungen. Für Dokumente mit hochauflösenden Bildern wählen Sie den Modus „Maximale Qualität”." },
      ],
    },
    security: {
      title: "Datensicherheit und Datenschutz",
      content: "Der Schutz Ihrer Dokumente hat bei uns höchste Priorität. PDF HUB 24 setzt auf die höchsten Sicherheitsstandards: 256-Bit-SSL-Verschlüsselung bei allen Übertragungen, automatische Dateilöschung nach der Verarbeitung und vollständige Konformität mit DSGVO und BDSG.",
      points: ["256-Bit-SSL-Verschlüsselung bei allen Verbindungen", "Automatische Dateilöschung nach der Verarbeitung", "Kein dauerhafter Speicher oder Inhaltszugriff", "Konformität mit DSGVO (EU) und BDSG (Deutschland)"],
    },
  },

  zh: {
    about: (n) => `${n} 工具完全在浏览器中运行，无需安装任何软件或注册账号。我们采用256位SSL加密技术保护您的文件，处理完成后自动删除，完全符合《个人信息保护法》（PIPL）的要求。数以千计的用户在中国大陆、香港、台湾、新加坡和全球华人社区每天使用PDF HUB 24处理他们的PDF文件，快速、安全、完全免费。`,
    tools: {
      // TODO: add tool-specific entries here (see add-watermark/compress/merge in `es` for the pattern)
    },

    defaultUseCases: {
      title: (n) => `${n} 的适用场景`,
      desc: "适合个人用户、学生、企业员工、律师和政府工作人员在日常工作和学习中处理各类PDF文件。",
      items: [
        "劳动合同、商业协议、公证文件等法律文书",
        "政府行政审批表格、营业执照、许可证申请材料",
        "增值税发票、财务报告、审计报告等财务文件",
        "毕业论文、学术期刊投稿、学位证书和成绩单",
        "病历、体检报告、处方单和医疗保险材料",
        "居民身份证、护照、签证申请相关文件",
      ],
    },
    tutorial: {
      title: (n) => `如何使用 ${n}：详细操作步骤`,
      steps: [
        { step: "上传文件", detail: "将PDF文件拖放到上传区域，或点击「选择文件」按钮从您的设备中选择文件。支持从手机相册、云盘直接上传。" },
        { step: "设置选项", detail: "根据您的需要调整可用的选项，例如输出质量、页面范围或其他特定参数。" },
        { step: "开始处理", detail: "点击主操作按钮，等待几秒钟，处理将在我们的安全服务器上高速完成。" },
        { step: "下载结果", detail: "处理完成后，您可以立即下载文件。文件将在处理后数分钟内自动从服务器中永久删除。" },
      ],
    },
    faqs: (n) => [
      { question: `使用 ${n} 安全吗？`, answer: "完全安全。所有文件在传输过程中均采用256位SSL加密，处理完成后自动从服务器永久删除。我们绝不会查看您文件的内容，也不会与任何第三方共享。" },
      { question: "需要注册账户吗？", answer: "不需要。PDF HUB 24 完全免费，无需注册、无需填写任何个人信息。您可以无限制地使用所有工具，无水印，随时可用。" },
      { question: `${n} 符合《个人信息保护法》吗？`, answer: "是的。我们完全遵守中国《个人信息保护法》（PIPL）及《数据安全法》的相关要求，同时符合欧盟GDPR等国际数据保护标准，确保您的个人信息和文件内容的安全。" },
      { question: `${n} 支持手机使用吗？`, answer: "支持。PDF HUB 24 完全响应式设计，可在iPhone、Android手机、iPad及各种电脑上流畅使用，支持微信内置浏览器和所有主流浏览器。" },
      { question: "文件大小有限制吗？", answer: "大多数工具支持最大50MB的文件。如果您的文件较大，建议先使用我们的PDF压缩工具减小文件大小后再进行处理。" },
    ],
    defaultTroubleshooting: {
      title: "常见问题解决方案",
      issues: [
        { problem: "文件无法上传或出现错误提示", solution: "请检查文件是否设有密码保护或文件已损坏。如果PDF加密，请先使用我们的PDF解锁工具移除密码，然后重新尝试上传。" },
        { problem: "处理结果质量不满意", solution: "请在高级选项中提高质量级别设置至「高」或「最高」。对于包含高清图片的文档，请务必选择最高质量模式以获得最佳输出效果。" },
      ],
    },
    security: {
      title: "数据安全与隐私保护",
      content: "保护您的文件隐私是我们的首要任务。PDF HUB 24 采用最高安全标准：256位SSL加密保护所有数据传输，文件处理后自动永久删除，完全符合中国《个人信息保护法》（PIPL）和欧盟GDPR的要求。",
      points: ["256位SSL加密保护所有连接", "处理完成后自动永久删除文件", "无永久存储，不访问文件内容", "符合PIPL（中国）和GDPR（欧盟）规定"],
    },
  },

  ja: {
    about: (n) => `${n}ツールは、ソフトウェアのインストールやアカウント登録なしに、ブラウザ上で直接ご利用いただけます。ファイルは256ビットSSL暗号化で保護され、処理完了後に自動削除されます。個人情報の保護に関する法律（個人情報保護法）に完全準拠しており、日本全国の個人ユーザー・企業・官公庁の数千人が毎日PDF HUB 24を信頼してご利用いただいています。`,
    tools: {
      // TODO: add tool-specific entries here (see add-watermark/compress/merge in `es` for the pattern)
    },

    defaultUseCases: {
      title: (n) => `${n}の活用シーン`,
      desc: "個人ユーザー、学生、ビジネスパーソン、士業、公務員など、日常的にPDFファイルを扱うすべての方に最適なツールです。",
      items: [
        "雇用契約書、業務委託契約書、売買契約書などの法的文書",
        "確定申告書、住民票、在留カード、各種行政申請書類",
        "請求書、見積書、納品書、領収書などのビジネス文書",
        "卒業論文、修士論文、博士論文、学位証明書",
        "診断書、処方箋、健康診断結果、医療機関への紹介状",
        "マイナンバー関連書類、パスポート申請書類、ビザ関連文書",
      ],
    },
    tutorial: {
      title: (n) => `${n}の使い方：ステップバイステップガイド`,
      steps: [
        { step: "ファイルをアップロード", detail: "PDFファイルをアップロードエリアにドラッグ＆ドロップするか、「ファイルを選択」ボタンをクリックしてデバイスから選択してください。スマートフォンからも簡単にアップロードできます。" },
        { step: "オプションを設定", detail: "出力品質やページ範囲など、ご希望に応じて利用可能なオプションを調整してください。" },
        { step: "処理を開始", detail: "メインのアクションボタンをクリックし、安全なサーバー上での処理が完了するまで数秒お待ちください。" },
        { step: "結果をダウンロード", detail: "処理完了後、すぐにファイルをダウンロードできます。ファイルは数分後にサーバーから自動的に完全削除されます。" },
      ],
    },
    faqs: (n) => [
      { question: `${n}は安全ですか？`, answer: "はい、完全に安全です。すべてのファイルは転送中に256ビットSSL暗号化で保護され、処理完了後に自動削除されます。お客様の文書の内容に一切アクセスせず、第三者への提供も行いません。" },
      { question: "アカウント登録は必要ですか？", answer: "必要ありません。PDF HUB 24は完全無料で、登録不要です。すべてのツールを制限なく、透かしなし、メールアドレス不要でご利用いただけます。" },
      { question: `${n}は個人情報保護法に対応していますか？`, answer: "はい。日本の個人情報の保護に関する法律（個人情報保護法・改正APPI）および欧州GDPRを含む国際的なデータ保護基準に完全準拠して運営しています。" },
      { question: `${n}はスマートフォンで使えますか？`, answer: "はい。PDF HUB 24はiPhone・Android両対応のスマートフォン、タブレット、パソコンのすべてのデバイスで快適にご利用いただけます。アプリのインストールは不要です。" },
      { question: "ファイルサイズの上限はありますか？", answer: "ほとんどのツールで最大50MBまでのファイルに対応しています。それ以上のファイルは、まずPDF圧縮ツールでサイズを小さくしてからご利用ください。" },
    ],
    defaultTroubleshooting: {
      title: "よくある問題と解決方法",
      issues: [
        { problem: "PDFファイルがアップロードできない、またはエラーが表示される", solution: "ファイルにパスワード保護がかかっていないか、または破損していないか確認してください。暗号化されている場合は、まずPDFロック解除ツールをご利用の上、再度お試しください。" },
        { problem: "出力結果の品質が期待通りでない", solution: "詳細設定で品質レベルを「高」または「最大」に引き上げてください。高解像度の画像を含む文書は「最高品質」モードをお選びください。" },
      ],
    },
    security: {
      title: "データセキュリティとプライバシー保護",
      content: "お客様の文書の機密性を最優先に考えています。PDF HUB 24は最高水準のセキュリティ基準を採用しています：256ビットSSL暗号化による全データ転送の保護、処理後の自動削除、個人情報保護法（APPI）とGDPRへの完全準拠。",
      points: ["256ビットSSL暗号化による全接続の保護", "処理後のファイル自動完全削除", "永続的なデータ保存や内容へのアクセスなし", "個人情報保護法（APPI）・GDPR準拠"],
    },
  },

  id: {
    about: (n) => `Alat ${n} bekerja langsung di browser Anda tanpa memerlukan instalasi perangkat lunak atau pembuatan akun. File Anda dilindungi dengan enkripsi SSL 256-bit dan dihapus otomatis setelah diproses, sesuai dengan Undang-Undang Perlindungan Data Pribadi (UU PDP No. 27 Tahun 2022) Indonesia. Ribuan pengguna di Indonesia, Malaysia, Singapura, dan seluruh Asia Tenggara mempercayai PDF HUB 24 untuk mengelola dokumen mereka setiap hari.`,
    tools: {
      // TODO: add tool-specific entries here (see add-watermark/compress/merge in `es` for the pattern)
    },

    defaultUseCases: {
      title: (n) => `Kapan menggunakan ${n}?`,
      desc: "Alat ini ideal untuk perorangan, pelajar, mahasiswa, ASN, dan pelaku usaha yang berurusan dengan file PDF sehari-hari.",
      items: [
        "Kontrak kerja, perjanjian bisnis, dan akta notaris",
        "Formulir perizinan OSS, BPJS, pajak dan administrasi pemerintah",
        "Faktur pajak, laporan keuangan dan dokumen akuntansi perusahaan",
        "Skripsi, tesis S2, disertasi S3 dan ijazah perguruan tinggi",
        "Rekam medis, resep dokter, hasil laboratorium dan surat keterangan dokter",
        "KTP elektronik, paspor, SIM dan dokumen kependudukan lainnya",
      ],
    },
    tutorial: {
      title: (n) => `Cara menggunakan ${n}: panduan langkah demi langkah`,
      steps: [
        { step: "Unggah file Anda", detail: "Seret dan lepaskan file PDF ke area unggah, atau klik tombol 'Pilih File' untuk mencarinya di perangkat Anda. Bisa juga diunggah dari Google Drive atau Dropbox." },
        { step: "Atur opsi", detail: "Sesuaikan pengaturan yang tersedia sesuai kebutuhan Anda: kualitas output, rentang halaman, atau parameter spesifik lainnya." },
        { step: "Proses dokumen", detail: "Klik tombol aksi utama dan tunggu beberapa detik hingga pemrosesan selesai di server aman kami." },
        { step: "Unduh hasilnya", detail: "Setelah pemrosesan selesai, unduh file Anda segera. File dihapus otomatis dari server kami setelah beberapa menit." },
      ],
    },
    faqs: (n) => [
      { question: `Apakah ${n} aman digunakan?`, answer: "Ya, sepenuhnya aman. Semua file dienkripsi dengan SSL 256-bit selama transfer dan dihapus otomatis dari server kami setelah pemrosesan. Kami tidak pernah mengakses konten dokumen Anda dan tidak membagikannya kepada pihak ketiga manapun." },
      { question: "Apakah perlu membuat akun atau mendaftar?", answer: "Tidak. PDF HUB 24 sepenuhnya gratis dan tidak memerlukan pendaftaran apapun. Anda bisa menggunakan semua alat tanpa batas, tanpa tanda air, dan tanpa perlu memberikan alamat email." },
      { question: `Apakah ${n} sesuai dengan UU PDP Indonesia?`, answer: "Ya. Kami beroperasi sesuai dengan Undang-Undang Perlindungan Data Pribadi (UU PDP No. 27 Tahun 2022) Indonesia dan standar perlindungan data internasional termasuk GDPR Uni Eropa." },
      { question: `Bisakah ${n} digunakan di ponsel?`, answer: "Bisa. PDF HUB 24 berfungsi sempurna di ponsel Android dan iPhone, tablet, serta komputer. Tampilan menyesuaikan secara otomatis tanpa perlu instal aplikasi tambahan." },
      { question: "Berapa batas ukuran file maksimum?", answer: "Kami menerima file hingga 50 MB untuk sebagian besar alat. Untuk file yang lebih besar, gunakan alat kompresi PDF kami terlebih dahulu untuk memperkecil ukurannya." },
    ],
    defaultTroubleshooting: {
      title: "Solusi masalah umum",
      issues: [
        { problem: "File PDF tidak dapat diunggah atau muncul pesan error", solution: "Pastikan file tidak diproteksi dengan kata sandi dan tidak rusak atau korup. Jika PDF terenkripsi, gunakan alat buka kunci PDF kami terlebih dahulu, lalu coba unggah kembali." },
        { problem: "Kualitas hasil pemrosesan tidak memuaskan", solution: "Coba tingkatkan level kualitas di pengaturan lanjutan ke opsi 'Tinggi' atau 'Maksimum'. Untuk dokumen dengan gambar resolusi tinggi, pilih mode kualitas maksimum yang tersedia." },
      ],
    },
    security: {
      title: "Keamanan dan perlindungan data Anda",
      content: "Kerahasiaan dokumen Anda adalah prioritas utama kami. PDF HUB 24 menerapkan standar keamanan tertinggi: enkripsi SSL 256-bit untuk semua transfer data, penghapusan file otomatis setelah pemrosesan, dan kepatuhan penuh terhadap UU PDP Indonesia dan GDPR Uni Eropa.",
      points: ["Enkripsi SSL 256-bit untuk semua koneksi", "Penghapusan file otomatis setelah pemrosesan", "Tanpa penyimpanan permanen atau akses konten", "Sesuai UU PDP No. 27/2022 (Indonesia) dan GDPR (UE)"],
    },
  },

  ru: {
    about: (n) => `Инструмент ${n} работает прямо в вашем браузере без установки программ или создания учётной записи. Все файлы защищены 256-битным SSL-шифрованием и автоматически удаляются после обработки в соответствии с Федеральным законом №152-ФЗ «О персональных данных». Тысячи пользователей в России, Казахстане, Беларуси и других странах СНГ доверяют PDF HUB 24 для ежедневной работы с документами.`,
    tools: {
      // TODO: add tool-specific entries here (see add-watermark/compress/merge in `es` for the pattern)
    },

    defaultUseCases: {
      title: (n) => `Где применяется ${n}?`,
      desc: "Инструмент подходит для физических лиц, самозанятых специалистов, предприятий, юристов и государственных учреждений, работающих с PDF-файлами каждый день.",
      items: [
        "Трудовые договоры, гражданско-правовые соглашения и юридические документы",
        "Заявления в госорганы, формы ФНС, ПФР, ФСС и другие ведомства",
        "Счета-фактуры, накладные, акты выполненных работ и финансовые отчёты",
        "Дипломные и курсовые работы, диссертации, справки об образовании",
        "Медицинские карты, рецепты, справки 086/у и результаты анализов",
        "Паспорта, ИНН, СНИЛС, водительские удостоверения и другие документы",
      ],
    },
    tutorial: {
      title: (n) => `Как пользоваться ${n}: пошаговая инструкция`,
      steps: [
        { step: "Загрузите файл", detail: "Перетащите PDF-файл в зону загрузки или нажмите «Выбрать файл», чтобы найти его на устройстве. Поддерживается загрузка с Яндекс Диска и Google Drive." },
        { step: "Настройте параметры", detail: "Укажите необходимые параметры: качество выходного файла, диапазон страниц или другие доступные опции." },
        { step: "Запустите обработку", detail: "Нажмите кнопку действия и подождите несколько секунд — обработка выполняется на наших защищённых серверах." },
        { step: "Скачайте результат", detail: "После завершения обработки файл сразу готов к скачиванию. Он автоматически удаляется с сервера через несколько минут." },
      ],
    },
    faqs: (n) => [
      { question: `Безопасно ли использовать ${n}?`, answer: "Да, абсолютно. Все файлы шифруются 256-битным SSL при передаче и автоматически удаляются с серверов после обработки. Мы никогда не получаем доступ к содержимому ваших документов и не передаём их третьим лицам." },
      { question: "Нужно ли создавать учётную запись?", answer: "Нет. PDF HUB 24 полностью бесплатен и не требует регистрации. Используйте все инструменты без ограничений, без водяных знаков и без указания электронной почты." },
      { question: `Соответствует ли ${n} ФЗ-152?`, answer: "Да. Мы работаем в полном соответствии с Федеральным законом №152-ФЗ «О персональных данных» Российской Федерации и международными стандартами защиты данных, включая GDPR." },
      { question: `Работает ли ${n} на мобильных устройствах?`, answer: "Да. PDF HUB 24 отлично работает на смартфонах, планшетах и компьютерах с любым современным браузером — установка приложения не требуется." },
      { question: "Есть ли ограничение по размеру файла?", answer: "Большинство инструментов принимают файлы до 100 МБ. Для больших файлов рекомендуем сначала воспользоваться нашим инструментом сжатия PDF." },
    ],
    defaultTroubleshooting: {
      title: "Решение распространённых проблем",
      issues: [
        { problem: "Файл не загружается или появляется сообщение об ошибке", solution: "Убедитесь, что файл не защищён паролем и не повреждён. Если PDF зашифрован, сначала воспользуйтесь инструментом снятия защиты с PDF, затем повторите попытку." },
        { problem: "Качество результата не устраивает", solution: "Попробуйте увеличить уровень качества в расширенных настройках до «Высокого» или «Максимального». Для документов с изображениями высокого разрешения выберите режим максимального качества." },
      ],
    },
    security: {
      title: "Безопасность и защита данных",
      content: "Конфиденциальность ваших документов — наш главный приоритет. PDF HUB 24 применяет высочайшие стандарты безопасности: 256-битное SSL-шифрование при передаче данных, автоматическое удаление файлов после обработки и полное соответствие ФЗ-152 и GDPR.",
      points: ["256-битное SSL-шифрование для всех соединений", "Автоматическое удаление файлов после обработки", "Без постоянного хранения или доступа к содержимому", "Соответствие ФЗ-152 (Россия) и GDPR (ЕС)"],
    },
  },

  it: {
    about: (n) => `Lo strumento ${n} funziona direttamente nel tuo browser, senza installare software né creare un account. I tuoi file sono protetti con crittografia SSL a 256 bit ed eliminati automaticamente dopo l'elaborazione, in piena conformità con il GDPR e il Codice in materia di protezione dei dati personali (D.Lgs. 196/2003). Migliaia di utenti in Italia e nel mondo italofono si affidano a PDF HUB 24 ogni giorno per gestire i propri documenti in modo rapido e sicuro.`,
    tools: {
      // TODO: add tool-specific entries here (see add-watermark/compress/merge in `es` for the pattern)
    },

    defaultUseCases: {
      title: (n) => `A cosa serve ${n}?`,
      desc: "Questo strumento è ideale per privati, professionisti, studi legali, commercialisti e pubbliche amministrazioni che gestiscono file PDF ogni giorno.",
      items: [
        "Contratti di lavoro, atti notarili, accordi commerciali e documenti giuridici",
        "Moduli dell'Agenzia delle Entrate, INPS, INAIL e altri enti pubblici",
        "Fatture elettroniche (SDI), preventivi, DDT e documentazione contabile",
        "Tesi di laurea triennale e magistrale, dottorati e certificati accademici",
        "Cartelle cliniche, referti medici, ricette dematerializzate e certificati sanitari",
        "Documenti d'identità, codice fiscale, tessera sanitaria e patente",
      ],
    },
    tutorial: {
      title: (n) => `Come usare ${n}: guida passo dopo passo`,
      steps: [
        { step: "Carica il file", detail: "Trascina il file PDF nell'area di caricamento oppure clicca su «Seleziona file» per cercarlo sul tuo dispositivo. Puoi caricare anche da Google Drive o Dropbox." },
        { step: "Imposta le opzioni", detail: "Regola i parametri disponibili secondo le tue esigenze: qualità di output, intervallo di pagine o altri parametri specifici dello strumento." },
        { step: "Avvia l'elaborazione", detail: "Clicca sul pulsante di azione e attendi pochi secondi mentre l'elaborazione avviene sui nostri server sicuri." },
        { step: "Scarica il risultato", detail: "Al termine, il file è immediatamente disponibile per il download. Viene eliminato automaticamente dai nostri server dopo pochi minuti." },
      ],
    },
    faqs: (n) => [
      { question: `È sicuro usare ${n}?`, answer: "Sì, assolutamente. Tutti i file vengono crittografati con SSL a 256 bit durante il trasferimento ed eliminati automaticamente dai nostri server dopo l'elaborazione. Non accediamo mai al contenuto dei tuoi documenti né li condividiamo con terzi." },
      { question: "Devo creare un account o registrarmi?", answer: "No. PDF HUB 24 è completamente gratuito e non richiede alcuna registrazione. Puoi usare tutti gli strumenti senza limiti, senza filigrane e senza fornire il tuo indirizzo e-mail." },
      { question: `${n} è conforme al GDPR e al Codice Privacy italiano?`, answer: "Sì. Operiamo in piena conformità con il Regolamento Generale sulla Protezione dei Dati (GDPR) dell'UE e con il Codice in materia di protezione dei dati personali (D.Lgs. 196/2003 come modificato dal D.Lgs. 101/2018)." },
      { question: `Posso usare ${n} da cellulare?`, answer: "Sì. PDF HUB 24 funziona perfettamente su smartphone iOS e Android, tablet e computer con qualsiasi browser moderno, senza installare alcuna applicazione." },
      { question: "C'è un limite alla dimensione del file?", answer: "Accettiamo file fino a 50 MB per la maggior parte degli strumenti. Per file di dimensioni maggiori, ti consigliamo di comprimerli prima con il nostro strumento di compressione PDF." },
    ],
    defaultTroubleshooting: {
      title: "Risoluzione dei problemi più comuni",
      issues: [
        { problem: "Il file PDF non si carica o appare un messaggio di errore", solution: "Verifica che il file non sia protetto da password e non sia danneggiato o corrotto. Se il PDF è cifrato, usa prima il nostro strumento per sbloccare il PDF, poi riprova." },
        { problem: "La qualità del risultato non è soddisfacente", solution: "Prova ad aumentare il livello di qualità nelle impostazioni avanzate portandolo su «Alta» o «Massima». Per i documenti con immagini ad alta risoluzione, seleziona sempre la modalità qualità massima." },
      ],
    },
    security: {
      title: "Sicurezza e protezione dei dati personali",
      content: "La riservatezza dei tuoi documenti è la nostra priorità assoluta. PDF HUB 24 applica i più elevati standard di sicurezza: crittografia SSL a 256 bit per tutti i trasferimenti, eliminazione automatica dei file dopo l'elaborazione e piena conformità con GDPR e Codice Privacy italiano.",
      points: ["Crittografia SSL a 256 bit per tutte le connessioni", "Eliminazione automatica dei file dopo l'elaborazione", "Nessun archivio permanente o accesso ai contenuti", "Conformità GDPR (UE) e D.Lgs. 196/2003 (Italia)"],
    },
  },

  ur: {
    about: (n) => `${n} ٹول آپ کے براؤزر میں براہ راست کام کرتا ہے — کوئی سافٹ ویئر انسٹال کرنے یا اکاؤنٹ بنانے کی ضرورت نہیں۔ آپ کی فائلیں 256-بٹ SSL خفیہ کاری سے محفوظ ہوتی ہیں اور پروسیسنگ کے بعد خودبخود حذف ہو جاتی ہیں — پاکستان کے سائبر قوانین اور بین الاقوامی ڈیٹا تحفظ معیارات کے مطابق۔ پاکستان، بھارت اور پوری اردو دنیا کے ہزاروں طالب علموں، سرکاری ملازمین اور تاجروں کا PDF HUB 24 پر مکمل بھروسہ ہے۔`,
    tools: {
      // TODO: add tool-specific entries here (see add-watermark/compress/merge in `es` for the pattern)
    },

    defaultUseCases: {
      title: (n) => `${n} کب استعمال کریں؟`,
      desc: "یہ ٹول طالب علموں، دفتری ملازمین، کاروباری افراد، وکلاء اور سرکاری اداروں کے لیے انتہائی مفید ہے۔",
      items: [
        "ملازمت کے معاہدے، تجارتی دستاویزات اور قانونی اسناد",
        "شناختی کارڈ (CNIC)، پاسپورٹ اور ویزہ کی درخواستیں",
        "تعلیمی سرٹیفکیٹ، ڈگریاں، ٹرانسکرپٹ اور مارکشیٹ",
        "بینک اسٹیٹمنٹ، ٹیکس گوشوارے اور مالی رپورٹیں",
        "طبی نسخے، تشخیصی رپورٹیں اور ہسپتال کے ریکارڈ",
        "اسکولوں، کالجوں اور یونیورسٹیوں کی داخلہ دستاویزات",
      ],
    },
    tutorial: {
      title: (n) => `${n} کا استعمال کیسے کریں: مرحلہ وار رہنما`,
      steps: [
        { step: "فائل اپ لوڈ کریں", detail: "اپنی PDF فائل کو اپ لوڈ ایریا میں گھسیٹیں، یا 'فائل منتخب کریں' بٹن پر کلک کر کے اسے اپنے آلے سے تلاش کریں۔ موبائل سے بھی آسانی سے اپ لوڈ کیا جا سکتا ہے۔" },
        { step: "ترتیبات مقرر کریں", detail: "اپنی ضرورت کے مطابق دستیاب اختیارات مقرر کریں: معیار، صفحات کی حد یا دیگر مخصوص پیرامیٹرز۔" },
        { step: "پروسیس کریں", detail: "مرکزی عمل کا بٹن دبائیں اور ہمارے محفوظ سرورز پر چند سیکنڈ میں پروسیسنگ مکمل ہونے کا انتظار کریں۔" },
        { step: "نتیجہ ڈاؤن لوڈ کریں", detail: "پروسیسنگ مکمل ہونے کے بعد فوری طور پر اپنی فائل ڈاؤن لوڈ کریں۔ فائل چند منٹوں میں سرور سے خودبخود اور مستقل طور پر حذف ہو جاتی ہے۔" },
      ],
    },
    faqs: (n) => [
      { question: `کیا ${n} استعمال کرنا محفوظ ہے؟`, answer: "جی ہاں، بالکل۔ تمام فائلیں منتقلی کے دوران 256-بٹ SSL خفیہ کاری سے محفوظ ہوتی ہیں اور پروسیسنگ کے بعد ہمارے سرورز سے خودبخود مستقل طور پر حذف ہو جاتی ہیں۔ ہم آپ کی دستاویزات کا مواد کبھی نہیں دیکھتے اور نہ کسی کو دیتے ہیں۔" },
      { question: "کیا اکاؤنٹ بنانا ضروری ہے؟", answer: "نہیں۔ PDF HUB 24 مکمل طور پر مفت ہے اور کسی رجسٹریشن کی ضرورت نہیں۔ بغیر کسی حد کے، بغیر واٹر مارک کے، اور بغیر ای میل دیے تمام ٹولز استعمال کریں۔" },
      { question: "کیا یہ پاکستان کے ڈیٹا تحفظ قوانین کے مطابق ہے؟", answer: "جی ہاں۔ ہم پاکستان کے PECA 2016 اور Personal Data Protection Bill کی روح کے مطابق، نیز یورپی GDPR سمیت بین الاقوامی ڈیٹا تحفظ معیارات پر عمل کرتے ہیں۔" },
      { question: `کیا ${n} موبائل پر کام کرتا ہے؟`, answer: "جی ہاں۔ PDF HUB 24 Android اور iPhone اسمارٹ فون، ٹیبلٹ اور کمپیوٹر تینوں پر بہترین طریقے سے کام کرتا ہے۔ کوئی ایپ انسٹال کرنے کی ضرورت نہیں — براؤزر میں فوری کام کریں۔" },
      { question: "فائل کا زیادہ سے زیادہ سائز کیا ہے؟", answer: "زیادہ تر ٹولز میں 50 MB تک کی فائلیں قبول کی جاتی ہیں۔ بڑی فائلوں کے لیے پہلے ہمارا PDF Compress ٹول استعمال کریں اور پھر دوبارہ کوشش کریں۔" },
    ],
    defaultTroubleshooting: {
      title: "عام مسائل کا حل",
      issues: [
        { problem: "فائل اپ لوڈ نہیں ہو رہی یا غلطی ظاہر ہو رہی ہے", solution: "یقینی بنائیں کہ فائل پاس ورڈ سے محفوظ یا خراب نہ ہو۔ اگر PDF انکرپٹڈ ہے تو پہلے ہمارا Unlock PDF ٹول استعمال کریں، پھر دوبارہ کوشش کریں۔" },
        { problem: "نتیجے کا معیار تسلی بخش نہیں ہے", solution: "Advanced Options میں جا کر Quality Level کو High یا Maximum پر سیٹ کریں۔ زیادہ ریزولیوشن والی تصویروں والے دستاویزات کے لیے اعلی معیار کا طریقہ منتخب کریں۔" },
      ],
    },
    security: {
      title: "آپ کے ڈیٹا کی حفاظت",
      content: "آپ کی دستاویزات کی رازداری ہماری سب سے بڑی ترجیح ہے۔ PDF HUB 24 اعلی ترین سیکیورٹی معیارات اپناتا ہے: 256-بٹ SSL خفیہ کاری، فائلوں کی خودکار مستقل حذف، اور پاکستانی سائبر قوانین اور بین الاقوامی GDPR معیارات کی مکمل پابندی۔",
      points: ["تمام کنکشنز میں 256-بٹ SSL خفیہ کاری", "پروسیسنگ کے بعد فائلوں کی خودکار مستقل حذف", "کوئی مستقل ذخیرہ یا مواد تک رسائی نہیں", "پاکستانی سائبر قوانین اور GDPR کی پابندی"],
    },
  },
};
