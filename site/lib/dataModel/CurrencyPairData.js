/*
* The class represents the model for currency data
* this will represent 6 fields of data that is received via stopm end.
*/
export default class CurrencypairData {
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
  * This method returns an array of data that holds midprice of historical data.
  * Based on which sparkline is rendered accordingly.
  */
  getSparkLineData() {
    const data = this._history.map(item => {
      return (item[0] + item[1]) / 2
    })
    return data;
  }

 /*
  * This sets history array to blank.
  */
  resetHistory() {
    this._history = []
  }
}
