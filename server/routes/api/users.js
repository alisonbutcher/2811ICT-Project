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

    app.get('/api/user')

    // Get User via get
    app.get('/api/user', (req, res) => {
        res.send(obj.users);
    });

    // app.get('/user', function(req,res){
    //     res.sendFile(path.join(__dirname,'../client/dist/client/index.html'))
    // });

    // Add User via post
    app.post('/api/user', (req, res) => {
        
        // calculate the next ID
        let id = 1;
        if (obj.users.length > 0) {
            let maximum = Math.max.apply(Math, obj.users.map(function (f) { return f.id; }));
            id = maximum + 1;
            console.log(id);
        }
        let newUser = {"id": id, "name": req.body.name, "email": req.body.email};
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

