/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
    'new': function (req, res, next) {
        if(req.session.User){
            return res.redirect("/user/show");
        }
        res.view();
    },
    create: function (req, res, next) {
        if(req.session.User){
            return res.redirect("/user/show");
        }
        var userObj = {
            name: req.param('name'),
            email: req.param('email'),
            passwordHash: req.param('password')
        }

        User.create(userObj, function userCreated(err, user) {
            if (err) {
                console.log(err);
                req.session.flash = {
                    err: err
                }
                return res.redirect('/user/new');
            }

            req.session.authenticated = true;
            req.session.User = user;
            res.redirect('/user/show/' + user.id);
        });
    },
    show: function (req, res, next) {
        User.findOne(req.session.User.id, function foundUser(err, user) {
            if (err) return next(err);
            if (!user) return next();
            res.view({
                user: user.toJSON()
            });
        });
    },
    index: function (req, res, next) {
        User.find(function foundUsers(err, users) {
            if (err) return next(err);
            res.view({
                users: users
            });
        });
    },
    edit: function (req, res, next) {
        var id = req.param('id');
        if(!id || id=="" || req.session.User.type != User.UserType.admin){
            id = req.session.User.id;
        }
        User.findOne(id, function foundUser(err, user) {
            if (err) return next(err);
            if (!user) return next('User doesn\'t exist.');
            res.view({
                user: user
            });
        });
    },
    update: function (req, res, next) {
        var userObj = {
            name: req.param('name'),
            email: req.param('email'),
            passwordHash: req.param('password')
        }
        if(!userObj.passwordHash) delete userObj.passwordHash;
        if(!userObj.name) delete userObj.name;
        if(!userObj.email) delete userObj.email;

        var id = req.param('id');
        if(!id || id=="" || req.session.User.type != User.UserType.admin){
            id = req.session.User.id;
        }
        User.update(id, userObj, function userUpdated(err) {
            if (err) {
                return res.redirect('/user/edit/' + req.param('id'));
            }
            res.redirect('/user/show');
        });
    },
    destroy: function (req, res, next) {
        User.findOne(req.param("id"), function foundUser(err, user) {
            if (err) return next(err);
            if (!user) return next('User doesn\'t exist.');
            User.destroy(req.param('id'), function userDestroyed(err) {
                if (err) return next(err);
            });
            res.redirect('/user');
        });
    }
};