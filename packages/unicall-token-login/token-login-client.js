// @puw 2016-03-08
export function tokenLogin(tenantId,token){
  Meteor.call('tokenLogin',tenantId,token,function(error,result){
    if(error){
      console.log(`Login Error:${error}`);
    }else {
      Meteor.loginWithPassword({id:result.id}, result.pass, function(err) {
        if(err){
          console.log(`Login With Error:${err}`);
        }
      });
    }
  });
}
