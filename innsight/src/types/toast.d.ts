export enum toastStates {
    ERROR = 'error',
    INFO = 'info',
    SUCCESS = 'success',
    WARN = 'warn',
  }
  
export interface ToastInterface {
    state: toastStates;
    message: string;
  }
  