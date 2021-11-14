# Solution

### Environment
<details>
  <summary>Environment setup</summary>

##### Needed software should be installed
* [Git][1]
* [Node.js][2] (I had a 14th LTS version)
* [Chrome][4] browser installed. It's a very common browser, so I hope you have it.
* [Java][3] (optional) for Allure reporter.

To check all these items installed properly, run one by one in your terminal:
```shell
node -v;
git --version;
java --version;
```

You should see versions for all these items, without any errors.
</details>

***

### Installation
<details>
  <summary>How to install dependencies</summary>

1. Navigate to the folder in which framework will be stored, and run in your terminal copied link (with ssh key):
```shell
git clone git@github.com:bondarukoleh/angular-cypress-assessment.git
```
2. Navigate into the downloaded "angular-cypress-assessment" repository folder
```shell
cd angular-cypress-assessment/
```
3. Install all required dependencies:
```shell
npm i
```
</details>

***

### Test run
<details>
  <summary>How to run tests</summary>

#### Before tests run
Before running the e2e cypress tests you need to **start the application** <br>
Please run in your terminal:
```shell
npm start
```

#### Cypress run
To run the cypress tests you can use the command:
```shell
npm run cypress:run
```

#### Cypress open
You can open the Cypress debugging window with the command:
```shell
npm run cypress:open
```
</details>

***

### Report
<details>
  <summary>How to observe the report</summary>

As the main reporter is [Allure][5]. To integrate it with cypress [allure-plugin][6] is used <br>
To get allure results there should be `--env allure=true` command argument passed or added to [cypress.json][7] env.
I've added it to `cypress:run` command, to not over-complicating the commands, but it should be more configurable of
course. <br>
After the test run, `allure-results` folder will be generated. It's only results, it's not a report yet. <br>
To generate the report you need **Java** installed and command:
```shell
npm run allure:report
```
</details>

***

### Solution details

<details>
  <summary>Approach and implementation details</summary>

#### UI framework approach

Test framework built with **Page Object** pattern. This means we logically group the functionality of the application
by pages. Pages divided into Fragments - logically grouped Elements. Elements - an abstraction above regular HTML
elements: button, input, radiobutton, etc. Elements make it more structural and easier to work with UI elements
and keep calls to the testing framework (cypress in this case) in one place, which makes it easier and with fewer efforts
switch to a different testing framework (e.g. selenium-webdriver). <br>
Elements can be reused in Fragments and Pages, Fragments can be reused in Pages - which gives us flexibility. If
something changes in an Element (e.g. in Button), we need to fix it only in one place. <br>
To create a page, which will represent some page from the application, we need to understand into what logical fragments
we can divide it, and with what elements these fragments will be created. <br>
We can scale Fragments to be built from other smaller Fragments and so on. <br>
The basic scheme of page:
```js
+-----------------------------------------------+
| Page     +---------------+  +---------------+ |
|          |  Fragment     |  |  Fragment     | |
|          |               |  |               | |
|          |  +---------+  |  |  +---------+  | |
|          |  | Element |  |  |  | Element |  | |
|          |  +---------+  |  |  +---------+  | |
|          |               |  |               | |
|          |  +---------+  |  |  +---------+  | |
|          |  | Element |  |  |  | Element |  | |
|          |  +---------+  |  |  +---------+  | |
|          +---------------+  +---------------+ |
|             +---------+        +---------+    |
|             | Element |        | Element |    |
|             +---------+        +---------+    |
+-----------------------------------------------+
```

Cypress team doesn't advise using this approach, instead, they advise using custom commands to group some frequently
needed code. My believes that this approach works great with small applications with not a big amount of tests. While
Application getting bigger and tests amount growth you need to have a more maintainable, extendable, and reliable
approach, with intuitively understandable structure. <br>
Page Objects gives you those characteristics.

As a testing approach, I used **TDD**
***

#### Note about tools that are used
**Cypress** <br>
As the main framework for UI testing [Cypress][9] is used. Great framework if you have a single host application.
Powerful and easy to set up and start to work with. One of the best debugging possibilities I've ever seen. Also, there
are pretty nice features for API testing. <br>
From weaknesses, I would highlight the troubles if you need to switch from application to application. Some info about
this you can find here: [issue][10], [issue][11], [docs][12]. <br>
Another weakness is the poor support of JS [Promises][15]. "Synchronous" way of writing code based on [Generators][16]
which sometimes leads to difficulties, and multiple `then()` calls instead of neat
`async/await`, but it's my humble opinion.

**Mocha** - powerful, flexible, simple, easy-to-use test run library. [docs][13] <br>
**Chai** - great, wide-functional assertion library, [docs][14] <br>
**Allure** - nice, easy-to-use, fast, powerful reporter, [docs][5] <br>

***

##### Note about Element methods
You can notice that Elements has basic `getData`, `sendKeys`, `clickOn` methods. <br/>
That's the way I decided to generalize and structure API of work with UI elements, to not fall
into naming methods dilemma. Because in the end in most cases all we do with the element is click
on it, send some data to it, get some data from it, and wait for it. <br/>
Since cypress waits for elements implicitly, the wait method has not been required so far.

***

##### Note about report decorator
[step][8] decorator created to get more readable report results. <br/>
As a `step` we can consider each test action that brings sense to the test and report. This means that we don't need to
add a step in each function that invokes in the test but to logically grouped function calls.<br/>

##### Note about changes in source code
**ng e2e command**<br>
As a builder for cypress, I used the official cypress angular schematic and builder for the Angular CLI, [@cypress/schematic][17].
I've tried to fix `tnt-assignment-e2e` but I have issues with the incompatibility of the angular version, since time is
short, I decided not to go for it.

**added ids**
To some components, I've added custom IDs to make work with them easier. Of course, naming and way of adding should be
discussed with the dev team.

</details>

***

### About the assessment
<details>
  <summary>Environment setup</summary>

##### Bugs
According to spec, there is one bug that you can find out if you run the test - it's that previous search results are
not cleared if you search with an empty search field again. <br>
And I would expect that application to clear its state after a hard reload of the page, but it's not.

##### PS
Thank you for this assessment, this was interesting for me. I have not tried out Cypress with Angular so far.

</details>

***

[1]: https://git-scm.com/downloads
[2]: https://nodejs.org/en/
[3]: https://www.java.com/en/download/
[4]: https://www.google.com/chrome
[5]: https://docs.qameta.io/allure/#_about
[6]: https://github.com/Shelex/cypress-allure-plugin
[7]: cypress.json
[8]: cypress/support/helpers/reporter/stepDecorator.ts
[9]: https://docs.cypress.io/guides/overview/why-cypress#In-a-nutshell
[10]: https://github.com/cypress-io/cypress/issues/2636
[11]: https://github.com/cypress-io/cypress/issues/3454
[12]: https://docs.cypress.io/api/commands/visit
[13]: https://mochajs.org/
[14]: https://www.chaijs.com/api/
[15]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
[16]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator
[17]: https://docs.cypress.io/guides/migrating-to-cypress/protractor#Angular-Schematic-Configuration
