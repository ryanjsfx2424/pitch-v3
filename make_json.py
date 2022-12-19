with open("discord.txt", "r") as fid:
  line = fid.readlines()

line = line[0].replace("'","").replace(" ","").replace("\n","").split(",")
wallets = line + []

vals = []
cnt = 0
with open("collabs.csv") as fid:
  for line in fid:
    cnt += 1
    if cnt == 1:
      continue
    val = line.split(",")[0]
    if len(val) != 42 or val[:2] != "0x":
      print("bad entry! val: ", val)
      input(">>")
      continue
    vals.append(val)

wallets += vals

with open("WL.json", "w") as fid:
  fid.write("[\n")
  for wallet in wallets:
    fid.write('  "' + wallet + '",\n')
  fid.write("]")

