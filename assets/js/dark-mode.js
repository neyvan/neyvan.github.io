var html = document.getElementsByTagName("html")[0];

function getCookie(cname) {
	    var name = cname + "=";
	    var ca = document.cookie.split(';');
	    for(var i = 0; i <ca.length; i++) {
	        var c = ca[i];
	        while (c.charAt(0)==' ') {
	            c = c.substring(1);
	        }
	        if (c.indexOf(name) == 0) {
	            return c.substring(name.length,c.length);
	        }
	    }
	    return "";
	}

if (getCookie("theme") == "dark"){
  	html.classList.add("dark");
}

function changeTheme() {
	html.classList.toggle("dark");
	if (html.classList.contains("dark")){
		document.cookie = "theme=dark;path=/";
	}
	else {
		document.cookie = "theme=light;path=/";
	}
}
