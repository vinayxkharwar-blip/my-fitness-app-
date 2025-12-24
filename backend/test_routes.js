
async function testRoutes() {
    console.log("Testing Routes...");

    // Test 1: Old Route
    try {
        const r1 = await fetch("http://localhost:5000/api/analyze", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ image: "mock" })
        });
        console.log("/api/analyze status:", r1.status);
    } catch (e) { console.log("/api/analyze failed:", e.message); }

    // Test 2: New Route
    try {
        const r2 = await fetch("http://localhost:5000/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: "hello" })
        });
        console.log("/api/chat status:", r2.status);
    } catch (e) { console.log("/api/chat failed:", e.message); }
}

testRoutes();
