$(document).ready(function(){
	//隐藏全部提示
	$(".ok").hide();
	$(".error").hide();

	//用户名
	function isUsernameOK(str){
		$.ajax({
			type: 'POST',
			url: "/php/regist.php" ,
			data: {
				type:"isUsernameOK",
				username: $("#p_username").children("input").val()
			},
			success: function(data) 
			{
				if(data['status'] == "1")
				{
					$("#p_username").children("span.error").hide();
                    $("#p_username").children("span.ok").show();
                    return 1;
                }
                else
                {
                	$("#p_username").children("span.ok").hide();
                	$("#p_username").children("span.error").text(data['description']);
                	$("#p_username").children("span.error").show();
                	return 0;
                }
            },
            dataType:'json',
            error : function() {       
            	alert("网络异常！");  
            	return 0;  
            }    
        });
	}
	function isUsername(str)
	{
		var reg = /^[0-9]{5,10}$/; 
		return reg.test(str); 
	}
	$("#p_username").children("input").change(function(){
		if( !isUsername($("#p_username").children("input").val()) )
		{
			$("#p_username").children("span.ok").hide();
			$("#p_username").children("span.error").text("工号格式错误");
			$("#p_username").children("span.error").show();
		}
		else 
		{
			isUsernameOK($("#p_username").children("input").val());
		}
			
	});

	//密码
	function isPasswd(str){
		return ($("#p_passwd").children("input").val()).length >= 6;
	}
	$("#p_passwd").children("input").change(function(){
		if(!isPasswd($("#p_passwd").children("input").val()))
		{
			$("#p_passwd").children("span.ok").hide();
			$("#p_passwd").children("span.error").show();
		}
		else
		{
			$("#p_passwd").children("span.ok").show();
			$("#p_passwd").children("span.error").hide();
		}			
	});
	

	//重复密码
	$("#p_passwd2").children("input").change('input',function(){
		if( $("#p_passwd").children("input").val() != $("#p_passwd2").children("input").val())
		{
			$("#p_passwd2").children("span.ok").hide();
			$("#p_passwd2").children("span.error").show();
		}
		else
		{
			$("#p_passwd2").children("span.ok").show();
			$("#p_passwd2").children("span.error").hide();
		}			
	});

	function isIdCard(str){
		var reg = /^[1-9][0-9]{16}[0-9x]$/; 
		return reg.test(str); 
	}
	$("#p_idCard").children("input").change('input',function(){
		if( !isIdCard($("#p_idCard").children("input").val()) )
		{
			$("#p_idCard").children("span.ok").hide();
			$("#p_idCard").children("span.error").show();
		}
		else
		{
			$("#p_idCard").children("span.ok").show();
			$("#p_idCard").children("span.error").hide();
		}			
	});

	//邮箱
	function isEmail(str){ 
		var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/; 
		return reg.test(str); 
	} 
	$("#p_email").children("input").change('input',function(){
		if( !isEmail($("#p_email").children("input").val()) )
		{
			$("#p_email").children("span.ok").hide();
			$("#p_email").children("span.error").show();
		}
		else
		{
			$("#p_email").children("span.ok").show();
			$("#p_email").children("span.error").hide();
		}			
	});
	

	//真实姓名
	// 汉字的正则表达式/[\u4E00-\u9FA5]/
	function isName(str){ 
		var reg = /^[\u4E00-\u9FA5]{2,5}$/; 
		return reg.test(str); 
	} 
	$("#p_name").children("input").change('input',function(){
		if( !isName($("#p_name").children("input").val()) )
		{
			$("#p_name").children("span.ok").hide();
			$("#p_name").children("span.error").show();
		}
		else if($("#p_name").children("input").val() == "")
		{
			$("#p_name").children("span.ok").hide();
			$("#p_name").children("span.error").hide();
		}
		else
		{
			$("#p_name").children("span.ok").show();
			$("#p_name").children("span.error").hide();
		}
	});

	//提交按钮
	$("#bt_submitReg").click(function(){
		
	});
});