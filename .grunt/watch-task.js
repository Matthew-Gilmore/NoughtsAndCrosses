(function(){
    'use strict';

    module.exports = {
        html: {
            files: ['./main-app/**/app/*.html'],
            tasks: ['clean:html', 'copy:html']
        },

        less:{
            files: ['./main-app/**/app/less/*.less'],
            tasks: ['deployless']
        },

        appjs:{
            files: ['./main-app/**/app/scripts/**/*.js'],
            tasks: ['clean:appjs', 'concat:appjs']
        },

        gruntjs: {
            files: ['./gruntfile.js', './.grunt/*.js'],
            tasks: ['jshint:gruntfiles', 'nostart']
        }
    };
}());
