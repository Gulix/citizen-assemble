define(['knockout'], function(ko) {

function filterAlignmentVM(isHero, isVillain)
{
  var self = this;

  /*************************/
  /* Variables Declaration */
  /*************************/
  self.isHeroes = isHero;
  self.isVillains = isVillain;
  self.isActive = ko.observable(true);

  /*************/
  /* Accessors */
  /*************/
  self.allCssClasses = ko.pureComputed(function() {
    var css = 'icon-' + (self.isHeroes ? 'hero' : '') + (self.isVillains ? 'villain' : '');
    css += ' alignment-filter-choice';

    if (self.isActive())
      css += ' alignment-active';
    else
      css += ' alignment-inactive';
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
      return ((supreme.jsonData.is_villain == 1) == self.isVillains)
        && ((supreme.jsonData.is_hero == 1) == self.isHeroes);
    }
    return false;
  }
}

return {
    BothAlignments: function()
      { return new filterAlignmentVM(true, true) },
    HeroAlignment: function()
      { return new filterAlignmentVM(true, false) },
    VillainAlignment: function()
      { return new filterAlignmentVM(false, true) }
  }
});
