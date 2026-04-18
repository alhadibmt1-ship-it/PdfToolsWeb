export type ToolCategory = 'compress' | 'merge_split' | 'pdf_to_editable' | 'pdf_to_image' | 'to_pdf' | 'security' | 'edit' | 'ocr_extract';

export const TOOL_CATEGORY_MAP: Record<string, ToolCategory> = {
  'compress-pdf': 'compress',
  'flatten-pdf': 'compress',
  'grayscale-pdf': 'compress',
  'batch-compress': 'compress',
  'merge-pdf': 'merge_split',
  'split-pdf': 'merge_split',
  'extract-pages': 'merge_split',
  'delete-pages': 'merge_split',
  'reorder-pages': 'merge_split',
  'pdf-to-word': 'pdf_to_editable',
  'pdf-to-excel': 'pdf_to_editable',
  'pdf-to-ppt': 'pdf_to_editable',
  'pdf-to-jpg': 'pdf_to_image',
  'pdf-to-png': 'pdf_to_image',
  'word-to-pdf': 'to_pdf',
  'excel-to-pdf': 'to_pdf',
  'ppt-to-pdf': 'to_pdf',
  'html-to-pdf': 'to_pdf',
  'jpg-to-pdf': 'to_pdf',
  'png-to-pdf': 'to_pdf',
  'gif-to-pdf': 'to_pdf',
  'tiff-to-pdf': 'to_pdf',
  'webp-to-pdf': 'to_pdf',
  'scan-to-pdf': 'to_pdf',
  'image-compressor': 'to_pdf',
  'convert-image': 'to_pdf',
  'crop-image': 'to_pdf',
  'resize-image': 'to_pdf',
  'rotate-image': 'to_pdf',
  'protect-pdf': 'security',
  'unlock-pdf': 'security',
  'sign-pdf': 'security',
  'redact-pdf': 'security',
  'add-watermark': 'edit',
  'add-page-numbers': 'edit',
  'crop-pdf': 'edit',
  'rotate-pdf': 'edit',
  'annotate-pdf': 'edit',
  'edit-pdf': 'edit',
  'resize-pdf': 'edit',
  'repair-pdf': 'edit',
  'compare-pdf': 'edit',
  'pdf-viewer': 'edit',
  'translate-pdf': 'edit',
  'ocr-pdf': 'ocr_extract',
  'extract-text': 'ocr_extract',
  'extract-images': 'ocr_extract',
};

interface CategoryContent {
  useCaseItems: string[];
  troubleshooting: { problem: string; solution: string }[];
}

type LangCategoryContent = Partial<Record<ToolCategory, CategoryContent>>;

export const CATEGORY_CONTENT: Partial<Record<string, LangCategoryContent>> = {

  es: {
    compress: {
      useCaseItems: [
        "Reducir archivos PDF de más de 20 MB para adjuntarlos en correos electrónicos sin superar los límites",
        "Ahorrar espacio en Google Drive, Dropbox y servidores corporativos al comprimir documentos de archivo",
        "Preparar documentos para subirlos a sedes electrónicas de la Agencia Tributaria y la Seguridad Social",
        "Reducir el peso de catálogos digitales y folletos comerciales para compartirlos fácilmente por WhatsApp",
        "Comprimir expedientes académicos y currículums antes de enviarlos a portales de empleo como InfoJobs",
        "Almacenar grandes volúmenes de facturas digitales y declaraciones fiscales en el archivo histórico de empresa",
      ],
      troubleshooting: [
        { problem: "El archivo comprimido apenas ha reducido su tamaño", solution: "Ocurre cuando el PDF ya contiene imágenes muy comprimidas. Activa la opción de reducción de resolución de imágenes en los ajustes avanzados o selecciona el nivel de compresión «Agresivo»." },
        { problem: "La calidad del documento ha empeorado demasiado tras la compresión", solution: "Cambia a nivel de calidad «Equilibrado» en lugar de «Máxima compresión» para conservar la legibilidad del texto e imágenes con un tamaño razonable." },
      ],
    },
    merge_split: {
      useCaseItems: [
        "Fusionar los informes mensuales de ventas de varios departamentos en un único PDF consolidado para la dirección",
        "Dividir contratos extensos en secciones independientes por cláusulas o partes firmantes para distribución selectiva",
        "Extraer capítulos específicos de manuales técnicos o auditorías para compartir solo la información relevante",
        "Eliminar páginas en blanco y páginas no deseadas producidas por scanners de oficina en documentos digitalizados",
        "Reorganizar el orden de las páginas de un TFG, memoria de máster o plan de negocio antes de la entrega final",
        "Combinar múltiples formularios cumplimentados y sus anexos en un único PDF para presentaciones oficiales",
      ],
      troubleshooting: [
        { problem: "El PDF combinado muestra las páginas en orden incorrecto", solution: "Asegúrate de arrastrar los archivos al área de carga en el orden exacto deseado. Puedes reorganizarlos manualmente antes de hacer clic en el botón de fusión." },
        { problem: "Al dividir el PDF, algunas páginas quedan en blanco o incompletas", solution: "Verifica que el rango de páginas especificado sea correcto (la numeración comienza en 1). Si aparecen páginas en blanco en el resultado, ya existían en el documento original." },
      ],
    },
    pdf_to_editable: {
      useCaseItems: [
        "Convertir contratos escaneados en Word para añadir cláusulas, actualizar condiciones o corregir errores",
        "Transformar tablas de datos de informes financieros en PDF a Excel para análisis estadístico y reporting",
        "Convertir presentaciones recibidas en PDF a PowerPoint para personalizarlas, reutilizarlas o completarlas",
        "Recuperar el texto de documentos legales en PDF cuando no se dispone del archivo fuente editable original",
        "Adaptar plantillas de empresa distribuidas en PDF para actualizarlas cada nuevo ejercicio fiscal",
        "Extraer contenido de memorias anuales, dossiers o informes en PDF para crear nuevos documentos de forma eficiente",
      ],
      troubleshooting: [
        { problem: "El documento Word resultante tiene el formato desorganizado o ilegible", solution: "Los PDFs escaneados o con diseños complejos pueden dar conversiones imperfectas. Asegúrate de que el PDF original tiene texto seleccionable, no solo imágenes escaneadas." },
        { problem: "La conversión a Excel no respeta correctamente las columnas de la tabla", solution: "Las tablas con celdas combinadas o bordes irregulares pueden no convertirse perfectamente. Prueba el modo de reconocimiento de tablas avanzado en la configuración." },
      ],
    },
    pdf_to_image: {
      useCaseItems: [
        "Convertir portadas y diapositivas de PDF en imágenes JPEG para publicarlas en LinkedIn, Twitter o Instagram",
        "Crear miniaturas de informes y documentos para mostrarlas en sitios web corporativos e intranets",
        "Extraer páginas de catálogos de productos en alta resolución para usarlas en tiendas online y e-commerce",
        "Generar capturas de documentos PDF para insertarlas en correos electrónicos o presentaciones de empresa",
        "Preparar infografías y gráficos de PDF para editarlos con Photoshop, Illustrator o Canva",
        "Convertir páginas de libros digitales en imágenes para crear materiales de formación o cursos online",
      ],
      troubleshooting: [
        { problem: "Las imágenes convertidas tienen baja resolución o se ven pixeladas", solution: "Selecciona una resolución superior (300 DPI o más) en las opciones avanzadas. Ten en cuenta que las imágenes de alta resolución generarán archivos de mayor tamaño." },
        { problem: "Los colores del PDF no se corresponden exactamente con los de la imagen", solution: "Puede ocurrir en PDFs con perfil de color CMYK. Activa la opción de conversión de espacio de color en los ajustes avanzados para mayor fidelidad cromática." },
      ],
    },
    to_pdf: {
      useCaseItems: [
        "Crear propuestas comerciales y presupuestos profesionales en PDF directamente desde documentos Word",
        "Guardar hojas de cálculo Excel con datos financieros en PDF con formato perfecto para enviar al cliente",
        "Transformar presentaciones de PowerPoint en PDF para enviar a clientes sin que puedan modificarlas",
        "Archivar páginas web y artículos en PDF para guardarlos y consultarlos sin conexión a internet",
        "Digitalizar documentos físicos escaneados y guardarlos en PDF para el archivo documental digital de la empresa",
        "Crear PDFs de imágenes de productos y obras de diseño para portafolios y catálogos digitales profesionales",
      ],
      troubleshooting: [
        { problem: "El PDF generado no conserva correctamente las fuentes o estilos del documento original", solution: "Asegúrate de que las fuentes del documento están instaladas. Para documentos Word con fuentes personalizadas, activa «Incrustar fuentes» antes de convertir." },
        { problem: "Las imágenes del PDF resultante se ven borrosas o de baja calidad", solution: "Aumenta la resolución de imagen en los ajustes de conversión a mínimo 150 DPI. Para documentos con imágenes de alta calidad, selecciona 300 DPI." },
      ],
    },
    security: {
      useCaseItems: [
        "Cifrar con contraseña informes financieros confidenciales antes de compartirlos con clientes o socios",
        "Añadir firmas electrónicas válidas legalmente (conforme al RGPD y eIDAS) a contratos y acuerdos comerciales",
        "Desbloquear PDFs protegidos de los que se ha extraviado la contraseña siendo el propietario legítimo",
        "Ocultar datos personales sensibles como DNI, número de cuenta o datos de salud antes de publicar documentos",
        "Cumplir los requisitos de la LOPDGDD y el RGPD al gestionar documentos con datos de clientes y empleados",
        "Proteger tesis doctorales, trabajos de investigación y materiales didácticos de usos no autorizados",
      ],
      troubleshooting: [
        { problem: "No consigo recordar la contraseña del PDF que quiero desbloquear", solution: "Si eres el propietario del documento, intenta recordar contraseñas usadas anteriormente. Recuerda que solo debes desbloquear PDFs de los que seas el propietario legítimo." },
        { problem: "La firma electrónica no se muestra correctamente en todos los visores de PDF", solution: "Verifica que el PDF resultante cumple el estándar PDF/A o PDF 1.7+. La firma debe ser compatible con Adobe Acrobat, Foxit y otros visores principales del mercado." },
      ],
    },
    edit: {
      useCaseItems: [
        "Añadir el logotipo corporativo como marca de agua semitransparente a todos los documentos de empresa",
        "Numerar automáticamente las páginas de informes legales, contratos y documentos de procedimiento judicial",
        "Corregir la orientación de páginas escaneadas en posición incorrecta (giradas 90 o 180 grados)",
        "Recortar los márgenes excesivos de documentos escaneados para optimizar el espacio y ahorrar papel al imprimir",
        "Agregar comentarios, notas y marcadores en PDFs durante procesos de revisión, auditoría o negociación",
        "Reparar archivos PDF corruptos o dañados que no se abren correctamente en ningún lector de documentos",
      ],
      troubleshooting: [
        { problem: "La marca de agua aparece en una posición incorrecta o no es visible", solution: "Ajusta el nivel de opacidad y la posición en las opciones. Para marcas de agua de texto, elige un tamaño de fuente y color que contrasten adecuadamente con el fondo de la página." },
        { problem: "Los números de página no se añaden correctamente en todos los documentos", solution: "Si el PDF tiene un tamaño de página no estándar, los números pueden aparecer desplazados. Usa las opciones de margen para ajustar la posición exacta en cada esquina del documento." },
      ],
    },
    ocr_extract: {
      useCaseItems: [
        "Convertir documentos escaneados y fotografías de contratos en texto completamente buscable y seleccionable",
        "Extraer el contenido textual de facturas PDF para importarlo directamente en sistemas contables o ERP",
        "Obtener todas las imágenes incrustadas en presentaciones y catálogos PDF en archivos independientes y reutilizables",
        "Digitalizar archivos históricos en papel y convertirlos en documentos PDF con texto indexado y localizable",
        "Extraer datos tabulares de extractos bancarios o declaraciones de renta para analizarlos en hojas de cálculo",
        "Crear versiones accesibles de PDFs escaneados para usuarios con discapacidad visual o necesidades de lectura asistida",
      ],
      troubleshooting: [
        { problem: "El texto reconocido por OCR contiene muchos errores ortográficos o caracteres incorrectos", solution: "La calidad del OCR depende directamente de la resolución del documento. Escanea a mínimo 300 DPI en escala de grises para obtener los mejores resultados de reconocimiento." },
        { problem: "Las imágenes extraídas del PDF tienen baja resolución", solution: "Si las imágenes originales fueron incrustadas con baja resolución, no es posible mejorarlas en la extracción. Accede siempre a las imágenes originales de mayor calidad si están disponibles." },
      ],
    },
  },

  ar: {
    compress: {
      useCaseItems: [
        "تقليل حجم ملفات PDF الكبيرة لإرسالها بالبريد الإلكتروني دون تجاوز حد المرفقات",
        "توفير مساحة التخزين على Google Drive وDropbox والخوادم الإلكترونية للمؤسسات",
        "تجهيز المستندات للرفع على البوابات الحكومية الإلكترونية في السعودية ومصر والإمارات",
        "ضغط الكتالوجات التجارية والمطبوعات الرقمية لمشاركتها عبر واتساب وتيليجرام",
        "تقليص حجم ملفات السيرة الذاتية والشهادات للتقدم لفرص العمل عبر الإنترنت",
        "أرشفة الفواتير التجارية والتقارير المالية في قواعد بيانات رقمية ضخمة بمساحة أقل",
      ],
      troubleshooting: [
        { problem: "لا يتقلص حجم الملف بشكل ملحوظ بعد الضغط", solution: "يحدث ذلك عادةً عندما يحتوي PDF على صور مضغوطة بالفعل. جرّب استخدام مستوى الضغط «العالي» أو فعّل خيار تقليل دقة الصور المضمنة في الإعدادات المتقدمة." },
        { problem: "تتدهور جودة المستند بشكل كبير بعد الضغط", solution: "اختر مستوى الجودة «المتوازن» بدلاً من «الضغط الأقصى» للحفاظ على توازن مناسب بين حجم الملف ووضوح النص والصور." },
      ],
    },
    merge_split: {
      useCaseItems: [
        "دمج التقارير الشهرية من مختلف الأقسام في وثيقة PDF موحدة لرفعها إلى الإدارة العليا",
        "تقسيم العقود الطويلة إلى أقسام مستقلة حسب البنود أو الأطراف الموقعة لتسهيل المراجعة",
        "استخراج صفحات محددة من الملفات الحكومية وإنشاء مستندات مستقلة لكل طلب",
        "إعادة ترتيب صفحات الرسائل الجامعية والتقارير قبل تقديمها للجهات المعنية",
        "حذف الصفحات الفارغة غير المرغوب فيها الناتجة عن ماسحات المكاتب من المستندات الممسوحة",
        "تجميع النماذج المعبأة والمستندات الداعمة في ملف PDF واحد للتقديم الرسمي",
      ],
      troubleshooting: [
        { problem: "ملف PDF المدمج يعرض الصفحات بترتيب غير صحيح", solution: "تأكد من سحب الملفات إلى منطقة الرفع بالترتيب الصحيح قبل النقر على زر الدمج. يمكنك إعادة ترتيبها يدوياً قبل البدء." },
        { problem: "بعض الصفحات تظهر فارغة أو مقطوعة بعد عملية التقسيم", solution: "تحقق من أنك تحدد نطاق الصفحات الصحيح، علماً بأن الترقيم يبدأ من 1. إذا ظهرت صفحات فارغة فهذا يعني أنها كانت موجودة في المستند الأصلي." },
      ],
    },
    pdf_to_editable: {
      useCaseItems: [
        "تحويل العقود الممسوحة ضوئياً إلى Word لإضافة أو تعديل البنود والشروط القانونية",
        "استخراج جداول البيانات من التقارير المالية والمحاسبية إلى Excel للتحليل والإعداد",
        "تحويل العروض التقديمية المستلمة بصيغة PDF إلى PowerPoint للتخصيص وإعادة الاستخدام",
        "استعادة نص الوثائق القانونية في PDF عندما لا يتوفر الملف الأصلي القابل للتعديل",
        "تكييف النماذج والاستمارات الرسمية الموزعة بصيغة PDF لتحديثها سنوياً",
        "استخراج محتوى التقارير السنوية وإعادة استخدامه في وثائق جديدة بكفاءة أعلى",
      ],
      troubleshooting: [
        { problem: "مستند Word الناتج يحتوي على تنسيق غير منظم أو نص غير مقروء", solution: "ملفات PDF الممسوحة ضوئياً أو ذات التصاميم المعقدة قد تنتج تحويلات غير مثالية. تأكد من أن ملف PDF الأصلي يحتوي على نص قابل للتحديد وليس مجرد صورة ممسوحة." },
        { problem: "التحويل من PDF إلى Excel لا يحافظ على أعمدة الجدول الأصلي", solution: "الجداول ذات الخلايا المدمجة أو الحدود غير المنتظمة قد لا تُحوَّل بشكل مثالي. جرّب استخدام وضع التعرف المتقدم على الجداول المتاح في إعدادات التحويل." },
      ],
    },
    pdf_to_image: {
      useCaseItems: [
        "تحويل صفحات العروض التقديمية إلى صور JPEG لمشاركتها على منصات التواصل الاجتماعي",
        "إنشاء صور مصغرة للغلاف لنشرها على المواقع الإلكترونية والبوابات الرسمية",
        "استخراج صفحات الكتالوجات التجارية بدقة عالية للاستخدام في المتاجر الإلكترونية",
        "توليد صور من صفحات PDF لإدراجها في المراسلات الرسمية والعروض التقديمية",
        "تحضير الرسوم البيانية والإنفوجرافيك من PDF لتحريرها ببرامج التصميم الجرافيكي",
        "تحويل صفحات الكتب والمطبوعات الرقمية إلى صور لمواد التدريب الإلكتروني",
      ],
      troubleshooting: [
        { problem: "الصور المحوَّلة ذات دقة منخفضة أو تبدو ضبابية", solution: "اختر دقة أعلى (300 DPI أو أكثر) من الإعدادات المتقدمة. ضع في اعتبارك أن الصور عالية الدقة ستُنتج ملفات أكبر حجماً." },
        { problem: "ألوان PDF لا تتطابق تماماً مع الصورة الناتجة", solution: "قد يحدث ذلك مع ملفات PDF التي تستخدم نموذج الألوان CMYK. فعّل خيار تحويل فضاء الألوان في الإعدادات المتقدمة للحصول على دقة ألوان أعلى." },
      ],
    },
    to_pdf: {
      useCaseItems: [
        "تحويل تقارير Word والمستندات النصية إلى PDF بتنسيق احترافي للعرض والتوزيع",
        "حفظ جداول Excel المالية بصيغة PDF بتخطيط دقيق للمراجعة والمحاسبة",
        "تحويل عروض PowerPoint إلى PDF لمشاركتها مع العملاء دون إمكانية التعديل",
        "أرشفة صفحات الويب والمقالات الرقمية بصيغة PDF للرجوع إليها دون اتصال بالإنترنت",
        "رقمنة المستندات الورقية الممسوحة ضوئياً وحفظها كملفات PDF منظمة",
        "إنشاء كتالوجات رقمية لصور المنتجات والأعمال في ملفات PDF احترافية",
      ],
      troubleshooting: [
        { problem: "ملف PDF الناتج لا يحافظ على الخطوط أو الأنماط الأصلية للمستند", solution: "تأكد من تثبيت الخطوط المستخدمة في المستند الأصلي بشكل صحيح. لمستندات Word ذات خطوط مخصصة، فعّل خيار «تضمين الخطوط» قبل التحويل." },
        { problem: "الصور في ملف PDF الناتج تبدو ضبابية أو بجودة منخفضة", solution: "ارفع دقة الصور في إعدادات التحويل إلى 150 DPI كحد أدنى. للمستندات التي تحتوي على صور عالية الجودة، اختر 300 DPI للحصول على أفضل النتائج." },
      ],
    },
    security: {
      useCaseItems: [
        "تشفير التقارير المالية والوثائق السرية بكلمة مرور قبل إرسالها للعملاء والشركاء",
        "إضافة توقيعات إلكترونية ذات صلاحية قانونية للعقود والاتفاقيات التجارية",
        "فتح ملفات PDF المحمية بكلمة مرور منسية مع ضمان سلامة المستند",
        "إخفاء البيانات الشخصية الحساسة كأرقام الهوية والبيانات المصرفية قبل النشر",
        "الامتثال لأنظمة حماية البيانات الشخصية عند التعامل مع وثائق العملاء والموظفين",
        "حماية الرسائل الجامعية وأبحاث الدكتوراه من الاستخدام غير المصرح به",
      ],
      troubleshooting: [
        { problem: "نسيت كلمة المرور الخاصة بملف PDF الذي أريد إلغاء قفله", solution: "إذا كنت مالك المستند، حاول تذكر كلمات المرور السابقة. تذكر أنه يجب فتح قفل ملفات PDF التي تملكها أنت فقط والتي لديك الحق القانوني في الوصول إليها." },
        { problem: "التوقيع الإلكتروني لا يظهر بشكل صحيح في بعض برامج قراءة PDF", solution: "تحقق من أن ملف PDF الناتج يتوافق مع معيار PDF/A أو PDF 1.7+. يجب أن يكون التوقيع متوافقاً مع Adobe Acrobat وFoxit وسائر برامج القراءة الرئيسية." },
      ],
    },
    edit: {
      useCaseItems: [
        "إضافة شعار الشركة كعلامة مائية شبه شفافة على جميع المستندات الرسمية والتقارير",
        "ترقيم صفحات التقارير والعقود والمستندات القانونية تلقائياً وبشكل منتظم",
        "تصحيح اتجاه الصفحات الممسوحة ضوئياً بشكل خاطئ (مقلوبة أو مدورة 90 درجة)",
        "قص الهوامش الزائدة من المستندات الممسوحة ضوئياً لتحسين العرض والطباعة",
        "إضافة تعليقات وملاحظات وتظليل على ملفات PDF أثناء مراجعة العقود والتقارير",
        "إصلاح ملفات PDF التالفة أو المعطوبة التي لا تُفتح بشكل صحيح في أي تطبيق",
      ],
      troubleshooting: [
        { problem: "العلامة المائية تظهر في موضع خاطئ أو غير مرئية بوضوح", solution: "اضبط مستوى الشفافية وموضع العلامة المائية في خيارات الأداة. للعلامات المائية النصية، تأكد من أن حجم الخط ولونه يتباينان بشكل كافٍ مع خلفية الصفحة." },
        { problem: "أرقام الصفحات لا تضاف بشكل صحيح على جميع المستندات", solution: "إذا كان ملف PDF يحتوي على حجم صفحة غير قياسي، قد تظهر الأرقام بشكل منحرف. استخدم خيارات الهامش لضبط الموضع الدقيق للأرقام في زوايا الصفحات." },
      ],
    },
    ocr_extract: {
      useCaseItems: [
        "تحويل المستندات الممسوحة ضوئياً والعقود الورقية إلى نصوص قابلة للبحث والتعديل",
        "استخراج النص الكامل من الفواتير والإشعارات لاستيراده في أنظمة المحاسبة والإدارة",
        "الحصول على جميع الصور المضمنة في العروض التقديمية والكتالوجات بملفات منفصلة",
        "رقمنة الأرشيف الورقي التاريخي وتحويله إلى وثائق PDF ذات نصوص قابلة للاسترجاع",
        "استخراج البيانات الجدولية من الكشوفات المصرفية والتقارير الضريبية لتحليلها في Excel",
        "إنشاء نسخ نصية من ملفات PDF لدعم احتياجات المستخدمين ذوي الإعاقات البصرية",
      ],
      troubleshooting: [
        { problem: "النص المستخرج بتقنية OCR يحتوي على أخطاء إملائية كثيرة", solution: "تعتمد جودة OCR اعتماداً مباشراً على دقة المستند الممسوح ضوئياً. تأكد من المسح بدقة لا تقل عن 300 DPI وبالتدرج الرمادي للحصول على أفضل نتائج التعرف." },
        { problem: "الصور المستخرجة من PDF ذات دقة منخفضة", solution: "إذا كانت الصور الأصلية قد أُدرجت في PDF بدقة منخفضة، لا يمكن تحسينها عند الاستخراج. احرص دائماً على الوصول إلى الصور الأصلية عالية الجودة إذا كانت متوفرة." },
      ],
    },
  },

  hi: {
    compress: {
      useCaseItems: [
        "25 MB से बड़ी PDF फ़ाइलें ईमेल अटैचमेंट में भेजने के लिए कंप्रेस करें",
        "Google Drive, Dropbox और कंपनी सर्वर पर स्टोरेज स्पेस बचाएं",
        "NADRA, HEC, NIC या अन्य सरकारी पोर्टल की अपलोड साइज़ लिमिट पूरी करें",
        "CV, सर्टिफिकेट और रिज़्यूमे Naukri.com या LinkedIn पर अपलोड से पहले छोटा करें",
        "WhatsApp और Telegram ग्रुप में बड़े प्रोडक्ट कैटलॉग या ब्रोशर शेयर करें",
        "GST इनवॉइस, ITR फाइलें और बैंक दस्तावेज़ लंबे समय के डिजिटल आर्काइव में स्टोर करें",
      ],
      troubleshooting: [
        { problem: "कंप्रेस करने के बाद फ़ाइल का आकार बहुत कम नहीं हुआ", solution: "यह तब होता है जब PDF में पहले से ही अत्यधिक कंप्रेस इमेज हों। 'Aggressive' कंप्रेशन लेवल आज़माएं या Advanced Settings में Downscale Images विकल्प सक्षम करें।" },
        { problem: "कंप्रेशन के बाद दस्तावेज़ की गुणवत्ता बहुत खराब हो गई", solution: "'Maximum Compression' के बजाय 'Balanced' गुणवत्ता स्तर चुनें। इससे टेक्स्ट की पठनीयता बनाए रखते हुए फ़ाइल आकार कम होगा।" },
      ],
    },
    merge_split: {
      useCaseItems: [
        "विभिन्न विभागों की मासिक रिपोर्ट एक ही संयुक्त PDF में मर्ज करके प्रबंधन को प्रस्तुत करें",
        "लंबे कानूनी अनुबंधों को शर्तों या पक्षों के अनुसार अलग-अलग खंडों में विभाजित करें",
        "सरकारी फ़ाइलों से विशिष्ट पृष्ठ निकालकर स्वतंत्र दस्तावेज़ बनाएं",
        "B.Tech थीसिस, प्रोजेक्ट रिपोर्ट या शोध पत्र जमा करने से पहले पृष्ठ पुनर्व्यवस्थित करें",
        "स्कैन किए गए दस्तावेज़ों से अनावश्यक खाली पृष्ठ हटाएं और फ़ाइल साफ करें",
        "भरे हुए फ़ॉर्म और संलग्नकों को एक PDF में मिलाकर आधिकारिक प्रस्तुतीकरण करें",
      ],
      troubleshooting: [
        { problem: "मर्ज किए गए PDF में पृष्ठ गलत क्रम में हैं", solution: "Merge बटन दबाने से पहले फ़ाइलें अपलोड क्षेत्र में सही क्रम में ड्रैग करें और क्रम सत्यापित करें।" },
        { problem: "PDF विभाजित करने के बाद कुछ पृष्ठ खाली या अधूरे दिखते हैं", solution: "सुनिश्चित करें कि आप सही पृष्ठ संख्या सीमा निर्दिष्ट कर रहे हैं (पृष्ठ 1 से शुरू)। खाली पृष्ठ मूल दस्तावेज़ में भी थे।" },
      ],
    },
    pdf_to_editable: {
      useCaseItems: [
        "स्कैन किए गए अनुबंधों को Word में बदलकर नई शर्तें जोड़ें या मौजूदा शर्तों में ترمیم करें",
        "वित्तीय रिपोर्टों से डेटा टेबल Excel में बदलकर विश्लेषण और रिपोर्टिंग करें",
        "PDF प्रेजेंटेशन को PowerPoint में बदलकर कस्टमाइज़ करें और पुनः उपयोग करें",
        "मूल फ़ाइल न होने पर कानूनी दस्तावेज़ों से टेक्स्ट बाज़याब करें",
        "PDF में भेजी गई कंपनी टेम्पलेट को प्रत्येक नए वित्तीय वर्ष में अपडेट करने के लिए संपादित करें",
        "वार्षिक रिपोर्ट या ब्रोशर से सामग्री निकालकर नए दस्तावेज़ में कुशलतापूर्वक पुनः उपयोग करें",
      ],
      troubleshooting: [
        { problem: "परिणामी Word दस्तावेज़ का फ़ॉर्मेट अव्यवस्थित या अपठनीय है", solution: "स्कैन किए गए PDF में कनवर्ज़न अपूर्ण हो सकता है। सुनिश्चित करें कि मूल PDF में सेलेक्ट करने योग्य टेक्स्ट हो, न कि केवल स्कैन की गई इमेज।" },
        { problem: "PDF से Excel कनवर्ज़न में तालिका के कॉलम सही नहीं हैं", solution: "मर्ज किए गए सेल या अनियमित बॉर्डर वाली तालिकाएं सही से कनवर्ट नहीं होतीं। Settings में Advanced Table Recognition Mode का उपयोग करें।" },
      ],
    },
    pdf_to_image: {
      useCaseItems: [
        "PDF प्रेजेंटेशन स्लाइड्स को JPEG में बदलकर LinkedIn, Twitter या Instagram पर शेयर करें",
        "रिपोर्ट कवर पेज की thumbnail बनाकर वेबसाइट या कंपनी इंट्रानेट पर प्रकाशित करें",
        "उत्पाद कैटलॉग पृष्ठों को उच्च रिज़ॉल्यूशन में निकालकर ई-कॉमर्स साइट पर उपयोग करें",
        "PDF दस्तावेज़ के स्क्रीनशॉट बनाकर ईमेल या प्रेजेंटेशन में एम्बेड करें",
        "PDF इन्फोग्राफिक को इमेज में बदलकर Photoshop या Canva में संपादित करें",
        "डिजिटल पुस्तक पृष्ठों को छवियों में बदलकर ई-लर्निंग और प्रशिक्षण सामग्री बनाएं",
      ],
      troubleshooting: [
        { problem: "कनवर्ट की गई इमेज कम रिज़ॉल्यूशन की या धुंधली हैं", solution: "Advanced Options में उच्च रिज़ॉल्यूशन (300 DPI या अधिक) चुनें। उच्च रिज़ॉल्यूशन से फ़ाइल का आकार बड़ा होगा।" },
        { problem: "PDF और परिणामी इमेज के रंगों में अंतर है", solution: "CMYK कलर प्रोफाइल वाले PDF में यह समस्या हो सकती है। Advanced Settings में Color Space Conversion विकल्प सक्षम करें।" },
      ],
    },
    to_pdf: {
      useCaseItems: [
        "Word दस्तावेज़ों से पेशेवर व्यावसायिक प्रस्ताव और रिपोर्ट PDF में तैयार करें",
        "GST इनवॉइस वाली Excel स्प्रेडशीट परफेक्ट फ़ॉर्मेटिंग के साथ PDF में सेव करें",
        "PowerPoint प्रेजेंटेशन को PDF में बदलकर क्लाइंट्स को संपादन से रोकें",
        "वेबपेज और ऑनलाइन लेखों को ऑफलाइन पढ़ने के लिए PDF के रूप में आर्काइव करें",
        "स्कैन किए गए भौतिक दस्तावेज़ों को PDF के रूप में डिजिटाइज़ और व्यवस्थित करें",
        "उत्पाद तस्वीरों और डिज़ाइन कार्यों से PDF कैटलॉग और पोर्टफोलियो बनाएं",
      ],
      troubleshooting: [
        { problem: "PDF में मूल दस्तावेज़ के फ़ॉन्ट या स्टाइल सही से नहीं आए", solution: "सुनिश्चित करें कि दस्तावेज़ में उपयोग किए गए फ़ॉन्ट इंस्टॉल हैं। कस्टम फ़ॉन्ट वाले Word दस्तावेज़ों के लिए 'Embed Fonts' विकल्प सक्षम करें।" },
        { problem: "PDF में इमेज धुंधली दिखती हैं", solution: "कनवर्ज़न सेटिंग्स में इमेज रिज़ॉल्यूशन कम से कम 150 DPI पर सेट करें। उच्च गुणवत्ता के लिए 300 DPI चुनें।" },
      ],
    },
    security: {
      useCaseItems: [
        "Aadhaar, PAN कार्ड या CNIC जानकारी वाले गोपनीय दस्तावेज़ साझा करने से पहले एन्क्रिप्ट करें",
        "व्यावसायिक अनुबंधों पर DPDPA 2023 अनुरूप कानूनी रूप से वैध डिजिटल हस्ताक्षर जोड़ें",
        "भूली हुई पासवर्ड से बंद PDF को अनलॉक करें (केवल अपने दस्तावेज़ के लिए)",
        "व्यक्तिगत डेटा जैसे बैंक खाता नंबर या स्वास्थ्य जानकारी छुपाएं",
        "IT Act 2000 और DPDPA 2023 के तहत ग्राहक डेटा वाले PDF सुरक्षित तरीके से संभालें",
        "शोध प्रबंध, पेटेंट आवेदन और अकादमिक कार्यों को अनधिकृत उपयोग से सुरक्षित करें",
      ],
      troubleshooting: [
        { problem: "PDF का पासवर्ड भूल गए हैं", solution: "यदि आप दस्तावेज़ के मालिक हैं तो पुराने पासवर्ड याद करने की कोशिश करें। केवल वही PDF अनलॉक करें जिनका आपके पास कानूनी अधिकार हो।" },
        { problem: "डिजिटल हस्ताक्षर कुछ PDF रीडर में सही नहीं दिखता", solution: "सुनिश्चित करें कि परिणामी PDF PDF/A या PDF 1.7+ मानक के अनुरूप हो। हस्ताक्षर Adobe Acrobat, Foxit और अन्य प्रमुख रीडर के साथ संगत होना चाहिए।" },
      ],
    },
    edit: {
      useCaseItems: [
        "सभी कंपनी दस्तावेज़ों पर कॉर्पोरेट लोगो या ब्रांड वॉटरमार्क अर्ध-पारदर्शी रूप में जोड़ें",
        "लंबी कानूनी रिपोर्ट, अनुबंधों और न्यायिक दस्तावेज़ों में पृष्ठ संख्या स्वचालित रूप से जोड़ें",
        "गलत दिशा में स्कैन किए गए पृष्ठों को 90° या 180° घुमाकर सुधारें",
        "स्कैन किए गए दस्तावेज़ों के अतिरिक्त हाशिये काटें और मुद्रण के लिए अनुकूलित करें",
        "समीक्षा या ऑडिट के दौरान PDF में टिप्पणियां, नोट्स और हाईलाइट जोड़ें",
        "खराब या नहीं खुलने वाली PDF फ़ाइलों को रिपेयर करके सामग्री बाज़याब करें",
      ],
      troubleshooting: [
        { problem: "वॉटरमार्क गलत जगह दिखता है या दिखाई नहीं देता", solution: "Opacity और Position सेटिंग समायोजित करें। टेक्स्ट वॉटरमार्क के लिए पर्याप्त कंट्रास्ट वाला रंग और फ़ॉन्ट साइज़ चुनें।" },
        { problem: "पृष्ठ संख्याएं सभी पृष्ठों पर सही से नहीं जुड़तीं", solution: "यदि PDF में गैर-मानक पृष्ठ आकार हैं तो संख्याएं विस्थापित हो सकती हैं। Margin Options का उपयोग करके सटीक स्थिति समायोजित करें।" },
      ],
    },
    ocr_extract: {
      useCaseItems: [
        "स्कैन किए गए दस्तावेज़ों और अनुबंधों को पूरी तरह से सर्चेबल और संपादन योग्य बनाएं",
        "GST इनवॉइस PDF से टेक्स्ट निकालकर अकाउंटिंग सॉफ़्टवेयर में आयात करें",
        "PDF प्रेजेंटेशन और कैटलॉग में एम्बेड की गई सभी इमेज अलग फ़ाइलों के रूप में निकालें",
        "पुरानी काग़ज़ी फाइलों को डिजिटाइज़ करके सर्चेबल PDF आर्काइव बनाएं",
        "बैंक स्टेटमेंट और ITR फाइलों से टेबल डेटा Excel विश्लेषण के लिए निकालें",
        "दृष्टिबाधित उपयोगकर्ताओं के लिए स्कैन PDF का पाठ्य संस्करण तैयार करें",
      ],
      troubleshooting: [
        { problem: "OCR से पहचाने गए टेक्स्ट में कई गलतियां हैं", solution: "OCR की गुणवत्ता स्कैन रिज़ॉल्यूशन पर निर्भर करती है। कम से कम 300 DPI पर ग्रेस्केल में स्कैन करें। Enhancement विकल्प सक्षम करें।" },
        { problem: "PDF से निकाली गई इमेज कम रिज़ॉल्यूशन की हैं", solution: "यदि मूल PDF में इमेज कम रिज़ॉल्यूशन पर एम्बेड थीं तो उन्हें बेहतर नहीं किया जा सकता। उच्च गुणवत्ता के लिए मूल स्रोत फ़ाइलें उपयोग करें।" },
      ],
    },
  },

  fr: {
    compress: {
      useCaseItems: [
        "Réduire les PDF volumineux sous 25 Mo pour les joindre aux e-mails sans dépasser les limites des serveurs",
        "Libérer de l'espace sur Google Drive, SharePoint et les serveurs d'entreprise en compressant les archives",
        "Préparer les dossiers administratifs Cerfa pour les plateformes en ligne de l'État et des collectivités",
        "Compresser les brochures et catalogues commerciaux pour les partager via Slack, Teams ou WhatsApp",
        "Réduire le poids des CV et portfolios numériques avant de les déposer sur Pôle Emploi ou LinkedIn",
        "Archiver de grandes quantités de factures et déclarations fiscales dans des bases documentaires numériques",
      ],
      troubleshooting: [
        { problem: "Le fichier compressé ne réduit pas significativement sa taille", solution: "Cela se produit généralement quand le PDF contient déjà des images très compressées. Essayez le niveau «Élevé» ou activez l'option de réduction de résolution des images intégrées dans les paramètres avancés." },
        { problem: "La qualité du document se dégrade trop après compression", solution: "Sélectionnez le niveau «Équilibré» plutôt que «Compression maximale» pour maintenir un bon équilibre entre taille du fichier et netteté du texte." },
      ],
    },
    merge_split: {
      useCaseItems: [
        "Fusionner les rapports mensuels de plusieurs départements en un seul PDF consolidé pour la direction",
        "Diviser les contrats volumineux en sections indépendantes par parties ou clauses pour faciliter la lecture",
        "Extraire des chapitres spécifiques de manuels techniques ou de rapports d'audit pour distribution ciblée",
        "Supprimer les pages blanches indésirables produites par les scanners dans les documents numérisés",
        "Réorganiser l'ordre des pages d'un mémoire de master ou d'un plan d'affaires avant la remise finale",
        "Regrouper plusieurs formulaires Cerfa remplis et leurs pièces justificatives en un PDF unique pour transmission",
      ],
      troubleshooting: [
        { problem: "Le PDF fusionné présente un ordre de pages incorrect", solution: "Vérifiez que vous avez glissé les fichiers dans la zone d'import dans l'ordre exact souhaité. Vous pouvez les réorganiser avant de cliquer sur fusionner." },
        { problem: "Après la division, certaines pages apparaissent vierges ou incomplètes", solution: "Assurez-vous de spécifier le bon intervalle de pages (la numérotation commence à 1). Si des pages vierges apparaissent, elles existaient dans le document original." },
      ],
    },
    pdf_to_editable: {
      useCaseItems: [
        "Convertir des contrats numérisés en Word pour y ajouter ou modifier des clauses contractuelles",
        "Transformer les tableaux de données de rapports PDF en Excel pour des analyses statistiques et financières",
        "Convertir des présentations reçues en PDF vers PowerPoint pour les personnaliser et les réutiliser",
        "Récupérer le texte de documents juridiques en PDF quand le fichier source n'est plus disponible",
        "Adapter des modèles de documents distribués en PDF pour les mettre à jour chaque exercice fiscal",
        "Extraire le contenu de rapports annuels ou de dossiers de presse en PDF pour créer de nouveaux documents",
      ],
      troubleshooting: [
        { problem: "Le document Word généré présente une mise en forme désorganisée ou illisible", solution: "Les PDFs numérisés ou à mise en page complexe peuvent produire des conversions imparfaites. Assurez-vous que le PDF source contient du texte sélectionnable, pas uniquement des images." },
        { problem: "La conversion PDF vers Excel ne respecte pas les colonnes du tableau d'origine", solution: "Les tableaux avec cellules fusionnées ou bordures irrégulières ne se convertissent pas toujours parfaitement. Utilisez le mode de reconnaissance avancée des tableaux dans les paramètres." },
      ],
    },
    pdf_to_image: {
      useCaseItems: [
        "Convertir des diapositives PDF en images JPEG pour les partager sur LinkedIn, Instagram ou Threads",
        "Créer des vignettes de couvertures de rapports pour les afficher sur des sites web et intranets d'entreprise",
        "Extraire les pages de catalogues produits en haute résolution pour les boutiques en ligne et le e-commerce",
        "Générer des captures de documents PDF pour les insérer dans des e-mails professionnels ou présentations",
        "Préparer des infographies et graphiques issus de PDF pour les retoucher avec Photoshop ou Canva",
        "Convertir des pages de livres numériques en images pour créer des supports de formation et e-learning",
      ],
      troubleshooting: [
        { problem: "Les images converties sont de faible résolution ou semblent pixelisées", solution: "Sélectionnez une résolution plus élevée (300 DPI ou plus) dans les options avancées. Les images haute résolution généreront des fichiers plus volumineux." },
        { problem: "Les couleurs du PDF ne correspondent pas exactement à l'image générée", solution: "Cela peut se produire avec des PDFs utilisant des profils de couleur CMYK. Activez la conversion de l'espace colorimétrique dans les paramètres avancés." },
      ],
    },
    to_pdf: {
      useCaseItems: [
        "Créer des propositions commerciales et devis professionnels en PDF directement depuis un document Word",
        "Enregistrer des feuilles de calcul Excel avec données financières au format PDF pour le comptable",
        "Transformer des présentations PowerPoint en PDF à envoyer aux clients sans risque de modification",
        "Archiver des pages Web ou des articles d'actualité au format PDF pour consultation hors ligne",
        "Numériser des documents physiques scannés et les enregistrer en PDF pour l'archivage numérique",
        "Créer des PDF à partir d'images de produits et d'œuvres pour des catalogues et portfolios numériques",
      ],
      troubleshooting: [
        { problem: "Le PDF généré ne conserve pas correctement les polices ou styles du document source", solution: "Vérifiez que les polices utilisées dans le document d'origine sont correctement installées. Pour les documents Word avec polices personnalisées, activez «Incorporer les polices» avant la conversion." },
        { problem: "Les images du PDF obtenu apparaissent floues ou de faible qualité", solution: "Augmentez la résolution d'image dans les paramètres de conversion à 150 DPI minimum. Pour les documents avec visuels haute qualité, choisissez 300 DPI." },
      ],
    },
    security: {
      useCaseItems: [
        "Chiffrer des rapports financiers confidentiels avec un mot de passe avant de les transmettre aux clients",
        "Ajouter des signatures électroniques juridiquement valides (conformes à eIDAS et RGPD) aux contrats",
        "Déverrouiller des PDFs protégés dont le mot de passe a été oublié, en tant que propriétaire légitime",
        "Masquer des données personnelles sensibles (numéro de sécurité sociale, IBAN) avant de partager des documents",
        "Se conformer au RGPD et à la loi Informatique et Libertés lors de la gestion de documents avec données clients",
        "Protéger des thèses, mémoires et travaux de recherche contre toute utilisation non autorisée",
      ],
      troubleshooting: [
        { problem: "J'ai oublié le mot de passe du PDF que je souhaite déverrouiller", solution: "Si vous êtes le propriétaire légitime du document, essayez de vous remémorer les mots de passe utilisés précédemment. Ne déverrouillez que les PDFs dont vous êtes le propriétaire légal." },
        { problem: "La signature électronique ne s'affiche pas correctement dans tous les lecteurs PDF", solution: "Vérifiez que le PDF résultant est conforme à la norme PDF/A ou PDF 1.7+. La signature doit être compatible avec Adobe Acrobat, Foxit et les autres lecteurs principaux." },
      ],
    },
    edit: {
      useCaseItems: [
        "Ajouter le logo ou la marque d'eau de l'entreprise en filigrane semi-transparent sur tous les documents officiels",
        "Numéroter automatiquement les pages de rapports juridiques, contrats et documents de procédure",
        "Corriger l'orientation de pages scannées en position incorrecte (rotation 90° ou 180°)",
        "Recadrer les marges excessives de documents numérisés pour optimiser l'impression et économiser le papier",
        "Ajouter des commentaires, annotations et surlignages dans des PDFs lors de révisions ou d'audits",
        "Réparer des fichiers PDF endommagés ou corrompus qui ne s'ouvrent pas correctement dans les visionneuses",
      ],
      troubleshooting: [
        { problem: "Le filigrane apparaît dans une mauvaise position ou n'est pas suffisamment visible", solution: "Ajustez le niveau d'opacité et la position dans les options de l'outil. Pour les filigranes textuels, assurez-vous que la police et la couleur contrastent bien avec l'arrière-plan." },
        { problem: "Les numéros de page ne s'ajoutent pas correctement sur tous les documents", solution: "Si le PDF utilise un format de page non standard, les numéros peuvent apparaître décalés. Utilisez les options de marge pour ajuster précisément leur position dans les coins de chaque page." },
      ],
    },
    ocr_extract: {
      useCaseItems: [
        "Rendre des documents numérisés et archives papier entièrement recherchables et indexables",
        "Extraire le texte des factures PDF pour l'importer dans les logiciels de comptabilité (Sage, EBP, Cegid)",
        "Récupérer toutes les images intégrées dans des présentations et catalogues PDF en fichiers séparés",
        "Numériser et traiter des archives historiques papier pour les convertir en PDF textuels interrogeables",
        "Extraire des données tabulaires de relevés bancaires ou de déclarations fiscales pour analyses Excel",
        "Créer des versions accessibles de PDFs scannés pour les utilisateurs malvoyants ou non-voyants",
      ],
      troubleshooting: [
        { problem: "Le texte reconnu par OCR contient de nombreuses erreurs", solution: "La qualité de l'OCR dépend directement de la résolution du document numérisé. Scannez à un minimum de 300 DPI en niveaux de gris pour les meilleurs résultats de reconnaissance." },
        { problem: "Les images extraites du PDF sont de faible résolution", solution: "Si les images originales ont été intégrées en basse résolution dans le PDF, il n'est pas possible de les améliorer lors de l'extraction. Accédez aux sources originales haute qualité si disponibles." },
      ],
    },
  },

  pt: {
    compress: {
      useCaseItems: [
        "Reduzir PDFs acima de 25 MB para enviá-los por e-mail sem ultrapassar o limite de anexos",
        "Economizar espaço de armazenamento no Google Drive, OneDrive e servidores corporativos",
        "Preparar arquivos para envio em formulários online da Receita Federal, INSS e Governo Federal",
        "Compactar catálogos digitais e folhetos comerciais para compartilhamento via WhatsApp e Telegram",
        "Reduzir o peso de currículos e portfólios digitais para upload em plataformas de emprego brasileiras",
        "Arquivar grandes volumes de notas fiscais, contracheques e declarações de IR no sistema digital da empresa",
      ],
      troubleshooting: [
        { problem: "O arquivo comprimido não reduziu significativamente seu tamanho", solution: "Isso ocorre quando o PDF já contém imagens muito comprimidas. Experimente o nível 'Agressivo' ou ative a opção de redução de resolução das imagens incorporadas nas configurações avançadas." },
        { problem: "A qualidade do documento ficou muito ruim após a compressão", solution: "Selecione o nível de qualidade 'Equilibrado' em vez de 'Compressão Máxima' para manter um bom equilíbrio entre tamanho do arquivo e nitidez do texto e das imagens." },
      ],
    },
    merge_split: {
      useCaseItems: [
        "Unir os relatórios mensais de vários departamentos em um único PDF consolidado para a diretoria",
        "Dividir contratos extensos em seções independentes por cláusulas ou partes signatárias",
        "Extrair capítulos específicos de manuais técnicos ou relatórios de auditoria para distribuição seletiva",
        "Remover páginas em branco indesejadas produzidas por scanners em documentos digitalizados",
        "Reorganizar a ordem das páginas de TCCs, dissertações ou memoriais antes da entrega final",
        "Combinar múltiplos formulários preenchidos e anexos em um único PDF para protocolo oficial",
      ],
      troubleshooting: [
        { problem: "O PDF combinado exibe as páginas em ordem incorreta", solution: "Certifique-se de arrastar os arquivos para a área de upload na ordem correta antes de clicar em combinar. Você pode reorganizá-los manualmente antes de iniciar o processo." },
        { problem: "Após a divisão, algumas páginas aparecem em branco ou incompletas", solution: "Verifique se está especificando o intervalo de páginas correto (a numeração começa em 1). Se páginas em branco aparecerem, elas já existiam no documento original." },
      ],
    },
    pdf_to_editable: {
      useCaseItems: [
        "Converter contratos digitalizados para Word para adicionar ou atualizar cláusulas e condições",
        "Transformar tabelas de dados de relatórios PDF em Excel para análise financeira e contábil",
        "Converter apresentações recebidas em PDF para PowerPoint para personalizá-las e reutilizá-las",
        "Recuperar o texto de documentos jurídicos em PDF quando o arquivo original não está disponível",
        "Adaptar modelos corporativos distribuídos em PDF para atualizá-los a cada novo exercício fiscal",
        "Extrair conteúdo de relatórios anuais ou dossiês em PDF para criar novos documentos com eficiência",
      ],
      troubleshooting: [
        { problem: "O documento Word gerado tem formatação desorganizada ou ilegível", solution: "PDFs digitalizados ou com layout complexo podem produzir conversões imperfeitas. Certifique-se de que o PDF contém texto selecionável, não apenas imagens digitalizadas." },
        { problem: "A conversão de PDF para Excel não preserva as colunas da tabela original", solution: "Tabelas com células mescladas ou bordas irregulares podem não converter perfeitamente. Use o modo de reconhecimento avançado de tabelas nas configurações." },
      ],
    },
    pdf_to_image: {
      useCaseItems: [
        "Converter slides de PDF em imagens JPEG para compartilhamento no LinkedIn, Instagram ou Twitter",
        "Criar miniaturas de capas de relatórios para publicação em sites e intranets corporativas",
        "Extrair páginas de catálogos de produtos em alta resolução para uso em e-commerce e marketplaces",
        "Gerar capturas de documentos PDF para inserção em e-mails e apresentações corporativas",
        "Preparar infográficos e gráficos extraídos de PDFs para edição no Photoshop ou Canva",
        "Converter páginas de livros digitais em imagens para criação de materiais de EAD e treinamento",
      ],
      troubleshooting: [
        { problem: "As imagens convertidas têm resolução baixa ou parecem pixeladas", solution: "Selecione uma resolução mais alta (300 DPI ou mais) nas opções avançadas. Imagens de alta resolução geram arquivos maiores." },
        { problem: "As cores do PDF não correspondem exatamente à imagem gerada", solution: "Isso pode ocorrer com PDFs que usam perfis de cor CMYK. Ative a opção de conversão de espaço de cor nas configurações avançadas." },
      ],
    },
    to_pdf: {
      useCaseItems: [
        "Criar propostas comerciais e orçamentos profissionais em PDF diretamente a partir de documentos Word",
        "Salvar planilhas Excel com dados financeiros em PDF com formatação perfeita para envio ao contador",
        "Transformar apresentações PowerPoint em PDF para enviar a clientes sem possibilidade de edição",
        "Arquivar páginas web e artigos de interesse em PDF para leitura offline e referência futura",
        "Digitalizar documentos físicos e salvá-los em PDF para o arquivo digital corporativo",
        "Criar PDFs de imagens de produtos e obras de design para portfólios e catálogos digitais profissionais",
      ],
      troubleshooting: [
        { problem: "O PDF gerado não preserva corretamente as fontes ou estilos do documento fonte", solution: "Certifique-se de que as fontes usadas no documento original estão instaladas. Para Word com fontes personalizadas, ative 'Incorporar Fontes' antes da conversão." },
        { problem: "As imagens no PDF resultante aparecem borradas ou de baixa qualidade", solution: "Aumente a resolução de imagem nas configurações de conversão para no mínimo 150 DPI. Para imagens de alta qualidade, use 300 DPI." },
      ],
    },
    security: {
      useCaseItems: [
        "Criptografar relatórios financeiros confidenciais com senha antes de compartilhá-los com clientes",
        "Adicionar assinaturas eletrônicas com validade jurídica conforme MP 2.200-2/01 e ICP-Brasil a contratos",
        "Desbloquear PDFs protegidos por senha esquecida sendo o proprietário legítimo do arquivo",
        "Ocultar dados pessoais sensíveis (CPF, CNPJ, dados bancários) antes de compartilhar documentos publicamente",
        "Atender às exigências da LGPD ao gerenciar documentos com dados pessoais de clientes e funcionários",
        "Proteger teses, dissertações e trabalhos acadêmicos contra uso não autorizado e plágio",
      ],
      troubleshooting: [
        { problem: "Esqueci a senha do PDF que quero desbloquear", solution: "Se você é o proprietário legítimo do documento, tente lembrar senhas utilizadas anteriormente. Só desbloqueie PDFs dos quais você é o proprietário legal." },
        { problem: "A assinatura eletrônica não é exibida corretamente em todos os visualizadores PDF", solution: "Verifique se o PDF resultante está em conformidade com PDF/A ou PDF 1.7+. A assinatura deve ser compatível com Adobe Acrobat, Foxit e outros leitores principais." },
      ],
    },
    edit: {
      useCaseItems: [
        "Adicionar o logotipo corporativo como marca d'água semitransparente em todos os documentos da empresa",
        "Numerar automaticamente as páginas de relatórios jurídicos, contratos e documentos de processo",
        "Corrigir a orientação de páginas digitalizadas em posição incorreta (giradas 90° ou 180°)",
        "Cortar as margens excessivas de documentos digitalizados para otimizar a impressão e economizar papel",
        "Adicionar comentários, notas e destaques em PDFs durante processos de revisão ou auditoria",
        "Reparar arquivos PDF corrompidos ou danificados que não abrem corretamente em nenhum visualizador",
      ],
      troubleshooting: [
        { problem: "A marca d'água aparece em posição errada ou não está visível", solution: "Ajuste o nível de opacidade e a posição nas opções. Para marcas d'água textuais, certifique-se de que a fonte e a cor contrastem adequadamente com o fundo da página." },
        { problem: "Os números de página não são adicionados corretamente em todos os documentos", solution: "Se o PDF usa um tamanho de página não padrão, os números podem aparecer deslocados. Use as opções de margem para ajustar com precisão a posição nos cantos de cada página." },
      ],
    },
    ocr_extract: {
      useCaseItems: [
        "Tornar documentos digitalizados e arquivos históricos em papel completamente pesquisáveis",
        "Extrair o conteúdo textual de faturas PDF para importação direta em sistemas de ERP e contabilidade",
        "Obter todas as imagens incorporadas em apresentações e catálogos PDF como arquivos separados",
        "Digitalizar e processar arquivos históricos em papel para convertê-los em PDFs com texto pesquisável",
        "Extrair dados tabulares de extratos bancários ou declarações de IR para análise em planilhas Excel",
        "Criar versões acessíveis de PDFs digitalizados para usuários com deficiência visual",
      ],
      troubleshooting: [
        { problem: "O texto reconhecido pelo OCR contém muitos erros", solution: "A qualidade do OCR depende diretamente da resolução do documento. Digitalize com no mínimo 300 DPI em escala de cinza para os melhores resultados de reconhecimento." },
        { problem: "As imagens extraídas do PDF têm resolução baixa", solution: "Se as imagens originais foram incorporadas em baixa resolução, não é possível melhorá-las na extração. Sempre acesse as fontes originais de alta qualidade quando disponíveis." },
      ],
    },
  },

  de: {
    compress: {
      useCaseItems: [
        "Große PDF-Dateien auf unter 25 MB komprimieren, um sie problemlos als E-Mail-Anhang zu versenden",
        "Speicherplatz auf Google Drive, OneDrive und Unternehmensservern durch komprimierte Dokumente sparen",
        "Unterlagen für Online-Formulare von Finanzamt, Krankenkasse oder BAMF vorbereiten",
        "Kataloge und Vertriebsunterlagen für den Versand per WhatsApp und Microsoft Teams komprimieren",
        "Bewerbungsunterlagen und Portfolios verkleinern, bevor sie auf Job-Portalen hochgeladen werden",
        "Große Mengen an Rechnungen, Steuererklärungen und Lohnunterlagen digital langzeitarchivieren",
      ],
      troubleshooting: [
        { problem: "Die komprimierte Datei hat sich nicht merklich verkleinert", solution: "Das tritt auf, wenn das PDF bereits stark komprimierte Bilder enthält. Versuchen Sie Kompressionsstufe «Aggressiv» oder aktivieren Sie die Bildauflösungsreduktion in den erweiterten Einstellungen." },
        { problem: "Die Dokumentenqualität nach der Komprimierung ist zu schlecht", solution: "Wählen Sie die Qualitätsstufe «Ausgewogen» statt «Maximale Kompression», um ein gutes Gleichgewicht zwischen Dateigröße und Schärfe zu bewahren." },
      ],
    },
    merge_split: {
      useCaseItems: [
        "Monatliche Berichte verschiedener Abteilungen zu einem einzigen konsolidierten PDF für die Geschäftsführung zusammenführen",
        "Umfangreiche Verträge nach Vertragsparteien oder Klauseln in unabhängige Abschnitte aufteilen",
        "Bestimmte Kapitel aus technischen Handbüchern oder Prüfberichten für gezielte Verteilung herausnehmen",
        "Unerwünschte Leerseiten aus eingescannten Dokumenten entfernen und Dateigröße reduzieren",
        "Die Seitenreihenfolge einer Bachelor- oder Masterarbeit vor der Abgabe neu anordnen",
        "Mehrere ausgefüllte Formulare und Anhänge für offizielle Einreichungen in einer Datei zusammenführen",
      ],
      troubleshooting: [
        { problem: "Das zusammengeführte PDF zeigt Seiten in falscher Reihenfolge", solution: "Stellen Sie sicher, dass die Dateien in der korrekten Reihenfolge in den Upload-Bereich gezogen wurden. Sie können die Reihenfolge manuell anpassen, bevor Sie auf Zusammenführen klicken." },
        { problem: "Nach der Teilung erscheinen einige Seiten leer oder unvollständig", solution: "Überprüfen Sie, ob der richtige Seitenbereich angegeben wurde (Nummerierung beginnt bei 1). Leere Seiten im Ergebnis waren bereits im Originaldokument vorhanden." },
      ],
    },
    pdf_to_editable: {
      useCaseItems: [
        "Eingescannte Verträge in Word umwandeln, um Klauseln hinzuzufügen oder Bedingungen zu aktualisieren",
        "Datentabellen aus PDF-Berichten in Excel überführen für statistische Analysen und Reports",
        "Erhaltene PDF-Präsentationen in PowerPoint konvertieren, um sie anzupassen und wiederzuverwenden",
        "Text aus Rechtsdokumenten im PDF-Format wiederherstellen, wenn die Quelldatei nicht verfügbar ist",
        "Im PDF-Format verteilte Unternehmensvorlagen anpassen, um sie jedes Geschäftsjahr zu aktualisieren",
        "Inhalte aus Geschäftsberichten oder Pressemitteilungen im PDF-Format für neue Dokumente extrahieren",
      ],
      troubleshooting: [
        { problem: "Das resultierende Word-Dokument weist unstrukturierte Formatierung auf", solution: "Eingescannte oder komplex layoutete PDFs können zu unvollständigen Konvertierungen führen. Stellen Sie sicher, dass das Quell-PDF auswählbaren Text enthält und kein reines Scan-Bild ist." },
        { problem: "Die PDF-zu-Excel-Konvertierung erhält die Spaltenstruktur nicht", solution: "Tabellen mit zusammengeführten Zellen oder unregelmäßigen Rahmen lassen sich nicht immer perfekt konvertieren. Verwenden Sie den erweiterten Tabellenerkennungsmodus in den Einstellungen." },
      ],
    },
    pdf_to_image: {
      useCaseItems: [
        "PDF-Folien in JPEG-Bilder umwandeln, um sie auf LinkedIn, Xing oder sozialen Netzwerken zu teilen",
        "Miniaturvorschauen von Berichtsdeckblättern für Webseiten und Unternehmens-Intranets erstellen",
        "Produktkatalogseiten in hoher Auflösung extrahieren, um sie in Online-Shops zu verwenden",
        "PDF-Dokument-Screenshots erzeugen, um sie in E-Mails und Präsentationen einzubetten",
        "Infografiken und Diagramme aus PDFs als Bilder exportieren für Bildbearbeitungssoftware",
        "Seiten aus digitalen Büchern in Bilder umwandeln, um E-Learning-Materialien zu erstellen",
      ],
      troubleshooting: [
        { problem: "Die konvertierten Bilder haben eine niedrige Auflösung oder wirken pixelig", solution: "Wählen Sie in den erweiterten Optionen eine höhere Auflösung (300 DPI oder mehr). Hochauflösende Bilder erzeugen größere Dateien." },
        { problem: "Die Farben des PDFs stimmen nicht exakt mit dem konvertierten Bild überein", solution: "Dies kann bei PDFs mit CMYK-Farbprofilen auftreten. Aktivieren Sie die Farbraumkonvertierung in den erweiterten Einstellungen." },
      ],
    },
    to_pdf: {
      useCaseItems: [
        "Professionelle Angebote und Berichte direkt aus Word-Dokumenten als PDF erstellen",
        "Excel-Tabellen mit Finanzdaten als PDF speichern und korrekt formatiert an den Steuerberater senden",
        "PowerPoint-Präsentationen in PDF umwandeln, um sie an Kunden zu senden, ohne Bearbeitung zu ermöglichen",
        "Webseiten und Online-Artikel als PDF archivieren, um sie offline zu lesen und als Referenz zu bewahren",
        "Eingescannte physische Dokumente digitalisieren und als strukturierte PDF-Dateien speichern",
        "Produktbilder und Designarbeiten als PDF-Kataloge und digitale Portfolios aufbereiten",
      ],
      troubleshooting: [
        { problem: "Das erzeugte PDF übernimmt Schriften oder Stile des Quelldokuments nicht korrekt", solution: "Stellen Sie sicher, dass die verwendeten Schriftarten korrekt installiert sind. Aktivieren Sie bei Word-Dokumenten mit benutzerdefinierten Schriften die Option «Schriften einbetten» vor der Konvertierung." },
        { problem: "Bilder im resultierenden PDF erscheinen unscharf oder in niedriger Qualität", solution: "Erhöhen Sie die Bildauflösung in den Konvertierungseinstellungen auf mindestens 150 DPI. Für hochqualitative Grafiken wählen Sie 300 DPI." },
      ],
    },
    security: {
      useCaseItems: [
        "Vertrauliche Finanzberichte mit einem Passwort verschlüsseln, bevor sie an Kunden weitergeleitet werden",
        "Rechtsgültige elektronische Signaturen gemäß eIDAS-Verordnung und Signaturgesetz zu Verträgen hinzufügen",
        "Passwortgeschützte PDFs entsperren, deren Kennwort als legitimer Eigentümer vergessen wurde",
        "Sensible personenbezogene Daten wie Steuer-ID, IBAN oder Gesundheitsdaten vor der Weitergabe schwärzen",
        "DSGVO-konform mit personenbezogenen Daten in Dokumenten umgehen und BDSG-Anforderungen erfüllen",
        "Abschlussarbeiten, Dissertationen und Forschungsergebnisse vor unberechtigter Nutzung schützen",
      ],
      troubleshooting: [
        { problem: "Ich habe das Passwort des PDFs vergessen, das ich entsperren möchte", solution: "Falls Sie der legitime Eigentümer sind, versuchen Sie, früher verwendete Passwörter zu rekonstruieren. Entsperren Sie nur PDFs, für die Sie das rechtliche Eigentumsrecht besitzen." },
        { problem: "Die elektronische Signatur wird in einigen PDF-Readern nicht korrekt angezeigt", solution: "Prüfen Sie, ob das resultierende PDF dem PDF/A- oder PDF 1.7+-Standard entspricht. Die Signatur sollte mit Adobe Acrobat, Foxit und anderen gängigen PDF-Readern kompatibel sein." },
      ],
    },
    edit: {
      useCaseItems: [
        "Das Unternehmenslogo als halbtransparentes Wasserzeichen auf alle offiziellen Dokumente setzen",
        "Seiten von Rechtsgutachten, Verträgen und Akten automatisch nummerieren",
        "Falsch orientierte eingescannte Seiten korrigieren (um 90° oder 180° gedreht)",
        "Übermäßige Ränder von eingescannten Dokumenten beschneiden, um den Druck zu optimieren",
        "Kommentare, Notizen und Markierungen in PDFs für Überprüfungsprozesse und Audits hinzufügen",
        "Beschädigte oder korrupte PDF-Dateien reparieren, die sich in keinem Viewer öffnen lassen",
      ],
      troubleshooting: [
        { problem: "Das Wasserzeichen erscheint an falscher Position oder ist kaum sichtbar", solution: "Passen Sie Deckkraft und Position des Wasserzeichens in den Optionen an. Bei Textwasserzeichen achten Sie auf ausreichenden Kontrast zwischen Schrift und Seitenhintergrund." },
        { problem: "Seitenzahlen werden nicht auf allen Seiten korrekt hinzugefügt", solution: "Bei PDFs mit nicht standardmäßigen Seitenformaten können Zahlen versetzt erscheinen. Verwenden Sie die Randoptionen, um die genaue Position in den Seitenecken anzupassen." },
      ],
    },
    ocr_extract: {
      useCaseItems: [
        "Eingescannte Dokumente und Papierdokumente vollständig durchsuchbar und indizierbar machen",
        "Textinhalte aus Rechnungs-PDFs extrahieren und direkt in DATEV oder SAP importieren",
        "Alle in Präsentationen und Katalogen eingebetteten Bilder als separate Dateien extrahieren",
        "Historische Papierdokumente digitalisieren und in durchsuchbare PDFs umwandeln",
        "Tabellendaten aus Kontoauszügen oder Steuererklärungen für die Excel-Analyse extrahieren",
        "Barrierefreie Versionen von eingescannten PDFs für Nutzer mit Sehbehinderungen erstellen",
      ],
      troubleshooting: [
        { problem: "Der per OCR erkannte Text enthält viele Fehler", solution: "Die OCR-Qualität hängt direkt von der Auflösung des gescannten Dokuments ab. Scannen Sie mit mindestens 300 DPI in Graustufen für beste Erkennungsergebnisse." },
        { problem: "Die aus dem PDF extrahierten Bilder haben niedrige Auflösung", solution: "Wenn die Originalbilder mit niedriger Auflösung in das PDF eingebettet wurden, kann diese nicht verbessert werden. Greifen Sie immer auf die Originalbilder in höherer Qualität zurück, falls verfügbar." },
      ],
    },
  },

  zh: {
    compress: {
      useCaseItems: [
        "将超过25MB的大型PDF压缩后通过电子邮件发送，不超过附件大小限制",
        "在百度网盘、腾讯文档或企业服务器上节省存储空间",
        "为政务大厅、税务局官网和社保系统的文件上传要求准备合规文件",
        "将求职简历和作品集压缩后上传至招聘网站（智联招聘、前程无忧等）",
        "在微信和钉钉群中轻松分享大型产品目录和商务材料",
        "批量压缩增值税发票、纳税申报表和财务凭证以便长期数字存档",
      ],
      troubleshooting: [
        { problem: "压缩后文件大小没有明显减小", solution: "这通常发生在PDF中的图片已经高度压缩的情况下。尝试使用「高压缩」级别，或在高级设置中启用降低嵌入图片分辨率的选项。" },
        { problem: "压缩后文档质量明显下降", solution: "选择「均衡」质量级别而不是「最大压缩」，以在文件大小和文字图片清晰度之间取得良好平衡。" },
      ],
    },
    merge_split: {
      useCaseItems: [
        "将多个部门的月度业绩报告合并为一份统一的PDF汇总文件提交给管理层",
        "将大型合同按条款或签约方拆分为独立章节，方便各方分别审阅",
        "从技术手册或审计报告中提取特定章节进行选择性分发",
        "删除扫描文档中的空白页，整理和优化电子档案文件",
        "在提交毕业论文或项目报告前重新排列页面顺序",
        "将多份填写好的表格和附件合并为一个PDF进行官方提交和存档",
      ],
      troubleshooting: [
        { problem: "合并后的PDF页面顺序不正确", solution: "确保在点击合并按钮前按照正确顺序拖拽文件到上传区域。您可以在开始处理前手动调整文件顺序。" },
        { problem: "分割后某些页面显示为空白或不完整", solution: "请确认指定的页码范围正确（页码从1开始计数）。如果结果中出现空白页，这些页面在原始文档中就已存在。" },
      ],
    },
    pdf_to_editable: {
      useCaseItems: [
        "将扫描的合同PDF转为Word以便修改条款和添加新的合同内容",
        "将财务报告中的数据表格提取到Excel进行分析、建模和报表制作",
        "将收到的PDF演示文稿转为PowerPoint以便自定义内容和再次使用",
        "当原始文件不可用时从法律文件PDF中恢复可编辑的文本内容",
        "将以PDF格式分发的公司模板转换为可编辑版本以便每年更新",
        "从年度报告或宣传资料中提取内容用于创建新的业务文档",
      ],
      troubleshooting: [
        { problem: "生成的Word文档格式混乱或文字无法正确显示", solution: "扫描版PDF或布局复杂的PDF有时会产生不完美的转换结果。请确保原始PDF包含可选择的文本，而不仅仅是扫描图像。" },
        { problem: "PDF转Excel时表格列结构未能正确保留", solution: "含有合并单元格或不规则边框的表格可能无法完美转换。请尝试使用设置中的高级表格识别模式。" },
      ],
    },
    pdf_to_image: {
      useCaseItems: [
        "将PDF演示文稿幻灯片转为JPEG图片发布到微信公众号、微博或小红书",
        "为企业内网或官网生成报告封面缩略图预览供访客浏览",
        "高分辨率提取产品目录页面用于电商平台（淘宝、京东、拼多多）商品图",
        "生成PDF文件截图嵌入到邮件或工作汇报中使用",
        "将PDF中的信息图和图表导出为图片以便用Photoshop或Figma进行编辑",
        "将电子书页面转为图片以制作在线培训课件和学习材料",
      ],
      troubleshooting: [
        { problem: "转换后的图片分辨率低或呈现像素化效果", solution: "在高级选项中选择更高的分辨率（300 DPI或以上）。请注意，高分辨率图片会生成更大的文件。" },
        { problem: "PDF的颜色与转换后图片的颜色不完全匹配", solution: "这可能发生在使用CMYK色彩配置文件的PDF中。在高级设置中启用色彩空间转换选项可提高色彩准确性。" },
      ],
    },
    to_pdf: {
      useCaseItems: [
        "将Word商业计划书和报告转为专业PDF格式进行发送和正式存档",
        "将Excel财务报表和增值税发票以PDF格式保存，保留完整排版格式",
        "将PowerPoint演示文稿转为PDF以便发送给客户，防止内容被随意修改",
        "将网页和在线文章保存为PDF以便离线查看和长期参考保存",
        "将纸质扫描文件数字化并以PDF格式存档，建立企业电子文档库",
        "将产品图片和设计作品整合为专业PDF目录和创意作品集",
      ],
      troubleshooting: [
        { problem: "生成的PDF未能正确保留源文档的字体或样式", solution: "请确保原文档中使用的字体已正确安装在您的系统上。对于含有自定义字体的Word文档，请在转换前启用「嵌入字体」选项。" },
        { problem: "生成PDF中的图片模糊或质量不佳", solution: "将转换设置中的图片分辨率调高至至少150 DPI。对于包含高质量图片的文档，选择300 DPI以获得最佳效果。" },
      ],
    },
    security: {
      useCaseItems: [
        "对含有商业机密的财务报告设置密码加密后再发送给客户或合作伙伴",
        "为合同和协议添加符合《电子签名法》的合法有效数字签名",
        "作为合法所有者解锁忘记密码的PDF文件恢复正常访问权限",
        "在分享文件前遮盖个人敏感信息（身份证号码、银行账号等）保护隐私",
        "依据《个人信息保护法》（PIPL）及《数据安全法》合规处理含有个人数据的文档",
        "保护学术论文、研究成果和发明专利，防止未授权使用和学术抄袭",
      ],
      troubleshooting: [
        { problem: "忘记了要解锁的PDF的密码", solution: "如果您是文件的合法所有者，请尝试回忆之前使用的密码。请注意，您只应解锁您拥有合法访问权限的PDF文件。" },
        { problem: "电子签名在某些PDF阅读器中无法正确显示", solution: "请检查生成的PDF是否符合PDF/A或PDF 1.7+标准。签名应与Adobe Acrobat、Foxit和其他主流PDF阅读器兼容。" },
      ],
    },
    edit: {
      useCaseItems: [
        "在所有公司文件上添加带有企业Logo的半透明品牌水印统一视觉识别",
        "自动为法律文件、合同书和长篇报告添加规范的页码编号",
        "修正扫描时方向错误的页面（旋转90°或180°）恢复正确阅读方向",
        "裁剪扫描文档多余的白色边距以节约打印纸张和存储空间",
        "在PDF中添加批注、注释和高亮标记以供团队审阅和协作使用",
        "修复损坏或无法正常打开的PDF文件恢复重要内容和数据",
      ],
      troubleshooting: [
        { problem: "水印出现在错误位置或显示不清晰", solution: "在工具选项中调整水印的透明度和位置。对于文字水印，请确保字体大小和颜色与页面背景有足够的对比度。" },
        { problem: "页码未能在所有页面上正确添加", solution: "如果PDF包含非标准页面尺寸，页码可能会出现偏移。使用边距选项精确调整每个页面角落的页码位置。" },
      ],
    },
    ocr_extract: {
      useCaseItems: [
        "将扫描文件和纸质档案转为可全文检索的可搜索PDF方便查阅",
        "从发票PDF中提取文本内容直接导入ERP和财务管理系统",
        "从演示文稿和产品目录PDF中提取所有嵌入图片为独立文件重复使用",
        "数字化历史纸质档案，转换为带有可识别文本的PDF存档",
        "从银行对账单和纳税申报表中提取表格数据供Excel深度分析",
        "为视力障碍用户创建可朗读的PDF文本版本，满足无障碍访问需求",
      ],
      troubleshooting: [
        { problem: "OCR识别的文本包含大量错误", solution: "OCR质量直接取决于扫描文档的分辨率。请以至少300 DPI的分辨率进行灰度扫描，以获得最佳文字识别效果。" },
        { problem: "从PDF中提取的图片分辨率较低", solution: "如果原始图片在嵌入PDF时就是低分辨率的，提取时无法提升其质量。如果可用，请访问原始高质量图片源文件。" },
      ],
    },
  },

  ja: {
    compress: {
      useCaseItems: [
        "大容量PDFを25MB未満に圧縮してメール添付ファイルの制限内で確実に送信する",
        "Google ドライブ、OneDrive、社内サーバーのストレージ容量を効率よく節約する",
        "e-Tax（国税電子申告）や自治体の電子申請ポータルのファイルサイズ要件に対応する",
        "リクナビやマイナビなどの求人サイトへの応募書類を事前に圧縮してからアップロードする",
        "LINEやSlackで大容量の製品カタログや業務資料を快適に共有する",
        "請求書や確定申告書類などの財務文書を長期デジタルアーカイブとして効率的に保存する",
      ],
      troubleshooting: [
        { problem: "圧縮後もファイルサイズが大きく変わらない", solution: "PDFにすでに高圧縮された画像が含まれている場合にこの現象が起きます。圧縮レベル「高」を試すか、詳細設定で埋め込み画像の解像度を下げるオプションを有効にしてください。" },
        { problem: "圧縮後に文書の品質が大幅に低下した", solution: "「最大圧縮」ではなく「バランス」の品質レベルを選択することで、ファイルサイズとテキスト・画像の鮮明さの適切なバランスを維持できます。" },
      ],
    },
    merge_split: {
      useCaseItems: [
        "複数部署の月次報告書を一つの統合PDFに結合して経営陣に提出する",
        "長大な契約書を当事者別・条項別に独立した章に分割して送付する",
        "技術マニュアルや監査報告書から特定の章を抜き出して選択的に配布する",
        "スキャンした文書から不要な白紙ページを削除してファイルを整理・最適化する",
        "卒業論文や事業報告書を提出前にページ順を並べ替えて最終確認する",
        "複数の記入済みフォームや添付書類を一つのPDFにまとめて公式提出する",
      ],
      troubleshooting: [
        { problem: "結合したPDFのページ順序が正しくない", solution: "ファイルを結合する前に、アップロードエリアに正しい順序でドラッグしてください。「結合」ボタンをクリックする前に順序を確認し、必要に応じて並び替えてください。" },
        { problem: "分割後に一部のページが空白または不完全に表示される", solution: "正しいページ範囲を指定しているか確認してください（ページ番号は1から始まります）。空白ページが含まれる場合、元の文書にもそのページが存在していました。" },
      ],
    },
    pdf_to_editable: {
      useCaseItems: [
        "スキャン済みの契約書をWordに変換して条項の追加や内容の修正を行う",
        "PDF報告書のデータ表をExcelに変換して統計分析やビジネスレポートを作成する",
        "受け取ったPDFプレゼンテーションをPowerPointに変換してカスタマイズする",
        "ソースファイルが手元にない法的文書のテキストをPDFから確実に復元する",
        "PDF形式で配布された社内テンプレートを各年度ごとに更新するため変換する",
        "年次報告書やプレスリリースから内容を抽出して新しい文書を効率よく作成する",
      ],
      troubleshooting: [
        { problem: "生成されたWord文書のレイアウトが乱れているか読み取れない", solution: "スキャン済みPDFや複雑なレイアウトのPDFでは変換が不完全になる場合があります。元のPDFが選択可能なテキストを含んでいること（スキャン画像のみでないこと）を確認してください。" },
        { problem: "PDFからExcelへの変換でテーブルの列構造が保持されない", solution: "結合セルや不規則な罫線を含むテーブルは完全に変換できない場合があります。設定にある高度なテーブル認識モードを使用してください。" },
      ],
    },
    pdf_to_image: {
      useCaseItems: [
        "PDFのスライドをJPEG画像に変換してLinkedIn・X（旧Twitter）・Instagramに投稿する",
        "報告書の表紙サムネイルを作成してWebサイトや社内ポータルに掲載する",
        "製品カタログのページを高解像度で抽出してECサイトの商品画像に使用する",
        "PDF文書のスクリーンショットを作成してメールやプレゼン資料に埋め込む",
        "PDFのインフォグラフィックや図表を画像として書き出してPhotoshopで編集する",
        "デジタル書籍のページを画像変換してeラーニング教材や研修コンテンツを制作する",
      ],
      troubleshooting: [
        { problem: "変換後の画像の解像度が低くピクセルが目立つ", solution: "詳細オプションで解像度を高く設定してください（300DPI以上推奨）。高解像度画像はファイルサイズが大きくなる点にご注意ください。" },
        { problem: "PDFと変換後の画像で色が正確に一致しない", solution: "CMYKカラープロファイルを使用するPDFでこの現象が起きる場合があります。詳細設定でカラースペース変換オプションを有効にすると色の精度が向上します。" },
      ],
    },
    to_pdf: {
      useCaseItems: [
        "Word文書からビジネス提案書や見積書をプロフェッショナルなPDF形式で作成する",
        "Excelの財務データや請求書をレイアウトを保ったままPDFで保存・送付する",
        "PowerPointのプレゼン資料をPDFに変換してクライアントに改変不可の形式で送る",
        "Webページや記事をPDFとしてアーカイブしてオフラインで参照できるようにする",
        "紙の文書をスキャンしてデジタル化しPDFとして体系的に整理・保管する",
        "製品画像やデザイン作品をPDFカタログ・ポートフォリオとして整備して配布する",
      ],
      troubleshooting: [
        { problem: "生成されたPDFにソース文書のフォントやスタイルが正しく反映されない", solution: "元の文書で使用されているフォントが正しくインストールされているか確認してください。カスタムフォントを使用したWordファイルは変換前に「フォントを埋め込む」オプションを有効にしてください。" },
        { problem: "生成されたPDFの画像がぼやけて見える", solution: "変換設定で画像解像度を最低150DPIに上げてください。高品質な画像を含む文書には300DPIをお勧めします。" },
      ],
    },
    security: {
      useCaseItems: [
        "機密性の高い財務報告書をパスワードで暗号化してからクライアントや取引先に送付する",
        "電子署名法・マイナンバー法に準拠した法的効力のある電子署名を契約書に追加する",
        "正規の所有者として忘れてしまったパスワードで保護されたPDFを安全に解除する",
        "マイナンバーや口座情報など機密性の高い個人情報を公開前に黒塗りで非表示にする",
        "個人情報保護法（改正APPI）に準拠した安全な方法で個人データを含む文書を管理する",
        "学術論文・研究成果・特許申請書の不正使用・剽窃を防ぐためにPDFを適切に保護する",
      ],
      troubleshooting: [
        { problem: "解除したいPDFのパスワードを忘れてしまった", solution: "正規の文書所有者であれば、以前使用したパスワードを思い出すよう試みてください。解除できるのは自分が合法的に所有するPDFのみです。" },
        { problem: "電子署名が一部のPDFリーダーで正しく表示されない", solution: "生成されたPDFがPDF/AまたはPDF 1.7+規格に準拠しているか確認してください。署名はAdobe Acrobat、Foxit、その他主要なPDFリーダーと互換性があるべきです。" },
      ],
    },
    edit: {
      useCaseItems: [
        "すべての公式文書に企業ロゴの半透明ウォーターマークを追加してブランドイメージを統一する",
        "法的報告書・契約書・議事録など長文書類にページ番号を自動付与して管理しやすくする",
        "スキャン時に誤った向きになったページを正しい方向に回転修正する（90°・180°）",
        "スキャン文書の余白を適切にトリミングして印刷用に最適化し用紙を節約する",
        "レビューや監査プロセスでPDFにコメント・注釈・ハイライトを追加して共同作業を効率化する",
        "開けなくなった破損・壊れたPDFファイルを修復して重要なコンテンツを回復する",
      ],
      troubleshooting: [
        { problem: "ウォーターマークが誤った位置に表示される、または見えにくい", solution: "ツールのオプションで不透明度と配置を調整してください。テキストウォーターマークの場合、フォントサイズとカラーがページ背景と十分なコントラストを持つようにしてください。" },
        { problem: "ページ番号が全ページに正しく追加されない", solution: "非標準のページサイズのPDFでは番号がずれる場合があります。余白オプションを使用して各ページのコーナーでの正確な位置を調整してください。" },
      ],
    },
    ocr_extract: {
      useCaseItems: [
        "スキャン文書や紙の書類を完全に検索可能・テキスト抽出可能なPDFに変換する",
        "請求書PDFからテキストデータを抽出して会計ソフトや基幹システムにインポートする",
        "プレゼン資料やカタログPDFに埋め込まれたすべての画像を個別ファイルとして取り出す",
        "歴史的な紙の文書・記録をデジタル化して検索可能なPDFアーカイブとして長期保存する",
        "通帳や確定申告書の表データをExcel分析用に正確に抽出する",
        "視覚障害のある利用者向けにスキャンPDFのアクセシブルなテキスト版を作成する",
      ],
      troubleshooting: [
        { problem: "OCRで認識されたテキストに多くのエラーが含まれている", solution: "OCRの品質はスキャン解像度に直接影響します。グレースケールで最低300DPIでスキャンして最良の認識結果を得てください。" },
        { problem: "PDFから抽出した画像の解像度が低い", solution: "元の画像が低解像度でPDFに埋め込まれている場合、抽出時の品質向上は不可能です。可能な場合は常に元の高品質な画像ソースにアクセスしてください。" },
      ],
    },
  },

  id: {
    compress: {
      useCaseItems: [
        "Mengecilkan file PDF besar di bawah 25 MB agar bisa dikirim sebagai lampiran email tanpa masalah",
        "Menghemat ruang penyimpanan di Google Drive, OneDrive, dan server perusahaan",
        "Menyiapkan dokumen untuk unggahan portal pemerintah seperti OSS, pajak.go.id, atau SIPP BPJS",
        "Mengompres CV dan portofolio digital sebelum dikirim ke platform rekrutmen seperti Jobstreet atau LinkedIn",
        "Berbagi katalog produk dan materi promosi melalui WhatsApp, LINE, dan aplikasi pesan bisnis",
        "Mengarsipkan faktur pajak, SPT, dan dokumen keuangan dalam penyimpanan digital jangka panjang yang efisien",
      ],
      troubleshooting: [
        { problem: "File yang dikompresi tidak berkurang ukurannya secara signifikan", solution: "Ini biasanya terjadi ketika PDF sudah berisi gambar yang sangat terkompresi. Coba gunakan tingkat kompresi 'Agresif' atau aktifkan opsi pengurangan resolusi gambar tertanam di pengaturan lanjutan." },
        { problem: "Kualitas dokumen terlalu buruk setelah kompresi", solution: "Pilih tingkat kualitas 'Seimbang' daripada 'Kompresi Maksimum' untuk menjaga keseimbangan yang baik antara ukuran file dan ketajaman teks serta gambar." },
      ],
    },
    merge_split: {
      useCaseItems: [
        "Menggabungkan laporan bulanan dari berbagai departemen menjadi satu PDF terpadu untuk direksi",
        "Memisahkan kontrak panjang menjadi bagian independen berdasarkan klausul atau pihak yang menandatangani",
        "Mengekstrak bab tertentu dari manual teknis atau laporan audit untuk distribusi yang lebih tepat sasaran",
        "Menghapus halaman kosong yang tidak diinginkan dari dokumen hasil pindaian untuk hasil yang lebih bersih",
        "Mengurutkan ulang halaman skripsi, tesis, atau laporan proyek sebelum diserahkan kepada pembimbing",
        "Menggabungkan beberapa formulir yang telah diisi beserta lampirannya menjadi satu PDF untuk pengajuan resmi",
      ],
      troubleshooting: [
        { problem: "PDF yang digabungkan menampilkan urutan halaman yang salah", solution: "Pastikan Anda menyeret file ke area unggah sesuai urutan yang benar sebelum mengklik tombol gabung. Anda dapat mengatur ulang file secara manual sebelum memulai proses." },
        { problem: "Setelah pemisahan, beberapa halaman muncul kosong atau tidak lengkap", solution: "Periksa apakah rentang halaman yang ditentukan sudah benar (penomoran dimulai dari 1). Jika halaman kosong muncul di hasil, itu berarti halaman tersebut sudah ada di dokumen asli." },
      ],
    },
    pdf_to_editable: {
      useCaseItems: [
        "Mengonversi kontrak yang dipindai menjadi Word untuk menambah atau memperbarui klausul dan ketentuan",
        "Mengubah tabel data dari laporan PDF ke Excel untuk analisis keuangan dan pelaporan bisnis",
        "Mengonversi presentasi yang diterima dalam format PDF ke PowerPoint untuk dikustomisasi dan digunakan kembali",
        "Memulihkan teks dari dokumen hukum PDF saat file sumber tidak tersedia atau hilang",
        "Mengadaptasi template perusahaan yang didistribusikan dalam PDF untuk diperbarui setiap tahun fiskal",
        "Mengekstrak konten dari laporan tahunan atau brosur PDF untuk membuat dokumen baru secara efisien",
      ],
      troubleshooting: [
        { problem: "Dokumen Word yang dihasilkan memiliki format yang tidak teratur atau tidak dapat dibaca", solution: "PDF yang dipindai atau memiliki tata letak kompleks kadang menghasilkan konversi yang tidak sempurna. Pastikan PDF sumber berisi teks yang dapat dipilih, bukan hanya gambar hasil pindaian." },
        { problem: "Konversi PDF ke Excel tidak mempertahankan kolom tabel asli", solution: "Tabel dengan sel yang digabungkan atau batas yang tidak beraturan mungkin tidak dapat dikonversi dengan sempurna. Coba gunakan mode pengenalan tabel lanjutan yang tersedia di pengaturan." },
      ],
    },
    pdf_to_image: {
      useCaseItems: [
        "Mengubah slide presentasi PDF menjadi gambar JPEG untuk dibagikan di Instagram, LinkedIn, atau TikTok",
        "Membuat thumbnail sampul laporan untuk ditampilkan di situs web perusahaan atau intranet",
        "Mengekstrak halaman katalog produk dalam resolusi tinggi untuk digunakan di marketplace online Indonesia",
        "Menghasilkan tangkapan layar dokumen PDF untuk disisipkan dalam email atau presentasi bisnis",
        "Mengekspor infografis dan grafik dari PDF sebagai gambar untuk diedit dengan Canva atau Photoshop",
        "Mengubah halaman buku digital menjadi gambar untuk membuat materi pelatihan dan e-learning",
      ],
      troubleshooting: [
        { problem: "Gambar yang dikonversi memiliki resolusi rendah atau tampak berpiksel", solution: "Pilih resolusi yang lebih tinggi (300 DPI atau lebih) di opsi lanjutan. Perhatikan bahwa gambar beresolusi tinggi akan menghasilkan file yang lebih besar." },
        { problem: "Warna PDF tidak persis sama dengan gambar yang dihasilkan", solution: "Ini dapat terjadi dengan PDF yang menggunakan profil warna CMYK. Aktifkan opsi konversi ruang warna di pengaturan lanjutan untuk akurasi warna yang lebih baik." },
      ],
    },
    to_pdf: {
      useCaseItems: [
        "Membuat proposal bisnis dan penawaran harga profesional dalam format PDF dari dokumen Word",
        "Menyimpan lembar kerja Excel berisi data keuangan sebagai PDF dengan tata letak yang terjaga rapi",
        "Mengonversi presentasi PowerPoint ke PDF untuk dikirim ke klien tanpa risiko modifikasi",
        "Mengarsipkan halaman web dan artikel penting sebagai PDF untuk dibaca secara offline",
        "Mendigitalkan dokumen fisik hasil pindai dan menyimpannya sebagai file PDF yang terorganisir",
        "Membuat katalog digital dan portofolio dari foto produk dan karya desain dalam format PDF profesional",
      ],
      troubleshooting: [
        { problem: "PDF yang dihasilkan tidak mempertahankan font atau gaya dokumen sumber dengan benar", solution: "Pastikan font yang digunakan dalam dokumen asli sudah terpasang dengan benar. Untuk dokumen Word dengan font kustom, aktifkan opsi 'Sematkan Font' sebelum konversi." },
        { problem: "Gambar dalam PDF yang dihasilkan tampak buram atau berkualitas rendah", solution: "Tingkatkan resolusi gambar dalam pengaturan konversi ke minimal 150 DPI. Untuk dokumen dengan gambar berkualitas tinggi, pilih 300 DPI untuk hasil terbaik." },
      ],
    },
    security: {
      useCaseItems: [
        "Mengenkripsi laporan keuangan rahasia dengan kata sandi sebelum dibagikan kepada klien atau mitra",
        "Menambahkan tanda tangan elektronik yang sah secara hukum sesuai UU ITE No. 11/2008 ke kontrak bisnis",
        "Membuka kunci PDF yang terlindungi kata sandi yang terlupakan sebagai pemilik sah dokumen",
        "Menyembunyikan data pribadi sensitif (NIK, NPWP, nomor rekening) sebelum berbagi dokumen publik",
        "Memenuhi persyaratan UU PDP No. 27 Tahun 2022 dalam mengelola dokumen berisi data pribadi pelanggan",
        "Melindungi skripsi, tesis, dan karya ilmiah dari penggunaan tidak sah dan tindakan plagiarisme",
      ],
      troubleshooting: [
        { problem: "Lupa kata sandi PDF yang ingin dibuka kuncinya", solution: "Jika Anda adalah pemilik sah dokumen, coba ingat kata sandi yang pernah digunakan sebelumnya. Ingat bahwa Anda hanya boleh membuka kunci PDF yang Anda miliki secara sah." },
        { problem: "Tanda tangan elektronik tidak ditampilkan dengan benar di beberapa pembaca PDF", solution: "Periksa apakah PDF yang dihasilkan sesuai dengan standar PDF/A atau PDF 1.7+. Tanda tangan harus kompatibel dengan Adobe Acrobat, Foxit, dan pembaca PDF utama lainnya." },
      ],
    },
    edit: {
      useCaseItems: [
        "Menambahkan logo perusahaan sebagai watermark semi-transparan ke semua dokumen resmi perusahaan",
        "Menomori halaman laporan hukum, kontrak, dan dokumen administratif secara otomatis dan konsisten",
        "Memperbaiki orientasi halaman yang terpindai dengan arah yang salah (diputar 90° atau 180°)",
        "Memotong margin berlebih dari dokumen yang dipindai untuk mengoptimalkan pencetakan dan tampilan",
        "Menambahkan komentar, catatan, dan sorotan pada PDF selama proses review kolaboratif atau audit",
        "Memperbaiki file PDF yang rusak atau korup yang tidak dapat dibuka di aplikasi manapun",
      ],
      troubleshooting: [
        { problem: "Watermark muncul di posisi yang salah atau tidak terlihat dengan jelas", solution: "Sesuaikan tingkat opasitas dan posisi watermark di opsi alat. Untuk watermark teks, pastikan ukuran font dan warnanya memiliki kontras yang cukup dengan latar belakang halaman." },
        { problem: "Nomor halaman tidak ditambahkan dengan benar di semua dokumen", solution: "Jika PDF memiliki ukuran halaman non-standar, nomor mungkin tampak bergeser. Gunakan opsi margin untuk menyesuaikan posisi tepat nomor di sudut setiap halaman." },
      ],
    },
    ocr_extract: {
      useCaseItems: [
        "Membuat dokumen yang dipindai dan arsip kertas sepenuhnya dapat dicari dan diindeks secara digital",
        "Mengekstrak teks dari faktur PDF untuk diimpor langsung ke sistem akuntansi atau ERP perusahaan",
        "Mendapatkan semua gambar yang tertanam dalam presentasi dan katalog PDF sebagai file terpisah",
        "Mendigitalkan arsip kertas historis dan mengubahnya menjadi PDF dengan teks yang dapat dicari",
        "Mengekstrak data tabel dari rekening koran atau laporan pajak untuk analisis mendalam di Excel",
        "Membuat versi teks yang dapat dibaca dari PDF yang dipindai untuk pengguna dengan gangguan penglihatan",
      ],
      troubleshooting: [
        { problem: "Teks yang dikenali OCR mengandung banyak kesalahan", solution: "Kualitas OCR sangat bergantung pada resolusi dokumen yang dipindai. Pindai dengan resolusi minimal 300 DPI dalam skala abu-abu untuk hasil pengenalan teks terbaik." },
        { problem: "Gambar yang diekstrak dari PDF beresolusi rendah", solution: "Jika gambar asli disisipkan ke PDF dalam resolusi rendah, tidak mungkin meningkatkannya saat diekstraksi. Selalu akses sumber gambar asli berkualitas tinggi jika tersedia." },
      ],
    },
  },

  ru: {
    compress: {
      useCaseItems: [
        "Уменьшить размер PDF до менее 25 МБ для отправки по электронной почте без ограничений вложений",
        "Экономить место на Google Диске, Яндекс Диске и корпоративных серверах хранения данных",
        "Подготовить документы для загрузки на порталы gosuslugi.ru, ФНС и других государственных органов",
        "Сжать резюме и портфолио перед отправкой на HH.ru, SuperJob и другие платформы трудоустройства",
        "Делиться каталогами и коммерческими материалами через Telegram, WhatsApp и корпоративные мессенджеры",
        "Архивировать счета-фактуры, налоговые декларации и финансовые документы в цифровом хранилище",
      ],
      troubleshooting: [
        { problem: "Сжатый файл не уменьшился в размере значительно", solution: "Это обычно происходит, когда PDF уже содержит сильно сжатые изображения. Попробуйте уровень сжатия «Агрессивный» или включите уменьшение разрешения встроенных изображений в расширенных настройках." },
        { problem: "После сжатия качество документа слишком ухудшилось", solution: "Выберите уровень качества «Сбалансированный» вместо «Максимальное сжатие», чтобы сохранить баланс между размером файла и чёткостью текста и изображений." },
      ],
    },
    merge_split: {
      useCaseItems: [
        "Объединить ежемесячные отчёты разных отделов в единый сводный PDF для руководства компании",
        "Разделить объёмные договоры на независимые разделы по сторонам или пунктам соглашения",
        "Извлечь конкретные главы из технических руководств или аудиторских заключений для адресной рассылки",
        "Удалить нежелательные пустые страницы из отсканированных документов для их очистки",
        "Переупорядочить страницы дипломной работы или бизнес-плана перед финальной сдачей",
        "Объединить несколько заполненных форм и приложений в один PDF для официальной подачи",
      ],
      troubleshooting: [
        { problem: "В объединённом PDF порядок страниц неверный", solution: "Убедитесь, что вы перетащили файлы в зону загрузки в нужном порядке. Вы можете переупорядочить файлы вручную перед нажатием кнопки объединения." },
        { problem: "После разделения некоторые страницы отображаются пустыми или неполными", solution: "Проверьте правильность указанного диапазона страниц (нумерация начинается с 1). Если в результате есть пустые страницы, они существовали в исходном документе." },
      ],
    },
    pdf_to_editable: {
      useCaseItems: [
        "Конвертировать отсканированные договоры в Word для добавления или изменения условий и пунктов",
        "Перенести таблицы данных из PDF-отчётов в Excel для статистического анализа и составления отчётности",
        "Преобразовать полученные PDF-презентации в PowerPoint для редактирования и повторного использования",
        "Восстановить текст из юридических документов в PDF при отсутствии исходного редактируемого файла",
        "Адаптировать корпоративные шаблоны, распространяемые в PDF, для ежегодного обновления",
        "Извлечь содержимое годовых отчётов или пресс-релизов для создания новых документов",
      ],
      troubleshooting: [
        { problem: "Полученный Word-документ имеет нечитаемое или хаотичное форматирование", solution: "Отсканированные или со сложным макетом PDF могут давать неидеальный результат. Убедитесь, что исходный PDF содержит выделяемый текст, а не только отсканированное изображение." },
        { problem: "Конвертация PDF в Excel не сохраняет столбцы исходной таблицы", solution: "Таблицы с объединёнными ячейками или нестандартными границами не всегда конвертируются идеально. Используйте расширенный режим распознавания таблиц в настройках." },
      ],
    },
    pdf_to_image: {
      useCaseItems: [
        "Конвертировать слайды PDF в JPEG для публикации во ВКонтакте, Telegram или LinkedIn",
        "Создать миниатюры обложек отчётов для публикации на корпоративном сайте или инфопортале",
        "Извлечь страницы каталогов продукции в высоком разрешении для маркетплейсов Wildberries, Ozon",
        "Сгенерировать снимки документов PDF для вставки в деловые письма и презентации",
        "Экспортировать инфографику и диаграммы из PDF как изображения для Photoshop или Figma",
        "Конвертировать страницы цифровых книг в изображения для создания учебных материалов и курсов",
      ],
      troubleshooting: [
        { problem: "Конвертированные изображения имеют низкое разрешение или выглядят пикселизованными", solution: "Выберите более высокое разрешение (300 DPI или выше) в расширенных параметрах. Изображения в высоком разрешении создают файлы большего размера." },
        { problem: "Цвета в PDF не точно соответствуют цветам в полученном изображении", solution: "Это может происходить с PDF, использующими цветовой профиль CMYK. Включите опцию преобразования цветового пространства в расширенных настройках." },
      ],
    },
    to_pdf: {
      useCaseItems: [
        "Создавать коммерческие предложения и деловую переписку в PDF напрямую из Word-документов",
        "Сохранять таблицы Excel с финансовыми данными как PDF с сохранением точного форматирования",
        "Преобразовывать презентации PowerPoint в PDF для отправки клиентам без возможности редактирования",
        "Архивировать веб-страницы и статьи в PDF для чтения в офлайн-режиме и хранения",
        "Оцифровывать бумажные документы и сохранять их как структурированные PDF-файлы",
        "Создавать PDF-каталоги из фотографий товаров и дизайнерских работ для продвижения",
      ],
      troubleshooting: [
        { problem: "Созданный PDF не сохраняет шрифты или стили исходного документа", solution: "Убедитесь, что шрифты, используемые в исходном документе, правильно установлены. Для Word-документов с нестандартными шрифтами включите опцию «Встроить шрифты» перед конвертацией." },
        { problem: "Изображения в созданном PDF выглядят размытыми или имеют низкое качество", solution: "Увеличьте разрешение изображений в настройках конвертации до не менее 150 DPI. Для высококачественной графики выберите 300 DPI." },
      ],
    },
    security: {
      useCaseItems: [
        "Зашифровать конфиденциальные финансовые отчёты паролем перед отправкой клиентам и партнёрам",
        "Добавить юридически значимые электронные подписи (согласно ФЗ №63) к договорам и соглашениям",
        "Снять парольную защиту с PDF, пароль от которого утерян (как законный владелец документа)",
        "Скрыть персональные данные (СНИЛС, ИНН, банковские реквизиты) перед публикацией или пересылкой",
        "Соблюдать требования ФЗ-152 при работе с документами, содержащими персональные данные граждан",
        "Защитить дипломные работы, научные исследования и изобретения от несанкционированного использования",
      ],
      troubleshooting: [
        { problem: "Забыт пароль к PDF, который нужно разблокировать", solution: "Если вы являетесь законным владельцем документа, попробуйте вспомнить ранее использовавшиеся пароли. Помните, что разблокировать можно только те PDF, на которые у вас есть законное право." },
        { problem: "Электронная подпись некорректно отображается в некоторых просмотрщиках PDF", solution: "Проверьте соответствие созданного PDF стандарту PDF/A или PDF 1.7+. Подпись должна быть совместима с Adobe Acrobat, Foxit и другими основными программами просмотра." },
      ],
    },
    edit: {
      useCaseItems: [
        "Добавить фирменный логотип в виде полупрозрачного водяного знака на все официальные документы компании",
        "Автоматически нумеровать страницы юридических заключений, договоров и актов приёма-передачи",
        "Исправить ориентацию неправильно отсканированных страниц (повёрнутых на 90° или 180°)",
        "Обрезать избыточные поля отсканированных документов для оптимизации печати и экономии бумаги",
        "Добавлять комментарии, заметки и выделения в PDF при проверке, согласовании и аудите",
        "Восстановить повреждённые PDF-файлы, которые не открываются ни в одном просмотрщике",
      ],
      troubleshooting: [
        { problem: "Водяной знак отображается в неправильном месте или недостаточно заметен", solution: "Настройте уровень прозрачности и положение водяного знака в параметрах. Для текстовых водяных знаков убедитесь, что размер шрифта и цвет достаточно контрастируют с фоном страницы." },
        { problem: "Номера страниц добавляются некорректно не на все документы", solution: "Если в PDF используется нестандартный размер страницы, номера могут сдвигаться. Используйте параметры полей для точной настройки положения номеров в углах страниц." },
      ],
    },
    ocr_extract: {
      useCaseItems: [
        "Сделать отсканированные документы и бумажные архивы полностью доступными для текстового поиска",
        "Извлечь текст из PDF-счетов-фактур для импорта в 1С, SAP или другие учётные системы",
        "Получить все встроенные изображения из презентаций и каталогов PDF в отдельные файлы",
        "Оцифровать исторические бумажные документы и преобразовать их в PDF с распознанным текстом",
        "Извлечь табличные данные из банковских выписок или налоговых деклараций для анализа в Excel",
        "Создать текстовые версии отсканированных PDF для пользователей с нарушениями зрения",
      ],
      troubleshooting: [
        { problem: "Распознанный OCR текст содержит много ошибок", solution: "Качество OCR напрямую зависит от разрешения отсканированного документа. Сканируйте с разрешением не менее 300 DPI в оттенках серого для лучшего распознавания." },
        { problem: "Извлечённые из PDF изображения имеют низкое разрешение", solution: "Если оригинальные изображения были встроены в PDF в низком разрешении, повысить их качество при извлечении невозможно. Всегда обращайтесь к исходным высококачественным файлам изображений." },
      ],
    },
  },

  it: {
    compress: {
      useCaseItems: [
        "Ridurre PDF di grandi dimensioni sotto i 25 MB per inviarli come allegati e-mail senza problemi",
        "Risparmiare spazio di archiviazione su Google Drive, OneDrive e server aziendali",
        "Preparare documenti per caricamenti su portali della Pubblica Amministrazione italiana (INPS, Agenzia delle Entrate, SUAP)",
        "Comprimere cataloghi digitali e brochure commerciali per condividerli via WhatsApp e canali aziendali",
        "Ridurre il peso di CV e portfolio digitali prima di caricarli su siti di ricerca lavoro italiani",
        "Archiviare grandi quantità di fatture elettroniche SDI, dichiarazioni fiscali e documenti contabili",
      ],
      troubleshooting: [
        { problem: "Il file compresso non ha ridotto significativamente le sue dimensioni", solution: "Questo di solito accade quando il PDF contiene già immagini molto compresse. Prova il livello «Elevato» o attiva l'opzione di riduzione della risoluzione delle immagini incorporate nelle impostazioni avanzate." },
        { problem: "La qualità del documento si è deteriorata eccessivamente dopo la compressione", solution: "Seleziona il livello qualità «Bilanciato» invece di «Compressione Massima» per mantenere un buon equilibrio tra dimensione del file e nitidezza del testo e delle immagini." },
      ],
    },
    merge_split: {
      useCaseItems: [
        "Unire i report mensili di più dipartimenti in un unico PDF consolidato per la direzione aziendale",
        "Dividere contratti voluminosi in sezioni indipendenti per parti o clausole contrattuali per revisione mirata",
        "Estrarre capitoli specifici da manuali tecnici o relazioni di revisione per distribuirli selettivamente",
        "Rimuovere le pagine bianche indesiderate prodotte dai sistemi di scansione d'ufficio",
        "Riordinare le pagine di una tesi di laurea o piano aziendale prima della consegna finale",
        "Unire più moduli compilati e allegati in un unico PDF per la presentazione ufficiale agli enti",
      ],
      troubleshooting: [
        { problem: "Il PDF unito mostra le pagine in ordine errato", solution: "Assicurati di aver trascinato i file nell'area di caricamento nell'ordine esatto desiderato. Puoi riorganizzarli manualmente prima di fare clic sul pulsante di fusione." },
        { problem: "Dopo la divisione, alcune pagine risultano vuote o incomplete", solution: "Verifica che l'intervallo di pagine specificato sia corretto (la numerazione parte da 1). Se compaiono pagine bianche nel risultato, erano già presenti nel documento originale." },
      ],
    },
    pdf_to_editable: {
      useCaseItems: [
        "Convertire contratti digitalizzati in Word per aggiungere o modificare clausole e condizioni contrattuali",
        "Trasformare tabelle di dati da report PDF in Excel per analisi statistiche e finanziarie dettagliate",
        "Convertire presentazioni ricevute in PDF in PowerPoint per personalizzarle e riutilizzarle",
        "Recuperare il testo di documenti legali in PDF quando il file sorgente originale non è disponibile",
        "Adattare modelli aziendali distribuiti in PDF per aggiornamento a ogni nuovo anno fiscale",
        "Estrarre contenuti da relazioni annuali o comunicati stampa in PDF per creare nuovi documenti",
      ],
      troubleshooting: [
        { problem: "Il documento Word risultante ha una formattazione disorganizzata o illeggibile", solution: "I PDF scansionati o con layout complessi possono produrre conversioni imperfette. Assicurati che il PDF sorgente contenga testo selezionabile e non solo immagini scansionate." },
        { problem: "La conversione da PDF a Excel non rispetta le colonne della tabella originale", solution: "Le tabelle con celle unite o bordi irregolari potrebbero non convertirsi perfettamente. Prova ad utilizzare la modalità di riconoscimento avanzato delle tabelle disponibile nelle impostazioni." },
      ],
    },
    pdf_to_image: {
      useCaseItems: [
        "Convertire diapositive PDF in immagini JPEG per condividerle su LinkedIn, Instagram o X (Twitter)",
        "Creare miniature di copertine di report da pubblicare su siti web e intranet aziendali",
        "Estrarre pagine di cataloghi prodotto ad alta risoluzione per piattaforme di e-commerce italiane",
        "Generare screenshot di documenti PDF da inserire in e-mail professionali o presentazioni aziendali",
        "Esportare infografiche e grafici da PDF come immagini per la modifica con Photoshop o Canva",
        "Convertire pagine di libri digitali in immagini per creare materiali di formazione e-learning",
      ],
      troubleshooting: [
        { problem: "Le immagini convertite hanno una bassa risoluzione o sembrano pixelate", solution: "Seleziona una risoluzione più alta (300 DPI o superiore) nelle opzioni avanzate. Le immagini ad alta risoluzione genereranno file di dimensioni maggiori." },
        { problem: "I colori del PDF non corrispondono esattamente all'immagine risultante", solution: "Questo può accadere con PDF che utilizzano profili colore CMYK. Attiva l'opzione di conversione dello spazio colore nelle impostazioni avanzate per una maggiore fedeltà cromatica." },
      ],
    },
    to_pdf: {
      useCaseItems: [
        "Creare proposte commerciali e preventivi professionali in PDF direttamente da documenti Word",
        "Salvare fogli Excel con dati finanziari come PDF con la formattazione corretta per il commercialista",
        "Trasformare presentazioni PowerPoint in PDF da inviare ai clienti senza possibilità di modifica",
        "Archiviare pagine web e articoli di interesse in PDF per la consultazione offline e riferimento futuro",
        "Digitalizzare documenti cartacei scansionati e salvarli come file PDF organizzati per l'archivio",
        "Creare PDF da immagini di prodotti e lavori artistici per portfolio e cataloghi digitali professionali",
      ],
      troubleshooting: [
        { problem: "Il PDF generato non conserva correttamente i font o gli stili del documento sorgente", solution: "Verifica che i font utilizzati nel documento originale siano correttamente installati. Per i documenti Word con font personalizzati, attiva «Incorpora font» prima della conversione." },
        { problem: "Le immagini nel PDF risultante appaiono sfocate o di bassa qualità", solution: "Aumenta la risoluzione delle immagini nelle impostazioni di conversione ad almeno 150 DPI. Per immagini di alta qualità, scegli 300 DPI per risultati ottimali." },
      ],
    },
    security: {
      useCaseItems: [
        "Cifrare rapporti finanziari riservati con password prima di condividerli con clienti e partner",
        "Aggiungere firme elettroniche giuridicamente valide (conformi al GDPR e al Codice Privacy) a contratti",
        "Sbloccare PDF protetti da password dimenticata come legittimo proprietario del documento",
        "Oscurare dati personali sensibili (codice fiscale, IBAN, dati sanitari) prima di condividere documenti",
        "Conformarsi al GDPR e al D.Lgs. 196/2003 nella gestione di documenti contenenti dati personali",
        "Proteggere tesi di laurea, ricerche accademiche e lavori creativi dall'uso non autorizzato",
      ],
      troubleshooting: [
        { problem: "Ho dimenticato la password del PDF che voglio sbloccare", solution: "Se sei il legittimo proprietario del documento, prova a ricordare password utilizzate in precedenza. Ricorda che puoi sbloccare solo i PDF di cui sei legittimamente proprietario." },
        { problem: "La firma elettronica non viene visualizzata correttamente in tutti i visualizzatori PDF", solution: "Verifica che il PDF risultante sia conforme allo standard PDF/A o PDF 1.7+. La firma deve essere compatibile con Adobe Acrobat, Foxit e i principali visualizzatori PDF." },
      ],
    },
    edit: {
      useCaseItems: [
        "Aggiungere il logo aziendale come filigrana semitrasparente su tutti i documenti ufficiali dell'azienda",
        "Numerare automaticamente le pagine di relazioni legali, contratti e documenti processuali",
        "Correggere l'orientamento di pagine scansite in posizione errata (ruotate di 90° o 180°)",
        "Ritagliare i margini eccessivi da documenti scansionati per ottimizzare la stampa e risparmiare carta",
        "Aggiungere commenti, annotazioni e rilievi in PDF durante revisioni collaborative o attività di audit",
        "Riparare file PDF corrotti o danneggiati che non si aprono correttamente in nessun visualizzatore",
      ],
      troubleshooting: [
        { problem: "La filigrana appare in una posizione errata o non è sufficientemente visibile", solution: "Regola il livello di opacità e la posizione nelle opzioni. Per le filigrane testuali, assicurati che la dimensione del font e il colore abbiano un contrasto sufficiente con lo sfondo della pagina." },
        { problem: "I numeri di pagina non vengono aggiunti correttamente su tutti i documenti", solution: "Se il PDF utilizza un formato di pagina non standard, i numeri potrebbero apparire spostati. Utilizza le opzioni dei margini per regolare con precisione la posizione nei angoli di ogni pagina." },
      ],
    },
    ocr_extract: {
      useCaseItems: [
        "Rendere documenti scansionati e archivi cartacei completamente ricercabili e indicizzabili",
        "Estrarre il testo da fatture PDF per importarlo in sistemi gestionali come TeamSystem o Zucchetti",
        "Ottenere tutte le immagini incorporate in presentazioni e cataloghi PDF come file separati e riutilizzabili",
        "Digitalizzare archivi cartacei storici e convertirli in PDF con testo riconosciuto e ricercabile",
        "Estrarre dati tabulari da estratti conto o dichiarazioni fiscali per analisi in fogli Excel",
        "Creare versioni accessibili di PDF scansionati per utenti con disabilità visive",
      ],
      troubleshooting: [
        { problem: "Il testo riconosciuto dall'OCR contiene molti errori", solution: "La qualità dell'OCR dipende direttamente dalla risoluzione del documento scansionato. Scansiona con un minimo di 300 DPI in scala di grigi per ottenere i migliori risultati di riconoscimento." },
        { problem: "Le immagini estratte dal PDF hanno una bassa risoluzione", solution: "Se le immagini originali sono state incorporate nel PDF a bassa risoluzione, non è possibile migliorarle all'atto dell'estrazione. Accedi sempre alle immagini originali ad alta qualità se disponibili." },
      ],
    },
  },

  ur: {
    compress: {
      useCaseItems: [
        "بڑی PDF فائلوں کو 25 MB سے کم کر کے ای میل میں بغیر کسی مسئلے کے اٹیچ کریں",
        "Google Drive اور Dropbox پر اسٹوریج کی جگہ بچائیں اور فائلیں منظم رکھیں",
        "NADRA، HEC، FBR اور دیگر سرکاری پورٹلز کی اپ لوڈ سائز لمٹ پوری کریں",
        "نوکری کی درخواست کے لیے CV اور تعلیمی سرٹیفکیٹ WhatsApp پر آسانی سے شیئر کریں",
        "کاروباری کیٹالوگ اور فلائیر Telegram اور واٹس ایپ گروپس میں بھیجیں",
        "ٹیکس گوشوارے، چالانز اور مالی دستاویزات ڈیجیٹل آرکائیو میں کم جگہ میں محفوظ کریں",
      ],
      troubleshooting: [
        { problem: "کمپریس کرنے کے بعد فائل کا سائز زیادہ کم نہیں ہوا", solution: "یہ عموماً اس وقت ہوتا ہے جب PDF میں پہلے سے بہت زیادہ کمپریس کی گئی تصاویر ہوں۔ 'Aggressive' کمپریشن لیول آزمائیں یا Advanced Settings میں Downscale Images کا آپشن فعال کریں۔" },
        { problem: "کمپریشن کے بعد دستاویز کا معیار بہت خراب ہو گیا", solution: "'Maximum Compression' کی بجائے 'Balanced' کوالٹی لیول منتخب کریں۔ اس سے متن کی خوانائی برقرار رکھتے ہوئے فائل کا سائز کم ہوگا۔" },
      ],
    },
    merge_split: {
      useCaseItems: [
        "مختلف شعبوں کی ماہانہ رپورٹیں ایک مشترکہ PDF میں یکجا کر کے انتظامیہ کو پیش کریں",
        "طویل قانونی معاہدوں کو الگ الگ شقوں یا فریقوں کے حساب سے تقسیم کریں",
        "سرکاری فائلوں سے مخصوص صفحات نکال کر الگ دستاویز بنائیں",
        "تھیسس، ریسرچ پیپر یا پروجیکٹ رپورٹ جمع کرانے سے پہلے صفحات کی ترتیب درست کریں",
        "اسکین کی گئی دستاویزات سے غیر ضروری خالی صفحات حذف کریں",
        "بھرے ہوئے فارمز اور منسلکات ایک PDF میں جمع کر کے باضابطہ طور پر جمع کرائیں",
      ],
      troubleshooting: [
        { problem: "مرج کی گئی PDF میں صفحات کی ترتیب غلط ہے", solution: "یقینی بنائیں کہ فائلیں اپ لوڈ ایریا میں درست ترتیب سے ڈریگ کی گئی ہوں۔ Merge بٹن دبانے سے پہلے ترتیب کی تصدیق کریں۔" },
        { problem: "PDF تقسیم کرنے کے بعد کچھ صفحات خالی یا ادھورے نظر آتے ہیں", solution: "یقینی بنائیں کہ صفحہ نمبر کی حد درست ہے (صفحہ 1 سے شروع)۔ خالی صفحات اصل دستاویز میں بھی موجود تھے۔" },
      ],
    },
    pdf_to_editable: {
      useCaseItems: [
        "اسکین کیے گئے معاہدوں کو Word میں تبدیل کر کے نئی شرائط شامل کریں یا ترمیم کریں",
        "مالی رپورٹوں کی جداول Excel میں منتقل کر کے تجزیہ اور رپورٹنگ کریں",
        "PDF پریزنٹیشن کو PowerPoint میں بدل کر اپنی ضرورت کے مطابق کسٹمائز کریں",
        "اصل فائل موجود نہ ہونے پر قانونی دستاویزات سے متن بازیاب کریں",
        "PDF فارمیٹ میں تقسیم کی گئی کمپنی ٹیمپلیٹس کو ہر سال اپ ڈیٹ کرنے کے لیے ایڈٹ کریں",
        "سالانہ رپورٹوں یا بروشر سے مواد نکال کر نئی دستاویزات مؤثر طریقے سے تیار کریں",
      ],
      troubleshooting: [
        { problem: "نتیجے میں آنے والے Word دستاویز کی فارمیٹنگ غیر منظم یا ناقابل پڑھ ہے", solution: "اسکین کی گئی یا پیچیدہ لے آؤٹ والی PDF کا تبادلہ کبھی کبھی ناقص ہوتا ہے۔ یقینی بنائیں کہ اصل PDF میں منتخب کرنے کے قابل متن ہو۔" },
        { problem: "PDF سے Excel تبادلے میں ٹیبل کے کالم درست نہیں آئے", solution: "مرج کیے گئے سیلز یا غیر معیاری بارڈر والی ٹیبلز صحیح طریقے سے تبدیل نہیں ہوتیں۔ Settings میں Advanced Table Recognition Mode استعمال کریں۔" },
      ],
    },
    pdf_to_image: {
      useCaseItems: [
        "PDF سلائیڈز کو JPEG میں تبدیل کر کے LinkedIn، Facebook یا Twitter پر شیئر کریں",
        "رپورٹ کور کی تھمب نیل بنائیں اور ویب سائٹ یا کمپنی انٹرانیٹ پر پوسٹ کریں",
        "پروڈکٹ کیٹالوگ کے صفحات کو اعلی ریزولیوشن میں نکال کر آن لائن اسٹور میں استعمال کریں",
        "PDF دستاویز کی اسکرین شاٹس بنائیں اور ای میل یا پریزنٹیشن میں شامل کریں",
        "PDF انفوگرافکس کو تصویر کی شکل میں محفوظ کر کے Photoshop یا Canva سے ایڈٹ کریں",
        "ڈیجیٹل کتابوں کے صفحات تصویروں میں بدل کر تدریسی مواد تیار کریں",
      ],
      troubleshooting: [
        { problem: "تبدیل کی گئی تصاویر کم ریزولیوشن یا دھندلی ہیں", solution: "Advanced Options میں اعلی ریزولیوشن (300 DPI یا زیادہ) منتخب کریں۔ اعلی ریزولیوشن سے فائل کا سائز بڑا ہوگا۔" },
        { problem: "PDF اور نتیجے میں آنے والی تصویر کے رنگوں میں فرق ہے", solution: "CMYK کلر پروفائل استعمال کرنے والی PDF میں یہ ہو سکتا ہے۔ Advanced Settings میں Color Space Conversion آپشن فعال کریں۔" },
      ],
    },
    to_pdf: {
      useCaseItems: [
        "Word دستاویزات سے پیشہ ورانہ کاروباری تجاویز اور رپورٹس PDF میں تیار کریں",
        "Excel کی مالی جداول اور بل مکمل فارمیٹنگ کے ساتھ PDF میں سیو کریں",
        "PowerPoint پریزنٹیشن کو PDF میں بدل کر کلائنٹس کو ترمیم سے محفوظ فارمیٹ میں بھیجیں",
        "ویب صفحات اور مضامین آفلائن پڑھنے کے لیے PDF میں محفوظ کریں",
        "کاغذی دستاویزات اسکین کر کے PDF کے طور پر ڈیجیٹائز اور منظم کریں",
        "مصنوعات کی تصویروں اور ڈیزائن کاموں سے PDF کیٹالوگ اور پورٹ فولیو بنائیں",
      ],
      troubleshooting: [
        { problem: "PDF میں اصل دستاویز کے فونٹس یا اسٹائل صحیح نہیں آئے", solution: "یقینی بنائیں کہ دستاویز میں استعمال شدہ فونٹس انسٹال ہیں۔ کسٹم فونٹس والے Word دستاویزات کے لیے 'Embed Fonts' آپشن فعال کریں۔" },
        { problem: "PDF میں تصاویر دھندلی دکھائی دیتی ہیں", solution: "کنورژن سیٹنگز میں امیج ریزولیوشن کم از کم 150 DPI پر سیٹ کریں۔ اعلی معیار کے لیے 300 DPI استعمال کریں۔" },
      ],
    },
    security: {
      useCaseItems: [
        "کاروباری رازداری والی مالی رپورٹیں شیئر کرنے سے پہلے پاس ورڈ سے محفوظ کریں",
        "معاہدوں اور قانونی دستاویزات پر قانونی طور پر درست ڈیجیٹل دستخط شامل کریں",
        "بھولا ہوا پاس ورڈ رکھنے والی PDF فائل بطور جائز مالک کھولیں",
        "CNIC نمبر، بینک تفصیلات اور صحت کی معلومات جیسی ذاتی معلومات شیئر کرنے سے پہلے چھپائیں",
        "پاکستان کے PECA 2016 اور بین الاقوامی ڈیٹا تحفظ قوانین کے مطابق صارف ڈیٹا والی دستاویزات سنبھالیں",
        "تھیسس، تحقیقی مقالات، پیٹنٹ اور تخلیقی کاموں کو غیر مجاز استعمال سے بچائیں",
      ],
      troubleshooting: [
        { problem: "PDF کا پاس ورڈ بھول گئے ہیں", solution: "اگر آپ دستاویز کے مالک ہیں تو پرانے پاس ورڈز یاد کرنے کی کوشش کریں۔ صرف وہی PDF کھولیں جن پر آپ کا قانونی حق ہو۔" },
        { problem: "ڈیجیٹل دستخط کچھ PDF ریڈرز میں صحیح نہیں دکھتا", solution: "یقینی بنائیں کہ نتیجے میں آنے والی PDF PDF/A یا PDF 1.7+ معیار کے مطابق ہو۔ دستخط Adobe Acrobat، Foxit اور دیگر اہم ریڈرز کے ساتھ ہم آہنگ ہونا چاہیے۔" },
      ],
    },
    edit: {
      useCaseItems: [
        "تمام سرکاری دستاویزات پر کمپنی کا لوگو نیم شفاف واٹر مارک کے طور پر شامل کریں",
        "قانونی رپورٹوں، معاہدوں اور طویل دستاویزات میں صفحات کی تعداد خودکار طریقے سے شامل کریں",
        "غلط سمت میں اسکین ہونے والے صفحات کو 90° یا 180° گھما کر درست کریں",
        "اسکین کی گئی دستاویزات کے اضافی حاشیے کاٹ کر پرنٹنگ کے لیے بہتر بنائیں",
        "نظرثانی یا آڈٹ کے دوران PDF میں تبصرے، نوٹس اور ہائی لائٹس شامل کریں",
        "خراب یا نہ کھلنے والی PDF فائلوں کو ٹھیک کریں اور ضروری مواد بازیاب کریں",
      ],
      troubleshooting: [
        { problem: "واٹر مارک غلط جگہ ظاہر ہوتا ہے یا نظر نہیں آتا", solution: "Opacity اور Position سیٹنگز ایڈجسٹ کریں۔ متنی واٹر مارک کے لیے صفحہ کی پس منظر کے ساتھ کافی کنٹراسٹ والا رنگ اور فونٹ سائز منتخب کریں۔" },
        { problem: "صفحہ نمبر تمام صفحات پر صحیح طریقے سے نہیں جڑتے", solution: "غیر معیاری صفحہ سائز والی PDF میں نمبر منتقل ہو سکتے ہیں۔ Margin Options استعمال کر کے ہر کونے میں درست پوزیشن مقرر کریں۔" },
      ],
    },
    ocr_extract: {
      useCaseItems: [
        "اسکین کی گئی دستاویزات اور کاغذی دفتری فائلوں کو مکمل سرچ ایبل PDF میں تبدیل کریں",
        "چالانوں اور انوائسز سے متن نکال کر اکاؤنٹنگ سافٹ ویئر میں درآمد کریں",
        "PDF پریزنٹیشنز اور کیٹالوگس میں موجود تمام تصاویر الگ فائلوں کے طور پر نکالیں",
        "پرانی کاغذی دستاویزات ڈیجیٹائز کریں اور تلاش کے قابل PDF آرکائیو بنائیں",
        "بینک اسٹیٹمنٹس اور ٹیکس گوشواروں سے جدول ڈیٹا Excel تجزیے کے لیے نکالیں",
        "بصری معذور صارفین کے لیے اسکین PDF کی قابل پڑھ متنی نقل بنائیں",
      ],
      troubleshooting: [
        { problem: "OCR سے پہچانے گئے متن میں بہت غلطیاں ہیں", solution: "OCR کا معیار اسکین ریزولیوشن پر براہ راست منحصر ہے۔ کم از کم 300 DPI پر گرے اسکیل میں اسکین کریں تاکہ بہترین نتائج ملیں۔" },
        { problem: "PDF سے نکالی گئی تصاویر کم ریزولیوشن کی ہیں", solution: "اگر اصل تصاویر کم ریزولیوشن پر PDF میں ڈالی گئی تھیں تو نکالتے وقت انہیں بہتر نہیں کیا جا سکتا۔ اصل اعلی معیار کی تصاویر کا ماخذ استعمال کریں۔" },
      ],
    },
  },
};
