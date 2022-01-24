import { format } from "date-fns";

export function formatarData(dateStr) {
  const dateFormat = dateStr.replace(/[^0-9]/g, ",");

  return format(new Date(dateFormat), "dd/MM/yyyy");
}

export function formatarCpf(cpf) {
  if (!cpf) return;
  return `${cpf.substr(0, 3)}.${cpf.substr(3, 3)}.${cpf.substr(
    6,
    3
  )}-${cpf.substr(9, 2)}`;
}

export function formatarTel(tel) {
  if (!tel) return;
  return `(${tel.substr(0, 2)})${tel.substr(2, 1)} ${tel.substr(
    3,
    4
  )}-${tel.substr(7, 4)}`;
}

export function formatarCep(cep) {
  if (!cep) return;
  return `${cep.substr(0, 2)}.${cep.substr(2, 3)}-${cep.substr(5, 3)}`;
}
