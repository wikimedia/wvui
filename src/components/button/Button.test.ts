import { shallowMount } from '@vue/test-utils';
import WVUIButton from './Button.vue';

describe('TestButton', () => {
    it('matches the snapshot', () => {
        const wrapper = shallowMount( WVUIButton );

        expect( wrapper.element ).toMatchSnapshot();
    });

    it('renders button element', () => {
        const wrapper = shallowMount( WVUIButton );

        expect( wrapper.get( 'button' ) ).toBeTruthy();
    });

    it('do something on click', () => {
        const wrapper = shallowMount( WVUIButton );

        wrapper.find('button').trigger('click');
        expect(wrapper.emitted().click).toBeTruthy();
    });
})
