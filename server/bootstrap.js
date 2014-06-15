/**
 * Created by bangbang93 on 14-6-15.
 */
Meteor.startup(function(){
    if (!settings.findOne({key:'connectionCount'})){
        settings.insert({
            key:'connectionCount',
            value: 0
        });
    }
});