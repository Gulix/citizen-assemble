define(['knockout',
        'lodash',
        'viewmodels/filterOriginVM',
        'viewmodels/filterAlignmentVM',
        'viewmodels/roleVM'],
function(ko,
         _,
         FilterOriginVM,
         FilterAlignmentVM,
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
  self.origins = ko.observableArray([]);
  self.alignments = ko.observableArray([]);
  self.selectedRole = ko.observable(null);
  self.roles = ko.observableArray([]);
  self.textFilter = ko.observable('');

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

      if (!self.filterByText(currentSupreme)) { continue; }

      if (!_.some(self.origins(), function(o) { return o.supremeMatches(currentSupreme); } ) ) { continue; }
      if (!_.some(self.alignments(), function(a) { return a.supremeMatches(currentSupreme); } ) ) { continue; }
      if ((self.selectedRole() != null) && !self.selectedRole().supremeMatches(currentSupreme)) { continue; }

      filteredList.push(currentSupreme);
    }

    return filteredList;
  }

  self.filterByText = function(supreme) {
    var isOkWithFilter = true;
    if ((supreme != null) && (self.textFilter() != undefined) && (self.textFilter().length > 0))
    {
      var supremeNameCaps = supreme.jsonData.name.toUpperCase();
      var filterCaps = self.textFilter().trim().toUpperCase();
      isOkWithFilter = (supremeNameCaps.indexOf(filterCaps) >= 0);
    }
    return isOkWithFilter;
  }


  /*************************/
  /* Object Initialization */
  /*************************/
  self.origins([ FilterOriginVM.MysteryOrigin(), FilterOriginVM.NatureOrigin(), FilterOriginVM.ScienceOrigin()]);
  self.alignments([ FilterAlignmentVM.HeroAlignment(), FilterAlignmentVM.VillainAlignment(), FilterAlignmentVM.BothAlignments()]);
  self.roles(RoleVM.AllRolesWithAny());
  self.selectedRole(self.roles()[0]);

}

return {
    newFilter: function()
      { return new supremeFilter(); }
  }
});
