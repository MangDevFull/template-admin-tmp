
$(document).ready(function () {
  $("#update").click(function () {
    const slug = $("#slug").text()
    const data = {}
    data.category = $('#cate').find(":selected").val();
    data.title = $('#title').val();

    $.ajax({
      url: `/project/${slug}`,
      method: 'POST',
      data: data,
      success: function (da) {
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