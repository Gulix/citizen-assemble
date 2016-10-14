levelFilterViewModel = function(jsonLevelFilter)
{
  var self = this;

  self.key = ko.observable(jsonLevelFilter.key);
  self.label = ko.observable(jsonLevelFilter.label);
}
