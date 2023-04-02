import { ZodError } from "zod";
import { ValidationError } from "./validation-error";

export * from "./not-found-error";
export * from "./validation-error";

export function parseError(error: unknown) {
    return { statusCode: getStatusCode(error), message: error instanceof Error ? error.message : `${error}` };
}

function getStatusCode(error: unknown): number {
    if (error instanceof ZodError) {
        return 400;
    }

    if (error instanceof Error && "statusCode" in error && typeof error.statusCode === "number") {
        return error.statusCode;
    }

    return 500;
}
