import generateApiKey from "generate-api-key";

const createApiKey = () =>
  generateApiKey({ method: "string", length: 256 }) as string;

export { createApiKey };
