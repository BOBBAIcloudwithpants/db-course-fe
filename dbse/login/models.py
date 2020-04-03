from django.db import models, connection
cursor = connection.cursor()

# Create your models here.
class User(models.Model):
    user_id = models.IntegerField(primary_key=True, auto_created=True)
    username = models.CharField(max_length=40)
    password = models.CharField(max_length=40)

    class Meta:
        db_table = 'user'

    def createUser(self):
        if(self.findUser()):
            print("该用户名已被注册")
            return False
        sql = "insert into user(username, password) values ('%s','%s')" % (self.username, self.password)
        print(sql)
        cursor.execute(sql)
        print("插入用户: {} 密码: {}, 成功".format(self.username, self.password))
        return True

    def findUser(self):
        sql = "select * from user where username='%s'" % (self.username)
        cursor.execute(sql)
        row = cursor.fetchall()
        if(len(row) >= 1):
            return True
        else:
            return False



