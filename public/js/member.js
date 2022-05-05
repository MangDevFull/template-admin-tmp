$(document).ready(function () {
  $("#featuredImage").change(function (data) {
    var imageFile = data.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(imageFile);

    reader.onload = function (evt) {
      $("#imagePreview").attr("src", evt.target.result);
      $("#imagePreview").hide();
      $("#imagePreview").fadeIn(650);
    };
  });

  // $("form#data").submit(function (e) {
  //   e.preventDefault();
  //   // const data = {};
  //   // data.email = $("#email").val();
  //   // data.fullName = $("#fullName").val();
  //   // data.phone = $("#phone").val();
  //   // data.dOB = $("#date").val();
  //   // data.position = $("#position").val();
  //   // data.face = $("#face").val();
  //   // data.ig = $("#ig").val();
  //   // data.twitter = $("#twitter").val();
  //   // data.linkedin = $("#linkedin").val();
  //   // data.image = $("#image").val();

  //   // var formData = new FormData(this);
  //   var form = $("form#data")[0];
  //   var formData = new FormData(form);

  //   $.ajax({
  //     url: "./members",
  //     method: "POST",
  //     data: formData,
  //     success: function (da) {
  //       if (da.boolean) {
  //         $(".bs-example-modal-lg").modal("hide");
  //         $("#ignismyModal").modal("show");
  //         setTimeout(function () {
  //           location.reload();
  //         }, 1500);
  //       }
  //     },
  //     error: function (jqXHR, textStatus, errorThrown) {
  //       alert("Lỗi đăng ký");
  //     },
  //   });
  // });
  // $("#delete").click(() => {
  //   const data = {};
  //   data.username = $("#usename").text();
  //   $.ajax({
  //     url: "/members",
  //     method: "POST",
  //     data: data,
  //     success: function (da) {
  //       if (da.boolean) {
  //         $("#myModal").modal("hide");
  //         $("#ignismyModal").modal("show");
  //         setTimeout(function () {
  //           location.reload();
  //         }, 1500);
  //       }
  //     },
  //     error: function (jqXHR, textStatus, errorThrown) {
  //       alert(errorThrown);
  //     },
  //   });
  // });
  // $("#update").click(function () {
  //   $("#form").submit(false);
  //   const username = $("#usename").text();
  //   const data = {};
  //   data.email = $("#email").val();
  //   data.fullName = $("#fullName").val();
  //   data.phone = $("#phone").val();
  //   data.dOB = $("#date").val();
  //   data.position = $("#position").val();
  //   data.face = $("#face").val();
  //   data.ig = $("#ig").val();
  //   data.linkedin = $("#linkedin").val();
  //   data.twitter = $("#twitter").val();
  //   $.ajax({
  //     url: `./${username}`,
  //     method: "POST",
  //     data: data,
  //     success: function (da) {
  //       if (da.boolean) {
  //         $(".bs-example-modal-lg").modal("hide");
  //         $("#ignismyModal").modal("show");
  //         setTimeout(function () {
  //           location.reload();
  //         }, 1500);
  //       }
  //     },
  //     error: function (jqXHR, textStatus, errorThrown) {
  //       alert("error");
  //     },
  //   });
  // });
});
