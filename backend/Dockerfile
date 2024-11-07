FROM python:3.10-slim

# Install system dependencies required for mysqlclient
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    build-essential \
    default-libmysqlclient-dev \
    pkg-config && \
    rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy the backend code
COPY . /app

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Expose the port Flask runs on (adjust if needed)
EXPOSE 5000

# Command to run the app
CMD ["python", "server.py"]

