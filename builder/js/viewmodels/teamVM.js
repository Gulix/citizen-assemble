define(['knockout',
        'lodash',
        'viewmodels/supremeVM'
       ],
function(ko,
         _,
         SupremeVM
         ) {

function teamVM(affiliation)
{
  var self = this;

  /*************************/
  /* Variables Declaration */
  /*************************/
  self.rosterSupremes = ko.observableArray([]);
  self.affiliationVM = ko.observable(null);

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
    self.rosterSupremes.valueHasMutated();
  }

  self.prohibitsRecruitmentOf = function(joiningSupreme) {
    return _.find(self.rosterSupremes(), function(o) { return o.prohibitsRecruitmentOf(joiningSupreme); })
  }

  self.activatesRecruitmentOf = function(joiningSupreme) {
    return _.find(self.rosterSupremes(), function(o) { return o.activatesRecruitmentOf(joiningSupreme); })
  }

  self.clearRoster = function() {
    self.rosterSupremes([]);
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
