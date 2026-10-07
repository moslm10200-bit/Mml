// ============ إعدادات المتجر ============
window.SHOP_CONFIG = {
  storeName: "السكب",          // اسم المتجر (يظهر في الشعار بخط الديواني)
  logoImage: "",              // اختياري: مسار صورة شعارك مثل "images/logo.png" لتستبدل الأيقونة الدائرية
  whatsapp: "963992147669",   // رقم الواتس اب (بدون + أو أصفار)
  currency: "ل.س"             // رمز العملة
};

// ============ الصورة العلوية (البانر) ============
// غيّر الصورة والنص من هنا.
// image: رابط أو مسار صورة مثل "images/banner.jpg" (إذا وضعتها تظهر كخلفية كاملة)
// اتركها "" لاستخدام خلفية ملونة (colors) مع كوب مرسوم بلون cup.
// أضف أكثر من عنصر لتتحرك الصور تلقائياً.
window.HERO_SLIDES = [
  {
    image: "",
    colors: ["#ec4899", "#8b5cf6"],
    cup: "#f9a8d4",
    title: "مشروبات باردة منعشة",
    subtitle: "اطلب الآن واستمتع بأفضل نكهة"
  },
  {
    image: "",
    colors: ["#10b981", "#0ea5e9"],
    cup: "#a3e635",
    title: "ماتشا طازج",
    subtitle: "نكهات جديدة كل يوم"
  }
];
window.HERO_INTERVAL = 4000; // مدة التبديل بالمللي ثانية

// ============ المنتجات ============
// category: التصنيف (تظهر أزرار التصنيفات تلقائياً)
// image: رابط/مسار صورة المنتج. إذا تركتها "" يُرسم كوب ملون تلقائياً حسب color.
window.PRODUCTS = [
  { id: 1, name: "ستراو ميلك",       price: 15000, category: "كريمي", color: "#f472b6", image: "" },
  { id: 2, name: "ستراو ميلك وسط",   price: 12000, category: "كريمي", color: "#fb7185", image: "" },
  { id: 3, name: "مانجو كريمي",      price: 16000, category: "كريمي", color: "#fbbf24", image: "" },
  { id: 4, name: "تارو كريمي",       price: 17000, category: "كريمي", color: "#a78bfa", image: "" },
  { id: 5, name: "بلو كريمي",        price: 17000, category: "كريمي", color: "#38bdf8", image: "" },
  { id: 6, name: "كراميل كريمي",     price: 18000, category: "كريمي", color: "#d97706", image: "" },
  { id: 7, name: "ماتشا فراولة",     price: 20000, category: "ماتشا", color: "#84cc16", image: "" },
  { id: 8, name: "ماتشا مانجو",      price: 20000, category: "ماتشا", color: "#eab308", image: "" },
  { id: 9, name: "ماتشا كراميل",     price: 21000, category: "ماتشا", color: "#65a30d", image: "" }
];
