import deleter from './deleter'
import getter from './getter'
import setter from './setter'
import state from './state'
const cookies = { ...deleter, ...getter, ...setter, ...state }
export default cookies
