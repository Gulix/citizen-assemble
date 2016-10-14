define(['knockout', 'lodash', 'json/supremes.json'], function(ko, _, Supremes) {

function supremeVM(jsonSupreme, recruit, dismiss)
{
  var self = this;

  /*************************/
  /* Variables Declaration */
  /*************************/
  self.jsonData = jsonSupreme;
  self.isRecruited = ko.observable(false);
  self.recruitInTeam = recruit;
  self.dismissFromTeam = dismiss;


  /*************/
  /* Functions */
  /*************/
  self.matchesAffiliation = function(affiliationVM) {
    if (affiliationVM != null)
    {
      if (affiliationVM.factionVM != null) {
        // Supreme must be from the faction
        return _.includes(self.jsonData.factions, affiliationVM.factionVM.faction_key);
      } else {
        // Hero or Villain
        var matching = (affiliationVM.isHeroes && (self.jsonData.is_hero == 1))
          || (affiliationVM.isVillains && (self.jsonData.is_villain == 1));
        // Indy Supremes
        if (matching && (affiliationVM.isIndependent == true)) {
          matching = _.isEmpty(self.jsonData.factions) || (self.jsonData.is_freelance == 1);
        }
        // Origin Limit
        if (matching && (affiliationVM.originVM != null)) {
          matching = self.jsonData.origin == affiliationVM.originVM.origin_key;
        }
        return matching;
      }
    }
    return false;
  }

  self.recruit = function() {
    self.recruitInTeam(self);
    self.isRecruited(true);
  }

  self.dismiss = function() {
    self.dismissFromTeam(self);
    self.isRecruited(false);
  }
}

return {

    loadForAffiliation: function(affiliationVM, recruit, dismiss) {
      var supremesLoaded = Supremes.load();
      var supremesReturned = [ ];
      for (var iSupreme = 0; iSupreme < supremesLoaded.length; iSupreme++)
      {
        var vm = new supremeVM(supremesLoaded[iSupreme], recruit, dismiss);
        if (vm.matchesAffiliation(affiliationVM)) {
          supremesReturned.push(vm);
        }
      }

      return supremesReturned;
    }
  }
});
