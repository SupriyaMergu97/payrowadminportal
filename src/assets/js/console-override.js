// Console override to prevent [object Object] and [object Event] logging
(function () {
  "use strict";

  // Store original console methods
  const originalLog = console.log;
  const originalError = console.error;
  const originalWarn = console.warn;
  const originalInfo = console.info;

  // Helper function to stringify objects properly
  function formatArgs(args) {
    return Array.from(args).map((arg) => {
      if (arg && typeof arg === "object") {
        // Handle Event objects
        if (arg.constructor && arg.constructor.name === "Event") {
          return `[Event: ${arg.type}]`;
        }

        // Handle File objects
        if (arg instanceof File) {
          return `[File: ${arg.name}, Size: ${arg.size}, Type: ${arg.type}]`;
        }

        // Handle FileList objects
        if (arg instanceof FileList) {
          return `[FileList: ${arg.length} files]`;
        }

        // Handle HTMLInputElement file inputs
        if (arg && arg.files instanceof FileList) {
          return `[Input with ${arg.files.length} files]`;
        }

        // Handle regular objects
        if (arg.constructor === Object || arg.constructor === Array) {
          try {
            return JSON.stringify(arg, null, 2);
          } catch (e) {
            return "[Object: Cannot stringify - circular reference]";
          }
        }

        // Handle other objects with toString method
        if (arg.toString && typeof arg.toString === "function") {
          const stringValue = arg.toString();
          if (stringValue === "[object Object]") {
            return `[${arg.constructor?.name || "Object"}]`;
          }
          return stringValue;
        }

        return "[Unknown Object]";
      }

      return arg;
    });
  }

  // Override console methods only in development
  if (
    typeof window !== "undefined" &&
    window.location.hostname === "localhost"
  ) {
    console.log = function (...args) {
      originalLog.apply(console, formatArgs(args));
    };

    console.error = function (...args) {
      originalError.apply(console, formatArgs(args));
    };

    console.warn = function (...args) {
      originalWarn.apply(console, formatArgs(args));
    };

    console.info = function (...args) {
      originalInfo.apply(console, formatArgs(args));
    };
  }

  // Suppress webpack dev server verbose logging
  if (typeof window !== "undefined" && window.addEventListener) {
    // Suppress WebSocket connection logs
    const originalWebSocket = window.WebSocket;
    window.WebSocket = function (url, protocols) {
      const ws = new originalWebSocket(url, protocols);

      // Override event handlers to prevent logging Event objects
      const originalAddEventListener = ws.addEventListener;
      ws.addEventListener = function (type, listener, options) {
        const wrappedListener = function (event) {
          try {
            return listener.call(this, event);
          } catch (e) {
            console.error(`WebSocket ${type} event error:`, e.message);
          }
        };
        return originalAddEventListener.call(
          this,
          type,
          wrappedListener,
          options,
        );
      };

      return ws;
    };
  }
})();
