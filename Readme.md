DB Updating Table Development Challenge
===============================
The details about the solution are as follows:

The solution is in the `site/index.html` file.
To view the solution, run
```
npm install
npm start
```

from within this directory.  This will start a development server (using webpack). Once the development server has started, navigate to [http://localhost:8011](http://localhost:8011) to see the solution
To run test,
```
npm test
```

Test framework is used for this solution is `mocha` and test runner used is `karma` alongwith the `expect` assertion library. All test files are in `site/lib` and the name ends with `.spec.js`.
All the new files are there in `site/lib` directory. The main three solution files are as follows:

* `CurrencyPairData` -> Model to represent the currency data.
* `CurrencyPairView` -> This Encapsulates `CurrencyPairData` an also creates a table row node when required
* `CurrencyPairCollectionList` -> Represents a list of `CurrencyPair` items. On every new `CurrencyPair` is received or updates, it sorts the list in increasing order of `lastChangeBid` and fires all the subscribed listeners. It also fires all the listeners subscribed to sparkline event every given interval while creating the object.
* `CurrencyPairTableView` -> This is the main view that represents and displays the table data in the browser. This object or class performs initial functionality specific to browser, like:
    * subscribing to the `/fx/prices` channel to get updates.
    * render the table data on every update received.
    * render the sparkline every 30 seconds from the history of updates.
    * first sparkline is generated when first data comes for each of the currency pair. Then it refreshes every 30 seconds.
* Tests have been written for all files except `CurrencyPairTableView`
