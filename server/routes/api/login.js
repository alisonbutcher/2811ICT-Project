module.exports = (app, fs) => {
    let obj;

    // returns a list of all users
    fs.readFile('data/data.json', 'utf-8', (err, data) => {
        if (err) {
            console.log(err);
        } else {
            obj = JSON.parse(data);
        }
    });

    app.get('/api/login/:name', (req, res) => {
        const requestedUser = req.params['name'];
        let str;

        for (let i = 0; i < obj.users.length; i++) {
            if (obj.users[i].name == requestedUser){
                str = obj.users[i];
            } else {
                str = null;
            }
            res.send(str);
        }
    });
};