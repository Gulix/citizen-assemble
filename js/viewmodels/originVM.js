define(['knockout'], function(ko) {

function originVM(jsonOrigin)
{
  var self = this;

  /*************************/
  /* Variables Declaration */
  /*************************/
  self.origin_key = jsonOrigin.origin_key;
  self.origin_label = jsonOrigin.origin_label;
  self.origin_color = jsonOrigin.origin_color;

  /*************/
  /* Accessors */
  /*************/
  self.isAllOrigins = function() {
    return self.origin_key == "0";
  }

  /*************/
  /* Functions */
  /*************/
  self.supremeMatches = function(supreme) {
    if (self.isAllOrigins()) return true;
    return supreme.jsonData.origin == self.origin_key;
  }
}

return {
    newOriginVM: function(jsonOrigin)
      { return new originVM(jsonOrigin); },
    NatureOrigin: function()
      { return new originVM({ "origin_key": "nature", "origin_label": "Nature", "origin_color": "#0050DD" }) },
    ScienceOrigin: function()
      { return new originVM({ "origin_key": "science", "origin_label": "Science", "origin_color": "#F8C70D" }) },
    MysteryOrigin: function()
      { return new originVM({ "origin_key": "mystery", "origin_label": "Mystery", "origin_color": "#DD0000" }) },
    AllOrigin: function()
      { return new originVM({ "origin_key": "0", "origin_label": "Any", "origin_color": "#000000" }) }    
  }
});
