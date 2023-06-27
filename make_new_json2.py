import os
os.chdir("src/json")

with open("WL_lower.json", "w") as fidw:
  with open("WL_combined.json", "r") as fid:
    line = fid.readlines()[0]
  line = line.lower()
  fidw.write(line)
# end with
