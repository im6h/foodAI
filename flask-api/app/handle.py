from flask import jsonify
import cv2
import numpy as np
import xlrd
import urllib


def get_output_layers(net):
    layer_names = net.getLayerNames()
    output_layers = [layer_names[i[0] - 1]
                     for i in net.getUnconnectedOutLayers()]
    return output_layers


def draw_prediction(class_id, classes, results):
    label = str(classes[class_id])
    results.append(label)


def handleImage(img_array):
    results = []
    loc = "~/Desktop/code/foodAI/flask-api/utils/food.xlsx"
    wb = xlrd.open_workbook(loc)
    sheet = wb.sheet_by_index(0)
    dictionary = {"default": 0}
    data = {}
    curw = 50
    tarw = 54
    days = 30
    image = cv2.imdecode(img_array, -1)
    Width = image.shape[1]
    Height = image.shape[0]
    scale = 0.00392
    totalcal = 0
    calt = (tarw - curw) * 1000
    calt = calt / days

    classes = None
    with open("/home/im6h/Desktop/code/foodAI/flask-api/utils/classes.txt", "r") as f:
        classes = [line.strip() for line in f.readlines()]

    # use file weight to detect image, file weight is depend your train.
    net = cv2.dnn.readNet(
        "/home/im6h/Desktop/code/foodAI/flask-api/utils/yolov3_custom_6000.weights",
        "/home/im6h/Desktop/code/foodAI/flask-api/utils/yolov3.cfg",
    )
    blob = cv2.dnn.blobFromImage(
        image, scale, (416, 416), (0, 0, 0), True, crop=False)
    net.setInput(blob)
    outs = net.forward(get_output_layers(net))
    class_ids = []
    confidences = []
    boxes = []
    conf_threshold = 0.5
    nms_threshold = 0.4

    for out in outs:
        for detection in out:
            scores = detection[5:]
            class_id = np.argmax(scores)
            confidence = scores[class_id]
            if confidence > 0.5:
                center_x = int(detection[0] * Width)
                center_y = int(detection[1] * Height)
                w = int(detection[2] * Width)
                h = int(detection[3] * Height)
                x = center_x - w / 2
                y = center_y - h / 2
                class_ids.append(class_id)
                confidences.append(float(confidence))
                boxes.append([x, y, w, h])

    indices = cv2.dnn.NMSBoxes(
        boxes, confidences, conf_threshold, nms_threshold)

    for i in indices:
        i = i[0]
        draw_prediction(class_ids[i], classes, results)

    for i in range(sheet.nrows):
        dictionary[sheet.cell_value(i, 0)] = sheet.cell_value(i, 1)

    response = []
    for i in range(0, len(results)):
        ter = str(results[i])
        ter2 = str(dictionary[results[i]])
        totalcal = totalcal + dictionary[results[i]]
        data["food"] = ter
        data["food_calo"] = ter2
        response.append(data)

    response.append({"total": totalcal, "calo_day": calt})
    return response


def handle(url):
    url_handle = urllib.request.urlopen(url)
    img_array = np.array(bytearray(url_handle.read()), dtype=np.uint8)
    data = handleImage(img_array)
    return jsonify({"data": data})
