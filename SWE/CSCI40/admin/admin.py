 
# create a profile model 
class Profile(models.Model): 
    # user = models.OneToOne


# PROXY?? 
# OOP Concept 
#
# python managepy startapp useraccounts (app should only have 1 purpose)
# add it to INSTALLED_APPS 
# from django import models
# from django.contrib.auth.models import  User
class Profile (models.Model):
    user = models.OneToOne(User, on_delete=models.CASCADE)
    bio = models.TextField(blank=True)

# in admin.py 
# from django.contrib import admin 
# from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
# from .models import Profile 
# class ProfileInline(admin.StackedInLine):
#  model = Profile
# can_delete = False
class UserAdmin(BaseUserAdmin):
    inlines = [ProfileInline,]

    admin.site.unregister(User)
    admin.site.register(User, UserAdmin)

# Mixin -> Reusable so you dont have to write it all over again 
# included than inherited
# decorators -> add functionality to functions
# add it in the urlpattern/paths

# {extends 'base.html' }

# block content 
# form method=POST
# csrf_token
# <button type=submit>
# form.as_p
# /formatendblock


# on base.html add to the body {% if request.user.is_autheticated %}, method=POST (to not see shit from the url (wil not reveal details))
# add an href for url login 
#LOGIN_REDIRECT_URL = '/tasks/list'
#LOGOUT_REDIRECT_URL = '/tasks/list' 