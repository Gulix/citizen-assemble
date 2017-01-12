define(['knockout'], function(ko) {

function factionVM(jsonFaction)
{
  var self = this;

  self.faction_key = jsonFaction.faction_key;
  self.faction_label = ko.observable(jsonFaction.faction_label);
  self.faction_color = jsonFaction.faction_color;
  self.id = ko.observable(jsonFaction.id);

  self.factionCssClass = ko.pureComputed(function() {
    return "faction-" + self.faction_key;
  }, self);

  self.is_special_faction = function()
  {
    return self.faction_key.startsWith('-');
  }

  self.sort_faction = function(comparedFaction) {
    if (self.is_special_faction() && comparedFaction.is_special_faction())
    {
      return self.faction_key > comparedFaction.faction_key() ? 1 : -1;
    }
    if (self.is_special_faction())
    {
      return -1;
    }
    if (comparedFaction.is_special_faction())
    {
      return 1;
    }

    return self.faction_label() > comparedFaction.faction_label() ? 1 : -1
  }
}

return {
    newFactionVM: function(jsonFaction)
      { return new factionVM(jsonFaction); }
  }
});
