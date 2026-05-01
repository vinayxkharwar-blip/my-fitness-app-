const fs = require('fs');
const path = require('path');
const dir = './controllers';
const files = fs.readdirSync(dir);
files.forEach(file => {
    if(file.endsWith('.js')) {
        const filePath = path.join(dir, file);
        let content = fs.readFileSync(filePath, 'utf8');
        content = content.replace(/const clerk_user_id = req\.auth\.userId;/g, 'const USER_ID = "demo-user";\n    const clerk_user_id = USER_ID;');
        fs.writeFileSync(filePath, content);
    }
});
console.log('Replaced in all controllers');
