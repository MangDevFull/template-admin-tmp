
$(document).ready(function () {
  $("#update").click(function () {
    const data = {}
    const slug = $("#slug").text()
    data.title = $('#title').val();
    data.position = $("#position").val();
    data.expirationWork = $("#exWork").val();
    data.salary = $("#salary").val();
    data.location = $("#location").val();
    data.timeTitle = $("#timeAble").val();
    data.timeWork = $("#timeWork").val();
    data.location = $("#location").val();
    data.tags = $('#choices-multiple-remove-button').val().toString();
    $.ajax({
      url: `/career/${slug}`,
      method: 'POST',
      data: data,
      success: function (da) {

        console.log(da)
          if (da.boolean) {
              $("#ignismyModal").modal('show');
              setTimeout(function () {
                  location.reload()
              }, 1500)
          }
      },
      error: function (jqXHR, textStatus, errorThrown) {
          alert("Lỗi đăng ký")
      }
  }) 
  })
})