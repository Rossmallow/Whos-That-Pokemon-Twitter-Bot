/* A Twitterbot made by @Rossmallow
 * GitHub.com/Rossmallow
 * LinkedIn.com/in/RossNel
*/

var Twit = require('twit')

var fs = require('fs'),
    path = require('path'),
    Twit = require('twit'),
    config = require(path.join(__dirname, 'config.js'));

var T = new Twit(config);

var number = "";

var current_date = new Date();

var rand = 0;

var pokemon = [
  '0002_Ivysaur.jpg',
  '0003_Venusaur.jpg',
  '0006_Charizard.jpg',
  '0009_Blastoise.jpg',
  '0012_Butterfree.jpg',
  '0015_Beedrill.jpg',
  '0016_Pidgey.jpg',
  '0025_Pikachu.jpg',
  '0039_Jigglypuff.jpg',
  '0054_Psyduck.jpg',
  '0059_Arcanine.jpg',
  '0063_Abra.jpg',
  '0084_Doduo.jpg',
  '0103_Alolan_Exeggutor.jpg',
  '0125_Electabuzz.jpg',
  '0127_Pinsir.jpg',
  '0131_Lapras.jpg',
  '0133_Eevee.jpg',
  '0136_Flareon.jpg',
  '0144_Arcticuno.jpg',
  '0149_Dragonite.jpg',
  '0150_Mewtwo.jpg',
  '0151_Mew.jpg',
  '0154_Meganium.jpg',
  '0185_Sudowoodo.jpg',
  '0196_Espeon.jpg',
  '0205_Forretress.jpg',
  '0220_Swinub.jpg',
  '0222_Corsola.jpg',
  '0227_Skarmory.jpg',
  '0246_Larvatar.jpg',
  '0255_Torchic.jpg',
  '0266_Silcoon.jpg',
  '0287_Slakoth.jpg',
  '0293_Whismur.jpg',
  '0296_Makuhita.jpg',
  '0311_Plusle.jpg',
  '0371_Bagon.jpg',
  '0379_Registeel.jpg',
  '0448_Lucario.jpg',
  '0482_Azelf.jpg',
  '0483_Dialga.jpg',
  '0487_Giratina_(Origin_Forme).jpg',
  '0500_Emboar.jpg',
  '0516_Simipour.jpg',
  '0577_Solosis.jpg',
  '0584_Vanillite.jpg',
  '0612_Haxorus.jpg',
  '0639_Terrakion.jpg',
  '0650_Chespin.jpg',
  '0659_Bunnelby.jpg',
  '0663_Talonflame.jpg',
  '0666_Vivillon.jpg',
  '0692_Clauncher.jpg',
  '0720_Hoopa.jpg',
  '0721_Volcanion.jpg',
  '0722_Rowlet.jpg',
  '0731_Pikipek.jpg',
  '0754_Lurantis.jpg',
  '0761_Bounsweet.jpg',
  '0791_Solgaleo.jpg'
];

function pick_random_pokemon() {
  rand = Math.floor(Math.random() * pokemon.length);
  return pokemon[rand];
}

function upload_random_hidden_pokemon() {
  console.log('Opening an image...');
    // Remove '_branding' to havae pictures without the PokéDemons's badge
  var image_path = path.join(__dirname, '/hidden_pokemon/' + pick_random_pokemon()),
      b64content = fs.readFileSync(image_path, { encoding: 'base64' });

  console.log('Uploading an image...');

  T.post('media/upload', { media_data: b64content }, function (err, data, response) {
    if (err){
      console.log('ERROR');
      console.log(err);
    }
    else{
      console.log('Uploaded an image!');

      T.post('statuses/update', {
        status: "Who's that Pokémon?", media_ids: new Array(data.media_id_string)
      },
        function(err, data, response) {
          if (err){
            console.log('Error!');
            console.log(err);
          }
          else{
            console.log('Posted an image!');
          }
        }
      );
    }
  });
}

function reveal_hidden_pokemon() {
  console.log('Opening an image...');
  // Remove '_branding' to havae pictures without the PokéDemons's badge
  var image_path = path.join(__dirname, '/revealed_pokemon/' + pokemon[rand]),
      b64content = fs.readFileSync(image_path, { encoding: 'base64' });

  console.log('Uploading an image...');

  T.post('media/upload', { media_data: b64content }, function (err, data, response) {
    if (err){
      console.log('ERROR');
      console.log(err);
    }
    else{
      console.log('Uploaded an image!');
      number = pokemon[rand].substring(1, 4);
      T.post('statuses/update', {
        // The substring is to make the pokédex number 3 digits rather than 4. To have 4 digits change the substring to 0.
        status: "It's #" + pokemon[rand].substring(1).replace("_", ", ").replace(".jpg", "!").replace("*", " ") + " #WTPWednesday" + "\n http://serebii.net/pokedex-sm/" + number + ".shtml", media_ids: new Array(data.media_id_string)
      },
        function(err, data, response) {
          if (err){
            console.log('Error!');
            console.log(err);
          }
          else{
            console.log('Posted an image!');
          }
        }
      );
    }
  });
}
console.log(current_date.getDate());
if (current_date.getDate() == 2) {
  setImmediate(upload_random_hidden_pokemon);
  setTimeout(reveal_hidden_pokemon, 43200000);
}
else {
  console.log("It's not Wednesday.");
}
