using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace MyLib
{
    /// <summary>
    /// 
    /// </summary>
    public class UploadFile
    {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="files"></param>
        /// <param name="absolutePath"></param>
        /// <param name="relativePath"></param>
        /// <param name="uploadFileMaxSize"></param>
        /// <returns></returns>
        public async static Task<List<string>> Upload(
            //TODO:IE8,9下载后返回一个json,ie8,9的form提交不能识别(真的??),以至于变为下载.除非返回一个"text/html"的content的结果
            Microsoft.AspNetCore.Http.IFormFileCollection files,
            string absolutePath,
            string relativePath,
            int uploadFileMaxSize)
        {
            if (files.Count() == 0)
            {
                throw new Exception("没有上传文件");
            }

            foreach (var file in files)
            {
                if (file.Length > uploadFileMaxSize * 1024 * 1024)
                {
                    throw new Exception($"文件大小不能超出{uploadFileMaxSize}M.");
                }

                var fileName = file.FileName;
                var ext = Path.GetExtension(fileName).ToLower();

                //string filePath = "";

                //switch (ext.Replace(".", "").ToLower())
                //{
                //    case "jpeg":
                //        filePath = "img";
                //        break;
                //    case "jpg":
                //        filePath = "img";
                //        break;
                //    case "gif":
                //        filePath = "img";
                //        break;
                //    case "png":
                //        filePath = "img";
                //        break;
                //    case "csv":
                //        filePath = "txt";
                //        break;
                //    case "txt":
                //        filePath = "txt";
                //        break;
                //    case "xls":
                //        filePath = "xls";
                //        break;
                //    case "xlsx":
                //        filePath = "xls";
                //        break;
                //    case "doc":
                //        filePath = "doc";
                //        break;
                //    case "docx":
                //        filePath = "doc";
                //        break;
                //}
                //2018-5-22 暂不检查
                //if (filePath == "")
                //{
                //    throw new System.Exception("文件格式不支持.");
                //}
            }

            //测试路径\2018-1-1
            //18-7-4暂时不用加这个日期路径
            //relativePath = Path.Combine(relativePath, DateTime.Now.ToString("yyyyMMdd"));

            //wwwroot的绝对路径\测试路径\2018-1-1
            var path = Path.Combine(absolutePath, relativePath);
            if (!Directory.Exists(path))
            {
                Directory.CreateDirectory(path);
            }

            var filesNameList = new List<string>();
            foreach (var file in files)
            {
                //var fileName = ContentDispositionHeaderValue
                //.Parse(file.ContentDisposition)
                //.FileName
                //.Trim('"');

                var fileName = file.FileName;
                var ext = Path.GetExtension(fileName).ToLower();

                var fileSelfName = Path.GetFileNameWithoutExtension(fileName);
                //fileName = fileSelfName + Guid.NewGuid().ToString("N") + ext;

                fileName = $"{fileSelfName}_{DateTime.Now.ToString("yyyyMMddHHmmss")}{ext}";
                var absoluteFilename = Path.Combine(path, $"{fileName}");

                //size += file.Length;
                using (FileStream fs = File.Create(absoluteFilename))
                {
                    await file.CopyToAsync(fs);
                    fs.Flush();
                }

                filesNameList.Add(Path.Combine("/", relativePath, $"{fileName}"));
            }
            return filesNameList;
        }
    }
}
