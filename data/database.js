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
 export class HidingSpot {}
 export class Token {}

 // Mock data
 const game = new Game();
 game.id = '1';

 const hidingSpots = [];
 (function() {
   let hidingSpot;
   const indexOfSpotWithTreasure = Math.floor(Math.random() * 8);
   for (let i = 0; i < 8; i++) {
     hidingSpot = new HidingSpot();
     hidingSpot.id = `${i}`;
     hidingSpot.hasTreasure = (i === indexOfSpotWithTreasure);
     hidingSpot.hasBeenChecked = false;
     hidingSpots.push(hidingSpot);
   }
 })();

 let turnsRemaining = 8;

 export function checkTurns(id) {
   turnsRemaining--;
 }
 export function getHidingSpot(id) {
   return hidingSpots.find(hs => hs.id === id);
 }

 const tokens = [];
 export function addTokenPayload(id, name, entryNumber, attribute, amount) {
   const token = new Token();
   token.id = id;
   token.name = name;
   token.entryNumber = entryNumber;
   token.attribute = attribute;
   token.amount = amount;
   tokens.push(token);
 }
 export function editTokenPayload(id) {
   const token = tokens.filter(tk => tk.id === id);
   token[0].amount = token[0].amount + 1;
 }
 export function getToken(id) {
   //console.log('trying to get token: ', id, 'among ', tokens);
   //console.log(tokens.find(tk => tk.id === id));
   return tokens.find(tk => tk.id === id);
 }

 export function getGame() { return game; }
 export function getHidingSpots() { return hidingSpots; }
 export function getTokens() { return tokens; }
 export function getTurnsRemaining() { return turnsRemaining; }
