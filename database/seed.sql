-- ============================================================
--  Seed data — generated from src/lib/data.ts
--  12 properties, 6 cities, 4 testimonials,
--  6 services, 4 team members, 5 milestones, 3 offices
--  Regenerate with:  npm run db:seed
-- ============================================================

SET NAMES utf8mb4;

-- ---------- properties ----------
INSERT INTO properties
  (id, slug, title, title_ur, city, area, type, purpose, price, beds, baths, size_label, sqft, image, gallery, featured, verified, installments, badge, description, amenities, agent, agent_phone, posted_label, possession)
VALUES
  ('1', 'dha-phase-6-modern-villa-lahore', '1 Kanal Modern Villa, DHA Phase 6', 'ایک کنال ماڈرن ولا، ڈی ایچ اے فیز ۶', 'Lahore', 'DHA Phase 6, Block D', 'House', 'sale', 87500000, 6, 7, '1 Kanal', 4500, '/img/p1.jpg', '["/img/p1.jpg","/img/p3.jpg","/img/p10.jpg","/img/p7.jpg"]', 1, 1, 0, 'Signature Listing', 'A brand-new architect-designed villa on a prime corner plot in DHA Phase 6. Triple-height entrance lobby, imported Italian marble flooring, home automation, and a landscaped rear lawn with an infinity-edge pool. Basement includes a home theatre and gym.', '["Swimming Pool","Home Theatre","Basement Gym","Solar System","Servant Quarter","Double Garage","Central AC","Smart Home"]', 'Bilal Ahmed', '+92 300 123 4567', '3 days ago', 'Ready to move'),
  ('2', 'bahria-town-karachi-precinct-19-house', '200 Sq Yd Villa, Bahria Town Karachi', '۲۰۰ اسکوائر یارڈ ولا، بحریہ ٹاؤن کراچی', 'Karachi', 'Precinct 19, Bahria Town', 'House', 'sale', 31500000, 4, 5, '200 Sq Yd', 1800, '/img/p9.jpg', '["/img/p9.jpg","/img/p3.jpg","/img/p10.jpg"]', 1, 1, 1, 'Easy Installments', 'Well-maintained Ali Block villa with an open-plan drawing and dining area, American kitchen, and a covered terrace. Located two minutes from Jamia Masjid and the Bahria Town sports complex, with 24/7 gated security.', '["Gated Security","Community Park","Backup Generator","Covered Terrace","Boundary Wall","Car Porch"]', 'Sana Qureshi', '+92 301 555 0192', '1 week ago', 'Ready to move'),
  ('3', 'centaurus-penthouse-islamabad', 'Panoramic Penthouse, Blue Area', 'شاندار پینٹ ہاؤس، بلیو ایریا', 'Islamabad', 'Jinnah Avenue, Blue Area', 'Apartment', 'sale', 145000000, 4, 5, '4,100 Sq Ft', 4100, '/img/p7.jpg', '["/img/p7.jpg","/img/p2.jpg","/img/p3.jpg","/img/p10.jpg"]', 1, 1, 0, 'Margalla View', 'Top-floor duplex penthouse with a 270° wrap-around terrace facing the Margalla Hills. Private lift lobby, chef kitchen, staff suite, and two dedicated basement parking bays. Building offers concierge, spa, and rooftop lounge.', '["Private Lift","Concierge","Rooftop Lounge","Spa & Sauna","Two Parking Bays","Panoramic Terrace","Central Heating"]', 'Hamza Tariq', '+92 333 220 8877', '2 days ago', 'Ready to move'),
  ('4', 'gulberg-greens-farmhouse-islamabad', '4 Kanal Farmhouse, Gulberg Greens', 'چار کنال فارم ہاؤس، گلبرگ گرینز', 'Islamabad', 'Gulberg Greens, Block C', 'Farmhouse', 'sale', 195000000, 5, 6, '4 Kanal', 7200, '/img/p6.jpg', '["/img/p6.jpg","/img/p1.jpg","/img/p3.jpg"]', 0, 1, 0, 'Luxury Estate', 'A fully developed farmhouse estate with mature fruit orchard, 60-foot pool, outdoor BBQ pavilion, and a separate guest annexe. Tube well, solar array, and a caretaker cottage included.', '["Fruit Orchard","Swimming Pool","BBQ Pavilion","Guest Annexe","Tube Well","Solar Array","Caretaker Cottage"]', 'Nadia Shah', '+92 321 778 4410', '5 days ago', 'Ready to move'),
  ('5', 'dha-phase-8-commercial-plaza-lahore', 'Corporate Plaza Floor, DHA Phase 8', 'کارپوریٹ پلازہ فلور، ڈی ایچ اے فیز ۸', 'Lahore', 'Broadway Commercial, Phase 8', 'Commercial', 'rent', 950000, 0, 4, '3,600 Sq Ft', 3600, '/img/p5.jpg', '["/img/p5.jpg","/img/p2.jpg"]', 0, 1, 0, 'Prime Frontage', 'Grey-structure-plus-finished corporate floor on the main Broadway commercial strip. Two lifts, 60 KVA generator backup, fibre-ready risers, and dedicated basement parking for 12 cars. Ideal for software houses and banks.', '["Two Lifts","Generator Backup","Fibre Ready","Basement Parking","Fire Safety","Reception Lobby"]', 'Usman Raza', '+92 345 990 1120', '4 days ago', 'Immediate'),
  ('6', 'park-view-city-residential-plot-lahore', '10 Marla Plot, Park View City', 'دس مرلہ پلاٹ، پارک ویو سٹی', 'Lahore', 'Golf Estate Block, Park View City', 'Plot', 'sale', 14500000, 0, 0, '10 Marla', 2722, '/img/p4.jpg', '["/img/p4.jpg","/img/p8.jpg"]', 0, 1, 1, '3-Year Plan', 'Level, possession-ready residential plot facing a 40-foot road in the Golf Estate Block. All utilities laid, NOC approved by LDA, and transfer can be completed within 7 working days.', '["LDA Approved","Possession Ready","Utilities Laid","40 ft Road","Park Facing"]', 'Sana Qureshi', '+92 301 555 0192', '1 day ago', 'Possession available'),
  ('7', 'emaar-crescent-bay-apartment-karachi', 'Sea-Facing 3 Bed, Crescent Bay', 'سمندر کے سامنے تین بیڈ، کریسنٹ بے', 'Karachi', 'Crescent Bay, DHA Phase 8', 'Apartment', 'sale', 92000000, 3, 4, '2,850 Sq Ft', 2850, '/img/p2.jpg', '["/img/p2.jpg","/img/p7.jpg","/img/p10.jpg","/img/p3.jpg"]', 1, 1, 0, 'Sea View', 'High-floor apartment in a landmark waterfront tower with uninterrupted Arabian Sea views. Imported joinery, temperature-controlled pool, residents-only beach club, and full facility management.', '["Sea View","Infinity Pool","Beach Club","Gymnasium","Kids Area","24/7 Security","Valet Parking"]', 'Hamza Tariq', '+92 333 220 8877', '6 days ago', 'Ready to move'),
  ('8', 'bahria-enclave-house-rent-islamabad', '10 Marla House for Rent, Bahria Enclave', 'دس مرلہ گھر کرائے پر، بحریہ انکلیو', 'Islamabad', 'Sector C, Bahria Enclave', 'House', 'rent', 285000, 5, 5, '10 Marla', 2500, '/img/p8.jpg', '["/img/p8.jpg","/img/p3.jpg","/img/p10.jpg"]', 0, 1, 0, NULL, 'Newly built family home on a park-facing street in Sector C. Wooden flooring in bedrooms, fitted wardrobes, gas and electric backup, and a private lawn. Walking distance to Enclave Grand Mosque.', '["Park Facing","Fitted Wardrobes","Private Lawn","Gas Backup","Servant Room","Car Porch"]', 'Nadia Shah', '+92 321 778 4410', '2 weeks ago', 'Immediate'),
  ('9', 'gwadar-sangar-housing-plot', '1 Acre Investment Land, Gwadar', 'ایک ایکڑ سرمایہ کاری زمین، گوادر', 'Gwadar', 'Sangar Housing, Marine Drive', 'Plot', 'sale', 26000000, 0, 0, '1 Acre', 43560, '/img/p4.jpg', '["/img/p4.jpg","/img/p8.jpg"]', 0, 0, 1, 'High Growth', 'Coastal-corridor land parcel minutes from the Gwadar Expressway and new port free zone. GDA approved with clean title and full documentation support from our legal desk.', '["GDA Approved","Clean Title","Expressway Access","Investment Corridor"]', 'Usman Raza', '+92 345 990 1120', '3 weeks ago', 'Possession available'),
  ('10', 'gulberg-lahore-serviced-apartment-rent', 'Serviced 2 Bed Apartment, Gulberg III', 'سروسڈ دو بیڈ اپارٹمنٹ، گلبرگ ۳', 'Lahore', 'MM Alam Road, Gulberg III', 'Apartment', 'rent', 195000, 2, 2, '1,450 Sq Ft', 1450, '/img/p10.jpg', '["/img/p10.jpg","/img/p3.jpg","/img/p2.jpg"]', 0, 1, 0, NULL, 'Fully furnished serviced apartment on MM Alam Road with housekeeping, Wi-Fi, and utilities included. Perfect for expatriates and corporate stays; minimum six-month lease.', '["Fully Furnished","Housekeeping","Wi-Fi Included","Lift","Backup Power","Secure Parking"]', 'Bilal Ahmed', '+92 300 123 4567', '4 days ago', 'Immediate'),
  ('11', 'faisalabad-canal-road-house', '1 Kanal Corner House, Canal Road', 'ایک کنال کارنر ہاؤس، کینال روڈ', 'Faisalabad', 'Eden Valley, Canal Road', 'House', 'sale', 42000000, 5, 6, '1 Kanal', 3900, '/img/p3.jpg', '["/img/p3.jpg","/img/p9.jpg","/img/p10.jpg"]', 0, 1, 0, NULL, 'Spacious corner bungalow in Eden Valley with a large front lawn, double-height sitting room, and a separate guest wing. Fifteen minutes from Faisalabad Motorway interchange.', '["Corner Plot","Front Lawn","Guest Wing","Store Room","Two Kitchens","Solar Ready"]', 'Sana Qureshi', '+92 301 555 0192', '1 week ago', 'Ready to move'),
  ('12', 'multan-shop-commercial-sale', 'Ground Floor Shop, Cantt Plaza', 'گراؤنڈ فلور شاپ، کینٹ پلازہ', 'Multan', 'Abdali Road, Cantt', 'Commercial', 'sale', 18500000, 0, 1, '620 Sq Ft', 620, '/img/p5.jpg', '["/img/p5.jpg","/img/p2.jpg"]', 0, 1, 0, NULL, 'High-footfall ground-floor retail unit on Abdali Road with a 22-foot glass frontage, mezzanine storage, and separate commercial meter. Currently tenanted with a 7% net yield.', '["Glass Frontage","Mezzanine","Commercial Meter","Tenanted","Main Road"]', 'Hamza Tariq', '+92 333 220 8877', '9 days ago', 'On tenancy transfer');

-- ---------- cities ----------
INSERT INTO cities (name, listings, image) VALUES
  ('Lahore', 1240, '/img/p1.jpg'),
  ('Karachi', 1580, '/img/p2.jpg'),
  ('Islamabad', 970, '/img/p7.jpg'),
  ('Rawalpindi', 610, '/img/p8.jpg'),
  ('Faisalabad', 385, '/img/p9.jpg'),
  ('Gwadar', 242, '/img/p4.jpg');

-- ---------- testimonials ----------
INSERT INTO testimonials (name, role, text, stars) VALUES
  ('Dr. Arsalan Khan', 'Overseas buyer · Dubai', 'Sitting in Dubai, I bought a 1 Kanal plot in DHA Lahore through Pak Property Point. Video tours, verified documents, and transfer completed without me flying back. Poori transparency thi.', 5),
  ('Mrs. Farah Siddiqui', 'Home seller · Karachi', 'Our Bahria Town villa sold in 19 days at the price we wanted. The 3D listing and photography made a huge difference — serious buyers only, no time wasters.', 5),
  ('Zeeshan Malik', 'Investor · Islamabad', 'Their investment desk mapped out a 3-year installment plan for me in Gulberg Greens. Honest advice, market data ke sath, aur har document legally verified.', 5),
  ('Ayesha & Bilal', 'First home · Lahore', 'First-time buyers hone ke bawajood we never felt lost. They explained every step, arranged bank financing, and got us a better rate than we expected.', 5);

-- ---------- services ----------
INSERT INTO services (sort_order, title, title_ur, icon, blurb, points) VALUES
  (0, 'Buying Advisory', 'خرید مشاورت', 'key', 'Shortlists built around your budget, timeline and family needs — not commission.', '["Verified listings only","Negotiation on your behalf","Price-trend briefing","Site visits arranged"]'),
  (1, 'Selling & Marketing', 'فروخت و مارکیٹنگ', 'megaphone', 'Cinematic photography, 3D walkthroughs and targeted campaigns that reach real buyers.', '["Pro photo & drone shoot","3D virtual tour","Portal + social campaign","Qualified buyer screening"]'),
  (2, 'Investment Desk', 'انویسٹمنٹ ڈیسک', 'trending', 'Data-led entry and exit strategy across plots, files and rental yield assets.', '["Society NOC checks","Yield & ROI modelling","Installment plan mapping","Exit timing guidance"]'),
  (3, 'Legal & Transfer', 'قانونی و ٹرانسفر', 'shield', 'Title verification, fard, mutation and registry handled by our in-house legal team.', '["Title & ownership search","Fard & mutation","Stamp duty handling","Registry completion"]'),
  (4, 'Overseas Pakistanis', 'اوورسیز پاکستانی', 'globe', 'A dedicated relationship manager, live video tours and power-of-attorney support.', '["Live video viewings","POA documentation","Roshan Digital guidance","Monthly asset reports"]'),
  (5, 'Property Management', 'پراپرٹی مینجمنٹ', 'wrench', 'Tenant sourcing, rent collection and maintenance while you focus elsewhere.', '["Tenant vetting","Rent collection","Maintenance crew","Annual condition report"]');

-- ---------- team ----------
INSERT INTO team (sort_order, name, role, city, years, image) VALUES
  (0, 'Bilal Ahmed', 'Founder & CEO', 'Lahore', 18, '/img/p9.jpg'),
  (1, 'Sana Qureshi', 'Head of Residential', 'Karachi', 12, '/img/p10.jpg'),
  (2, 'Hamza Tariq', 'Director, Investments', 'Islamabad', 14, '/img/p7.jpg'),
  (3, 'Nadia Shah', 'Legal & Transfers', 'Islamabad', 9, '/img/p3.jpg');

-- ---------- milestones ----------
INSERT INTO milestones (sort_order, year, text) VALUES
  (0, '2009', 'Pak Property Point opens a single-room office in Gulberg, Lahore.'),
  (1, '2014', 'Karachi and Islamabad branches launched; first 1,000 families served.'),
  (2, '2018', 'In-house legal and transfer desk formed to end documentation anxiety.'),
  (3, '2022', '3D virtual tours introduced — overseas sales grow by 240%.'),
  (4, '2026', 'Over PKR 48 Arab in transactions across 9 cities and 6,400+ clients.');

-- ---------- offices ----------
INSERT INTO offices (sort_order, city, address, phone) VALUES
  (0, 'Lahore (Head Office)', '4th Floor, Gulberg Arcade, MM Alam Road, Gulberg III', '+92 300 123 4567'),
  (1, 'Karachi', 'Office 12-B, Ittehad Commercial, DHA Phase VI', '+92 301 555 0192'),
  (2, 'Islamabad', 'Suite 703, Emirates Tower, F-7 Markaz', '+92 333 220 8877');

-- ---------- site settings ----------
INSERT INTO site_settings (`key`, value) VALUES
  ('whatsapp', '923001234567'),
  ('phone',    '+92 300 123 4567'),
  ('email',    'info@pakpropertypoint.pk');
