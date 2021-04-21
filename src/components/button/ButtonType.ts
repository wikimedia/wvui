/**
 * Which button type to use. These types are styled differently, to communicate the different
 * roles they play in the UI.
 */
export enum ButtonType {
	/**
	 * A normal button that has a frame and is not the most important action.
	 */
	Normal = 'normal',
	/**
	 * A primary button triggers the most important action. There should be only one primary button
	 * in every view. When using this, also set the type prop to a non-default value, to indicate
	 * what kind of action will be taken.
	 *
	 * When the action prop is set to its default value, a primary button looks the same as a
	 * secondary button.
	 */
	Primary = 'primary',
	/**
	 * A frameless button. Use this sparingly, in situations where a framed button would distract
	 * too much from the surrounding content. This is most often used with icon-only buttons.
	 */
	Quiet = 'quiet'
}

export function isButtonType( val: unknown ) : val is ButtonType {
	// This could just be Object.values( ButtonType ).includes( val ), but we are limited to ES6.
	return Object.keys( ButtonType ).some(
		( key ) => ButtonType[ key as keyof typeof ButtonType ] === val
	);
}
