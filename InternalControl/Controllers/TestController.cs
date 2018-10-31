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
using Microsoft.Extensions.Configuration;
using System.IO.Compression;

namespace InternalControl.Controllers
{
    /// <summary>
    /// 登录|注销|获取权限等相关接口
    /// </summary>
    public class TestController : BaseController
    {
       [HttpGet]
       public object object是否可以用ContainProp()
        {
            object x = new { NextStepId = 1 };
            //object x = new MyClass1 { NextStepId = 1 };
            x.SetValueByPropertyName("NextStepId",2);
            return x.ContainProperty("NextStepId");
            //得到{"error":"Property set method not found."}
            //所以还是要有强类型
        }

        [HttpGet]
       public object testNameOf()
        {
            //nameof(T) 会得到"T"
            var xxx = new MyClass1();
            return nameof(xxx);
        }

        [HttpPost]
        public object testUpload(Microsoft.AspNetCore.Http.IFormFileCollection files)
        {
            return files;
        }

        [HttpGet]
        public object testSharpZipLib() {
             MySharpZipLib.CreateZipFile(MyPath.Combine(Env.WebRootPath, "DownLoad", "1.zip"),
                MyPath.Combine(Env.WebRootPath, "Upload", "测试_20181010205009.txt"),
                MyPath.Combine(Env.WebRootPath, "Upload", "测试_20181016105034.txt"),
                MyPath.Combine(Env.WebRootPath, "Upload", "测试_20181016234453.txt"));
            return 1;
        }

        [HttpGet]
        public void testZipfile()
        {
            ZipFile.CreateFromDirectory(MyPath.Combine(Env.WebRootPath, "Upload", "testZipFile"), MyPath.Combine(Env.WebRootPath, "Download", "2.zip"));
        }

        ///// <summary>
        ///// 这个不好用,发布到服务器就挂
        ///// </summary>
        ///// <returns></returns>
        //[HttpGet]
        //public object testIp()
        //{
        //    return IPTools.Core.IpTool.Search("171.217.156.4");
        //}
    }

    public class MyClass1
    {
        public int NextStepId { get; set; }
    }
}