// code for handling errors asynchoronous

module.exports = (fn) => {
    return (req, res,next) => {
      fn(req, res,next).catch((err) => {
        res.status(500).json({
            message : 'Something went wrong'
        })


      });
    };
  };