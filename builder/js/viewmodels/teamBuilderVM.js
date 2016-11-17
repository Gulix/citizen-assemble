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
  self.supremesPool = ko.observableArray([]);
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
    return self.supremesPool().length > 0;
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
  /* Which Supremes can be recruited by the current Roster team ? */
  self.recruitableSupremes = ko.pureComputed(function() {
    var supremes = [];
    for (var iSup = 0; iSup < self.supremesPool().length; iSup++) {
      var currentSupreme = self.supremesPool()[iSup];
      /*
      // Exclusive factions (Supreme only available in some factions, such as #2 & #3 of Troopers)
      || ((window.supremes_list[i].exclusive_factions !== undefined)
          && (!isAlignementFaction || !isInTable(window.supremes_list[i].exclusive_factions, factionFilter)))

    )*/
      // Supremes already selected are not recruitable
      // Excluded Supremes, depending on who is already recruited (Solar / Dark Solar / Avatar of the Jaguar), are not recruitable
      // Only one Leader / one Powerhouse (check also other roles, see Stygian)
      if (_.find(self.rosterSupremes(), function(o) { return o.prohibitsRecruitmentOf(currentSupreme); })) {
        continue;
      }
      // Hidden Supremes with no Recruited Supremes that Show them (Moonchild / Loup-Garou II relationship)
      if (currentSupreme.isHidden()
        && !_.find(self.rosterSupremes(), function(o) { return o.activatesRecruitmentOf(currentSupreme); })) {
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
      self.selectedAffiliation(selectedAffiliation);
      self.affiliations([]);
      self.supremesPool(SupremeVM.loadForAffiliation(selectedAffiliation, self.recruitSupreme, self.dismissSupreme));
      self.rosterSupremes([]);
    } else { // Affiliation that leads to other affiliations
      self.affiliations(selectedAffiliation.nextAffiliations());
      self.rosterSupremes([]);
    }
  }

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
    //self.recruitableSupremes.valueHasMutated();
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
