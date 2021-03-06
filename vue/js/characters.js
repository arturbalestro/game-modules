function character(name, job, race, imagemodel) {
	this.name = name;
	this.gender = "";
	this.job = job;
	this.race = race;
	this.aspect = "";
	this.weapon = "";
	this.ability = "";
	this.face = "img/chars/faces/"+imagemodel+".jpg";
	this.battler = "img/chars/battlers/"+imagemodel+".png";
	this.sprite = "img/chars/sprites/"+imagemodel+".png";
  this.size = "";
	this.spw = 32; //The initial width of the sprite.
	this.sph = 48;	//The initial height of the sprite.
	this.distx = 0; //Additional distance modifier. Helps positioning larger sprite images.
	this.disty = 0;
	this.x = 0;
  this.y = 130;
  this.sx = 0;
  this.sy = 96;
  this.faceRight = false;
  this.faceLeft = false;
  this.faceUp = false;
  this.faceDown = false;
  this.counter = 0;
  this.step = 15;
  this.nextStep = 0;
  this.endStep = 60;
  this.start = {
    rightX: 0,
    leftX: 0,
    upX: 0,
    downX: 0,
    rightY: 96,
    leftY: 48,
    upY: 144,
    downY: 0
  }
};

/*Name Homages:
Suikoden 1 - Odessa (Samurai)
Suikoden 2 - Neclord (Vampire)
Suikoden 3 - Bazba (Lizard)
Suikoden 4 - Helga (Female Warrior)
Suikoden 5 - Ferid (Male Thief)
Wild Arms 1 - Zed (Male Knight)
Wild Arms 2 - Marivel (Female Cleric)
Wild Arms 3 - Virginia (Fortune Teller)
Wild Arms 4 - Gawn (Gunner)
Wild Arms 5 - Fereydoon (Lancer)
Tales of Phantasia - Arche (Archer)
Tales of Destiny - Philia (Nun)
Tales of Eternia - Hyades (Demon)
Tales of the Abyss - Anise (Female Monk)
Tales of Symphonia - Genis (Male Monk)
Tales of Legendia - Senel (Male Cleric)
Tales of Xillia - Muzet (Fairy)
Breath of Fire 1 - Bleu (Lamia)
Breath of Fire 4 - Ershin (Witch)
Fire Emblem - Duessel (Male Warrior)
Legend of Mana - Elle (Harpy)
Star Ocean 3 - Albel (King)
Chrono Trigger - Magus (Male Mage)
Chrono Cross - Steena (Queen)
Persona 3 - Koromaru (Wolf)
Persona 4 - Dojima (Alchemist)
.hack - Mistral (Angel)
.hack G.U. - Alkaid (Female Thief)
Ar Tonelico - Mir (Female Mage)
Ar Tonelico 2 - Leglius (Ninja)
Grandia 3 - Ulf (Imp)
Rogue Galaxy - Lilika (Female Knight)
*/

var roster = [];

var albel = new character("albel", "Warrior", "Human", "king");
albel.gender = "M";
albel.aspect = "Arrogance";
albel.weapon = "Longsword";
albel.ability = "Morale Boost";

var alkaid = new character("alkaid", "Thief", "Human", "femalethief");
alkaid.gender = "F";
alkaid.aspect = "Mistrust";
alkaid.weapon = "Twin Daggers";
alkaid.ability = "Stealth Attack";

var anise = new character("anise", "Monk", "Human", "femalemonk");
anise.gender = "F";
anise.aspect = "Mistrust";
anise.weapon = "Twin Daggers";
anise.ability = "Stealth Attack";

var arche = new character("arche", "Archer", "Elf", "archer");
arche.gender = "F";
arche.aspect = "Mistrust";
arche.weapon = "Twin Daggers";
arche.ability = "Stealth Attack";

var bazba = new character("bazba", "Warrior", "Lizard", "lizard");
bazba.gender = "M";
bazba.aspect = "Anger";
bazba.weapon = "Pickaxe";
bazba.ability = "Dirt Pick";
bazba.spw = 48;
bazba.sph = 64;
bazba.distx = 8;
bazba.disty = 14;
bazba.start.leftY = 64;
bazba.start.rightY = 128;
bazba.start.upY = 192;
bazba.size = "-big";

var bleu = new character("bleu", "Drainer", "Lamia", "lamia");
bleu.gender = "F";
bleu.aspect = "Mischief";
bleu.weapon = "Hair Whip";
bleu.ability = "Poison Bite";
bleu.spw = 48;
bleu.distx = 8;
bleu.size = "-medium";

var dojima = new character("dojima", "Alchemist", "Human", "alchemist");
dojima.gender = "M";
dojima.aspect = "Hate";
dojima.weapon = "Battleaxe";
dojima.ability = "Vicious Cut";

var duessel = new character("duessel", "Warrior", "Elf", "malewarrior");
duessel.gender = "M";
duessel.aspect = "Hate";
duessel.weapon = "Battleaxe";
duessel.ability = "Vicious Cut";

var elle = new character("elle", "Bard", "Harpy", "harpy");
elle.gender = "F";
elle.aspect = "Arrogance";
elle.weapon = "Metal Claws";
elle.ability = "Sonic Strike";
elle.spw = 64;
elle.sph = 64;
elle.distx = 16;
elle.disty = 10;
elle.start.leftY = 64;
elle.start.rightY = 128;
elle.start.upY = 192;
elle.size = "-large";

var ershin = new character("ershin", "Sorceress", "Human", "witch");
ershin.gender = "F";
ershin.aspect = "Hate";
ershin.weapon = "Battleaxe";
ershin.ability = "Vicious Cut";

var fereydoon = new character("fereydoon", "Lancer", "Human", "lancer");
fereydoon.gender = "M";
fereydoon.aspect = "Mistrust";
fereydoon.weapon = "Twin Daggers";
fereydoon.ability = "Stealth Attack";

var ferid = new character("ferid", "Thief", "Human", "malethief");
ferid.gender = "M";
ferid.aspect = "Mistrust";
ferid.weapon = "Twin Daggers";
ferid.ability = "Stealth Attack";

var gawn = new character("gawn", "Gunner", "Human", "gunner");
gawn.gender = "M";
gawn.aspect = "Mistrust";
gawn.weapon = "Clear Shot";
gawn.ability = "Stealth Attack";

var genis = new character("genis", "Monk", "Human", "malemonk");
genis.gender = "M";
genis.aspect = "Mistrust";
genis.weapon = "Twin Daggers";
genis.ability = "Stealth Attack";

var helga = new character("helga", "Warrior", "Human", "femalewarrior");
helga.gender = "F";
helga.aspect = "Hate";
helga.weapon = "Halberd";
helga.ability = "Stealth Attack";

var hyades = new character("hyades", "Sorcerer", "Demon", "demon");
hyades.gender = "M";
hyades.aspect = "Hate";
hyades.weapon = "Halberd";
hyades.ability = "Stealth Attack";
hyades.spw = 64;
hyades.sph = 64;
hyades.distx = 16;
hyades.disty = 14;
hyades.start.leftY = 64;
hyades.start.rightY = 128;
hyades.start.upY = 192;
hyades.size = "-large";

var koromaru = new character("koromaru", "Warrior", "Wolf", "wolf");
koromaru.gender = "M";
koromaru.aspect = "Hate";
koromaru.weapon = "Halberd";
koromaru.ability = "Stealth Attack";

var leglius = new character("leglius", "Ninja", "Orc", "ninja");
leglius.gender = "M";
leglius.aspect = "Hate";
leglius.weapon = "Halberd";
leglius.ability = "Stealth Attack";

var lilika = new character("lilika", "Knight", "Human", "femaleknight");
lilika.gender = "F";
lilika.aspect = "Hate";
lilika.weapon = "Halberd";
lilika.ability = "Stealth Attack";

var magus = new character("magus", "Mage", "Elf", "malemage");
magus.gender = "M";
magus.aspect = "Hate";
magus.weapon = "Halberd";
magus.ability = "Stealth Attack";

var marivel = new character("marivel", "Cleric", "Elf", "femalecleric");
marivel.gender = "F";
marivel.aspect = "Hyperactivity";
marivel.weapon = "Tri-Chain Staff";
marivel.ability = "Healing Beam";

var mir = new character("mir", "Mage", "Human", "femalemage");
mir.gender = "F";
mir.aspect = "Hyperactivity";
mir.weapon = "Tri-Chain Staff";
mir.ability = "Healing Beam";

var mistral = new character("mistral", "Bard", "Angel", "angel");
mistral.gender = "F";
mistral.aspect = "Hyperactivity";
mistral.weapon = "Tri-Chain Staff";
mistral.ability = "Healing Beam";
mistral.spw = 64;
mistral.sph = 64;
mistral.distx = 16;
mistral.disty = 14;
mistral.start.leftY = 64;
mistral.start.rightY = 128;
mistral.start.upY = 192;
mistral.size = "-large";

var muzet = new character("muzet", "Shapeshifter", "Fairy", "fairy");
muzet.gender = "F";
muzet.aspect = "Desperation";
muzet.weapon = "Magic Powder";
muzet.ability = "Makeover";
muzet.sph = 32;
muzet.start.leftY = 32;
muzet.start.rightY = 64;
muzet.start.upY = 96;
muzet.size = "-small";

var neclord = new character("neclord", "Drainer", "Vampire", "vampire");
neclord.gender = "M";
neclord.aspect = "Mischief";
neclord.weapon = "Draining Gloves";
neclord.ability = "Bloodsuck";
neclord.spw = 48;
neclord.distx = 8;
neclord.size = "-medium";

var odessa = new character("odessa", "Ninja", "Human", "samurai");
odessa.gender = "F";
odessa.aspect = "Desperation";
odessa.weapon = "Magic Powder";
odessa.ability = "Makeover";

var philia = new character("philia", "Cleric", "Human", "nun");
philia.gender = "F";
philia.aspect = "Desperation";
philia.weapon = "Magic Powder";
philia.ability = "Makeover";

var senel = new character("senel", "Cleric", "Human", "malecleric");
senel.gender = "M";
senel.aspect = "Mischief";
senel.weapon = "Draining Gloves";
senel.ability = "Bloodsuck";

var steena = new character("steena", "Sorceress", "Human", "queen");
steena.gender = "F";
steena.aspect = "Desperation";
steena.weapon = "Magic Powder";
steena.ability = "Makeover";

var ulf = new character("ulf", "Drainer", "Imp", "imp");
ulf.gender = "M";
ulf.aspect = "Mischief";
ulf.weapon = "Draining Gloves";
ulf.ability = "Bloodsuck";

var virginia = new character("virginia", "Sorceress", "Human", "fortuneteller");
virginia.gender = "F";
virginia.aspect = "Desperation";
virginia.weapon = "Magic Powder";
virginia.ability = "Makeover";

var zed = new character("zed", "Knight", "Human", "maleknight");
zed.gender = "M";
zed.aspect = "Mischief";
zed.weapon = "Draining Gloves";
zed.ability = "Bloodsuck";

roster.push(albel, alkaid, anise, arche, bazba, bleu, dojima, duessel, elle, ershin, fereydoon, ferid, gawn, genis, helga, hyades, koromaru, leglius, lilika, magus, marivel, mir, mistral, muzet, neclord, odessa, philia, senel, steena, ulf, virginia, zed);
console.log(roster);

for(var i = 0; i < roster.length; i++) {
	roster[i].id = i;
}
