(function(){
    'use strict';

    module.exports = {
        html:['.build/main-app/**/app/*.html'],
        bower:['.build/main-app/thirdparty'],
        appjs:['.build/main-app/app/scripts/*.js'],
        less:['.build/main-app/app/css/*.*'],
        clean: ['.build']
    };
}());