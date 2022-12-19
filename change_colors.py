from PIL import Image

img = Image.open("Logomark-Blue.png")
img = img.convert("RGBA")
data = img.getdata()

newData = []
for item in data:
  print(item)

  if item != (0,0,0,0) and item[0] != 255 and item[1] != 255 and item[2] != 255:
    newData.append((37,24,17,255))
  else:
    newData.append(item)
  # end if/else
# end for

img.putdata(newData)
img.save("Logomark-Black.png", "PNG")
