const Handlebars = require('handlebars');

//allows for checking if values are equal to one another
Handlebars.registerHelper('eq', (a, b) => {
    return a === b;
  });

module.exports = {

    delete_icon: () => {
            return `<span for="img" aria-label="delete">X</span>`;
    },
    format_date: (date) => {
        return date.toLocaleDateString();
    },
};