// We use these types to hold data and resolve from GraphQL types in our schema

function User(id, name) {
  this.id = id.toString()
  this.name = name
}

function Move(name, type, damageAmount, healingAmount, effect) {

}

function Trainer(id, userId, name) {
  this.id = id.toString()
  this.userId = userId.toString()
  this.name = name
}

function Pokemon(entryNumber, name, pokemonType, image, available, caught, species, owners) {
  this.id = entryNumber.toString()
  this.entryNumber = entryNumber
  this.name = name
  this.image = image
  this.pokemonType = pokemonType
  this.available = available
  this.caught = caught
  this.species = species
  this.owners = owners
}

function Token(id, userId, name, attribute, amount) {
  this.id = id.toString()
  this.userId = userId.toString()
  this.name = name
  this.attribute = attribute
  this.amount = amount
}

// In a realistic system, the get functions below would return objects from a
// datastore like a DB or a REST API instead of an in-memory store like this.
// You can also return promises for async fetching

var users = [new User('1', 'Anonymous')]

var trainers = [
  new Trainer(0, '1', 'Embar'), //The default trainer
  new Trainer(1, '1', 'Ash'),
  new Trainer(2, '1', 'Misty'),
  new Trainer(3, '1', 'Brock'),
  new Trainer(4, '1', 'Red'), //Has all available pokémon from pokédex
  new Trainer(5, '1', 'Wild'), //Pokemon you can find in the wild, not including evolutions or rare pokémon
  new Trainer(6, '1', 'Starter') //Only starter pokémons
]

var grass = 'Grass', water = 'Water', fire = 'Fire', bug = 'Bug',
	psychic = 'Psychic', flying = 'Flying', ghost = 'Ghost', fighting = 'Fighting',
	normal = 'Normal', poison = 'Poison', electric = 'Electric', ground = 'Ground',
	fairy = 'Fairy', rock = 'Rock', ice = 'Ice', dragon = 'Dragon'

var imageUrl = 'https://img.pokemondb.net/artwork/';
var spriteUrl = 'https://img.pokemondb.net/sprites/black-white/normal/';

var pokemons = [
  new Pokemon(1, 'Bulbasaur', grass, spriteUrl+'bulbasaur.png', 0, 0, 'Seed Pokemon', [1, 4, 5, 6]),
  new Pokemon(2, 'Ivysaur', grass, spriteUrl+'ivysaur.png', 3, 0, 'Seed Pokemon', [4]),
  new Pokemon(3, 'Venusaur', grass, spriteUrl+'venusaur.png', 5, 0, 'Seed Pokemon', [4]),
  new Pokemon(4, 'Charmander', fire, spriteUrl+'charmander.png', 0, 0, 'Lizard Pokemon', [4, 5, 6]),
  new Pokemon(5, 'Charmeleon', fire, spriteUrl+'charmeleon.png', 3, 0, 'Flame Pokemon', [4]),
  new Pokemon(6, 'Charizard', fire, spriteUrl+'charizard.png', 5, 0, 'Flame Pokemon', [1, 4]),
  new Pokemon(7, 'Squirtle', water, spriteUrl+'squirtle.png', 0, 0, 'Tiny Turtle Pokemon', [1, 4, 5, 6]),
  new Pokemon(8, 'Wartortle', water, spriteUrl+'wartortle.png', 3, 0, 'Turtle Pokemon', [4]),
  new Pokemon(9, 'Blastoise', water, spriteUrl+'blastoise.png', 5, 0, 'Shellfish Pokemon', [4]),
  new Pokemon(10, 'Caterpie', bug, spriteUrl+'caterpie.png', 1, 0, 'Worm Pokemon', [4, 5]),
  new Pokemon(11, 'Metapod', bug, spriteUrl+'metapod.png', 2, 0, 'Cocoon Pokemon', [4]),
  new Pokemon(12, 'Butterfree', bug, spriteUrl+'butterfree.png', 4, 0, 'Butterfly Pokemon', [1, 4]),
  new Pokemon(13, 'Weedle', bug, spriteUrl+'weedle.png', 1, 0, 'Hairy Bug Pokemon', [4, 5]),
  new Pokemon(14, 'Kakuna', bug, spriteUrl+'kakuna.png', 2, 0, 'Cocoon Pokemon', [4]),
  new Pokemon(15, 'Beedrill', bug, spriteUrl+'beedrill.png', 4, 0, 'Poison Bee Pokemon', [4]),
  new Pokemon(16, 'Pidgey', flying, spriteUrl+'pidgey.png', 1, 0, 'Tiny Bird Pokemon', [4, 5]),
  new Pokemon(17, 'Pidgeotto', flying, spriteUrl+'pidgeotto.png', 3, 0, 'Bird Pokemon', [4]),
  new Pokemon(18, 'Pidgeot', flying, spriteUrl+'pidgeot.png', 5, 0, 'Bird Pokemon', [1, 4]),
  new Pokemon(19, 'Rattata', normal, spriteUrl+'rattata.png', 1, 0, 'Mouse Pokemon', [4, 5]),
  new Pokemon(20, 'Raticate', normal, spriteUrl+'raticate.png', 2, 0, 'Mouse Pokemon', [4]),
  new Pokemon(21, 'Spearow', flying, spriteUrl+'spearow.png', 1, 0, 'Tiny Bird Pokemon', [4, 5]),
  new Pokemon(22, 'Fearow', flying, spriteUrl+'fearow.png', 3, 0, 'Beak Pokemon', [4]),
  new Pokemon(23, 'Ekans', poison, spriteUrl+'ekans.png', 1, 0, 'Snake Pokemon', [4, 5]),
  new Pokemon(24, 'Arbok', poison, spriteUrl+'arbok.png', 3, 0, 'Cobra Pokemon', [4]),
  new Pokemon(25, 'Pikachu', electric, spriteUrl+'pikachu.png', 1, 0, 'Mouse Pokemon', [1, 4, 5]),
  new Pokemon(26, 'Raichu', electric, spriteUrl+'raichu.png', 3, 0, 'Mouse Pokemon', [4]),
  new Pokemon(27, 'Sandshrew', ground, spriteUrl+'sandshrew.png', 1, 0, 'Mouse Pokemon', [4, 5]),
  new Pokemon(28, 'Sandslash', ground, spriteUrl+'sandslash.png', 2, 0, 'Mouse Pokemon', [4]),
  new Pokemon(29, 'Nidoran F', poison, spriteUrl+'nidoran-f.png', 1, 0, 'Poison Pin Pokemon', [4, 5]),
  new Pokemon(30, 'Nidorina', poison, spriteUrl+'nidorina.png', 2, 0, 'Poison Pin Pokemon', [4]),
  new Pokemon(31, 'Nidoqueen', poison, spriteUrl+'nidoqueen.png', 5, 0, 'Drill Pokemon', [4]),
  new Pokemon(32, 'Nidoran M', poison, spriteUrl+'nidoran-m.png', 1, 0, 'Poison Pin Pokemon', [4, 5]),
  new Pokemon(33, 'Nidorino', poison, spriteUrl+'nidorino.png', 2, 0, 'Poison Pin Pokemon', [4]),
  new Pokemon(34, 'Nidoking', poison, spriteUrl+'nidoking.png', 5, 0, 'Drill Pokemon', [4]),
  new Pokemon(35, 'Clefairy', fairy, spriteUrl+'clefairy.png', 1, 0, 'Fairy Pokemon', [4, 5]),
  new Pokemon(36, 'Clefable', fairy, spriteUrl+'clefable.png', 3, 0, 'Fairy Pokemon', [4]),
  new Pokemon(37, 'Vulpix', fire, spriteUrl+'vulpix.png', 1, 0, 'Fox Pokemon', [3, 4, 5]),
  new Pokemon(38, 'Ninetales', fire, spriteUrl+'ninetales.png', 3, 0, 'Fox Pokemon', [4]),
  new Pokemon(39, 'Jigglypuff', fairy, spriteUrl+'jigglypuff.png', 1, 0, 'Balloon Pokemon', [4, 5]),
  new Pokemon(40, 'Wigglytuff', fairy, spriteUrl+'wigglytuff.png', 3, 0, 'Balloon Pokemon', [4]),
  new Pokemon(41, 'Zubat', poison, spriteUrl+'zubat.png', 1, 0, 'Bat Pokemon', [4, 5]),
  new Pokemon(42, 'Golbat', poison, spriteUrl+'golbat.png', 2, 0, 'Bat Pokemon', [4]),
  new Pokemon(43, 'Oddish', grass, spriteUrl+'oddish.png', 1, 0, 'Weed Pokemon', [4, 5]),
  new Pokemon(44, 'Gloom', grass, spriteUrl+'gloom.png', 2, 0, 'Weed Pokemon', [4]),
  new Pokemon(45, 'Vileplume', grass, spriteUrl+'vileplume.png', 3, 0, 'Flower Pokemon', [4]),
  new Pokemon(46, 'Paras', bug, spriteUrl+'paras.png', 1, 0, 'Mushroom Pokemon', [4, 5]),
  new Pokemon(47, 'Parasect', bug, spriteUrl+'parasect.png', 2, 0, 'Mushroom Pokemon', [4]),
  new Pokemon(48, 'Venonat', bug, spriteUrl+'venonat.png', 1, 0, 'Insect Pokemon', [4, 5]),
  new Pokemon(49, 'Venomoth', bug, spriteUrl+'venomoth.png', 2, 0, 'Poison Moth Pokemon', [4]),
  new Pokemon(50, 'Diglett', ground, spriteUrl+'diglett.png', 1, 0, 'Mole Pokemon', [4, 5]),
  new Pokemon(51, 'Dugtrio', ground, spriteUrl+'dugtrio.png', 2, 0, 'Mole Pokemon', [4]),
  new Pokemon(52, 'Meowth', normal, spriteUrl+'meowth.png', 1, 0, 'Scratch Cat Pokemon', [4, 5]),
  new Pokemon(53, 'Persian', normal, spriteUrl+'persian.png', 2, 0, 'Classy Cat Pokemon', [4]),
  new Pokemon(54, 'Psyduck', water, spriteUrl+'psyduck.png', 1, 0, 'Duck Pokemon', [2, 4, 5]),
  new Pokemon(55, 'Golduck', water, spriteUrl+'golduck.png', 2, 0, 'Duck Pokemon', [4]),
  new Pokemon(56, 'Mankey', fighting, spriteUrl+'mankey.png', 1, 0, 'Pig Monkey Pokemon', [4, 5]),
  new Pokemon(57, 'Primeape', fighting, spriteUrl+'primeape.png', 2, 0, 'Pig Monkey Pokemon', [1, 4]),
  new Pokemon(58, 'Growlithe', fire, spriteUrl+'growlithe.png', 1, 0, 'Puppy Pokemon', [4, 5]),
  new Pokemon(59, 'Arcanine', fire, spriteUrl+'arcanine.png', 2, 0, 'Legendary Pokemon', [4]),
  new Pokemon(60, 'Poliwag', water, spriteUrl+'poliwag.png', 1, 0, 'Tadpole Pokemon', [2, 4, 5]),
  new Pokemon(61, 'Poliwhirl', water, spriteUrl+'poliwhirl.png', 2, 0, 'Tadpole Pokemon', [4]),
  new Pokemon(62, 'Poliwrath', water, spriteUrl+'poliwrath.png', 5, 0, 'Tadpole Pokemon', [4]),
  new Pokemon(63, 'Abra', psychic, spriteUrl+'abra.png', 1, 0, 'Psi Pokemon', [4, 5]),
  new Pokemon(64, 'Kadabra', psychic, spriteUrl+'kadabra.png', 2, 0, 'Psi Pokemon', [4]),
  new Pokemon(65, 'Alakazam', psychic, spriteUrl+'alakazam.png', 5, 0, 'Psi Pokemon', [4]),
  new Pokemon(66, 'Machop', fighting, spriteUrl+'machop.png', 1, 0, 'Superpower Pokemon', [4, 5]),
  new Pokemon(67, 'Machoke', fighting, spriteUrl+'machoke.png', 2, 0, 'Superpower Pokemon', [4]),
  new Pokemon(68, 'Machamp', fighting, spriteUrl+'machamp.png', 5, 0, 'Superpower Pokemon', [4]),
  new Pokemon(69, 'Bellsprout', grass, spriteUrl+'bellsprout.png', 1, 0, 'Flower Pokemon', [4, 5]),
  new Pokemon(70, 'Weepinbell', grass, spriteUrl+'weepinbell.png', 3, 0, 'Flycatcher Pokemon', [4]),
  new Pokemon(71, 'Victreebel', grass, spriteUrl+'victreebel.png', 5, 0, 'Flycatcher Pokemon', [4]),
  new Pokemon(72, 'Tentacool', water, spriteUrl+'tentacool.png', 1, 0, 'Jellyfish Pokemon', [4, 5]),
  new Pokemon(73, 'Tentacruel', water, spriteUrl+'tentacruel.png', 3, 0, 'Jellyfish Pokemon', [4]),
  new Pokemon(74, 'Geodude', rock, spriteUrl+'geodude.png', 1, 0, 'Rock Pokemon', [3, 4, 5]),
  new Pokemon(75, 'Graveler', rock, spriteUrl+'graveler.png', 3, 0, 'Rock Pokemon', [4]),
  new Pokemon(76, 'Golem', rock, spriteUrl+'golem.png', 5, 0, 'Megaton Pokemon', [4]),
  new Pokemon(77, 'Ponyta', fire, spriteUrl+'ponyta.png', 2, 0, 'Fire Horse Pokemon', [4, 5]),
  new Pokemon(78, 'Rapidash', fire, spriteUrl+'rapidash.png', 3, 0, 'Fire Horse Pokemon', [4]),
  new Pokemon(79, 'Slowpoke', water, spriteUrl+'slowpoke.png', 2, 0, 'Dopey Pokemon', [4, 5]),
  new Pokemon(80, 'Slowbro', water, spriteUrl+'slowbro.png', 3, 0, 'Hermit Crab Pokemon', [4]),
  new Pokemon(81, 'Magnemite', electric, spriteUrl+'magnemite.png', 2, 0, 'Magnet Pokemon', [4, 5]),
  new Pokemon(82, 'Magneton', electric, spriteUrl+'magneton.png', 3, 0, 'Magnet Pokemon', [4]),
  new Pokemon(83, 'Farfetch\'d', flying, spriteUrl+'farfetchd.png', 3, 0, 'Wild Duck Pokemon', [4, 5]),
  new Pokemon(84, 'Doduo', flying, spriteUrl+'doduo.png', 2, 0, 'Twin Bird Pokemon', [4, 5]),
  new Pokemon(85, 'Dodrio', flying, spriteUrl+'dodrio.png', 4, 0, 'Triple Bird Pokemon', [4]),
  new Pokemon(86, 'Seel', water, spriteUrl+'seel.png', 3, 0, 'Sea Lion Pokemon', [2, 4, 5]),
  new Pokemon(87, 'Dewgong', ice, spriteUrl+'dewgong.png', 5, 0, 'Sea Lion Pokemon', [4]),
  new Pokemon(88, 'Grimer', poison, spriteUrl+'grimer.png', 2, 0, 'Sludge Pokemon', [4, 5]),
  new Pokemon(89, 'Muk', poison, spriteUrl+'muk.png', 4, 0, 'Sludge Pokemon', [4]),
  new Pokemon(90, 'Shellder', water, spriteUrl+'shellder.png', 2, 0, 'Bivalve Pokemon', [4, 5]),
  new Pokemon(91, 'Cloyster', ice, spriteUrl+'cloyster.png', 4, 0, 'Bivalve Pokemon', [4]),
  new Pokemon(92, 'Gastly', ghost, spriteUrl+'gastly.png', 2, 0, 'Gas Pokemon', [4, 5]),
  new Pokemon(93, 'Haunter', ghost, spriteUrl+'haunter.png', 3, 0, 'Gas Pokemon', [1, 4]),
  new Pokemon(94, 'Gengar', ghost, spriteUrl+'gengar.png', 4, 0, 'Shadow Pokemon', [4]),
  new Pokemon(95, 'Onix', rock, spriteUrl+'onix.png', 3, 0, 'Rock Snake Pokemon', [3, 4, 5]),
  new Pokemon(96, 'Drowzee', psychic, spriteUrl+'drowzee.png', 1, 0, 'Hypnosis Pokemon', [4, 5]),
  new Pokemon(97, 'Hypno', psychic, spriteUrl+'hypno.png', 3, 0, 'Hypnosis Pokemon', [4]),
  new Pokemon(98, 'Krabby', water, spriteUrl+'krabby.png', 3, 0, 'River Crab Pokemon', [4, 5]),
  new Pokemon(99, 'Kingler', water, spriteUrl+'kingler.png', 4, 0, 'Pincer Pokemon', [1, 4]),
  new Pokemon(100, 'Voltorb', electric, spriteUrl+'voltorb.png', 1, 0, 'Ball Pokemon', [4, 5]),
  new Pokemon(101, 'Electrode', electric, spriteUrl+'electrode.png', 3, 0, 'Ball Pokemon', [4]),
  new Pokemon(102, 'Exeggcute', grass, spriteUrl+'exeggcute.png', 3, 0, 'Egg Pokemon', [4, 5]),
  new Pokemon(103, 'Exeggutor', grass, spriteUrl+'exeggutor.png', 5, 0, 'Coconut Pokemon', [4]),
  new Pokemon(104, 'Cubone', ground, spriteUrl+'cubone.png', 3, 0, 'Lonely Pokemon', [4, 5]),
  new Pokemon(105, 'Marowak', ground, spriteUrl+'marowak.png', 4, 0, 'Bone Keeper Pokemon', [4]),
  new Pokemon(106, 'Hitmonchan', fighting, spriteUrl+'hitmonchan.png', 5, 0, 'Kicking Pokemon', [4, 5]),
  new Pokemon(107, 'Hitmonlee', fighting, spriteUrl+'hitmonlee.png', 5, 0, 'Punching Pokemon', [4, 5]),
  new Pokemon(108, 'Lickitung', normal, spriteUrl+'lickitung.png', 4, 0, 'Licking Pokemon', [4, 5]),
  new Pokemon(109, 'Koffing', poison, spriteUrl+'koffing.png', 2, 0, 'Poison Gas Pokemon', [4, 5]),
  new Pokemon(110, 'Weezing', poison, spriteUrl+'weezing.png', 4, 0, 'Poison Gas Pokemon', [4]),
  new Pokemon(111, 'Rhyhorn', rock, spriteUrl+'rhyhorn.png', 3, 0, 'Spikes Pokemon', [4, 5]),
  new Pokemon(112, 'Rhydon', rock, spriteUrl+'rhydon.png', 4, 0, 'Drill Pokemon', [4]),
  new Pokemon(113, 'Chansey', normal, spriteUrl+'chansey.png', 4, 0, 'Egg Pokemon', [4, 5]),
  new Pokemon(114, 'Tangela', grass, spriteUrl+'tangela.png', 4, 0, 'Vine Pokemon', [4, 5]),
  new Pokemon(115, 'Kangaskhan', normal, spriteUrl+'kangaskhan.png', 4, 0, 'Parent Pokemon', [4, 5]),
  new Pokemon(116, 'Horsea', water, spriteUrl+'horsea.png', 1, 0, 'Dragon Pokemon', [2, 4, 5]),
  new Pokemon(117, 'Seadra', water, spriteUrl+'seadra.png', 2, 0, 'Dragon Pokemon', [4]),
  new Pokemon(118, 'Goldeen', water, spriteUrl+'goldeen.png', 3, 0, 'Goldfish Pokemon', [2, 4, 5]),
  new Pokemon(119, 'Seaking', water, spriteUrl+'seaking.png', 4, 0, 'Goldfish Pokemon', [4]),
  new Pokemon(120, 'Staryu', water, spriteUrl+'staryu.png', 1, 0, 'Star Shape Pokemon', [2, 4, 5]),
  new Pokemon(121, 'Starmie', water, spriteUrl+'starmie.png', 2, 0, 'Mysterious Pokemon', [2, 4]),
  new Pokemon(122, 'Mr. Mime', psychic, spriteUrl+'mr-mime.png', 4, 0, 'Barrier Pokemon', [4, 5]),
  new Pokemon(123, 'Scyther', bug, spriteUrl+'scyther.png', 4, 0, 'Mantis Pokemon', [4, 5]),
  new Pokemon(124, 'Jynx', psychic, spriteUrl+'jynx.png', 4, 0, 'Human Shape Pokemon', [4, 5]),
  new Pokemon(125, 'Electabuzz', electric, spriteUrl+'electabuzz.png', 5, 0, 'Electric Pokemon', [4, 5]),
  new Pokemon(126, 'Magmar', fire, spriteUrl+'magmar.png', 5, 0, 'Spitfire Pokemon', [4, 5]),
  new Pokemon(127, 'Pinsir', bug, spriteUrl+'pinsir.png', 5, 0, 'Stag Beetle Pokemon', [4, 5]),
  new Pokemon(128, 'Tauros', normal, spriteUrl+'tauros.png', 4, 0, 'Wild Bull Pokemon', [1, 4, 5]),
  new Pokemon(129, 'Magikarp', water, spriteUrl+'magikarp.png', 1, 0, 'Fish Pokemon', [4, 5]),
  new Pokemon(130, 'Gyarados', water, spriteUrl+'gyarados.png', 5, 0, 'Atrocious Pokemon', [4]),
  new Pokemon(131, 'Lapras', water, spriteUrl+'lapras.png', 4, 0, 'Transport Pokemon', [1, 4, 5]),
  new Pokemon(132, 'Ditto', normal, spriteUrl+'ditto.png', 4, 0, 'Transform Pokemon', [4, 5]),
  new Pokemon(133, 'Eevee', normal, spriteUrl+'eevee.png', 2, 0, 'Evolution Pokemon', [4, 5]),
  new Pokemon(134, 'Vaporeon', water, spriteUrl+'vaporeon.png', 4, 0, 'Bubble Jet Pokemon', [4]),
  new Pokemon(135, 'Jolteon', electric, spriteUrl+'jolteon.png', 4, 0, 'Lightning Pokemon', [4]),
  new Pokemon(136, 'Flareon', fire, spriteUrl+'flareon.png', 4, 0, 'Flame Pokemon', [4]),
  new Pokemon(137, 'Porygon', normal, spriteUrl+'porygon.png', 5, 0, 'Virtual Pokemon', [4, 5]),
  new Pokemon(138, 'Omanyte', water, spriteUrl+'omanyte.png', 4, 0, 'Spiral Pokemon', [4, 5]),
  new Pokemon(139, 'Omastar', water, spriteUrl+'omastar.png', 5, 0, 'Spiral Pokemon', [4]),
  new Pokemon(140, 'Kabuto', rock, spriteUrl+'kabuto.png', 4, 0, 'Shellfish Pokemon', [4, 5]),
  new Pokemon(141, 'Kabutops', rock, spriteUrl+'kabutops.png', 5, 0, 'Shellfish Pokemon', [4]),
  new Pokemon(142, 'Aerodactyl', flying, spriteUrl+'aerodactyl.png', 5, 0, 'Fossil Pokemon', [4, 5]),
  new Pokemon(143, 'Snorlax', normal, spriteUrl+'snorlax.png', 5, 0, 'Sleeping Pokemon', [1, 4, 5]),
  new Pokemon(144, 'Articuno', ice, spriteUrl+'articuno.png', 6, 0, 'Freeze Pokemon', [4]),
  new Pokemon(145, 'Zapdos', electric, spriteUrl+'zapdos.png', 6, 0, 'Electric Pokemon', [4]),
  new Pokemon(146, 'Moltres', fire, spriteUrl+'moltres.png', 6, 0, 'Flame Pokemon', [4]),
  new Pokemon(147, 'Dratini', dragon, spriteUrl+'dratini.png', 4, 0, 'Dragon Pokemon', [4, 5]),
  new Pokemon(148, 'Dragonair', dragon, spriteUrl+'dragonair.png', 5, 0, 'Dragon Pokemon', [4]),
  new Pokemon(149, 'Dragonite', dragon, spriteUrl+'dragonite.png', 6, 0, 'Dragon Pokemon', [4]),
  new Pokemon(150, 'Mewtwo', psychic, spriteUrl+'mewtwo.png', 6, 0, 'Genetic Pokemon', [4]),
  new Pokemon(151, 'Mew', psychic, spriteUrl+'mew.png', 7, 0, 'New Species Pokemon', [4]),
]

var tokens = [
  new Token('1', '1', 'Bulbasaur', grass, 1),
  new Token('4', '1', 'Charmander', fire, 3),
  new Token('7', '1', 'Squirtle', water, 5),
]

const tokensById = {}
const tokenIdsByUser = {
  ['1']: [],
}
let nextTokenId = 0

module.exports = {
  User: User,
  Trainer: Trainer,
  Pokemon: Pokemon,
  Token: Token,

  getUser: function(id) {
    return users.filter(function(user) {
      return user.id == id
    })[0]
  },
  getAnonymousUser: function() { return users[0] },

  getTrainer: function(id) {
    return trainers.filter(function(trainer) {
      return trainer.id == id
    })[0]
  },
  getTrainersByUser: function(userId) {
    return trainers.filter(function(t) {
      return t.userId == userId
    })
  },

  // getToken: function(id) {
  //   console.log('trying to get the token that has the id ', id)
  //   return tokens.filter(function(token) {
  //     console.log('comparing token id of ', token.name, ': ', token.id, id)
  //     console.log(token.id == id)
  //     return token.id == id
  //   })[0]
  // },
  getTokensByUser: function(userId) {
    return tokens.filter(function(t) {
      return t.userId == userId
    })
  },

  // Mock token data
  addToken(name, attribute, amount) {
    console.log('addToken', name, attribute, amount)
    const token = new Token('', '1', name, attribute, amount)
    token.id = `${nextTokenId++}`
    console.log('the token id will be...', token.id)
    tokensById[token.id] = token
    tokenIdsByUser['1'].push(token.id)
    return token.id
  },
  getToken(id) {
    console.log('getToken', id)
    return tokensById[id]
  },

  getPokemon: function(id) {
    return pokemons.filter(function(pokemon) {
      return pokemon.id == id
    })[0]
  },
  getPokemonsByTrainer: function(trainerId) {
    var confs = []
    pokemons.forEach(function(conf) {
      conf.owners.forEach(function(trainer) {
        if (trainer == trainerId) {
          confs.push(conf)
        }
      })
    })
    return confs
  },
  getWildPokemons: function() {
    console.log("pokemons are returning!!!!!!", pokemons);
    return pokemons;
  },
}
