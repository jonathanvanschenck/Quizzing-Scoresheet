#%%
import re
import os

with open("index.html") as f:
    with open("templates\\scoresheet_app.html","w+") as ff:
        for l in f:
            if "text/css" in l:
                fp = os.path.relpath(re.findall('href[=]["](([A-z|.]*[/]{0,1})*)["]',l)[0][0])
                tn = len(re.findall('    ',l))
                ff.write(tn*'    ' + '<style type="text/css">\n')
                with open(fp) as fff:
                    for ll in fff:
                        ff.write((tn+1)*'    ' + ll.strip('\n') + '\n')
                ff.write(tn*'    ' + '</style>\n')
            elif "<script" in l:
                fp = os.path.relpath(l[l.index("src=")+5:l.index(">")-1])
                tn = len(re.findall('    ',l))
                ff.write(tn*'    ' + '<script>\n')
                with open(fp) as fff:
                    if "min" in fp:
                        ll = fff.readline()
                    for ll in fff:
                        ff.write((tn+1)*'    ' + ll.strip('\n') + '\n')
                ff.write(tn*'    ' + '</script>\n')
            else:
                ff.write(l)
    
#%%