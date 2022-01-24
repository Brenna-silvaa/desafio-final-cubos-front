export default function filtrarCobrancas(lista, status) {
  return lista.filter((cobranca) => cobranca.status === status);
}
