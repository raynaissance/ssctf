module.exports = function(req, res, next) {
    if (req.session.User) {
        return next();
    }

    // User is not allowed
    else {
        var requireAdminError = [{name: 'requireAdminError', message: 'You must be logged in to perform this action.'}]
        req.session.flash = {
            err: requireAdminError
        }
        return res.redirect('/session/new');
    }
};
