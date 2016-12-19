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
  checkHidingSpotForTreasure,
  getGame,
  getHidingSpot,
  getHidingSpots,
  getTurnsRemaining,
} from './database';

import {
  Pokemon,
  getPokemon,
  getPokemons
} from './pokemons';

const {nodeInterface, nodeField} = nodeDefinitions(
  (globalId) => {
    const {type, id} = fromGlobalId(globalId);
    if (type === 'Game') {
      return getGame(id);
    } else if (type === 'HidingSpot') {
      return getHidingSpot(id);
    } else if (type === 'Pokemon') {
      return getPokemon(id);
    } else {
      return null;
    }
  },
  (obj) => {
    if (obj instanceof Game) {
      return gameType;
    } else if (obj instanceof HidingSpot) {
      return hidingSpotType;
    } else if (obj instanceof Pokemon) {
      return pokemonType;
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
    pokemons: {
      type: pokemonConnection,
      description: 'Pokemons that can be found',
      args: connectionArgs,
      resolve: (game, args) => connectionFromArray(getPokemons(), args),
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
      type: GraphQLString,
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
    species: {
      type: GraphQLString,
      description: 'The species of the Pokémon',
    },
  }),
  interfaces: [nodeInterface],
});

const {connectionType: hidingSpotConnection} =
  connectionDefinitions({name: 'HidingSpot', nodeType: hidingSpotType});

const {connectionType: pokemonConnection} =
  connectionDefinitions({name: 'Pokemon', nodeType: pokemonType});

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

/**
 * This is the type that will be the root of our mutations,
 * and the entry point into performing writes in our schema.
 */
 const mutationType = new GraphQLObjectType({
   name: 'Mutation',
   fields: () => ({
     checkHidingSpotForTreasure: CheckHidingSpotForTreasureMutation,
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
