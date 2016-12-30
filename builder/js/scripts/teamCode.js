define([], function() {

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
    var iMax = maxSupreme.jsonData.id.toString(16).length;
    uniqueCode += iMax.toString() + ".";

    // Then we create the string with all the Supremes ID with equal numbers of digits
    var supremesIdString = _.join(
      _.map(teamVM.rosterSupremes(), function(s) { return _.padStart(s.jsonData.id.toString(16), iMax, '0'); })
      , '');

    uniqueCode += supremesIdString;
  }
  return uniqueCode;
}

return {
    getTeamCodeFromRoster: function(roster) { return getTeamCode(roster) }
  }
});
