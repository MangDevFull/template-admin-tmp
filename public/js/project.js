
$(document).ready(function () {
  ClassicEditor
  .create( document.querySelector( '#ckeditor-classic' ) )
  .then( newEditor => {
    editor = newEditor
  } )
  .catch( error => {
      console.error( error );
  } );
  let fileUpload
  let uploadUrl
  $("#thum").change(function (e) {
    e.preventDefault();
    const myFile = $('#thum').prop('files');
    const file = $("#thum").val().split('.').pop()
    const data = {}
    data.fileType = file
    fileUpload = myFile
    $.ajax({
      url: '/s3-upload',
      method: 'POST',
      data: data,
      
      success: function (da) {
        console.log(da.data.downloadUrl)
        if (da.boolean) {
          uploadUrl = da.data.uploadUrl
        }
      },
      error: function (jqXHR, textStatus, errorThrown) {
        alert(errorThrown)
      }
    })
  })
  $("#create1").click(function () {
    const editorData = editor.getData();
    const data = {}
    data.category = $('#cate').find(":selected").val();
    data.title = $('#title').val();
    data.content = editorData
    data.status = 0

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
  $("#create2").click(function () {
    const editorData = editor.getData();
    const data = {}
    data.category = $('#cate').find(":selected").val();
    data.title = $('#title').val();
    data.content = editorData
    data.status = 1
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