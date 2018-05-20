// var express = require('express');
import express from 'express'
// var graphqlHTTP = require('express-graphql');
import graphqlHTTP from 'express-graphql'
// var { buildSchema } = require('graphql');
import { buildSchema } from 'graphql' 

// Construct a schema, using GraphQL schema language
// var schema = buildSchema(`
//   type Query {
//     hello: String
//     random: Int
//     amIAGoodBoy: Boolean
//     favGal: [String]
//   }
// `);

// The root provides a resolver function for each API endpoint
// var root = {
//   hello: () => {
//     return 'Hello world!';
//   },
//   random: ()=>{
//     return Math.floor(Math.random()*26 + 1);
//   },
//   amIAGoodBoy: true,
//   favGal: ['Zoey', 'Gigi', 'Carol', 'Jessica', 'Amy Yoshida', 'Bertha', 'Something']
// };

var schema = buildSchema(`
  type RandomDie {
    numSides: Int!
    rollOnce: Int!
    roll(numRolls: Int!): [Int]
  }

  type Query {
    getDie(numSides: Int): RandomDie
  }
`);

// This class implements the RandomDie GraphQL type
class RandomDie {
  numSides: number
  

  constructor(numSides: number) {
    this.numSides = numSides;
  }

  rollOnce() {
    return 1 + Math.floor(Math.random() * this.numSides);
  }

  roll({numRolls}) {
    var output = [];
    for (var i = 0; i < numRolls; i++) {
      output.push(this.rollOnce());
    }
    return output;
  }
}

// The root provides the top-level API endpoints
var root = {
  getDie: function ({numSides}) {
    return new RandomDie(numSides || 6);
  }
}


var app = express();

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');