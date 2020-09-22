export const RECEIVE_ENTRIES = "RECEIVE_ENTRIES"
export const UPDATE_ENTRY = "UPDATE_ENTRY"

export function receiveEntries(entries) {
    return {
        type: RECEIVE_ENTRIES,
        entries
    }
}

export function updateEntry(entry) {
    return {
        type: UPDATE_ENTRY,
        entry
    }
}