export function Pokemon(entryNumber, name, pokemonType, image, canEvolve, caught, species, unlocked, owners) {
  this.id = entryNumber.toString()
  this.entryNumber = entryNumber
  this.name = name
  this.pokemonType = pokemonType
  this.image = image
  this.canEvolve = canEvolve
  this.caught = caught
  this.species = species
  this.unlocked = unlocked
  this.owners = owners
}

var grass = 'Grass', water = 'Water', fire = 'Fire', bug = 'Bug',
	psychic = 'Psychic', flying = 'Flying', ghost = 'Ghost', fighting = 'Fighting',
	normal = 'Normal', poison = 'Poison', electric = 'Electric', ground = 'Ground',
	fairy = 'Fairy', rock = 'Rock', ice = 'Ice', dragon = 'Dragon'

var imageUrl = 'https://img.pokemondb.net/artwork/';
var spriteUrl = 'https://img.pokemondb.net/sprites/black-white/normal/';

var pokemons = [
  new Pokemon(1, 'Bulbasaur', grass, spriteUrl+'bulbasaur.png', true, 0, 'Seed Pokemon', false, [0, 1, 4, 5, 6]),
  new Pokemon(2, 'Ivysaur', grass, spriteUrl+'ivysaur.png', true, 0, 'Seed Pokemon', false, [4]),
  new Pokemon(3, 'Venusaur', grass, spriteUrl+'venusaur.png', false, 0, 'Seed Pokemon', false, [4]),
  new Pokemon(4, 'Charmander', fire, spriteUrl+'charmander.png', true, 0, 'Lizard Pokemon', false, [0, 4, 5, 6]),
  new Pokemon(5, 'Charmeleon', fire, spriteUrl+'charmeleon.png', true, 0, 'Flame Pokemon', false, [4]),
  new Pokemon(6, 'Charizard', fire, spriteUrl+'charizard.png', false, 0, 'Flame Pokemon', false, [1, 4]),
  new Pokemon(7, 'Squirtle', water, spriteUrl+'squirtle.png', true, 0, 'Tiny Turtle Pokemon', false, [0, 1, 4, 5, 6]),
  new Pokemon(8, 'Wartortle', water, spriteUrl+'wartortle.png', true, 0, 'Turtle Pokemon', false, [4]),
  new Pokemon(9, 'Blastoise', water, spriteUrl+'blastoise.png', false, 0, 'Shellfish Pokemon', false, [4]),
  new Pokemon(10, 'Caterpie', bug, spriteUrl+'caterpie.png', true, 0, 'Worm Pokemon', false, [0, 4, 5]),
  new Pokemon(11, 'Metapod', bug, spriteUrl+'metapod.png', true, 0, 'Cocoon Pokemon', false, [4]),
  new Pokemon(12, 'Butterfree', bug, spriteUrl+'butterfree.png', false, 0, 'Butterfly Pokemon', false, [1, 4]),
  new Pokemon(13, 'Weedle', bug, spriteUrl+'weedle.png', true, 0, 'Hairy Bug Pokemon', false, [0, 4, 5]),
  new Pokemon(14, 'Kakuna', bug, spriteUrl+'kakuna.png', true, 0, 'Cocoon Pokemon', false, [4]),
  new Pokemon(15, 'Beedrill', bug, spriteUrl+'beedrill.png', false, 0, 'Poison Bee Pokemon', false, [4]),
  new Pokemon(16, 'Pidgey', flying, spriteUrl+'pidgey.png', true, 0, 'Tiny Bird Pokemon', false, [0, 4, 5]),
  new Pokemon(17, 'Pidgeotto', flying, spriteUrl+'pidgeotto.png', true, 0, 'Bird Pokemon', false, [4]),
  new Pokemon(18, 'Pidgeot', flying, spriteUrl+'pidgeot.png', false, 0, 'Bird Pokemon', false, [1, 4]),
  new Pokemon(19, 'Rattata', normal, spriteUrl+'rattata.png', true, 0, 'Mouse Pokemon', false, [0, 4, 5]),
  new Pokemon(20, 'Raticate', normal, spriteUrl+'raticate.png', false, 0, 'Mouse Pokemon', false, [4]),
  new Pokemon(21, 'Spearow', flying, spriteUrl+'spearow.png', true, 0, 'Tiny Bird Pokemon', false, [0, 4, 5]),
  new Pokemon(22, 'Fearow', flying, spriteUrl+'fearow.png', false, 0, 'Beak Pokemon', false, [4]),
  new Pokemon(23, 'Ekans', poison, spriteUrl+'ekans.png', true, 0, 'Snake Pokemon', false, [0, 4, 5]),
  new Pokemon(24, 'Arbok', poison, spriteUrl+'arbok.png', false, 0, 'Cobra Pokemon', false, [4]),
  new Pokemon(25, 'Pikachu', electric, spriteUrl+'pikachu.png', true, 0, 'Mouse Pokemon', false, [0, 1, 4, 5]),
  new Pokemon(26, 'Raichu', electric, spriteUrl+'raichu.png', false, 0, 'Mouse Pokemon', false, [4]),
  new Pokemon(27, 'Sandshrew', ground, spriteUrl+'sandshrew.png', true, 0, 'Mouse Pokemon', false, [0, 4, 5]),
  new Pokemon(28, 'Sandslash', ground, spriteUrl+'sandslash.png', false, 0, 'Mouse Pokemon', false, [4]),
  new Pokemon(29, 'Nidoran F', poison, spriteUrl+'nidoran-f.png', true, 0, 'Poison Pin Pokemon', false, [0, 4, 5]),
  new Pokemon(30, 'Nidorina', poison, spriteUrl+'nidorina.png', true, 0, 'Poison Pin Pokemon', false, [4]),
  new Pokemon(31, 'Nidoqueen', poison, spriteUrl+'nidoqueen.png', false, 0, 'Drill Pokemon', false, [4]),
  new Pokemon(32, 'Nidoran M', poison, spriteUrl+'nidoran-m.png', true, 0, 'Poison Pin Pokemon', false, [0, 4, 5]),
  new Pokemon(33, 'Nidorino', poison, spriteUrl+'nidorino.png', true, 0, 'Poison Pin Pokemon', false, [4]),
  new Pokemon(34, 'Nidoking', poison, spriteUrl+'nidoking.png', false, 0, 'Drill Pokemon', false, [4]),
  new Pokemon(35, 'Clefairy', fairy, spriteUrl+'clefairy.png', true, 0, 'Fairy Pokemon', false, [0, 4, 5]),
  new Pokemon(36, 'Clefable', fairy, spriteUrl+'clefable.png', false, 0, 'Fairy Pokemon', false, [4]),
  new Pokemon(37, 'Vulpix', fire, spriteUrl+'vulpix.png', true, 0, 'Fox Pokemon', false, [0, 3, 4, 5]),
  new Pokemon(38, 'Ninetales', fire, spriteUrl+'ninetales.png', false, 0, 'Fox Pokemon', false, [4]),
  new Pokemon(39, 'Jigglypuff', fairy, spriteUrl+'jigglypuff.png', true, 0, 'Balloon Pokemon', false, [0, 4, 5]),
  new Pokemon(40, 'Wigglytuff', fairy, spriteUrl+'wigglytuff.png', false, 0, 'Balloon Pokemon', false, [4]),
  new Pokemon(41, 'Zubat', poison, spriteUrl+'zubat.png', true, 0, 'Bat Pokemon', false, [0, 4, 5]),
  new Pokemon(42, 'Golbat', poison, spriteUrl+'golbat.png', false, 0, 'Bat Pokemon', false, [4]),
  new Pokemon(43, 'Oddish', grass, spriteUrl+'oddish.png', true, 0, 'Weed Pokemon', false, [0, 4, 5]),
  new Pokemon(44, 'Gloom', grass, spriteUrl+'gloom.png', true, 0, 'Weed Pokemon', false, [4]),
  new Pokemon(45, 'Vileplume', grass, spriteUrl+'vileplume.png', false, 0, 'Flower Pokemon', false, [4]),
  new Pokemon(46, 'Paras', bug, spriteUrl+'paras.png', true, 0, 'Mushroom Pokemon', false, [0, 4, 5]),
  new Pokemon(47, 'Parasect', bug, spriteUrl+'parasect.png', false, 0, 'Mushroom Pokemon', false, [4]),
  new Pokemon(48, 'Venonat', bug, spriteUrl+'venonat.png', true, 0, 'Insect Pokemon', false, [0, 4, 5]),
  new Pokemon(49, 'Venomoth', bug, spriteUrl+'venomoth.png', false, 0, 'Poison Moth Pokemon', false, [4]),
  new Pokemon(50, 'Diglett', ground, spriteUrl+'diglett.png', true, 0, 'Mole Pokemon', false, [0, 4, 5]),
  new Pokemon(51, 'Dugtrio', ground, spriteUrl+'dugtrio.png', false, 0, 'Mole Pokemon', false, [4]),
  new Pokemon(52, 'Meowth', normal, spriteUrl+'meowth.png', true, 0, 'Scratch Cat Pokemon', false, [0, 4, 5]),
  new Pokemon(53, 'Persian', normal, spriteUrl+'persian.png', false, 0, 'Classy Cat Pokemon', false, [4]),
  new Pokemon(54, 'Psyduck', water, spriteUrl+'psyduck.png', true, 0, 'Duck Pokemon', false, [0, 2, 4, 5]),
  new Pokemon(55, 'Golduck', water, spriteUrl+'golduck.png', false, 0, 'Duck Pokemon', false, [4]),
  new Pokemon(56, 'Mankey', fighting, spriteUrl+'mankey.png', true, 0, 'Pig Monkey Pokemon', false, [0, 4, 5]),
  new Pokemon(57, 'Primeape', fighting, spriteUrl+'primeape.png', false, 0, 'Pig Monkey Pokemon', false, [1, 4]),
  new Pokemon(58, 'Growlithe', fire, spriteUrl+'growlithe.png', true, 0, 'Puppy Pokemon', false, [0, 4, 5]),
  new Pokemon(59, 'Arcanine', fire, spriteUrl+'arcanine.png', false, 0, 'Legendary Pokemon', false, [4]),
  new Pokemon(60, 'Poliwag', water, spriteUrl+'poliwag.png', true, 0, 'Tadpole Pokemon', false, [0, 2, 4, 5]),
  new Pokemon(61, 'Poliwhirl', water, spriteUrl+'poliwhirl.png', true, 0, 'Tadpole Pokemon', false, [4]),
  new Pokemon(62, 'Poliwrath', water, spriteUrl+'poliwrath.png', false, 0, 'Tadpole Pokemon', false, [4]),
  new Pokemon(63, 'Abra', psychic, spriteUrl+'abra.png', true, 0, 'Psi Pokemon', false, [0, 4, 5]),
  new Pokemon(64, 'Kadabra', psychic, spriteUrl+'kadabra.png', true, 0, 'Psi Pokemon', false, [4]),
  new Pokemon(65, 'Alakazam', psychic, spriteUrl+'alakazam.png', false, 0, 'Psi Pokemon', false, [4]),
  new Pokemon(66, 'Machop', fighting, spriteUrl+'machop.png', true, 0, 'Superpower Pokemon', false, [0, 4, 5]),
  new Pokemon(67, 'Machoke', fighting, spriteUrl+'machoke.png', true, 0, 'Superpower Pokemon', false, [4]),
  new Pokemon(68, 'Machamp', fighting, spriteUrl+'machamp.png', false, 0, 'Superpower Pokemon', false, [4]),
  new Pokemon(69, 'Bellsprout', grass, spriteUrl+'bellsprout.png', true, 0, 'Flower Pokemon', false, [0, 4, 5]),
  new Pokemon(70, 'Weepinbell', grass, spriteUrl+'weepinbell.png', true, 0, 'Flycatcher Pokemon', false, [4]),
  new Pokemon(71, 'Victreebel', grass, spriteUrl+'victreebel.png', false, 0, 'Flycatcher Pokemon', false, [4]),
  new Pokemon(72, 'Tentacool', water, spriteUrl+'tentacool.png', true, 0, 'Jellyfish Pokemon', false, [0, 4, 5]),
  new Pokemon(73, 'Tentacruel', water, spriteUrl+'tentacruel.png', false, 0, 'Jellyfish Pokemon', false, [4]),
  new Pokemon(74, 'Geodude', rock, spriteUrl+'geodude.png', true, 0, 'Rock Pokemon', false, [0, 3, 4, 5]),
  new Pokemon(75, 'Graveler', rock, spriteUrl+'graveler.png', true, 0, 'Rock Pokemon', false, [4]),
  new Pokemon(76, 'Golem', rock, spriteUrl+'golem.png', false, 0, 'Megaton Pokemon', false, [4]),
  new Pokemon(77, 'Ponyta', fire, spriteUrl+'ponyta.png', true, 0, 'Fire Horse Pokemon', false, [0, 4, 5]),
  new Pokemon(78, 'Rapidash', fire, spriteUrl+'rapidash.png', false, 0, 'Fire Horse Pokemon', false, [4]),
  new Pokemon(79, 'Slowpoke', water, spriteUrl+'slowpoke.png', true, 0, 'Dopey Pokemon', false, [0, 4, 5]),
  new Pokemon(80, 'Slowbro', water, spriteUrl+'slowbro.png', false, 0, 'Hermit Crab Pokemon', false, [4]),
  new Pokemon(81, 'Magnemite', electric, spriteUrl+'magnemite.png', true, 0, 'Magnet Pokemon', false, [0, 4, 5]),
  new Pokemon(82, 'Magneton', electric, spriteUrl+'magneton.png', false, 0, 'Magnet Pokemon', false, [4]),
  new Pokemon(83, 'Farfetch\'d', flying, spriteUrl+'farfetchd.png', false, 0, 'Wild Duck Pokemon', false, [0, 4, 5]),
  new Pokemon(84, 'Doduo', flying, spriteUrl+'doduo.png', true, 0, 'Twin Bird Pokemon', false, [0, 4, 5]),
  new Pokemon(85, 'Dodrio', flying, spriteUrl+'dodrio.png', false, 0, 'Triple Bird Pokemon', false, [4]),
  new Pokemon(86, 'Seel', water, spriteUrl+'seel.png', true, 0, 'Sea Lion Pokemon', false, [0, 2, 4, 5]),
  new Pokemon(87, 'Dewgong', ice, spriteUrl+'dewgong.png', false, 0, 'Sea Lion Pokemon', false, [4]),
  new Pokemon(88, 'Grimer', poison, spriteUrl+'grimer.png', true, 0, 'Sludge Pokemon', false, [0, 4, 5]),
  new Pokemon(89, 'Muk', poison, spriteUrl+'muk.png', false, 0, 'Sludge Pokemon', false, [4]),
  new Pokemon(90, 'Shellder', water, spriteUrl+'shellder.png', true, 0, 'Bivalve Pokemon', false, [0, 4, 5]),
  new Pokemon(91, 'Cloyster', ice, spriteUrl+'cloyster.png', false, 0, 'Bivalve Pokemon', false, [4]),
  new Pokemon(92, 'Gastly', ghost, spriteUrl+'gastly.png', true, 0, 'Gas Pokemon', false, [0, 4, 5]),
  new Pokemon(93, 'Haunter', ghost, spriteUrl+'haunter.png', true, 0, 'Gas Pokemon', false, [1, 4]),
  new Pokemon(94, 'Gengar', ghost, spriteUrl+'gengar.png', false, 0, 'Shadow Pokemon', false, [4]),
  new Pokemon(95, 'Onix', rock, spriteUrl+'onix.png', false, 0, 'Rock Snake Pokemon', false, [0, 3, 4, 5]),
  new Pokemon(96, 'Drowzee', psychic, spriteUrl+'drowzee.png', true, 0, 'Hypnosis Pokemon', false, [0, 4, 5]),
  new Pokemon(97, 'Hypno', psychic, spriteUrl+'hypno.png', false, 0, 'Hypnosis Pokemon', false, [4]),
  new Pokemon(98, 'Krabby', water, spriteUrl+'krabby.png', true, 0, 'River Crab Pokemon', false, [0, 4, 5]),
  new Pokemon(99, 'Kingler', water, spriteUrl+'kingler.png', false, 0, 'Pincer Pokemon', false, [1, 4]),
  new Pokemon(100, 'Voltorb', electric, spriteUrl+'voltorb.png', true, 0, 'Ball Pokemon', false, [0, 4, 5]),
  new Pokemon(101, 'Electrode', electric, spriteUrl+'electrode.png', false, 0, 'Ball Pokemon', false, [4]),
  new Pokemon(102, 'Exeggcute', grass, spriteUrl+'exeggcute.png', true, 0, 'Egg Pokemon', false, [0, 4, 5]),
  new Pokemon(103, 'Exeggutor', grass, spriteUrl+'exeggutor.png', false, 0, 'Coconut Pokemon', false, [4]),
  new Pokemon(104, 'Cubone', ground, spriteUrl+'cubone.png', true, 0, 'Lonely Pokemon', false, [0, 4, 5]),
  new Pokemon(105, 'Marowak', ground, spriteUrl+'marowak.png', false, 0, 'Bone Keeper Pokemon', false, [4]),
  new Pokemon(106, 'Hitmonchan', fighting, spriteUrl+'hitmonchan.png', false, 0, 'Kicking Pokemon', false, [0, 4, 5]),
  new Pokemon(107, 'Hitmonlee', fighting, spriteUrl+'hitmonlee.png', false, 0, 'Punching Pokemon', false, [0, 4, 5]),
  new Pokemon(108, 'Lickitung', normal, spriteUrl+'lickitung.png', false, 0, 'Licking Pokemon', false, [0, 4, 5]),
  new Pokemon(109, 'Koffing', poison, spriteUrl+'koffing.png', true, 0, 'Poison Gas Pokemon', false, [0, 4, 5]),
  new Pokemon(110, 'Weezing', poison, spriteUrl+'weezing.png', false, 0, 'Poison Gas Pokemon', false, [4]),
  new Pokemon(111, 'Rhyhorn', rock, spriteUrl+'rhyhorn.png', true, 0, 'Spikes Pokemon', false, [0, 4, 5]),
  new Pokemon(112, 'Rhydon', rock, spriteUrl+'rhydon.png', false, 0, 'Drill Pokemon', false, [4]),
  new Pokemon(113, 'Chansey', normal, spriteUrl+'chansey.png', false, 0, 'Egg Pokemon', false, [0, 4, 5]),
  new Pokemon(114, 'Tangela', grass, spriteUrl+'tangela.png', false, 0, 'Vine Pokemon', false, [0, 4, 5]),
  new Pokemon(115, 'Kangaskhan', normal, spriteUrl+'kangaskhan.png', false, 0, 'Parent Pokemon', false, [0, 4, 5]),
  new Pokemon(116, 'Horsea', water, spriteUrl+'horsea.png', true, 0, 'Dragon Pokemon', false, [0, 2, 4, 5]),
  new Pokemon(117, 'Seadra', water, spriteUrl+'seadra.png', false, 0, 'Dragon Pokemon', false, [4]),
  new Pokemon(118, 'Goldeen', water, spriteUrl+'goldeen.png', true, 0, 'Goldfish Pokemon', false, [0, 2, 4, 5]),
  new Pokemon(119, 'Seaking', water, spriteUrl+'seaking.png', false, 0, 'Goldfish Pokemon', false, [4]),
  new Pokemon(120, 'Staryu', water, spriteUrl+'staryu.png', true, 0, 'Star Shape Pokemon', false, [0, 2, 4, 5]),
  new Pokemon(121, 'Starmie', water, spriteUrl+'starmie.png', false, 0, 'Mysterious Pokemon', false, [2, 4]),
  new Pokemon(122, 'Mr. Mime', psychic, spriteUrl+'mr-mime.png', false, 0, 'Barrier Pokemon', false, [0, 4, 5]),
  new Pokemon(123, 'Scyther', bug, spriteUrl+'scyther.png', false, 0, 'Mantis Pokemon', false, [0, 4, 5]),
  new Pokemon(124, 'Jynx', psychic, spriteUrl+'jynx.png', false, 0, 'Human Shape Pokemon', false, [0, 4, 5]),
  new Pokemon(125, 'Electabuzz', electric, spriteUrl+'electabuzz.png', false, 0, 'Electric Pokemon', false, [0, 4, 5]),
  new Pokemon(126, 'Magmar', fire, spriteUrl+'magmar.png', false, 0, 'Spitfire Pokemon', false, [0, 4, 5]),
  new Pokemon(127, 'Pinsir', bug, spriteUrl+'pinsir.png', false, 0, 'Stag Beetle Pokemon', false, [0, 4, 5]),
  new Pokemon(128, 'Tauros', normal, spriteUrl+'tauros.png', false, 0, 'Wild Bull Pokemon', false, [0, 1, 4, 5]),
  new Pokemon(129, 'Magikarp', water, spriteUrl+'magikarp.png', true, 0, 'Fish Pokemon', false, [0, 4, 5]),
  new Pokemon(130, 'Gyarados', water, spriteUrl+'gyarados.png', false, 0, 'Atrocious Pokemon', false, [4]),
  new Pokemon(131, 'Lapras', water, spriteUrl+'lapras.png', false, 0, 'Transport Pokemon', false, [0, 1, 4, 5]),
  new Pokemon(132, 'Ditto', normal, spriteUrl+'ditto.png', false, 0, 'Transform Pokemon', false, [0, 4, 5]),
  new Pokemon(133, 'Eevee', normal, spriteUrl+'eevee.png', true, 0, 'Evolution Pokemon', false, [0, 4, 5]),
  new Pokemon(134, 'Vaporeon', water, spriteUrl+'vaporeon.png', false, 0, 'Bubble Jet Pokemon', false, [4]),
  new Pokemon(135, 'Jolteon', electric, spriteUrl+'jolteon.png', false, 0, 'Lightning Pokemon', false, [4]),
  new Pokemon(136, 'Flareon', fire, spriteUrl+'flareon.png', false, 0, 'Flame Pokemon', false, [4]),
  new Pokemon(137, 'Porygon', normal, spriteUrl+'porygon.png', false, 0, 'Virtual Pokemon', false, [0, 4, 5]),
  new Pokemon(138, 'Omanyte', water, spriteUrl+'omanyte.png', true, 0, 'Spiral Pokemon', false, [0, 4, 5]),
  new Pokemon(139, 'Omastar', water, spriteUrl+'omastar.png', false, 0, 'Spiral Pokemon', false, [4]),
  new Pokemon(140, 'Kabuto', rock, spriteUrl+'kabuto.png', true, 0, 'Shellfish Pokemon', false, [0, 4, 5]),
  new Pokemon(141, 'Kabutops', rock, spriteUrl+'kabutops.png', false, 0, 'Shellfish Pokemon', false, [4]),
  new Pokemon(142, 'Aerodactyl', flying, spriteUrl+'aerodactyl.png', false, 0, 'Fossil Pokemon', false, [0, 4, 5]),
  new Pokemon(143, 'Snorlax', normal, spriteUrl+'snorlax.png', false, 0, 'Sleeping Pokemon', false, [0, 1, 4, 5]),
  new Pokemon(144, 'Articuno', ice, spriteUrl+'articuno.png', false, 0, 'Freeze Pokemon', false, [4]),
  new Pokemon(145, 'Zapdos', electric, spriteUrl+'zapdos.png', false, 0, 'Electric Pokemon', false, [4]),
  new Pokemon(146, 'Moltres', fire, spriteUrl+'moltres.png', false, 0, 'Flame Pokemon', false, [4]),
  new Pokemon(147, 'Dratini', dragon, spriteUrl+'dratini.png', true, 0, 'Dragon Pokemon', false, [0, 4, 5]),
  new Pokemon(148, 'Dragonair', dragon, spriteUrl+'dragonair.png', true, 0, 'Dragon Pokemon', false, [4]),
  new Pokemon(149, 'Dragonite', dragon, spriteUrl+'dragonite.png', false, 0, 'Dragon Pokemon', false, [4]),
  new Pokemon(150, 'Mewtwo', psychic, spriteUrl+'mewtwo.png', false, 0, 'Genetic Pokemon', false, [4]),
  new Pokemon(151, 'Mew', psychic, spriteUrl+'mew.png', false, 0, 'New Species Pokemon', false, [4]),
]

export function getPokemon(id) {
  return pokemons.find(pk => pk.id === id);
}

export function getPokemons() { return pokemons; }

export function getPokemonsByTrainer(trainerId) {
  var confs = []
  pokemons.forEach(function(conf) {
    conf.owners.forEach(function(trainer) {
      if (trainer == trainerId) {
        confs.push(conf)
      }
    })
  })
  return confs
}
