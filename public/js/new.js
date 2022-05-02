$(document).ready(function () {
  ClassicEditor
    .create(document.querySelector('#ckeditor-classic'))
    .then(newEditor => {
      editor = newEditor
    })
    .catch(error => {
      console.error(error);
    });
  $("#create1").click(function () {
    const data = {}
    const editorData = editor.getData();
    data.category = $('#cate').find(":selected").val();
    data.title = $('#title').val();
    data.subTitle = $('#subT').val();
    data.source = $('#source').val();
    data.content = editorData
    data.status = 0

    $.ajax({
      url: '/news',
      method: 'POST',
      data: data,
      success: function (da) {
        if (da.boolean) {
          $("#ignismyModal").modal('show');
          setTimeout(function () {
            window.location.replace('/news')
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
    data.category = $('#cate').find(":selected").val();
    data.title = $('#title').val();
    data.subTitle = $('#subT').val();
    data.source = $('#source').val();
    data.content = editorData
    data.status = 1

    $.ajax({
      url: '/news',
      method: 'POST',
      data: data,
      success: function (da) {
        if (da.boolean) {
          $("#ignismyModal").modal('show');
          setTimeout(function () {
            window.location.replace('/news')
          }, 1500)
        }
      },
      error: function (jqXHR, textStatus, errorThrown) {
        alert("Lỗi đăng ký")
      }
    })

  })
})