import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";
@Injectable({
  providedIn: "root",
})
export class NotificationService {
  constructor(private toastr: ToastrService) {}

  showSuccess(message: any, title: any) {
    const successMessage =
      typeof message === "string" ? message : message?.message || "Success";
    this.toastr.success(successMessage, title);
  }

  showError(message: any, title: any) {
    // Handle error objects properly
    const errorMessage = this.extractErrorMessage(message);
    this.toastr.error(errorMessage, title);
  }

  private extractErrorMessage(error: any): string {
    if (typeof error === "string") {
      return error;
    }

    if (error?.message) {
      return error.message;
    }

    if (error?.error?.message) {
      return error.error.message;
    }

    if (error?.error) {
      return typeof error.error === "string"
        ? error.error
        : "An error occurred";
    }

    return "An unknown error occurred";
  }

  showInfo(message: any, title: any) {
    const infoMessage =
      typeof message === "string" ? message : message?.message || "Information";
    this.toastr.info(infoMessage, title);
  }

  showWarning(message: any, title: any) {
    const warningMessage =
      typeof message === "string" ? message : message?.message || "Warning";
    this.toastr.warning(warningMessage, title);
  }
}
