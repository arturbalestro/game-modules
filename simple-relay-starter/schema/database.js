// We use these types to hold data and resolve from GraphQL types in our schema

function Trainer(id, name) {
  this.id = id.toString()
  this.name = name
}

function Framework(id, name) {
  this.id = id.toString()
  this.name = name
}

function Pokemon(id, name, pokemonType, image, available, caught, species, owners) {
  this.id = id.toString()
  this.name = name
  this.image = image
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
  new Trainer(4, 'Red'),
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

var imageUrl = 'https://img.pokemondb.net/artwork/';
var spriteUrl = 'https://img.pokemondb.net/sprites/black-white/anim/normal/';

var pokemons = [
  new Pokemon(1, 'Bulbasaur', grass, imageUrl+'bulbasaur.jpg', 0, 0, 'Seed Pokemon', [1, 4]),
  new Pokemon(2, 'Ivysaur', grass, imageUrl+'ivysaur.jpg', 3, 0, 'Seed Pokemon', [4]),
  new Pokemon(3, 'Venusaur', grass, imageUrl+'venusaur.jpg', 5, 0, 'Seed Pokemon', [4]),
  new Pokemon(4, 'Charmander', fire, imageUrl+'charmander.jpg', 0, 0, 'Lizard Pokemon', [4]),
  new Pokemon(5, 'Charmeleon', fire, imageUrl+'charmeleon.jpg', 3, 0, 'Flame Pokemon', [4]),
  new Pokemon(6, 'Charizard', fire, imageUrl+'charizard.jpg', 5, 0, 'Flame Pokemon', [1, 4]),
  new Pokemon(7, 'Squirtle', water, imageUrl+'squirtle.jpg', 0, 0, 'Tiny Turtle Pokemon', [1, 4]),
  new Pokemon(8, 'Wartortle', water, imageUrl+'wartortle.jpg', 3, 0, 'Turtle Pokemon', [4]),
  new Pokemon(9, 'Blastoise', water, imageUrl+'blastoise.jpg', 5, 0, 'Shellfish Pokemon', [4]),
  new Pokemon(10, 'Caterpie', bug, imageUrl+'caterpie.jpg', 1, 0, 'Worm Pokemon', [4]),
  new Pokemon(11, 'Metapod', bug, imageUrl+'metapod.jpg', 2, 0, 'Cocoon Pokemon', [4]),
  new Pokemon(12, 'Butterfree', bug, imageUrl+'butterfree.jpg', 4, 0, 'Butterfly Pokemon', [1, 4]),
  new Pokemon(13, 'Weedle', bug, imageUrl+'weedle.jpg', 1, 0, 'Hairy Bug Pokemon', [4]),
  new Pokemon(14, 'Kakuna', bug, imageUrl+'kakuna.jpg', 2, 0, 'Cocoon Pokemon', [4]),
  new Pokemon(15, 'Beedrill', bug, imageUrl+'beedrill.jpg', 4, 0, 'Poison Bee Pokemon', [4]),
  new Pokemon(16, 'Pidgey', flying, imageUrl+'pidgey.jpg', 1, 0, 'Tiny Bird Pokemon', [4]),
  new Pokemon(17, 'Pidgeotto', flying, imageUrl+'pidgeotto.jpg', 3, 0, 'Bird Pokemon', [4]),
  new Pokemon(18, 'Pidgeot', flying, imageUrl+'pidgeot.jpg', 5, 0, 'Bird Pokemon', [1, 4]),
  new Pokemon(19, 'Rattata', normal, imageUrl+'rattata.jpg', 1, 0, 'Mouse Pokemon', [4]),
  new Pokemon(20, 'Raticate', normal, imageUrl+'raticate.jpg', 2, 0, 'Mouse Pokemon', [4]),
  new Pokemon(21, 'Spearow', flying, imageUrl+'spearow.jpg', 1, 0, 'Tiny Bird Pokemon', [4]),
  new Pokemon(22, 'Fearow', flying, imageUrl+'fearow.jpg', 3, 0, 'Beak Pokemon', [4]),
  new Pokemon(23, 'Ekans', poison, imageUrl+'ekans.jpg', 1, 0, 'Snake Pokemon', [4]),
  new Pokemon(24, 'Arbok', poison, imageUrl+'arbok.jpg', 3, 0, 'Cobra Pokemon', [4]),
  new Pokemon(25, 'Pikachu', electric, imageUrl+'pikachu.jpg', 1, 0, 'Mouse Pokemon', [1, 4]),
  new Pokemon(26, 'Raichu', electric, imageUrl+'raichu.jpg', 3, 0, 'Mouse Pokemon', [4]),
  new Pokemon(27, 'Sandshrew', ground, imageUrl+'sandshrew.jpg', 1, 0, 'Mouse Pokemon', [4]),
  new Pokemon(28, 'Sandslash', ground, imageUrl+'sandslash.jpg', 2, 0, 'Mouse Pokemon', [4]),
  new Pokemon(29, 'Nidoran F', poison, imageUrl+'nidoran-f.jpg', 1, 0, 'Poison Pin Pokemon', [4]),
  new Pokemon(30, 'Nidorina', poison, imageUrl+'nidorina.jpg', 2, 0, 'Poison Pin Pokemon', [4]),
  new Pokemon(31, 'Nidoqueen', poison, imageUrl+'nidoqueen.jpg', 5, 0, 'Drill Pokemon', [4]),
  new Pokemon(32, 'Nidoran M', poison, imageUrl+'nidoran-m.jpg', 1, 0, 'Poison Pin Pokemon', [4]),
  new Pokemon(33, 'Nidorino', poison, imageUrl+'nidorino.jpg', 2, 0, 'Poison Pin Pokemon', [4]),
  new Pokemon(34, 'Nidoking', poison, imageUrl+'nidoking.jpg', 5, 0, 'Drill Pokemon', [4]),
  new Pokemon(35, 'Clefairy', fairy, imageUrl+'clefairy.jpg', 1, 0, 'Fairy Pokemon', [4]),
  new Pokemon(36, 'Clefable', fairy, imageUrl+'clefable.jpg', 3, 0, 'Fairy Pokemon', [4]),
  new Pokemon(37, 'Vulpix', fire, imageUrl+'vulpix.jpg', 1, 0, 'Fox Pokemon', [3, 4]),
  new Pokemon(38, 'Ninetales', fire, imageUrl+'ninetales.jpg', 3, 0, 'Fox Pokemon', [4]),
  new Pokemon(39, 'Jigglypuff', fairy, imageUrl+'jigglypuff.jpg', 1, 0, 'Balloon Pokemon', [4]),
  new Pokemon(40, 'Wigglytuff', fairy, imageUrl+'wigglytuff.jpg', 3, 0, 'Balloon Pokemon', [4]),
  new Pokemon(41, 'Zubat', poison, imageUrl+'zubat.jpg', 1, 0, 'Bat Pokemon', [4]),
  new Pokemon(42, 'Golbat', poison, imageUrl+'golbat.jpg', 2, 0, 'Bat Pokemon', [4]),
  new Pokemon(43, 'Oddish', grass, imageUrl+'oddish.jpg', 1, 0, 'Weed Pokemon', [4]),
  new Pokemon(44, 'Gloom', grass, imageUrl+'gloom.jpg', 2, 0, 'Weed Pokemon', [4]),
  new Pokemon(45, 'Vileplume', grass, imageUrl+'vileplume.jpg', 3, 0, 'Flower Pokemon', [4]),
  new Pokemon(46, 'Paras', bug, imageUrl+'paras.jpg', 1, 0, 'Mushroom Pokemon', [4]),
  new Pokemon(47, 'Parasect', bug, imageUrl+'parasect.jpg', 2, 0, 'Mushroom Pokemon', [4]),
  new Pokemon(48, 'Venonat', bug, imageUrl+'venonat.jpg', 1, 0, 'Insect Pokemon', [4]),
  new Pokemon(49, 'Venomoth', bug, imageUrl+'venomoth.jpg', 2, 0, 'Poison Moth Pokemon', [4]),
  new Pokemon(50, 'Diglett', ground, imageUrl+'diglett.jpg', 1, 0, 'Mole Pokemon', [4]),
  new Pokemon(51, 'Dugtrio', ground, imageUrl+'dugtrio.jpg', 2, 0, 'Mole Pokemon', [4]),
  new Pokemon(52, 'Meowth', normal, imageUrl+'meowth.jpg', 1, 0, 'Scratch Cat Pokemon', [4]),
  new Pokemon(53, 'Persian', normal, imageUrl+'persian.jpg', 2, 0, 'Classy Cat Pokemon', [4]),
  new Pokemon(54, 'Psyduck', water, imageUrl+'psyduck.jpg', 1, 0, 'Duck Pokemon', [2, 4]),
  new Pokemon(55, 'Golduck', water, imageUrl+'golduck.jpg', 2, 0, 'Duck Pokemon', [4]),
  new Pokemon(56, 'Mankey', fighting, imageUrl+'mankey.jpg', 1, 0, 'Pig Monkey Pokemon', [4]),
  new Pokemon(57, 'Primeape', fighting, imageUrl+'primeape.jpg', 2, 0, 'Pig Monkey Pokemon', [1, 4]),
  new Pokemon(58, 'Growlithe', fire, imageUrl+'growlithe.jpg', 1, 0, 'Puppy Pokemon', [4]),
  new Pokemon(59, 'Arcanine', fire, imageUrl+'arcanine.jpg', 2, 0, 'Legendary Pokemon', [4]),
  new Pokemon(60, 'Poliwag', water, imageUrl+'poliwag.jpg', 1, 0, 'Tadpole Pokemon', [2, 4]),
  new Pokemon(61, 'Poliwhirl', water, imageUrl+'poliwhirl.jpg', 2, 0, 'Tadpole Pokemon', [4]),
  new Pokemon(62, 'Poliwrath', water, imageUrl+'poliwrath.jpg', 5, 0, 'Tadpole Pokemon', [4]),
  new Pokemon(63, 'Abra', psychic, imageUrl+'abra.jpg', 1, 0, 'Psi Pokemon', [4]),
  new Pokemon(64, 'Kadabra', psychic, imageUrl+'kadabra.jpg', 2, 0, 'Psi Pokemon', [4]),
  new Pokemon(65, 'Alakazam', psychic, imageUrl+'alakazam.jpg', 5, 0, 'Psi Pokemon', [4]),
  new Pokemon(66, 'Machop', fighting, imageUrl+'machop.jpg', 1, 0, 'Superpower Pokemon', [4]),
  new Pokemon(67, 'Machoke', fighting, imageUrl+'machoke.jpg', 2, 0, 'Superpower Pokemon', [4]),
  new Pokemon(68, 'Machamp', fighting, imageUrl+'machamp.jpg', 5, 0, 'Superpower Pokemon', [4]),
  new Pokemon(69, 'Bellsprout', grass, imageUrl+'bellsprout.jpg', 1, 0, 'Flower Pokemon', [4]),
  new Pokemon(70, 'Weepinbell', grass, imageUrl+'weepinbell.jpg', 3, 0, 'Flycatcher Pokemon', [4]),
  new Pokemon(71, 'Victreebel', grass, imageUrl+'victreebel.jpg', 5, 0, 'Flycatcher Pokemon', [4]),
  new Pokemon(72, 'Tentacool', water, imageUrl+'tentacool.jpg', 1, 0, 'Jellyfish Pokemon', [4]),
  new Pokemon(73, 'Tentacruel', water, imageUrl+'tentacruel.jpg', 3, 0, 'Jellyfish Pokemon', [4]),
  new Pokemon(74, 'Geodude', rock, imageUrl+'geodude.jpg', 1, 0, 'Rock Pokemon', [3, 4]),
  new Pokemon(75, 'Graveler', rock, imageUrl+'graveler.jpg', 3, 0, 'Rock Pokemon', [4]),
  new Pokemon(76, 'Golem', rock, imageUrl+'golem.jpg', 5, 0, 'Megaton Pokemon', [4]),
  new Pokemon(77, 'Ponyta', fire, imageUrl+'ponyta.jpg', 2, 0, 'Fire Horse Pokemon', [4]),
  new Pokemon(78, 'Rapidash', fire, imageUrl+'rapidash.jpg', 3, 0, 'Fire Horse Pokemon', [4]),
  new Pokemon(79, 'Slowpoke', water, imageUrl+'slowpoke.jpg', 2, 0, 'Dopey Pokemon', [4]),
  new Pokemon(80, 'Slowbro', water, imageUrl+'slowbro.jpg', 3, 0, 'Hermit Crab Pokemon', [4]),
  new Pokemon(81, 'Magnemite', electric, imageUrl+'magnemite.jpg', 2, 0, 'Magnet Pokemon', [4]),
  new Pokemon(82, 'Magneton', electric, imageUrl+'magneton.jpg', 3, 0, 'Magnet Pokemon', [4]),
  new Pokemon(83, 'Farfetch\'d', flying, imageUrl+'farfetchd.jpg', 3, 0, 'Wild Duck Pokemon', [4]),
  new Pokemon(84, 'Doduo', flying, imageUrl+'doduo.jpg', 2, 0, 'Twin Bird Pokemon', [4]),
  new Pokemon(85, 'Dodrio', flying, imageUrl+'dodrio.jpg', 4, 0, 'Triple Bird Pokemon', [4]),
  new Pokemon(86, 'Seel', water, imageUrl+'seel.jpg', 3, 0, 'Sea Lion Pokemon', [2, 4]),
  new Pokemon(87, 'Dewgong', ice, imageUrl+'dewgong.jpg', 5, 0, 'Sea Lion Pokemon', [4]),
  new Pokemon(88, 'Grimer', poison, imageUrl+'grimer.jpg', 2, 0, 'Sludge Pokemon', [4]),
  new Pokemon(89, 'Muk', poison, imageUrl+'muk.jpg', 4, 0, 'Sludge Pokemon', [4]),
  new Pokemon(90, 'Shellder', water, imageUrl+'shellder.jpg', 2, 0, 'Bivalve Pokemon', [4]),
  new Pokemon(91, 'Cloyster', ice, imageUrl+'cloyster.jpg', 4, 0, 'Bivalve Pokemon', [4]),
  new Pokemon(92, 'Gastly', ghost, imageUrl+'gastly.jpg', 2, 0, 'Gas Pokemon', [4]),
  new Pokemon(93, 'Haunter', ghost, imageUrl+'haunter.jpg', 3, 0, 'Gas Pokemon', [1, 4]),
  new Pokemon(94, 'Gengar', ghost, imageUrl+'gengar.jpg', 4, 0, 'Shadow Pokemon', [4]),
  new Pokemon(95, 'Onix', rock, imageUrl+'onix.jpg', 3, 0, 'Rock Snake Pokemon', [3, 4]),
  new Pokemon(96, 'Drowzee', psychic, imageUrl+'drowzee.jpg', 1, 0, 'Hypnosis Pokemon', [4]),
  new Pokemon(97, 'Hypno', psychic, imageUrl+'hypno.jpg', 3, 0, 'Hypnosis Pokemon', [4]),
  new Pokemon(98, 'Krabby', water, imageUrl+'krabby.jpg', 3, 0, 'River Crab Pokemon', [4]),
  new Pokemon(99, 'Kingler', water, imageUrl+'kingler.jpg', 4, 0, 'Pincer Pokemon', [1, 4]),
  new Pokemon(100, 'Voltorb', electric, imageUrl+'voltorb.jpg', 1, 0, 'Ball Pokemon', [4]),
  new Pokemon(101, 'Electrode', electric, imageUrl+'electrode.jpg', 3, 0, 'Ball Pokemon', [4]),
  new Pokemon(102, 'Exeggcute', grass, imageUrl+'exeggcute.jpg', 3, 0, 'Egg Pokemon', [4]),
  new Pokemon(103, 'Exeggutor', grass, imageUrl+'exeggutor.jpg', 5, 0, 'Coconut Pokemon', [4]),
  new Pokemon(104, 'Cubone', ground, imageUrl+'cubone.jpg', 3, 0, 'Lonely Pokemon', [4]),
  new Pokemon(105, 'Marowak', ground, imageUrl+'marowak.jpg', 4, 0, 'Bone Keeper Pokemon', [4]),
  new Pokemon(106, 'Hitmonchan', fighting, imageUrl+'hitmonchan.jpg', 5, 0, 'Kicking Pokemon', [4]),
  new Pokemon(107, 'Hitmonlee', fighting, imageUrl+'hitmonlee.jpg', 5, 0, 'Punching Pokemon', [4]),
  new Pokemon(108, 'Lickitung', normal, imageUrl+'lickitung.jpg', 4, 0, 'Licking Pokemon', [4]),
  new Pokemon(109, 'Koffing', poison, imageUrl+'koffing.jpg', 2, 0, 'Poison Gas Pokemon', [4]),
  new Pokemon(110, 'Weezing', poison, imageUrl+'weezing.jpg', 4, 0, 'Poison Gas Pokemon', [4]),
  new Pokemon(111, 'Rhyhorn', rock, imageUrl+'rhyhorn.jpg', 3, 0, 'Spikes Pokemon', [4]),
  new Pokemon(112, 'Rhydon', rock, imageUrl+'rhydon.jpg', 4, 0, 'Drill Pokemon', [4]),
  new Pokemon(113, 'Chansey', normal, imageUrl+'chansey.jpg', 4, 0, 'Egg Pokemon', [4]),
  new Pokemon(114, 'Tangela', grass, imageUrl+'tangela.jpg', 4, 0, 'Vine Pokemon', [4]),
  new Pokemon(115, 'Kangaskhan', normal, imageUrl+'kangaskhan.jpg', 4, 0, 'Parent Pokemon', [4]),
  new Pokemon(116, 'Horsea', water, imageUrl+'horsea.jpg', 1, 0, 'Dragon Pokemon', [2, 4]),
  new Pokemon(117, 'Seadra', water, imageUrl+'seadra.jpg', 2, 0, 'Dragon Pokemon', [4]),
  new Pokemon(118, 'Goldeen', water, imageUrl+'goldeen.jpg', 3, 0, 'Goldfish Pokemon', [2, 4]),
  new Pokemon(119, 'Seaking', water, imageUrl+'seaking.jpg', 4, 0, 'Goldfish Pokemon', [4]),
  new Pokemon(120, 'Staryu', water, imageUrl+'staryu.jpg', 1, 0, 'Star Shape Pokemon', [2, 4]),
  new Pokemon(121, 'Starmie', water, imageUrl+'starmie.jpg', 2, 0, 'Mysterious Pokemon', [2, 4]),
  new Pokemon(122, 'Mr. Mime', psychic, imageUrl+'mr-mime.jpg', 4, 0, 'Barrier Pokemon', [4]),
  new Pokemon(123, 'Scyther', bug, imageUrl+'scyther.jpg', 4, 0, 'Mantis Pokemon', [4]),
  new Pokemon(124, 'Jynx', psychic, imageUrl+'jynx.jpg', 4, 0, 'Human Shape Pokemon', [4]),
  new Pokemon(125, 'Electabuzz', electric, imageUrl+'electabuzz.jpg', 5, 0, 'Electric Pokemon', [4]),
  new Pokemon(126, 'Magmar', fire, imageUrl+'magmar.jpg', 5, 0, 'Spitfire Pokemon', [4]),
  new Pokemon(127, 'Pinsir', bug, imageUrl+'pinsir.jpg', 5, 0, 'Stag Beetle Pokemon', [4]),
  new Pokemon(128, 'Tauros', normal, imageUrl+'tauros.jpg', 4, 0, 'Wild Bull Pokemon', [1, 4]),
  new Pokemon(129, 'Magikarp', water, imageUrl+'magikarp.jpg', 1, 0, 'Fish Pokemon', [4]),
  new Pokemon(130, 'Gyarados', water, imageUrl+'gyarados.jpg', 5, 0, 'Atrocious Pokemon', [4]),
  new Pokemon(131, 'Lapras', water, imageUrl+'lapras.jpg', 4, 0, 'Transport Pokemon', [1, 4]),
  new Pokemon(132, 'Ditto', normal, imageUrl+'ditto.jpg', 4, 0, 'Transform Pokemon', [4]),
  new Pokemon(133, 'Eevee', normal, imageUrl+'eevee.jpg', 2, 0, 'Evolution Pokemon', [4]),
  new Pokemon(134, 'Vaporeon', water, imageUrl+'vaporeon.jpg', 4, 0, 'Bubble Jet Pokemon', [4]),
  new Pokemon(135, 'Jolteon', electric, imageUrl+'jolteon.jpg', 4, 0, 'Lightning Pokemon', [4]),
  new Pokemon(136, 'Flareon', fire, imageUrl+'flareon.jpg', 4, 0, 'Flame Pokemon', [4]),
  new Pokemon(137, 'Porygon', normal, imageUrl+'porygon.jpg', 5, 0, 'Virtual Pokemon', [4]),
  new Pokemon(138, 'Omanyte', water, imageUrl+'omanyte.jpg', 4, 0, 'Spiral Pokemon', [4]),
  new Pokemon(139, 'Omastar', water, imageUrl+'omastar.jpg', 5, 0, 'Spiral Pokemon', [4]),
  new Pokemon(140, 'Kabuto', rock, imageUrl+'kabuto.jpg', 4, 0, 'Shellfish Pokemon', [4]),
  new Pokemon(141, 'Kabutops', rock, imageUrl+'kabutops.jpg', 5, 0, 'Shellfish Pokemon', [4]),
  new Pokemon(142, 'Aerodactyl', flying, imageUrl+'aerodactyl.jpg', 5, 0, 'Fossil Pokemon', [4]),
  new Pokemon(143, 'Snorlax', normal, imageUrl+'snorlax.jpg', 5, 0, 'Sleeping Pokemon', [1, 4]),
  new Pokemon(144, 'Articuno', ice, imageUrl+'articuno.jpg', 6, 0, 'Freeze Pokemon', [4]),
  new Pokemon(145, 'Zapdos', electric, imageUrl+'zapdos.jpg', 6, 0, 'Electric Pokemon', [4]),
  new Pokemon(146, 'Moltres', fire, imageUrl+'moltres.jpg', 6, 0, 'Flame Pokemon', [4]),
  new Pokemon(147, 'Dratini', dragon, imageUrl+'dratini.jpg', 4, 0, 'Dragon Pokemon', [4]),
  new Pokemon(148, 'Dragonair', dragon, imageUrl+'dragonair.jpg', 5, 0, 'Dragon Pokemon', [4]),
  new Pokemon(149, 'Dragonite', dragon, imageUrl+'dragonite.jpg', 6, 0, 'Dragon Pokemon', [4]),
  new Pokemon(150, 'Mewtwo', psychic, imageUrl+'mewtwo.jpg', 6, 0, 'Genetic Pokemon', [4]),
  new Pokemon(151, 'Mew', psychic, imageUrl+'mew.jpg', 7, 0, 'New Species Pokemon', [4]),
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
