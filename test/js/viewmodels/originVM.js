define(['knockout'], function(ko) {

function originVM(jsonOrigin)
{
  var self = this;

  self.origin_key = jsonOrigin.origin_key;
  self.origin_label = jsonOrigin.origin_label;
  self.origin_color = jsonOrigin.origin_color;
}

return {
    newOriginVM: function(jsonOrigin)
      { return new originVM(jsonOrigin); }
  }
});
