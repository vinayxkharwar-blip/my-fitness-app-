// Native fetch is available in Node.js 18+ 
// Actually node 18+ has native fetch. Assuming node 18+.

async function testSignup() {
    try {
        console.log("Testing Signup Endpoint...");
        const response = await fetch("http://127.0.0.1:5000/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                full_name: "Test User 123",
                email: "test" + Date.now() + "@example.com",
                password: "password123",
            }),
        });

        const data = await response.json();
        console.log("Status:", response.status);
        console.log("Response:", data);
    } catch (error) {
        console.error("Fetch Error:", error);
    }
}

testSignup();
