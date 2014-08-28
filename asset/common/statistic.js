/*! betafang-fe 2014-08-28 */
define(function(){function a(){setTimeout(function(){ajax.post(b.search,{url:window.location.href})},c)}var b,c=9e3;return{init:function(c){b=$.extend({},c),a()}}});