module.exports = function (grunt) {
    grunt.initConfig({

    // define source files and their destinations
    uglify: 
    {
        options: {
            mangle: true,
            compress: true
        },
        js: {
            files: {
                'build/static/js/scl.min.js': 
                    [
                        'src/client/js/*'
                    ]
            }
        }
        
    },

   jshint: {
       server: {
         src: ['src/server/js/*'],
         options: { 
            node: true
         }
       },
       client: {
         src: ['src/client/js/*'],
         options: { globalstrict: true }
       }
     },
    watch: {
        client:  { files: 'src/client/js/*.js', tasks: [ 'jshint'] },
    }
});

// load plugins
grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.loadNpmTasks('grunt-contrib-jshint');

// register at least this one task
grunt.registerTask('default', [ 'jshint', 'uglify' ]);


};