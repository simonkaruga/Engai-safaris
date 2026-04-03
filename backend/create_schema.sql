-- Engai Safaris Database Schema
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create alembic_version table for migration tracking
CREATE TABLE IF NOT EXISTS alembic_version (
    version_num VARCHAR(32) NOT NULL,
    CONSTRAINT alembic_version_pkc PRIMARY KEY (version_num)
);

-- Insert the latest migration version
INSERT INTO alembic_version (version_num) VALUES ('e79f5a13b9ee') ON CONFLICT DO NOTHING;

-- Create admins table
CREATE TABLE admins (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    email VARCHAR(200) NOT NULL UNIQUE,
    password_hash VARCHAR(300) NOT NULL,
    name VARCHAR(200) NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Create affiliates table
CREATE TABLE affiliates (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    email VARCHAR(200) NOT NULL UNIQUE,
    type VARCHAR(50),
    platform VARCHAR(100),
    commission_pct INTEGER NOT NULL DEFAULT 0,
    utm_code VARCHAR(50) UNIQUE,
    total_earned NUMERIC(10,2) NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT true,
    payment_details JSONB,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Create agents table
CREATE TABLE agents (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    company_name VARCHAR(200) NOT NULL,
    contact_name VARCHAR(200) NOT NULL,
    email VARCHAR(200) NOT NULL UNIQUE,
    password_hash VARCHAR(300) NOT NULL,
    phone VARCHAR(30),
    country VARCHAR(100),
    discount_pct INTEGER NOT NULL DEFAULT 0,
    credit_limit_kes NUMERIC(10,2),
    is_active BOOLEAN NOT NULL DEFAULT true,
    notes TEXT,
    last_login TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Create destinations table
CREATE TABLE destinations (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    slug VARCHAR(100) NOT NULL UNIQUE,
    name VARCHAR(200) NOT NULL,
    tagline VARCHAR(300),
    description TEXT,
    country VARCHAR(100) NOT NULL,
    region VARCHAR(100),
    cover_image VARCHAR(500),
    gallery JSONB NOT NULL DEFAULT '[]',
    best_months JSONB,
    highlights JSONB,
    wildlife_list JSONB,
    latitude NUMERIC(9,6),
    longitude NUMERIC(9,6),
    is_active BOOLEAN NOT NULL DEFAULT true,
    meta_title VARCHAR(300),
    meta_desc VARCHAR(500),
    park_fees_usd NUMERIC(8,2),
    conservancy_fees_usd NUMERIC(8,2),
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Create guides table
CREATE TABLE guides (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    slug VARCHAR(100) NOT NULL UNIQUE,
    name VARCHAR(200) NOT NULL,
    title VARCHAR(200),
    bio TEXT,
    photo_url VARCHAR(500),
    languages JSONB,
    specialities JSONB,
    certifications JSONB,
    years_exp INTEGER,
    home_region VARCHAR(100),
    fun_fact VARCHAR(300),
    is_featured BOOLEAN NOT NULL DEFAULT false,
    review_count INTEGER NOT NULL DEFAULT 0,
    avg_rating NUMERIC(3,2),
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Create safaris table
CREATE TABLE safaris (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    slug VARCHAR(100) NOT NULL UNIQUE,
    name VARCHAR(200) NOT NULL,
    tagline VARCHAR(300),
    description TEXT,
    category VARCHAR(50),
    duration_days INTEGER NOT NULL,
    group_size_max INTEGER NOT NULL,
    price_usd_solo NUMERIC(10,2),
    price_usd_2pax NUMERIC(10,2),
    price_usd_4pax NUMERIC(10,2),
    price_usd_6pax NUMERIC(10,2),
    price_kes_solo NUMERIC(10,2),
    price_kes_2pax NUMERIC(10,2),
    price_kes_4pax NUMERIC(10,2),
    price_kes_6pax NUMERIC(10,2),
    wholesale_usd NUMERIC(10,2),
    peak_multiplier NUMERIC(4,2) NOT NULL DEFAULT 1.0,
    low_multiplier NUMERIC(4,2) NOT NULL DEFAULT 1.0,
    deposit_pct INTEGER NOT NULL DEFAULT 30,
    installments_ok BOOLEAN NOT NULL DEFAULT false,
    cover_image VARCHAR(500),
    video_url VARCHAR(500),
    gallery JSONB NOT NULL DEFAULT '[]',
    highlights JSONB,
    inclusions JSONB,
    exclusions JSONB,
    what_to_bring JSONB,
    cancellation_policy TEXT,
    is_active BOOLEAN NOT NULL DEFAULT true,
    is_featured BOOLEAN NOT NULL DEFAULT false,
    is_available BOOLEAN NOT NULL DEFAULT true,
    availability_note TEXT,
    is_shared BOOLEAN NOT NULL DEFAULT false,
    cost_per_pax_usd NUMERIC(10,2),
    profit_margin_pct INTEGER DEFAULT 30,
    beach_extension_days INTEGER DEFAULT 0,
    beach_location VARCHAR(100),
    meta_title VARCHAR(300),
    meta_desc VARCHAR(500),
    sort_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Create blog_posts table
CREATE TABLE blog_posts (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    slug VARCHAR(200) NOT NULL UNIQUE,
    title VARCHAR(300) NOT NULL,
    excerpt TEXT,
    content TEXT,
    cover_image VARCHAR(500),
    category VARCHAR(100),
    destination_id UUID REFERENCES destinations(id),
    tags JSONB NOT NULL DEFAULT '[]',
    author VARCHAR(100),
    read_time_min INTEGER,
    is_published BOOLEAN NOT NULL DEFAULT false,
    published_at TIMESTAMPTZ,
    meta_title VARCHAR(300),
    meta_desc VARCHAR(500),
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Create enquiries table
CREATE TABLE enquiries (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    reference VARCHAR(20) NOT NULL UNIQUE,
    safari_id UUID REFERENCES safaris(id),
    source VARCHAR(100),
    ai_conversation JSONB,
    customer_name VARCHAR(200) NOT NULL,
    customer_email VARCHAR(200) NOT NULL,
    customer_phone VARCHAR(30),
    customer_country VARCHAR(100),
    travel_date_from DATE,
    travel_date_to DATE,
    flexibility VARCHAR(50),
    group_size INTEGER,
    group_type VARCHAR(50),
    budget_usd VARCHAR(50),
    interests JSONB,
    dietary_req JSONB,
    medical_notes TEXT,
    celebration VARCHAR(100),
    special_requests TEXT,
    status VARCHAR(30) NOT NULL DEFAULT 'new',
    quoted_amount_usd NUMERIC(10,2),
    follow_up_date DATE,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Create itinerary_days table
CREATE TABLE itinerary_days (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    safari_id UUID NOT NULL REFERENCES safaris(id) ON DELETE CASCADE,
    day_number INTEGER NOT NULL,
    title VARCHAR(300) NOT NULL,
    description TEXT,
    meals JSONB,
    accommodation VARCHAR(200),
    accommodation_type VARCHAR(50),
    activities JSONB,
    distance_km INTEGER,
    drive_hours NUMERIC(3,1),
    image VARCHAR(500),
    UNIQUE(safari_id, day_number)
);

-- Create bookings table
CREATE TABLE bookings (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    reference VARCHAR(20) NOT NULL UNIQUE,
    enquiry_id UUID REFERENCES enquiries(id),
    safari_id UUID NOT NULL REFERENCES safaris(id),
    agent_id UUID REFERENCES agents(id),
    guide_id UUID REFERENCES guides(id),
    affiliate_id UUID REFERENCES affiliates(id),
    customer_name VARCHAR(200) NOT NULL,
    customer_email VARCHAR(200) NOT NULL,
    customer_phone VARCHAR(30) NOT NULL,
    customer_country VARCHAR(100),
    dietary_req JSONB,
    celebration VARCHAR(100),
    travel_date DATE NOT NULL,
    pax INTEGER NOT NULL,
    season VARCHAR(20),
    base_price_usd NUMERIC(10,2),
    season_multiplier NUMERIC(4,2),
    total_usd NUMERIC(10,2),
    total_kes NUMERIC(10,2) NOT NULL,
    deposit_kes NUMERIC(10,2) NOT NULL,
    balance_kes NUMERIC(10,2) NOT NULL,
    addons_total_kes NUMERIC(10,2) NOT NULL DEFAULT 0,
    promo_code VARCHAR(50),
    promo_discount_kes NUMERIC(10,2) DEFAULT 0,
    vehicle_ref VARCHAR(100),
    currency VARCHAR(3) NOT NULL DEFAULT 'KES',
    booking_type VARCHAR(10) NOT NULL DEFAULT 'direct',
    installments BOOLEAN NOT NULL DEFAULT false,
    installment_plan JSONB,
    status VARCHAR(30) NOT NULL DEFAULT 'pending',
    itinerary_pdf VARCHAR(500),
    voucher_pdf VARCHAR(500),
    memories_url VARCHAR(500),
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Create payments table
CREATE TABLE payments (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    booking_id UUID NOT NULL REFERENCES bookings(id),
    payment_type VARCHAR(20) NOT NULL,
    pesapal_order_id VARCHAR(200),
    pesapal_tracking_id VARCHAR(200),
    amount_kes NUMERIC(10,2) NOT NULL,
    currency VARCHAR(3) NOT NULL DEFAULT 'KES',
    payment_method VARCHAR(50),
    phone_number VARCHAR(30),
    status VARCHAR(30) NOT NULL DEFAULT 'pending',
    failure_reason TEXT,
    paid_at TIMESTAMPTZ,
    ipn_data JSONB,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Create reviews table
CREATE TABLE reviews (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    booking_id UUID REFERENCES bookings(id),
    safari_id UUID REFERENCES safaris(id),
    guide_id UUID REFERENCES guides(id),
    author_name VARCHAR(200) NOT NULL,
    author_country VARCHAR(100),
    rating SMALLINT NOT NULL,
    guide_rating SMALLINT,
    value_rating SMALLINT,
    title VARCHAR(200),
    body TEXT NOT NULL,
    trip_month VARCHAR(20),
    is_approved BOOLEAN NOT NULL DEFAULT false,
    is_featured BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Create gift_vouchers table
CREATE TABLE gift_vouchers (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    code VARCHAR(20) NOT NULL UNIQUE,
    amount_kes NUMERIC(10,2) NOT NULL,
    purchaser_email VARCHAR(200) NOT NULL,
    recipient_name VARCHAR(200),
    message TEXT,
    is_redeemed BOOLEAN NOT NULL DEFAULT false,
    redeemed_at TIMESTAMPTZ,
    expires_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Create memory_albums table
CREATE TABLE memory_albums (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    booking_id UUID NOT NULL REFERENCES bookings(id),
    slug VARCHAR(50) NOT NULL UNIQUE,
    photos JSONB NOT NULL DEFAULT '[]',
    is_published BOOLEAN NOT NULL DEFAULT false,
    view_count INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Create partner_lodges table
CREATE TABLE partner_lodges (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    location VARCHAR(200) NOT NULL,
    category VARCHAR(50) NOT NULL,
    commission_pct INTEGER NOT NULL DEFAULT 0,
    contact_email VARCHAR(200),
    contact_phone VARCHAR(30),
    booking_terms TEXT,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Create indexes for better performance
CREATE INDEX idx_destinations_slug ON destinations(slug);
CREATE INDEX idx_destinations_country ON destinations(country);
CREATE INDEX idx_safaris_slug ON safaris(slug);
CREATE INDEX idx_safaris_is_active ON safaris(is_active);
CREATE INDEX idx_bookings_reference ON bookings(reference);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_enquiries_reference ON enquiries(reference);
CREATE INDEX idx_enquiries_status ON enquiries(status);

-- Success message
SELECT 'Engai Safaris database schema created successfully!' as message;