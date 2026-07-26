export async function listOffers(_req, res, next) {
    try {
        res.status(200).json({ success: true, message: "Offers placeholder", data: [] });
    }
    catch (error) {
        next(error);
    }
}
