$(document).ready(function(){
	//���سɹ�ע�����ʾ
	$(".regSuccess").hide();
	$(".regForm").show();
	//����ȫ����ʾ
	$(".ok").hide();
	$(".error").hide();

	//�û���
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
				alert("�����쳣��");  
				return false;  
			}    
		});
	}

	//�û���
	function isUsername(str)
	{
		var reg = /^[0-9a-zA-Z]{2,20}$/; 
		return reg.test(str); 
	}
	function checkUsername(){
		if( !isUsername($("#p_username").children("input").val()) )
		{
			$("#p_username").children("span.ok").hide();
			$("#p_username").children("span.error").text("�û���ֻ��ʹ�����ֺ�Ӣ����ĸ");
			$("#p_username").children("span.error").show();
			return false;
		}
		else 
		{
			return isUsernameOK($("#p_username").children("input").val());
		}

	}
	$("#p_username").children("input").change(checkUsername);

	//����
	function isWorkId(str)
	{
		var reg = /^[0-9]{5,10}$/; 
		return reg.test(str); 
	}
	function checkWorkId(){
		if( !isWorkId($("#p_workId").children("input").val()) )
		{
			$("#p_workId").children("span.ok").hide();
			$("#p_workId").children("span.error").text("���Ÿ�ʽ����");
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

	//����
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
	

	//�ظ�����
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

	//���֤��
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

	//����
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
	

	//��ʵ����
	// ���ֵ�������ʽ/[\u4E00-\u9FA5]/
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

	//�ύ��ť
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
						//��ʾ�ɹ�ע��
						$(".regSuccess").show();
						$(".regForm").hide();
						alert("ע��ɹ�");
						setTimeout(window.location.href="index.html",3000);
					}
					else
					{
						alert("error:"+data['description']);
					}
				},
				dataType:'json',
				error : function() {       
					alert("�����쳣��");  
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