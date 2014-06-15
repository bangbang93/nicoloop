/**
 * Created by bangbang93 on 14-6-15.
 */
ServiceConfiguration.configurations.insert({
    service: "weibo",
    clientId: "429409060",
    secret: "3c63d302df3a4bb77020cc56bf50b53a"
});

Meteor.absoluteUrl.defaultOptions = {
    rootUrl: 'http://auth.bangbang93.com/sina/callback2.php?uri=' + Meteor.absoluteUrl({
        replaceLocalhost: true
    })
};

Meteor.publish('getDanmuku',function(){
    return danmuku.find({});
});
Meteor.publish('userData', function(){
    if (this.userId) {
        return Meteor.users.find({
            _id: this.userId
        }, {
            fields:{
                Time: 1
            }
        });
    } else {
        this.ready();
    }
});
Meteor.publish('topScore', function(){
    return topScore.find({},{
        sort: {score: -1},
        limit: 10
    });
});
Meteor.publish('userScore', function(){
    if (!!this.userId){
        return topScore.find({_id: this.userId});
    }
});

Meteor.publish('connections', function(){
    return connections.find({});
});

Meteor.publish('myTop', function(score){
    var top = topScore.find({}, {score :-1});
    var n = 0;
    for (var i in top){
        if (top.hasOwnProperty(i)){
            if (top[i] == score){
                return n+1;
            } else {
                n++;
            }
        }
    }
});