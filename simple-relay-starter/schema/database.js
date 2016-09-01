// We use these types to hold data and resolve from GraphQL types in our schema

function Trainer(id, name) {
  this.id = id.toString()
  this.name = name
}

function Framework(id, name) {
  this.id = id.toString()
  this.name = name
}

function Pokemon(id, name, pokemonType, available, caught, species, owners) {
  this.id = id.toString()
  this.name = name
  this.pokemonType = pokemonType
  this.available = available
  this.caught = caught
  this.species = species
  this.attendees = owners
}

function Widget(id, userId, name) {
  this.id = id.toString()
  this.userId = userId.toString()
  this.name = name
}

// In a realistic system, the get functions below would return objects from a
// datastore like a DB or a REST API instead of an in-memory store like this.
// You can also return promises for async fetching

var trainers = [
  new Trainer(1, 'Ash'),
  new Trainer(2, 'Misty'),
  new Trainer(3, 'Brock'),
]

var widgets = [
  new Widget(1, 1, 'What\'s-it'),
  new Widget(2, 1, 'Who\'s-it'),
  new Widget(3, 1, 'How\'s-it'),
]

var frameworks = [
  new Framework(1, 'AngularJS'),
  new Framework(2, 'React'),
  new Framework(3, 'JavaScript'),
  new Framework(4, 'NodeJS'),
]

var grass = 'Grass', water = 'Water', fire = 'Fire', bug = 'Bug',
	psychic = 'Psychic', flying = 'Flying', ghost = 'Ghost', fighting = 'Fighting',
	normal = 'Normal', poison = 'Poison', electric = 'Electric', ground = 'Ground',
	fairy = 'Fairy', rock = 'Rock', ice = 'Ice', dragon = 'Dragon'

var pokemons = [
  new Pokemon(1, 'Bulbasaur', grass, 0, 0, 'Seed Pokemon', [1]),
  new Pokemon(2, 'Ivysaur', grass, 3, 0, 'Seed Pokemon', []),
  new Pokemon(3, 'Venusaur', grass, 5, 0, 'Seed Pokemon', []),
  new Pokemon(4, 'Charmander', fire, 0, 0, 'Lizard Pokemon', []),
  new Pokemon(5, 'Charmeleon', fire, 3, 0, 'Flame Pokemon', []),
  new Pokemon(6, 'Charizard', fire, 5, 0, 'Flame Pokemon', [1]),
  new Pokemon(7, 'Squirtle', water, 0, 0, 'Tiny Turtle Pokemon', [1]),
  new Pokemon(8, 'Wartortle', water, 3, 0, 'Turtle Pokemon', []),
  new Pokemon(9, 'Blastoise', water, 5, 0, 'Shellfish Pokemon', []),
  new Pokemon(10, 'Caterpie', bug, 1, 0, 'Worm Pokemon', []),
  new Pokemon(11, 'Metapod', bug, 2, 0, 'Cocoon Pokemon', []),
  new Pokemon(12, 'Butterfree', bug, 4, 0, 'Butterfly Pokemon', [1]),
  new Pokemon(13, 'Weedle', bug, 1, 0, 'Hairy Bug Pokemon', []),
  new Pokemon(14, 'Kakuna', bug, 2, 0, 'Cocoon Pokemon', []),
  new Pokemon(15, 'Beedrill', bug, 4, 0, 'Poison Bee Pokemon', []),
  new Pokemon(16, 'Pidgey', flying, 1, 0, 'Tiny Bird Pokemon', []),
  new Pokemon(17, 'Pidgeotto', flying, 3, 0, 'Bird Pokemon', []),
  new Pokemon(18, 'Pidgeot', flying, 5, 0, 'Bird Pokemon', [1]),
  new Pokemon(19, 'Rattata', normal, 1, 0, 'Mouse Pokemon', []),
  new Pokemon(20, 'Raticate', normal, 2, 0, 'Mouse Pokemon', []),
  new Pokemon(21, 'Spearow', flying, 1, 0, 'Tiny Bird Pokemon', []),
  new Pokemon(22, 'Fearow', flying, 3, 0, 'Beak Pokemon', []),
  new Pokemon(23, 'Ekans', poison, 1, 0, 'Snake Pokemon', []),
  new Pokemon(24, 'Arbok', poison, 3, 0, 'Cobra Pokemon', []),
  new Pokemon(25, 'Pikachu', electric, 1, 0, 'Mouse Pokemon', [1]),
  new Pokemon(26, 'Raichu', electric, 3, 0, 'Mouse Pokemon', []),
  new Pokemon(27, 'Sandshrew', ground, 1, 0, 'Mouse Pokemon', []),
  new Pokemon(28, 'Sandslash', ground, 2, 0, 'Mouse Pokemon', []),
  new Pokemon(29, 'Nidoran F', poison, 1, 0, 'Poison Pin Pokemon', []),
  new Pokemon(30, 'Nidorina', poison, 2, 0, 'Poison Pin Pokemon', []),
  new Pokemon(31, 'Nidoqueen', poison, 5, 0, 'Drill Pokemon', []),
  new Pokemon(32, 'Nidoran M', poison, 1, 0, 'Poison Pin Pokemon', []),
  new Pokemon(33, 'Nidorino', poison, 2, 0, 'Poison Pin Pokemon', []),
  new Pokemon(34, 'Nidoking', poison, 5, 0, 'Drill Pokemon', []),
  new Pokemon(35, 'Clefairy', fairy, 1, 0, 'Fairy Pokemon', []),
  new Pokemon(36, 'Clefable', fairy, 3, 0, 'Fairy Pokemon', []),
  new Pokemon(37, 'Vulpix', fire, 1, 0, 'Fox Pokemon', [3]),
  new Pokemon(38, 'Ninetales', fire, 3, 0, 'Fox Pokemon', []),
  new Pokemon(39, 'Jigglypuff', fairy, 1, 0, 'Balloon Pokemon', []),
  new Pokemon(40, 'Wigglytuff', fairy, 3, 0, 'Balloon Pokemon', []),
  new Pokemon(41, 'Zubat', poison, 1, 0, 'Bat Pokemon', []),
  new Pokemon(42, 'Golbat', poison, 2, 0, 'Bat Pokemon', []),
  new Pokemon(43, 'Oddish', grass, 1, 0, 'Weed Pokemon', []),
  new Pokemon(44, 'Gloom', grass, 2, 0, 'Weed Pokemon', []),
  new Pokemon(45, 'Vileplume', grass, 3, 0, 'Flower Pokemon', []),
  new Pokemon(46, 'Paras', bug, 1, 0, 'Mushroom Pokemon', []),
  new Pokemon(47, 'Parasect', bug, 2, 0, 'Mushroom Pokemon', []),
  new Pokemon(48, 'Venonat', bug, 1, 0, 'Insect Pokemon', []),
  new Pokemon(49, 'Venomoth', bug, 2, 0, 'Poison Moth Pokemon', []),
  new Pokemon(50, 'Diglett', ground, 1, 0, 'Mole Pokemon', []),
  new Pokemon(51, 'Dugtrio', ground, 2, 0, 'Mole Pokemon', []),
  new Pokemon(52, 'Meowth', normal, 1, 0, 'Scratch Cat Pokemon', []),
  new Pokemon(53, 'Persian', normal, 2, 0, 'Classy Cat Pokemon', []),
  new Pokemon(54, 'Psyduck', water, 1, 0, 'Duck Pokemon', [2]),
  new Pokemon(55, 'Golduck', water, 2, 0, 'Duck Pokemon', []),
  new Pokemon(56, 'Mankey', fighting, 1, 0, 'Pig Monkey Pokemon', []),
  new Pokemon(57, 'Primeape', fighting, 2, 0, 'Pig Monkey Pokemon', [1]),
  new Pokemon(58, 'Growlithe', fire, 1, 0, 'Puppy Pokemon', []),
  new Pokemon(59, 'Arcanine', fire, 2, 0, 'Legendary Pokemon', []),
  new Pokemon(60, 'Poliwag', water, 1, 0, 'Tadpole Pokemon', [2]),
  new Pokemon(61, 'Poliwhirl', water, 2, 0, 'Tadpole Pokemon', []),
  new Pokemon(62, 'Poliwrath', water, 5, 0, 'Tadpole Pokemon', []),
  new Pokemon(63, 'Abra', psychic, 1, 0, 'Psi Pokemon', []),
  new Pokemon(64, 'Kadabra', psychic, 2, 0, 'Psi Pokemon', []),
  new Pokemon(65, 'Alakazam', psychic, 5, 0, 'Psi Pokemon', []),
  new Pokemon(66, 'Machop', fighting, 1, 0, 'Superpower Pokemon', []),
  new Pokemon(67, 'Machoke', fighting, 2, 0, 'Superpower Pokemon', []),
  new Pokemon(68, 'Machamp', fighting, 5, 0, 'Superpower Pokemon', []),
  new Pokemon(69, 'Bellsprout', grass, 1, 0, 'Flower Pokemon', []),
  new Pokemon(70, 'Weepinbell', grass, 3, 0, 'Flycatcher Pokemon', []),
  new Pokemon(71, 'Victreebel', grass, 5, 0, 'Flycatcher Pokemon', []),
  new Pokemon(72, 'Tentacool', water, 1, 0, 'Jellyfish Pokemon', []),
  new Pokemon(73, 'Tentacruel', water, 3, 0, 'Jellyfish Pokemon', []),
  new Pokemon(74, 'Geodude', rock, 1, 0, 'Rock Pokemon', [3]),
  new Pokemon(75, 'Graveler', rock, 3, 0, 'Rock Pokemon', []),
  new Pokemon(76, 'Golem', rock, 5, 0, 'Megaton Pokemon', []),
  new Pokemon(77, 'Ponyta', fire, 2, 0, 'Fire Horse Pokemon', []),
  new Pokemon(78, 'Rapidash', fire, 3, 0, 'Fire Horse Pokemon', []),
  new Pokemon(79, 'Slowpoke', water, 2, 0, 'Dopey Pokemon', []),
  new Pokemon(80, 'Slowbro', water, 3, 0, 'Hermit Crab Pokemon', []),
  new Pokemon(81, 'Magnemite', electric, 2, 0, 'Magnet Pokemon', []),
  new Pokemon(82, 'Magneton', electric, 3, 0, 'Magnet Pokemon', []),
  new Pokemon(83, 'Farfetch\'d', flying, 3, 0, 'Wild Duck Pokemon', []),
  new Pokemon(84, 'Doduo', flying, 2, 0, 'Twin Bird Pokemon', []),
  new Pokemon(85, 'Dodrio', flying, 4, 0, 'Triple Bird Pokemon', []),
  new Pokemon(86, 'Seel', water, 3, 0, 'Sea Lion Pokemon', [2]),
  new Pokemon(87, 'Dewgong', ice, 5, 0, 'Sea Lion Pokemon', []),
  new Pokemon(88, 'Grimer', poison, 2, 0, 'Sludge Pokemon', []),
  new Pokemon(89, 'Muk', poison, 4, 0, 'Sludge Pokemon', []),
  new Pokemon(90, 'Shellder', water, 2, 0, 'Bivalve Pokemon', []),
  new Pokemon(91, 'Cloyster', ice, 4, 0, 'Bivalve Pokemon', []),
  new Pokemon(92, 'Gastly', ghost, 2, 0, 'Gas Pokemon', []),
  new Pokemon(93, 'Haunter', ghost, 3, 0, 'Gas Pokemon', [1]),
  new Pokemon(94, 'Gengar', ghost, 4, 0, 'Shadow Pokemon', []),
  new Pokemon(95, 'Onix', rock, 3, 0, 'Rock Snake Pokemon', [3]),
  new Pokemon(96, 'Drowzee', psychic, 1, 0, 'Hypnosis Pokemon', []),
  new Pokemon(97, 'Hypno', psychic, 3, 0, 'Hypnosis Pokemon', []),
  new Pokemon(98, 'Krabby', water, 3, 0, 'River Crab Pokemon', []),
  new Pokemon(99, 'Kingler', water, 4, 0, 'Pincer Pokemon', [1]),
  new Pokemon(100, 'Voltorb', electric, 1, 0, 'Ball Pokemon', []),
  new Pokemon(101, 'Electrode', electric, 3, 0, 'Ball Pokemon', []),
  new Pokemon(102, 'Exeggcute', grass, 3, 0, 'Egg Pokemon', []),
  new Pokemon(103, 'Exeggutor', grass, 5, 0, 'Coconut Pokemon', []),
  new Pokemon(104, 'Cubone', ground, 3, 0, 'Lonely Pokemon', []),
  new Pokemon(105, 'Marowak', ground, 4, 0, 'Bone Keeper Pokemon', []),
  new Pokemon(106, 'Hitmonchan', fighting, 5, 0, 'Kicking Pokemon', []),
  new Pokemon(107, 'Hitmonlee', fighting, 5, 0, 'Punching Pokemon', []),
  new Pokemon(108, 'Lickitung', normal, 4, 0, 'Licking Pokemon', []),
  new Pokemon(109, 'Koffing', poison, 2, 0, 'Poison Gas Pokemon', []),
  new Pokemon(110, 'Weezing', poison, 4, 0, 'Poison Gas Pokemon', []),
  new Pokemon(111, 'Rhyhorn', rock, 3, 0, 'Spikes Pokemon', []),
  new Pokemon(112, 'Rhydon', rock, 4, 0, 'Drill Pokemon', []),
  new Pokemon(113, 'Chansey', normal, 4, 0, 'Egg Pokemon', []),
  new Pokemon(114, 'Tangela', grass, 4, 0, 'Vine Pokemon', []),
  new Pokemon(115, 'Kangaskhan', normal, 4, 0, 'Parent Pokemon', []),
  new Pokemon(116, 'Horsea', water, 1, 0, 'Dragon Pokemon', [2]),
  new Pokemon(117, 'Seadra', water, 2, 0, 'Dragon Pokemon', []),
  new Pokemon(118, 'Goldeen', water, 3, 0, 'Goldfish Pokemon', [2]),
  new Pokemon(119, 'Seaking', water, 4, 0, 'Goldfish Pokemon', []),
  new Pokemon(120, 'Staryu', water, 1, 0, 'Star Shape Pokemon', [2]),
  new Pokemon(121, 'Starmie', water, 2, 0, 'Mysterious Pokemon', [2]),
  new Pokemon(122, 'Mr. Mime', psychic, 4, 0, 'Barrier Pokemon', []),
  new Pokemon(123, 'Scyther', bug, 4, 0, 'Mantis Pokemon', []),
  new Pokemon(124, 'Jynx', psychic, 4, 0, 'Human Shape Pokemon', []),
  new Pokemon(125, 'Electabuzz', electric, 5, 0, 'Electric Pokemon', []),
  new Pokemon(126, 'Magmar', fire, 5, 0, 'Spitfire Pokemon', []),
  new Pokemon(127, 'Pinsir', bug, 5, 0, 'Stag Beetle Pokemon', []),
  new Pokemon(128, 'Tauros', normal, 4, 0, 'Wild Bull Pokemon', [1]),
  new Pokemon(129, 'Magikarp', water, 1, 0, 'Fish Pokemon', []),
  new Pokemon(130, 'Gyarados', water, 5, 0, 'Atrocious Pokemon', []),
  new Pokemon(131, 'Lapras', water, 4, 0, 'Transport Pokemon', [1]),
  new Pokemon(132, 'Ditto', normal, 4, 0, 'Transform Pokemon', []),
  new Pokemon(133, 'Eevee', normal, 2, 0, 'Evolution Pokemon', []),
  new Pokemon(134, 'Vaporeon', water, 4, 0, 'Bubble Jet Pokemon', []),
  new Pokemon(135, 'Jolteon', electric, 4, 0, 'Lightning Pokemon', []),
  new Pokemon(136, 'Flareon', fire, 4, 0, 'Flame Pokemon', []),
  new Pokemon(137, 'Porygon', normal, 5, 0, 'Virtual Pokemon', []),
  new Pokemon(138, 'Omanyte', water, 4, 0, 'Spiral Pokemon', []),
  new Pokemon(139, 'Omastar', water, 5, 0, 'Spiral Pokemon', []),
  new Pokemon(140, 'Kabuto', rock, 4, 0, 'Shellfish Pokemon', []),
  new Pokemon(141, 'Kabutops', rock, 5, 0, 'Shellfish Pokemon', []),
  new Pokemon(142, 'Aerodactyl', flying, 5, 0, 'Fossil Pokemon', []),
  new Pokemon(143, 'Snorlax', normal, 5, 0, 'Sleeping Pokemon', [1]),
  new Pokemon(144, 'Articuno', ice, 6, 0, 'Freeze Pokemon', []),
  new Pokemon(145, 'Zapdos', electric, 6, 0, 'Electric Pokemon', []),
  new Pokemon(146, 'Moltres', fire, 6, 0, 'Flame Pokemon', []),
  new Pokemon(147, 'Dratini', dragon, 4, 0, 'Dragon Pokemon', []),
  new Pokemon(148, 'Dragonair', dragon, 5, 0, 'Dragon Pokemon', []),
  new Pokemon(149, 'Dragonite', dragon, 6, 0, 'Dragon Pokemon', []),
  new Pokemon(150, 'Mewtwo', psychic, 6, 0, 'Genetic Pokemon', []),
  new Pokemon(151, 'Mew', psychic, 7, 0, 'New Species Pokemon', []),
]

module.exports = {
  Trainer: Trainer,
  Widget: Widget,
  Framework: Framework,
  Pokemon: Pokemon,

  getTrainer: function(id) {
    return trainers.filter(function(trainer) {
      return trainer.id == id
    })[0]
  },

  getWidget: function(id) {
    return widgets.filter(function(w) {
      return w.id == id
    })[0]
  },
  getWidgetsByUser: function(userId) {
    return widgets.filter(function(w) {
      return w.userId == userId
    })
  },

  getPokemon: function(id) {
    return pokemons.filter(function(pokemon) {
      return pokemon.id == id
    })[0]
  },
  getPokemonsByTrainer: function(trainerId) {
    var confs = []
    pokemons.forEach(function(conf) {
      conf.attendees.forEach(function(trainer) {
        if (trainer == trainerId) {
          confs.push(conf)
        }
      })
    })
    return confs
  },
}
