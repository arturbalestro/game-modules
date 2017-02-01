/**
 *  Copyright (c) 2015, Facebook, Inc.
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree. An additional grant
 *  of patent rights can be found in the PATENTS file in the same directory.
 */

import {
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from 'graphql';

import {
  connectionArgs,
  connectionDefinitions,
  connectionFromArray,
  fromGlobalId,
  globalIdField,
  mutationWithClientMutationId,
  nodeDefinitions,
} from 'graphql-relay';

import {
  // Import methods that your schema can use to interact with your database
  Game,
  HidingSpot,
  Token,
  checkHidingSpotForTreasure,
  addTokenPayload,
  editTokenPayload,
  getGame,
  getHidingSpot,
  getHidingSpots,
  getToken,
  getTokens,
  getTurnsRemaining,
} from './database';

import {
  Trainer,
  getTrainer,
  getTrainers
} from './trainers';

import {
  Pokemon,
  getPokemon,
  getPokemons,
  getPokemonsByTrainer
} from './pokemons';

const {nodeInterface, nodeField} = nodeDefinitions(
  (globalId) => {
    const {type, id} = fromGlobalId(globalId);
    if (type === 'Game') {
      return getGame(id);
    } else if (type === 'HidingSpot') {
      return getHidingSpot(id);
    } else if (type === 'Trainer') {
      return getTrainer(id);
    } else if (type === 'Pokemon') {
      return getPokemon(id);
    } else if (type === 'Token') {
      return getToken(id);
    } else {
      return null;
    }
  },
  (obj) => {
    if (obj instanceof Game) {
      return gameType;
    } else if (obj instanceof HidingSpot) {
      return hidingSpotType;
    } else if (obj instanceof Trainer) {
      return trainerType;
    } else if (obj instanceof Pokemon) {
      return pokemonType;
    } else if (obj instanceof Token) {
      return tokenType;
    } else {
      return null;
    }
  }
);

const gameType = new GraphQLObjectType({
  name: 'Game',
  description: 'A treasure search game',
  fields: () => ({
    id: globalIdField('Game'),
    hidingSpots: {
      type: hidingSpotConnection,
      description: 'Places where treasure might be hidden',
      args: connectionArgs,
      resolve: (game, args) => connectionFromArray(getHidingSpots(), args),
    },
    trainers: {
      type: trainerConnection,
      description: 'Trainers that have Pokémon',
      args: connectionArgs,
      resolve: (game, args) => connectionFromArray(getTrainers(), args),
    },
    // pokemons: {
    //   type: pokemonConnection,
    //   description: 'Pokemons that can be found',
    //   args: connectionArgs,
    //   resolve: (game, args) => connectionFromArray(getPokemons(), args),
    // },
    tokens: {
      type: tokenConnection,
      description: 'Tokens that can be earned when all pairs are found',
      args: connectionArgs,
      resolve: (game, args) => connectionFromArray(getTokens(), args),
    },
    turnsRemaining: {
      type: GraphQLInt,
      description: 'The number of turns a player has left to find the treasure',
      resolve: () => getTurnsRemaining(),
    },
  }),
  interfaces: [nodeInterface],
});

const hidingSpotType = new GraphQLObjectType({
  name: 'HidingSpot',
  description: 'A place where you might find treasure',
  fields: () => ({
    id: globalIdField('HidingSpot'),
    hasBeenChecked: {
      type: GraphQLBoolean,
      description: 'True if this spot has already been checked for treasure',
      resolve: (hidingSpot) => hidingSpot.hasBeenChecked,
    },
    hasTreasure: {
      type: GraphQLBoolean,
      description: 'True if this hiding spot holds treasure',
      resolve: (hidingSpot) => {
        if (hidingSpot.hasBeenChecked) {
          return hidingSpot.hasTreasure;
        } else {
          return null;  // Shh... it's a secret!
        }
      },
    },
  }),
  interfaces: [nodeInterface],
});

const pokemonType = new GraphQLObjectType({
  name: 'Pokemon',
  description: 'A Pokemon that will appear on the spot',
  fields: () => ({
    id: globalIdField('Pokemon'),
    entryNumber: {
      type: GraphQLInt,
      description: 'The Pokédex entry number of the Pokémon',
    },
    name: {
      type: GraphQLString,
      description: 'The name of the Pokémon',
    },
    pokemonType: {
      type: GraphQLString,
      description: 'The type of the Pokémon',
    },
    image: {
      type: GraphQLString,
      description: 'The image of the Pokémon',
    },
    canEvolve: {
      type: GraphQLString,
      description: 'Specifies if a Pokémon has a direct evolution.',
    },
    unlocked: {
      type: GraphQLBoolean,
      description: 'Specifies if a Pokémon was unlocked into the game.',
    },
    species: {
      type: GraphQLString,
      description: 'The species of the Pokémon',
    },
  }),
  interfaces: [nodeInterface],
});

const trainerType = new GraphQLObjectType({
  name: 'Trainer',
  description: 'A person that trains pokémon',
  fields: () => ({
    id: globalIdField('Trainer'),
    name: {
      type: GraphQLString,
      description: 'The name of the Trainer',
    },
    specialty: {
      type: GraphQLString,
      description: 'The specialty of the Trainer (type of pokémon they use the most).',
    },
    weakness: {
      type: GraphQLString,
      description: 'The type of the Pokémon they have the most problems with.',
    },

    // We can set up a relationship between trainers and pokémons here
    pokemons: {
      description: 'A listing of the trainer\'s Pokémons',
      type: pokemonConnection,
      args: connectionArgs,
      resolve: (trainer, args) => connectionFromArray(getPokemonsByTrainer(trainer.id), args),
    },
  }),
  interfaces: [nodeInterface],
});

const tokenType = new GraphQLObjectType({
  name: 'Token',
  description: 'A token that can be earned when all pairs are found',
  fields: () => ({
    id: globalIdField('Token'),
    name: {
      type: GraphQLString,
      description: 'The name of the correspondent Pokémon',
    },
    entryNumber: {
      type: GraphQLInt,
      description: 'The Pokédex entry number of the correspondent Pokémon',
    },
    attribute: {
      type: GraphQLString,
      description: 'The type of the correspondent Pokémon',
    },
    amount: {
      type: GraphQLInt,
      description: 'The amount of tokens you have for each specific Pokémon',
    },
  }),
  interfaces: [nodeInterface],
});

const {connectionType: hidingSpotConnection} =
  connectionDefinitions({name: 'HidingSpot', nodeType: hidingSpotType});

const {connectionType: trainerConnection} =
  connectionDefinitions({name: 'Trainer', nodeType: trainerType});

const {connectionType: pokemonConnection} =
  connectionDefinitions({name: 'Pokemon', nodeType: pokemonType});

const {connectionType: tokenConnection} =
  connectionDefinitions({name: 'Token', nodeType: tokenType});

/**
 * This is the type that will be the root of our query,
 * and the entry point into our schema.
 */
const queryType = new GraphQLObjectType({
 name: 'Query',
 fields: () => ({
   node: nodeField,
   game: {
     type: gameType,
     resolve: () => getGame(),
   },
 }),
});

const CheckHidingSpotForTreasureMutation = mutationWithClientMutationId({
  name: 'CheckHidingSpotForTreasure',
  inputFields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
  },
  outputFields: {
    hidingSpot: {
      type: hidingSpotType,
      //resolve: ({localHidingSpotId}) => getHidingSpot(localHidingSpotId),
      resolve: ({localHidingSpotId}) => {
        return getHidingSpot(localHidingSpotId);
      }
    },
    game: {
      type: gameType,
      resolve: () => getGame(),
    },
  },
  mutateAndGetPayload: ({id}) => {
    const localHidingSpotId = fromGlobalId(id).id;
    checkHidingSpotForTreasure(localHidingSpotId);
    return {localHidingSpotId};
  },
});

const AddTokenMutation = mutationWithClientMutationId({
  name: 'AddToken',
  inputFields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    entryNumber: { type: new GraphQLNonNull(GraphQLInt) },
    attribute: { type: new GraphQLNonNull(GraphQLString) },
    amount: { type: new GraphQLNonNull(GraphQLInt) },
  },
  outputFields: {
    token: {
      type: tokenType,
      resolve: ({localTokenId}) => getToken(localTokenId),
    },
    game: {
      type: gameType,
      resolve: () => getGame(),
    },
  },
  mutateAndGetPayload: ({id, name, entryNumber, attribute, amount}) => {
    const localTokenId = fromGlobalId(id).id;
    addTokenPayload(localTokenId, name, entryNumber, attribute, amount);
    return {localTokenId};
  },
});

const EditTokenMutation = mutationWithClientMutationId({
  name: 'EditToken',
  inputFields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    entryNumber: { type: new GraphQLNonNull(GraphQLInt) },
    attribute: { type: new GraphQLNonNull(GraphQLString) },
    amount: { type: new GraphQLNonNull(GraphQLInt) },
  },
  outputFields: {
    token: {
      type: tokenType,
      resolve: ({localTokenId}) => getToken(localTokenId),
    },
    game: {
      type: gameType,
      resolve: () => getGame(),
    },
  },
  mutateAndGetPayload: ({id, amount}) => {
    const localTokenId = fromGlobalId(id).id;
    if(localTokenId != undefined) {
      editTokenPayload(localTokenId);
    }
    return {localTokenId};
  },
});

/**
 * This is the type that will be the root of our mutations,
 * and the entry point into performing writes in our schema.
 */
 const mutationType = new GraphQLObjectType({
   name: 'Mutation',
   fields: () => ({
     checkHidingSpotForTreasure: CheckHidingSpotForTreasureMutation,
     addToken: AddTokenMutation,
     editToken: EditTokenMutation,
   }),
 });

/**
 * Finally, we construct our schema (whose starting query type is the query
 * type we defined above) and export it.
 */
 export const Schema = new GraphQLSchema({
   query: queryType,
   mutation: mutationType
 });
