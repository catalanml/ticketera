import { Request, Response, NextFunction, RequestHandler } from 'express';
import { AnyZodObject, ZodError } from 'zod';

export const validateRequest = (schema: AnyZodObject): RequestHandler => {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            await schema.parseAsync({
                body: req.body,
                query: req.query,
                params: req.params,
            });
            next();
        } catch (error) {
            if (error instanceof ZodError) {
                // Format Zod errors for a cleaner response
                const formattedErrors = error.errors.map(err => ({
                    path: err.path.join('.'),
                    message: err.message,
                }));
                next({ status: 400, errors: formattedErrors });
            } else {
                console.error('Unexpected validation error:', error);
                next({ status: 500, error: 'Internal server error during validation' });
            }
        }
    };
};
