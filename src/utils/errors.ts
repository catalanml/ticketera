export class BaseError extends Error {
    public readonly statusCode: number;

    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
        Object.setPrototypeOf(this, new.target.prototype); // Restore prototype chain
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}

export class NotFoundError extends BaseError {
    constructor(message: string = 'Resource not found') {
        super(message, 404);
    }
}

export class BadRequestError extends BaseError {
    constructor(message: string = 'Bad request') {
        super(message, 400);
    }
}

export class UnauthorizedError extends BaseError {
    constructor(message: string = 'Unauthorized') {
        super(message, 401);
    }
}

export class ForbiddenError extends BaseError {
    constructor(message: string = 'Forbidden') {
        super(message, 403);
    }
}

// Add other custom error classes as needed (e.g., InternalServerError)
