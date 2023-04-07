const Handlebars = require('handlebars');

//allows for checking if values are equal to one another
Handlebars.registerHelper('eq', (a, b) => {
  return a === b;
});
//Exporting to handlebars
module.exports = {
  format_date: (date) => {
    return date.toLocaleDateString();
  },
};
