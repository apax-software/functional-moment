functional-moment
=================

Demothodizing Moment.js

## Problems
This is currently a really basic attempt at demothodizing the awesome Moment.js library.  A few of the problems are:
* It does not respect any default values.  If the method can take an option input (for instance Moment#format takes an optional format).  These values are now required as a parameter
* Functions that can act as a getter/setter can currently only set (because parameters are required)
* It feels weird to have the functions require a Moment/Duration as the input.  I think if the input is something that could create a valid Moment or Duration it should do so

