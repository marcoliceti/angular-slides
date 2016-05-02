module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    karma: {
      unit: {
        configFile: 'karma.js'
      }
    }
  });

  grunt.loadNpmTasks('grunt-karma');

  grunt.registerTask('test', ['karma']);
  grunt.registerTask('default', []);
};
