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


    // Get Groups via get
    app.get('/api/group', (req, res) => {
        res.send(obj.groups);
    });

    // Add group via post
    app.post('/api/group', (req, res) => {
        // calculate the next ID
        let id = 1;
        if (obj.groups.length > 0) {
            let maximum = Math.max.apply(Math, obj.groups.map(function (f) { return f.id; }));
            id = maximum + 1;
        }
        let newGroup = {"id": id, "name": req.body.name, "description": req.body.description};
        console.log(req.body);
        obj.groups.push(newGroup);
        res.send(newGroup);
        fs.writeFile('data/data.json', JSON.stringify(obj), 'utf8', (err) =>{
            if (err) throw err;
        })
    });

    // Update groups via put 
    app.put('/api/group/:id', function (req, res) {
        let gid = req.params.id;
        let group = obj.groups.find(x => x.id == gid);
        if (group != null) {
            obj.groups = obj.groups.filter(x => x.id != gid)
            group.id = req.params.id;
            group.name = req.body.name;
            group.description = req.body.description;
            obj.groups.push(group);
            console.log("groups.js sending this data to file" + obj.groups);
            res.send(group);
            fs.writeFile('data/data.json', JSON.stringify(obj), 'utf8', (err) => {
                if (err) throw err;
            })
        } else {
            // return not found
            res.send("Group Not Found");
        }
    });

    app.delete('/api/group/:id', function (req, res) {
        obj.groups = obj.groups.filter(x => x.id != req.params.id);
        res.send(obj.groups);
        fs.writeFile('data/data.json', JSON.stringify(obj), 'utf8', (err) =>{
            if (err) throw err;
        })
    });


};

