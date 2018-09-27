process.env.NODE_ENV = 'test';          // This tells server to use a different http port and database


// Pull in assets from project
const mongoose = require("mongoose");
const Group = require('../models/group.model');
const server = require('../server');

//Require the dev-dependencies
const chai = require('chai');
const should = chai.should();
const expect = chai.expect;

// Chai plugins
chai.use(require('chai-http'));


describe('TESTING GROUP ROUTES', () => {
    before((done) => {
        // Clear test database  
        Group.deleteMany({}, (err) => {
            done();
        });
    });

    after((done) => {
        Group.deleteMany({}, (err) => {
            done();
        });
    });



    describe('/GET Groups', () => {

        it('it should GET all Groups but return empty because there are no Groups yet', (done) => {
            chai.request(server)
                .get('/api/group')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                    done();
                });
        })
    });



    describe('/GET Groups', () => {
        let grp;

        before((done) => {
            let g = new Group({
                'name': "x Group name",
                'description': "x Group description"
            });
            g.save((err, group) => {
                if (err)
                    console.log(err);
                grp = group.toObject();
                done(); // NOTE: If done is not inside save we get to "it" before save returns data
            });
        });

        it('it should GET all Groups and tests there is a Group returned', (done) => {
            chai.request(server)
                .get('/api/group/')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an('array');
                    expect(res.body[0]).to.contain.property("name").eql(grp.name);
                    expect(res.body[0]).to.contain.property("description").eql(grp.description);
                    expect(res.body[0]).to.contain.property('users');
                    expect(res.body[0]).to.contain.property('channels');
                    done();
                });
        });
    });



    describe('/GET Group by ID', () => { //TODO: This route is broken on the server side. Enable test when route fixed
        let grp;

        before((done) => { 
            let c = new Group({
                'name': "Group name",
                'description': "Group description",
                'users': [{'username': "a username" }],
                'channels': [{'channelname': "a channelname"}]
            });
            c.save( (err, group) => {
                if (err)
                    console.log(err);
                grp = group.toObject();
                done();         // NOTE: If done() is not inside save we get to "it" before save returns data
            });
        });

        it('it should GET a group by _id', (done) => {
            chai.request(server)
                .get('/api/group/id/' + grp._id)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an('object');
                    res.body.should.contain.property("name").eql(grp.name);
                    res.body.should.contain.property("description").eql(grp.description);
                    res.body.should.contain.property("users");
                    res.body.should.contain.property("channels");
                    done();
                });
        });
    });



    describe('/POST Group', () => {
        it('it should /POST a Group', (done) => {
            let g = new Group({
                'name': "Group werg34 narbme",
                'description': "Group descrbq3iption",
                'users': [ { username: "tyv3we"} ],
                'channels': [ { channelname: "a chan3bnel" } ]
            });

            chai.request(server)
                .post('/api/group')
                .send(g)
                .end((err, res) => {
                    res.should.has.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('_id');
                    res.body.should.have.property('name').eql(g.name);
                    res.body.should.have.property('description').eql(g.description);
                    res.body.should.contain.property('users');
                    res.body.should.contain.property('channels');
                    done();
                });
        });
    });



    describe('/POST Group', () => {
        let grp;

        before((done) => {
            let g = new Group({
                'name': "test Group name",
                'description': "test Group description"
            });
            g.save((err, group) => {
                if (err)
                    console.log(err);
                grp = group.toObject();
                done(); // NOTE: If done is not inside save we get to "it" before save returns data
            });
            // Moved done() from here
        });
       
       
        it('it should return error on /POST a Group due to Group already exists', (done) => {
            chai.request(server)
                .post('/api/group')
                .send(grp)
                .end((err, res) => {
                    res.should.has.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Group already exists');
                    done();
                });
        });
    });



    describe('/PUT Group by name', () => {
        let grp;

        before((done) => { 
            let g = new Group({
                'name': "prev Group name",
                'description': "post Group des",
                'users': [ { 'username': 'Alison' } ],
                'channels': [ { 'channelname': 'another channel' } ]
            });

            g.save( (err, group) => {
                if (err)
                    console.log(err);
                grp = group.toObject();
                done();         // NOTE: If done is not inside save we get to "it" before save returns data
            });
        });

        it('Testing a /PUT a Group request updates data', (done) => {

            // Change values before PUT request
            grp.description = "post Group description";
            grp.users = [ { username: "test" } ];
            grp.channels = [ { channelname: "test channel" } ];          

            chai.request(server)
                .put('/api/Group/' + grp.name)
                .send(grp)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('description').eql(grp.description);
                    res.body.should.have.property('users');
                    res.body.should.have.property('channels');
                done();
                });
        });
    });



    describe('/PUT Group by id', () => {
        let grp;

        before((done) => { 
            let g = new Group({
                'name': "2 Group name",
                'description': "2 Group des",
                'users': [ { 'username': 'somebody' } ],
                'channels': [ { 'channelname': 'test channel name' } ]
            });

            g.save( (err, group) => {
                if (err)
                    console.log(err);
                grp = group.toObject();
                done();         // NOTE: If done is not inside save we get to "it" before save returns data
            });
        });

        it('Testing a /PUT a Group by id request updates data', (done) => {

            // Change values before PUT request
            grp.name = "a different name";
            grp.description = "3rd Group description";
            grp.users = [ { username: "different somehow" } ];
            grp.channels = [ { channelname: "something different" } ]

            chai.request(server)
                .put('/api/group/id/' + grp._id)
                .send(grp)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('name').eql(grp.name);
                    res.body.should.have.property('description').eql(grp.description);
                    res.body.should.have.property('users');
                    res.body.should.have.property('channels');
                done();
                });
        });
    });


    describe('/DELETE Group by id', () => {
        let grp;

        before((done) => { 
            let g = new Group({
                'name': "del Group name",
                'description': "del Group name"
            });
            g.save( (err, group) => {
                if (err)
                    console.log(err);
                grp = group.toObject();
                done();         // NOTE: If done is not inside save we get to "it" before save returns data
            });
        });


        it('Testing a /DELETE a Group by id request', (done) => {
            chai.request(server)
                .delete('/api/Group/id/' + grp._id)
                .send(grp)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property("message").eql("Group successfully deleted");
                done();
                });
        });
    });



    describe('/DELETE Group by name', () => {
        let grp;

        before((done) => { 
            let g = new Group({
                'name': "xyx Group name",
                'description': "vddel Group name"
            });
            g.save( (err, group) => {
                if (err)
                    console.log(err);
                grp = group.toObject();
                done();         // NOTE: If done is not inside save we get to "it" before save returns data
            });
        });


        it('Testing a /DELETE a Group by name request', (done) => {
            chai.request(server)
                .delete('/api/group/' + grp.name)
                .send()
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property("message").eql("Group successfully deleted");
                done();
                });
        });
    });

});