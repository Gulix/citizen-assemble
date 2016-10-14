define(['knockout',
        'tinycolor',
        'lodash',
        'viewmodels/affiliationVM',
        'viewmodels/supremeVM'],
function(ko,
         TinyColor,
         _,
         AffiliationVM,
         SupremeVM) {

function teamBuilderVM()
{
  var self = this;

  /*************************/
  /* Variables Declaration */
  /*************************/
  self.affiliations = ko.observableArray([]);
  self.selectedAffiliation = ko.observable(null);
  self.recruitableSupremes = ko.observableArray([]);
  self.rosterSupremes = ko.observableArray([]);

  /**********************************/
  /* Accessors & Computed Variables */
  /**********************************/
  self.isAffiliationDisplayed = ko.pureComputed(function() {
    return self.selectedAffiliation() == null;
  });
  self.myTeamDisplayed = ko.pureComputed(function() {
    return self.selectedAffiliation() != null;
  });
  self.recruitmentDisplayed = ko.pureComputed(function() {
    return self.recruitableSupremes().length > 0;
  });

  /* ----- Affiliation of the Team -----*/
  self.affiliationImageSrc = ko.pureComputed(function() {
    if (self.selectedAffiliation() != null) {
      return "img/factions/" + self.selectedAffiliation().key() + ".png";;
    }
    return '';
  });
  self.affiliationStyle = ko.pureComputed(function() {
    if (self.selectedAffiliation() != null) {
      var affiliationColor = TinyColor(self.selectedAffiliation().rgbColor());

      var style = 'border-color: ' + self.selectedAffiliation().rgbColor() + '; '
        + 'background-color: '
        + (affiliationColor.isLight() ? affiliationColor.darken().toHexString() : affiliationColor.lighten(25).toHexString())
        + '; color: '
        + TinyColor.mostReadable(self.selectedAffiliation().rgbColor(), ["#fff", "#000"]).toHexString();
      return style;
    }
    return '';
  });

  /*************/
  /* Functions */
  /*************/

  /*----- Affiliation -----*/
  self.selectAffiliation = function(selectedAffiliation) {
    // Final affiliation ?
    if (selectedAffiliation.isFinal()) {
      self.selectedAffiliation(selectedAffiliation);
      self.affiliations([]);
      self.recruitableSupremes(SupremeVM.loadForAffiliation(selectedAffiliation, self.recruitSupreme, self.dismissSupreme));
      self.rosterSupremes([]);
    } else { // Affiliation that leads to other affiliations
      self.affiliations(selectedAffiliation.nextAffiliations());
      self.rosterSupremes([]);
    }
  }

  /*----- Recruitment of Supremes -----*/
  self.recruitSupreme = function(supremeVM) {
    _.remove(self.recruitableSupremes(), function(currentObject) {
        return currentObject.jsonData.id === supremeVM.jsonData.id;
    });
    self.recruitableSupremes.valueHasMutated();
    self.rosterSupremes.push(supremeVM);
  }

  self.dismissSupreme = function(supremeVM) {
    _.remove(self.rosterSupremes(), function(currentObject) {
        return currentObject.jsonData.id === supremeVM.jsonData.id;
    });
    self.rosterSupremes.valueHasMutated();
    self.recruitableSupremes.push(supremeVM);
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
