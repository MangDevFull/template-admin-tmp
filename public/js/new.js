$(document).ready(function () {
  $("#create").click(function () {
    const data = {}
    data.category = $('#cate').find(":selected").val();
    data.title = $('#title').val();
    data.subTitle = $('#subT').val();
    data.source = $('#source').val();

    console.log(data);
    $.ajax({
      url: '/news',
      method: 'POST',
      data: data,
      success: function (da) {
          if (da.boolean) {
              $("#ignismyModal").modal('show');
              setTimeout(function () {
                  window.location.replace('/news')
              }, 1500)
          }
      },
      error: function (jqXHR, textStatus, errorThrown) {
          alert("Lỗi đăng ký")
      }
  }) 
}) 
})