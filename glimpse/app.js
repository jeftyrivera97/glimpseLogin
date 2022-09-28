
$(function() {
	function el(id)
	{
		return document.getElementById(id);
	}
	$("#forgotPasswordLink").click(function(){
		document.getElementById('resetPassword').hidden=false;
		document.getElementById('loginForm').hidden=true;
	});
	
	$("#backLogin").click(function(){
		document.getElementById('resetPassword').hidden=true;
		document.getElementById('loginForm').hidden=false;
	});

	$("#loginButton").click(function(){

		var data = {email:el('email').value, password:el('password').value, sit:el('sit').value};
		$("#login_errorMsg").hide();
		
		$.ajax({url:"https://aim3.glimpsek12.com/api.php?f=User_Login", type:'POST', data:data, dataType:'json', success:function(data) 
		{
			//errors
			if (data['error'] != null)
			{
				$('#login_errorMsg').html(data.error).show().delay(5000).fadeOut();
				return;
			}
			//redirect
			if (el('redirectUrl').value != '')
			{
				window.location.href = el('redirectUrl').value;
				return;
			}
			//redirectUrl specified from the response 
			if (data['redirectUrl'] != null)
			{
				window.location.href = data.redirectUrl;
				return;
			}
			
			window.location.href = '/dashboard';
		}});
	});

	$("#resetButton").click(function(){
		var data = {email:el('emailReset').value};
		$("#login_errorMsg").hide();
		
		$.ajax({url:"https://aim3.glimpsek12.com/api.php?f=User_Password_Reset_Request", type:'POST', data:data, dataType:'json', success:function(data) 
		{
			//errors
			if (data['error'] != null)
			{
				$('#login_errorMsg').html('Invalid Email Account').show().delay(3000).fadeOut();
				return;
			}
			$('#login_errorMsg').html('Password Reset Email Has Been Sent to your Email. Check your Inbox/Spam folder.').show().delay(3000).fadeOut();
		}});
	});

});


