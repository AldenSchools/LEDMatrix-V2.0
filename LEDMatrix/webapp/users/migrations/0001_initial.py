# Generated by Django 2.2.6 on 2019-11-24 01:19

import datetime
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
from django.utils.timezone import utc


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='LEDMatrixSettings',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('led_matrix_on', models.BooleanField(default=True)),
                ('led_on_off_time_enabled', models.BooleanField(default=False)),
                ('led_matrix_on_time', models.TimeField(blank=True, default=datetime.datetime(2019, 11, 24, 1, 19, 11, 428066, tzinfo=utc), null=True)),
                ('led_matrix_off_time', models.TimeField(blank=True, default=datetime.datetime(2019, 11, 24, 1, 19, 11, 428084, tzinfo=utc), null=True)),
                ('time_between_drawings', models.PositiveIntegerField(default=10)),
                ('currently_showing_limit', models.PositiveIntegerField(default=10)),
            ],
        ),
        migrations.CreateModel(
            name='UserProfile',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('number_submissions', models.PositiveIntegerField(default=0)),
                ('number_accepted_submissions', models.PositiveIntegerField(default=0)),
                ('is_blocked', models.BooleanField(default=False)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
