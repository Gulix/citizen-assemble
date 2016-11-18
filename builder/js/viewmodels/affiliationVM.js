define(['knockout',
        'viewmodels/factionVM',
        'viewmodels/originVM',
        'json/factions.json',
        'tinycolor'
      ], function(ko, FactionVM, OriginVM, Factions, TinyColor) {

function affiliationVM(jsonFaction, isHeroes, isVillains, jsonOrigin, isIndependent, selectAffiliation)
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
  self.isOriginSelection = false;
  self.selectAffiliation = selectAffiliation;

  /**********************************/
  /* Accessors / Computed variables */
  /**********************************/
  self.label = ko.pureComputed(function() {
    if (self.factionVM != null) {
      return self.factionVM.faction_label;
    } else {
      var sReturn = '';
      if (self.isIndependent) sReturn = 'Indy ';
      if (self.isHeroes) sReturn += 'Heroes';
      if (self.isVillains) sReturn += 'Villains';
      if (self.originVM != null) {
        sReturn += ' (' + self.originVM.origin_label + ')'
      }

      return sReturn;
    }
    return '';
  });
  self.key = ko.pureComputed(function() {
    if (self.factionVM != null) {
      return self.factionVM.faction_key;
    } else {
      var sKey = '';
      if (self.isHeroes) sKey = "heroes";
      if (self.isVillains) sKey = "villains";
      if (self.originVM != null) {
        sKey += '_' + self.originVM.origin_key;
      }
      return sKey;
    }
    return '';
  });
  self.rgbColor = ko.pureComputed(function() {
    if (self.factionVM != null) {
      return self.factionVM.faction_color;
    } else if (self.originVM != null) {
      return self.originVM.origin_color;
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
  self.isFinal = function() {
    return (self.factionVM != null) ||
      ((self.isIndependent != null) && self.isOriginSelection);
  }

  self.nextAffiliations = function() {
    if (self.factionVM == null) {
      if (self.isIndependent == null) {
        var affiliationsIndyOrNot = [];
        affiliationsIndyOrNot.push(new affiliationVM(null, self.isHeroes, self.isVillains, null, true, self.selectAffiliation));
        affiliationsIndyOrNot.push(new affiliationVM(null, self.isHeroes, self.isVillains, null, false, self.selectAffiliation));

        return affiliationsIndyOrNot;
      } else {
        var affiliationsOriginChoice = [];

        var without = new affiliationVM(null, self.isHeroes, self.isVillains, null, self.isIndependent, self.selectAffiliation);
        without.isOriginSelection = true;
        affiliationsOriginChoice.push(without);
        affiliationsOriginChoice.push(new affiliationVM(null, self.isHeroes, self.isVillains,
          OriginVM.newOriginVM({ "origin_key": "mystery", "origin_label": "Mystery", "origin_color": "#DD0000" }),
          self.isIndependent, self.selectAffiliation));
        affiliationsOriginChoice.push(new affiliationVM(null, self.isHeroes, self.isVillains,
          OriginVM.newOriginVM({ "origin_key": "nature", "origin_label": "Nature", "origin_color": "#0050DD" }),
          self.isIndependent, self.selectAffiliation));
        affiliationsOriginChoice.push(new affiliationVM(null, self.isHeroes, self.isVillains,
          OriginVM.newOriginVM({ "origin_key": "science", "origin_label": "Science", "origin_color": "#F8C70D" }),
          self.isIndependent, self.selectAffiliation));

        return affiliationsOriginChoice;
      }
    }
    return [];
  }

  self.selectOnClick = function() {
    self.selectAffiliation(self);
  }

  /*******************/
  /* Styles function */
  /*******************/
  self.imageSrc = ko.pureComputed(function() {
    return "img/factions/" + self.key() + ".png";
  });
  self.style = ko.pureComputed(function() {
    var affiliationColor = TinyColor(self.rgbColor());

    var style = 'border-color: ' + self.rgbColor() + '; '
      + 'background-color: '
      + (affiliationColor.isLight() ? affiliationColor.darken().toHexString() : affiliationColor.lighten(25).toHexString())
      + '; color: '
      + TinyColor.mostReadable(self.rgbColor(), ["#fff", "#000"]).toHexString();
    return style;
  });

  /*************************/
  /* Object Initialization */
  /*************************/
  if (jsonFaction != null) self.factionVM = FactionVM.newFactionVM(jsonFaction);
  if ((isIndependent != null) && (isIndependent != undefined)) self.isIndependent = isIndependent;
  if ((isHeroes != null) && (isHeroes != undefined)) self.isHeroes = isHeroes;
  if ((isVillains != null) && (isVillains != undefined)) self.isVillains = isVillains;
  if (jsonOrigin != null)
  {
    self.originVM = OriginVM.newOriginVM(jsonOrigin);
    self.isOriginSelection = true;
  }
}

return {
    getAllStartingAffiliations: function(selectAffiliation) {
      var affiliations = [ ];

      // From factions
      var factions = Factions.load();
      for (var iFaction = 0; iFaction < factions.length; iFaction++)
      {
        affiliations.push(new affiliationVM(factions[iFaction], null, null, null, null, selectAffiliation));
      }

      // From Alignment
      affiliations.push(new affiliationVM(null, true, false, null, null, selectAffiliation));
      affiliations.push(new affiliationVM(null, false, true, null, null, selectAffiliation));

      return affiliations;
    }
  }
});
