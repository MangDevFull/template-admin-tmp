
$(document).ready(function () {
  const d = $("#con").text();
  console.log( d)
  ClassicEditor
  .create( document.querySelector( '#ckeditor-classic' ) )
  .then( newEditor => {
    editor = newEditor
    editor.setData( d );
  } )
  .catch( error => {
      console.error( error );
  } );
  $("#update").click(function () {
    const slug = $("#slug").text()
    const editorData = editor.getData();
    const data = {}
    data.category = $('#cate').find(":selected").val();
    data.title = $('#title').val();
    data.content = editorData

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
  $("#status").click(function () {
    const slug = $("#slug").text()
    const status = $('input[name=formRadios]:checked').val()
    const data = {}
    data.status = status
    $.ajax({
      url: `/project/${slug}`,
      method: 'POST',
      data: data,
      success: function (da) {
        if (da.boolean) {
          $("#myModal").modal('hide');
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