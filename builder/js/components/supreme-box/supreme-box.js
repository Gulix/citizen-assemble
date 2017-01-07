define(['knockout'], function(ko) {

  function supremeBox(params) {
    var self = this;

    self.supremeVM = params.supreme;

    self.areActionsShown = ko.observable(false);
    self.isRecruitable = ko.pureComputed(function() {
      return !self.supremeVM.isRecruited();
    });
    self.isDismissable = ko.pureComputed(function() {
      return self.supremeVM.isRecruited();
    });
    self.isHonoraryMember = self.supremeVM.isHonoraryMember();

    /* Static Properties */
    self.supremeName = self.supremeVM.jsonData.name;
    self.ap_granted = self.supremeVM.jsonData.ap_granted;
    self.minions_granted = self.supremeVM.jsonData.minions_granted;
    self.roleAndLevel = self.supremeVM.jsonData.role_key + " Lvl." + self.supremeVM.jsonData.level; // TODO: Change the getter on the role text
    self.alignmentIconCss = "supreme-icon-" +
      (self.supremeVM.jsonData.is_hero ? (self.supremeVM.jsonData.is_villain ? "herovillain" : "hero") : "villain");
    self.originIconCss = "supreme-icon-" + self.supremeVM.jsonData.origin;
    self.originCss = "supreme-origin-" + self.supremeVM.jsonData.origin;
    self.supremeImgUrl = "background-image: url(img/supremes/" + ((self.supremeVM.jsonData.picture_id != null) ? self.supremeVM.jsonData.picture_id : self.supremeVM.jsonData.id) + ".jpg)";

    /* Functions */
    self.showActions = function() {
      self.areActionsShown(true);
    }
    self.hideActions = function() {
      self.areActionsShown(false);
    }

    self.recruit = function() {
      if (!self.supremeVM.isRecruited()) self.supremeVM.recruit();
    }
    self.dismiss = function() {
      if (self.supremeVM.isRecruited()) self.supremeVM.dismiss();
    }
    self.showInfos = function() {

    }
  }

  return supremeBox;
});
