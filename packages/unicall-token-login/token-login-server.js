// @puw 2016-03-08
import { Accounts } from "meteor/accounts-base";

Meteor.methods({
  'tokenLogin'(tenantId,token){
    //获取profile,判断是否认证
    const api = `http://${tenantId}/api/profile`;
    let response;
    try {
      response = new authApi().get(api,token);
    } catch (err) {
      throw _.extend(new Error("获取profile出错:" + err.message),
        {response: err.response});
    }
    const profile = response.data;
    const user = Meteor.users.findOne({
      username:profile.username,
      tenant_id:tenantId
    });
    //根据是否第一次访问,初始化.并返回用户信息让登录.
    const pass = Meteor.uuid();
    if(user != null){
      Accounts.setPassword(user._id,pass,{logout:false});
      return {
        id:user._id,
        pass:pass
      };
    }else {
      const userData = {
        username:profile.username,
        password:pass
      };
      Accounts._skipCaseInsensitiveChecksForTest[profile.username] = 1;
      const userId = Accounts.createUser(userData);
      delete Accounts._skipCaseInsensitiveChecksForTest[profile.username];
      Meteor.users.update(userId,{
        $set:{
          name:profile.name,
          tenant_id:tenantId
        }
      });
      Partitioner.setUserGroup(userId, tenantId);
      return{
        id:userId,
        pass:pass
      };
    }
  }
})