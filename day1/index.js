const relationship = {
    name : 'abc',
    friends : ['dd','ee','ff'],
    logFriends: function(){
        var that = this;
        this.friends.forEach(function(friend){
            console.log(that.name,friend);
        });
    },
};

relationship.logFriends();