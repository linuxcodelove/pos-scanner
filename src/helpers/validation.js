export const rules = {
  required: (v) => !!v || "This field is required",
  email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || "Enter a valid email",
  password: (v) =>
    /^(?=.*?[a-z])(?=.*?[0-9]).{8,}$/.test(v) || "Enter a valid password",
};
