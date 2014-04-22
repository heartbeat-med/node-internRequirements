module.exports = function( grunt )
{
  "use strict";
  var oJshintrc = grunt.file.readJSON( ".jshintrc" );
  var sSrcFolder = "src/";
  var sTestsFolder = "tests/";

  // Load tasks
  grunt.loadNpmTasks( "grunt-contrib-jshint" );
  // Project configuration.
  grunt.initConfig( {
    jshint : {
      options : oJshintrc,
      src     : {
        src : ["Gruntfile.js", sSrcFolder]
      },
      tests   : {
        src : [sTestsFolder]
      }
    }
  } );

  // Register tasks
  grunt.registerTask( "test", ["jshint"] );
};