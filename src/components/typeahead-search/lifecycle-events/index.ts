export interface FetchEndEvent {
    numberOfResults: number,
    resultSetType?: string,
    searchId?: string,
    query: string
}

export interface SuggestionClickEvent {
    index: number,
    numberOfResults: number,
}

export type SubmitEvent = SuggestionClickEvent;
