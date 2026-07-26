import { AppError } from "../utils/error-handler.js";
export function validateBody(requiredFields) {
    return (req, _res, next) => {
        const body = req.body ?? {};
        const missing = requiredFields.filter((field) => !body[field]);
        if (missing.length > 0) {
            next(new AppError(`Missing required fields: ${missing.join(", ")}`, 400));
            return;
        }
        next();
    };
}
export function validateFile(req, _res, next) {
    if (!req.file) {
        next(new AppError("A file upload is required", 400));
        return;
    }
    next();
}
