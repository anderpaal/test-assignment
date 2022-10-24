# Test-assignment
An example project of Webdriver.IO using Chromedriver 106.0.1.

### Prerequisites for testing
Make sure to have  [Git](https://git-scm.com) installed.

```git clone``` the project to your machine.


Make sure to have [NodeJs](https://nodejs.org/en/) installed.

```npm install``` in the root folder of the cloned project to install dependencies.

### Chromedrvier
Make sure to have Google Chrome browser installed.

```npm install chromedriver --save-dev``` to update to lates version.

### Running tests
```npm run test``` - run all tests.

```npm run login``` - run test from specs/Login.ts.

```npm run orders``` - run test from specs/Orders.ts.

### Test results
Test results will be displayed in the terminal after running all tests.

### Reasons for choosing TypeScript
I use TypeScript because it is a type version of javascript with some added features.

### Reasons for choosing Webdriver.IO
I use Webdriver.IO because I have previous experience with it.

### Test case introduction
``test/specs/Login.ts``

TC 1 - Should get an error for trying to log in with wrong password.

TC 2 - Should successfully log in and log out.


``test/specs/Orders.ts``

TC 1 - Should successfully complete order while logged in.

TC.2 - Should confirm error message after not accepting Terms of service.

TC.3 - Should check for order reference in "Order history" after successful order.
