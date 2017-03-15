var messages = [];
var ids = [];
$(function() {
    $.get('https://twitter.com/i/notifications', function(data) {
        var htmlData = data;
        var onlyOL = $(htmlData).find('#stream-items-id').eq(0);
        onlyOL.find('.activity-truncated-tweet').remove();
        onlyOL.find('.activity-supplement').remove();
        $('body').append(onlyOL);

        for(i = 0; i<onlyOL.find('li.stream-item').length;i++) {
            ids[i] = onlyOL.find('li.stream-item').eq(0).attr('data-item-id');
            messages[i] = ($(onlyOL).find('li.stream-item').eq(i).find('.stream-item-activity-line').text()).replace(/\n/g, "").trim();
        }

        console.log(messages);
        console.log(ids);
    });
});