﻿using System;
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
    public class UploadController : BaseController
    {
        /// <summary>
        /// 所有的文件上传都统一用这个;
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        async public Task<object> Upload()
        {
            var filesNameList = await UploadFile.Upload(
                Request.Form.Files,
                Env.WebRootPath,
                "Upload",
                Config.GetValue<int>("uploadFileMaxSize"));
            return filesNameList;
        }

        [HttpPost]
        async public Task<object> UploadEditorPicture()
        {
            var filesNameList = await UploadFile.Upload(
                Request.Form.Files,
                Env.WebRootPath,
                "Upload",
                Config.GetValue<int>("uploadFileMaxSize"));

            var obj = new
            {
                state = "SUCCESS",
                url = filesNameList.FirstOrDefault(),
                //title = "new.png",
                //original = file.FileName,
                //type = ".png",
                //size = 1000
            };

            var objString = Newtonsoft.Json.JsonConvert.SerializeObject(obj);

            return Content(objString, "text/html");
            //return filesNameList;
        }
    }

}