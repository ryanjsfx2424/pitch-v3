with open("WL.json", "r") as fid:
  wallets = fid.readlines()[0][:-1]
#print("wallets: ", wallets)


with open("WL2.json", "r") as fid_read:
  for line in fid_read:
    wallets += ', "' + line.replace("\n","") + '"'
print("wallets: ", wallets)

with open("WL3.json", "w") as fid:
  fid.write(wallets)
