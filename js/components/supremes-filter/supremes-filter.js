define(['knockout'], function(ko) {

  function supremesFilter(params) {
    var self = this;

    self.filter = params.filter();    
  }

  return supremesFilter;
});
