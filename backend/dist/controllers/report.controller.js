export async function getReports(_req, res, next) {
    try {
        res.status(200).json({ success: true, message: "Reports placeholder", data: [] });
    }
    catch (error) {
        next(error);
    }
}
