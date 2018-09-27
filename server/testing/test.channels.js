process.env.NODE_ENV = 'test';


// Pull in assets from project
const mongoose = require("mongoose");
const Group = require('../models/group.model');
const Channel = require('../models/channel.model');
const User = require('../models/user.model');
const server = require('../server');

//Require the dev-dependencies
const chai = require('chai');
const should = chai.should();
const expect = chai.expect;

// Chai plugins
chai.use(require('chai-http'));




describe('TESTING CHANNEL ROUTES', () => {
    
    before((done) => {
        // Clear test database  
        Channel.deleteMany({}, (err) => {
            done();
        });
    });

    after((done) => {
        Channel.deleteMany({}, (err) => {
            done();
        });
    });



    describe('/GET channels', () => {

        it('it should GET all channels but return empty because there are no channels yet', (done) => {
            chai.request(server)
                .get('/api/channel')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                    done();
                });
        })
    });



    describe('/GET channels', () => {
        let chan;

        before((done) => {
            let c = new Channel({
                'name': "x Channel name",
                'description': "x Channel description"
            });
            c.save((err, channel) => {
                if (err)
                    console.log(err);
                chan = channel.toObject();
                done(); // NOTE: If done is not inside save we get to "it" before save returns data
            });
        });

        it('it should GET all channels and tests there is a channel returned', (done) => {
            chai.request(server)
                .get('/api/channel/')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an('array');
                    expect(res.body[0]).to.contain.property("name").eql(chan.name);
                    expect(res.body[0]).to.contain.property("description").eql(chan.description);
                    expect(res.body[0]).to.contain.property('users');
                    done();
                });
        });
    });

    describe('/GET channel by ID', () => { //TODO: This route is broken on the server side. Enable test when route fixed
        let chan;

        before((done) => { 
            let c = new Channel({
                'name': "ChannV34e8#$ame",
                'description': "ChannelV2yscavweription"
            });
            c.save( (err, channel) => {
                if (err)
                    console.log(err);
                chan = channel.toObject();
                done();         // NOTE: If done() is not inside save we get to "it" before save returns data
            });
        });

        it('it should GET channel by _id and tests there is a channel returned', (done) => {

            console.log(chan._id);
            chai.request(server)
                .get('/api/channel/id/' + chan._id)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an('object');
                    expect(res.body).to.contain.property("name").eql(chan.name);
                    expect(res.body).to.contain.property("description").eql(chan.description);
                    expect(res.body).to.contain.property('users');
                    expect(res.body).to.contain.property("_id");
                    done();
                });
        });
    });



    describe('/POST channel', () => {
        it('it should /POST a channel', (done) => {
            let c = new Channel({
                'name': "Channel name",
                'description': "Channel description",
                'users': [ { username: "Alison"} ]
            });

            chai.request(server)
                .post('/api/channel')
                .send(c)
                .end((err, res) => {
                    res.should.has.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('_id');
                    res.body.should.have.property('name').eql(c.name);
                    res.body.should.have.property('description').eql(c.description);
                    res.body.should.contain.property('users');
                    done();
                });
        });
    });



    describe('/POST channel', () => {
        let chan;

        before((done) => {
            let c = new Channel({
                'name': "test Channel name",
                'description': "test Channel description"
            });
            c.save((err, channel) => {
                if (err)
                    console.log(err);
                chan = channel.toObject();
                done(); // NOTE: If done is not inside save we get to "it" before save returns data
            });
            // Moved done() from here
        });
       
       
        it('it should return error on /POST a channel due to channel already exists', (done) => {

            chai.request(server)
                .post('/api/channel')
                .send(chan)
                .end((err, res) => {
                    res.should.has.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Channel already exists');
                    done();
                });
        });
    });



    describe('/PUT channel by name', () => {
        let chan;

        before((done) => { 
            let c = new Channel({
                'name': "prev channel name",
                'description': "post channel des",
                'users': [ { 'username': 'Alison' } ]
            });

            c.save( (err, channel) => {
                if (err)
                    console.log(err);
                chan = channel.toObject();
                done();         // NOTE: If done is not inside save we get to "it" before save returns data
            });
        });

        it('Testing a /PUT a channel request updates data', (done) => {

            // Change values before PUT request
            chan.description = "post channel description";
            chan.users = [ { username: "test" } ]

            chai.request(server)
                .put('/api/channel/' + chan.name)
                .send(chan)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('description').eql(chan.description);
                    res.body.should.have.property('users');
                done();
                });
        });
    });



    describe('/PUT channel by id', () => {
        let chan;

        before((done) => { 
            let c = new Channel({
                'name': "2 channel name",
                'description': "2 channel des",
                'users': [ { 'username': 'somebody' } ]
            });

            c.save( (err, channel) => {
                if (err)
                    console.log(err);
                chan = channel.toObject();
                done();         // NOTE: If done is not inside save we get to "it" before save returns data
            });
        });

        it('Testing a /PUT a channel by id request updates data', (done) => {

            // Change values before PUT request
            chan.name = "a different name";
            chan.description = "3rd channel description";
            chan.users = [ { username: "different" } ]

            chai.request(server)
                .put('/api/channel/id/' + chan._id)
                .send(chan)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('name').eql(chan.name);
                    res.body.should.have.property('description').eql(chan.description);
                    res.body.should.have.property('users');
                done();
                });
        });
    });


    describe('/DELETE channel by id', () => {
        let chan;

        before((done) => { 
            let c = new Channel({
                'name': "del channel name",
                'description': "del channel name"
            });
            c.save( (err, channel) => {
                if (err)
                    console.log(err);
                chan = channel.toObject();
                done();         // NOTE: If done is not inside save we get to "it" before save returns data
            });
        });


        it('Testing a /DELETE a channel by id request', (done) => {
            chai.request(server)
                .delete('/api/channel/id/' + chan._id)
                .send(chan)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property("message").eql("Channel successfully deleted");
                done();
                });
        });
    });



    describe('/DELETE channel by name', () => {
        let chan;

        before((done) => { 
            let c = new Channel({
                'name': "xyx channel name",
                'description': "vddel channel name"
            });
            c.save( (err, channel) => {
                if (err)
                    console.log(err);
                chan = channel.toObject();
                done();         // NOTE: If done is not inside save we get to "it" before save returns data
            });
        });


        it('Testing a /DELETE a channel by name request', (done) => {
            chai.request(server)
                .delete('/api/channel/' + chan.name)
                .send()
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property("message").eql("Channel successfully deleted");
                done();
                });
        });
    });

});