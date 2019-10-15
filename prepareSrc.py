import os

dateFile = open("src_date.txt", mode="r", encoding="utf-8")
weatherFile = open("weatherdata.txt", mode="r", encoding="utf-8")
srcFile = open("src.txt", mode="a", encoding="utf-8")

dateFileLines = dateFile.readlines()
weatherFileLines = weatherFile.readlines()

count = 0
for date in dateFileLines:
    tempDate = (date.split("	")[-1]).strip()
    for weather in weatherFileLines:
        if tempDate == weather.split(" ")[0].strip():
            count = count + 1
            srcFile.write(str(count) + " " + weather.strip() + "\n")
            print(str(count) + " " + weather.strip())
            break


