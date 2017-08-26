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

const stages = [];
export function Stage(id, question, answer, markedPosition) {
  this.id = id
  this.question = question
  this.answer = answer
  this.markedPosition = markedPosition
}

const stage1 = [
  new Stage(1, 'Lacking in knowledge or training; unlearned.', 'IGNORANT', 1);
  new Stage(2, 'An act of killing a lot of people.', 'MASSACRE', 1);
  new Stage(3, 'A strong wish to achieve something.', 'AMBITION', 1);
  new Stage(4, 'The act of going against loyalty.', 'BETRAYAL', 1);
  new Stage(5, 'A person who watches what happens but has no active part in it.', 'OBSERVER', 0);
  new Stage(6, 'Frightening.', 'FEARSOME', 0);
  new Stage(7, 'A detailed plan for achieving success in situations such as war, politics, business, industry, or sport.', 'STRATEGY', 1);
  new Stage(8, 'The crime of stealing things.', 'THIEVERY', 1);
  new Stage(9, 'A royal title for a female heir to the throne.', 'PRINCESS', 1);
  new Stage(10, 'To have control over a place or person.', 'DOMINATE', 1);
  new Stage(11, 'A flat, usually square or rectangular, paper container for a letter.', 'ENVELOPE', 1);
  new Stage(12, 'A set of formal acts, often fixed and traditional, performed on important social or religious occasions.', 'CEREMONY', 1);
  new Stage(13, 'Accompanied by someone to a specific place.', 'ESCORTED', 1);
];

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
