// code for handling errors asynchoronous

module.exports = (fn) => {
    return (req, res,next) => {
      console.log(req)
      fn(req, res,next).catch((err) => {
        res.status(500).json({
            message : 'Something went wrong'
        })


      });
    };
  };