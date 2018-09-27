process.env.NODE_ENV = 'test';

// Pull in assets from project
const mongoose = require("mongoose");
const User = require('../models/user.model');
const server = require('../server');

//Require the dev-dependencies
const chai = require('chai');

const expect = chai.expect;
const should = chai.should();

// Chai plugins
chai.use(require('chai-http'));



describe('TESTING USER ROUTES', () => {
    before((done) => {
        // Clear test database  
        User.deleteMany({}, (err) => {
            done();
        });
    });

    after((done) => {
        User.deleteMany({}, (err) => {
            done();
        });
    });



    describe('/GET users', () => {

        it('it should GET all users but return empty because there are no users yet', (done) => {
            chai.request(server)
                .get('/api/user/')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                    done();
                });
        })
    });



    describe('/GET users', () => {
        let usr;

        before((done) => {
            let c = new User({
                'name': "x User name",
                'password': "A Password",
                'role': "Super Admin"
            });
            c.save((err, user) => {
                if (err)
                    console.log(err);
                usr = user.toObject();
                done(); // NOTE: If done is not inside save we get to "it" before save returns data
            });
            // Moved done() from here
        });

        it('it should GET all users and tests there is a user returned', (done) => {
            chai.request(server)
                .get('/api/user/')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an('array');
                    expect(res.body[0]).to.contain.property("name").eql(usr.name);
                    expect(res.body[0]).to.contain.property("password").eql(usr.password);
                    expect(res.body[0]).to.contain.property("role").eql(usr.role);
                    done();
                });
        });
    });

    describe('/GET user by ID', () => { //TODO: This route is broken on the server side. Enable test when route fixed
        let usr;

        before((done) => { 
            let c = new User({
                'name': "User name",
                'password': "A passwrd",
                'role': "Super Admin"
            });
            c.save( (err, user) => {
                if (err)
                    console.log(err);
                usr = user.toObject();
                done();         // NOTE: If done() is not inside save we get to "it" before save returns data
            });
        });

        it('it should GET a user by _id', (done) => {

            console.log(usr._id);
            chai.request(server)
                .get('/api/user/' + usr._id)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an('object');
                    expect(res.body).to.contain.property("name").eql(usr.name);
                    expect(res.body).to.contain.property("role").eql(usr.role);
                    expect(res.body).to.contain.property("password").eql(usr.password);
                    done();
                });
        });
    });



    describe('/POST user', () => {
        it('it should /POST a user', (done) => {
            let u = new User({
                'name': "User nfaame",
                'role': "Super Adawemin",
                'password': "A pwdg"
            });

            chai.request(server)
                .post('/api/user')
                .send(u)
                .end((err, res) => {
                    res.should.has.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('_id');
                    res.body.should.have.property('name').eql(u.name);
                    res.body.should.have.property('role').eql(u.role);
                    res.body.should.have.property('password').eql(u.password);
                    done();
                });
        });
    });



    describe('/POST user', () => {
        let usr;

        before((done) => {
            let u = new User({
                'name': "test User name",
                'password': "password",
                'role': "Super Admin"
            });
            u.save((err, user) => {
                if (err)
                    console.log(err);
                usr = user.toObject();
                done(); // NOTE: If done is not inside save we get to "it" before save returns data
            });
            // Moved done() from here
        });
       
       
        it('it should return error on /POST a user due to user already exists', (done) => {

            chai.request(server)
                .post('/api/user')
                .send(usr)
                .end((err, res) => {
                    res.should.has.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('User already exists');
                    done();
                });
        });
    });



    describe('/PUT user by name', () => {
        let usr;

        before((done) => { 
            let u = new User({
                'name': "prev user name",
                'password': "password",
                'role': "Super Admin"
            });

            u.save( (err, user) => {
                if (err)
                    console.log(err);
                usr = user.toObject();
                done();         // NOTE: If done is not inside save we get to "it" before save returns data
            });
        });

        it('Testing a /PUT a user request updates data', (done) => {

            // Change values before PUT request
            usr.description = "post user description";
            usr.role = "Group Admin";
            usr.name = "a different name";

            chai.request(server)
                .put('/api/user/' + usr._id)
                .send(usr)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('name').eql(usr.name);
                    res.body.should.have.property('role').eql(usr.role);
                    res.body.should.have.property('password').eql(usr.password);
                done();
                });
        });
    });



    describe('/PUT user by id', () => {
        let usr;

        before((done) => { 
            let c = new User({
                'name': "2 user name",
                'password': 'pwd',
                'role': "Super Admin",
            });

            c.save( (err, user) => {
                if (err)
                    console.log(err);
                usr = user.toObject();
                done();         // NOTE: If done is not inside save we get to "it" before save returns data
            });
        });

        it('Testing a /PUT a user by id request updates data', (done) => {

            // Change values before PUT request
            usr.name = "a different name";
            usr.password = "3rd user pwd";
            usr.role = "some other role";

            chai.request(server)
                .put('/api/user/' + usr._id)
                .send(usr)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('name').eql(usr.name);
                    res.body.should.have.property('role').eql(usr.role);
                    res.body.should.have.property('password').eql(usr.password);
                done();
                });
        });
    });


    describe('/DELETE user by id', () => {
        let usr;

        before((done) => { 
            let u = new User({
                'name': "del user name",
                'password': "a password",
                'role': "a role"
            });
            u.save( (err, user) => {
                if (err)
                    console.log(err);
                usr = user.toObject();
                done();         // NOTE: If done is not inside save we get to "it" before save returns data
            });
        });


        it('Testing a /DELETE a user by id request', (done) => {
            chai.request(server)
                .delete('/api/user/' + usr._id)
                .send(usr)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property("message").eql("User successfully deleted");
                done();
                });
        });
    });

});