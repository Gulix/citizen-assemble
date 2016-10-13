define(['knockout', 'tinycolor', 'viewmodels/affiliationVM'], function(ko, TinyColor, AffiliationVM) {

function teamBuilderVM()
{
  var self = this;

  /*************************/
  /* Variables Declaration */
  /*************************/
  self.affiliations = ko.observableArray([]);
  self.selectedAffiliation = ko.observable(null);

  /**********************************/
  /* Accessors & Computed Variables */
  /**********************************/
  self.isAffiliationDisplayed = ko.pureComputed(function() {
    return self.selectedAffiliation() == null;
  });
  self.myTeamDisplayed = ko.pureComputed(function() {
    return self.selectedAffiliation() != null;
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
    } else { // Affiliation that leads to other affiliations
      self.affiliations(selectedAffiliation.nextAffiliations());
    }
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
