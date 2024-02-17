enum STATUS_CODES {
    SUCCESS,
    GENERIC_ERROR,
    USER_NOT_FOUND,
    SENT_CODE,
    EMAIL_NOT_EXIST,
    ERROR_SENDING_CODE,
    TOO_MANY_ATTEMPTS,
    CODE_DENIED,
    CODE_EXPIRED,
    CODE_FAILED,
    NO_CONNECTION,
  }
  export default STATUS_CODES;