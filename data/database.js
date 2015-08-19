/**
 *  Copyright (c) 2015, Facebook, Inc.
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree. An additional grant
 *  of patent rights can be found in the PATENTS file in the same directory.
 */

// Model types
class Game extends Object {}
class HidingSpot extends Object {}

const PLAYING = 'PLAYING'
const WIN = 'WIN'
const LOSE = 'LOSE'

// Mock data
var game = new Game();
game.id = '1';
game.state = PLAYING;

var hidingSpots;
var setHidingSpots = function() {
  hidingSpots = [];
  var hidingSpot;
  var indexOfSpotWithTreasure = Math.floor(Math.random() * 9);
  for (var i = 0; i < 9; i++) {
    hidingSpot = new HidingSpot();
    hidingSpot.id = `${i}`;
    hidingSpot.hasTreasure = (i === indexOfSpotWithTreasure);
    hidingSpot.hasBeenChecked = false;
    hidingSpots.push(hidingSpot);
  }
};

var turnsRemaining;

export function resetGame(){
  setHidingSpots();
  turnsRemaining = 3;
  game.state = PLAYING;
};

resetGame();

export function checkHidingSpotForTreasure(id) {
  if (game.state !== PLAYING) {
    throw new Error('Game is Over!')
  }
  var hidingSpot = getHidingSpot(id);
  if (hidingSpot.hasBeenChecked) {
    throw new Error('Hiding Spot Has Already Been Checked!')
  }
  turnsRemaining--;
  if (hidingSpot.hasTreasure) {
    game.state = WIN
  } else if (turnsRemaining === 0) {
    game.state = LOSE
  }
  hidingSpot.hasBeenChecked = true;
}

export function getHidingSpot(id) {
  return hidingSpots.find(hs => hs.id === id);
}

export function getGame() { return game; }
export function getHidingSpots() { return hidingSpots; }
export function getTurnsRemaining() { return turnsRemaining; }
