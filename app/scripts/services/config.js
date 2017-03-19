'use strict';

/**
 * @ngdoc service
 * @name ticTacBoomFrontApp.Config
 * @description
 * # Config
 * Factory in the ticTacBoomFrontApp.
 */
angular.module('ticTacBoomFrontApp')
  .factory('Config', function () {
    return {
      serverBase: 'http://www.monsite.com:3000'
    };
  });
