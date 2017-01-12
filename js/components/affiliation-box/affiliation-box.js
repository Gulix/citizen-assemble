define(['knockout'], function(ko) {

  function affiliationBox(params) {
    var self = this;

    self.affiliation = params.affiliation;
    self.borderColor = ko.pureComputed(function() {
      return "border-color: " + self.affiliation.rgbColor();
    });
    self.imageSrc = ko.pureComputed(function() {
      return "img/factions/" + self.affiliation.key() + ".png";
    });
  }

  return affiliationBox;
});
