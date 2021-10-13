module.exports = function errorMiddleware(err, _req, res, _next) {
    if (err.code && err.status) {
        return res.status(err.status).json({
            message: err.message,
            code: err.code,
        });
    }

    if (err.status) {
        return res.status(err.status).json({
            message: err.message,
        });
    }

    return res.status(500).json({ message: err.message });
};