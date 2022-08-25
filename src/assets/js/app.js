$(function () {
  $('.department__show-depts').on('click', function () {
    $('.department__show-depts_pressed').not($(this)).removeClass('department__show-depts_pressed')
    const popup = $(this).siblings('.department__depts-popup')
    const dep = $(this).closest('.department')
    const departmentHeight = (dep.outerHeight(true))
    popup.css('top', (departmentHeight - popup.outerHeight(true)) / 2)
    const overlay = $('.structure__overlay')
    if (!dep.hasClass('department_active')) {
      overlay.show()
      $(this).closest('.department').addClass('department_active')

      overlay.off('click').on('click', function () {
        $('.department_active').removeClass('department_active')
        overlay.hide()
      })
    } else {
      overlay.hide()
      $(this).closest('.department').removeClass('department_active')

      $(window).scrollLeft(180).scrollTop(popup.outerHeight(true))
    }

    if (popup.offset().top < 8) {
      popup.css('top',dep.outerHeight(true) / 2 - $(this).offset().top - 8)
    }
  })

  $('.structure-more-employee').on('click', function () {
    if (typeof BX !== "undefined") {
      const popup = $(this).siblings('.employess-popup')
      let data = BX.create('DIV', {props: {className: 'structure-dept-emp-popup'}});

      let departId = $(this).attr('data-id');
      let employees =  BX.message('RESULT')[departId]['USERS'];
      let leader =  BX.message('RESULT')[departId]['LEADER'];

      let html = '';
      if (!$.isEmptyObject(leader)) {
        html += '<div class="employess-popup__employee employess-popup__employee_head">' +
          '<div class="employess-popup__avatar">' +
          '<a href="/company/personal/user/' + leader.ID + '/"><img src="' + leader.PERSONAL_PHOTO + '"></a>' +
          '</div>' +
          '<div>' +
          '<a class="employess-popup__head-text" href="/company/personal/user/' + leader.ID + '/">' + leader.LAST_NAME + ' ' + leader.NAME + '</a>' +
          '<div class="employess-popup__head-position">' + leader.WORK_POSITION + '</div></div></div>'
      }

      for (key in employees) {
        html += '<div class="employess-popup__employee">' +
          '<div class="employess-popup__avatar">' +
          '<a href="/company/personal/user/' + employees[key].ID + '/"><img src="' + employees[key].PERSONAL_PHOTO + '"></a>' +
          '</div>' +
          '<div>' +
          '<a class="employess-popup__head-text" href="/company/personal/user/' +
          employees[key].ID + '/">' + employees[key].LAST_NAME + ' ' + employees[key].NAME +
          '</a>' +
          '<div class="employess-popup__head-position">' + employees[key].WORK_POSITION + '</div></div></div>'
      }
      if (!popup.hasClass('employess-popup_active')) {
        popup.find('.employess-popup__content').html = html
        popup.addClass('employess-popup_active')
      } else {
        $(this).siblings('.employess-popup').removeClass('employess-popup_active')
      }
    } else {
      const popup = $(this).siblings('.employess-popup')
      if (!popup.hasClass('employess-popup_active')) {
        popup.addClass('employess-popup_active')
      } else {
        $(this).siblings('.employess-popup').removeClass('employess-popup_active')
      }
    }
  })

  $('.structure').on('click', function (e) {
    const target = $(e.target);
    if (target.closest('.employess-popup').length === 0 && !target.hasClass('structure-more-employee')) {
      $('.employess-popup').removeClass('employess-popup_active')
    }
  })

})
