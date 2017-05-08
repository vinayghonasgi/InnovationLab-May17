import CurrencypairData from '../dataModel/CurrencypairData'
/*
* This view or class renders CurrencyPair model.
* Every single view represents a single row in the main table.
*/
export default class CurrencyPairView {
  constructor(data) {
    this.CurrencypairData = new CurrencypairData(data);

    this._trNode = null
    this._sparkLine = null
    this.initialSparklineRendered = false
  }

  resetData(data) {
    this.CurrencypairData.resetData(data)
  }

  /*
  * Create and cache the DOM nodes. Update its data too.
  * This method creates a single row with updated data and returns the same.
  * The data being referred and assigned via currencyPair data model.
  */
  getNode() {
    if (this._trNode) {
      this._tdName.textContent = this.CurrencypairData.name
      this._tdBestBid.textContent = this.CurrencypairData.bestBid
      this._tdBestAsk.textContent = this.CurrencypairData.bestAsk
      this._tdLastChangeBestBid.textContent = this.CurrencypairData.lastChangeBid
      this._tdLastChangeBestAsk.textContent = this.CurrencypairData.lastChangeAsk
      return this._trNode
    }
    const tr = document.createElement('tr')
    const tdName = document.createElement('td')
    tdName.textContent = this.CurrencypairData.name
    tdName.setAttribute('class', 'currency-pair-name')
    const tdBestBid = document.createElement('td')
    tdBestBid.textContent = this.CurrencypairData.bestBid
    const tdBestAsk = document.createElement('td')
    tdBestAsk.textContent = this.CurrencypairData.bestAsk
    const tdLastChangeBestBid = document.createElement('td')
    tdLastChangeBestBid.textContent = this.CurrencypairData.lastChangeBid
    const tdLastChangeBestAsk = document.createElement('td')
    tdLastChangeBestAsk.textContent = this.CurrencypairData.lastChangeAsk
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
    const data = this.CurrencypairData.getSparkLineData()
    this.CurrencypairData._history = []
    if (!this._sparkLine) {
      this._sparkLine = new Sparkline(this._sparks)
    }
    this._sparkLine.draw(data)
    this.CurrencypairData.resetHistory()
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
    const data = this.CurrencypairData.getSparkLineData()
    if (!this._sparkLine) {
      this._sparkLine = new Sparkline(this._sparks)
    }
    this._sparkLine.draw(data)
  }
}
