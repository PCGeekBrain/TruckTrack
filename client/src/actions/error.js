//** Action Creators */
export const setError = error => {
  return {
    type: "SET_NEW_ERROR",
    error
  }
}

export const clearError = key => {
  return {
    type: "CLEAR_ERROR",
    key
  }
}