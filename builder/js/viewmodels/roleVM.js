define(['knockout', 'json/roles.json'], function(ko, Roles) {

function roleVM(jsonRole)
{
  var self = this;

  /*************************/
  /* Variables Declaration */
  /*************************/
  self.role_key = jsonRole.role_key;
  self.role_label = jsonRole.role_label;

  /*************/
  /* Accessors */
  /*************/
  self.isAllRoles = function() {
    return self.role_key == "0";
  }

  /*************/
  /* Functions */
  /*************/
  self.supremeMatches = function(supreme) {
    if (self.isAllRoles()) return true;
    return supreme.jsonData.role_key == self.role_key;
  }
}

return {
    AllRolesWithAny: function()
      {
        var roles = Roles.load();
        roles = _.sortBy(roles, [function(o) { return o.role_label; }]);
        var rolesVM = [];
        rolesVM.push(new roleVM({ "role_key": "0", "role_label": "Any" }));
        for(var iRole = 0; iRole < roles.length; iRole++) {
          rolesVM.push(new roleVM(roles[iRole]));
        }
        return rolesVM;
      }
  }
});
