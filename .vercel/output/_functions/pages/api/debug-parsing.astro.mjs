import { readFileSync } from 'fs';
import { resolve } from 'path';
export { renderers } from '../../renderers.mjs';

function parseEnvFileDebug() {
  try {
    const envPath = resolve(process.cwd(), ".env");
    const envContent = readFileSync(envPath, "utf-8");
    const envVars = {};
    console.log("Raw env content:", envContent);
    envContent.split("\n").forEach((line, index) => {
      const trimmed = line.trim();
      console.log(`Line ${index}: "${trimmed}"`);
      if (trimmed && !trimmed.startsWith("#")) {
        const [key, ...valueParts] = trimmed.split("=");
        const cleanKey = key.trim();
        const value = valueParts.join("=").trim();
        console.log(`Key: "${cleanKey}" -> Value: "${value}"`);
        if (cleanKey && valueParts.length > 0) {
          envVars[cleanKey] = value;
        }
      }
    });
    return {
      envVars,
      envContent,
      success: true
    };
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Unknown error",
      success: false
    };
  }
}
const GET = async () => {
  const result = parseEnvFileDebug();
  return new Response(
    JSON.stringify(result, null, 2),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    }
  );
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
