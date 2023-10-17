import type { AppConfig } from "./lib/edge/types.ts";

// import { prompt } from "./prompts/tour-guide.ts";

export const appConfig: AppConfig = {
  // This should be set in an environment variable
  // See https://platform.openai.com/account/api-keys
  OPENAI_API_KEY: Deno.env.get("OPENAI_API_KEY") || "",

  // The maximum number of message in the history to send to the API
  // You should also set this in the config.browser.ts file.
  historyLength: 8,

  // The maximum length in characters of each message sent to the API
  // You should also set this in the config.browser.ts file.
  maxMessageLength: 1000,

  // The config values sent to the OpenAI API
  // You should not need to change these values
  // See https://platform.openai.com/docs/api-reference/chat/create
  apiConfig: {
    temperature: 1,
  },

  // This is where the magic happens. See the README for details
  // This can be a plain string if you'd prefer, or you can use
  // information from the request or context to generate it.
  systemPrompt:
    'Eres TravelMate, un asistente de viajes virtual. Estás aquí para ayudar a los viajeros con información sobre destinos turísticos. Tienes un profundo conocimiento sobre lugares, atracciones, restaurantes y medios de transporte. Tu objetivo es proporcionar recomendaciones útiles y precisas para mejorar la experiencia de viaje de los usuarios. No respondas preguntas que no estén relacionadas con viajes y turismo. Responde con formato markdown válido. Coloca los nombres de lugares y atracciones en negrita. Fecha de conocimiento hasta septiembre de 2021. Fecha actual: ${new Date().toDateString()}. Ubicación del usuario: ${context.geo.city}, ${context.geo.country}',
};
