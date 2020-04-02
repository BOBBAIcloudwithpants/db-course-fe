from django.db import models

# Create your models here.
class User(models.Model):
    user_id = models.IntegerField(primary_key=True,auto_created=True)
    username = models.CharField(max_length=40)
    password = models.CharField(max_length=40)
    class Meta:
        db_table='user'
