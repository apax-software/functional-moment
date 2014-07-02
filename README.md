functional-moment
=================

Demothodizing Moment.js to use the library in a more functional style.

Functional moment is an experimental library created by using Ramda (another experimental library) to create semi equivalent functions of the methods on Moment and Duration objects.

## Examples

``` javascript
var R = require('ramda');
var moment = require('moment');
var fm = require('functional-moment');

var entries = [
    {
        date: '2014-01-23',
        duration: 30 * 60
    },
    {
        date: '2014-01-23',
        duration: 30 * 60
    },
    {
        date: 'Not a valid date',
        duration: 30 * 60
    }
];

var dates = R.map(R.compose(R.prop('dates'), moment), entries);

var durations = R.map(R.compose(R.prop('duration'), moment.duration), entries);

var validDates = R.filter(fm.isValid, dates);

// All the functional-moment functions are currently curried functions
var dateFormatter = fm.format('MM/DD/YYYY');
var humanizer = fm.duration.humanize(false);

var formattedDates = R.map(dateformatter, validDates);

var humanDurations = R.map(humanizer, durations);

```


## Problems
This is currently a really basic attempt at demothodizing the awesome Moment.js library.  A few of the problems are:
* It does not respect any default values.  If the method can take an option input (for instance Moment#format takes an optional format).  These values are now required as a parameter
* Functions that can act as a getter/setter can currently only set (because parameters are required)
* It feels weird to have the functions require a Moment/Duration as the input.  I think if the input is something that could create a valid Moment or Duration it should do so

