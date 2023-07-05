class ErrorHandler {
  handleQueryError(err, res) {
    console.log(err);
    return res.status(500).json({
      error: err.toString(),
    });
  }
}

module.exports = ErrorHandler;
