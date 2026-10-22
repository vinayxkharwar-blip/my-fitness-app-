require("dotenv").config({ path: require("path").resolve(__dirname, "../.env") });
const dns = require("dns");
try { dns.setServers(["8.8.8.8", "8.8.4.4"]); } catch(e) {}
const mongoose = require("mongoose");
const Trainer = require("../models/Trainer");
const Product = require("../models/Product");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

const trainers = [
    {
        name: "Mike Chen",
        specialty: "Strength & Conditioning",
        bio: "NSCA-certified strength coach with 8 years of experience. Specializes in powerlifting and functional fitness.",
        rating: 4.8,
        price: 75.00,
        image_url: "https://i.pravatar.cc/300?img=12"
    },
    {
        name: "Emily Rodriguez",
        specialty: "Yoga & Mobility",
        bio: "RYT-500 certified yoga instructor. Combines traditional yoga with sports mobility techniques for athletes.",
        rating: 4.9,
        price: 60.00,
        image_url: "https://i.pravatar.cc/300?img=5"
    },
    {
        name: "David Kim",
        specialty: "HIIT & CrossFit",
        bio: "CrossFit Level 2 trainer and former competitive athlete. High-energy sessions that deliver results.",
        rating: 4.7,
        price: 70.00,
        image_url: "https://i.pravatar.cc/300?img=7"
    }
];

const products = [
    {
        name: "Whey Protein Isolate",
        description: "Premium 100% whey protein isolate. 25g protein per scoop, low carb, fast absorbing.",
        price: 49.99,
        category: "Supplements",
        image_url: "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?auto=format&fit=crop&q=80&w=500",
        stock: 50
    },
    {
        name: "Pre-Workout Energy",
        description: "High-performance pre-workout with caffeine, beta-alanine, and citrulline malate.",
        price: 34.99,
        category: "Supplements",
        image_url: "https://images.unsplash.com/photo-1579722820308-d74e571900a9?auto=format&fit=crop&q=80&w=500",
        stock: 35
    },
    {
        name: "Adjustable Dumbbells",
        description: "Space-saving adjustable dumbbells, 5-52.5 lbs per hand. Quick-change weight dial system.",
        price: 199.99,
        category: "Equipment",
        image_url: "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&q=80&w=500",
        stock: 15
    },
    {
        name: "Resistance Bands Set",
        description: "5-piece latex resistance band set with varying tension levels. Includes door anchor and carry bag.",
        price: 24.99,
        category: "Equipment",
        image_url: "https://images.unsplash.com/photo-1598266663439-2056e6900339?auto=format&fit=crop&q=80&w=500",
        stock: 100
    },
    {
        name: "Performance T-Shirt",
        description: "Moisture-wicking athletic tee with anti-odor technology. Lightweight, breathable, and stylish.",
        price: 29.99,
        category: "Apparel",
        image_url: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=500",
        stock: 75
    }
];

async function seed() {
    try {
        const mongoURI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/fitsnap";
        console.log("Connecting to MongoDB for seeding...");
        await mongoose.connect(mongoURI);
        console.log("Connected to MongoDB.");

        // 1. Seed Trainers
        console.log("Seeding trainers...");
        for (const t of trainers) {
            await Trainer.findOneAndUpdate(
                { name: t.name },
                { $set: t },
                { upsert: true, returnDocument: 'after' }
            );
        }
        console.log(`Seeded ${trainers.length} trainers.`);

        // 2. Seed Products
        console.log("Seeding products...");
        for (const p of products) {
            await Product.findOneAndUpdate(
                { name: p.name },
                { $set: p },
                { upsert: true, returnDocument: 'after' }
            );
        }
        console.log(`Seeded ${products.length} products.`);

        // 3. Seed Demo User for easy testing
        const existingDemoUser = await User.findOne({ email: "demo@fitsnap.com" });
        if (!existingDemoUser) {
            console.log("Creating default demo user (demo@fitsnap.com / password123)...");
            const hash = await bcrypt.hash("password123", 10);
            await User.create({
                email: "demo@fitsnap.com",
                password: hash,
                full_name: "Demo User",
                goal: "maintain",
                height_cm: 175,
                weight_kg: 70,
                age: 28,
                activity_level: "moderate"
            });
            console.log("Demo user created.");
        } else {
            console.log("Demo user already exists.");
        }

        console.log("Seeding completed successfully!");
        process.exit(0);
    } catch (err) {
        console.error("Seeding failed:", err);
        process.exit(1);
    }
}

seed();
