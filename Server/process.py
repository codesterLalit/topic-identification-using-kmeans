# important packages for preprocessing
from sklearn.cluster import KMeans
from sklearn.preprocessing import normalize
from sklearn.decomposition import PCA
from sklearn.feature_extraction.text import TfidfVectorizer
import matplotlib.pyplot as plt
import pandas as pd
import nltk
import numpy as np
from bs4 import BeautifulSoup
import string
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from nltk.stem import WordNetLemmatizer
from nltk.stem.porter import PorterStemmer

# important packages vectorizing, and clustering
import pandas as pd
import nltk
import seaborn as sns
sns.set()


#Function for predicting by processing document
def predict(text_document):
    document = text_document
    
 # to remove html from abstract or title      
    def remove_html(text):
        text = text.lower()
        soup = BeautifulSoup(text, 'lxml')
        html_free = soup.get_text()
        return html_free

    # to remove punctuation
    def remove_punctuation(text):
        no_punct = "".join([c for c in text if c not in string.punctuation])
        return no_punct
    
    # to remove stop words
    def remove_stopwords(text):
        stop_words = set(stopwords.words('english'))
        text = word_tokenize(text)
        text = [w for w in text if not w in stop_words]
        return text
    

    # Instantiate Lemmatizer
    lemmatizer = WordNetLemmatizer()
    
    
    def word_lemmatizer(text):
        text = [lemmatizer.lemmatize(word) for word in text]
        return text
    
    document = remove_html(document)
    document = remove_punctuation(document)
    document = remove_stopwords(document)
    document = word_lemmatizer(document)
    
    # Vectorizing
    vectorizer = TfidfVectorizer()
    
    vectors = vectorizer.fit_transform(document)
    tf_idf_norm = normalize(vectors)
    tf_idf_array = tf_idf_norm.toarray()
    
    #finding suitable topics
    suitable_topics = pd.read_csv('dicts/diction.txt', sep="\n", header=None)
    suitable_topics = suitable_topics.values.reshape(-1,).tolist()
    suitable_topics = [x for x in suitable_topics if str(x) != 'nan']
        
    #applying k-means and performing clustering
    kmeans = KMeans(n_clusters=2, max_iter=700, algorithm = 'auto')
    fitted = kmeans.fit(tf_idf_array)
    something= suitable_topics
    # testing = ['mental', 'health','crisis','bad','time','work',np.nan]
    prediction = kmeans.predict(vectorizer.transform(something))
    
    max_index_cols = []
    all_maxs = np.argwhere(prediction == np.amax(prediction, axis=0))
    if len(all_maxs)>0:
        for col in all_maxs:
            max_index_cols.append(col[0])
    
    if prediction[max_index_cols[0]] == 0:
        return "Sorry! Given topics are not suitable for you text"
    else:
        fullStr = ""
        for max_index_col in max_index_cols:
            fullStr = something[max_index_col]
        return fullStr
