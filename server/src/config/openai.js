const { OpenAI } = require("openai");

module.exports = class openai {
  static configuration() {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    return new OpenAI(openai);
  }

  static textCompletion({prompt}) {
    return {
      model: "gpt-3.5-turbo",
      messages: `${prompt}`,
      temperature: 0,
      max_tokens: 3495,
      top_p: 1,
      frequency_penalty: 0.5,
      presence_penalty: 0,
    }
  }
}