'use strict';
var mongoose = require('mongoose'),
    Group = mongoose.model('Group');

exports.list_all_groups = (req, res) => {
    Group.find({}, function (err, group) {
        if (err)
            res.send(err);
        res.json(group);
    });
};

exports.create_a_group = (req, res) => {
    // Build Query to check if already exists
    let query = JSON.parse('{"name": "' + req.body.name + '"}');
    // Perform  Query 
    Group.find(query, 'name description users[]', function (err, group) {

        // If there is data the channel name already exists
        if (group.length > 0) {
            res.json({
                message: "Group already exists"
            });
        } else {
            var new_group = new Group(req.body);
            new_group.save(function (err, group) {
                if (err)
                    res.send(err);
                res.json(group);
            });
        }
    });
}


exports.read_a_group_byid = (req, res) => {
    Group.findById(req.params._id, function (err, group) {
        if (err)
            res.send(err);
        res.json(group);
    });
};



exports.read_a_group_byname = (req, res) => {
    Group = mongoose.model('Group');
    // Build Query
    let query = JSON.parse('{"name": "' + req.params.name + '"}');

    // Perform user Query 
    Group.find(query, 'name description users[]', function (err, group) {
        if (err)
            res.send(err);

        // If there is data return
        if (group.length > 0) {
            res.json(group)
        } else {
            res.json({
                message: 'No group found with that name'
            });
        }
    });
}

exports.update_a_group_byname = (req, res) => {
    Group.findOneAndUpdate({
        name: req.params.name
    }, req.body, {
        new: true
    }, function (err, group) {
        if (err)
            res.send(err);
        res.json(group);
    });
};

exports.update_a_group_byid = (req, res) => {
    Group.findOneAndUpdate({
        _id: req.params._id
    }, req.body, {
        new: true
    }, function (err, group) {
        if (err)
            res.send(err);
        res.json(group);
    });
};

exports.delete_a_group_byname = (req, res) => {
    Group.deleteOne({
        name: req.params.name
    }, function (err, group) {
        if (err)
            res.send(err);
        res.json({
            message: 'Group successfully deleted'
        });
    });
};

exports.delete_a_group_byid = (req, res) => {
    Group.deleteOne({
        _id: req.params._id
    }, function (err, group) {
        if (err)
            res.send(err);
        res.json({
            message: 'Group successfully deleted'
        });
    });
};