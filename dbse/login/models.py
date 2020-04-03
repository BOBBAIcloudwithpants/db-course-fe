from django.db import models


# Create your models here.
class User(models.Model):
    user_id = models.IntegerField(primary_key=True, auto_created=True)
    username = models.CharField(max_length=40)
    password = models.CharField(max_length=40)

    class Meta:
        db_table = 'user'

    def createUser(self):
        print(self.password)
        self.findUser()
        sql = "insert into user(username, password) values ('%s','%s')" % (self.username, self.password)
        print(sql)
        User.objects.raw(sql)
        print("插入用户: {} 密码: {}, 成功".format(self.username, self.password))
        return True

    def findUser(self):
        sql = "select * from user where username='%s'" % (self.username)



