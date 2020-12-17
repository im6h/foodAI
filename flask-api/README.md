# Flask api to food detection

```
1. Install python and check version python (recommend python version 3.7)
2. Run pip install -r requirements.txt to install package depend
3. Clone weights file to utils folder
4. Run python server.py
5. Open Postman and create a post request to endpoint http://localhost:3000/handler/
6. Try body request:
  {
    "url":"https://firebasestorage.googleapis.com/v0/b/instagram-clone-590f5.appspot.com/o/15545.jpg?alt=media&token=14b9bcd1-d0e7-4a3d-a832-7361fae49b97",
    "current":52,
    "target":54,
    "time":10
  }
```
