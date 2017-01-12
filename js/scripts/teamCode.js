define(['viewmodels/affiliationVM',
        'viewmodels/supremeVM'],
        function(AffiliationVM,
                 SupremeVM)
{

function getTeamCode(teamVM)
{
  var uniqueCode = '';

  if (teamVM != null)
  {
    // First 2 chars identifies the Affiliation of the Team
    if ((teamVM.affiliationVM != null) && (teamVM.affiliationVM() != null))
    {
      uniqueCode = teamVM.affiliationVM().getUniqueCode();
    }
    // Next characters (before .) are the length of the id of the Supremes (max length)
    var maxSupreme = _.maxBy(teamVM.rosterSupremes(), function(s) { return s.jsonData.id.toString(16).length; });
    var iCharactersUsedForSupremeCode = maxSupreme.jsonData.id.toString(16).length;
    uniqueCode += iCharactersUsedForSupremeCode.toString() + ".";

    // Then we create the string with all the Supremes ID with equal numbers of digits
    var supremesIdString = _.join(
      _.map(teamVM.rosterSupremes(), function(s) { return getSupremeCode(s, iCharactersUsedForSupremeCode); })
      , '');
    uniqueCode += supremesIdString;

    // If the Team includes an Honorary Member, we include it in the code
    if (teamVM.isHonoraryMemberSelected()) {
      uniqueCode += ".HM";
      // First the code of the Leader / Field Commander, then the HonoraryMember
      if (teamVM.supremeGrantingHonorary() != null) {
        uniqueCode += getSupremeCode(teamVM.supremeGrantingHonorary(), iCharactersUsedForSupremeCode);
      }
      var hm = teamVM.honoraryMember();
      if (hm != null) {
        uniqueCode += getSupremeCode(hm, iCharactersUsedForSupremeCode);
      }
    }
  }
  return uniqueCode;
}


function loadTeamFromCode(teamBuilder, code) {
  // TODO : check if code is in correct format

  // First Step : Get the correct Affiliation
  var affiliation = AffiliationVM.getByCode(code.substring(0,2));
  if (affiliation != null)
  {
    teamBuilder.loadTeamForAffiliation(affiliation);

    var codeSplit = code.split(".");
    // Second Step : Add the Supremes
    var iCharactersForSupremeCode = parseInt(codeSplit[0].substring(2), 10);
    for(var iIndex = 0; iIndex < codeSplit[1].length; iIndex += iCharactersForSupremeCode) {
      var supremeCode = parseInt(codeSplit[1].substring(iIndex, iIndex + iCharactersForSupremeCode), 16);
      var supremeVM = SupremeVM.getByCode(supremeCode, teamBuilder.recruitSupreme, teamBuilder.dismissSupreme);
      supremeVM.isRecruited(true);
      teamBuilder.recruitSupreme(supremeVM);
    }

    // Third Step : Manage the Honorary Member
    var optionalCodes = _.slice(codeSplit, 2);
    if (codeSplit.length >= 3) {
      var hmCode = _.find(optionalCodes, function(c) { return c.startsWith('HM'); });
      if (hmCode != null) {
        // First characters are the code of the Leader / Field Commander
        var supremeCode = parseInt(hmCode.substring(2, 2 + iCharactersForSupremeCode), 16);
        var grantingHM = _.find(teamBuilder.team().rosterSupremes(), function(s) { return s.jsonData.id == supremeCode; });
        if (grantingHM != null) {
          teamBuilder.team().supremeGrantingHonorary(grantingHM);
        }
        // Then it's the Honorary Member
        supremeCode = parseInt(hmCode.substring(2 + iCharactersForSupremeCode, 2 + 2*iCharactersForSupremeCode), 16);
        var honoraryMember = _.find(teamBuilder.team().rosterSupremes(), function(s) { return s.jsonData.id == supremeCode; });
        if (honoraryMember != null) {
          teamBuilder.team().isHonoraryMemberSelected(true);
          honoraryMember.dismissFromTeam = teamBuilder.team().dismissHonoraryMember;
          honoraryMember.isHonoraryMember(true);
        }
      }
    }
  }

}

function getSupremeCode(supremeVM, iPaddingNumber)
{
  if (supremeVM != null) {
    return _.padStart(supremeVM.jsonData.id.toString(16), iPaddingNumber, '0');
  }
  return '';
}

return {
    getTeamCodeFromRoster: function(roster) { return getTeamCode(roster); },
    loadFromCode: function(teamBuilder, code) { loadTeamFromCode(teamBuilder, code); }
  }
});
