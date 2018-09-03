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

    // app.get('/api/channel')

    // Get User via get
    app.get('/api/channel', (req, res) => {
        res.send(obj.channels);
    });

    // Returns a list of users associated with a given channel id
    app.get('/api/channel-users/:id', (req,res) => {
        let users = [];
        let uids = obj.channelUsers.filter(x => x.channelid == req.params.id);
        if (uids != null) {
            for (index in uids) {
                let pid = uids[index].userid;
                users.push(obj.users.find(x => x.id == pid));
            }
            res.send(users);
        } else {
            res.send("user not found in channel");
        }
    });
    
    // Returns a list of users not associated with a given channel id
    app.get('/api/channel-not-users/:id', (req,res) => {
        let users = [];
        let userlist = obj.users;
        let uids = obj.channelUsers.filter(x => x.channelid == req.params.id);
        if (uids != null) {
            for (index in uids) {
                let pid = uids[index].userid;
                userlist = userlist.filter(x => x.id != pid);
            }
            res.send(userlist);
        } else {
            res.send("user not found in channel");
        }
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

    app.delete('/api/channel/:id', function (req, res) {
        obj.channels = obj.channels.filter(x => x.id != req.params.id);
        res.send(obj.channels);
        fs.writeFile('data/data.json', JSON.stringify(obj), 'utf8', (err) =>{
            if (err) throw err;
        })
    });
};

