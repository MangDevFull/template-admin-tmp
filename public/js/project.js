
$(document).ready(function () {

  let fileUpload
  let uploadUrl
  $("#thum").change(function (e) {
    e.preventDefault();
    console.log("aaa")
    const myFile = $('#thum').prop('files');
    console.log(myFile)
    const file = $("#thum").val().split('.').pop()
    const data = {}
    data.fileType = file
    $.ajax({
      url: '/s3-upload',
      method: 'POST',
      data: data,
      success: function (da) {
        console.log('da', da)
        if (da.boolean) {
          fileUpload = da.uploadUrl
          uploadUrl = da.uploadUrl
          console.log(da)
        }
      },
      error: function (jqXHR, textStatus, errorThrown) {
        alert(errorThrown)
      }
    })
  })
  $("#create").click(function () {
    const cont = $('#ckeditor-classic').val()
    console.log(cont)
    const data = {}
    data.category = $('#cate').find(":selected").val();
    data.title = $('#title').val();
    $.ajax({
      url: '/project',
      method: 'POST',
      data: data,
      success: function (da) {
        if (da.boolean) {
          $("#ignismyModal").modal('show');
          setTimeout(function () {
            window.location.replace('/project')
          }, 1500)
        }
      },
      error: function (jqXHR, textStatus, errorThrown) {
        alert("Lỗi đăng ký")
      }
    })
  })
})