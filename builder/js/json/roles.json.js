define([], function() {

function loadRoles() {

  var jsonRoles = [
    {
      "role_key": "leader",
      "role_label": "Leader"
    },
    {
      "role_key": "powerhouse",
      "role_label": "Powerhouse"
    },
    {
      "role_key": "blaster",
      "role_label": "Blaster"
    },
    {
      "role_key": "brawler",
      "role_label": "Brawler"
    },
    {
      "role_key": "support",
      "role_label": "Support"
    },
    {
      "role_key": "tank",
      "role_label": "Tank"
    },
    {
      "role_key": "speeder",
      "role_label": "Speeder"
    },
    {
      "role_key": "infiltrator",
      "role_label": "Infiltrator"
    }
];

return jsonRoles;
}

return { load: function() { return loadRoles(); } };

});
