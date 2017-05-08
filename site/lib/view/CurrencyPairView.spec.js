/*Import all necessary class files and testdata file for execution of test cases.*/
import expect from 'expect'
import data from '../testdata';
import CurrencyPairView from './CurrencyPairView'
describe('CurrencyPairView', () => {
  const cpv = new CurrencyPairView(data)
  it('Should have null node initially before any data arrival from stomp', () => {
    expect(cpv._node).toEqual(null)
    expect(cpv._sparkLine).toEqual(null)
  })
   it('Should update history on call to resetData method', () => {
    cpv.resetData(data)
    expect(cpv.CurrencypairData._history.length).toEqual(2)
  })
   it('Should return <tr> node accordingly using getNode method', () => {
    const node = cpv.getNode()
    expect(node.tagName).toEqual('TR')
    expect(node.children.length).toEqual(6)
    for(var i=0; i<node.children.length; i++) {
      expect(node.children[i].tagName).toEqual('TD')
    }
    expect(node.children[0].textContent).toEqual(data.name)
  })
})
