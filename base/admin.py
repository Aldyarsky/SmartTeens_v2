from django.contrib import admin
from .models import *
# Register your models here.

admin.site.register(Marathon)
admin.site.register(MarathonReview)
admin.site.register(Category)
admin.site.register(MarathonLesson)
admin.site.register(MarathonParticipant)