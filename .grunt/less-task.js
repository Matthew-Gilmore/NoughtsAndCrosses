(function(){
    'use strict';

    module.exports = {
        options: {
            compress: true,
            csslint : {
                'unique-headings': false,
                'box-sizing': false,
                'compatible-vendor-prefixes': false,
                'overqualified-elements': false,
                'unqualified-attributes': false,
                'important':false,
                'adjoining-classes':false,
            }
        },
        src : {
            expand:true,
            cwd:'main-app/app/less',
            dest:'.build/main-app/app/css',
            src:'app.less',
            ext:'.min.css'
        }
    };
}());