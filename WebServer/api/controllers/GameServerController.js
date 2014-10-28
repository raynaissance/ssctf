/**
 * GameServerController
 *
 * @description :: Server-side logic for managing Gameservers
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var availableServers = [];

module.exports = {
    alive: function (req, res, next) {
        if (req.session.User.type != User.UserType.gameServer) {
            return res.json(401, {error: "No Auth."});
        }
        return res.json(200,{});
    },
    available: function (req, res, next) {
        if (req.session.User.type != User.UserType.gameServer) {
            return res.json(401, {error: "No Auth."});
        }
        req.session.User.available = true;
        req.session.User.ip = req.ip;
        req.session.User.availableSince = new Date().getTime();

        if(_.where(availableServers, {id: req.session.User.id}).length == 0)
            availableServers.push(req.session.User);

        return res.json(200,{});
    },
    unavailable: function (req, res, next) {
        if (req.session.User.type != User.UserType.gameServer) {
            return res.json(401, {error: "No Auth."});
        }
        delete req.session.User.available;
        delete req.session.User.availableSince;
        delete req.session.User.ip;
        var toDelete = _.where(availableServers, {id: req.session.User.id});
        availableServers = _.difference(availableServers, toDelete);

        return res.json(200,{});
    },
    stats: function (req, res, next){
        if(req.session.User.available) {
            var now = new Date().getTime();
            var prev = req.session.User.availableSince;
            var upTime = (now - prev) / 1000;

            return res.json({
                available: true,
                upSince: prev.toString(),
                upTime: upTime+"s",
                ip: req.session.User.ip
            });
        } else {
            return res.json({
                available: false
            });
        }
    }

};

