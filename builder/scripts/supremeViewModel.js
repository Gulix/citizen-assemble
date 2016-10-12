supremeViewModel = function(jsonSupreme, builderVM) {
  var self = this;

  if (jsonSupreme != undefined)
  {
    self.id = jsonSupreme.id;
    self.name = ko.observable(jsonSupreme.name);
    self.level = ko.observable(jsonSupreme.level);
    self.role_key = ko.observable(jsonSupreme.role_key);
    self.ap_granted = ko.observable(jsonSupreme.ap_granted);
    self.minions_granted = ko.observable(jsonSupreme.minions_granted);
    self.is_hero = ko.observable(jsonSupreme.is_hero);
    self.is_villain = ko.observable(jsonSupreme.is_villain);
    self.is_freelance = ko.observable(jsonSupreme.is_freelance);
    self.origin = ko.observable(jsonSupreme.origin);
    self.strentgh_value = ko.observable(jsonSupreme.strentgh_value);
    self.defense_value = ko.observable(jsonSupreme.defense_value);
    self.agility_value = ko.observable(jsonSupreme.agility_value);
    self.energy_value = ko.observable(jsonSupreme.energy_value);
    self.mind_value = ko.observable(jsonSupreme.mind_value);
    self.spirit_value = ko.observable(jsonSupreme.spirit_value);
    self.strentgh_trump = ko.observable(jsonSupreme.strentgh_trump);
    self.defense_trump = ko.observable(jsonSupreme.defense_trump);
    self.agility_trump = ko.observable(jsonSupreme.agility_trump);
    self.energy_trump = ko.observable(jsonSupreme.energy_trump);
    self.mind_trump = ko.observable(jsonSupreme.mind_trump);
    self.spirit_trump = ko.observable(jsonSupreme.spirit_trump);
    self.hp_value = ko.observable(jsonSupreme.hp_value);
    self.mvt_type = ko.observable(jsonSupreme.mvt_type);
    self.mvt_value = ko.observable(jsonSupreme.mvt_value);
    self.is_stealth = ko.observable(jsonSupreme.is_stealth);
    self.exclusive_minions = ko.observable(jsonSupreme.exclusive_minions);
    self.ap_limit = ko.observable(jsonSupreme.ap_limit);
    self.powers_skills = ko.observable(jsonSupreme.powers_skills);
    self.description = ko.observable(jsonSupreme.description);
    self.picture_id = ko.observable(jsonSupreme.picture_id);
  }

  // Elements list
  self.elements = ko.observableArray([]);
  if ((jsonSupreme != undefined) && (jsonSupreme.elements != undefined)) {
        var mapped = ko.utils.arrayMap(
            jsonSupreme.elements,
            function (item) {
                return item;
            });
        self.elements(mapped);
  }
  // Factions list
  self.factions = ko.observableArray([]);
  if ((jsonSupreme != undefined) && (jsonSupreme.factions != undefined)) {
        var mapped = ko.utils.arrayMap(
            jsonSupreme.factions,
            function (item) {
                for (var iFaction = 0; iFaction < builderVM.factions_list().length; iFaction++)
                {
                  var currFaction = builderVM.factions_list()[iFaction];
                  if (currFaction.faction_key() == item) { return currFaction; }
                }
                return null;
            });
        self.factions(mapped);
  }
  // Role label
  self.role_label = ko.observable();
  for (var iRole = 0; iRole < builderVM.roles_list().length; iRole++)
  {
    if (builderVM.roles_list()[iRole].key == self.role_key()) { self.role_label(builderVM.roles_list()[iRole].label); }
  }

  /**
   * Checks if the Faction Key matches the Factions of the Supremes (could be 'Without faction')
   * @param  {string} faction_key [description]
   * @return {boolean}             [description]
   */
  self.is_factionOK = function(faction_key)
  {
    // Any faction
    if (faction_key == '-0') { return true; }
    // Without faction
    if (((faction_key == '-1') || (faction_key == '-2'))
         && (self.factions().length == 0)) { return true; }
    // Without faction (including Freelancer)
    if ((faction_key == '-2') && self.is_freelance()) { return true; }

    // Checking for each faction of the Supreme
    for (var iFaction = 0; iFaction < self.factions().length; iFaction++)
    {
      var currFaction = self.factions()[iFaction];
      if (currFaction.faction_key() == faction_key) { return true; }
    }
    return false;
  };

  self.is_level = function(level_key)
  {
    if (level_key == undefined) { return false; }
    if (level_key == '0') { return true; }
    if (level_key.indexOf(self.level()) > -1) { return true; }

    return false;
  }

  // Supreme's Types list
  self.supreme_types = ko.observableArray([]);
  if ((jsonSupreme != undefined) && (jsonSupreme.supreme_types != undefined)) {
        var mapped = ko.utils.arrayMap(
            jsonSupreme.supreme_types,
            function (item) {
                return item;
            });
        self.supreme_types(mapped);
  }
  // Links list
  self.links = ko.observableArray([]);
  if ((jsonSupreme != undefined) && (jsonSupreme.links != undefined)) {
        var mapped = ko.utils.arrayMap(
            jsonSupreme.links,
            function (item) {
                return item;
            });
        self.links(mapped);
  }

  // CSS related functions
  self.originCssClass = ko.pureComputed(function() {
    return "supreme-origin-" + self.origin();
  }, self);
  self.alignmentCssClass = ko.pureComputed(function() {
    var cssVal = "";
    if (self.is_hero()) cssVal += "hero";
    if (self.is_villain()) cssVal += "villain";
    return cssVal;
  }, self);
  self.roleLevelCssClass = ko.pureComputed(function() {
    return "role-level-" + self.level();
  }, self);

  // Image
  self.thumbImagePath = ko.pureComputed(function() {
    var path = 'img/supremes/';
    if((self.picture_id() != undefined) && (self.picture_id() != ''))
    {
      path += self.picture_id();
    }
    else
    {
      path += self.id;
    }
    return path + '_thumb.jpg';
  }, self);

  // Select the Supreme for Details
  self.selectForDetail = function() {
    builderVM.detailed_supreme(self);
    $('#supreme-modal').modal('show');
  }
}