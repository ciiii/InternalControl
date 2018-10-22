using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MyLib;
using InternalControl.Business;
using InternalControl.Infrastucture;
using InternalControl.Models;

namespace InternalControl.Controllers
{
    /// <summary>
    /// 登录|注销|获取权限等相关接口
    /// </summary>
    public class AccessController : BaseController
    {
        /// <summary>
        /// 登录,返回登录人所具有的权限
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        async public Task<object> Login([FromBody]LoginInfo model)
        {
            var IP = HttpContext.Connection.RemoteIpAddress.ToString();

            var result = await Db.QueryMultipleSpAsync(
               new SPLogin()
               {
                   WorkNumber = model.WorkNumber,
                   Password = model.Password
               });

            //TODO:估计还要是记录一下登录日志;

            var user = result.Read<CurrentUser>().FirstOrDefault();
            var tempPermission = result.Read<Permission>();

            var permission = RecursivePermission(tempPermission, 0);

            HttpContext.Session.Set<CurrentUser>("user", user);

            return new { user, permission };
        }

        /// <summary>
        /// 权限分层次
        /// </summary>
        /// <param name="permission"></param>
        /// <param name="topId"></param>
        /// <returns></returns>
        private object RecursivePermission(IEnumerable<Permission> permission, int topId)
        {
            return from item in permission
                   where item.ParentId == topId
                   select new
                   {
                       menu = item,
                       children = RecursivePermission(permission, item.Id)
                   };
        }

        /// <summary>
        /// 注销当前登录
        /// </summary>
        [HttpPost]
        public void Logout() => HttpContext.Session.Clear();

        /// <summary>
        /// 修改密码
        /// </summary>
        /// <param name="oldPassword"></param>
        /// <param name="newPassword"></param>
        /// <returns></returns>
        [HttpPost]
        async public Task ChangePassword([FromBody]ChangePassword model) =>
            await Db.ExecuteSpAsync(new SPResetPassword()
            {
                WordNumber = CurrentUser.WorkNumber,
                OldPassword = model.OldPassword,
                NewPassword = model.NewPassword
            });
    }
}