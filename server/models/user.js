'use strict';
var orm = require('pg-orm');

var person = {
  'tableName': 'user',
  'tableProperties': {
    'id': {
      'type': 'key'
    },
    'first_name': { 
      'type': 'string',
      'required': true
    },
    'last_name': { 
      'type': 'string',
      'required': true
    },
    'password': { 
      'type': 'string',
      'required': true
    },
    'email': { 
      'type': 'string',
      'required': true
    }
  }
};




module.exports = orm.build(person);