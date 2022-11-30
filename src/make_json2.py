with open("OG.json", "r") as fid:
  lines = fid.readlines()
# end with

with open("temp.txt", "w") as fid:
  fid.write("[\n")

  for line in lines:
    if '"' not in line:
      fid.write('  "' + line.replace("\n","").replace(" ","").replace("\t","") + '",\n')
    else:
      fid.write(line)
  # end for
  fid.write("]")
# end with open
