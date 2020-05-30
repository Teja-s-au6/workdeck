var hbs = require("hbs");

hbs.registerHelper("constructUpdate", function() {
  return `/profileupdate`;
});

hbs.registerHelper("constructUpdateAPI", function() {
  return `/profileupdate?_method=PATCH`;
});

hbs.registerHelper("constructReader", function() {
  return `/company/read/${this.id}`;
});