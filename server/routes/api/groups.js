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
        let newGroup = {"id": id, "name": req.body.name};
        console.log(req.body);
        obj.groups.push(newGroup);
        res.send(newGroup);
        fs.writeFile('data/data.json', JSON.stringify(obj), 'utf8', (err) =>{
            if (err) throw err;
        })
    });

    // Update groups via put (not working because cant id which record to change... add id to groups)
    app.put('/api/group/:groupid', function (req, res) {
        console.log('update group');
        let g = obj.groups.find(x => x.id == groupid);
        g.groupid = req.body.groupid;
        res.send(g);
    });

    app.delete('/api/group/:groupid', function (req, res) {
        console.log('delete group');
        let groupid = req.params.groupid;
        console.log(groupid);
        // let g = students.find(x => x.id == id);
        obj.groups = obj.groups.filter(x => x.id != groupid);
        res.send(obj.groups);
        console.log(obj.groups);
        fs.writeFile('data/data.json', JSON.stringify(obj), 'utf8', (err) =>{
            if (err) throw err;
        })
    });


};

