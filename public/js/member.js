$(document).ready(function () {
  console.log("ssjkjk")
  $("#submit").click(function () {
      $('#form').submit(false);
      const data = {}
      data.email = $("#email").val();
      data.fullName = $("#fullName").val();
      data.phone = $("#phone").val();
      data.dOB = $("#date").val();
      data.position = $("#position").val()
        data.face =  $("#face").val()
        data.ig= $("#ig").val()
       $.ajax({
          url: './members',
          method: 'POST',
          data: data,
          success: function (da) {
              if (da.boolean) {
                $(".bs-example-modal-lg").modal('hide')
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
  $("#delete").click(()=>{
    const data = {}
    data.username = $("#usename").text()
    $.ajax({
      url: '/members',
      method: 'POST',
      data: data,
      success: function (da) {
          if (da.boolean) {
            $("#myModal").modal('hide')
              $("#ignismyModal").modal('show');
              setTimeout(function () {
                  location.reload()
              }, 1500)
          }
      },
      error: function (jqXHR, textStatus, errorThrown) {
          alert(errorThrown)
      }
  }) 
  })
})