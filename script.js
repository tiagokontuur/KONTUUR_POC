async function askAI() {
    const input = document.getElementById('inputBox').value;

    // Show loading state
    const outputArea = document.getElementById('outputArea');
    outputArea.innerText = "Processing your request...";

    try {
        // For now, simulate API response since backend isn't ready
        // Later, replace this with fetch('/api/ask', {...})
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate delay
        outputArea.innerText = `You asked: "${input}". AI response will appear here once API is connected.`;
    } catch (error) {
        outputArea.innerText = "Error: Unable to process request.";
        console.error(error);
    }
}
