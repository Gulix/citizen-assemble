define([], function()
{

  /* Source : http://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript */
  function getParameterByName(name, url) {
      if (!url) {
        url = window.location.href;
      }
      name = name.replace(/[\[\]]/g, "\\$&");
      var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
          results = regex.exec(url);
      if (!results) return null;
      if (!results[2]) return '';
      return decodeURIComponent(results[2].replace(/\+/g, " "));
  }

  /* Source : http://stackoverflow.com/questions/13063838/add-change-parameter-of-url-and-redirect-to-the-new-url */
  function setGetParameter(paramName, paramValue)
  {
      var url = window.location.href;
      var hash = location.hash;
      url = url.replace(hash, '');
      if (url.indexOf(paramName + "=") >= 0)
      {
          var prefix = url.substring(0, url.indexOf(paramName));
          var suffix = url.substring(url.indexOf(paramName));
          suffix = suffix.substring(suffix.indexOf("=") + 1);
          suffix = (suffix.indexOf("&") >= 0) ? suffix.substring(suffix.indexOf("&")) : "";
          url = prefix + paramName + "=" + paramValue + suffix;
      }
      else
      {
      if (url.indexOf("?") < 0)
          url += "?" + paramName + "=" + paramValue;
      else
          url += "&" + paramName + "=" + paramValue;
      }
      return url + hash;
  }

return {
    getTeamCodeFromUrl: function() { return getParameterByName('teamcode'); },
    getUrlWithTeamCode: function(teamCode) { return setGetParameter('teamcode', teamCode); }
  }
});
