using log4net;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using MyLib;
using InternalControl.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;

namespace InternalControl.Infrastucture
{
    /// <summary>
    /// 基础控制器
    /// </summary>
    [Produces("application/json")]
    [Consumes("application/json", "multipart/form-data")]
    //[Route("[area]/[controller]/[action]")] 
    [Route("[controller]/[action]")]
    public class BaseController : Controller
    {
        /// <summary>
        /// MyWorkFlowBusiness的实例不采用注入
        /// </summary>
        protected Business.WorkFlowBusiness MyWorkFlowBusiness
        {
            get
            {
                return new Business.WorkFlowBusiness(DbConnectionString);
            }
        }

        /// <summary>
        ///  配置,使用config.GetValue T来读取
        /// </summary>
        protected IConfiguration Config => HttpContext.RequestServices.GetService<IConfiguration>();

        /// <summary>
        /// 日志服务
        /// </summary>
        protected ILog Log => HttpContext.RequestServices.GetService<ILog>();
        
        /// <summary>
        /// 
        /// </summary>
        public string DbConnectionString => Config.GetValue<string>("connectionString:InternalControl");

        /// <summary>
        /// 获取当前登录者的数据库链接;可能在login方法中另做一个
        /// </summary>
        public IDbConnection Db => new SqlConnection(DbConnectionString);

        /// <summary>
        /// 网站服务器环境
        /// </summary>
        protected IHostingEnvironment Env => HttpContext.RequestServices.GetService<IHostingEnvironment>();

        /// <summary>
        /// 登录人的信息
        /// </summary>
        protected CurrentUser CurrentUser
        {
            get
            {
                var currentUser = HttpContext.Session.Get<CurrentUser>("user");
                if (currentUser == null)
                {
                    if (!Env.IsDevelopment())
                    {
                        HttpContext.Response.StatusCode = 401;
                        throw new Exception("请登录");
                    }
                    else
                    {
                        HttpContext.Session.Set<CurrentUser>("user", new CurrentUser()
                        {
                            Name = "国有资产管理处-小国0004",
                            WorkNumber = "0004",
                            Id = 6,
                            DepartmentId = 20002,
                            DepartmentName = "国有资产管理处"
                        });
                        currentUser = HttpContext.Session.Get<CurrentUser>("user");
                    }
                }
                return currentUser;
            }
        }
    }
}

