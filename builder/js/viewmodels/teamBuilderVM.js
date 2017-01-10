define(['knockout',
        'tinycolor',
        'lodash',
        'viewmodels/affiliationVM',
        'viewmodels/supremeVM',
        'viewmodels/teamVM',
        'viewmodels/supremeFilter',
        'scripts/teamCode'],
function(ko,
         TinyColor,
         _,
         AffiliationVM,
         SupremeVM,
         TeamVM,
         SupremeFilter,
         TeamCode) {

function teamBuilderVM()
{
  var self = this;

  /*************************/
  /* Variables Declaration */
  /*************************/
  self.affiliations = ko.observableArray([]);
  self.supremesPool = ko.observableArray([]);
  self.team = ko.observable(null);
  self.supremeFilter = ko.observable(null);
  self.goBackIsVisible = ko.observable(false);
  self.teamCodeInput = ko.observable('');

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
    if (self.team() != null)
    {
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
    }

    // User Filter
    supremes = self.supremeFilter().filter(supremes);

    // TODO: let the user choose the sort method
    return _.sortBy(supremes, [function(o) { return o.jsonData.name; }]);
  });

  /*************/
  /* Functions */
  /*************/

  /*----- Affiliation -----*/
  self.selectAffiliation = function(selectedAffiliation) {
    // Final affiliation ?
    if (selectedAffiliation.isFinal()) {
      self.loadTeamForAffiliation(selectedAffiliation);
    } else { // Affiliation that leads to other affiliations
      self.affiliations(selectedAffiliation.nextAffiliations());
      self.team(null);
      self.goBackIsVisible(true);
      self.supremesPool([]);
    }
  }

  self.loadTeamForAffiliation = function(affiliationVM) {
    self.affiliations([]);
    self.team(TeamVM.newTeamVM(affiliationVM));
    self.supremesPool(SupremeVM.loadForAffiliation(affiliationVM, self.recruitSupreme, self.dismissSupreme));
  }

  /*----- Recruitment of Supremes -----*/
  self.recruitSupreme = function(supremeVM) {
    self.team().recruitSupreme(supremeVM);
  }

  self.dismissSupreme = function(supremeVM) {
    self.team().dismissSupreme(supremeVM);
  }

  /* Going back one step */
  self.goBack = function() {
    self.affiliations(AffiliationVM.getAllStartingAffiliations(self.selectAffiliation));
    self.team(null);
    self.goBackIsVisible(false);
    self.supremesPool([]);
  }

  /*------- Team Code -------*/
  self.enterTeamCode = function() {
    if ((self.teamCodeInput() != null) && (self.teamCodeInput().length > 0)) {
      TeamCode.loadFromCode(self, self.teamCodeInput());
    }
  }

  /*************************/
  /* Object Initialization */
  /*************************/
  self.affiliations(AffiliationVM.getAllStartingAffiliations(self.selectAffiliation));
  self.supremeFilter(SupremeFilter.newFilter());
}

return {
    newTeamBuilderVM: function()
      { return new teamBuilderVM(); }
  }
});
