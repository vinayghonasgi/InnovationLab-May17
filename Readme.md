DB Updating Table Development Challenge
===============================
The details about the solution are as follows:

The solution is in the `site/index.html` file. The startup file is index.js which initiates or launches the application.
To view the solution in browser, run below steps. (By switching in "InnovationLab-May17" directory, whereever you clone it)
```
npm install
npm start
```

from within this directory.  This will start a development server (using webpack). Once the development server has started, navigate to [http://localhost:8011](http://localhost:8011) to see the solution
To run test, follow below command to see the test result output in the nodejs command prompt window.
```
npm test
```

Test framework is used for this solution is `mocha` and test runner used is `karma` alongwith the `expect` assertion library. All test files are in `site/lib` and the name ends with `.spec.js`.
All the new files are there in `site/lib` directory. The main four solution files are as follows:

* `CurrencyPairData` -> Model to represent the currency data.
* `CurrencyPairView` -> This Encapsulates `CurrencyPairData` an also creates a table row node when required
* `CurrencyCollectionList` -> Represents a list of `CurrencyPair` items. On every new `CurrencyPair` is received or updates, it sorts the list in increasing order of `lastChangeBid` and fires all the subscribed listeners. It also fires all the listeners subscribed to sparkline event every given interval while creating the object.
* `CurrencyPairTableView` -> This is the main view that represents and displays the table data in the browser. This object or class performs initial functionality specific to browser, like:
    * Subscribing to the `/fx/prices` channel to get updates.
    * Render the currency pair data received via stomp in tabular format.
    * Render the table data on every update received via stomp end.
    * Render the sparkline every 30 seconds from the history of updates.
    * The First sparkline is generated when data comes for each of the currency pair for the first time. Then it refreshes every 30 seconds as and when stomp data gets updated on backend.
    * Tests have been written for all files.  (File `CurrencyPairTableView` is not included).
    * The bottom section displays certain text based on stomp connection success or failure accordingly.
