Notes about the format of text extracted (with PDF.js) from schedule PDF files, and steps to parse it.

# The Schedule Format

## Header
```
Student Name, 10

Advisor: Dr. Advisor Name, Fall 2022

Monday

Tuesday

Wednesday

Thursday

Friday

<#SPLIT# ~sdf-s{15173}-a{23329}/>
```

## Per course
```
123                             <- Room? (all-caps)
1:23 - 2:46                     <- Time
A                               <- Block (all-caps)
Course Name Goes Here and May   <- Title
Span Multiple Lines
                                <- Empty line
Dr. Instructor Name             <- Teacher?
```

# How to parse
* Parse courses breadth-first, parsing each property on every course before moving to the next property.
* Mark parsed lines as consumed, so that they cannot be parsed again as part of a different course
1. Every course has a time, so use that as the main anchor point
    * Times do not specify am/pm, so assume a time range of 6 am - 5:59 pm
1. The i+1 line is the block
1. The i+2 line is always the first line of the title
1. if i-1 in all-caps+numbers & is not consumed, it is room
1. Continue parsing the title from i+3, until a consumed line is reached or:
    * If the line starts with "Dr.", "Ms.", "Mr.", "Mrs.", "Mx.", it is teacher
