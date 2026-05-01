const fs = require('fs');

let file = fs.readFileSync('controllers/profileController.js', 'utf8');

const search = `        if (result.length === 0) {
            return res.status(404).json({ msg: "User profile not found" });
        }`;

const search2 = `        if (result.length === 0) {\r
            return res.status(404).json({ msg: "User profile not found" });\r
        }`;

const replace = `        if (result.length === 0) {
            // Auto-create default profile for demo-user
            const insertSql = \`
                INSERT INTO user_profiles (clerk_user_id, age, height_cm, weight_kg, activity_level, goal)
                VALUES (?, 30, 175, 70, 'moderate', 'maintain')
            \`;
            db.query(insertSql, [clerk_user_id], (insertErr) => {
                if (insertErr) return res.status(500).json({ error: insertErr.message });
                
                return res.status(200).json({
                    age: 30,
                    weight_kg: 70,
                    height_cm: 175,
                    goal: 'maintain',
                    activity_level: 'moderate',
                    profile_image: null,
                    updated_at: new Date()
                });
            });
            return;
        }`;

if(file.includes(search)) {
    file = file.replace(search, replace);
} else if(file.includes(search2)) {
    file = file.replace(search2, replace);
} else {
    // If exact whitespace is different, let's just use regex
    file = file.replace(/if\s*\(result\.length\s*===\s*0\)\s*\{\s*return\s*res\.status\(404\)\.json\(\{ msg:\s*"User profile not found"\s*\}\);\s*\}/, replace);
}

fs.writeFileSync('controllers/profileController.js', file);
console.log('done');
