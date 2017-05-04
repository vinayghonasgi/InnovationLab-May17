/*
* The class represents the model for currency data
*/
export default class CurrencyPair {
  constructor(data) {
    this._history = []

    this.resetData = this.resetData.bind(this)
    this.getSparkLineData = this.getSparkLineData.bind(this)
    this.resetHistory = this.resetHistory.bind(this)

    this.resetData(data)
  }

/*
* The method that will reset data for a specific currency pair after certain interval,
* and will fetch fresh data accordingly.
*/
  resetData(data) {
    this.name = data.name
    this.bestBid = data.bestBid
    this.bestAsk = data.bestAsk
    this.lastChangeBid = data.lastChangeBid
    this.lastChangeAsk = data.lastChangeAsk
    this._history.push([data.bestBid, data.bestAsk])
  }

  /*
  * @return {Array} An array that holds midprice history.
  */
  getSparkLineData() {
    const data = this._history.map(item => {
      return (item[0] + item[1]) / 2
    })
    return data;
  }

 /*
  * @return {Array} Sets the history array to blank.
  */
  resetHistory() {
    this._history = []
  }
}
