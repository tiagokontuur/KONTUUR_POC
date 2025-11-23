export default async function (context, req) {
  context.log("Ask API triggered");

  const userInput = req.body?.input || "";
  if (!userInput) {
    return { status: 400, body: { output: "Please enter a question." } };
  }

  try {
    const response = await fetch(
      `${process.env.AZURE_OPENAI_ENDPOINT}openai/deployments/${process.env.AZURE_OPENAI_DEPLOYMENT}/chat/completions?api-version=2024-05-01-preview`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "api-key": process.env.AZURE_OPENAI_KEY
        },
        body: JSON.stringify({
          messages: [
            { role: "system", content: "You are KONTUUR AI assistant." },
            { role: "user", content: userInput }
          ],
          max_tokens: 200
        })
      }
    );

    const data = await response.json();

    return {
      status: 200,
      body: { output: data.choices?.[0]?.message?.content || "No response." }
    };

  } catch (err) {
    context.error(err);
    return { status: 500, body: { output: "Server error" } };
  }
}
