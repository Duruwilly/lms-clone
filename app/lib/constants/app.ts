export namespace LocalStorageKeys {
  export const auth_token = "@auth_token";
  export const refresh_token = "@refresh_token";
}

export const Year = new Date().getFullYear();

export const roleMapping: Record<string, string> = {
  lecturer: "LECTURER_ROUTES",
  admin: "ADMIN_ROUTES",
  student: "STUDENTS_ROUTES",
} as const;
