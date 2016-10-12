define(['knockout'], function(ko) {

  function factionBox(params) {
    var self = this;

    self.faction = params.faction;
    self.borderColor = ko.pureComputed(function() {
      return "border-color: " + self.faction.faction_color;
    });
    self.imageSrc = ko.pureComputed(function() {
      return "img/factions/" + self.faction.faction_key + ".png";
    });
  }

  return factionBox;
});
