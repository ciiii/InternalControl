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
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Authorization;
using System.Net.Http;

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
            x.SetValueByPropertyName("NextStepId", 2);
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
        public object testSharpZipLib()
        {
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

        //test jwt 3/4
        [HttpPost("authenticate")]
        public IActionResult RequestToken([FromBody]TokenRequest request)
        {
            if (request != null)
            {
                //验证账号密码,这里只是为了demo，正式场景应该是与DB之类的数据源比对
                if ("admin".Equals(request.UserName) && "admin".Equals(request.Password))
                {
                    var claims = new[] {
                        //加入用户的名称
                        new Claim(ClaimTypes.Name,request.UserName),
                        new Claim("agggge","2000")
                            //下边为Claim的默认配置
                            //new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                            //new Claim(JwtRegisteredClaimNames.Iat, $"{new DateTimeOffset(DateTime.Now).ToUnixTimeSeconds()}"),
                            //new Claim(JwtRegisteredClaimNames.Nbf,$"{new DateTimeOffset(DateTime.Now).ToUnixTimeSeconds()}") ,
                            ////这个就是过期时间，目前是过期100秒，可自定义，注意JWT有自己的缓冲过期时间
                            //new Claim (JwtRegisteredClaimNames.Exp,$"{new DateTimeOffset(DateTime.Now.AddSeconds(100)).ToUnixTimeSeconds()}"),
                            //new Claim(JwtRegisteredClaimNames.Iss,"Blog.Core"),
                            //new Claim(JwtRegisteredClaimNames.Aud,"wr"),
                            ////这个Role是官方UseAuthentication要要验证的Role，我们就不用手动设置Role这个属性了
                            //new Claim(ClaimTypes.Role,tokenModel.Role),

                            //iss ： jwt签发者
                            //sub：jwt所面向的用户
                            //aud：接收jwt的一方
                            //exp：jwt的过期时间，这个过期时间必须要大于签发时间
                            //nbf：定义在什么时间之前，该jwt都是不可用的.
                            //iat ：jwt的签发时间
                            //jti  ：jwt的唯一身份标识，主要用来作为一次性token,从而回避重放攻击
                    };

                    var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Config["JWT:SecurityKey"]));
                    var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

                    var authTime = DateTime.Now;
                    var expiresAt = authTime.AddMinutes(10);

                    var token = new JwtSecurityToken(
                        issuer: "我们网站的域名",          //iss:jwt签发者
                        audience: "某个前端的域名",        //aud:接收jwt的一方
                        claims: claims,
                        //expires: expiresAt,
                        signingCredentials: creds);

                    return Ok(new
                    {
                        access_token = new JwtSecurityTokenHandler().WriteToken(token),
                        token_type = "Bearer",
                        profile = new
                        {
                            name = request.UserName,
                            auth_time = authTime,
                            //expires_at = expiresAt
                        }
                    });
                }
            }

            return BadRequest("Could not verify username and password.Pls check your information.");
        }

        //test jwt 4/4
        [Authorize]
        // GET api/values
        [HttpGet]
        public object GetJwt()
        {
            //return HttpContext.User.Identity.IsAuthenticated;
            return User.Claims.Select(i => i.Type+":::"+i.Value);

        }

        [HttpPost]
        async public Task<object> TestMerge([FromBody]Expert model)
        {
            var x = Db.Merge(model);
            return x.GetAwaiter().GetResult();
        }



        public class MyClass1
        {
            public int NextStepId { get; set; }
        }

        public class TokenRequest
        {
            public string UserName { get; set; }

            public string Password { get; set; }
        }
    }
}