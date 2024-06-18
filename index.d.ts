import { ToastType, ToastOptions } from 'react-native-toast-notifications';

export type CustomToastOptions = ToastOptions & { title: string };

declare global {
  var toast: ToastType & {
    show: (
      message: string | JSX.Element,
      toastOptions?: CustomToastOptions
    ) => string;
  };
}

export {};
