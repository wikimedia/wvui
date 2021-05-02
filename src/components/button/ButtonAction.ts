/**
 * Signals the consequence of proceeding in a given view. Do not use more than one non-default
 * action per layout as they should guide the user to the most important action (“call to action”).
 */
export enum ButtonAction {
	/**
	 * A generic action that is neither progressive nor destructive. For example,
	 * notice dismissal.
	 */
	Default = 'default',
	/**
	 * The consequence of this action is to proceed to the next step in or conclude the current
	 * process. For example, creation of a page or submitting data.
	 */
	Progressive = 'progressive',
	/**
	 * The consequence of this action is irreversible, data loss, or is difficult to undo. For
	 * example, deleting a page, discarding a draft edit, or blocking a user. **Never** use
	 * Destructive for cancellation.
	 */
	Destructive = 'destructive'
}

/**
 * @param val
 * @return whether an input is a ButtonAction.
 */
export function isButtonAction( val: unknown ): val is ButtonAction {
	return Object.keys( ButtonAction ).some(
		( key ) => ButtonAction[ key as keyof typeof ButtonAction ] === val
	);
}
