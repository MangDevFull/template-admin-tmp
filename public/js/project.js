
$(document).ready(function () {
  ClassicEditor
  .create( document.querySelector( '#ckeditor-classic' ) )
  .then( newEditor => {
    editor = newEditor
  } )
  .catch( error => {
      console.error( error );
  } );

  $("#create1").click(function (e) {
    $('#s').val("0")
  })
  $("#create2").click(function () {
    $('#s').val("1")
  })
})