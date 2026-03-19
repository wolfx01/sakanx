-- 1. تفعيل إضافات الرموز العشوائية الفريدة
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. جدول المستخدمين (الطلاب وأصحاب السكن)


-- إنشاء جدول المستخدمين بـ ID غير قابل للتخمين
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    full_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone TEXT,
    password TEXT NOT NULL,
    role TEXT DEFAULT 'student',
    is_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW()
);

-- 3. جدول السكنات (المعلومات الأساسية)
CREATE TABLE residences (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    owner_id UUID REFERENCES users(id) ON DELETE CASCADE, 
    title TEXT NOT NULL,                
    description TEXT,                   
    city TEXT NOT NULL,                 
    address TEXT,                       
    price_per_month DECIMAL NOT NULL,   
    is_available BOOLEAN DEFAULT TRUE,  
    category TEXT CHECK (category IN ('room', 'studio', 'apartment')), -- تم تصحيح role إلى category هنا
    created_at TIMESTAMP DEFAULT NOW()
);

-- 4. جدول صور السكن (صور متعددة لكل سكن)
CREATE TABLE residence_images (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    residence_id UUID REFERENCES residences(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,            -- رابط الصورة (من Cloudinary أو Supabase Storage)
    is_main BOOLEAN DEFAULT FALSE       -- هل هذه هي الصورة الرئيسية التي تظهر في البحث؟
);

-- 5. جدول الطلبات (التواصل بين الطالب وصاحب السكن)
CREATE TABLE bookings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    residence_id UUID REFERENCES residences(id) ON DELETE CASCADE,
    student_id UUID REFERENCES users(id) ON DELETE CASCADE,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected')), -- حالة الطلب
    message TEXT,                       -- رسالة من الطالب لصاحب السكن
    created_at TIMESTAMP DEFAULT NOW()
);