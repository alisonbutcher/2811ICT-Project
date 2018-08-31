module.exports = (app, fs) => {
    // returns a list of all users
    app.get('/api/users', (req, res) => {
        fs.readFile('data/data.json', 'utf-8', (err, data) => {
            if (err) {
                console.log(err);
            } else {
                userObj = JSON.parse(data);
                res.send(userObj.users);
            }
        })
    })
};

