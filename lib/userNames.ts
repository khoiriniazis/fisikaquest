export const USER_NAMES_KEY = "fisikaquest-user-names";

type UserNames = Record<string, string>;

function readUserNames(): UserNames {
  try {
    const value = JSON.parse(localStorage.getItem(USER_NAMES_KEY) || "{}");
    return value && typeof value === "object" ? value as UserNames : {};
  } catch {
    return {};
  }
}

export function saveUserDisplayName(email: string, displayName: string) {
  const names = readUserNames();
  names[email] = displayName;
  localStorage.setItem(USER_NAMES_KEY, JSON.stringify(names));
}

export function getUserDisplayName(email: string) {
  const name = readUserNames()[email]?.trim();
  return name || email.split("@")[0] || "Siswa";
}
