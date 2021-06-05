module.exports = {
  /**
   * Converts JS object into query string.
   *
   * @param {object[]} obj Object to serialise
   * @author {string} 9 users - https://stackoverflow.com/a/1714899/9564635
   */
  serialize: function (obj) {
    var str = [];
    for (var p in obj)
      if (obj.hasOwnProperty(p)) {
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
      }
    return str.join("&");
  },
};
