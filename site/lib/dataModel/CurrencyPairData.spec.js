/*Import all necessary class files and testdata file for execution of test cases.*/
import expect from 'expect'
import data from '../testdata'
import CurrencyPairData from './CurrencyPairData'
describe('CurrencyPairData', () => {
  const cp = new CurrencyPairData(data)
  it('Should initialize data', () => {
    expect(cp.name).toEqual(data.name)
    expect(cp._history.length).toEqual(1)
  })
  it('resetData should update history', () => {
    cp.resetData(data)
    expect(cp._history.length).toEqual(2)
  })
  it('should return sparkline data accordingly', () => {
    const sparklineData = cp.getSparkLineData()
    expect(sparklineData.length).toEqual(2)
  })
  it('resetHistory should clear history', () => {
    cp.resetHistory()
    expect(cp._history.length).toEqual(0)
  })
})
