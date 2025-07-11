import { Injectable, ErrorHandler } from "@angular/core";
import { NotificationService } from "./notification.service";

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private notificationService: NotificationService) {}

  handleError(error: any): void {
    console.error("Global error caught:", error);

    // Extract meaningful error message
    let errorMessage = "An unexpected error occurred";

    if (error?.message) {
      errorMessage = error.message;
    } else if (error?.error?.message) {
      errorMessage = error.error.message;
    } else if (typeof error === "string") {
      errorMessage = error;
    }

    // Show user-friendly error notification
    this.notificationService.showError(errorMessage, "Error");

    // Log detailed error for debugging
    if (error?.stack) {
      console.error("Error stack:", error.stack);
    }
  }
}
