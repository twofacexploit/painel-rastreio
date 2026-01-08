const { formatPhoneBR } = require("../utils/formatPhoneBR");

const phone = "(62) 99113-0757";

const formatted = formatPhoneBR(phone);

console.log("Telefone original:", phone);
console.log("Telefone formatado:", formatted);
