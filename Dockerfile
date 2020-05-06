# Image
FROM python:3

# Set workdir
WORKDIR /usr/src/app

# Copy files
COPY ./src/server/ .

# Installing packages
RUN pip install Flask
RUN pip install flask_cors

# Exposing server
EXPOSE 8080
ENTRYPOINT ["python", "server.py"]
