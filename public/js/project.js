
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
  function getQueryParams(url){
    var qparams = {},
        parts = (url||'').split('?'),
        qparts, qpart,
        i=0;

    if(parts.length <= 1 ){
        return qparams;
    }else{
        qparts = parts[1].split('&');
        for(i in qparts){

            qpart = qparts[i].split('=');
            qparams[decodeURIComponent(qpart[0])] = 
                           decodeURIComponent(qpart[1] || '');
        }
    }

    return qparams;
};
  $("#create").click(function () {
    const editorData = editor.getData();
    const data = {}
    data.category = $('#cate').find(":selected").val();
    data.title = $('#title').val();
    data.content = editorData
    const query  = getQueryParams(uploadUrl);
 console.log(uploadUrl)
 console.log(fileUpload)
    console.log("query",query)
     $.ajax({
      url: uploadUrl,
      method: 'PUT',
      contentType: 'multipart/form-data',
      headers: {...query},
      data: fileUpload,
      cache : false,
    processData: false
   
    }).done(function(response) {
      console.log(response);
  });
    // $.ajax({
    //   url: '/project',
    //   method: 'POST',
    //   data: data,
    //   success: function (da) {
    //     if (da.boolean) {
    //       $("#ignismyModal").modal('show');
    //       setTimeout(function () {
    //         window.location.replace('/project')
    //       }, 1500)
    //     }
    //   },
    //   error: function (jqXHR, textStatus, errorThrown) {
    //     alert("Lỗi đăng ký")
    //   }
    // })
  })
})