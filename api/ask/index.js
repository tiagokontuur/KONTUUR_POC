// api/ask.js
export default async function (context, req) {
  const body = await req.json();
  const userInput = body?.input || "";

  if (!userInput) {
    return new Response(
      JSON.stringify({ output: "Please enter a question." }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
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

      const text = await response.text();
      console.log("RAW RESPONSE:", text);
      outputArea.innerText = text;   
      const output =
      data.choices?.[0]?.message?.content || "No response from model.";

    return new Response(
      JSON.stringify({ output }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );

  } catch (err) {
    console.error(err);
    return new Response(
      JSON.stringify({ output: "Server error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
