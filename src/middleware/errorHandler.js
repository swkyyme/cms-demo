module.exports = ( err,req, res, next) => {
    console.log(err);
    if (err.name === 'ValidationError') {
        return res.status(400).json(err.message);
    } else {
        return res.status(500).json('something unexpected happened');    
    }
};