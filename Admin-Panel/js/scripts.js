$(document).ready(
  fetchcontact()
  );

// function UserAuthentication()
// {
//   $("#Dashboard").hide();
//   $("#Message").hide();
//   $("#Noticeboard").hide();
//   $("#events").hide();
//   $("#EventSubmit").hide();
//   $("#NoticeSubmit").hide();
//   $("#authentication").show();
//   // $("#footer").hide();
// }

function changePageToDashboard()
{
	$("#Dashboard").show();
	$("#Message").hide();
	$("#Noticeboard").hide();
	$("#events").hide();
  $("#EventSubmit").hide();
  $("#NoticeSubmit").hide();
  $("#authentication").hide();
   $("#VideoUploader").hide();
   $("#BulletNotice").hide();
}

function changePageToMessageboard()
{	
	$("#Dashboard").hide();
	$("#Message").show();
	$("#Noticeboard").hide();
	$("#events").hide();
   $("#EventSubmit").hide();
  $("#NoticeSubmit").hide();
  $("#authentication").hide();
   $("#VideoUploader").hide();
    $("#BulletNotice").hide();
}
	
function changePageToNoticeboard()
{
	$("#Dashboard").hide();
	$("#Message").hide();
	$("#Noticeboard").show();
	$("#events").hide();
   $("#EventSubmit").hide();
  $("#NoticeSubmit").hide();
  $("#authentication").hide();
   $("#VideoUploader").hide();
    $("#BulletNotice").hide();
}

function changePageToEvents()
{	
	$("#Dashboard").hide();
	$("#Message").hide();
	$("#Noticeboard").hide();
	$("#events").show();
  $("#EventSubmit").hide();
  $("#NoticeSubmit").hide();
  $("#authentication").hide();
  $("#VideoUploader").hide();
   $("#BulletNotice").hide();
}

function changePageToUploadVideos()
{ 
  $("#Dashboard").hide();
  $("#Message").hide();
  $("#Noticeboard").hide();
  $("#events").hide();
  $("#EventSubmit").hide();
  $("#NoticeSubmit").hide();
  $("#authentication").hide();
   $("#VideoUploader").show();
    $("#BulletNotice").hide();
}




function fetchcontact()
{ 
   console.log('Reaching at fetchcontact');
   
    $.ajax({
      url:"http://localhost:5000/getcontacts",
      type: "get",
      dataType: "json",           
      crossDomain: "true",   
      success: function (result) {
         var contentToAppend = [];   
         $.each(result,function(index,obj){
         $("#ParentDiv").append("<div class='module'><h2><span>Date : " + obj.day +"-"+obj.mon +"-" +
          obj.year+" , Time : "+obj.hour+ ":"+obj.minute+":"+obj.second+ "</span></h2>"+"<div class=''><h2><span>" + 
          obj.title + "</span></h2><h2><span>" + obj.email+ "</span></h2><div class='module-body'><p><span>" 
          + obj.message + "</span></p></div></div>" );
        });
        },
        error: function (obj, txtStatus, error) {
          alert("There was some error,could not fetch data.... :(");
        }
    });
}


function NoticeBullet()
{

  $("#BulletNotice").show();
  $("#Dashboard").hide();
  $("#Message").hide();
  $("#Noticeboard").hide();
  $("#events").hide();
  $("#EventSubmit").hide();
  $("#NoticeSubmit").hide();
  $("#authentication").hide();
   $("#VideoUploader").hide();
}

function uploadBullet()
{ 
  var bullet=$(".bullets").val();
  console.log(bullet);
  $("bullet_2").show();
$("bullet_1").hide();
    $.ajax({
      url:"http://127.0.0.1:5000/UploadBullet",
      type: "post",
      dataType: "json",  
      data:({bullet:bullet}),         
      crossDomain: "true",   
     
    });
}


function ChangePageToBullet_1(){

$("#bullet_1").show();
$("#bullet_2").hide();

}
