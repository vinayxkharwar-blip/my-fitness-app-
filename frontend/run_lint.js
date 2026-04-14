const { execSync } = require('child_process');
try {
    const output = execSync('npx eslint .', { encoding: 'utf8' });
    console.log(output);
} catch (error) {
    console.log(error.stdout);
}
