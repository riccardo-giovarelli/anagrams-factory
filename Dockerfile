# Image
FROM python:3

# Copy files
COPY ./src/server/ ./

# Installing packages
RUN pip install CherryPy
RUN pip install pandas
RUN pip install --no-cache-dir -r requirements.txt

# Exposing server
EXPOSE 8080
ENTRYPOINT ["python", "server.py"]
