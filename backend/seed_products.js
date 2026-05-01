const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const dbPath = path.resolve(__dirname, "fitness_app.sqlite");
const db = new sqlite3.Database(dbPath);

const products = [
    { name: 'Whey Protein Isolate', description: 'Premium 100% whey protein isolate with 25g protein per scoop. Low carb, fast absorbing.', price: 49.99, category: 'Supplements', image_url: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?auto=format&fit=crop&q=80&w=500', stock: 50 },
    { name: 'Pre-Workout Energy', description: 'High-performance pre-workout formula with caffeine, beta-alanine, and citrulline.', price: 34.99, category: 'Supplements', image_url: 'https://images.unsplash.com/photo-1579722820308-d74e571900a9?auto=format&fit=crop&q=80&w=500', stock: 35 },
    { name: 'Adjustable Dumbbells', description: 'Space-saving adjustable dumbbells from 5-52.5 lbs. Quick-change weight system.', price: 199.99, category: 'Equipment', image_url: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&q=80&w=500', stock: 15 },
    { name: 'Resistance Bands Set', description: '5-piece resistance band set with varying tension levels. Includes door anchor and carry bag.', price: 24.99, category: 'Equipment', image_url: 'https://images.unsplash.com/photo-1598266663439-2056e6900339?auto=format&fit=crop&q=80&w=500', stock: 100 },
    { name: 'Performance T-Shirt', description: 'Moisture-wicking athletic tee with anti-odor technology. Lightweight and breathable.', price: 29.99, category: 'Apparel', image_url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=500', stock: 75 },
    { name: 'Gym Duffle Bag', description: 'Water-resistant gym bag with shoe compartment and multiple pockets. 40L capacity.', price: 45.00, category: 'Apparel', image_url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=500', stock: 40 },
];

db.serialize(() => {
    const stmt = db.prepare("INSERT OR IGNORE INTO products (name, description, price, category, image_url, stock) VALUES (?, ?, ?, ?, ?, ?)");
    products.forEach(p => {
        stmt.run(p.name, p.description, p.price, p.category, p.image_url, p.stock, (err) => {
            if (err) console.error("Error inserting:", p.name, err.message);
            else console.log("Inserted:", p.name);
        });
    });
    stmt.finalize(() => {
        console.log("\nDone seeding products!");
        db.close();
    });
});
