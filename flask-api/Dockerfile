FROM ubuntu:18.04
#MAINTAINER <your name> "<your email>"
RUN apt-get update -y && apt-get install -y python3-pip python3-dev libsm6 libxext6 libxrender-dev libgl1-mesa-dev
#We copy just the requirements.txt first to leverage Docker cache
COPY . /app
WORKDIR /app
RUN pip3 install --upgrade pip
RUN pip3 install -r requirements.txt
ENTRYPOINT [ "python3" ]
CMD [ "server.py" ]