(function(){
    'use strict';
    module.exports = {
        appjs: {
            src: ['main-app/app/scripts/modules.js',
                'main-app/app/scripts/providers/**/*.js',
                'main-app/app/scripts/controllers.js'],
            dest: '.build/main-app/app/scripts/app.js'
        }
    };
}());