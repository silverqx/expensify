import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import '../../tools/env'

const adapter = new Adapter()
Enzyme.configure({ adapter })
