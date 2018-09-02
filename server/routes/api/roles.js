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

    app.get('/api/roles')

    // Get User via get
    app.get('/api/roles', (req, res) => {
        res.send(obj.roles);
    });

    // app.get('/user', function(req,res){
    //     console.log(path.join(__dirname__, '../../../client/dist/client/index.html'));
    //     res.sendFile(path.join(__dirname, '../../../client/dist/client/index.html'))
    // });

    // Add User via post
    app.post('/api/roles', (req, res) => {
        
        // calculate the next ID
        let id = 1;
        if (obj.roles.length > 0) {
            let maximum = Math.max.apply(Math, obj.roles.map(function (f) { return f.id; }));
            id = maximum + 1;
            console.log(id);
        }
        let newRole = {"id": id, "name": req.body.name, "description": req.body.description};
        obj.roles.push(newRole);
        res.send(newRole);
        fs.writeFile('data/data.json', JSON.stringify(obj), 'utf8', (err) =>{
            if (err) throw err;
        })
    });

    // Update groups via put 
    app.put('/api/roles/:id', function (req, res) {
        let rid = req.params.id;
        let role = obj.roles.find(x => x.id == rid);
        if (role != null) {
            obj.roles = obj.roles.filter(x => x.id != rid)
            role.id = req.params.id;
            role.name = req.body.name;
            role.description = req.body.description;
            obj.roles.push(role);
            console.log("roles.js sending this data to file" + obj.roles);
            res.send(role);
            fs.writeFile('data/data.json', JSON.stringify(obj), 'utf8', (err) => {
                if (err) throw err;
            })
        } else {
            // return not found
            res.send("Role Not Found");
        }
    });

    app.delete('/api/roles/:id', function (req, res) {
        obj.roles = obj.roles.filter(x => x.id != req.params.id);
        res.send(obj.roles);
        fs.writeFile('data/data.json', JSON.stringify(obj), 'utf8', (err) =>{
            if (err) throw err;
        })
    });


};