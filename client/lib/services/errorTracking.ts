import { showToast } from '@/components/ui/toaster';

interface ErrorDetails {
  error: Error;
  componentStack?: string;
  context?: Record<string, unknown>;
}

class ErrorTrackingService {
  private static instance: ErrorTrackingService;
  private initialized = false;

  private constructor() {}

  public static getInstance(): ErrorTrackingService {
    if (!ErrorTrackingService.instance) {
      ErrorTrackingService.instance = new ErrorTrackingService();
    }
    return ErrorTrackingService.instance;
  }

  public init() {
    if (this.initialized) return;

    window.addEventListener('unhandledrejection', this.handleUnhandledRejection);
    window.addEventListener('error', this.handleError);
    this.initialized = true;
  }

  public trackError({ error, componentStack, context = {} }: ErrorDetails) {
    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.group('Error Tracked:');
      console.error(error);
      if (componentStack) console.error('Component Stack:', componentStack);
      if (Object.keys(context).length) console.error('Context:', context);
      console.groupEnd();
    }

    // Show user-friendly toast
    showToast(this.getUserFriendlyMessage(error), 'error');

    // Here you would typically send to your error tracking service
    // Example: Sentry.captureException(error, { extra: { componentStack, ...context } });
  }

  private handleUnhandledRejection = (event: PromiseRejectionEvent) => {
    this.trackError({
      error: event.reason,
      context: { type: 'unhandledRejection' }
    });
  };

  private handleError = (event: ErrorEvent) => {
    this.trackError({
      error: event.error,
      context: { type: 'windowError' }
    });
  };

  private getUserFriendlyMessage(error: Error): string {
    // Add custom error messages based on error types
    if (error.name === 'NetworkError') {
      return 'Unable to connect to the server. Please check your internet connection.';
    }
    if (error.name === 'ValidationError') {
      return 'Please check your input and try again.';
    }
    return error.message || 'An unexpected error occurred. Please try again.';
  }

  public cleanup() {
    window.removeEventListener('unhandledrejection', this.handleUnhandledRejection);
    window.removeEventListener('error', this.handleError);
    this.initialized = false;
  }
}

export const errorTracking = ErrorTrackingService.getInstance(); 