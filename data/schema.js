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
  Tile,
  getGame,
  getTiles,
  getTurnsRemaining,
} from './database';

const {nodeInterface, nodeField} = nodeDefinitions(
  (globalId) => {
    const {type, id} = fromGlobalId(globalId);
    if (type === 'Game') {
      return getGame(id);
    } else if (type === 'Tile') {
      return getTile(id);
    } else {
      return null;
    }
  },
  (obj) => {
    if (obj instanceof Game) {
      return gameType;
    } else if (obj instanceof Tile) {
      return tileType;
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
    tiles: {
      type: tileConnection,
      description: 'Places where treasure might be hidden',
      args: connectionArgs,
      resolve: (game, args) => connectionFromArray(getTiles(), args),
    },
    turnsRemaining: {
      type: GraphQLInt,
      description: 'The number of turns a player has left to find the treasure',
      resolve: () => getTurnsRemaining(),
    },
  }),
  interfaces: [nodeInterface],
});

const tileType = new GraphQLObjectType({
  name: 'NumberGroup',
  description: 'A place where you might find treasure',
  fields: () => ({
    id: globalIdField('NumberGroup'),
    value: {
      type: GraphQLInt,
      description: 'True if this spot has already been checked for treasure',
      resolve: (tile) => tile.value,
    },
    hasBeenChecked: {
      type: GraphQLBoolean,
      description: 'True if this spot has already been checked for treasure',
      resolve: (tile) => tile.hasBeenChecked,
    },
  }),
  interfaces: [nodeInterface],
});

const {connectionType: tileConnection} =
  connectionDefinitions({name: 'Tile', nodeType: tileType});

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

/**
 * This is the type that will be the root of our mutations,
 * and the entry point into performing writes in our schema.
 */
 const mutationType = new GraphQLObjectType({
   name: 'Mutation',
   fields: () => ({
     //mutation: mutationName
   }),
 });

/**
 * Finally, we construct our schema (whose starting query type is the query
 * type we defined above) and export it.
 */
 export const Schema = new GraphQLSchema({
   query: queryType,
   //mutation: mutationType
 });
