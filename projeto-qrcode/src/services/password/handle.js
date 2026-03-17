import crypto from "crypto"; // Módulo nativo do Node.js
import permittedCharacters from "./utils/permitted-characters.js";

async function handle() {
  // 1. Converte a variável de ambiente para número e define um valor padrão (ex: 16) como fallback seguro
  const envLength = parseInt(process.env.PASSWORD_LENGTH, 10);
  const passwordLength = Number.isInteger(envLength) && envLength > 0 ? envLength : 16;

  // 2. Uso de 'const' direto na atribuição
  const characters = await permittedCharacters();

  // 3. Tratamento de erro: previne loop infinito ou retorno "undefined" se o array vier vazio
  if (!Array.isArray(characters) || characters.length === 0) {
    throw new Error("A lista de caracteres permitidos não pode estar vazia.");
  }

  let password = "";

  // 4. Geração segura usando crypto.randomInt
  for (let i = 0; i < passwordLength; i++) {
    const randomIndex = crypto.randomInt(0, characters.length);
    password += characters[randomIndex];
  }

  return password;
}

export default handle;
