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
  // Unique Team Code
  self.isTeamCodeVisible = ko.observable(false);
  self.teamCode = ko.observable('');
  // Leader Cards
  self.isLeaderCardSelectionVisible = ko.observable(false);
  self.isHonoraryMemberSelected = ko.observable(false);
  self.leaderCardsProviders = ko.observableArray([]);
  // Honorary Members
  self.isHonoraryMembersSelectable = ko.observable(false);
  self.supremeGrantingHonorary = ko.observable(null);

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
  self.isCardsVisible = ko.pureComputed(function() {
    return self.nbLeaderCards() > 0;
  })
  self.nbLeaderCards = ko.pureComputed(function() {
    return _.sumBy(self.rosterSupremes(), function(o) { return o.grantedLeaderCards(self.rosterSupremes()); });
  })

  /* List of Possible Honorary Members
     Look for already included Supremes, and Special Recruitement rules :
       Supremes with multiple profiles, Supremes that unlock other, ...
     Remove the "Not Honorary Members" (Supremes that share the same Factions that the Supreme granting the card)
     Check the "Excluded Faction"
     Apply the new Factions to the Supremes in the list and the Honorary Member mention
     TODO: Check the following case : Green Emperor recruits Loup-Garou II in Jade Cult through Honorary Member
                                      => Moonchild / Mooncoyote should be recruitable

  */
  self.possibleHonoraryMembers = ko.pureComputed(function() {
    var supremes = [];
    if (self.isHonoraryMembersSelectable() && (self.supremeGrantingHonorary() != null))
    {
      var allSupremes = SupremeVM.loadAll(self.recruitHonoraryMember, self.dismissHonoraryMember);

      for (var iSup = 0; iSup < allSupremes.length; iSup++) {
        var currentSupreme = allSupremes[iSup];

        // Supremes already selected are not recruitable
        // Excluded Supremes, depending on who is already recruited (Solar / Dark Solar / Avatar of the Jaguar), are not recruitable
        // Only one Leader / one Powerhouse (check also other roles, see Stygian)
        if (self.prohibitsRecruitmentOf(currentSupreme)) {
          continue;
        }
        // Hidden Supremes with no Recruited Supremes that Show them (Moonchild / Loup-Garou II relationship)
        if (currentSupreme.isHidden()
          && !self.activatesRecruitmentOf(currentSupreme)) {
          continue;
        }
        // A Supreme that can't be recruited by the Team Faction (Excluded Faction) is not available through Honorary Member
        if (self.affiliationVM().factionVM != null)
        {
          if (_.some(currentSupreme.jsonData.excluded_factions,
                     function(f) { return f == self.affiliationVM().factionVM.faction_key; }))
          {
            continue;
          }
        }
        // The Supreme providing the Honorary Member is Independant => the Independant & Freelance are not recruitable through HM
        if (self.supremeGrantingHonorary().isIndependant()) {
          if (currentSupreme.isIndependant() || currentSupreme.isFreelance()) { continue; }
        } else { // A Supreme with all the factions of the HM-providing Supreme is not recruitable (he can have more)
          if (_.every(self.supremeGrantingHonorary().jsonData.factions,
                      function(f1) { return _.some(currentSupreme.jsonData.factions, function(f2) { return f1 == f2; });  }))
          {
            continue;
          }
        }

        // If the Team is recruited by the Alignmnent, it is still applied (Honorary Member only changes the Faction)
        if ((self.affiliationVM().isHeroes == true) && (currentSupreme.jsonData.is_hero == 0)) { continue; }
        if ((self.affiliationVM().isVillains == true) && (currentSupreme.jsonData.is_villain == 0)) { continue; }

        supremes.push(currentSupreme);
      }
    }

    // User Filter
    //supremes = self.supremeFilter().filter(supremes);

    return _.sortBy(supremes, [function(o) { return o.jsonData.name; }]);
  })

  self.honoraryMember = ko.pureComputed(function() {
    var honoraryMember = _.find(self.rosterSupremes(), function(s) { return s.isHonoraryMember(); });
    return honoraryMember;
  });
  self.honoraryMemberName = ko.pureComputed(function() {
    var hm = self.honoraryMember();
    if (hm != null)
    {
      return hm.jsonData.name;
    }
    return '';
  });


  /*************/
  /* Functions */
  /*************/

  /*----- Recruitment of Supremes -----*/
  self.recruitSupreme = function(supremeVM) {
    self.rosterSupremes.push(supremeVM);
    if (supremeVM.grantedLeaderCards() > 0) {
      self.leaderCardsProviders.push(supremeVM);
    }
  }

  self.dismissSupreme = function(supremeVM) {
    _.remove(self.rosterSupremes(), function(currentObject) {
        return currentObject.jsonData.id === supremeVM.jsonData.id;
    });
    _.remove(self.leaderCardsProviders(), function(currentObject) {
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

  /* Unique Team Code */
  self.showCode = function() {
    self.generateTeamCode();
    self.isTeamCodeVisible(true);
  }
  self.hideCode = function() {
    self.isTeamCodeVisible(false);
  }

  /* Leader Cards */
  self.showLeaderCardSelection = function() {
    self.isLeaderCardSelectionVisible(true);
  }
  self.hideLeaderCardSelection = function() {
    self.isLeaderCardSelectionVisible(false);
  }

  /* Honorary Member */
  self.chooseHonoraryMember = function(supremeVM) {
    self.isHonoraryMembersSelectable(true);
    self.supremeGrantingHonorary(supremeVM);
  }
  self.endHonoraryMemberSelection = function() {
    self.isHonoraryMembersSelectable(false);
    self.supremeGrantingHonorary(null);
  }
  self.recruitHonoraryMember = function(supremeVM) {
    supremeVM.isHonoraryMember(true);
    if (self.supremeGrantingHonorary() != null) {
      // If the Supreme granting HM is Independent, the Honorary Member loses his Factions
      if (self.supremeGrantingHonorary().isIndependant()) {
        supremeVM.jsonData.factions = [];
      }
      else // The factions of the Supreme are added to the Honorary Member
      {
        supremeVM.jsonData.factions =
          supremeVM.jsonData.factions.concat(self.supremeGrantingHonorary().jsonData.factions);
      }
    }
    self.recruitSupreme(supremeVM);
    self.isHonoraryMembersSelectable(false);
    self.hideLeaderCardSelection();
    self.isHonoraryMemberSelected(true);
  }
  self.dismissHonoraryMember = function(supremeVM) {
    self.isHonoraryMemberSelected(false);
    self.dismissSupreme(supremeVM);
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
