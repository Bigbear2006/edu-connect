# Generated by Django 5.1.3 on 2024-12-10 21:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_company_job_jobapplication'),
    ]

    operations = [
        migrations.AddField(
            model_name='completedtask',
            name='is_right',
            field=models.BooleanField(null=True),
        ),
    ]
