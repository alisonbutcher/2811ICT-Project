module.exports = (app, port) => {
    app.listen(port);
    console.log("Listening on port " + port);
};