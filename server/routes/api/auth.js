module.exports = function(app,fs) {
    app.get('/api/auth', (req, res) => {
        let uname = req.query.username;
        let userObj;

        fs.readFile('data.json', 'utf-8', (err, data) => {
            if (err) {
                console.log(err);
                res.send({'username': '', 'success': false});
            } else {
                userObj = JSON.parse(data);
                for (let i = 0; i < userObj.length; i++) {
                    if (userObj[i].name == uname) {
                        // Found a user
                        res.send({'username': uname, 'success': true});
                        return;
                    }
                }
                // No matching username found
                res.send({'username': uname, 'success': false});
            }
        })
    });
};