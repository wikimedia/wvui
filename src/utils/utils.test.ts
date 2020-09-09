import { debounce } from '../utils';

describe( 'utils: debounce', () => {
	beforeEach( () => {
		jest.useFakeTimers();
	} );

	it( 'debounces a function properly', () => {
		const milliseconds = 100;
		const func = jest.fn();
		const debouncedFunction = debounce( func, milliseconds, false );

		debouncedFunction();
		expect( func ).not.toBeCalled();

		jest.runTimersToTime( milliseconds / 2 );
		expect( func ).not.toBeCalled();

		jest.runTimersToTime( milliseconds );
		expect( func ).toBeCalled();
		expect( func.mock.calls.length ).toBe( 1 );
	} );

	it( 'debounces a function properly with isImmediate set to true', () => {
		const milliseconds = 100;
		const func = jest.fn();
		const debouncedFunction = debounce( func, milliseconds, true );

		debouncedFunction();
		expect( func ).toHaveBeenCalledTimes( 1 );

		jest.runTimersToTime( milliseconds / 2 );
		expect( func ).toHaveBeenCalledTimes( 1 );

		jest.runTimersToTime( milliseconds );
		expect( func ).toBeCalled();
		expect( func ).toHaveBeenCalledTimes( 1 );
	} );
} );
