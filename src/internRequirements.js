"use strict";

var sAbsolutePath = process.cwd() + "/";
if( "REL_DEP_LOC" in process.env ) {
  sAbsolutePath += process.env.REL_DEP_LOC + "/";
}
/**
 * InternDependenciesManager
 * @constructor
 */
function InternDependenciesManager()
{
  this.oDependencies = {};
  // Load dependencies definitions
  var _oDefinitions = {};
  try {
    _oDefinitions = require( InternDependenciesManager.DEPENDENCIES_DEFINITIONS );
  }
  catch( oErr ) {
    throw new Error( InternDependenciesManager.DEPENDENCIES_DEFINITIONS + " not found!" );
  }
  var oEnvironmentDefinitions = _oDefinitions.ENV;

  if( oEnvironmentDefinitions !== undefined ) {
    delete _oDefinitions.ENV;

    if( process.env.NODE_ENV !== undefined && oEnvironmentDefinitions[process.env.NODE_ENV] !== undefined ) {
      // add environment dependencies
      Object.keys( oEnvironmentDefinitions[process.env.NODE_ENV] ).forEach( function( sKey )
      {
        _oDefinitions[sKey] = oEnvironmentDefinitions[process.env.NODE_ENV][sKey];
      } );
    }
  }

  this.oDefinitions = _oDefinitions;

}

/**
 * file path to the dependencies file
 * @type {string}
 */
InternDependenciesManager.DEPENDENCIES_DEFINITIONS = sAbsolutePath + "dependencies.json";

/**
 * require intern dependency
 * @param {string|{require:string}} sModuleName module name
 * @returns {*}
 */
InternDependenciesManager.prototype.require = function( sModuleName )
{
  if( this.oDefinitions[sModuleName] === undefined ) {
    throw new Error( "module \"" + sModuleName + "\" not found" );
  }
  if( this.oDependencies[sModuleName] === undefined ) {
    if( typeof this.oDefinitions[sModuleName] === "string" ) {
      this.oDependencies[sModuleName] = require( sAbsolutePath + this.oDefinitions[sModuleName] );
    } else if( this.oDefinitions[sModuleName].require ) {
      this.oDependencies[sModuleName] = require( this.oDefinitions[sModuleName].require );
    }
  }
  return this.oDependencies[sModuleName];
};

var oInternDependenciesManager = new InternDependenciesManager();
/**
 * require intern dependency
 * @param {string|{require:string}} sModuleName module name
 * @returns {*}
 */
module.exports = oInternDependenciesManager.require.bind( oInternDependenciesManager );
