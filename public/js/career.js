
$(document).ready(function () {
  $("#create").click(function () {
    const data = {}
    data.title = $('#title').val();
    data.position = $("#position").val();
    data.expirationWork = $("#exWork").val();
    data.salary = $("#salary").val();
    data.location = $("#location").val();
    data.timeTitle = $("#timeAble").val();
    data.timeWork = $("#timeWork").val();
    data.location = $("#location").val();
    data.tags = $('#choices-multiple-remove-button').val().toString();
    console.log(data)
    $.ajax({
      url: '/career',
      method: 'POST',
      data: data,
      success: function (da) {

        console.log(da)
          if (da.boolean) {
              $("#ignismyModal").modal('show');
              setTimeout(function () {
                  window.location.replace('/career')
              }, 1500)
          }
      },
      error: function (jqXHR, textStatus, errorThrown) {
          alert("Lỗi đăng ký")
      }
  }) 
  })
})