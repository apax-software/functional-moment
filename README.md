functional-moment
=================

[![Build Status](https://travis-ci.org/apax-software/functional-moment.svg?branch=master)](https://travis-ci.org/apax-software/functional-moment)

Demothodizing Moment.js to use the library in a more functional style.

Functional moment is an experimental library created by using Ramda (another experimental library) to create semi equivalent functions of the methods on Moment and Duration objects.

## Examples

``` javascript
var test = require('tape');
var moment = require('moment');
var R = require('ramda');
var fm = require('functional-moment');

var entries = [
    {
        date: '2014-01-23',
        duration: 30 * 60
    },
    {
        date: '2014-01-23',
        duration: 1 * 60
    },
    {
        date: 'Not a valid date',
        duration: 4 * 60 * 60
    }
];



test('moment test', function (t) {
    var dates = R.map(R.compose(moment, R.prop('date')), entries);
    var validDates = R.filter(fm.isValid, dates);

    // All the functional-moment functions are currently curried functions
    var dateFormatter = fm.format('MM/DD/YYYY');
    var formattedDates = R.map(dateFormatter, validDates);

    t.plan(5);
    t.equal(validDates.length, 2);
    t.equal(typeof dateFormatter, 'function');
    t.equal(dateFormatter(moment('2014-01-10')), '01/10/2014');
    t.equal(formattedDates.length, 2);
    t.equal(formattedDates[0], '01/23/2014');
});

test('duration test', function (t) {
    var duration = R.rPartial(moment.duration, 'seconds');
    var durations = R.map(R.compose(duration, R.prop('duration')), entries);

    // All the functional-moment functions are currently curried functions
    var humanizer = fm.duration.humanize(false);
    var humanDurations = R.map(humanizer, durations);

    t.plan(5);
    t.equal(typeof humanizer, 'function');
    t.equal(humanizer.length, 1);
    t.equal(humanDurations[0], '30 minutes');
    t.equal(humanDurations[1], 'a minute');
    t.equal(humanDurations[2], '4 hours');

});

```


## Problems
This is currently a really basic attempt at demothodizing the awesome Moment.js library.  A few of the problems are:
* It does not respect any default values.  If the method can take an option input (for instance Moment#format takes an optional format).  These values are now required as a parameter
* Functions that can act as a getter/setter can currently only set (because parameters are required)
* It feels weird to have the functions require a Moment/Duration as the input.  I think if the input is something that could create a valid Moment or Duration it should do so

