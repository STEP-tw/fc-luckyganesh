# Use an official Python runtime as a parent image
FROM node:alpine

# Set the working directory to /app
WORKDIR /app

# Copy the current directory contents into the container at /app
ADD . /app

# Install any needed packages specified in requirements.txt
# RUN pip install --trusted-host pypi.python.org -r requirements.txt
RUN npm install

# Make port 8000 available to the world outside this container
EXPOSE 8080

# Define environment variable
# ENV NAME World

# Run app.py when the container launches
CMD ["node","server.js"]