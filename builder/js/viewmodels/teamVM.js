define(['knockout',
        'lodash',
        'viewmodels/supremeVM',
        'scripts/teamCode'
       ],
function(ko,
         _,
         SupremeVM,
         TeamCode
         ) {

function teamVM(affiliation)
{
  var self = this;

  /*************************/
  /* Variables Declaration */
  /*************************/
  self.rosterSupremes = ko.observableArray([]);
  self.affiliationVM = ko.observable(null);
  self.actionsVisible = ko.observable(false);
  self.isTeamCodeVisible = ko.observable(false);
  self.teamCode = ko.observable('');

  /**********************************/
  /* Accessors & Computed Variables */
  /**********************************/
  self.affiliationStyle = ko.pureComputed(function() {
    return self.affiliationVM().style();
  });
  self.affiliationImageSrc = ko.pureComputed(function() {
    return self.affiliationVM().imageSrc();
  });
  self.totalLevels = ko.pureComputed(function() {
    return _.sumBy(self.rosterSupremes(), function(o) { return o.jsonData.level; });
  });
  self.totalActionPoints = ko.pureComputed(function() {
    return _.sumBy(self.rosterSupremes(), function(o) { return o.jsonData.ap_granted; });
  });
  self.totalMinionsPoints = ko.pureComputed(function() {
    return _.sumBy(self.rosterSupremes(), function(o) { return o.jsonData.minions_granted; });
  });

  /*************/
  /* Functions */
  /*************/

  /*----- Recruitment of Supremes -----*/
  self.recruitSupreme = function(supremeVM) {
    self.rosterSupremes.push(supremeVM);
    //self.recruitableSupremes.valueHasMutated();
  }

  self.dismissSupreme = function(supremeVM) {
    _.remove(self.rosterSupremes(), function(currentObject) {
        return currentObject.jsonData.id === supremeVM.jsonData.id;
    });

    // Some control are needed because some Supremes can be recruited only by the presence of another one
    // For example, Moonchild authorizing Loup-Garou II to join her
    // or the Honorary Member leaving the Team when the Leader also leaves
    // TODO: warning the User of these effects ?
    var shownSupremes = supremeVM.getShownSupremesID();
    if ((shownSupremes != null) && (shownSupremes.length > 0)) {
      _.forEach(self.rosterSupremes(), function(supreme) {
        if (_.find(shownSupremes, function(o) { return o == supreme.jsonData.id; })) {
          self.dismissSupreme(supreme);
        }
      });
    }


    self.rosterSupremes.valueHasMutated();
  }

  self.prohibitsRecruitmentOf = function(joiningSupreme) {
    return _.find(self.rosterSupremes(), function(o) { return o.prohibitsRecruitmentOf(joiningSupreme); })
  }

  self.activatesRecruitmentOf = function(joiningSupreme) {
    return _.find(self.rosterSupremes(), function(o) { return o.activatesRecruitmentOf(joiningSupreme); })
  }

  /* Generates the Unique code of the Roster Team */
  self.generateTeamCode = function() {
    self.teamCode(TeamCode.getTeamCodeFromRoster(self));
  }


  /* Actions on the team */
  self.showActions = function() {
    self.actionsVisible(true);
  }
  self.hideActions = function() {
    self.actionsVisible(false);
  }
  self.clearRoster = function() {
    self.rosterSupremes([]);
  }
  self.showCode = function() {
    self.generateTeamCode();
    self.isTeamCodeVisible(true);
  }
  self.hideCode = function() {
    self.isTeamCodeVisible(false);
  }

  /*************************/
  /* Object Initialization */
  /*************************/
  self.affiliationVM(affiliation);
}

return {
    newTeamVM: function(affiliation)
      { return new teamVM(affiliation); }
  }
});
