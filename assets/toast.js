const toast = (data = null, type = 'bg-danger') => {
    $('#toast').addClass(type)
    $('#toast button').click(() => {
        $('#toast').addClass('hide')
        $('#toast').removeClass('show')
    });
    $('#toast .toast-body').html(data)
    $('#toast').addClass("show")
    $('#toast').addClass("hide")

}
export default toast;