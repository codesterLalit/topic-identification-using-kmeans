import threading
def myTimer():
    print("I am last \n")

my_timer = threading.Timer(3.0, myTimer)
my_timer.start()
print("I am not last")
