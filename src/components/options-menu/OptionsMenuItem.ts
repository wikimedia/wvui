export interface OptionsMenuItem {
	/** ID used to identify the item. By default, IDs are not displayed, only labels are. */
	id: string,
	/** Label for display */
	label: string,
	/** Whether the item is disabled. Disabled items cannot be selected. */
	disabled?: boolean
}
