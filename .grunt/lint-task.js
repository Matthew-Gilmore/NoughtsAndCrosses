(function(){
    'use strict';

    module.exports = {
        grunt:{
            src: ['gruntfile.js', './.grunt/*.js'],
            options: {
                node: true
            }
        },
        app:{
            src: ['./main-app/app/scripts/**/*.js'],
            options: {
                browser: true
            }
        },
        express:{}
    };
}());
