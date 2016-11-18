define(['knockout',
        'tinycolor',
        'lodash',
        'viewmodels/affiliationVM',
        'viewmodels/supremeVM',
        'viewmodels/teamVM'],
function(ko,
         TinyColor,
         _,
         AffiliationVM,
         SupremeVM,
         TeamVM) {

function teamBuilderVM()
{
  var self = this;

  /*************************/
  /* Variables Declaration */
  /*************************/
  self.affiliations = ko.observableArray([]);
  //self.selectedAffiliation = ko.observable(null);
  self.supremesPool = ko.observableArray([]);
  self.team = ko.observable(null);

  /**********************************/
  /* Accessors & Computed Variables */
  /**********************************/
  self.isAffiliationDisplayed = ko.pureComputed(function() {
    return self.team() == null;
  });
  self.myTeamDisplayed = ko.pureComputed(function() {
    return self.team() != null;
  });
  self.recruitmentDisplayed = ko.pureComputed(function() {
    return self.supremesPool().length > 0;
  });

  /* Which Supremes can be recruited by the current Roster team ? */
  self.recruitableSupremes = ko.pureComputed(function() {
    var supremes = [];
    for (var iSup = 0; iSup < self.supremesPool().length; iSup++) {
      var currentSupreme = self.supremesPool()[iSup];

      // Supremes already selected are not recruitable
      // Excluded Supremes, depending on who is already recruited (Solar / Dark Solar / Avatar of the Jaguar), are not recruitable
      // Only one Leader / one Powerhouse (check also other roles, see Stygian)
      if (self.team().prohibitsRecruitmentOf(currentSupreme)) {
        continue;
      }
      // Hidden Supremes with no Recruited Supremes that Show them (Moonchild / Loup-Garou II relationship)
      if (currentSupreme.isHidden()
        && !self.team().activatesRecruitmentOf(currentSupreme)) {
        continue;
      }

      supremes.push(currentSupreme);
    }

    // TODO: let the user choose the sort method
    return _.sortBy(supremes, [function(o) { return o.jsonData.name; }]);
    //return supremes;
  });


  /*************/
  /* Functions */
  /*************/

  /*----- Affiliation -----*/
  self.selectAffiliation = function(selectedAffiliation) {
    // Final affiliation ?
    if (selectedAffiliation.isFinal()) {
      //self.selectedAffiliation(selectedAffiliation);
      //self.team().affiliationVM(self.selectedAffiliation());
      self.affiliations([]);
      self.team(TeamVM.newTeamVM(selectedAffiliation));
      self.supremesPool(SupremeVM.loadForAffiliation(selectedAffiliation, self.recruitSupreme, self.dismissSupreme));
    } else { // Affiliation that leads to other affiliations
      self.affiliations(selectedAffiliation.nextAffiliations());
      self.team(null);
    }
  }

  /*----- Recruitment of Supremes -----*/
  self.recruitSupreme = function(supremeVM) {
    self.team().recruitSupreme(supremeVM);
  }

  self.dismissSupreme = function(supremeVM) {
    self.team().dismissSupreme(supremeVM);
  }

  /*************************/
  /* Object Initialization */
  /*************************/
  self.affiliations(AffiliationVM.getAllStartingAffiliations(self.selectAffiliation));
}

return {
    newTeamBuilderVM: function()
      { return new teamBuilderVM(); }
  }
});
