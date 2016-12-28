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
    var maxSupreme = _.maxBy(teamVM.rosterSupremes(), function(s) { return s.jsonData.id.toString().length; });
    var iMax = maxSupreme.jsonData.id.toString().length;
    uniqueCode += iMax.toString() + ".";

    // Then we create the string with all the Supremes ID with equal numbers of digits
    var supremesIdString = _.join(
      _.map(teamVM.rosterSupremes(), function(s) { return _.padStart(s.jsonData.id, iMax, '0'); })
      , '');

      // TODO : encode in base 62 for shorter strings ?
      
    uniqueCode += supremesIdString;
  }
  return uniqueCode;
}

function get_unique_code()
{
  var uniqueCode = '';

  // Next char : max number of character to id a supreme
  var idNbCharMax = 0;
  for (var iSup = 0; iSup < window.selected_supremes_list.length; iSup++)
  {
    idNbCharMax = Math.max(idNbCharMax, window.selected_supremes_list[iSup].id.toString().length);
  }
  uniqueCode = uniqueCode + idNbCharMax;

  // List of Supremes'ID
  for (var iSup = 0; iSup < window.selected_supremes_list.length; iSup++)
  {
    uniqueCode += pad(window.selected_supremes_list[iSup].id, idNbCharMax);
  }

  return uniqueCode;
}

return {
    getTeamCodeFromRoster: function(roster) { return getTeamCode(roster) }
  }
});
