export function setFlashMessage(req, type, message) {
  req.flash(type, message)
}
