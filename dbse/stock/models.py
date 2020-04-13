from django.db import models, connection
import json
cursor = connection.cursor()

def booksDetail(): # 所有图书的详情
    sql = "select book_id, bookname, author, press, price, had from book natural join storage order by had desc;"
    cursor.execute(sql)
    outcome = cursor.fetchall()
    book_list = []
    books = {}
    for row in outcome:
        temp = {}
        temp['book_id'] = row[0]
        temp['name'] = row[1]
        temp['author'] = row[2]
        temp['press'] = row[3]
        temp['price'] = row[4]
        temp['had'] = row[5]
        book_list.append(temp)
    print(book_list)
    books['books'] = book_list
    out = json.dumps(book_list, ensure_ascii=False)

    print(out)
    return out

def hadBookDetail(): # 所有仓库中图书的详情
    sql = "select book_id, bookname, author, press, price, had from book natural join storage order by had desc;"
    cursor.execute(sql)
    outcome = cursor.fetchall()
    book_list = []
    books = {}
    for row in outcome:
        temp = {}
        temp['book_id'] = row[0]
        temp['name'] = row[1]
        temp['author'] = row[2]
        temp['press'] = row[3]
        temp['price'] = row[4]
        temp['had'] = row[5]
        if(temp['had'] > 0):
            book_list.append(temp)
    print(book_list)
    books['books'] = book_list
    out = json.dumps(book_list, ensure_ascii=False)

    print(out)
    return out


def insertBook(book):
    sql = "insert into book (bookname, author, press, price) values ('%s', '%s', '%s', '%s')" % (book['name'], book['author'], book['press'], book['price'])
    print(sql)
    cursor.execute(sql)

    sql = "insert into storage (book_id) values (last_insert_id())";
    cursor.execute(sql)

    print("插入书籍: {} 作者: {} 出版社: {} 价格: {}".format(book['name'], book['author'], book['press'], book['price']))

def buyBooks(books):
    print(books)
    for book in books:
        sql = "update storage s left join book b on s.book_id=b.book_id set s.had=s.had+%s where b.bookname= '%s' and b.press= '%s'" % (book['buynum'], book['name'], book['press'])
        print(sql)
        cursor.execute(sql)
        print("购买书籍: {} 出版社: {} 数量: {} 成功".format(book['name'], book['press'], book['buynum']))

def sellBooks(books):
    print(books)
    sql = "set @lastUpdateId := 0;"
    cursor.execute(sql)
    for book in books:
        sql = "update storage s left join book b on s.book_id=b.book_id set s.had=s.had-%s, s.book_id = (select @lastUpdateId := s.book_id) where b.bookname= '%s' and b.press= '%s'" % (book['buynum'], book['name'], book['press'])
        print(sql)
        cursor.execute(sql)
        sql = "select"
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






