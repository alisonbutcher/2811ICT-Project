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
        console.log('new group');
        let newGroup = {"groupname": req.body.groupname};
        console.log(req.body);
        obj.groups.push(newGroup);
        res.send(newGroup);
        fs.writeFile('data/data.json', JSON.stringify(obj), 'utf8', (err) =>{
            if (err) throw err;
        })
    });

    // Update groups via put (not working because cant id which record to change... add id to groups)
    app.put('/api/group/:groupname', function (req, res) {
        console.log('update group');
        let g = obj.groups.find(x => x.groupname == groupname);
        g.groupname = req.body.groupname;
        res.send(g);
    });

    app.delete('/api/group/:groupname', function (req, res) {
        console.log('delete group');
        let groupn = req.params.groupname;
        console.log(groupn);
        // let g = students.find(x => x.id == id);
        obj.groups = obj.groups.filter(x => x.groupname != groupn);
        res.send(obj.groups);
        console.log(obj.groups);
        fs.writeFile('data/data.json', JSON.stringify(obj), 'utf8', (err) =>{
            if (err) throw err;
        })
    });


};

