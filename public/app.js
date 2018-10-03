/*

  Blizzard API project searching up characters on WOW.

  Things to show when characters are searched
    - Basic info (name, level, server name, race, faction, gender, guild name, pvp points, profession, talents)
    - gear (mount, items, money, hunter pets, non-hunter pets, )

*/

(function() {
  //obj created to use with data from the api
  const classObj = {
    1: "warrior",
    2: "paladin",
    3: "hunter",
    4: "rogue",
    5: "priest",
    6: "shaman",
    7: "mage",
    8: "warlock",
    9: "monk",
    10: "druid",
    11: "death knight",
    12: "demon hunter"
  };
  const gender = {
    0: "male",
    1: "female"
  };
  const race = {
    horde: {
      2: "orc",
      5: "undead",
      6: "tauren",
      8: "troll",
      9: "goblin",
      10: "blood elf",
      26: "pandaren",
      27: "nightborne",
      28: "highmountain tauren",
      36: "mag'har orc"
    },
    alliance: {
      1: "human",
      3: "dwarf",
      4: "night elf",
      7: "gnome",
      11: "draenei",
      22: "worgen",
      25: "pandaren",
      29: "void elf",
      30: "lightforged draenei",
      34: "dark iron dwarf"
    },
    neutral: {
      24: "pandera"
    }
  };

  /*
    API variables
  */
  // need to import key from separate js file eventually
  //import key from "./config";
  const key = "k4sxgysn4bxs44acdvas7p3p53s52ygc";
  const baseUrl = "https://us.api.battle.net/wow/character/";
  const queryStr = "?locale=en_US&apikey=";

  //html element and value variables
  const serverName = document.querySelector(".server-name");
  const charName = document.querySelector(".character-name");
  const btn = document.querySelector(".btn");

  const data = {};

  /*
    click action fn
  */
  // btn.addEventListener("click", function(evt) {
  //   // evt.preventDefault();
  //   // const charDataUrl = baseUrl + serverName.value + "/" + charName.value + queryStr + key;
  //   // const charTalentUrl = baseUrl + serverName.value + "/" + charName.value + "?fields=talents" + queryStr.replace("?", "&") + key;
  //   // getCharData(charDataUrl);
  //   // getCharTalents(charTalentUrl);
  // });

  btn.addEventListener("click", function(evt) {
    evt.preventDefault();
    console.log("click");
    data.serverName = serverName.value.toLowerCase();
    data.charName = charName.value.toLowerCase();
    $.ajax({
      type: "POST",
      url: '/',
      dataType: 'json',
      data : data,
      success: function(data){
        //data = JSON.parse(data);
        console.log(data);
      }
    });
  });

  //postTestData('/');

  //getTestData("/test")

})();

function getTestData(url){
  return fetch(url)
    .then(res => res.json())
    .then(data => {
      console.log(data);
    })
    .catch(err => {
      console.log(err);
    });
}

function postTestData(url){
  // fetch method
  // return fetch(url, {
  //   method: "POST"
  // }).then(function(data){
  //   console.log(data)
  // }).catch(function(err){
  //   console.log(err);
  // });

  //jquery
  // $.ajax({
  //   type: "POST",
  //   url: '/',
  //   dataType: 'json',
  //   data : data,
  //   success: function(data){
  //     data = JSON.parse(data);
  //     displayData(data);
  //   }
  // });
};

// action functions!
function getCharData(url) {
  fetch(url)
    .then(res => res.json())
    .then(data => {
      console.log(data);
      renderCharData(data);
    })
    .catch(err => {
      console.log(err);
    });
};

function getCharTalents(url) {
  fetch(url)
    .then(res => res.json())
    .then(data => {
      console.log("talent: ", data);
    })
    .catch(err => {
      console.log(err);
    });
};

function renderCharData(data){
  const name = document.querySelector(".char-name");
  const spec = document.querySelector(".char-spec");
  const charClass = document.querySelector(".char-class");
  const server = document.querySelector(".char-server");
  name.append(data.name);
  //spec.append(data.name);
  charClass.append(data.class);
  server.append(data.realm);
};

function renderCharClass(data, obj){
  /*
  if data.class === obj[prop]
    show character server name
  */
}
