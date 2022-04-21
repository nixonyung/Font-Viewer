with open("helper/fonts.txt", encoding="utf-8") as txt:
    for line in txt:
        print('{"fontName": "' + line.strip() + '", "tags": [] },')
