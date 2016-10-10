builderViewModel = function(jsonData)
{
  var self = this;

  // List of Factions
  self.factions_list = ko.observableArray([]);
  if ((jsonData != undefined) && (jsonData.factionsList != undefined))
  {
    var mapped = ko.utils.arrayMap(
      jsonData.factionsList,
      function(item){
        return new factionViewModel(item);
      }
    );
    self.factions_list(mapped);
  }

  // List of Origins
  self.origins_list = ko.observableArray([]);
  if ((jsonData != undefined) && (jsonData.originsList != undefined))
  {
    var mapped = ko.utils.arrayMap(
      jsonData.originsList,
      function(item){
        return new originViewModel(item);
      }
    );
    self.origins_list(mapped);
  }

  // List of Roles
  self.roles_list = ko.observableArray([]);
  if ((jsonData != undefined) && (jsonData.rolesList != undefined))
  {
    var mapped = ko.utils.arrayMap(
      jsonData.rolesList,
      function(item){
        return new roleViewModel(item);
      }
    );
    self.roles_list(mapped);
  }

  // List of Levels
  self.levels_list = ko.observableArray([]);
  if ((jsonData != undefined) && (jsonData.levelsList != undefined))
  {
    var mapped = ko.utils.arrayMap(
      jsonData.levelsList,
      function(item){
        return new levelFilterViewModel(item);
      }
    );
    self.levels_list(mapped);
  }

  // List of Affiliations
  self.affiliations = [
    { "label": "Alignment",
      "children": [
        { "label": "Heroes", "key": "a_heroes" },
        { "label": "Villains", "key": "a_villains" }
      ]
    },
    {
      "label": "Factions",
      "children": [ ]
    }
  ];
  if ((jsonData != undefined) && (jsonData.factionsList != undefined))
  {
    var factions = self.factions_list();
    factions.sort(function(l, r) { return l.sort_faction(r); } );
    for(var iFaction = 0; iFaction < factions.length; iFaction++)
    {
      if (!factions[iFaction].is_special_faction()) {
        var factionItem = {
          "label": factions[iFaction].faction_label(),
          "key": factions[iFaction].faction_key()
        };
        self.affiliations[1].children.push(factionItem);
      }
    }
  }

  // List of AP+ / Minions+
  self.ap_granted_choices = [
    { "label": "Any", "key": "+0" },
    { "label": "1 or more", "key": "+1" },
    { "label": "2 or more", "key": "+2" },
    { "label": "3 or more", "key": "+3" },
    { "label": "4 or more", "key": "+4" },
    { "label": "0", "key": "=0" },
    { "label": "1", "key": "=1" },
    { "label": "2", "key": "=2" },
    { "label": "3", "key": "=3" },
    { "label": "4", "key": "=4" },
    { "label": "1 or less", "key": "-1" },
    { "label": "2 or less", "key": "-2" },
    { "label": "3 or less", "key": "-3" },
    { "label": "4 or less", "key": "-4" }
  ];
  self.minions_granted_choices = self.ap_granted_choices.slice();

  // List of Supremes
  self.supremes_list = ko.observableArray([]);
  if ((jsonData != undefined) && (jsonData.supremesList != undefined))
  {
        var mapped = ko.utils.arrayMap(
            jsonData.supremesList,
            function (item) {
                return new supremeViewModel(item, self);
            });
        self.supremes_list(mapped);
  }


  // Other lists of items
  // Filter
  self.selected_faction = ko.observable();
  self.selected_origin = ko.observable();
  self.selected_role = ko.observable();
  self.selected_level = ko.observable();
  self.filter_name = ko.observable('');
  self.selected_affiliation = ko.observable();
  self.selected_ap_granted = ko.observable();
  self.selected_minions_granted = ko.observable();

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
          // Role
          if (displayed && (self.selected_role() != "0") && (self.selected_role() != supreme.role_key())) {
            displayed = false;
          }
          // Level
          if (displayed && (self.selected_level() != "0") && !supreme.is_level(self.selected_level())) {
            displayed = false;
          }
          // Affiliation
          if (displayed && self.selected_affiliation() == 'a_heroes') {
            if (!supreme.is_hero()) { displayed = false; }
          } else if (displayed && self.selected_affiliation() == 'a_villains') {
            if (!supreme.is_villain()) { displayed = false; }
          } else if (displayed) {
            if (!supreme.is_factionOK(self.selected_affiliation())) { displayed = false; }
          }
          // AP+
          if (displayed && (self.selected_ap_granted() != undefined)) {

            if (self.selected_ap_granted().startsWith('+')) {
              var val = self.selected_ap_granted().substring(1);
              if (supreme.ap_granted() < val) { displayed = false; }
            } else if (self.selected_ap_granted().startsWith('=')) {
              var val = self.selected_ap_granted().substring(1);
              if (supreme.ap_granted() != val) { displayed = false; }
            } else if (self.selected_ap_granted().startsWith('-')) {
              var val = self.selected_ap_granted().substring(1);
              if (supreme.ap_granted() > val) { displayed = false; }
            }
          }
          // Minions+
          if (displayed && (self.selected_minions_granted() != undefined)) {

            if (self.selected_minions_granted().startsWith('+')) {
              var val = self.selected_minions_granted().substring(1);
              if (supreme.minions_granted() < val) { displayed = false; }
            } else if (self.selected_minions_granted().startsWith('=')) {
              var val = self.selected_minions_granted().substring(1);
              if (supreme.minions_granted() != val) { displayed = false; }
            } else if (self.selected_minions_granted().startsWith('-')) {
              var val = self.selected_minions_granted().substring(1);
              if (supreme.minions_granted() > val) { displayed = false; }
            }
          }

          // Filter on Name
          if (displayed && (self.filter_name() != undefined) && (self.filter_name().length > 0))
          {
            var supremeNameCaps = supreme.name().toUpperCase();
            var filterCaps = self.filter_name().trim().toUpperCase();
            if (supremeNameCaps.indexOf(filterCaps) < 0) {
              displayed = false;
            }
          }
          return displayed;
        });
    });

  // Selected Supremes

  // Modal view of the Details for a Supreme
  self.detailed_supreme = ko.observable(undefined);
}
