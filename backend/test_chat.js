
// Native fetch in Node 18+
async function testChat() {
    console.log("Testing Chat Endpoint...");
    try {
        const response = await fetch("http://localhost:5000/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: "hello" })
        });

        console.log("Status:", response.status);
        if (response.ok) {
            const data = await response.json();
            console.log("Response:", data);
        } else {
            console.log("Error Text:", await response.text());
        }
    } catch (error) {
        console.error("Connection Failed:", error.message);
    }
}

testChat();
