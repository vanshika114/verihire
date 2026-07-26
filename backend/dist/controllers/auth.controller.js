export async function login(_req, res, next) {
    try {
        res.status(200).json({ success: true, message: "Login placeholder", data: { authenticated: true } });
    }
    catch (error) {
        next(error);
    }
}
export async function signup(_req, res, next) {
    try {
        res.status(200).json({ success: true, message: "Signup placeholder", data: { created: true } });
    }
    catch (error) {
        next(error);
    }
}
