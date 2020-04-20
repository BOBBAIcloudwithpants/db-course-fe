FROM python:3.7

ENV PYTHONUNBUFFERED 1
RUN mkdir /dbse
WORKDIR /dbse
RUN pip install pip -U
ADD requirements.txt /dbse/
RUN pip install -r requirements.txt

ADD . /dbse/
EXPOSE 8888
CMD ["python3", "manage.py", "runserver", "0.0.0.0:8888"]