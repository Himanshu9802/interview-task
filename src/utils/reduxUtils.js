export function handleLoading(state) {
  state.loading = true;
}

export function handleFulfilled(state) {
  state.loading = false;
}

export function handleReject(state, { payload }) {
  state.loading = false;
  state.errorMessage = payload?.error;
}
