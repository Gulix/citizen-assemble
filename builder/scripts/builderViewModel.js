builderViewModel = function(supremesList, factionsList)
{
  var self = this;

  // List of Factions
  self.factions_list = ko.observableArray([]);
  if (factionsList != undefined)
  {
    var mapped = ko.utils.arrayMap(
      factionsList,
      function(item){
        return new factionViewModel(item);
      }
    );
    self.factions_list(mapped);
  }

  // List of Supremes
  self.supremes_list = ko.observableArray([]);
  if (supremesList != undefined) {
        var mapped = ko.utils.arrayMap(
            supremesList,
            function (item) {
                return new supremeViewModel(item, self.factions_list);
            });
        self.supremes_list(mapped);
  }


  // Other lists of items
  // Filter
  self.selected_faction = ko.observable();


  // Displayed Supremes
  self.filtered_supremes = ko.computed(function() {
        return ko.utils.arrayFilter(self.supremes_list(), function(supreme) {
          var displayed = true;

          // Faction
          if (displayed && !supreme.is_factionOK(self.selected_faction())) {
            displayed = false;
          }

          return displayed;
        });
    });

  // Selected Supremes
}
