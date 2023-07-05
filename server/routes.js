module.exports = function (app) {
    /*
     * Routes
     */
    app.use('/insights', require('./routes/insights'));
  };
  