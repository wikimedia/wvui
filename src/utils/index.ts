// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyFunction = ( ...args: any[] ) => void;

export function debounce<F extends AnyFunction>(
	func: F,
	waitMilliseconds: number,
	callImmediately = false,
): ( this: ThisParameterType<F>, ...args: Parameters<F> ) => void {
	let timeoutId: ReturnType<typeof setTimeout> | undefined;

	return function ( this: ThisParameterType<F>, ...args: Parameters<F> ) {
		// eslint-disable-next-line @typescript-eslint/no-this-alias
		const context = this;

		const laterFunc = function (): void {
			timeoutId = undefined;

			if ( !callImmediately ) {
				func.apply( context, args );
			}
		};

		const shouldBeCalledImmediately = callImmediately && timeoutId === undefined;

		if ( timeoutId !== undefined ) {
			clearTimeout( timeoutId );
		}

		timeoutId = setTimeout( laterFunc, waitMilliseconds );

		if ( shouldBeCalledImmediately ) {
			func.apply( context, args );
		}
	};
}
