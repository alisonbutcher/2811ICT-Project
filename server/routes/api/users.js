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
    //     console.log(path.join(__dirname__, '../../../client/dist/client/index.html'));
    //     res.sendFile(path.join(__dirname, '../../../client/dist/client/index.html'))
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

    // Update groups via put 
    app.put('/api/user/:id', function (req, res) {
        let uid = req.params.id;
        let user = obj.users.find(x => x.id == uid);
        if (user != null) {
            obj.users = obj.users.filter(x => x.id != uid)
            user.id = req.params.id;
            user.name = req.body.name;
            user.email = req.body.email;
            obj.users.push(user);
            console.log("users.js sending this data to file" + obj.users);
            res.send(user);
            fs.writeFile('data/data.json', JSON.stringify(obj), 'utf8', (err) => {
                if (err) throw err;
            })
        } else {
            // return not found
            res.send("User Not Found");
        }
    });

    app.delete('/api/user/:id', function (req, res) {
        obj.users = obj.users.filter(x => x.id != req.params.id);
        res.send(obj.users);
        fs.writeFile('data/data.json', JSON.stringify(obj), 'utf8', (err) =>{
            if (err) throw err;
        })
    });


};

