import os

includes = {
    "offline" : [
            "static/jquery/jquery-3.4.1.min.js",
            "static/filesaver/FileSaver_old.min.js",
            "static/js/setup.js",
            "static/js/offline.js"
        ],
    "online" : [
            "static/jquery/jquery-3.4.1.min.js",
            "static/filesaver/FileSaver_old.min.js",
            "static/socketio/socketio-2.3.0.js",
            "static/js/setup.js",
            "static/js/online.js"
        ],
    "viewer" : [
            "static/jquery/jquery-3.4.1.min.js",
            "static/filesaver/FileSaver_old.min.js",
            "static/socketio/socketio-2.3.0.js",
            "static/js/setup.js",
            "static/js/viewer.js"
        ]
}

tab = "    "

for k,v in includes.items():
    print("Generating: "+k)
    # Open the output html file
    with open(os.path.join("html","Quizzing_Scoresheet_"+k+".html"), "w+") as f:
        # Open the header html file for copying
        with open(os.path.join("templates","head.html")) as ff:
            for l in ff:
                # Check for css link
                if "link" in l:
                    # Write css file
                    num_tabs = (len(l) - len(l.strip(" "))) // len(tab)
                    f.write((num_tabs + 0)*tab + "<style type='text/css'>\n")
                    with open(os.path.join("static","style.css")) as fff:
                        for ll in fff:
                            f.write((num_tabs + 1)*tab + ll)
                    f.write((num_tabs + 0)*tab + "</style>\n")
                # Else dump contents
                else:
                    f.write(0*tab + l)
        # Open the primary html file for copying
        with open(os.path.join("templates","primary.html")) as ff:
            for l in ff:
                f.write(1*tab + l)
        if k != "viewer":
            # Open the secondary html file for copying
            with open(os.path.join("templates","secondary.html")) as ff:
                for l in ff:
                    f.write(1*tab + l)
        # Attach scripts
        for script_path in v:
            f.write(1*tab + "<!-- From: " + script_path.split("/")[-1] +"-->\n")
            f.write(1*tab + "<script>\n")
            with open(os.path.join(*script_path.split("/"))) as ff:
                for l in ff:
                    f.write(2*tab + l)
            f.write(1*tab + "</script>\n")
        # Open the tail html file for copying
        with open(os.path.join("templates","tail.html")) as ff:
            for l in ff:
                f.write(0*tab + l)
