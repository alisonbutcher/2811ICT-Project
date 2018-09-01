module.exports = (app, fs) => {
    let obj;
    // returns an object of database
    fs.readFile('data/data.json', 'utf-8', (err, data) => {
        if (err) {
            console.log(err);
        } else {
            obj = JSON.parse(data);
        }
    });
    // Get User via get
    app.get('/api/user', (req, res) => {
        res.send(obj.users);
    });

    // Add User via post
    app.post('/api/user', (req, res) => {
        console.log('New User');
        let newUser = {"name": req.body.name};
        console.log(req.body.name);
        obj.users.push(newUser);
        res.send(newUser);
        fs.writeFile('data/data.json', JSON.stringify(obj), 'utf8', (err) =>{
            if (err) throw err;
        })
    });

    // Update groups via put (not working because cant id which record to change... add id to groups)
    // app.put('/api/group/:groupname', function (req, res) {
    //     console.log('update group');
    //     let g = obj.groups.find(x => x.groupname == groupname);
    //     g.groupname = req.body.groupname;
    //     res.send(g);
    // });

    app.delete('/api/user/:username', function (req, res) {
        console.log('delete user');
        let usern = req.params.username;
        console.log(usern);
        // let g = students.find(x => x.id == id);
        obj.users = obj.users.filter(x => x.name != usern);
        res.send(obj.users);
        console.log(obj.users);
        fs.writeFile('data/data.json', JSON.stringify(obj), 'utf8', (err) =>{
            if (err) throw err;
        })
    });


};

