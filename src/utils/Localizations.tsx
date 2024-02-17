import LocalizedStrings, {GlobalStrings} from 'react-native-localization';
import STATUS_CODES from '../../backend/models/status';
//GENERIC_ERROR,
// USER_NOT_FOUND,
// INVALID_NUMBER,
// SENT_CODE,
// NUMBER_NOT_EXIST,
// ERROR_SENDING_CODE,
// TOO_MANY_ATTEMPTS,
// CODE_DENIED,
// CODE_EXPIRED,
// CODE_FAILED,
// ALREADY_REPORTED,
// MISMATCHED_IMAGE,
export const Localizations = new LocalizedStrings({
  es: {
    error: 'Error',
    success: '¡Éxito!',
    cancel: 'Cancelar',
    grant: 'Conceder',
    GENERIC_ERROR: 'Se ha producido un error',
    USER_NOT_FOUND: 'Ese usuario no existe',
    SENT_CODE: 'Ya se ha enviado un código a ',
    NUMBER_NOT_EXIST: 'Ese número no existe',
    ERROR_SENDING_CODE: 'Hubo un error al enviar el código',
    TOO_MANY_ATTEMPTS: 'Ha intentado demasiadas veces, espere 5 minutos',
    CODE_DENIED: 'El código es incorrecto',
    CODE_EXPIRED: 'El código ha caducado',
    CODE_FAILED: 'Hubo un error al enviar el código',
    NO_CONNECTION:
      'Hubo un error al conectarse al servidor, verifique su conexión a Internet.',
    loginButton: 'Entrar',
    enterCodeTitle: 'Ingrese el código',
    enterCodeDesc: 'Ingrese el código de verificación enviado a ',
    activateCameraTitle: 'Activar cámara',
    activateCameraDesc:
      'Niveles De Niveles necesita su cámara para tomar una foto del incidente.',
    logoutTitle: 'Cerrar sesión',
    logoutDesc: '¿Está seguro de que desea cerrar sesión?',
    logout: 'Cerrar sesión',
    sending: 'Enviando',
      close: 'Cerrar'
  }
});