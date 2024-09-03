# The Schedule Format
Notes about the format of schedule documents.

## Per-Block Text Content
```
Course Title
1:23 - 2:46 (Peroid A)
Dr. Instructor Name - Location
```
```
Course Title
1:23 - 2:46 (Peroid A)
Dr. Instructor Name - None
```
```
Course Title
1:23 - 2:46 (Peroid A)
None - Location
```

## HTML
```
body#page > div#container > div#document > div.schedule-block
    div.day.day_2 // Monday
        div.block > p
            ... // Per-block text content
        ...
    div.day.day_6 // Friday
        ...
    ...
```

## PDF
```
Student Name - Semester 1

Advisor: Dr. Advisor Name
Grade 10

Monday
 
Tuesday
 
Wednesday
 
Thursday
 
Friday

8 AM
9 AM
10 AM
11 AM
12 PM
1 PM
2 PM
3 PM
4 PM
5 PM
6 PM
7 PM
Course Title // Per-block text content
1:23 - 2:46 (Peroid A)
Dr. Instructor Name - Location

Printed Sep 2, 2024
```