export class AppError extends Error {
    statusCode;
    constructor(message, statusCode = 500) {
        super(message);
        this.statusCode = statusCode;
        this.name = "AppError";
    }
}
export function errorHandler(err, _req, res, _next) {
    if (err instanceof AppError) {
        res.status(err.statusCode).json({
            success: false,
            message: err.message,
            data: null,
        });
        return;
    }
    const message = err instanceof Error ? err.message : "Unexpected error";
    res.status(500).json({
        success: false,
        message,
        data: null,
    });
}
