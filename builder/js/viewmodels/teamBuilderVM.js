define(['knockout', 'viewmodels/affiliationVM',], function(ko, AffiliationVM) {

function teamBuilderVM()
{
  var self = this;

  /*************************/
  /* Variables Declaration */
  /*************************/
  self.affiliations = ko.observableArray([]);

  /*************/
  /* Functions */
  /*************/

  /*----- Affiliation -----*/
  //selectAffiliation();

  /*************************/
  /* Object Initialization */
  /*************************/
  self.affiliations(AffiliationVM.getAllAffiliations());
}

return {
    newTeamBuilderVM: function()
      { return new teamBuilderVM(); }
  }
});
