process.env.NODE_ENV = 'test';


// Pull in assets from project
const mongoose = require("mongoose");
const Group = require('../../models/group.model');
const Channel = require('../../models/channel.model');
const User = require('../../models/user.model');
const server = require('../../server');

//Require the dev-dependencies
const chai = require('chai');
const should = chai.should();
const expect = chai.expect;

// Chai plugins
chai.use(require('chai-http'));
chai.use(require('chai-like'));
chai.use(require('chai-things'));
chai.use(require('chai-json-schema-ajv'))
chai.use(require('chai-subset'));


describe('Testing Channel Routes', () => {
    before((done) => {
        // Clear test database  
        Channel.deleteMany({}, (err) => {
            done();
        });
    });

    // after((done) => {
    //     Channel.deleteMany({}, (err) => {
    //         done();
    //     });
    // });



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
                'name': "Channel name",
                'description': "Channel description"
            });
            c.save((err, channel) => {
                if (err)
                    console.log(err);
                chan = channel.toObject();
                done(); // NOTE: If done is not inside save we get to "it" before save returns data
            });
            // Moved done() from here
        });

        it('it should GET all channels and tests there is a channel returned', (done) => {
            chai.request(server)
                .get('/api/channel/')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an('array');
                    expect(res.body[0]).to.contain.property("name").eql('Channel name');
                    expect(res.body[0]).to.contain.property("description").eql("Channel description");
                    expect(res.body[0]).to.contain.property('users');
                    done();
                });
        });
    });

    describe('/GET channel by ID', () => { //TODO: This route is broken on the server side. Enable test when route fixed
        let chan;

        // before((done) => { 
        //     let c = new Channel({
        //         'name': "Channel name",
        //         'description': "Channel description"
        //     });
        //     c.save( (err, channel) => {
        //         if (err)
        //             console.log(err);
        //         chan = channel.toObject();
        //         done();         // NOTE: If done() is not inside save we get to "it" before save returns data
        //     });
        // });

        // it('it should GET all channels and tests there is a channel returned', (done) => {

        //     console.log(chan._id);
        //     chai.request(server)
        //         .get('/api/channel/id/' + chan._id)
        //         .end((err, res) => {
        //             console.log(res.body);
        //             res.should.have.status(200);
        //             res.body.should.be.an('array');
        //             expect(res.body[0]).to.contain.property("name").eql('Channel name');
        //             expect(res.body[0]).to.contain.property("description").eql("Channel description");
        //             expect(res.body[0]).to.contain.property('users');
        //             expect(res.body[0]).to.contain.property("_id");
        //             done();
        //         });
        // });



        describe('/POST channel', () => {
            it('it should /POST a channel', (done) => {
                let channel = {
                    name: "POST a test channel name",
                    description: "POST a test channel description",
                    users: [{
                        username: "test username"
                    }]
                }

                chai.request(server)
                    .post('/channel')
                    .send(channel)
                    .end((err, res) => {
                        res.should.has.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('_id');
                        res.body.should.have.property('name').eql(product.name);
                        res.body.should.have.property('description').eql(product.description);
                        res.body.should.contain.property('users');
                        done();
                    });
            });
        });
    });



    describe('/POST channel', () => {
        it('it should /POST a channel', (done) => {
            let channel = {
                name: "POST a test channel name",
                description: "POST a test channel description",
                users: [{
                    username: "test username"
                }]
            }

            chai.request(server)
                .post('/channel')
                .send(channel)
                .end((err, res) => {
                    res.should.has.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('_id');
                    res.body.should.have.property('name').eql(product.name);
                    res.body.should.have.property('description').eql(product.description);
                    res.body.should.contain.property('users');
                    done();
                });
        });
    });
});