from django.db import models

class Message(models.Model):
    sender = models.CharField(max_length=50)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    reply_to_user = models.CharField(max_length=50, null=True, blank=True)


    def __str__(self):
        return f"{self.sender}: {self.content[:30]}"
