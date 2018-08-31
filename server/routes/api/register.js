module.exports = (app, fs) => {

    app.get('/api/reg', (req, res) => {

        let isUser = 0;
        let userObj;

        let uname = req.query.username;

        fs.readFile('data.json', 'utf-8', (err, data) => {
            if (err) {
                console.log(err);
            } else {
                userObj = JSON.parse(data);
                for (let i = 0; i < userObj.length; i++) {
                    console.log(userObj);
                    if (userObj[i].name == uname) {
                        isUser = 1;
                    }
                }
            }
            if (isUser > 0) {
                // User already exists
                res.send({'username': '', 'success': false});
            } else {
                // Add User
                userObj.push({'name':uname});
                let newdata = JSON.stringify(userObj);
                console.log(newdata);
                fs.writeFile('data.json', newdata, 'utf-8', (err) => {
                    if (err) throw err;
                    res.send("test");

                })
            }
        })
    })
};