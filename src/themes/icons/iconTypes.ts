export interface Icon {
	path: string,
	shouldFlip?: boolean
}

export interface IconVariedByLang {
	langVariants: Record<string, Icon>,
	default: Icon
}

export interface IconVariedByDir {
	dirVariants: Record<string, Icon>,
	default: Icon
}
