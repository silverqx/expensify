import React from 'react'
// import ReactShallowRenderer from 'react-test-renderer/shallow'
import { shallow } from 'enzyme'

import { Header } from '../../components/Header'

describe('Header component', () => {
    // test('should render Header correctly ( react-test-renderer )', () => {
    //     const renderer = new ReactShallowRenderer()
    //     renderer.render(<Header />)
    //     expect(renderer.getRenderOutput()).toMatchSnapshot()
    // })

    test('should render Header correctly', () => {
        const wrapper = shallow(<Header startLogout={() => { }} />)

        expect(wrapper).toMatchSnapshot()
    })

    test('should call startLogout on button click', () => {
        const startLogout = jest.fn()
        const wrapper = shallow(<Header startLogout={startLogout} />)

        wrapper.find('button').simulate('click')

        expect(startLogout).toHaveBeenCalledTimes(1)
    })
})
