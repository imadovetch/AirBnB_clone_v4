$(document).ready(function () {
    $('input[type=checkbox]').click(function () {
      const checked_list = {};
      $('input[type=checkbox]:checked').each(function () {
        const key = $(this).attr('data-id')
        const value = $(this).attr('data-name')
        checked_list[key] = value
        $(".amenities h4").text(Object.values(checked_list).join(', '))
      });
    });
  });