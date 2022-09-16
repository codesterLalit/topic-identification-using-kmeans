# -*- coding: utf-8 -*-
"""
Created on Fri Apr 17 20:19:10 2020

@author: codester
"""
import os
import urllib.request
from process import predict
from flask_restful import Api, Resource, reqparse
from flask import Flask, request, jsonify, render_template, redirect,send_from_directory
from flask_jwt import JWT, jwt_required
from werkzeug.utils import secure_filename
from docx import Document
from flask_cors import CORS

UPLOAD_FOLDER = './uploads'

app = Flask(__name__)
app.secret_key = "secret key"
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['STATIC_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024
CORS(app)
api = Api(app)


ALLOWED_EXTENSIONS = set(['doc', 'docx'])

def allowed_file(filename):
	return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


class Home(Resource):
    def get(self):
        return {'Message':'Welcome to the server.'}

class Predict(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('text_document', type=str, required=True, help="This feild cannot be left blanked")       
    
    def get(self):
        return {"message":"welcome to prediction"}
    
    def post(self):
        data = Predict.parser.parse_args()
        document_text = data['text_document']
        try:
            something = predict(document_text)
        except:
            return {"message":"Text is too much short"}, 400
        print(something)
        return something
    
class Upload(Resource):
    def post(self):
        #Check if the post request has the file part
        if 'file' not in request.files:
            return {'message':'No file selected'}, 400
        file = request.files['file']
        
        if file.filename == '':
            return {"message":"No file selected for upload"}, 400
        
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            fullPath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            
            #reading file and renameing
            document = Document(fullPath)
            result1 = [p.text for p in document.paragraphs]
            result = " ".join(result1)
            try:
                something = predict(result)
            except:
                return {"message":"Text is too much short"}, 400
            documentTitle = "renamed/"+something+".docx"
            document.save(documentTitle)
            return something, 201
        else:
            return {"message":"this formated is not allowed"}, 400
    
    
    
class Uploads(Resource):
    def get(self, title):
        filename = title+'.docx'
        root_dir = os.path.dirname(os.getcwd())
        return send_from_directory(os.path.join(root_dir, 'pider','renamed'), filename)
        
    
    
    
api.add_resource(Home, '/')
api.add_resource(Predict, '/predict')
api.add_resource(Upload,'/upload')
api.add_resource(Uploads,'/uploads/<string:title>')
app.run(port=5000)
