function formatPhoneBR(input) {
  if (!input) return null;

  // Remove tudo que não for número
  let phone = input.toString().replace(/\D/g, "");

  // Remove zero inicial (ex: 011...)
  if (phone.startsWith("0")) {
    phone = phone.replace(/^0+/, "");
  }

  // Adiciona DDI Brasil se não existir
  if (!phone.startsWith("55")) {
    phone = "55" + phone;
  }

  // Brasil: 12 ou 13 dígitos
  if (phone.length < 12 || phone.length > 13) {
    return null;
  }

  return phone;
}

module.exports = { formatPhoneBR };
