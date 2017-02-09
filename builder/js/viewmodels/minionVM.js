define(['knockout', 'lodash', 'json/minions.json'], function(ko, _, Minions) {

function minionVM(jsonMinion, recruit, dismiss)
{
  var self = this;

  /*************************/
  /* Variables Declaration */
  /*************************/
  self.jsonData = jsonMinion;
  self.isRecruited = ko.observable(false);
  self.recruitInTeam = recruit;
  self.dismissFromTeam = dismiss;

  /*********************/
  /* Accessors on data */
  /*********************/
  self.isRole = function(roleKey)
  {
    return (self.jsonData.role_key == roleKey)
      || ((self.jsonData.other_roles != null) && _.find(self.jsonData.other_roles, function(role) { return role == roleKey; }));
  }


  /*************/
  /* Functions */
  /*************/
  self.shareFactionWith = function(supremeVM) {
    return _.find(self.jsonData.factions, function(f1)
    {
      return _.find(supremeVM.jsonData.factions, function(f2)
      {
        return f1.faction_key == f2.faction_key;
      });
    });
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

    loadAll: function(recruitAction, dismissAction) {
      var minionsLoaded = Minions.load();
      var minionsReturned = [ ];
      for (var iMinion = 0; iMinion < minionsLoaded.length; iMinion++)
      {
        var vm = new minionVM(minionsLoaded[iMinion], recruitAction, dismissAction);
        minionsReturned.push(vm);
      }

      return minionsReturned;
    },
    getByCode: function(code, recruitAction, dismissAction) {
      var minions = Minions.load();
      var minion = _.find(minions, function(m) { return m.id == code; });
      return new minionVM(minion, recruitAction, dismissAction);
    }
  }
});
