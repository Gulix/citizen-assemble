define(['knockout'], function(ko) {

  function minionBox(params) {
    var self = this;

    self.minionVM = params.minion;

    self.areActionsShown = ko.observable(false);
    self.isRecruitable = ko.pureComputed(function() {
      //return !self.minionVM.isRecruited();
      return true;
    });
    self.isDismissable = ko.pureComputed(function() {
      //return self.minionVM.isRecruited();
      return false;
    });

    /* Static Properties */
    self.minionName = self.minionVM.jsonData.name;
    self.miniatures_number = self.minionVM.jsonData.miniatures;
    self.additional_miniatures = self.minionVM.jsonData.additional_miniatures;
    self.numberOfMiniatures = ko.pureComputed(function() {
      if (self.additional_miniatures == 0) {
        return self.miniatures_number;
      } else {
        return self.miniatures_number + " / " + (self.miniatures_number + self.additional_miniatures);
      }
    })

    self.roleAndLevel = self.minionVM.jsonData.role_key + " Lvl." + self.minionVM.jsonData.level; // TODO: Change the getter on the role text
    self.alignmentIconCss = "supreme-icon-" +
      (self.minionVM.jsonData.is_hero ? (self.minionVM.jsonData.is_villain ? "herovillain" : "hero") : "villain");
    self.supremeImgUrl = "background-image: url(img/supremes/" + ((self.minionVM.jsonData.picture_id != null) ? self.minionVM.jsonData.picture_id : self.minionVM.jsonData.id) + ".jpg)";

    /* Functions */
    self.showActions = function() {
      self.areActionsShown(true);
    }
    self.hideActions = function() {
      self.areActionsShown(false);
    }

    self.recruit = function() {
      if (!self.minionVM.isRecruited()) self.minionVM.recruit();
    }
    self.dismiss = function() {
      if (self.minionVM.isRecruited()) self.minionVM.dismiss();
    }
    self.showInfos = function() {

    }
  }

  return minionBox;
});
