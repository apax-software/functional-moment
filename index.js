var moment = require('moment');
var R = require('ramda');

// Loops over object and returns new object with functions bound to the original object
var demethodizeMap = R.mapObj.idx(function (fn, fnName, obj) {
    return R.invoker(fnName, obj);
});

// Pulls off all the moment methods
var fm = demethodizeMap(moment.fn);
// Pulls off all the moment.duration methods
var fd = demethodizeMap(moment.duration.fn);

// Export the new object
module.exports = exports = R.mixin(fm, {duration: fd});