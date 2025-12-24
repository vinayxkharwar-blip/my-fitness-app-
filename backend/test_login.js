
// Native fetch is available in Node.js 18+

async function testLogin() {
    const email = "test_login_" + Date.now() + "@example.com";
    const password = "password123";
    const fullName = "Test User Login";

    console.log(`1. Registering user: ${email}`);
    try {
        const regRes = await fetch("http://localhost:5000/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ full_name: fullName, email, password })
        });

        if (!regRes.ok) {
            console.error("Registration failed:", await regRes.text());
            return;
        }
        console.log("Registration successful.");

        console.log("2. Attempting login...");
        const loginRes = await fetch("http://localhost:5000/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        const data = await loginRes.json();
        console.log("Login Status:", loginRes.status);

        if (data.token) {
            console.log("SUCCESS: Token received!");
            console.log("Token:", data.token.substring(0, 20) + "...");
        } else {
            console.error("FAILURE: No token in response.");
            console.log("Response:", data);
        }

    } catch (err) {
        console.error("Test failed:", err);
    }
}

testLogin();
