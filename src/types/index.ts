import { type Output } from "valibot"
import { type userPrivateMetadataSchema } from "@/lib/validations/auth"

export type UserRole = Output<typeof userPrivateMetadataSchema.entries.role>
