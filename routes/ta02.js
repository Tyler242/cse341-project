// TA02 PLACEHOLDER
// Remember, you can make more of these placeholders yourself!
const express = require('express');
const router = express.Router();

// create the array for usernames
let users = ['Bob', 'Bill', 'Ben'];

// used to make sure the name to be removed exists
let contains = true;
// used to make sure the new username doesn't already exist
let isDuplicate = false;

router.get('/', (req, res, next) => {
  res.render('pages/ta02', {
    title: 'Team Activity 02',
    path: '/ta02', // For pug, EJS
    activeTA03: true, // For HBS
    contentCSS: true, // For HBS
    usersList: users,
    canRemoveUser: contains,
    duplicateUser: isDuplicate,
  });
});

router.post('/addUser', (req, res) => {
  // turn off any removeUser errors
  contains = true;

  // is the new user already in the list?
  if (users.includes(req.body.user)) {
    // it already exists
    isDuplicate = true;
  } else {
    // it doesn't already exist
    isDuplicate = false;
    users.push(req.body.user);
  }
  res.redirect('/ta02');
});

router.post('/removeUser', (req, res) => {
  // turn off any addUser errors
  isDuplicate = false;

  // is the user to be removed in the list?
  if (users.includes(req.body.user)) {
    // it is in the list
    contains = true;
    users = users.filter((name) => name != req.body.user);
  } else {
    // it is not in the list
    contains = false;
  }
  res.redirect('/ta02');
});

module.exports = router;
