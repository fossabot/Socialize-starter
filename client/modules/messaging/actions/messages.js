export default {
  sendMessage() {},
  increaseLimit({ LocalState }, num) {
    const current = LocalState.get('MESSAGING_LIMIT');
    return LocalState.set('MESSAGING_LIMIT', current + num);
  },
  resetLimit({ LocalState }) {
    return LocalState.set('MESSAGING_LIMIT', null);
  },
  clearErrors({ LocalState }) {
    return LocalState.set('MESSAGING_ERROR', null);
  },
};
