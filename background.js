var messages = [];
var ids = [];
var latestID;
$(function() {
    notifications();
    setInterval(notifications,2000);
});

function notifications() {
    var newTweets = [];
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

        if(latestID == ids[0]) {

        } else if(latestID === undefined) {
            var firstRun = {
                type : "basic",
                title : "Twitter Notifier",
                message : "You may want to check your twitter account. You have pending notifications.",
                iconUrl : "icon.png"
            };

            chrome.notifications.create(firstRun);
            latestID = ids[0];

        } else if(latestID != ids[0]) {
            for(j=0;j< ids.length;j++) {
                if(latestID == ids[j]) {
                    break;
                } else {
                    if(messages[j] != "") {
                        newTweets[j] = messages[j];
                    }
                }
            }
            latestID = ids[0];
        }

        if(newTweets.length == 0) {

        } else {
            for(i=0;i<newTweets.length; i++) {
                var tweet = newTweets[i];
                var myTweet = {
                    type : "basic",
                    title : "Twitter Notifier New notification",
                    message : "IOAIIOAJIOS" ,
                    iconUrl : "icon.png"
                };

                chrome.notifications.create(myTweet);
            }
        }

        // console.log(messages);
        // console.log(ids);
        console.log(latestID);
        console.log(newTweets);
        
    });
}

function callback() {
    if (chrome.runtime.lastError) {
        console.log(chrome.runtime.lastError.message);
    } else {
        // Tab exists
    }
}