roleViewModel = function(jsonRole)
{
  var self = this;

  self.key = ko.observable(jsonRole.role_key);
  self.label = ko.observable(jsonRole.role_label);

  self.is_special_role = function()
  {
    return self.key().startsWith('0');
  }

  self.sort = function(comparedRole) {
    if (self.is_special_role() && comparedRole.is_special_role())
    {
      return self.key() > comparedRole.key() ? 1 : -1;
    }
    if (self.is_special_role())
    {
      return -1;
    }
    if (comparedRole.is_special_role())
    {
      return 1;
    }

    return self.label() > comparedRole.label() ? 1 : -1
  }
}
