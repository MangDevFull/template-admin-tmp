$(document).ready(function () {
  $.ajax({
    url: './project/cate',
    method: 'GET',
    success: function (da) {
       console.log(da);
    },
    error: function (jqXHR, textStatus, errorThrown) {
        alert("Lỗi đăng ký")
    }
}) 
})