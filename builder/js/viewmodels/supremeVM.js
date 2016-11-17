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

  /*********************/
  /* Accessors on data */
  /*********************/
  self.isRole = function(roleKey)
  {
    return (self.jsonData.role_key == roleKey)
      || ((self.jsonData.other_roles != null) && _.find(self.jsonData.other_roles, function(s) { return s == roleKey; }));
  }
  self.isLeader = function() { return self.isRole("leader"); }
  self.isPowerhouse = function() { return self.isRole("powerhouse"); }
  self.isHidden = function() {return (self.jsonData.supreme_is_hidden != null) && self.jsonData.supreme_is_hidden; }

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

  // Does the current Supreme prohibits the Recruitment of the joiningSupreme ?
  self.prohibitsRecruitmentOf = function(joiningSupreme) {
    // Yes if they're the same
    if (joiningSupreme.jsonData.id == self.jsonData.id) return true;
    // Yes if they're both Leaders (only one per team)
    if (joiningSupreme.isLeader() && self.isLeader()) return true;
    // Yes if they're both Powerhouses (only one per team)
    if (joiningSupreme.isPowerhouse() && self.isPowerhouse()) return true;
    // Yes if the joiningSupreme is in the "Excluded Supremes" list of the current Supreme
    if ((self.jsonData.excluded_supremes != null)
      && _.find(self.jsonData.excluded_supremes, function(o) { return o == joiningSupreme.jsonData.id; })) return true;
  }
  // Does the current Supreme activate the Recruitment of the joiningSupreme ?
  self.activatesRecruitmentOf = function(joiningSupreme) {
    // Yes if the joiningSupreme is in the "Shown Supremes" list of the current Supreme
    if (self.jsonData.shown_supremes != null) {
      return _.find(self.jsonData.shown_supremes, function(o) { return o == joiningSupreme.jsonData.id; });
    }
    return false;
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
