from http.server import HTTPServer, SimpleHTTPRequestHandler
import ssl

ctx=ssl.SSLContext(ssl.PROTOCOL_TLS_SERVER)
# ctx.load_default_certs()
ctx.load_cert_chain(certfile="ca/localhost.pem",keyfile="ca/localhost-key.pem")


httpd = HTTPServer(('0.0.0.0', 443), SimpleHTTPRequestHandler)
httpd.socket = ctx.wrap_socket (httpd.socket, server_side=True,suppress_ragged_eofs=True,do_handshake_on_connect=True)

httpd.serve_forever()