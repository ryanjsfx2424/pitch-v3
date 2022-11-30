with open("OG.txt", "r") as fid:
  lines = fid.readlines()
# end with

with open("temp.txt", "w") as fid:
  fid.write("[\n")

  for line in lines:
    fid.write('  "' + line.replace("\n","").replace(" ","").replace("\t","") + '",\n')
  # end for
  fid.write("]")
# end with open
