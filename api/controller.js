const low = require("lowdb");
const uuidv1 = require('uuid/v1');

const db = low('api/db.json');

exports.getAll = function (req, res) {
    const posts = db.get("todos")
        .sortBy('createdDate')
        .reverse()
        .value();
    res.send(posts);
};

exports.getCompleted = function (req, res) {
    const posts = db.get("todos")
        .filter(function (item) {
            return !!item.completed
        })
        .sortBy('createdDate')
        .reverse()
        .value();
    res.send(posts);
};

exports.getIncompleted = function (req, res) {
    const posts = db.get("todos")
        .filter(function (item) {
            return !item.completed
        })
        .sortBy('createdDate')
        .reverse()
        .value();
    res.send(posts);
};

exports.create = function (req, res) {
    if (!req.body.text) {
        res.status(422).send("'text' field must be present in json");
    } else {
        const written = db.get('todos')
            .push({
                id: uuidv1(),
                text: req.body.text,
                completed: false,
                createdDate: new Date().getTime()
            })
            .last()
            .write();
        res.send(written);
    }
};

exports.delete = function (req, res) {
    const id = req.params.id;
    if (!id) {
        res.status(422).send("'id' must be present in params");
    } else {
        const deleted = db.get('todos')
            .remove({id: id})
            .write();
        if (deleted.length === 0) {
            res.status(404).send("id not found, nothing to delete");
        } else {
            res.send();
        }
    }
};

exports.updateText = function (req, res) {
    const text = req.body.text;
    const id = req.params.id;
    if (!text) {
        res.status(422).send("'text' field must be present in json");
    } else if (!id) {
        res.status(422).send("'id' must be present in params");
    } else {
        const written = db.get('todos')
            .find({id: id})
            .assign({ text: text})
            .last()
            .write();
        res.send(written);
    }
};

exports.complete = function (req, res) {
    const id = req.params.id;
    if (!id) {
        res.status(422).send("'id' must be present in params");
    } else {
        const completed = db.get('todos')
            .find({
                id: id,
                completed: false
            })
            .assign({
                completed: true,
                completedDate: new Date().getTime()
            })
            .write();
        if (!completed.id) {
            res.status(404).send("id not found or trying to complete already completed item");
        } else {
            res.send(completed);
        }
    }
};

exports.incomplete = function (req, res) {
    const id = req.params.id;
    if (!id) {
        res.status(422).send("'id' must be present in params");
    } else {
        const incompleted = db.get('todos')
            .find({
                id: id,
                completed: true
            })
            .assign({
                completed: false,
                completedDate: undefined
            })
            .write();
        if (!incompleted.id) {
            res.status(404).send("id not found or trying to incomplete not completed item");
        } else {
            res.send(incompleted);
        }
    }
};


