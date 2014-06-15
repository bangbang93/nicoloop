/**
 * Created by bangbang93 on 14-6-15.
 */

Template.top.topScores = function(){
    return topScore.find({},{sort:{score:-1}});
};

Template.top.user = function(){
    return Meteor.user();
};

Template.top.onlineUser = function(){
    return connections.find({}).count();
}

Template.controller.repeatTime = function(){
    return Session.get('playCount');
};

Meteor.startup(function(){
    Meteor.absoluteUrl.defaultOptions = {
        rootUrl: 'http://auth.bangbang93.com/sina/callback2.php?uri=http://' + window.location.host + window.location.pathname
    };
    Meteor.subscribe('getDanmuku');
    Meteor.subscribe('topScore');
    Meteor.subscribe('userData');
    Meteor.subscribe('connections');

    sendDamuku = function (time, commit){
        danmuku.insert({
            time: time,
            commit: commit
        });
    };


    Session.setDefault('playCount', 0);
    var checkLoggingin = function() {
        if (Meteor.loggingIn()) {
            setTimeout(checkLoggingin, 100);
        } else {
//            console.log(!!Meteor.user());
            var tempUserId;
            if (!!Meteor.user()){
                var playCount = topScore.findOne({_id:Meteor.userId()})|| 0;
                if (typeof playCount == 'object'){
//                    console.log(playCount);
                    playCount = playCount.score;
                }
                tempUserId = Meteor.userId();
                Session.set('playCount', playCount);
            } else {
                tempUserId = new Date().getTime() + '';
            }
            $('#playcount').text("× " + Session.get('playCount'));
//            console.log(233);
            if(!connections.findOne({_id:tempUserId})){
                connections.insert({
                    _id: tempUserId,
                    'keep-alive': new Date().getTime()
                });
            }
            Meteor.setInterval(function(){
                connections.update({
                    _id: tempUserId
                },{
                    $set:{
                        'keep-alive':new Date().getTime()
                    }
                });
            },1000);
        }
    };
    Meteor.setTimeout(checkLoggingin, 100);
    var player = $('#nicoplayer');
    Template.controller.repeatTime = Session.get('playCount');
    var autoReplay = Session.get('autoReplay') || false;

    Template.controller.repeatTime = Session.get('playCount');

    var rePlay = function () {
        $('#replay').addClass('disabled');
        player.currentTime = 0;
        player.get(0).play();
    };

    var updateRepeatState = function () {
        if (autoReplay) {
            $('#repeat').removeClass('unchecked').addClass('checked');
        } else {
            $('#repeat').removeClass('checked').addClass('unchecked');
        }
    };

    var setRepeat = function () {
        autoReplay = !autoReplay;
        Session.set('autoReplay', autoReplay);
        updateRepeatState();
    };
    updateRepeatState();
    $('#replay').click(rePlay);
    $('#repeat').click(setRepeat);

    $('#playcount').text("× " + Session.get('playCount'));
    player.on('ended', function () {
        Session.set('playCount', Session.get('playCount') + 1);
        $('#playcount').text("× " + Session.get('playCount'));
        Session.set('playCount', Session.get('playCount'));
        if (!!topScore.findOne({_id: Meteor.user()._id})){
            topScore.update({
                _id: Meteor.user()._id
            },{
                $set:{
                    score: Session.get('playCount')
                }
            });
        } else {
            topScore.insert({
                _id: Meteor.user()._id,
                score: Session.get('playCount'),
                username: Meteor.user().profile.name
            });
        }

        if (autoReplay) {
            rePlay();
        } else {
            $('#replay').removeClass('disabled');
        }
    });
});

