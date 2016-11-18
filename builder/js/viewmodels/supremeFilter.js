define(['knockout',
        'lodash',
        'viewmodels/originVM',
        'viewmodels/roleVM'],
function(ko,
         _,
         OriginVM,
         RoleVM
         ) {

/* TODO: Need to be implemented => Filter by Text, Filter by AP+, by Minions+, Exclusive Minions, by Faction (Freelance, Indies), by Alignment) */

/* Object that manages the Filter on the list of the Recruitable Supremes */
function supremeFilter()
{
  var self = this;

  /*************************/
  /* Variables Declaration */
  /*************************/
  self.selectedOrigin = ko.observable(null);
  self.origins = ko.observableArray([]);
  self.selectedRole = ko.observable(null);
  self.roles = ko.observableArray([]);

  /**********************************/
  /* Accessors & Computed Variables */
  /**********************************/


  /*************/
  /* Functions */
  /*************/
  self.filter = function(supremesList) {
    var filteredList = [];
    for(var iSupreme = 0; iSupreme < supremesList.length; iSupreme++) {
      var currentSupreme = supremesList[iSupreme];

      if ((self.selectedOrigin() != null) && !self.selectedOrigin().supremeMatches(currentSupreme)) { continue; }
      if ((self.selectedRole() != null) && !self.selectedRole().supremeMatches(currentSupreme)) { continue; }

      filteredList.push(currentSupreme);
    }

    return filteredList;
  }


  /*************************/
  /* Object Initialization */
  /*************************/
  self.origins([ OriginVM.AllOrigin(), OriginVM.MysteryOrigin(), OriginVM.NatureOrigin(), OriginVM.ScienceOrigin()]);
  self.selectedOrigin(self.origins()[0]);
  self.roles(RoleVM.AllRolesWithAny());
  self.selectedRole(self.roles()[0]);

}

return {
    newFilter: function()
      { return new supremeFilter(); }
  }
});
