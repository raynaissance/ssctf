module.exports = function(req, res, next) {
    if (req.session.User && req.session.User.type==User.UserType.admin) {
        return next();
    }

    // User is not allowed
    else {
        var requireAdminError = [{name: 'requireAdminError', message: 'You must be logged in as admin.'}]
        req.session.flash = {
            err: requireAdminError
        }
        if(req.session.User) {
            return res.redirect('/user/show');
        }
    }
};
