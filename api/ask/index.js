// api/ask/index.js  (CommonJS)

module.exports = async function (context, req) {
  context.log("Ask API triggered");

  try {
    const userInput = req.body && req.body.input ? req.body.input : "";

    if (!userInput) {
      context.res = {
        status: 400,
        headers: { "Content-Type": "application/json" },
        body: { output: "Please enter a question." }
      };
      return;
    }

    // Normalize endpoint (avoid missing slash)
    const endpoint = (process.env.AZURE_OPENAI_ENDPOINT || "").replace(/\/+$/, "");
    const deployment = process.env.AZURE_OPENAI_DEPLOYMENT;
    const key = process.env.AZURE_OPENAI_KEY;

    if (!endpoint || !deployment || !key) {
      context.res = {
        status: 500,
        headers: { "Content-Type": "application/json" },
        body: {
          output: "Server misconfigured: missing Azure OpenAI env vars.",
          debug: {
            hasEndpoint: !!endpoint,
            hasDeployment: !!deployment,
            hasKey: !!key
          }
        }
      };
      return;
    }

    const url =
      `${endpoint}/openai/deployments/${deployment}/chat/completions?api-version=2024-05-01-preview`;

    const aoaiResp = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": key
      },
      body: JSON.stringify({
        messages: [
          { role: "system", content: "You are KONTUUR AI assistant." },
          { role: "user", content: userInput }
        ],
        max_tokens: 200
      })
    });

    const data = await aoaiResp.json();
    const output =
      data?.choices?.[0]?.message?.content || "No response from model.";

    context.res = {
      status: 200,
      headers: { "Content-Type": "application/json" },
      body: { output }
    };
  } catch (err) {
    context.log("❌ Ask function crash:", err);

    context.res = {
      status: 500,
      headers: { "Content-Type": "application/json" },
      body: {
        output: "Server error",
        error: err?.message || String(err)
      }
    };
  }
};
