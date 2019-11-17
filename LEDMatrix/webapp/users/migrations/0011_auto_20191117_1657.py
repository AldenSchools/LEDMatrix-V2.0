# Generated by Django 2.2.6 on 2019-11-17 16:57

import datetime
from django.db import migrations, models
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0010_auto_20191117_0108'),
    ]

    operations = [
        migrations.AlterField(
            model_name='ledmatrixsettings',
            name='led_matrix_off_time',
            field=models.TimeField(blank=True, default=datetime.datetime(2019, 11, 17, 16, 57, 36, 925992, tzinfo=utc), null=True),
        ),
        migrations.AlterField(
            model_name='ledmatrixsettings',
            name='led_matrix_on_time',
            field=models.TimeField(blank=True, default=datetime.datetime(2019, 11, 17, 16, 57, 36, 925975, tzinfo=utc), null=True),
        ),
        migrations.AlterField(
            model_name='ledmatrixsettings',
            name='led_on_off_time_enabled',
            field=models.BooleanField(default=False),
        ),
    ]