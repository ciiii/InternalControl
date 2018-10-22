using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using InternalControl.Infrastucture;
using log4net;
using log4net.Config;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Internal;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using Swashbuckle.AspNetCore.Swagger;

namespace InternalControl
{
    /// <summary>
    /// 
    /// </summary>
    public class Startup
    {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="configuration"></param>
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        /// <summary>
        /// 
        /// </summary>
        public IConfiguration Configuration { get; }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="services"></param>
        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddSingleton<ILog>(p =>
            {
                var repository = LogManager.CreateRepository("ScientificResearch");
                XmlConfigurator.Configure(repository, new FileInfo("log4net.xml"));
                return LogManager.GetLogger(repository.Name, repository.Name);
            });

            services.AddResponseCompression();

            services.AddSession();

            services.AddMvc(option =>
            {
                option.Filters.Add(new MyAuthorizationFilter());
                option.Filters.Add(new MyActionFilter());
                option.Filters.Add(new MyResultFilter());
            }).AddJsonOptions(option =>
            {
                //返回的时间类型的格式
                option.SerializerSettings.DateFormatString = "yyyy'-'MM'-'dd' 'HH':'mm':'ss";
                option.SerializerSettings.ContractResolver = new DefaultContractResolver();
            }).SetCompatibilityVersion(CompatibilityVersion.Version_2_1);

            services.AddSwaggerGen(c =>
            {
                c.OperationFilter<SwaggerFileUploadFilter>();//增加文件过滤处理

                c.IgnoreObsoleteActions();
                c.IgnoreObsoleteProperties();

                c.SwaggerDoc("v1", new Info { Title = "InternalControle API", Version = "v1" });
                var filePath = Path.Combine(Directory.GetCurrentDirectory(), "InternalControl.xml");
                c.IncludeXmlComments(filePath);
            });
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="app"></param>
        /// <param name="env"></param>
        /// <param name="log"></param>
        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILog log)
        {
            #region 每个请求都log一下
            //app.Use((context, next) =>
            //{
            //    log.Info(
            //        $"\r\n{context.Request.Method}" +
            //        $"\r\n{context.Request.Host}" +
            //        $"\r\n{context.Request.PathBase}" +
            //        $"\r\n{context.Request.Path}" +
            //        $"\r\n{context.Request.QueryString}" +
            //        $"\r\n");
            //    return next();
            //});
            #endregion

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.Use(async (context, next) =>
            {
                //once you read it, its gone
                var bodyStr = string.Empty;
                context.Request.EnableRewind();
                using (StreamReader reader = new StreamReader(context.Request.Body, Encoding.UTF8, true, 1024, true))
                {
                    bodyStr = reader.ReadToEnd();
                }
                context.Request.Body.Position = 0;

                try
                {
                    await next();
                }
                catch (Exception ex)
                {
                    var strRequestHeaders = string.Join("\r\n", context.Request.Headers.Select(i => i.ToString()).ToArray());

                    log.Error($"\r\n" +
                        $"TODO:FIXME:请求方法:{context.Request.Method}\r\n" +
                        $"FIXME:请求头:{strRequestHeaders}\r\n" +
                        $"FIXME:请求路径:{context.Request.Host.ToString() + context.Request.Path.ToString()} \r\n" +
                        $"FIXME:url参数:{context.Request.QueryString}\r\n" +
                        $"FIXME:data参数:{bodyStr}\r\n" +
                        $"FIXME:时间{DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss")}——{ex.GetType().ToString()}：{ex.Message}\r\n" +
                        $"FIXME:堆栈信息：\r\n" +
                        $"{ex.StackTrace}\r\n");

                    await context.Response.WriteAsync(JsonConvert.SerializeObject(new { error = ex.Message }));
                }
            });

            app.UseResponseCompression();
            app.UseStaticFiles();
            app.UseSession(new SessionOptions() { IdleTimeout = TimeSpan.FromDays(1) });

            //cors自己写,2018-7-10,将前台结合到了本工程,没用跨域了;
            app.Use(async (context, next) =>
            {

                //2018/1/29为了让不能设置content-type的XDomainRequest的content-type为json
                if (string.IsNullOrWhiteSpace(context.Request.ContentType)
                    || context.Request.ContentType == "context.Request.ContentType")
                    context.Request.ContentType = "application/json";

                context.Response.Headers.Add("Access-Control-Allow-Origin", "*");
                context.Response.Headers.Add("Access-Control-Allow-Headers", "content-type,*");
                context.Response.Headers.Add("Access-Control-Allow-Methods", "PUT,GET,POST,OPTIONS");
                //context.Response.Headers.Add("Access-Control-Allow-Credentials", "true");

                //Request.Headers.AllKeys.Contains("Origin") &&
                if (context.Request.Method == "OPTIONS")
                {
                    context.Response.StatusCode = 202;
                    await context.Response.WriteAsync("OK");
                }
                else
                {
                    await next();
                }
            });

            app.UseMvc();

            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "InternalControleApi-v1");
            });
        }
    }
}
