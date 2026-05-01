/**
 * seed.js — Populates the FitSnap Coach SQLite database with demo data.
 * 
 * Usage:  node seed.js
 * 
 * Safe to run multiple times — uses INSERT OR IGNORE to avoid duplicates.
 * All user-scoped data is tied to the dev bypass user "dev_user_123".
 */

const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const dbPath = path.resolve(__dirname, "fitness_app.sqlite");
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error("❌ Could not connect to database:", err.message);
        process.exit(1);
    }
    console.log("✅ Connected to", dbPath);
});

const USER_ID = "dev_user_123";

// Helper: today and recent dates in YYYY-MM-DD HH:MM:SS format
const today = new Date();
const dateStr = (daysAgo, hour = 12, min = 0) => {
    const d = new Date(today);
    d.setDate(d.getDate() - daysAgo);
    d.setHours(hour, min, 0, 0);
    return d.toISOString().replace("T", " ").substring(0, 19);
};

// ═══════════════════════════════════════════════════
// 1. MEALS (5 entries — today and yesterday)
// ═══════════════════════════════════════════════════
const meals = [
    { name: "Oatmeal with Berries",     calories: 320,  protein: 12, carbs: 52,  fats: 8,  type: "breakfast", logged: dateStr(0, 8, 30) },
    { name: "Grilled Chicken Salad",    calories: 450,  protein: 42, carbs: 18,  fats: 14, type: "lunch",     logged: dateStr(0, 13, 0) },
    { name: "Protein Shake",            calories: 180,  protein: 30, carbs: 6,   fats: 3,  type: "snack",     logged: dateStr(0, 16, 0) },
    { name: "Salmon & Roasted Veggies", calories: 580,  protein: 38, carbs: 25,  fats: 22, type: "dinner",    logged: dateStr(1, 19, 30) },
    { name: "Greek Yogurt Bowl",        calories: 280,  protein: 20, carbs: 30,  fats: 10, type: "breakfast", logged: dateStr(1, 8, 0) },
];

// ═══════════════════════════════════════════════════
// 2. WATER LOGS (5 entries — throughout today)
// ═══════════════════════════════════════════════════
const waterLogs = [
    { ml: 250, logged: dateStr(0, 7, 0) },
    { ml: 250, logged: dateStr(0, 9, 30) },
    { ml: 500, logged: dateStr(0, 12, 0) },
    { ml: 250, logged: dateStr(0, 15, 0) },
    { ml: 250, logged: dateStr(0, 18, 30) },
];

// ═══════════════════════════════════════════════════
// 3. HABITS (3 habits + today's completion logs)
// ═══════════════════════════════════════════════════
const habits = [
    { name: "Morning Stretch",   frequency: "daily", streak: 5 },
    { name: "Drink 8 Glasses",   frequency: "daily", streak: 3 },
    { name: "Read 10 Minutes",   frequency: "daily", streak: 7 },
];

// ═══════════════════════════════════════════════════
// 4. TRAINERS (3 trainers)
// ═══════════════════════════════════════════════════
const trainers = [
    {
        name: "Mike Chen",
        specialty: "Strength & Conditioning",
        bio: "NSCA-certified strength coach with 8 years of experience. Specializes in powerlifting and functional fitness.",
        rating: 4.8,
        price: 75.00,
        avatar: "https://i.pravatar.cc/300?img=12"
    },
    {
        name: "Emily Rodriguez",
        specialty: "Yoga & Mobility",
        bio: "RYT-500 certified yoga instructor. Combines traditional yoga with sports mobility techniques for athletes.",
        rating: 4.9,
        price: 60.00,
        avatar: "https://i.pravatar.cc/300?img=5"
    },
    {
        name: "David Kim",
        specialty: "HIIT & CrossFit",
        bio: "CrossFit Level 2 trainer and former competitive athlete. High-energy sessions that deliver results.",
        rating: 4.7,
        price: 70.00,
        avatar: "https://i.pravatar.cc/300?img=7"
    },
];

// ═══════════════════════════════════════════════════
// 5. PRODUCTS (5 products)
// ═══════════════════════════════════════════════════
const products = [
    { name: "Whey Protein Isolate",  desc: "Premium 100% whey protein isolate. 25g protein per scoop, low carb, fast absorbing.",                      price: 49.99,  cat: "Supplements", img: "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?auto=format&fit=crop&q=80&w=500",  stock: 50  },
    { name: "Pre-Workout Energy",    desc: "High-performance pre-workout with caffeine, beta-alanine, and citrulline malate.",                           price: 34.99,  cat: "Supplements", img: "https://images.unsplash.com/photo-1579722820308-d74e571900a9?auto=format&fit=crop&q=80&w=500",  stock: 35  },
    { name: "Adjustable Dumbbells",  desc: "Space-saving adjustable dumbbells, 5-52.5 lbs per hand. Quick-change weight dial system.",                   price: 199.99, cat: "Equipment",   img: "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&q=80&w=500",  stock: 15  },
    { name: "Resistance Bands Set",  desc: "5-piece latex resistance band set with varying tension levels. Includes door anchor and carry bag.",         price: 24.99,  cat: "Equipment",   img: "https://images.unsplash.com/photo-1598266663439-2056e6900339?auto=format&fit=crop&q=80&w=500",  stock: 100 },
    { name: "Performance T-Shirt",   desc: "Moisture-wicking athletic tee with anti-odor technology. Lightweight, breathable, and stylish.",             price: 29.99,  cat: "Apparel",     img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=500",  stock: 75  },
];


// ═══════════════════════════════════════════════════
// EXECUTE SEED
// ═══════════════════════════════════════════════════
db.serialize(() => {

    console.log("\n── Seeding Meals ──");
    const mealStmt = db.prepare(
        "INSERT OR IGNORE INTO meals (clerk_user_id, name, calories, protein, carbs, fats, meal_type, logged_at) VALUES (?,?,?,?,?,?,?,?)"
    );
    meals.forEach(m => {
        mealStmt.run(USER_ID, m.name, m.calories, m.protein, m.carbs, m.fats, m.type, m.logged, logResult(m.name));
    });
    mealStmt.finalize();

    console.log("\n── Seeding Water Logs ──");
    const waterStmt = db.prepare(
        "INSERT OR IGNORE INTO water_logs (clerk_user_id, amount_ml, logged_at) VALUES (?,?,?)"
    );
    waterLogs.forEach(w => {
        waterStmt.run(USER_ID, w.ml, w.logged, logResult(`${w.ml}ml @ ${w.logged}`));
    });
    waterStmt.finalize();

    console.log("\n── Seeding Habits ──");
    const habitStmt = db.prepare(
        "INSERT OR IGNORE INTO habits (clerk_user_id, name, frequency, streak) VALUES (?,?,?,?)"
    );
    habits.forEach(h => {
        habitStmt.run(USER_ID, h.name, h.frequency, h.streak, logResult(h.name));
    });
    habitStmt.finalize();

    // Seed habit_logs for today (mark first 2 habits as completed)
    console.log("\n── Seeding Habit Logs (today) ──");
    const habitLogStmt = db.prepare(
        "INSERT OR IGNORE INTO habit_logs (habit_id, completed_at) VALUES (?,?)"
    );
    habitLogStmt.run(1, dateStr(0, 7, 15), logResult("Habit 1 completed"));
    habitLogStmt.run(2, dateStr(0, 12, 0), logResult("Habit 2 completed"));
    habitLogStmt.finalize();

    console.log("\n── Seeding Trainers ──");
    const trainerStmt = db.prepare(
        "INSERT OR IGNORE INTO trainers (name, specialty, bio, rating, price_per_session, avatar_url) VALUES (?,?,?,?,?,?)"
    );
    trainers.forEach(t => {
        trainerStmt.run(t.name, t.specialty, t.bio, t.rating, t.price, t.avatar, logResult(t.name));
    });
    trainerStmt.finalize();

    console.log("\n── Seeding Products ──");
    const prodStmt = db.prepare(
        "INSERT OR IGNORE INTO products (name, description, price, category, image_url, stock) VALUES (?,?,?,?,?,?)"
    );
    products.forEach(p => {
        prodStmt.run(p.name, p.desc, p.price, p.cat, p.img, p.stock, logResult(p.name));
    });
    prodStmt.finalize();

    // Final verification
    console.log("\n── Verifying Counts ──");
    const tables = ["meals", "water_logs", "habits", "habit_logs", "trainers", "products"];
    let remaining = tables.length;
    tables.forEach(table => {
        db.get(`SELECT COUNT(*) as count FROM ${table}`, (err, row) => {
            console.log(`  ${table}: ${row?.count || 0} rows`);
            remaining--;
            if (remaining === 0) {
                console.log("\n🎉 Seed complete!\n");
                db.close();
            }
        });
    });
});

function logResult(label) {
    return (err) => {
        if (err) console.error(`  ❌ ${label}: ${err.message}`);
        else console.log(`  ✅ ${label}`);
    };
}
