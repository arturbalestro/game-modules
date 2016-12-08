var GraphQL = require('graphql')
var GraphQLRelay = require('graphql-relay')
var db = require('./database')

// This module exports a GraphQL Schema, which is a declaration of all the
// types, queries and mutations we'll use in our system.

// Relay adds some specific types that it needs to function, including Node, Edge, Connection

// Firstly we need to create the Node interface in our system. This has nothing
// to do with Node.js! In Relay, Node refers to an entity – that is, an object
// with an ID.

// To create this interface, we need to pass in a resolving function as the
// first arg to nodeDefinitions that can fetch an entity given a global Relay
// ID. The second arg can be used to resolve an entity into a GraphQL type –
// but it's actually optional, so we'll leave it out and use isTypeOf on the
// GraphQL types further below.

var nodeDefinitions = GraphQLRelay.nodeDefinitions(function(globalId) {
  var idInfo = GraphQLRelay.fromGlobalId(globalId)
  if (idInfo.type == 'User') {
    return db.getUser(idInfo.id)
  } else if (idInfo.type == 'Widget') {
    return db.getWidget(idInfo.id)
  } else if (idInfo.type == 'Trainer') {
    return db.getTrainer(idInfo.id)
  } else if (idInfo.type == 'Pokemon') {
    return db.getPokemon(idInfo.id)
  } else if (idInfo.type == 'Token') {
    return db.getToken(idInfo.id)
  }
  return null
})

// We can now use the Node interface in the GraphQL types of our schema

var widgetType = new GraphQL.GraphQLObjectType({
  name: 'Widget',
  description: 'A shiny widget',

  // Relay will use this function to determine if an object in your system is
  // of a particular GraphQL type
  isTypeOf: function(obj) { return obj instanceof db.Widget },

  // We can either declare our fields as an object of name-to-definition
  // mappings or a closure that returns said object (see userType below)
  fields: {
    id: GraphQLRelay.globalIdField('Widget'),
    name: {
      type: GraphQL.GraphQLString,
      description: 'The name of the widget',
    },
  },
  // This declares this GraphQL type as a Node
  interfaces: [nodeDefinitions.nodeInterface],
})

var pokemonType = new GraphQL.GraphQLObjectType({
  name: 'Pokemon',
  description: 'A pokémon',

  // Relay will use this function to determine if an object in your system is
  // of a particular GraphQL type
  isTypeOf: function(obj) { return obj instanceof db.Pokemon },

  fields: {
    id: GraphQLRelay.globalIdField('Pokemon'),
    entryNumber: {
      type: GraphQL.GraphQLString,
      description: 'The Pokédex entry number of the Pokémon',
    },
    name: {
      type: GraphQL.GraphQLString,
      description: 'The name of the Pokémon',
    },
    pokemonType: {
      type: GraphQL.GraphQLString,
      description: 'The type of the Pokémon',
    },
    image: {
      type: GraphQL.GraphQLString,
      description: 'The image of the Pokémon',
    },
    species: {
      type: GraphQL.GraphQLString,
      description: 'The species of the Pokémon',
    },
  },
  // This declares this GraphQL type as a Node
  interfaces: [nodeDefinitions.nodeInterface],
})

/* var trainerGroupType = new GraphQL.GraphQLObjectType({
  name: 'TrainerGroup',
  description: 'A group of Pokémon trainers',
  isTypeOf: function(obj) { return obj instanceof db.Trainer },

  // We use a closure here because we need to refer to widgetType from above
  fields: function() {
    return {
      id: GraphQLRelay.globalIdField('TrainerGroup'),
      name: {
        type: GraphQL.GraphQLString,
        description: 'The name of the trainer',
      },

      // We can set up a relationship between trainers and pokémons here
      pokeGroup: {
        description: 'A group of Pokémons that get a specific trainer id as argument. Might be a fake trainer, like Wild or Starter.',

        // Relay gives us helper functions to define the Connection and its args
        type: GraphQLRelay.connectionDefinitions({name: 'PokeGroup', nodeType: pokemonType}).connectionType,

        // argument to tell GraphQL which user to pass back
        // in the resolve block
        args: {
          trainerToShow: {type: GraphQL.GraphQLInt},
        },

        // The resolve block will complete a query and pass back
        // data for the user id supplied by the arguments we pass in
        resolve: function(user, args) {
          return GraphQLRelay.connectionFromArray(db.getTrainersByUser(args.trainerToShow), args)
        },
      },
    }
  },
  interfaces: [nodeDefinitions.nodeInterface],
}) */

var trainerType = new GraphQL.GraphQLObjectType({
  name: 'Trainer',
  description: 'A person who trains Pokémon',
  isTypeOf: function(obj) { return obj instanceof db.Trainer },

  // We use a closure here because we need to refer to widgetType from above
  fields: function() {
    return {
      id: GraphQLRelay.globalIdField('Trainer'),
      name: {
        type: GraphQL.GraphQLString,
        description: 'The name of the trainer',
      },

      // We can set up a relationship between trainers and pokémons here
      pokemons: {
        description: 'A listing of the trainer\'s Pokémons',

        // Relay gives us helper functions to define the Connection and its args
        type: GraphQLRelay.connectionDefinitions({name: 'Pokemon', nodeType: pokemonType}).connectionType,

        // argument to tell GraphQL which user to pass back
        // in the resolve block
        args: GraphQLRelay.connectionArgs,

        // The resolve block will complete a query and pass back
        // data for the user id supplied by the arguments we pass in
        resolve: function(trainer, args) {
          return GraphQLRelay.connectionFromArray(db.getPokemonsByTrainer(trainer.id), args)
        },
      },
    }
  },
  interfaces: [nodeDefinitions.nodeInterface],
})

var tokenType = new GraphQL.GraphQLObjectType({
  name: 'Token',
  description: 'A Pokémon token that you receive by beating the stage',
  isTypeOf: function(obj) { return obj instanceof db.Token },

  // We use a closure here because we need to refer to tokenType from above
  fields: function() {
    return {
      id: GraphQLRelay.globalIdField('Token'),
      name: {
        type: GraphQL.GraphQLString,
        description: 'The name of the correspondent Pokémon',
      },
      attribute: {
        type: GraphQL.GraphQLString,
        description: 'The type of the correspondent Pokémon',
      },
      amount: {
        type: GraphQL.GraphQLInt,
        description: 'The amount of tokens you have for each specific Pokémon',
      },
    }
  },
  interfaces: [nodeDefinitions.nodeInterface],
})

var userType = new GraphQL.GraphQLObjectType({
  name: 'User',
  description: 'A user',
  isTypeOf: function(obj) { return obj instanceof db.User },

  // We use a closure here because we need to refer to widgetType from above
  fields: function() {
    return {
      id: GraphQLRelay.globalIdField('User'),
      name: {
        type: GraphQL.GraphQLString,
        description: 'The name of the user',
      },

      // We can set up a relationship between trainers and pokémons here
      trainers: {
        description: 'A person who trains Pokémon',

        // Relay gives us helper functions to define the Connection and its args
        type: GraphQLRelay.connectionDefinitions({name: 'Trainer', nodeType: trainerType}).connectionType,

        // argument to tell GraphQL which user to pass back
        // in the resolve block
        args: GraphQLRelay.connectionArgs,

        // The resolve block will complete a query and pass back
        // data for the user id supplied by the arguments we pass in
        resolve: function(user, args) {
          return GraphQLRelay.connectionFromArray(db.getTrainersByUser(user.id), args)
        },
      },
      // We can set up a relationship between users and tokens here
      tokens: {
        description: 'A Pokémon token that you receive by beating the stage',

        // Relay gives us helper functions to define the Connection and its args
        type: GraphQLRelay.connectionDefinitions({name: 'Token', nodeType: tokenType}).connectionType,

        // argument to tell GraphQL which user to pass back
        // in the resolve block
        args: GraphQLRelay.connectionArgs,

        // The resolve block will complete a query and pass back
        // data for the user id supplied by the arguments we pass in
        resolve: function(user, args) {
          return GraphQLRelay.connectionFromArray(db.getTokensByUser(user.id), args)
        },
      },
    }
  },
  interfaces: [nodeDefinitions.nodeInterface],
})

var RenameTrainerMutation = GraphQLRelay.mutationWithClientMutationId({
  name: 'RenameTrainer',
  inputFields: {
    id: {type: new GraphQL.GraphQLNonNull(GraphQL.GraphQLID)},
    name: {type: new GraphQL.GraphQLNonNull(GraphQL.GraphQLString)},
  },
  outputFields: {
    user: {
      type: userType,
      resolve: function(localTrainerId) {
      db.getTrainer(localTrainerId)
      }
    },
  },
  mutateAndGetPayload: function(id, name) {
    var localTrainerId = GraphQLRelay.fromGlobalId(id).id
    // RenameTrainer(localTrainerId, name);
    // return {localTrainerId};
  }
})

var AddTokenMutation = GraphQLRelay.mutationWithClientMutationId({
  name: 'AddToken',
  inputFields: {
    id: {type: new GraphQL.GraphQLNonNull(GraphQL.GraphQLID)},
    name: {type: new GraphQL.GraphQLNonNull(GraphQL.GraphQLString)},
    attribute: {type: new GraphQL.GraphQLNonNull(GraphQL.GraphQLString)},
    amount: {type: new GraphQL.GraphQLNonNull(GraphQL.GraphQLInt)},
  },
  outputFields: {
    user: {
      type: userType,
      resolve: function(localTokenId) {
        db.getToken(localTokenId)
      }
    },
  },
  mutateAndGetPayload: function(id, name, attribute, amount) {
    var localTokenId = GraphQLRelay.fromGlobalId(id).id
    //AddToken(localTokenId, name, attribute, amount);
    console.log('localTokenId', localTokenId);
    return {localTokenId};
  }
})

var Mutation = new GraphQL.GraphQLObjectType({
  name: 'Mutation',
  fields: {
    renameTrainer: RenameTrainerMutation,
    AddToken: AddTokenMutation,
  },
})

// Now we can bundle our types up and export a schema
// GraphQL expects a set of top-level queries and optional mutations (we have
// none in this simple example so we leave the mutation field out)
module.exports = new GraphQL.GraphQLSchema({
  query: new GraphQL.GraphQLObjectType({
    name: 'Query',
    fields: {
      // Relay needs this to query Nodes using global IDs
      node: nodeDefinitions.nodeField,
      // Our own root query field(s) go here
      user: {
        type: userType,
        resolve: function() {
          return db.getAnonymousUser()
          // return db.getTrainer(0)
        },
      },
    },
  }),
  mutation: Mutation
})
