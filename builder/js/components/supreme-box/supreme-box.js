define(['knockout'], function(ko) {

  function supremeBox(params) {
    var self = this;

    self.supremeVM = params.supreme;

    /* Properties */
    self.supremeName = self.supremeVM.jsonData.name;
    self.ap_granted = self.supremeVM.jsonData.ap_granted;
    self.minions_granted = self.supremeVM.jsonData.minions_granted;
    self.roleAndLevel = self.supremeVM.jsonData.role_key + " Lvl." + self.supremeVM.jsonData.level; // TODO: Change the getter on the role text
    self.alignmentIconCss = "supreme-icon-" +
      (self.supremeVM.jsonData.is_hero ? (self.supremeVM.jsonData.is_villain ? "herovillain" : "hero") : "villain");
    self.originIconCss = "supreme-icon-" + self.supremeVM.jsonData.origin;
    self.originCss = "supreme-origin-" + self.supremeVM.jsonData.origin;
    self.supremeImgUrl = "background-image: url(img/supremes/" + ((self.supremeVM.jsonData.pictureId != null) ? self.supremeVM.jsonData.pictureId : self.supremeVM.jsonData.id) + ".jpg)";

    /* Functions */
    self.recruitDismiss = function() {
      if (self.supremeVM.isRecruited()) {
        self.supremeVM.dismiss();
      } else {
        self.supremeVM.recruit();
      }
    }
  }

  return supremeBox;
});
