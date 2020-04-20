from django.db import models, connection
import json
import time
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


def insertBook(book): # 在书库中插入新的书籍信息
    sql = "insert into book (bookname, author, press, price) values ('%s', '%s', '%s', '%s')" % (book['name'], book['author'], book['press'], book['price'])
    print(sql)
    cursor.execute(sql)

    sql = "insert into storage (book_id) values (last_insert_id())";
    cursor.execute(sql)

    print("插入书籍: {} 作者: {} 出版社: {} 价格: {}".format(book['name'], book['author'], book['press'], book['price']))
def returnBooks(books):

    for book in books:
        sql = "update storage s left join book b on s.book_id=b.book_id set s.had=s.had+%s where b.bookname= '%s' and b.press= '%s'" % (
    book['buynum'], book['name'], book['press'])
        print(sql)
        cursor.execute(sql)
        sql = "insert into back (book_id, back_number) values ('%s', '%s')" % (book['book_id'], book['buynum'])
        print(sql)
        cursor.execute(sql)
        print("退还书籍: {} 出版社: {} 数量: {} 成功".format(book['name'], book['press'], book['buynum']))

def buyBooks(books): # 从书库中进货
    print(books)
    for book in books:
        sql = "update storage s left join book b on s.book_id=b.book_id set s.had=s.had+%s where b.bookname= '%s' and b.press= '%s'" % (book['buynum'], book['name'], book['press'])
        print(sql)
        cursor.execute(sql)
        sql = "insert into stock (book_id, stock_number) values ('%s', '%s')" % (book['book_id'], book['buynum'])
        print(sql)
        cursor.execute(sql)
        print("进货书籍: {} 出版社: {} 数量: {} 成功".format(book['name'], book['press'], book['buynum']))

def sellBooks(books): # 从仓库中购买书籍
    print(books)
    for book in books:
        sql = "update storage s left join book b on s.book_id=b.book_id set s.had=s.had-%s, s.book_id = (select @lastUpdateId := s.book_id) where b.bookname= '%s' and b.press= '%s'" % (book['buynum'], book['name'], book['press'])
        print(sql)
        cursor.execute(sql)
        sql = "insert into sale (book_id, sell_number) values ('%s', '%s')" % (book['book_id'], book['buynum'])
        print(sql)
        cursor.execute(sql)
        print("卖出书籍: {} 出版社: {} 数量: {} 成功".format(book['name'], book['press'], book['buynum']))

def saleYearNumber(info):
    pattern = "%Y-%m-%d"
    book_id = info['book_id']
    sql = "select book_id, bookname, sell_number, date_format(submit_at,'%s') submit_at from book natural join sale where book_id = '%s' order by submit_at asc;" % (
        pattern, book_id)
    print(sql)
    cursor.execute(sql)
    outcome = cursor.fetchall()

    year_sale = []

    if len(outcome) == 0:
        return json.dumps(year_sale, ensure_ascii=False)

    mark_year = (time.strptime(outcome[0][3], pattern)).tm_year
    temp_sale = 0

    for row in outcome:
        temp_year = (time.strptime(row[3], pattern)).tm_year


        if (temp_year == mark_year):
            temp_sale = temp_sale + row[2]
        else:
            record = {}
            record['bookname'] = row[1]
            record['submit_at'] = str(mark_year)
            record['sale'] = temp_sale
            year_sale.append(record)

            temp_sale = row[2]
            mark_year = temp_year

    record = {}
    record['bookname'] = row[1]
    record['submit_at'] = str(mark_year)
    record['sale'] = temp_sale
    year_sale.append(record)

    return json.dumps(year_sale, ensure_ascii=False)

def saleMonthNumber(info):
    pattern = "%Y-%m-%d"
    book_id = info['book_id']
    sql = "select book_id, bookname, sell_number, date_format(submit_at,'%s') submit_at from book natural join sale where book_id = '%s' order by submit_at asc;" % (
    pattern, book_id)
    print(sql)
    cursor.execute(sql)
    outcome = cursor.fetchall()

    month_sale = []

    if len(outcome) == 0:
        return json.dumps(month_sale, ensure_ascii=False)

    mark_year = (time.strptime(outcome[0][3], pattern)).tm_year
    mark_month = (time.strptime(outcome[0][3], pattern)).tm_mon
    temp_sale = 0

    for row in outcome:
        temp_year = (time.strptime(row[3], pattern)).tm_year
        temp_month = (time.strptime(row[3], pattern)).tm_mon

        if(temp_year == mark_year and temp_month == mark_month):
            temp_sale = temp_sale+row[2]
        else:
            record = {}
            record['bookname'] = row[1]
            record['submit_at'] = str(mark_year) + '-' + str(mark_month)
            record['sale'] = temp_sale
            month_sale.append(record)

            temp_sale = row[2]
            mark_year = temp_year
            mark_month = temp_month

    record = {}
    record['bookname'] = row[1]
    record['submit_at'] = str(mark_year) + '-' + str(mark_month)
    record['sale'] = temp_sale
    month_sale.append(record)

    return json.dumps(month_sale, ensure_ascii=False)


def saleDayNumber(info):
    pattern = "%Y-%m-%d"
    book_id = info['book_id']
    sql = "select book_id, bookname, sell_number, date_format(submit_at,'%s') submit_at from book natural join sale where book_id = '%s' order by submit_at asc;" % (
        pattern, book_id)
    print(sql)
    cursor.execute(sql)
    outcome = cursor.fetchall()

    day_sale = []

    if len(outcome) == 0:
        return json.dumps(day_sale, ensure_ascii=False)

    mark_year = (time.strptime(outcome[0][3], pattern)).tm_year
    mark_month = (time.strptime(outcome[0][3], pattern)).tm_mon
    mark_day = (time.strptime(outcome[0][3], pattern)).tm_mday
    temp_sale = 0

    for row in outcome:
        temp_year = (time.strptime(row[3], pattern)).tm_year
        temp_month = (time.strptime(row[3], pattern)).tm_mon
        temp_day = (time.strptime(row[3], pattern)).tm_mday

        if (temp_year == mark_year and temp_month == mark_month and temp_day == mark_day):
            temp_sale = temp_sale + row[2]
        else:
            record = {}
            record['bookname'] = row[1]
            record['submit_at'] = str(mark_year) + '-' + str(mark_month) + '-' + str(mark_day)
            record['sale'] = temp_sale
            day_sale.append(record)

            temp_sale = row[2]
            mark_year = temp_year
            mark_month = temp_month
            mark_day = temp_day

    record = {}
    record['bookname'] = row[1]
    record['submit_at'] = str(mark_year) + '-' + str(mark_month) + '-' + str(mark_day)
    record['sale'] = temp_sale
    day_sale.append(record)

    return json.dumps(day_sale, ensure_ascii=False)


def saleTotalNumberOfAllBooks(info):
    start_date = info['start']
    end_date = info['end']
    pattern = "%Y-%m-%d"
    sql = "select book_id, bookname, sell_number, date_format(submit_at,'%s') submit_at from book natural join (select * from sale where unix_timestamp(submit_at) >= unix_timestamp('%s') and unix_timestamp(submit_at) <= unix_timestamp('%s') order by submit_at asc) as t order by book_id;" % (
    pattern, start_date, end_date)

    cursor.execute(sql)
    outcome = cursor.fetchall()
    total_sale = []

    i = 0
    while(i < len(outcome)):
        book_id = outcome[i][0]
        bookname = outcome[i][1]

        temp_num = outcome[i][2]
        j = i+1
        if(j == len(outcome)):
            record = {}
            record['bookname'] = bookname
            record['sale'] = temp_num
            total_sale.append(record)
            break
        while(j < len(outcome)):
            if(book_id == outcome[j][0]):
                temp_num += outcome[j][2]
                j = j+1
            else:
                record = {}
                record['bookname'] = bookname
                record['sale'] = temp_num
                total_sale.append(record)
                temp_num = outcome[j][2]
                break
        i = j

    total_sale.sort(key=takeSale, reverse=True)

    i = 1
    for item in total_sale:
        item['rank'] = i
        i += 1

    total_sale = json.dumps(total_sale, ensure_ascii=False)

    return total_sale

def takeSale(elem):
    return elem['sale']

def intervalSaleNumber(info):
    start_date = info['start']
    end_date = info['end']
    pattern = "%Y-%m-%d"
    sql = "select book_id, bookname, sell_number, date_format(submit_at,'%s') submit_at from book natural join (select * from sale where unix_timestamp(submit_at) >= unix_timestamp('%s') and unix_timestamp(submit_at) <= unix_timestamp('%s') order by submit_at asc) as t order by book_id;" % (
        pattern, start_date, end_date)

    cursor.execute(sql)
    outcome = cursor.fetchall()
    total_sale = []

    i = 0
    while (i < len(outcome)):
        book_id = outcome[i][0]
        bookname = outcome[i][1]

        temp_num = outcome[i][2]
        j = i + 1
        if (j == len(outcome)):
            record = {}
            record['bookname'] = bookname
            record['sale'] = temp_num
            total_sale.append(record)
            break
        while (j < len(outcome)):
            if (book_id == outcome[j][0]):
                temp_num += outcome[j][2]
                j = j + 1
            else:
                record = {}
                record['bookname'] = bookname
                record['sale'] = temp_num
                total_sale.append(record)
                temp_num = outcome[j][2]
                break
        i = j


    year_sale = []
    month_sale = []
    day_sale = []
    cursor.execute(sql)

    i = 0
    while(i < len(outcome)):
        print(outcome[i])
        book_id = outcome[i][0]
        bookname = outcome[i][1]
        temp_time = time.strptime(outcome[i][3], pattern)

        year = temp_time.tm_year
        month = temp_time.tm_mon
        day = temp_time.tm_mday

        temp_day = outcome[i][2]
        temp_year = outcome[i][2]
        temp_month = outcome[i][2]
        j = i+1
        if(j == len(outcome)):
            year_record = {}
            year_record['bookname'] = bookname
            year_record['sale'] = temp_year
            year_record['date'] = str(year)
            year_sale.append(year_record)
            break
        while(j < len(outcome)):
            j_time = time.strptime(outcome[j][3], pattern)
            j_year = j_time.tm_year
            j_month = j_time.tm_mon
            j_day = j_time.tm_mday
            if(book_id == outcome[j][0]):
                if(j_year == year):
                    temp_year += outcome[j][2]
                else:
                    year_record = {}
                    year_record['bookname'] = bookname
                    year_record['sale'] = temp_year
                    year_record['date'] = str(year)
                    year_sale.append(year_record)

                    temp_year = outcome[j][2]
                    year = j_year
                j += 1
            else:
                year_record = {}
                year_record['bookname'] = bookname
                year_record['sale'] = temp_year
                year_record['date'] = str(year)
                year_sale.append(year_record)
                break
        i = j

    i = 0
    while (i < len(outcome)):
        print(outcome[i])
        book_id = outcome[i][0]
        bookname = outcome[i][1]
        temp_time = time.strptime(outcome[i][3], pattern)

        year = temp_time.tm_year
        month = temp_time.tm_mon
        day = temp_time.tm_yday

        temp_month = outcome[i][2]
        j = i + 1
        if(j == len(outcome)):
            month_record = {}
            month_record['bookname'] = bookname
            month_record['sale'] = temp_month
            month_record['date'] = str(year) + '-' + str(month)
            month_sale.append(month_record)
            break
        while (j < len(outcome)):
            j_time = time.strptime(outcome[j][3], pattern)
            j_year = j_time.tm_year
            j_month = j_time.tm_mon
            j_day = j_time.tm_mday
            if(book_id == outcome[j][0]):
                if (j_year == year and j_month == month):
                    temp_month += outcome[j][2]
                else:
                    month_record = {}
                    month_record['bookname'] = bookname
                    month_record['sale'] = temp_month
                    month_record['date'] = str(year) + '-' + str(month)
                    month_sale.append(month_record)
                    temp_month = outcome[j][2]
                    month = j_month
                    day = j_day
                    year = j_year
                j += 1
            else:
                month_record = {}
                month_record['bookname'] = bookname
                month_record['sale'] = temp_month
                month_record['date'] = str(year) + '-' + str(month)
                month_sale.append(month_record)
                break
        i = j

    i = 0
    while (i < len(outcome)):
        print(outcome[i])
        book_id = outcome[i][0]
        bookname = outcome[i][1]
        temp_time = time.strptime(outcome[i][3], pattern)

        year = temp_time.tm_year
        month = temp_time.tm_mon
        day = temp_time.tm_mday

        temp_day = outcome[i][2]
        j = i + 1
        if(j == len(outcome)):
            day_record = {}
            day_record['bookname'] = bookname
            day_record['sale'] = temp_day
            print(day)
            day_record['date'] = str(year) + '-' + str(month) + '-' + str(day)
            day_sale.append(day_record)
            break
        while (j < len(outcome)):
            j_time = time.strptime(outcome[j][3], pattern)
            j_year = j_time.tm_year
            j_month = j_time.tm_mon
            j_day = j_time.tm_mday
            print(j_day)
            if (book_id == outcome[j][0]):
                if (j_year == year and j_month == month and j_day == day):
                    temp_day += outcome[j][2]
                else:
                    day_record = {}
                    day_record['bookname'] = bookname
                    day_record['sale'] = temp_day
                    print(day)
                    day_record['date'] = str(year) + '-' + str(month) + '-' + str(day)
                    day_sale.append(day_record)
                    temp_day = outcome[j][2]
                    day = j_day
                    year = j_year
                    month = j_month
                j += 1
            else:
                day_record = {}
                day_record['bookname'] = bookname
                day_record['sale'] = temp_day
                print(day)
                day_record['date'] = str(year) + '-' + str(month) + '-' + str(day)
                day_sale.append(day_record)
                break
        i = j

    year_sale.sort(key=takeDate)
    month_sale.sort(key=takeDate)
    day_sale.sort(key=takeDate)

    total_sale.sort(key=takeSale, reverse=True)

    i = 1
    for item in total_sale:
        item['rank'] = i
        i += 1
    final = {}
    final['year_sale'] = year_sale
    final['month_sale'] = month_sale
    final['day_sale'] = day_sale
    final['total_sale'] = total_sale
    final = json.dumps(final, ensure_ascii=False)
    return final

def takeDate(elem):
    return elem['date']





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






