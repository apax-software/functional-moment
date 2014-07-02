var moment = require('moment');
var R = require('ramda');

var demethodizeMap = R.mapObj.idx(function (fn, fnName, obj) {
    return R.invoker(fnName, obj);
});

var fm = demethodizeMap(moment.fn);
var fd = demethodizeMap(moment.duration.fn);

module.exports = exports = R.mixin(fm, {duration: fd});