using log4net;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ApiExplorer;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json;
using Swashbuckle.AspNetCore.Swagger;
using Swashbuckle.AspNetCore.SwaggerGen;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InternalControl.Infrastucture
{
    /// <summary>
    /// Filter with DI
    /// </summary>
    public class AddHeaderWithFactoryAttribute : Attribute, IFilterFactory
    {
        /// <summary>
        /// 
        /// </summary>
        public bool IsReusable => throw new NotImplementedException();

        /// <summary>
        /// 
        /// </summary>
        /// <param name="serviceProvider"></param>
        /// <returns></returns>
        // Implement IFilterFactory
        public IFilterMetadata CreateInstance(IServiceProvider serviceProvider)
        {
            return new InternalAddHeaderFilter();
        }

        private class InternalAddHeaderFilter : IResultFilter
        {
            public void OnResultExecuting(ResultExecutingContext context)
            {
                context.HttpContext.Response.Headers.Add(
                    "Internal", new string[] { "Header Added" });
            }

            public void OnResultExecuted(ResultExecutedContext context)
            {
            }
        }
    }
    /// <summary>
    /// 认证过滤器
    /// </summary>
    public class MyAuthorizationFilter : IAuthorizationFilter
    {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="context"></param>
        public void OnAuthorization(AuthorizationFilterContext context)
        {
            var config = context.HttpContext.RequestServices.GetService<IConfiguration>();
            var token = config.GetValue<string>("token");

            if (!string.IsNullOrWhiteSpace(token) && context.HttpContext.Request.Query["token"] != token)
            {
                var log = context.HttpContext.RequestServices.GetService<ILog>();
                log.Error($"\r\n" +
                        $"{DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss")}\r\n" +
                        $"未授权的访问：\r\n" +
                        $"来源地址:{context.HttpContext.Request.Path}\r\n");
                //context.Result = new UnauthorizedResult();
                throw new Exception("未授权的访问.");
            }
        }
    }

    /// <summary>
    /// action过滤器
    /// </summary>
    public class MyActionFilter : IActionFilter
    {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="context"></param>
        public void OnActionExecuted(ActionExecutedContext context) { }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="context"></param>
        public void OnActionExecuting(ActionExecutingContext context)
        {
            //看看数据验证 context.ModelState.IsValid
            //一个context.ModelState下values包含对多个对象验证结果,任何一个结果有错context.ModelState.IsValid都false
            //每个对象验证结果有自己的ValidationState
            //每个对象验证结果下有errors集合,其中有的是没错的;有errormessage的才有错;
            if (!context.ModelState.IsValid)
            {
                var strErrorMessage = string.Join(",", 
                    context.ModelState.Values.
                        Where(m => m.ValidationState == Microsoft.AspNetCore.Mvc.ModelBinding.ModelValidationState.Invalid).
                        Select(i => string.Join(",", 
                            i.Errors.
                                Where(j => !string.IsNullOrWhiteSpace(j.ErrorMessage)).
                                Select(k => k.ErrorMessage))));

                strErrorMessage = string.IsNullOrEmpty(strErrorMessage) ? "接口数据格式有误" : strErrorMessage;

                //这里不处理错误;
                //context.Result = new BadRequestObjectResult("输入数据有误");
                throw new Exception(strErrorMessage);
            }
        }
    }

    /// <summary>
    /// 结果过滤器
    /// 前台需要的是{error=xxx,data=yyy}的格式,虽然很怪,满足前台的要求吧
    /// </summary>
    public class MyResultFilter : IResultFilter
    {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="context"></param>
        public void OnResultExecuted(ResultExecutedContext context)
        {
            //sthrow new NotImplementedException();
        }

        /// <summary>
        /// 如果action返回的是一个ObjectResult,则再次包装一下;
        /// </summary>
        /// <param name="context"></param>
        public void OnResultExecuting(ResultExecutingContext context)
        {
            //context.HttpContext.Response.ContentType = "text/plain";
            if (context.Result is ObjectResult)
            {
                context.Result = new ObjectResult(new { data = ((ObjectResult)context.Result).Value });
                //context.Result = new ContentResult() { Content="123"};
            }

            //throw new NotImplementedException();
        }
    }
}
