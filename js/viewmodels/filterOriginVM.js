define(['knockout'], function(ko) {

function filterOriginVM(jsonOrigin)
{
  var self = this;

  /*************************/
  /* Variables Declaration */
  /*************************/
  self.origin_key = jsonOrigin.origin_key;
  self.origin_label = jsonOrigin.origin_label;
  self.isActive = ko.observable(true);

  /*************/
  /* Accessors */
  /*************/
  self.allCssClasses = ko.pureComputed(function() {
    var css = 'icon-origin-' + self.origin_key + ' origin-filter-choice supreme-origin-' + self.origin_key;

    if (self.isActive())
      css += ' origin-active';
    else
      css += ' origin-inactive';
    return css;
  });

  /*************/
  /* Functions */
  /*************/
  self.toggle = function() {
    self.isActive(!self.isActive());
  }
  self.supremeMatches = function(supreme) {
    if (self.isActive()) {
      return supreme.jsonData.origin == self.origin_key;
    }
    return false;
  }
}

return {
    NatureOrigin: function()
      { return new filterOriginVM({ "origin_key": "nature", "origin_color": "#0050DD" }) },
    ScienceOrigin: function()
      { return new filterOriginVM({ "origin_key": "science", "origin_color": "#F8C70D" }) },
    MysteryOrigin: function()
      { return new filterOriginVM({ "origin_key": "mystery", "origin_color": "#DD0000" }) }
  }
});
