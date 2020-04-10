from django.db import models, connection
import json
cursor = connection.cursor()

def booksDetail():
    sql = "select bookname, author, press, price from book;"
    cursor.execute(sql)
    outcome = cursor.fetchall()
    book_list = []
    books = {}
    for row in outcome:
        temp = {}
        temp['name'] = row[0]
        temp['author'] = row[1]
        temp['press'] = row[2]
        temp['price'] = row[3]
        book_list.append(temp)
    print(book_list)
    books['books'] = book_list
    out = json.dumps(book_list, ensure_ascii=False)

    print(out)
    return out

def buyBooks(books):
    print(books)
    for book in books:
        sql = "update storage s left join book b on s.book_id=b.book_id set s.had=s.had+%s where b.bookname= '%s' and b.press= '%s'" % (book['buynum'], book['name'], book['press'])
        print(sql)
        cursor.execute(sql)
        print("购买书籍: {} 出版社: {} 数量: {} 成功".format(book['name'], book['press'], book['buynum']))

def sellBooks(books):
    print(books)
    for book in books:
        sql = "update storage s left join book b on s.book_id=b.book_id set s.had=s.had-%s where b.bookname= '%s' and b.press= '%s'" % (book['buynum'], book['name'], book['press'])
        print(sql)
        cursor.execute(sql)
        print("卖出书籍: {} 出版社: {} 数量: {} 成功".format(book['name'], book['press'], book['buynum']))
# Create your models here.

class Book(models.Model):
    book_id = models.IntegerField(primary_key=True, auto_created=True)
    bookname = models.CharField(max_length=40)
    author = models.CharField(max_length=40)
    press = models.CharField(max_length=40)
    price = models.FloatField()

    class Meta:
        db_table = 'book'



class Storage(models.Model):
    book_id = models.IntegerField(primary_key=True)
    had = models.IntegerField()

    class Meta:
        db_table = 'storage'

class Sale(models.Model):
    book_id = models.IntegerField(primary_key=True)
    sell_number = models.IntegerField()
    date = models.TimeField(auto_now=False, auto_now_add=False)

    class Meta:
        db_table = 'sale'






