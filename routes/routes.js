/***************************************

  Route for / and calling for the others files
  Version 1.0
  Modification:

****************************************/

const express = require('express');
const router = express.Router();

/**
 * GET for /
 * @type {route}
 */
router.get('/', (req, res) => res.render('index'));

module.exports = router;
