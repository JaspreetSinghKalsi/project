// function fetchcontact()
// { 
//    console.log('Reaching at fetchcontact');
   
//     $.ajax({
//       url:"http://localhost:3000/getcontacts.json",
//       type: "get",
//       dataType: "json",           
//       crossDomain: "true",      
//       success: function (result) {
//          $.each(result,function(index,obj){
//           if(obj.title == "jaspreet")
//           {
//             console.log('abc');
//             $("#jaspreetsinghkalsi_1").text(obj.title); 
//              $("#jaspreetsinghkalsi_2").text(obj.email); 
//               $("#jaspreetsinghkalsi_3").text(obj.message); 
//           }


//          });  
//         },
//         error: function (obj, txtStatus, error) {
//           alert("There was some error,could not fetch data.... :(");
//         }
//     });
// }