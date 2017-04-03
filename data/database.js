/**
 *  Copyright (c) 2015, Facebook, Inc.
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree. An additional grant
 *  of patent rights can be found in the PATENTS file in the same directory.
 */

 // Model types
 export class Game {}
 export class Tile {}

 // Mock data
 const game = new Game();
 game.id = '1';

 const tiles = [];
 (function() {
   for (let i = 1; i <= 9; i++) {
     const rand = Math.ceil(Math.random() * 8);
     console.log('picking up a random number from 1 to 9: ', rand);
     const tile = new Tile();
     tile.id = i;
     tile.value = rand;
     tile.hasBeenChecked = false;
     tiles.push(tile);
   }
   console.log('tiles: ', tiles);
 })();

 let turnsRemaining = 8;

 export function checkTurns(id) {
   turnsRemaining--;
 }
 export function getTile(id) {
   return tiles.find(t => t.id === id);
 }

 export function getGame() { return game; }
 export function getTiles() { return tiles; }
 export function getTurnsRemaining() { return turnsRemaining; }
