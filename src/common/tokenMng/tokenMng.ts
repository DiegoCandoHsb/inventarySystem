export function saveTokenToLS(token: string) {
  if (!token) return;
  localStorage.setItem("token", token);
  return "success";
}

export function removeTokenToLs() {
  localStorage.removeItem("token");
  return "token removed";
}

export function getTokenFromLs(): string | undefined {
  const token = localStorage.getItem("token");
  if (!token) return;
  return token;
}
