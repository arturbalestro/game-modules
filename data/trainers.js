export function Trainer(id, userId, name, specialty, weakness) {
  this.id = id.toString()
  this.userId = userId.toString()
  this.name = name
  this.specialty = specialty
  this.weakness = weakness
}

const trainers = [
  new Trainer(0, '1', 'Embar', 'fire', 'water'), //The default trainer
  new Trainer(1, '1', 'Ash', '', ''),
  new Trainer(2, '1', 'Misty', 'water', 'electric'),
  new Trainer(3, '1', 'Brock', 'rock', 'water'),
  new Trainer(4, '1', 'Red', '', ''), //Has all available pokémon from pokédex
  new Trainer(5, '1', 'Wild', '', ''), //Pokemon you can find in the wild, not including evolutions or rare pokémon
  new Trainer(6, '1', 'Starter', '', '') //Only starter pokémons
];

export function getTrainer(id) {
  return trainers.find(tr => tr.id === id);
}

export function getTrainers() { return trainers; }
