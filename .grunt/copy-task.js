(function(){
    'use strict';

    module.exports = {
            html:{
                cwd:'',
                    src: ['main-app/**/app/*.html'],
                    dest: '.build/',
                    expand: true
            },
            bowerComponents:{
                cwd:'bower_components',
                    src: ['**/*.*'],
                    dest: '.build/main-app/thirdparty',
                    expand: true
            },
            resources:{},
            views:{},
            images:{}
        };
}());
