builderViewModel = function(supremesList, factionsList, originsList)
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

  // List of Origins
  self.origins_list = ko.observableArray([]);
  if (originsList != undefined)
  {
    var mapped = ko.utils.arrayMap(
      originsList,
      function(item){
        return new originViewModel(item);
      }
    );
    self.origins_list(mapped);
  }

  // List of Supremes
  self.supremes_list = ko.observableArray([]);
  if (supremesList != undefined) {
        var mapped = ko.utils.arrayMap(
            supremesList,
            function (item) {
                return new supremeViewModel(item, self);
            });
        self.supremes_list(mapped);
  }


  // Other lists of items
  // Filter
  self.selected_faction = ko.observable();
  self.selected_origin = ko.observable();

  // Displayed Supremes
  self.filtered_supremes = ko.computed(function() {
        return ko.utils.arrayFilter(self.supremes_list(), function(supreme) {
          var displayed = true;

          // Faction
          if (displayed && !supreme.is_factionOK(self.selected_faction())) {
            displayed = false;
          }
          // Origin
          if (displayed && (self.selected_origin() != "0") && (self.selected_origin() != supreme.origin())) {
            displayed = false;
          }

          return displayed;
        });
    });

  // Selected Supremes
}
