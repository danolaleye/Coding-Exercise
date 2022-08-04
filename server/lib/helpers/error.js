module.exports = (type, message, code, status, notify) => {
  const error = new Error(message);
  error.status = status;
  error.type = type;
  error.code = code;
  error.benchmetric = true;

  if (notify) {
    if (notify.benchmetric) console.log("Notifying benchmetric users");
    if (notify.client) {
      console.log("Notifying", notify.recipients);
    }
  }

  throw error;
};
