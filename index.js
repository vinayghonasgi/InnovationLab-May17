/* --------------------------------------------------------
Entry point of Grid Modules for DEV CHALLANGE
version: 0.0
last modified: 02.05.2017 by Vinay Ghonasgi
author: Vinay Ghonasgi
Project Link: https://github.com/vinayghonasgi/InnovationLab-May17
-------------------------------------------------------
email: vinay.ghonasgi@gmail.com---*/

//Loading index.html file.
require('./site/index.html')
//Application of styling logic to main table and its rows, via style.css
require('./site/style.css')

const CurrencyPairTableView = require('./site/lib/view/CurrencyPairTableView').default

//Enabling debugging of application in browser.
global.DEBUG = true

//Initialize url and client with stomp object
const url = "ws://localhost:8011/stomp"
const client = Stomp.client(url)
client.debug = function(msg) {
  if (global.DEBUG) {
    console.info(msg)
  }
}

//Initialize the Currency Pair tableView object by passing client, channel and body->table element.
const tableView = new CurrencyPairTableView(client, '/fx/prices', document.getElementsByTagName('tbody')[0])
const statusNode = document.getElementById('stompData-status')
function connectCallback() {
  statusNode.innerHTML = "It has now successfully connected to a stomp server serving price updates for some foreign exchange currency pairs."
  tableView.init()
}

//Connecting client with chanel to get stomp data along with respective reponse data.
client.connect({}, connectCallback, function(error) {
  statusNode.innerHTML = 'Connection terminated.'
  tableView.unsubscribe()
})

