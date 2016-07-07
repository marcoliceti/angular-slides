module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    karma: {
      unit: {
        configFile: 'karma.js'
      }
    },
    concat: {
      options: {
        separator: '\n',
      },
      dist: {
        src: [
          'src/module.js',
          'src/service/location.js',
          'src/service/scroller.js',
          'src/service/scroll_detector.js',
          'src/service/viewport.js',
          'src/service/config.js',
          'src/directive/slides.js'
        ],
        dest: 'dist/msl_slides.js',
      },
    },
    uglify: {
      my_target: {
        files: {
          'dist/msl_slides.min.js': [ 'dist/msl_slides.js' ]
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('test', ['karma']);
  grunt.registerTask('build', ['concat', 'uglify']);
  grunt.registerTask('default', []);
};
