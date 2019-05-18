from http.server import HTTPServer, BaseHTTPRequestHandler


httpd = HTTPServer(('localhost', 1212), BaseHTTPRequestHandler)
httpd.serve_forever()
