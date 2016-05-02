factionViewModel = function(jsonFaction)
{
  var self = this;

  self.faction_key = ko.observable(jsonFaction.faction_key);
  self.faction_label = ko.observable(jsonFaction.faction_label);
  self.id = ko.observable(jsonFaction.id);

  self.factionCssClass = ko.pureComputed(function() {
    return "faction-" + self.faction_key();
  }, self);
}
