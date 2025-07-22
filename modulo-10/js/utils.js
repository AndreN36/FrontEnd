export function emailJaCadastrado(clientes, email) {
  return clientes.some(c => c.email.toLowerCase() === email.toLowerCase());
}
