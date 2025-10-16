#!/usr/bin/env python3
"""
Deployment script for iSING Lab Homepage
Serves the static website using Python's built-in HTTP server
"""

import http.server
import socketserver
import os
import sys
import argparse
from pathlib import Path

def main():
    parser = argparse.ArgumentParser(description='Deploy iSING Lab Homepage')
    parser.add_argument('--port', '-p', type=int, default=8080, 
                       help='Port to serve the website on (default: 8080)')
    parser.add_argument('--host', default='localhost', 
                       help='Host to bind to (default: localhost)')
    parser.add_argument('--directory', '-d', default='.', 
                       help='Directory to serve (default: current directory)')
    
    args = parser.parse_args()
    
    # Change to the specified directory
    os.chdir(args.directory)
    
    # Verify required files exist
    required_files = ['index.html', 'assets', 'data-members.json', 'data-news.json', 'data-publications.json']
    missing_files = [f for f in required_files if not os.path.exists(f)]
    
    if missing_files:
        print(f"Error: Missing required files: {', '.join(missing_files)}")
        print("Please run this script from the website root directory")
        sys.exit(1)
    
    # Create a custom handler that serves index.html for all routes
    class CustomHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
        def end_headers(self):
            # Add CORS headers to allow cross-origin requests
            self.send_header('Access-Control-Allow-Origin', '*')
            self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
            self.send_header('Access-Control-Allow-Headers', 'Content-Type')
            super().end_headers()
        
        def do_GET(self):
            # If the path is just '/', serve index.html
            if self.path == '/':
                self.path = '/index.html'
            return super().do_GET()
    
    # Start the server
    with socketserver.TCPServer((args.host, args.port), CustomHTTPRequestHandler) as httpd:
        print(f"🚀 iSING Lab Homepage is now running!")
        print(f"📍 URL: http://{args.host}:{args.port}")
        print(f"📁 Serving from: {os.path.abspath(args.directory)}")
        print(f"🛑 Press Ctrl+C to stop the server")
        print("-" * 50)
        
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n🛑 Server stopped by user")
            sys.exit(0)

if __name__ == "__main__":
    main()
