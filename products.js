// ============ إعدادات المتجر ============
window.SHOP_CONFIG = {
  storeName: "متجر المشروبات",
  whatsapp: "963992147669",   // رقم الواتس اب (بدون + أو أصفار)
  currency: "ل.س"             // رمز العملة
};

// ============ الصورة العلوية (البانر) ============
// غيّر الصورة والنص من هنا. image: رابط أو مسار صورة مثل "images/banner.jpg"
// اتركها فارغة "" لاستخدام خلفية جاهزة بالألوان (colors).
// أضف أكثر من عنصر لتصبح الصور تتحرك تلقائياً.
window.HERO_SLIDES = [
  {
    image: "",
    colors: ["#ec4899", "#8b5cf6"],
    title: "مشروبات باردة منعشة",
    subtitle: "اطلب الآن واستمتع بأفضل نكهة"
  },
  {
    image: "",
    colors: ["#22c55e", "#0ea5e9"],
    title: "ماتشا طازج",
    subtitle: "نكهات جديدة كل يوم"
  }
];
window.HERO_INTERVAL = 4000; // مدة التبديل بالمللي ثانية

// ============ المنتجات ============
// image: رابط/مسار صورة المنتج. إذا تركتها "" يُرسم كوب ملون تلقائياً حسب color.
window.PRODUCTS = [
  { id: 2, name: "ستراو ميلك وسط",   price: 12000, color: "#fb7185", image: "https://i.ibb.co/Wv6F0V4M/1791411548384.jpg" },
  { id: 3, name: "مانجو كريمي",      price: 16000, color: "#fbbf24", image: "" },
  { id: 4, name: "تارو كريمي",       price: 17000, color: "#a78bfa", image: "" },
  { id: 5, name: "بلو كريمي",        price: 17000, color: "#38bdf8", image: "" },
  { id: 6, name: "كراميل كريمي",     price: 18000, color: "#d97706", image: "" },
  { id: 7, name: "ماتشا فراولة",     price: 20000, color: "#84cc16", image: "" },
  { id: 8, name: "ماتشا مانجو",      price: 20000, color: "#eab308", image: "" },
  { id: 9, name: "ماتشا كراميل",     price: 21000, color: "#65a30d", image: "" }
];
