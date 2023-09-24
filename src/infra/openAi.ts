// This code is for v4 of the openai package: npmjs.com/package/openai
import OpenAI from "openai";

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
