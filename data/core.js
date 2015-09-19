/* global $ */
define([
	'config'
], function(config) {
	'use strict';
	
	var world = {};
	// extend config
	$.extend(world, config);
	return world;
});