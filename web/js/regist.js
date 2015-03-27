$(document).ready(function(){
	//隐藏成功注册的提示
	$(".regSuccess").hide();
	$(".regForm").show();
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
					return true;
				}
				else
				{
					$("#p_username").children("span.ok").hide();
					$("#p_username").children("span.error").text(data['description']);
					$("#p_username").children("span.error").show();
					return false;
				}
			},
			dataType:'json',
			error : function() {       
				alert("网络异常！");  
				return false;  
			}    
		});
	}

	//用户名
	function isUsername(str)
	{
		var reg = /^[0-9a-zA-Z]{2,20}$/; 
		return reg.test(str); 
	}
	function checkUsername(){
		if( !isUsername($("#p_username").children("input").val()) )
		{
			$("#p_username").children("span.ok").hide();
			$("#p_username").children("span.error").text("用户名只可使用数字和英文字母");
			$("#p_username").children("span.error").show();
			return false;
		}
		else 
		{
			return isUsernameOK($("#p_username").children("input").val());
		}

	}
	$("#p_username").children("input").change(checkUsername);

	//工号
	function isWorkId(str)
	{
		var reg = /^[0-9]{5,10}$/; 
		return reg.test(str); 
	}
	function checkWorkId(){
		if( !isWorkId($("#p_workId").children("input").val()) )
		{
			$("#p_workId").children("span.ok").hide();
			$("#p_workId").children("span.error").text("工号格式错误");
			$("#p_workId").children("span.error").show();
			return false;
		}
		else 
		{
			$("#p_workId").children("span.ok").show();
			$("#p_workId").children("span.error").hide();
			return true;
		}

	}
	$("#p_workId").children("input").change(checkWorkId);

	//密码
	function isPasswd(str){
		return ($("#p_passwd").children("input").val()).length >= 6;
	}
	function checkPasswd() {
		if(!isPasswd($("#p_passwd").children("input").val()))
		{
			$("#p_passwd").children("span.ok").hide();
			$("#p_passwd").children("span.error").show();
			return false;
		}
		else
		{
			$("#p_passwd").children("span.ok").show();
			$("#p_passwd").children("span.error").hide();
			return true;
		}			
	}
	$("#p_passwd").children("input").change(checkPasswd);
	

	//重复密码
	function checkPasswd2(){
		if( $("#p_passwd").children("input").val() != $("#p_passwd2").children("input").val())
		{
			$("#p_passwd2").children("span.ok").hide();
			$("#p_passwd2").children("span.error").show();
			return false;
		}
		else if($("#p_passwd").children("input").val() == "")
		{
			$("#p_passwd2").children("span.ok").hide();
			$("#p_passwd2").children("span.error").hide();
			return false;
		}
		else
		{
			$("#p_passwd2").children("span.ok").show();
			$("#p_passwd2").children("span.error").hide();
			return true;
		}			
	}
	$("#p_passwd2").children("input").change(checkPasswd2);

	//身份证号
	function isIdCard(str){
		var reg = /^[1-9][0-9]{16}[0-9x]$/; 
		return reg.test(str); 
	}
	function checkIdCard(){
		if( !isIdCard($("#p_idCard").children("input").val()) )
		{
			$("#p_idCard").children("span.ok").hide();
			$("#p_idCard").children("span.error").show();
			return false;
		}
		else
		{
			$("#p_idCard").children("span.ok").show();
			$("#p_idCard").children("span.error").hide();
			return true;
		}			
	}
	$("#p_idCard").children("input").change(checkIdCard);

	//邮箱
	function isEmail(str){ 
		var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/; 
		return reg.test(str); 
	} 
	function checkEmail(){
		if( !isEmail($("#p_email").children("input").val()) )
		{
			$("#p_email").children("span.ok").hide();
			$("#p_email").children("span.error").show();
			return false;
		}
		else
		{
			$("#p_email").children("span.ok").show();
			$("#p_email").children("span.error").hide();
			return true;
		}			
	}
	$("#p_email").children("input").change(checkEmail);
	

	//真实姓名
	// 汉字的正则表达式/[\u4E00-\u9FA5]/
	function isName(str){ 
		var reg = /^[\u4E00-\u9FA5]{2,5}$/; 
		return reg.test(str); 
	} 
	function checkName(){
		if( !isName($("#p_name").children("input").val()) )
		{
			$("#p_name").children("span.ok").hide();
			$("#p_name").children("span.error").show();
			return false;
		}
		else if($("#p_name").children("input").val() == "")
		{
			$("#p_name").children("span.ok").hide();
			$("#p_name").children("span.error").hide();
			return false;
		}
		else
		{
			$("#p_name").children("span.ok").show();
			$("#p_name").children("span.error").hide();
			return true;
		}
	}
	$("#p_name").children("input").change(checkName);

	//提交按钮
	function checkAll()
	{
		checkUsername();
		checkPasswd();
		checkPasswd2();
		checkName();
		checkEmail();
		checkIdCard();

		// if(checkUsername() && 
		// 	checkPasswd() &&
		// 	checkPasswd2() &&
		// 	checkEmail() &&
		// 	checkName() &&
		// 	checkIdCard())
			return true;
		// else
		// {
		// 	return false;
		// }
	}
	$("#bt_submitReg").click(function(){
		if(checkAll() == true)
		{
			$.ajax({
				type: 'POST',
				url: "/php/regist.php" ,
				data: {
					type:"regist",
					username: $("#p_username").children("input").val(),
					passwd: $("#p_passwd").children("input").val(),	
					idCard: $("#p_idCard").children("input").val(),	
					email: $("#p_email").children("input").val(),	
					name: $("#p_name").children("input").val(),	
					workId: $("#p_workId").children("input").val(),	
				},
				success: function(data) 
				{
					if(data['status'] == "1")
					{
						//提示成功注册
						$(".regSuccess").show();
						$(".regForm").hide();
						alert("注册成功");
						setTimeout(window.location.href="index.html",3000);
					}
					else
					{
						alert("error:"+data['description']);
					}
				},
				dataType:'json',
				error : function() {       
					alert("网络异常！");  
					return 0;  
				}    
			});
		}
		else
		{
			alert("???");
		}
	});
});