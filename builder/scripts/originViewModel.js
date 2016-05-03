originViewModel = function(jsonOrigin)
{
  var self = this;

  self.origin_key = ko.observable(jsonOrigin.origin_key);
  self.origin_label = ko.observable(jsonOrigin.origin_label);

  self.is_special_origin = function()
  {
    return self.origin_key().startsWith('0');
  }

  self.sort_origin = function(comparedOrigin) {
    if (self.is_special_origin() && comparedOrigin.is_special_origin())
    {
      return self.origin_key() > comparedOrigin.origin_key() ? 1 : -1;
    }
    if (self.is_special_origin())
    {
      return -1;
    }
    if (comparedOrigin.is_special_origin())
    {
      return 1;
    }

    return self.origin_label() > comparedOrigin.origin_label() ? 1 : -1
  }
}
