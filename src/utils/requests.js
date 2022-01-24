import instanceAxios from "../services/axios";

export async function post(rota, body, token) {
  return await instanceAxios.post(rota, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function get(rota, token) {
  return await instanceAxios.get(rota, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
}

export async function put(rota, body, token) {
  return await instanceAxios.put(rota, body, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
}

export async function del(rota, token) {
  return await instanceAxios.delete(rota, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
}
