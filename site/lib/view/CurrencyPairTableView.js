/** Class CurrencyPairTableView representing currencypair table data view. */

import CurrencyCollectionList from '../controller/CurrencyCollectionList'

export default class CurrencyPairTableView {
  /**
   * Create a point.
   * @param {StompClient} client - The stomp client that connects with stomp server.
   * @param {string} channel - The channel that subscribe and receive realtime price updates.
   * @param {Node} containerNode - The main DOM node where-in currency pair table is rendered.
   */

  constructor(client, channel, containerNode) {
    this.client = client
    this.channel = channel
    this.containerNode = containerNode
    this._firstSparklineRendered = false
    this.CurrencyCollectionList = new CurrencyCollectionList(30 * 1000)
    this.onNewData = this.onNewData.bind(this)
    this.subscribe = this.subscribe.bind(this)
    this.unsubscribe = this.unsubscribe.bind(this)
    this.render = this.render.bind(this)
    this.init = this.init.bind(this)
  }

  /*
  * Event listener that listens to data updates from Stomp
  */
  onNewData(e) {
    const data = JSON.parse(e.body)
    this.CurrencyCollectionList.updateData(data)
  }

  /* The method that subscribes to price channel to get currencypair updates */
  subscribe() {
    this.subscriptionID = this.client.subscribe(this.channel, this.onNewData)
    this.CurrencyCollectionList.subscribe(this.render)
    this.CurrencyCollectionList.subscribe(this.drawInitialSparkLine)
    this.CurrencyCollectionList.subscribeToSparkLineEvent(this.drawSparkLine)
  }

  /*
  * This is for unsubscribing from stomp and currency collection.
  */
  unsubscribe() {
    this.client.unsubscribe(this.subscriptionID)
    this.CurrencyCollectionList.unsubscribe(this.render)
    this.CurrencyCollectionList.unsubscribe(this.drawInitialSparkLine)
    this.CurrencyCollectionList.unsubscribeFromSparkLineEvent(this.drawSparkLine)
  }

  /*
  * Rendering the currencypair tabular data by adding nodes in main DOM table body accordingly.
  */
  render(currencyList) {
    const node = this.containerNode
    while (node.firstChild) {
      node.removeChild(node.firstChild)
    }
    currencyList.forEach(pair => {
      node.appendChild(pair.getNode())
    })
    if (!this._firstSparklineRendered) {
      this._firstSparklineRendered = true
    }
  }

  /*
  * Triggering sparkline draw for each currency pair.
  */
  drawSparkLine(currencyList) {
    currencyList.forEach(pair => {
      pair.drawSparkLine()
    })
  }

  /*
  * Drawing initial sparkline when first lot of data comes via stomp
  */
  drawInitialSparkLine(currencyList) {
    currencyList.forEach(pair => {
      pair.drawInitialSparkLine()
    })
  }

/* This is starup method from where Currency Pair flow is initiated from startup index.js*/
  init() {
    this.subscribe()
  }
}
