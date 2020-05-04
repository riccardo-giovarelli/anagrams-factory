# Image
FROM python:3

# Set workdir
WORKDIR /usr/src/app

# Copy files
COPY ./src/server/ .

# Installing packages
RUN pip install CherryPy
RUN pip install pandas
RUN pip install requests

# Exposing server
EXPOSE 8080
ENTRYPOINT ["python", "server.py"]
