# -*- coding: utf-8 -*-
# Generated by Django 1.11.2 on 2017-06-20 16:20
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('stockapp', '0002_startrequest'),
    ]

    operations = [
        migrations.AddField(
            model_name='startrequest',
            name='stock_url',
            field=models.CharField(blank=True, default='', max_length=200),
        ),
    ]
