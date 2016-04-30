builderViewModel = function(supremesList)
{
  var self = this;

  // List of Supremes
  self.supremes_list = ko.observableArray([]);
  if (supremesList != undefined) {
        var mapped = ko.utils.arrayMap(
            supremesList,
            function (item) {
                return new supremeViewModel(item);
            });
        self.supremes_list(mapped);
  }

  // List of Factions
  // Other lists of items
  // Filter
  // Displayed Supremes
  // Selected Supremes
}
