process.env.NODE_ENV = 'test';


// Pull in assets from project
const mongoose = require("mongoose");
const Chat = require('../models/chat.model');
const server = require('../server');

//Require the dev-dependencies
const chai = require('chai');
const should = chai.should();
const expect = chai.expect;

// Chai plugins
chai.use(require('chai-http'));


describe('TESTING CHAT ROUTES', () => {
    
    before((done) => {
        // Clear test database  
        Chat.deleteMany({}, (err) => {
            done();
        });
    });

    after((done) => {
        Chat.deleteMany({}, (err) => {
            done();
        });
    });



    describe('/GET chats', () => {

        it('it should GET all chats but return empty because there are no chats yet', (done) => {
            chai.request(server)
                .get('/api/chat')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                    done();
                });
        })
    });



    describe('/GET chats', () => {
        let cht;

        before((done) => {
            let c = new Chat({
                'channelname': "x Cha2t name",
                'username': "the usersQEv    name",
                "msg": "a m2veqessage"
            });
            c.save((err, chat) => {
                if (err)
                    console.log(err);
                cht = chat.toObject();
                done(); // NOTE: If done is not inside save we get to "it" before save returns data
            });
        });

        it('it should GET all chats and tests there is a chat returned', (done) => {
            chai.request(server)
                .get('/api/chat/')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an('array');
                    expect(res.body[0]).to.contain.property("channelname").eql(cht.channelname);
                    expect(res.body[0]).to.contain.property("username").eql(cht.username);
                    expect(res.body[0]).to.contain.property("msg").eql(cht.msg);
                    done();
                });
        });
    });



    describe('/POST chat', () => {
        it('it should /POST a chat', (done) => {
            let c = new Chat({
                'channelname': "Chat qregname",
                'username': "Cdescptionharit ",
                'msg': "asdgioqAismln"
            });

            chai.request(server)
                .post('/api/chat')
                .send(c)
                .end((err, res) => {
                    res.should.has.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('_id');
                    res.body.should.have.property('channelname').eql(c.channelname);
                    res.body.should.have.property('username').eql(c.username);
                    res.body.should.contain.property('msg');
                    done();
                });
        });
    });



    describe('/DELETE chat by name', () => {
        let cht;

        before((done) => { 
            let c = new Chat({
                'channelname': "xyx chat name",
                'username': "vddel chat name",
                "msg": "thisgqisdv34q9"
            });
            c.save( (err, chat) => {
                if (err)
                    console.log(err);
                cht = chat.toObject();
                done();         // NOTE: If done is not inside save we get to "it" before save returns data
            });
        });

        it('Testing a /DELETE a chat by name request', (done) => {
            chai.request(server)
                .delete('/api/chat/' + cht.name)
                .send()
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property("message").eql("Chat successfully deleted");
                done();
                });
        });
    });

});