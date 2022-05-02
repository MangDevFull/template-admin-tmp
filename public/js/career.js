
$(document).ready(function () {
  ClassicEditor
  .create( document.querySelector( '#ckeditor-classic' ) )
  .then( newEditor => {
    editor = newEditor
  } )
  .catch( error => {
      console.error( error );
  } );
  $("#create1").click(function () {
    const data = {}
    const editorData = editor.getData();
    data.title = $('#title').val();
    data.position = $("#position").val();
    data.expirationWork = $("#exWork").val();
    data.salary = $("#salary").val();
    data.location = $("#location").val();
    data.timeTitle = $("#timeAble").val();
    data.timeWork = $("#timeWork").val();
    data.location = $("#location").val();
    data.tags = $('#choices-multiple-remove-button').val().toString();
    data.content = editorData
    data.status = 0
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
  $("#create2").click(function () {
    const data = {}
    const editorData = editor.getData();
    data.title = $('#title').val();
    data.position = $("#position").val();
    data.expirationWork = $("#exWork").val();
    data.salary = $("#salary").val();
    data.location = $("#location").val();
    data.timeTitle = $("#timeAble").val();
    data.timeWork = $("#timeWork").val();
    data.location = $("#location").val();
    data.tags = $('#choices-multiple-remove-button').val().toString();
    data.content = editorData
    data.status = 1
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