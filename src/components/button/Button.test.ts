import { shallowMount, mount } from '@vue/test-utils';
import TestButton from './Button.vue';

describe('TestButton', () => {
    it('matches the snapshot', () => {
        const wrapper = shallowMount( TestButton );

        expect( wrapper.element ).toMatchSnapshot();
    });

    it('renders button element with an appropriate class name', () => {
        const wrapper = shallowMount( TestButton );
        const buttonClass = 'mw-ui-button';

        expect( wrapper.get( 'button' ) ).toBeTruthy();
        expect( wrapper.classes( buttonClass ) ).toBeTruthy();
    });

    it('do something on click', () => {
        const onBtnClick = jest.fn();
        const wrapper = mount( TestButton, {
            propsData: {
                onBtnClick: onBtnClick
            }
        } );

        wrapper.find('button').trigger('click');
        expect( onBtnClick ).toHaveBeenCalled();
    });
})
