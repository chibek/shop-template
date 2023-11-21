import {
  object,
  string,
  email,
  minLength,
  maxLength,
  regex,
  custom,
  enum_,
  optional,
  nullable,
} from "valibot";

const ROLES = {
  USER: "user",
  ADMIN: "admin",
  SUPER_ADMIN: "super_admin",
} as const;

export const authSchema = object({
  email: string([email("Please enter a valid email address")]),
  password: string([minLength(1, "Field is required")])
});

export const signUpSchema = object({
  firstName: string(),
  lastName: string(),
  ...authSchema.entries,
  password: string([
    minLength(8, "Password must be at least 8 characters long"),
    maxLength(100),
    regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
      "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character"
    ),
  ])
});

export const verifyEmailSchema = object({
  code: string([
    minLength(6, "Verification code must be 6 characters long"),
    maxLength(6),
  ]),
});

export const checkEmailSchema = object({
  email: authSchema.entries.email,
});

export const resetPasswordSchema = object(
  {
    password: authSchema.entries.password,
    confirmPassword: authSchema.entries.password,
    code: verifyEmailSchema.entries.code,
  },
  [
    custom(
      ({ password, confirmPassword }) => password === confirmPassword,
      "The passwords do not match."
    ),
  ]
);

export const userPrivateMetadataSchema = object({
  role: enum_(ROLES),
  stripePriceId: optional(nullable(string())),
  stripeSubscriptionId: optional(nullable(string())),
  stripeCustomerId: optional(nullable(string())),
  stripeCurrentPeriodEnd: optional(nullable(string())),
});
