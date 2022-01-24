function isCpfOrTelInvalid(str) {
  if (!str) return;
  return str.length > 0 && str.length < 11;
}

function isCpfOrTelRequiredInvalid(str) {
  return str.length < 11;
}

function isCepInvalid(str) {
  return str.length > 0 && str.length < 8;
}

export { isCpfOrTelInvalid, isCpfOrTelRequiredInvalid, isCepInvalid };
