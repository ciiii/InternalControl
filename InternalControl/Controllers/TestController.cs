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

    }

    public class MyClass1
    {
        public int NextStepId { get; set; }
    }
}