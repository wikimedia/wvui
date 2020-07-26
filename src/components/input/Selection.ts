/**
 * Selected HTMLInputElement text range.
 *
 * @see https://developer.mozilla.org/docs/Web/API/HTMLInputElement/setSelectionRange
 */
export interface SelectionRange {
	/**
	 * The 0-based index of the first selected character. An index greater than the length of the
	 * element's value is treated as pointing to the end of the value.
	 */
	start: number
	/**
	 * The 0-based index of the character after the last selected character. An index greater than
	 * the length of the element's value is treated as pointing to the end of the value.
	 */
	end: number
	/** The direction in which the selection is performed. */
	direction?: SelectionDirection
}

export type SelectionDirection = 'forward' | 'backward' | 'none';
