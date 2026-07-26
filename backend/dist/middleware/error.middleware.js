import { errorHandler } from "../utils/error-handler.js";
export function notFoundHandler(req, res, next) {
    res.status(404).json({
        success: false,
        message: `Route not found: ${req.method} ${req.originalUrl}`,
        data: null,
    });
    next();
}
export function globalErrorHandler(err, req, res, next) {
    errorHandler(err, req, res, next);
}
