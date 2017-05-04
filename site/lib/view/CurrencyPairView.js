import CurrencyPair from '../dataModel/CurrencyPair'

/*
* This view renders CurrencyPair model.
* Every single view represents a single row in the main table.
*/
export default class CurrencyPairView {
  constructor(data) {
    this.currencyPair = new CurrencyPair(data);

    this._trNode = null
    this._sparkLine = null
    this.initialSparklineRendered = false
  }

  resetData(data) {
    this.currencyPair.resetData(data)
  }

  /*
  * Create and cache the DOM nodes. Update its data too.
  * This method creates a single row with updated data and returns the same.
  * The data being referred and assigned via currencyPair data model.
  */
  getNode() {
    if (this._trNode) {
      this._tdName.textContent = this.currencyPair.name
      this._tdBestBid.textContent = this.currencyPair.bestBid
      this._tdBestAsk.textContent = this.currencyPair.bestAsk
      this._tdLastChangeBestBid.textContent = this.currencyPair.lastChangeBid
      this._tdLastChangeBestAsk.textContent = this.currencyPair.lastChangeAsk
      return this._trNode
    }
    const tr = document.createElement('tr')
    const tdName = document.createElement('td')
    tdName.textContent = this.currencyPair.name
    tdName.setAttribute('class', 'currency-pair-name')
    const tdBestBid = document.createElement('td')
    tdBestBid.textContent = this.currencyPair.bestBid
    const tdBestAsk = document.createElement('td')
    tdBestAsk.textContent = this.currencyPair.bestAsk
    const tdLastChangeBestBid = document.createElement('td')
    tdLastChangeBestBid.textContent = this.currencyPair.lastChangeBid
    const tdLastChangeBestAsk = document.createElement('td')
    tdLastChangeBestAsk.textContent = this.currencyPair.lastChangeAsk
    const tdSparkline = document.createElement('td')
    tdSparkline.setAttribute('class', 'currency-sparkline');
    const sparks = document.createElement('span')
    tdSparkline.appendChild(sparks)
    tr.appendChild(tdName)
    tr.appendChild(tdBestBid)
    tr.appendChild(tdBestAsk)
    tr.appendChild(tdLastChangeBestBid)
    tr.appendChild(tdLastChangeBestAsk)
    tr.appendChild(tdSparkline)

    this._trNode = tr
    this._tdName = tdName
    this._tdBestBid = tdBestBid
    this._tdBestAsk = tdBestAsk
    this._tdLastChangeBestBid = tdLastChangeBestBid
    this._tdLastChangeBestAsk = tdLastChangeBestAsk
    this._sparks = sparks
    return this._trNode
  }

  /*
  Draw sparkline from the change history maintained
  */
  drawSparkLine() {
    const data = this.currencyPair.getSparkLineData()
    this.currencyPair._history = []
    if (!this._sparkLine) {
      this._sparkLine = new Sparkline(this._sparks)
    }
    this._sparkLine.draw(data)
    this.currencyPair.resetHistory()
  }

  /*
  If initial sparkline is not rendered then render it or else
  re-render it with updated sparkline data for specific node.
  */
  drawInitialSparkLine() {
    if (this.initialSparklineRendered) {
      return
    }
    this.initialSparklineRendered = true
    const data = this.currencyPair.getSparkLineData()
    if (!this._sparkLine) {
      this._sparkLine = new Sparkline(this._sparks)
    }
    this._sparkLine.draw(data)
  }
}
