﻿using ICSharpCode.SharpZipLib.Zip;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace MyLib
{
    public static class MySharpZipLib
    {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="zipFilePath"></param>
        /// <param name="filenames"></param>
        async public static void CreateZipFile(string zipFilePath, params string[] filenames)
        {
            try
            {
                using (ZipOutputStream zipOutputStreams = new ZipOutputStream(File.Create(zipFilePath)))
                {

                    zipOutputStreams.SetLevel(9); // 压缩级别 0-9
                    //s.Password = "123"; //Zip压缩文件密码
                    byte[] buffer = new byte[4096]; //缓冲区大小
                    foreach (string file in filenames)
                    {
                        ZipEntry entry = new ZipEntry(Path.GetFileName(file))
                        {
                            DateTime = DateTime.Now
                        };

                        await Task.Run(() => zipOutputStreams.PutNextEntry(entry));

                        //using (FileStream fs = File.OpenRead(file))
                        //{
                        //    int sourceBytes;
                        //    do
                        //    {
                        //        sourceBytes = await fs.ReadAsync(buffer, 0, buffer.Length);
                        //        await s.WriteAsync(buffer, 0, sourceBytes);
                        //    } while (sourceBytes > 0);
                        //}
                    }
                    zipOutputStreams.Finish();
                    zipOutputStreams.Close();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception during processing {0}", ex);
            }
        }

    }
}
