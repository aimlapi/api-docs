import { ReactElement } from "react";
import { toast, ToastContainer, ToastOptions, TypeOptions } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class ToastService {
  private defaultOptions: ToastOptions = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light"
  };

  private show(message: string, type: TypeOptions, options?: ToastOptions) {
    toast(message, {
      ...this.defaultOptions,
      ...options,
      type
    });
  }

  public getToastContainer(): ReactElement {
    return (
      <ToastContainer
        position={this.defaultOptions.position}
        autoClose={this.defaultOptions.autoClose}
        hideProgressBar={this.defaultOptions.hideProgressBar}
        newestOnTop={false}
        closeOnClick={this.defaultOptions.closeOnClick}
        rtl={false}
        pauseOnFocusLoss
        draggable={this.defaultOptions.draggable}
        pauseOnHover={this.defaultOptions.pauseOnHover}
        theme={this.defaultOptions.theme}
      />
    );
  }

  success(message: string, options?: ToastOptions) {
    this.show(message, "success", options);
  }

  error(message: string, options?: ToastOptions) {
    this.show(message, "error", options);
  }

  warning(message: string, options?: ToastOptions) {
    this.show(message, "warning", options);
  }

  info(message: string, options?: ToastOptions) {
    this.show(message, "info", options);
  }

  dismiss() {
    toast.dismiss();
  }

  dismissById(toastId: string | number) {
    toast.dismiss(toastId);
  }
}

export const toastService = new ToastService();
