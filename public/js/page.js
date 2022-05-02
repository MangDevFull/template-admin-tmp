
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
    const editorData = editor.getData();
    const data = {}
    data.name = $('#name').val();
    data.title = $('#title').val();
    data.content = editorData
    data.status = 0
    $.ajax({
      url: '/page',
      method: 'POST',
      data: data,
      success: function (da) {
        console.log(da);
        if (da.status==200) {
          $("#ignismyModal").modal('show');
          setTimeout(function () {
            window.location.replace('/page')
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
    data.name = $('#name').val();
    data.title = $('#title').val();
    data.content = editorData
    data.status = 1
    $.ajax({
      url: '/page',
      method: 'POST',
      data: data,
      success: function (da) {
        console.log(da);
        if (da.status==200) {
          $("#ignismyModal").modal('show');
          setTimeout(function () {
            window.location.replace('/page')
          }, 1500)
        }
      },
      error: function (jqXHR, textStatus, errorThrown) {
        alert("Lỗi đăng ký")
      }
    })
  })
})