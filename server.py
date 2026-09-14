import http.server
import socketserver
import os
import sys

# Ensure UTF-8 output in Windows console
if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding='utf-8', errors='replace')
    except Exception:
        pass

PORT = 8080
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class NoCacheHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def end_headers(self):
        # Prevent browser caching so live edits appear immediately
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

class ThreadedHTTPServer(socketserver.ThreadingMixIn, socketserver.TCPServer):
    daemon_threads = True
    allow_reuse_address = True

def start_server():
    global PORT
    for attempt in range(10):
        try:
            with ThreadedHTTPServer(("", PORT), NoCacheHandler) as httpd:
                url = f"http://localhost:{PORT}"
                print("======================================================")
                print(f"LANDING PAGE MULTITHREADED SERVER: {url}")
                print(f"Serving Directory: {DIRECTORY}")
                print("======================================================")
                sys.stdout.flush()
                try:
                    httpd.serve_forever()
                except KeyboardInterrupt:
                    print("Server shutting down...")
                    httpd.server_close()
                    break
        except OSError as e:
            if "address already in use" in str(e).lower() or getattr(e, 'errno', None) in (48, 98, 10048):
                PORT += 1
            else:
                raise e

if __name__ == "__main__":
    start_server()
