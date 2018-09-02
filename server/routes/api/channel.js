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

    app.get('/api/channel')

    // Get User via get
    app.get('/api/channel', (req, res) => {
        res.send(obj.channels);
    });

    // app.get('/user', function(req,res){
    //     res.sendFile(path.join(__dirname,'../client/dist/client/index.html'))
    // });

    // Add User via post
    app.post('/api/channel', (req, res) => {
        
        // calculate the next ID
        let id = 1;
        if (obj.channels.length > 0) {
            let maximum = Math.max.apply(Math, obj.channels.map(function (f) { return f.id; }));
            id = maximum + 1;
            console.log(id);
        }
        let newChannel = {"id": id, "name": req.body.name, "description": req.body.description};
        obj.channels.push(newChannel);
        res.send(newChannel);
        fs.writeFile('data/data.json', JSON.stringify(obj), 'utf8', (err) =>{
            if (err) throw err;
        })
    });

    app.put('/api/group/:groupname', function (req, res) {
        console.log('update channel');
        let g = obj.groups.find(x => x.groupname == groupname);
        g.groupname = req.body.groupname;
        res.send(g);
    });

    app.put('/api/channel/:id', function (req, res) {
        let chid = req.params.id;
        let channel = obj.channels.find(x => x.id == chid);
        if (channel != null) {
            obj.channels = obj.channels.filter(x => x.id != chid)
            channel.id = req.params.id;
            channel.name = req.body.name;
            channel.description = req.body.description;
            obj.channels.push(channel);
            console.log("channel.js sending this data to file" + obj.channels);
            res.send(channel);
            fs.writeFile('data/data.json', JSON.stringify(obj), 'utf8', (err) => {
                if (err) throw err;
            })
        } else {
            // return not found
            res.send("Channel Not Found");
        }
    });

    app.delete('/api/channel/:channelname', function (req, res) {
        console.log('delete user');
        let chan = req.params.channelname;
        console.log(chan);
        // let g = students.find(x => x.id == id);
        obj.channels = obj.channels.filter(x => x.name != chan);
        res.send(obj.channels);
        console.log(obj.channels);
        fs.writeFile('data/data.json', JSON.stringify(obj), 'utf8', (err) =>{
            if (err) throw err;
        })
    });
};

