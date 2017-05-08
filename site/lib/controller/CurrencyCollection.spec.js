/*Import all necessary class files and testdata file for execution of test cases.*/
import expect from 'expect'
import data, { getRandomData } from '../testdata';
import CurrencyCollectionList from './CurrencyCollectionList';
describe('CurrencyCollectionList', () => {
  const cc = new CurrencyCollectionList;
  const ccWithInterval = new CurrencyCollectionList(30)
  it('Should init with empty currency pair list and associated handlers', () => {
    expect(cc.list.length).toEqual(0)
    expect(cc.handlers.length).toEqual(0)
    expect(cc.sparkLineHandlers.length).toEqual(0)
    expect(Object.keys(cc.presentPairs).length).toEqual(0)
    expect(cc._sparkLineIntervalID).toEqual(null)
  })
  it('Should call the respective subscribed listener on data change accordingly', () => {
    let initVal = -1
    const func = () => {
      initVal = 1
    }
    cc.subscribe(func)
    expect(initVal).toEqual(-1)
    cc.updateData(getRandomData())
    expect(initVal).toEqual(1)
    cc.unsubscribe(func)
    expect(cc.handlers.length).toEqual(0)
  })
   it('Should have a valid interval ID if sparkline interval is non null', () => {
    expect(ccWithInterval._sparkLineIntervalID).toNotEqual(null)
  })
})
