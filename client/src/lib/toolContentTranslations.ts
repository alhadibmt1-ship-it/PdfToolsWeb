export interface TranslatedToolContent {
  about: (toolName: string) => string;
  useCases: {
    title: (toolName: string) => string;
    desc: string;
    items: string[];
  };
  tutorial: {
    title: (toolName: string) => string;
    steps: { step: string; detail: string }[];
  };
  faqs: (toolName: string) => { question: string; answer: string }[];
  troubleshooting: {
    title: string;
    issues: { problem: string; solution: string }[];
  };
  security: {
    title: string;
    content: string;
    points: string[];
  };
}

export const TOOL_CONTENT_TRANSLATIONS: Partial<Record<string, TranslatedToolContent>> = {

  es: {
    about: (n) => `Nuestra herramienta ${n} es completamente gratuita y funciona directamente en tu navegador sin necesidad de instalar ningún software. Todos los archivos se protegen con cifrado SSL de 256 bits y se eliminan automáticamente tras el procesamiento, en plena conformidad con el RGPD europeo y la LOPD española. Miles de profesionales en España, México, Argentina, Colombia y Chile confían en PDF HUB 24 para gestionar sus documentos con rapidez y total seguridad.`,
    useCases: {
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
      { question: "¿Hay límite de tamaño en los archivos?", answer: "Aceptamos archivos de hasta 100 MB en la mayoría de herramientas. Para archivos de mayor tamaño, te recomendamos comprimirlos primero con nuestra herramienta de compresión PDF." },
    ],
    troubleshooting: {
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
    useCases: {
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
    troubleshooting: {
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
    useCases: {
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
      { question: "फ़ाइल का अधिकतम आकार क्या है?", answer: "अधिकांश टूल में 100 MB तक की फ़ाइलें स्वीकार की जाती हैं। बड़ी फ़ाइलों के लिए पहले हमारे PDF Compress टूल का उपयोग करके फ़ाइल का आकार कम करें।" },
    ],
    troubleshooting: {
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
    useCases: {
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
    troubleshooting: {
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
    useCases: {
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
      { question: "Qual é o tamanho máximo do arquivo?", answer: "Aceitamos arquivos de até 100 MB na maioria das ferramentas. Para arquivos maiores, recomendamos usar primeiro a ferramenta de compressão de PDF disponível em nossa plataforma." },
    ],
    troubleshooting: {
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
    useCases: {
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
      { question: "Gibt es eine maximale Dateigröße?", answer: "Wir akzeptieren Dateien bis zu 100 MB bei den meisten Tools. Für größere Dateien empfehlen wir, diese zunächst mit unserem PDF-Komprimierungstool zu verkleinern." },
    ],
    troubleshooting: {
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
    useCases: {
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
      { question: "文件大小有限制吗？", answer: "大多数工具支持最大100MB的文件。如果您的文件较大，建议先使用我们的PDF压缩工具减小文件大小后再进行处理。" },
    ],
    troubleshooting: {
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
    useCases: {
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
      { question: "ファイルサイズの上限はありますか？", answer: "ほとんどのツールで最大100MBまでのファイルに対応しています。それ以上のファイルは、まずPDF圧縮ツールでサイズを小さくしてからご利用ください。" },
    ],
    troubleshooting: {
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
    useCases: {
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
      { question: "Berapa batas ukuran file maksimum?", answer: "Kami menerima file hingga 100 MB untuk sebagian besar alat. Untuk file yang lebih besar, gunakan alat kompresi PDF kami terlebih dahulu untuk memperkecil ukurannya." },
    ],
    troubleshooting: {
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
    useCases: {
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
    troubleshooting: {
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
    useCases: {
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
      { question: "C'è un limite alla dimensione del file?", answer: "Accettiamo file fino a 100 MB per la maggior parte degli strumenti. Per file di dimensioni maggiori, ti consigliamo di comprimerli prima con il nostro strumento di compressione PDF." },
    ],
    troubleshooting: {
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
    useCases: {
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
      { question: "فائل کا زیادہ سے زیادہ سائز کیا ہے؟", answer: "زیادہ تر ٹولز میں 100 MB تک کی فائلیں قبول کی جاتی ہیں۔ بڑی فائلوں کے لیے پہلے ہمارا PDF Compress ٹول استعمال کریں اور پھر دوبارہ کوشش کریں۔" },
    ],
    troubleshooting: {
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
