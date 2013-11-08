module.exports = function (grunt) {
    grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // define source files and their destinations
    uglify: 
    {
        options: {
            mangle: true,
            compress: true,
            banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                    '<%= grunt.template.today("yyyy-mm-dd") %> */'
        },
        js: {
            files: {
                'static/js/scl.min.js': 
                    [
                        'lib/client/js/*'
                    ]
            }
        }
        
    },

   jshint: {
       server: {
         src: ['lib/server/js/*'],
         options: { 
            node: true
         }
       },
       client: {
         src: ['lib/client/js/*'],
         options: { 
            globalstrict: true 
        }
       }
     },
    watch: {
        client:  { files: ['lib/client/js/*.js', 'lib/server/js/*.js' ], tasks: [ 'jshint', 'uglify'] },
    }
});

// load plugins
grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.loadNpmTasks('grunt-contrib-jshint');

// register at least this one task
grunt.registerTask('default', [ 'jshint', 'uglify' ]);


};