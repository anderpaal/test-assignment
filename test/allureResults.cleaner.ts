const del = require('del');

(async () => {
    const deleteResults = await del(['./allure-results', './allure-report']);
    console.info(`Deleting files from ./allure-results & ./allure/report`);
})();