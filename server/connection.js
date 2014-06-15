/**
 * Created by bangbang93 on 14-6-15.
 */

Meteor.setInterval(function(){
    connections.remove({
        'keep-alive':{$lt: new Date().getTime() - 60000}
    });
},1000);