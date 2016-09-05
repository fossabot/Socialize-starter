export default {
  sendMessage(){},
  clearErrors({LocalState}) {
    return LocalState.set('MESSAGING_ERROR', null)
  }
}
