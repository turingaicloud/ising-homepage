# iSING Lab Homepage Deployment Guide

This guide provides multiple ways to deploy the iSING Lab homepage locally.


The simplest way to deploy the website is using the provided Python script.

## Prerequisites
- Python 3 (usually pre-installed on most systems)

## Quick Start
```bash
# Make the script executable and run it
chmod +x start.sh
./start.sh
```

## Custom Options
```bash
# Run on a different port
./start.sh --port 3000

# Run on all interfaces (accessible from other machines)
./start.sh --host 0.0.0.0 --port 8080

# Run from a different directory
./start.sh --directory /path/to/website
```


The website will be available at `http://localhost:8080` (or your specified port).