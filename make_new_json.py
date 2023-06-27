import os
os.chdir("src/json")

wallets = []
with open("OG_lower.json", "w") as fidw:
  fidw.write("[\n")
  with open("OG.json", "r") as fid:
    for line in fid:
      if '"' in line:
        wallets.append(line.replace("\n","").replace('"','').replace(" ","").replace(",","").lower())
        fidw.write(' "' + wallets[-1] + '",\n')
      # end if
    # end for
  # end with
  fidw.write("]\n")
# end with
print("wallets: ", wallets)
