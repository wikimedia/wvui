/**
 * Signals the consequence of proceeding in a given view. Do not use more than one non-default
 * action per layout as they should guide the user to the most important action ("call to action").
 */
export enum PrimaryAction {
  /**
   * A generic or secondary action that is neither progressive nor destructive. For example, notice
   * dismissal.
   */
  Default = 'default',
  /**
   * The consequence of this action is to proceed to the next step in or conclude the current
   * process. For example, creation of a page or confirmation that .
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
export function isPrimaryAction( val: unknown ): val is PrimaryAction {
	return Object.keys( PrimaryAction ).some(
		( key ) => PrimaryAction[ key as keyof typeof PrimaryAction ] === val
	);
}
