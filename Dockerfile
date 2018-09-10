FROM python:3.6-alpine

COPY requirements.txt /requirements.txt
COPY . /opt/skijournal/

RUN ls -la /opt/skijournal/ && pip install -r /opt/skijournal/requirements.txt

WORKDIR /opt/skijournal/

EXPOSE 8000

CMD ["gunicorn", "-c", "gunicorn.conf.py", "-b", "0.0.0.0:8000", "skijournal.wsgi"]
