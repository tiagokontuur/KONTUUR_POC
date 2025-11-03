// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
  console.log("✅ Script loaded and DOM ready");

  const inputBox = document.getElementById('inputBox');
  const submitBtn = document.getElementById('submitBtn');
  const outputArea = document.getElementById('outputArea');

  if (!submitBtn) {
    console.error("❌ Submit button not found");
    return;
  }

  // Handle button click
  submitBtn.addEventListener('click', async () => {
    console.log("🚀 Button clicked");

    const userInput = inputBox.value.trim();

    if (!userInput) {
      outputArea.innerText = "Please enter a question.";
      return;
    }

    // Show loading message
    outputArea.innerText = "Processing your request...";

    try {
      // Simulated AI response
      const simulatedResponse = `You asked: "${userInput}". AI response will appear here once API is connected.`;

      // Display response
      outputArea.innerText = simulatedResponse;

      // Uncomment this when API is ready:
      /*
      const response = await fetch('/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input: userInput })
      });
      const data = await response.json();
      outputArea.innerText = data.output;
      */
    } catch (error) {
      outputArea.innerText = "Error processing your request.";
      console.error(error);
    }
  });
});
