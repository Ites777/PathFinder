var express = require('express');
var router = express.Router();
const { User } = require('../db/models');

router
.route('/')
.patch(async (req, res) => {
const {
  firstName,
  lastName,
  email,
  id
} = req.body
    try {
      if(req.body) {
        const updatedUser = await User.findOne({where: {
          id
        }});
        updatedUser.update({
          firstName,
          lastName,
          email,
        })
        res.status(200).json(updatedUser)
      }
    } catch (err) {
      res.status(500);
    }
  })

module.exports = router;
