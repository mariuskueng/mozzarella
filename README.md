# Mozzarella

[![Build Status](https://travis-ci.org/mariuskueng/mozzarella.svg?branch=master)](https://travis-ci.org/mariuskueng/mozzarella)
[![Heroku](https://heroku-badge.herokuapp.com/?app=mozzarella&style=flat)](https://mozzarella.herokuapp.com/)

**Mozzarella 🍕** is a collaborative shopping-/what’s in your fridge list app. Mozzarella aims to help the user keep track of what groceries he has
in his fridge, which of these he should consume and what he needs to buy soon. Because of shared lists it’s able to keep track of an entire household.

## Documentation
**Mozzarella** is a student project for the CS module [webeC - Web Engineering](http://www.fhnw.ch/technik/modul/9076370) at the [University of Applied Sciences and Arts Northwestern Switzerland FHNW](http://www.fhnw.ch/homepage?set_language=en).

[👉 Project Documentation (PDF)](https://github.com/mariuskueng/mozzarella/blob/master/documentation/publish/documentation.pdf)

## Usage

### Install Meteor if you haven't already

```
$ curl https://install.meteor.com/ | sh
```

### Get it

```
$ git clone git@github.com:mariuskueng/mozzarella.git
```

### Run it

```
$ cd mozzarella
$ meteor
```

### Use it

Open `http://localhost:3000` in your browser.

## Notes
This project is built with [Meteor](https://www.meteor.com). Meteor is a complete open source platform
for building web and mobile apps
in pure JavaScript.

## Improvements

- [ ] #feature Sortable Lists & Items https://atmospherejs.com/rubaxa/sortable
- [ ] #improvement Auto-select list after create
- [ ] #improvement loading animation
- [ ] #improvement Schema package
- [ ] #improvement #feature i18n
- [ ] #bug edit list session not set (mobile)
- [ ] #testing Cucumber end-to-end tests
- [ ] #bug typeahead input field
- [ ] #bug edit item view empty
- [ ] #bug datepicker not always instanciated
- [ ] #feature Replace Flat UI with Material Design
- [ ] #bug Items in newly created list disappear unless window reload
