const errorHandler = (err,req,res,next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    res.status(statusCode).json({
        "err" : err.message,
        "stack" : process.env.NODE_ENV === "Production" ? null : err.stack
    });
};

module.exports = {
    errorHandler,
};