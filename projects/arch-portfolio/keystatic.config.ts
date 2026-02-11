import { config, fields, singleton, collection } from '@keystatic/core';

// ============================================
// BLOCK SCHEMAS - Reusable for Page Builder
// ============================================

const heroBlock = fields.object({
    title: fields.text({ label: 'العنوان الرئيسي', validation: { isRequired: true } }),
    subtitle: fields.text({ label: 'العنوان الفرعي', multiline: true }),
    backgroundImage: fields.image({
        label: 'صورة الخلفية',
        directory: 'public/images/heroes',
        publicPath: '/images/heroes/',
    }),
    backgroundVideo: fields.text({ label: 'رابط الفيديو (YouTube/Vimeo)' }),
    overlayOpacity: fields.select({
        label: 'شفافية التغطية',
        options: [
            { label: 'بدون', value: '0' },
            { label: 'خفيفة', value: '0.3' },
            { label: 'متوسطة', value: '0.5' },
            { label: 'داكنة', value: '0.7' },
        ],
        defaultValue: '0.5',
    }),
    ctaText: fields.text({ label: 'نص الزر' }),
    ctaLink: fields.text({ label: 'رابط الزر' }),
    alignment: fields.select({
        label: 'محاذاة المحتوى',
        options: [
            { label: 'يمين', value: 'right' },
            { label: 'وسط', value: 'center' },
            { label: 'يسار', value: 'left' },
        ],
        defaultValue: 'center',
    }),
});

const statsBlock = fields.object({
    heading: fields.text({ label: 'العنوان' }),
    stats: fields.array(
        fields.object({
            number: fields.text({ label: 'الرقم', validation: { isRequired: true } }),
            label: fields.text({ label: 'الوصف', validation: { isRequired: true } }),
            suffix: fields.text({ label: 'اللاحقة (مثل: +، %)' }),
        }),
        {
            label: 'الإحصائيات',
            itemLabel: (props) => props.fields.label.value || 'إحصائية',
        }
    ),
    backgroundColor: fields.select({
        label: 'لون الخلفية',
        options: [
            { label: 'أساسي', value: 'primary' },
            { label: 'ثانوي', value: 'secondary' },
            { label: 'شفاف', value: 'transparent' },
        ],
        defaultValue: 'primary',
    }),
});

const projectsGridBlock = fields.object({
    heading: fields.text({ label: 'العنوان' }),
    subheading: fields.text({ label: 'العنوان الفرعي' }),
    filterByCategory: fields.text({ label: 'تصفية حسب التصنيف (اتركه فارغًا لعرض الكل)' }),
    count: fields.number({ label: 'عدد المشاريع', defaultValue: 6 }),
    columns: fields.select({
        label: 'عدد الأعمدة',
        options: [
            { label: 'عمودين', value: '2' },
            { label: 'ثلاثة أعمدة', value: '3' },
            { label: 'أربعة أعمدة', value: '4' },
        ],
        defaultValue: '3',
    }),
    showFilters: fields.checkbox({ label: 'إظهار أزرار التصفية', defaultValue: true }),
});

const servicesBlock = fields.object({
    heading: fields.text({ label: 'العنوان' }),
    subheading: fields.text({ label: 'العنوان الفرعي' }),
    showAll: fields.checkbox({ label: 'عرض جميع الخدمات', defaultValue: true }),
    selectedServices: fields.array(
        fields.text({ label: 'معرف الخدمة' }),
        { label: 'الخدمات المحددة (إذا لم يتم تحديد عرض الكل)' }
    ),
    cardStyle: fields.select({
        label: 'تصميم البطاقات',
        options: [
            { label: 'بسيط', value: 'minimal' },
            { label: 'مع أيقونة', value: 'icon' },
            { label: 'مع صورة', value: 'image' },
        ],
        defaultValue: 'icon',
    }),
});

const mediaBlock = fields.object({
    type: fields.select({
        label: 'نوع الوسائط',
        options: [
            { label: 'صورة', value: 'image' },
            { label: 'معرض صور', value: 'slider' },
            { label: 'فيديو', value: 'video' },
        ],
        defaultValue: 'image',
    }),
    image: fields.image({
        label: 'الصورة',
        directory: 'public/images/media',
        publicPath: '/images/media/',
    }),
    images: fields.array(
        fields.image({
            label: 'صورة',
            directory: 'public/images/media',
            publicPath: '/images/media/',
        }),
        { label: 'صور المعرض' }
    ),
    videoUrl: fields.text({ label: 'رابط الفيديو' }),
    caption: fields.text({ label: 'التعليق' }),
    fullWidth: fields.checkbox({ label: 'عرض كامل', defaultValue: true }),
});

const contactBlock = fields.object({
    heading: fields.text({ label: 'العنوان' }),
    subheading: fields.text({ label: 'العنوان الفرعي' }),
    showForm: fields.checkbox({ label: 'إظهار نموذج الاتصال', defaultValue: true }),
    showInfo: fields.checkbox({ label: 'إظهار معلومات الاتصال', defaultValue: true }),
    showMap: fields.checkbox({ label: 'إظهار الخريطة', defaultValue: true }),
    mapEmbedUrl: fields.text({ label: 'رابط تضمين Google Maps' }),
    phone: fields.text({ label: 'رقم الهاتف' }),
    email: fields.text({ label: 'البريد الإلكتروني' }),
    address: fields.text({ label: 'العنوان', multiline: true }),
});

const textBlock = fields.object({
    content: fields.text({
        label: 'المحتوى',
        multiline: true,
    }),
    maxWidth: fields.select({
        label: 'العرض الأقصى',
        options: [
            { label: 'صغير', value: 'sm' },
            { label: 'متوسط', value: 'md' },
            { label: 'كبير', value: 'lg' },
            { label: 'كامل', value: 'full' },
        ],
        defaultValue: 'md',
    }),
});

const testimonialsBlock = fields.object({
    heading: fields.text({ label: 'العنوان' }),
    testimonials: fields.array(
        fields.object({
            quote: fields.text({ label: 'الاقتباس', multiline: true, validation: { isRequired: true } }),
            author: fields.text({ label: 'الاسم', validation: { isRequired: true } }),
            role: fields.text({ label: 'المنصب' }),
            company: fields.text({ label: 'الشركة' }),
            image: fields.image({
                label: 'الصورة',
                directory: 'public/images/testimonials',
                publicPath: '/images/testimonials/',
            }),
        }),
        {
            label: 'الشهادات',
            itemLabel: (props) => props.fields.author.value || 'شهادة',
        }
    ),
    displayStyle: fields.select({
        label: 'طريقة العرض',
        options: [
            { label: 'شبكة', value: 'grid' },
            { label: 'سلايدر', value: 'slider' },
            { label: 'قائمة', value: 'list' },
        ],
        defaultValue: 'slider',
    }),
});

const teamBlock = fields.object({
    heading: fields.text({ label: 'العنوان' }),
    subheading: fields.text({ label: 'العنوان الفرعي' }),
    members: fields.array(
        fields.object({
            name: fields.text({ label: 'الاسم', validation: { isRequired: true } }),
            role: fields.text({ label: 'المنصب', validation: { isRequired: true } }),
            bio: fields.text({ label: 'نبذة', multiline: true }),
            image: fields.image({
                label: 'الصورة',
                directory: 'public/images/team',
                publicPath: '/images/team/',
            }),
            linkedin: fields.text({ label: 'رابط LinkedIn' }),
            twitter: fields.text({ label: 'رابط Twitter' }),
        }),
        {
            label: 'أعضاء الفريق',
            itemLabel: (props) => props.fields.name.value || 'عضو',
        }
    ),
    columns: fields.select({
        label: 'عدد الأعمدة',
        options: [
            { label: 'ثلاثة', value: '3' },
            { label: 'أربعة', value: '4' },
        ],
        defaultValue: '4',
    }),
});

const timelineBlock = fields.object({
    heading: fields.text({ label: 'العنوان' }),
    events: fields.array(
        fields.object({
            year: fields.text({ label: 'السنة', validation: { isRequired: true } }),
            title: fields.text({ label: 'العنوان', validation: { isRequired: true } }),
            description: fields.text({ label: 'الوصف', multiline: true }),
        }),
        {
            label: 'الأحداث',
            itemLabel: (props) => `${props.fields.year.value} - ${props.fields.title.value}` || 'حدث',
        }
    ),
    style: fields.select({
        label: 'النمط',
        options: [
            { label: 'عمودي', value: 'vertical' },
            { label: 'أفقي', value: 'horizontal' },
        ],
        defaultValue: 'vertical',
    }),
});

const faqBlock = fields.object({
    heading: fields.text({ label: 'العنوان' }),
    questions: fields.array(
        fields.object({
            question: fields.text({ label: 'السؤال', validation: { isRequired: true } }),
            answer: fields.text({ label: 'الإجابة', multiline: true, validation: { isRequired: true } }),
        }),
        {
            label: 'الأسئلة',
            itemLabel: (props) => props.fields.question.value || 'سؤال',
        }
    ),
    style: fields.select({
        label: 'النمط',
        options: [
            { label: 'أكورديون', value: 'accordion' },
            { label: 'قائمة مفتوحة', value: 'list' },
        ],
        defaultValue: 'accordion',
    }),
});

const galleryBlock = fields.object({
    heading: fields.text({ label: 'العنوان' }),
    images: fields.array(
        fields.object({
            image: fields.image({
                label: 'الصورة',
                directory: 'public/images/gallery',
                publicPath: '/images/gallery/',
                validation: { isRequired: true },
            }),
            caption: fields.text({ label: 'التعليق' }),
            alt: fields.text({ label: 'النص البديل' }),
        }),
        {
            label: 'الصور',
            itemLabel: (props) => props.fields.caption.value || 'صورة',
        }
    ),
    layout: fields.select({
        label: 'التخطيط',
        options: [
            { label: 'شبكة منتظمة', value: 'grid' },
            { label: 'ماسونري', value: 'masonry' },
        ],
        defaultValue: 'grid',
    }),
    columns: fields.select({
        label: 'عدد الأعمدة',
        options: [
            { label: 'اثنين', value: '2' },
            { label: 'ثلاثة', value: '3' },
            { label: 'أربعة', value: '4' },
        ],
        defaultValue: '3',
    }),
});

const ctaBlock = fields.object({
    heading: fields.text({ label: 'العنوان', validation: { isRequired: true } }),
    description: fields.text({ label: 'الوصف', multiline: true }),
    buttonText: fields.text({ label: 'نص الزر', validation: { isRequired: true } }),
    buttonLink: fields.text({ label: 'رابط الزر', validation: { isRequired: true } }),
    backgroundImage: fields.image({
        label: 'صورة الخلفية',
        directory: 'public/images/cta',
        publicPath: '/images/cta/',
    }),
    backgroundColor: fields.select({
        label: 'لون الخلفية',
        options: [
            { label: 'أساسي', value: 'primary' },
            { label: 'ثانوي', value: 'secondary' },
            { label: 'مميز', value: 'accent' },
        ],
        defaultValue: 'primary',
    }),
});

const featuresBlock = fields.object({
    heading: fields.text({ label: 'العنوان' }),
    subheading: fields.text({ label: 'العنوان الفرعي' }),
    features: fields.array(
        fields.object({
            icon: fields.text({ label: 'الأيقونة (اسم Lucide)' }),
            title: fields.text({ label: 'العنوان', validation: { isRequired: true } }),
            description: fields.text({ label: 'الوصف', multiline: true }),
        }),
        {
            label: 'المميزات',
            itemLabel: (props) => props.fields.title.value || 'ميزة',
        }
    ),
    columns: fields.select({
        label: 'عدد الأعمدة',
        options: [
            { label: 'اثنين', value: '2' },
            { label: 'ثلاثة', value: '3' },
            { label: 'أربعة', value: '4' },
        ],
        defaultValue: '3',
    }),
});

const logosBlock = fields.object({
    heading: fields.text({ label: 'العنوان' }),
    logos: fields.array(
        fields.object({
            name: fields.text({ label: 'الاسم' }),
            image: fields.image({
                label: 'الشعار',
                directory: 'public/images/logos',
                publicPath: '/images/logos/',
                validation: { isRequired: true },
            }),
            link: fields.text({ label: 'الرابط' }),
        }),
        {
            label: 'الشعارات',
            itemLabel: (props) => props.fields.name.value || 'شعار',
        }
    ),
    animate: fields.checkbox({ label: 'تفعيل التمرير التلقائي', defaultValue: true }),
    grayscale: fields.checkbox({ label: 'عرض بالأبيض والأسود', defaultValue: true }),
});

const spacerBlock = fields.object({
    size: fields.select({
        label: 'الحجم',
        options: [
            { label: 'صغير', value: 'sm' },
            { label: 'متوسط', value: 'md' },
            { label: 'كبير', value: 'lg' },
            { label: 'كبير جداً', value: 'xl' },
        ],
        defaultValue: 'md',
    }),
    showDivider: fields.checkbox({ label: 'إظهار خط فاصل', defaultValue: false }),
});

// ============================================
// PAGE BUILDER BLOCKS UNION
// ============================================

const pageBuilderBlocks = fields.blocks(
    {
        hero: {
            label: 'قسم البطل',
            schema: heroBlock,
            itemLabel: (props) => `🦸 ${props.fields.title.value || 'قسم البطل'}`,
        },
        stats: {
            label: 'إحصائيات',
            schema: statsBlock,
            itemLabel: (props) => `📊 ${props.fields.heading.value || 'إحصائيات'}`,
        },
        projectsGrid: {
            label: 'شبكة المشاريع',
            schema: projectsGridBlock,
            itemLabel: (props) => `🏗️ ${props.fields.heading.value || 'المشاريع'}`,
        },
        services: {
            label: 'الخدمات',
            schema: servicesBlock,
            itemLabel: (props) => `⚙️ ${props.fields.heading.value || 'الخدمات'}`,
        },
        media: {
            label: 'وسائط',
            schema: mediaBlock,
            itemLabel: (props) => `🖼️ ${props.fields.caption.value || 'وسائط'}`,
        },
        contact: {
            label: 'تواصل معنا',
            schema: contactBlock,
            itemLabel: (props) => `📞 ${props.fields.heading.value || 'تواصل معنا'}`,
        },
        text: {
            label: 'نص منسق',
            schema: textBlock,
            itemLabel: () => '📝 نص منسق',
        },
        testimonials: {
            label: 'شهادات العملاء',
            schema: testimonialsBlock,
            itemLabel: (props) => `💬 ${props.fields.heading.value || 'شهادات العملاء'}`,
        },
        team: {
            label: 'فريق العمل',
            schema: teamBlock,
            itemLabel: (props) => `👥 ${props.fields.heading.value || 'فريق العمل'}`,
        },
        timeline: {
            label: 'خط زمني',
            schema: timelineBlock,
            itemLabel: (props) => `📅 ${props.fields.heading.value || 'خط زمني'}`,
        },
        faq: {
            label: 'الأسئلة الشائعة',
            schema: faqBlock,
            itemLabel: (props) => `❓ ${props.fields.heading.value || 'الأسئلة الشائعة'}`,
        },
        gallery: {
            label: 'معرض صور',
            schema: galleryBlock,
            itemLabel: (props) => `🖼️ ${props.fields.heading.value || 'معرض صور'}`,
        },
        cta: {
            label: 'دعوة للعمل',
            schema: ctaBlock,
            itemLabel: (props) => `🎯 ${props.fields.heading.value || 'دعوة للعمل'}`,
        },
        features: {
            label: 'المميزات',
            schema: featuresBlock,
            itemLabel: (props) => `✨ ${props.fields.heading.value || 'المميزات'}`,
        },
        logos: {
            label: 'شعارات العملاء',
            schema: logosBlock,
            itemLabel: (props) => `🏢 ${props.fields.heading.value || 'شعارات العملاء'}`,
        },
        spacer: {
            label: 'مسافة فارغة',
            schema: spacerBlock,
            itemLabel: () => '↕️ مسافة فارغة',
        },
    },
    { label: 'أقسام الصفحة' }
);

// ============================================
// SHARED SCHEMAS
// ============================================

const linkSchema = fields.conditional(
    fields.select({
        label: 'نوع الرابط',
        options: [
            { label: 'رابط خارجي / مخصص', value: 'custom' },
            { label: 'صفحة', value: 'page' },
            { label: 'مشروع', value: 'project' },
            { label: 'خدمة', value: 'service' },
        ],
        defaultValue: 'custom',
    }),
    {
        custom: fields.text({ label: 'الرابط (URL)', validation: { length: { min: 1 } } }),
        page: fields.relationship({ label: 'اختر الصفحة', collection: 'pages', validation: { isRequired: true } }),
        project: fields.relationship({ label: 'اختر المشروع', collection: 'projects', validation: { isRequired: true } }),
        service: fields.relationship({ label: 'اختر الخدمة', collection: 'services', validation: { isRequired: true } }),
    }
);

// ============================================
// KEYSTATIC CONFIGURATION
// ============================================

export default config({
  
    locale: "ar-AE",
    storage: {
        kind: 'github',
        repo: 'AbdulkareemSasah/protfolioes',
        credentials: {
            kind: 'custom',
        }
    },
    ui: {
        brand: { name: 'مدير المحتوى' },
    },
    singletons: {
        // ========== THEME SETTINGS ==========
        theme: singleton({
            label: 'إعدادات المظهر',
            path: 'src/content/settings/theme',
            format: { data: 'json' },
            schema: {
                // Colors
                colorPrimary: fields.color({
                    label: 'اللون الأساسي',
                    defaultValue: '#1a1a2e',
                    description: 'اللون الرئيسي للموقع (Hex Code)',
                }),
                colorSecondary: fields.color({
                    label: 'اللون الثانوي',
                    defaultValue: '#16213e',
                    description: 'اللون الثانوي للموقع',
                }),
                colorAccent: fields.color({
                    label: 'لون التمييز',
                    defaultValue: '#e94560',
                    description: 'لون الأزرار والعناصر المميزة',
                }),
                colorBackground: fields.color({
                    label: 'لون الخلفية',
                    defaultValue: '#0f0f1a',
                    description: 'لون خلفية الموقع',
                }),
                colorSurface: fields.color({
                    label: 'لون السطح',
                    defaultValue: '#1a1a2e',
                    description: 'لون البطاقات والعناصر',
                }),
                colorText: fields.color({
                    label: 'لون النص',
                    defaultValue: '#eaeaea',
                    description: 'لون النص الرئيسي',
                }),
                colorTextMuted: fields.color({
                    label: 'لون النص الثانوي',
                    defaultValue: '#a0a0a0',
                    description: 'لون النص الثانوي والتوضيحي',
                }),

                // Border Radius
                borderRadius: fields.select({
                    label: 'نعومة الحواف',
                    description: 'التحكم في استدارة جميع العناصر',
                    options: [
                        { label: 'حاد', value: '0' },
                        { label: 'ناعم قليلاً', value: '4' },
                        { label: 'ناعم', value: '8' },
                        { label: 'مستدير', value: '16' },
                        { label: 'دائري', value: '9999' },
                    ],
                    defaultValue: '8',
                }),

                // Typography
                fontHeading: fields.select({
                    label: 'خط العناوين',
                    options: [
                        { label: 'Cairo', value: 'Cairo' },
                        { label: 'Tajawal', value: 'Tajawal' },
                        { label: 'Almarai', value: 'Almarai' },
                        { label: 'IBM Plex Sans Arabic', value: 'IBM Plex Sans Arabic' },
                    ],
                    defaultValue: 'Cairo',
                }),
                fontBody: fields.select({
                    label: 'خط النصوص',
                    options: [
                        { label: 'Tajawal', value: 'Tajawal' },
                        { label: 'Cairo', value: 'Cairo' },
                        { label: 'Almarai', value: 'Almarai' },
                        { label: 'IBM Plex Sans Arabic', value: 'IBM Plex Sans Arabic' },
                    ],
                    defaultValue: 'Tajawal',
                }),
            },
        }),

        // ========== SITE SETTINGS ==========
        site: singleton({
            label: 'إعدادات الموقع',
            path: 'src/content/settings/site',
            format: { data: 'json' },
            schema: {
                siteName: fields.text({
                    label: 'اسم الموقع',
                    validation: { isRequired: true },
                }),
                siteDescription: fields.text({
                    label: 'وصف الموقع',
                    multiline: true,
                }),
                logo: fields.image({
                    label: 'الشعار',
                    directory: 'public/images/branding',
                    publicPath: '/images/branding/',
                }),
                logoDark: fields.image({
                    label: 'الشعار (الوضع الداكن)',
                    directory: 'public/images/branding',
                    publicPath: '/images/branding/',
                }),
                favicon: fields.image({
                    label: 'أيقونة الموقع',
                    directory: 'public',
                    publicPath: '/',
                }),
                ogImage: fields.image({
                    label: 'صورة المشاركة الاجتماعية',
                    directory: 'public/images/branding',
                    publicPath: '/images/branding/',
                }),
            },
        }),

        // ========== LABELS ==========
        labels: singleton({
            label: 'نصوص الواجهة',
            path: 'src/content/settings/labels',
            format: { data: 'json' },
            schema: {
                readMore: fields.text({ label: 'اقرأ المزيد', defaultValue: 'اقرأ المزيد' }),
                viewProject: fields.text({ label: 'عرض المشروع', defaultValue: 'عرض المشروع' }),
                viewAll: fields.text({ label: 'عرض الكل', defaultValue: 'عرض الكل' }),
                submit: fields.text({ label: 'إرسال', defaultValue: 'إرسال' }),
                contactUs: fields.text({ label: 'تواصل معنا', defaultValue: 'تواصل معنا' }),
                backToHome: fields.text({ label: 'العودة للرئيسية', defaultValue: 'العودة للرئيسية' }),
                backToProjects: fields.text({ label: 'العودة للمشاريع', defaultValue: 'العودة للمشاريع' }),
                backToServices: fields.text({ label: 'العودة للخدمات', defaultValue: 'العودة للخدمات' }),
                formNameLabel: fields.text({ label: 'تسمية حقل الاسم', defaultValue: 'الاسم الكامل' }),
                formEmailLabel: fields.text({ label: 'تسمية حقل البريد', defaultValue: 'البريد الإلكتروني' }),
                formPhoneLabel: fields.text({ label: 'تسمية حقل الهاتف', defaultValue: 'رقم الهاتف' }),
                formMessageLabel: fields.text({ label: 'تسمية حقل الرسالة', defaultValue: 'الرسالة' }),
                formSuccessMessage: fields.text({
                    label: 'رسالة النجاح',
                    defaultValue: 'شكراً لتواصلك معنا! سنرد عليك قريباً.',
                }),
                all: fields.text({ label: 'الكل', defaultValue: 'الكل' }),
                loadMore: fields.text({ label: 'تحميل المزيد', defaultValue: 'تحميل المزيد' }),
                noResults: fields.text({ label: 'لا توجد نتائج', defaultValue: 'لا توجد نتائج' }),
                projectInfo: fields.text({ label: 'معلومات المشروع', defaultValue: 'معلومات المشروع' }),
                client: fields.text({ label: 'العميل', defaultValue: 'العميل' }),
                location: fields.text({ label: 'الموقع', defaultValue: 'الموقع' }),
                year: fields.text({ label: 'السنة', defaultValue: 'السنة' }),
                area: fields.text({ label: 'المساحة', defaultValue: 'المساحة' }),
            },
        }),

        // ========== HEADER ==========
        header: singleton({
            label: 'الهيدر',
            path: 'src/content/settings/header',
            format: { data: 'json' },
            schema: {
                logoPosition: fields.select({
                    label: 'موضع الشعار',
                    options: [
                        { label: 'يمين', value: 'right' },
                        { label: 'يسار', value: 'left' },
                    ],
                    defaultValue: 'right',
                }),
                navigation: fields.array(
                    fields.object({
                        label: fields.text({ label: 'النص', validation: { isRequired: true } }),
                        link: linkSchema,
                        isDropdown: fields.checkbox({ label: 'قائمة منسدلة', defaultValue: false }),
                        dropdownItems: fields.array(
                            fields.object({
                                label: fields.text({ label: 'النص', validation: { isRequired: true } }),
                                link: linkSchema,
                            }),
                            { label: 'عناصر القائمة المنسدلة' }
                        ),
                    }),
                    {
                        label: 'روابط التنقل',
                        itemLabel: (props) => props.fields.label.value || 'رابط',
                    }
                ),
                showCta: fields.checkbox({ label: 'إظهار زر الدعوة للعمل', defaultValue: true }),
                ctaText: fields.text({ label: 'نص زر الدعوة', defaultValue: 'تواصل معنا' }),
                ctaLink: fields.text({ label: 'رابط زر الدعوة', defaultValue: '/contact' }),
                showThemeToggle: fields.checkbox({ label: 'إظهار زر تبديل المظهر', defaultValue: true }),
            },
        }),

        // ========== FOOTER ==========
        footer: singleton({
            label: 'الفوتر',
            path: 'src/content/settings/footer',
            format: { data: 'json' },
            schema: {
                columns: fields.array(
                    fields.object({
                        title: fields.text({ label: 'العنوان', validation: { isRequired: true } }),
                        links: fields.array(
                            fields.object({
                                label: fields.text({ label: 'النص', validation: { isRequired: true } }),
                                link: linkSchema,
                            }),
                            { label: 'الروابط' }
                        ),
                    }),
                    {
                        label: 'أعمدة الفوتر',
                        itemLabel: (props) => props.fields.title.value || 'عمود',
                    }
                ),
                showSocial: fields.checkbox({ label: 'إظهار روابط التواصل الاجتماعي', defaultValue: true }),
                socialLinks: fields.object({
                    facebook: fields.text({ label: 'Facebook' }),
                    twitter: fields.text({ label: 'Twitter / X' }),
                    instagram: fields.text({ label: 'Instagram' }),
                    linkedin: fields.text({ label: 'LinkedIn' }),
                    youtube: fields.text({ label: 'YouTube' }),
                    whatsapp: fields.text({ label: 'WhatsApp' }),
                }),
                copyrightText: fields.text({
                    label: 'نص حقوق النشر',
                    defaultValue: '© {year} جميع الحقوق محفوظة',
                }),
                showBackToTop: fields.checkbox({ label: 'إظهار زر العودة للأعلى', defaultValue: true }),
            },
        }),
    },

    collections: {
        // ========== PAGES ==========
        pages: collection({
            label: 'الصفحات',
            slugField: 'slug',
            path: 'src/content/pages/*',
            format: { data: 'yaml' },
            schema: {
                title: fields.text({ label: 'عنوان الصفحة', validation: { isRequired: true } }),
                slug: fields.slug({ name: { label: 'الرابط' } }),
                description: fields.text({ label: 'وصف الصفحة (SEO)', multiline: true }),
                ogImage: fields.image({
                    label: 'صورة المشاركة',
                    directory: 'public/images/og',
                    publicPath: '/images/og/',
                }),
                blocks: pageBuilderBlocks,
            },
        }),

        // ========== PROJECTS ==========
        projects: collection({
            label: 'المشاريع',
            slugField: 'slug',
            path: 'src/content/projects/*',
            format: { data: 'yaml' },
            schema: {
                title: fields.text({ label: 'اسم المشروع', validation: { isRequired: true } }),
                slug: fields.slug({ name: { label: 'الرابط' } }),
                description: fields.text({ label: 'وصف مختصر', multiline: true }),
                featuredImage: fields.image({
                    label: 'الصورة الرئيسية',
                    directory: 'public/images/projects',
                    publicPath: '/images/projects/',
                }),
                gallery: fields.array(
                    fields.image({
                        label: 'صورة',
                        directory: 'public/images/projects',
                        publicPath: '/images/projects/',
                    }),
                    { label: 'معرض الصور' }
                ),
                client: fields.text({ label: 'العميل' }),
                location: fields.text({ label: 'الموقع' }),
                year: fields.text({ label: 'السنة' }),
                area: fields.text({ label: 'المساحة' }),
                category: fields.relationship({
                    label: 'التصنيف',
                    collection: 'categories',
                }),
                tags: fields.array(
                    fields.relationship({
                        label: 'الوسم',
                        collection: 'tags',
                    }),
                    { label: 'الوسوم' }
                ),
                featured: fields.checkbox({ label: 'مشروع مميز', defaultValue: false }),
                blocks: pageBuilderBlocks,
            },
        }),

        // ========== SERVICES ==========
        services: collection({
            label: 'الخدمات',
            slugField: 'slug',
            path: 'src/content/services/*',
            format: { data: 'yaml' },
            schema: {
                title: fields.text({ label: 'اسم الخدمة', validation: { isRequired: true } }),
                slug: fields.slug({ name: { label: 'الرابط' } }),
                description: fields.text({ label: 'وصف مختصر', multiline: true }),
                icon: fields.text({ label: 'الأيقونة (اسم Lucide)' }),
                featuredImage: fields.image({
                    label: 'الصورة الرئيسية',
                    directory: 'public/images/services',
                    publicPath: '/images/services/',
                }),
                category: fields.relationship({
                    label: 'التصنيف',
                    collection: 'categories',
                }),
                tags: fields.array(
                    fields.relationship({
                        label: 'الوسم',
                        collection: 'tags',
                    }),
                    { label: 'الوسوم' }
                ),
                order: fields.number({ label: 'الترتيب', defaultValue: 0 }),
                blocks: pageBuilderBlocks,
            },
        }),

        // ========== CATEGORIES ==========
        categories: collection({
            label: 'التصنيفات',
            slugField: 'slug',
            path: 'src/content/categories/*',
            format: { data: 'yaml' },
            schema: {
                name: fields.text({ label: 'الاسم', validation: { isRequired: true } }),
                slug: fields.slug({ name: { label: 'الرابط' } }),
                description: fields.text({ label: 'الوصف', multiline: true }),
            },
        }),

        // ========== TAGS ==========
        tags: collection({
            label: 'الوسوم',
            slugField: 'slug',
            path: 'src/content/tags/*',
            format: { data: 'yaml' },
            schema: {
                name: fields.text({ label: 'الاسم', validation: { isRequired: true } }),
                slug: fields.slug({ name: { label: 'الرابط' } }),
            },
        }),
    },
});
