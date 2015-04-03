function setCookie(c_name,value,expiredays)
{
	var exdate=new Date()
	exdate.setDate(exdate.getDate()+expiredays)
	document.cookie=c_name+ "=" +encodeURIComponent(value)+
	((expiredays==null) ? "" : ";expires="+exdate.toGMTString())+";path=/"
}

function getCookie(c_name)
{
	if (document.cookie.length>0)
	{
		c_start=document.cookie.indexOf(c_name + "=")
		if (c_start!=-1)
		{ 
			c_start=c_start + c_name.length+1;
			c_end=document.cookie.indexOf(";",c_start);
			if (c_end==-1) c_end=document.cookie.length;
			return decodeURIComponent(document.cookie.substring(c_start,c_end));
		} 
	}
	return ""
}

function addAuth(auth, setUser)
{

	if(auth!=0 && setUser!="")
	{
		$.ajax({
			type: 'POST',
			url: "../php/setAuth.php" ,
			data: {
				type:"setAuth",
				username: getCookie('username'),
				cookie: getCookie('cookie');
				setUser: setUser;
				auth: auth;
			},
			success: function(data) 
			{
				if(data['status'] == "1")
				{
					return true;
				}
				else
				{
					alert(data['description']);
					return false;
				}
			},
			dataType:'json',
			error : function() {       
				alert("网络异常！");  
				return 0;  
			}    
		});
	}
}