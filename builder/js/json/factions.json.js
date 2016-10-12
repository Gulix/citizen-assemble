define([], function() {

function loadFactions() {

  var jsonFactions = [
  {
    "faction_key": "-0",
    "faction_label": "Any",
    "id": "00",
    "faction_color": "#000000"
  },
  {
    "faction_key": "-1",
    "faction_label": "Without",
    "id": "-1",
    "faction_color": "#000000"
  },
  {
    "faction_key": "-2",
    "faction_label": "Without (including Freelance)",
    "id": "-2",
    "faction_color": "#000000"
  },
  {
    "faction_key": "arc",
    "faction_label": "A.R.C.",
    "id": "AR",
    "faction_color": "#420202"
  },
  {
    "faction_key": "bloodwatch",
    "faction_label": "Blood Watch",
    "id": "BW",
    "faction_color": "#F42731"
  },
  {
    "faction_key": "coven",
    "faction_label": "Coven",
    "id": "CV",
    "faction_color": "#7f3b60"
  },
  {
    "faction_key": "forgotten",
    "faction_label": "The Forgotten",
    "id": "FR",
    "faction_color": "#FE9301"
  },
  {
    "faction_key": "grimm",
    "faction_label": "Grimm",
    "id": "GR",
    "faction_color": "#8e8945"
  },
  {
    "faction_key": "heavymetal",
    "faction_label": "Heavy Metal",
    "id": "HM",
    "faction_color": "#B6C0CB"
  },
  {
    "faction_key": "infinitehourglass",
    "faction_label": "Infinite Hourglass",
    "id": "IH",
    "faction_color": "#be9fed"
  },
  {
    "faction_key": "jadecult",
    "faction_label": "Jade Cult",
    "id": "JC",
    "faction_color": "#39B21F"
  },
  {
    "faction_key": "necroplane",
    "faction_label": "Necroplane",
    "id": "NP",
    "faction_color": "#3C3C3C"
  },
  {
    "faction_key": "otherside",
    "faction_label": "Otherside",
    "id": "OS",
    "faction_color": "#70D0CE"
  },
  {
    "faction_key": "settlersgreen",
    "faction_label": "Settler's Green",
    "id": "SG",
    "faction_color": "#3f4d33"
  },
  {
    "faction_key": "starmarshals",
    "faction_label": "Star Marshals",
    "id": "SM",
    "faction_color": "#00419B"
  },
  {
    "faction_key": "supremealliance",
    "faction_label": "Supreme Alliance",
    "id": "SA",
    "faction_color": "#4F9ABE"
  },
  {
    "faction_key": "theway",
    "faction_label": "The Way",
    "id": "TW",
    "faction_color": "#7B3100"
  },
  {
    "faction_key": "ulthar",
    "faction_label": "Ulthar",
    "id": "UL",
    "faction_color": "#350E7C"
  },
  {
    "faction_key": "redrepublik",
    "faction_label": "Red Republik",
    "id": "RR",
    "faction_color": "#A52227"
  }
];

return jsonFactions;
}

return { load: function() { return loadFactions(); } };

});
