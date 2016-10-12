define(['knockout',
        'viewmodels/factionVM',
        'viewmodels/originVM',
        'json/factions.json'
      ], function(ko, FactionVM, OriginVM, Factions) {

function affiliationVM(jsonFaction, isHeroes, isVillains, jsonOrigin, isIndependent)
{
  var self = this;

  /*************************/
  /* Variables declaration */
  /*************************/
  self.factionVM = null;
  self.isHeroes = null;
  self.isVillains = null;
  self.isIndependent = null;
  self.originVM = null;

  self.label = ko.pureComputed(function() {
    if (self.factionVM != null) {
      return self.factionVM.faction_label;
    } else if (self.isHeroes) {
      var sReturn = '';
      if (self.isIndependent) sReturn = 'Indy ';
      return sReturn + "Heroes";
    } else if (self.isVillains) {
      var sReturn = '';
      if (self.isIndependent) sReturn = 'Indy ';
      return sReturn + "Villains";
    }
    return '';
  });
  self.key = ko.pureComputed(function() {
    if (self.factionVM != null) {
      return self.factionVM.faction_key;
    } else if (self.isHeroes) {
      return "heroes";
    } else if (self.isVillains) {
      return "villains";
    }
    return '';
  });
  self.rgbColor = ko.pureComputed(function() {
    if (self.factionVM != null) {
      return self.factionVM.faction_color;
    } else if (self.isHeroes) {
      return "#a4a7b6";
    } else if (self.isVillains) {
      return "#2c2f3e";
    }
    return '#000000';
  });

  /*****************/
  /*** Functions ***/
  /*****************/


  /*************************/
  /* Object Initialization */
  /*************************/
  if (jsonFaction != null) self.factionVM = FactionVM.newFactionVM(jsonFaction);
  if ((isIndependent != null) && (isIndependent != undefined)) self.isIndependent = isIndependent;
  if ((isHeroes != null) && (isHeroes != undefined)) self.isHeroes = isHeroes;
  if ((isVillains != null) && (isVillains != undefined)) self.isVillains = isVillains;
  if (jsonOrigin != null) self.originVM = OriginVM.newOriginVM(jsonOrigin);
}

return {
    getAllAffiliations: function() {
      var affiliations = [ ];

      // From factions
      var factions = Factions.load();
      for (var iFaction = 0; iFaction < factions.length; iFaction++)
      {
        affiliations.push(new affiliationVM(factions[iFaction], null, null, null, null));
      }

      // From Alignment
      affiliations.push(new affiliationVM(null, true, false, null, false));
      affiliations.push(new affiliationVM(null, false, true, null, false));
      affiliations.push(new affiliationVM(null, true, false, null, true));
      affiliations.push(new affiliationVM(null, false, true, null, true));

      return affiliations;
    }
  }
});
