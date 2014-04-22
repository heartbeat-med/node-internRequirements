"use strict";

var sAbsolutePath = process.cwd() + "/";

/**
 * InternDependenciesManager
 * @constructor
 */
function InternDependenciesManager()
{
  this.oDependencies = {};
  // Load dependencies definitions
  try {
    this.oDefinitions = require( InternDependenciesManager.DEPENDENCIES_DEFINITIONS );
  }
  catch( oErr ) {
    throw new Error( InternDependenciesManager.DEPENDENCIES_DEFINITIONS + " not found!" );
  }
}

/**
 * file path to the dependencies file
 * @type {string}
 */
InternDependenciesManager.DEPENDENCIES_DEFINITIONS = sAbsolutePath + "dependencies.json";

/**
 * require intern dependency
 * @param {string} sModuleName module name
 * @returns {*}
 */
InternDependenciesManager.prototype.require = function( sModuleName )
{
  if( this.oDefinitions[sModuleName] === undefined ) {
    throw new Error( "module \"" + sModuleName + "\" not found" );
  }
  if( this.oDependencies[sModuleName] === undefined ) {
    this.oDependencies[sModuleName] = require( sAbsolutePath + this.oDefinitions[sModuleName] );
  }
  return this.oDependencies[sModuleName];
};

var oInternDependenciesManager = new InternDependenciesManager();
/**
 * require intern dependency
 * @param {string} sModuleName module name
 * @returns {*}
 */
module.exports = oInternDependenciesManager.require.bind( oInternDependenciesManager );
